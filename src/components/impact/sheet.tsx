import { useEffect, useMemo, useState } from "react";
import {
  DOMAINS,
  HYPOTHETICAL,
  LEVELS,
  LIKELIHOOD_LABELS,
  MAGNITUDE_LABELS,
  PROTOCOL_NAME,
  PROTOCOL_VERSION,
  QUESTION,
  blankImpact,
  domainLabel,
  emptyCase,
  formatPriority,
  levelLabel,
  needsReview,
  scoredPriority,
  type CaseFile,
  type Impact,
  type Likelihood,
  type Magnitude,
} from "@/lib/impact/protocol";

const STORAGE_KEY = "pctip.v0.1.case";

function loadCase(): CaseFile {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return HYPOTHETICAL;
    const parsed = JSON.parse(raw) as CaseFile;
    if (!parsed || !Array.isArray(parsed.impacts)) return HYPOTHETICAL;
    return parsed;
  } catch {
    return HYPOTHETICAL;
  }
}

export function ImpactSheet() {
  const [caseFile, setCaseFile] = useState<CaseFile>({
    product: "",
    person: "",
    alternative: "",
    impacts: [],
  });
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setCaseFile(loadCase());
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(caseFile));
  }, [caseFile, ready]);

  const profile = useMemo(() => {
    const benefits = caseFile.impacts.filter((impact) => impact.valence === "benefit");
    const harms = caseFile.impacts.filter((impact) => impact.valence === "harm");
    const review = caseFile.impacts.filter(needsReview);
    const unscored = caseFile.impacts.filter((impact) => scoredPriority(impact) === null);
    return { benefits, harms, review, unscored };
  }, [caseFile]);

  function patchCase(partial: Partial<CaseFile>) {
    setCaseFile((current) => ({ ...current, ...partial }));
  }

  function patchImpact(id: string, partial: Partial<Impact>) {
    setCaseFile((current) => ({
      ...current,
      impacts: current.impacts.map((impact) =>
        impact.id === id ? { ...impact, ...partial } : impact,
      ),
    }));
  }

  function removeImpact(id: string) {
    setCaseFile((current) => ({
      ...current,
      impacts: current.impacts.filter((impact) => impact.id !== id),
    }));
  }

  function exportMarkdown() {
    const lines = [
      `# ${PROTOCOL_NAME} ${PROTOCOL_VERSION}`,
      "",
      QUESTION,
      "",
      `Product: ${caseFile.product || "Not named"}`,
      `Person: ${caseFile.person || "Not named"}`,
      `Alternative: ${caseFile.alternative || "Not named"}`,
      "",
      "Benefits and harms are not subtracted. Priority = 100 \u00d7 (magnitude \u00d7 likelihood) / 16.",
      "That number is a queue score, not a probability and not a measure of welfare.",
      "Headcount is not part of the formula. A blank magnitude or likelihood stays unscored.",
      "",
    ];
    if (profile.review.length > 0) {
      lines.push(
        "Independent review: at least one harm is magnitude 3 or 4. Benefits do not clear it.",
        "",
      );
    }
    for (const kind of ["benefit", "harm"] as const) {
      lines.push(`## ${kind === "benefit" ? "Benefits" : "Harms"}`, "");
      const rows = caseFile.impacts.filter((impact) => impact.valence === kind);
      if (rows.length === 0) lines.push("None recorded.", "");
      for (const impact of rows) {
        const priority = scoredPriority(impact);
        lines.push(
          `### ${impact.name || "Untitled impact"}`,
          "",
          `- Priority: ${priority === null ? "Not scored" : formatPriority(priority)}`,
          `- Level: ${levelLabel(impact.level)}`,
          `- Domain: ${domainLabel(impact.domain)}`,
          `- Magnitude: ${impact.magnitude ?? "Not scored"}`,
          `- Likelihood: ${impact.likelihood ?? "Not scored"}`,
          `- Who: ${impact.who || "Not recorded"}`,
          `- How many exposed: ${impact.exposed || "Not recorded"} (not multiplied)`,
          `- Horizon: ${impact.horizon || "Not stated"}`,
          `- Evidence: ${impact.evidence || "Not recorded"}`,
          needsReview(impact) ? "- Review: required" : "- Review: not triggered by magnitude",
          "",
        );
      }
    }
    lines.push(
      "This export is not a validation. Ordinal ratings were multiplied as a convenience.",
    );
    const blob = new Blob([lines.join("\n")], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "person-centered-impact.md";
    link.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <header className="mb-8 max-w-3xl">
        <p className="text-sm font-medium text-leaf">Version {PROTOCOL_VERSION} · not validated</p>
        <h1 className="mt-2 font-display text-4xl font-medium tracking-tight text-ink">
          {PROTOCOL_NAME}
        </h1>
        <p className="mt-3 text-lg text-ink">{QUESTION}</p>
      </header>

      <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_20rem]">
        <div className="order-2 grid gap-6 lg:order-1">
        <section className="panel p-5">
          <h2 className="font-display text-2xl font-medium">The case</h2>
          <div className="mt-4 grid gap-3">
            <label className="grid gap-1 text-sm font-medium">
              Product or deployment
              <input
                className="field font-normal"
                value={caseFile.product}
                onChange={(event) => patchCase({ product: event.target.value })}
              />
            </label>
            <label className="grid gap-1 text-sm font-medium">
              Person at the center
              <input
                className="field font-normal"
                value={caseFile.person}
                onChange={(event) => patchCase({ person: event.target.value })}
              />
            </label>
            <label className="grid gap-1 text-sm font-medium">
              Compared with
              <input
                className="field font-normal"
                placeholder="Current practice, another product, or doing nothing"
                value={caseFile.alternative}
                onChange={(event) => patchCase({ alternative: event.target.value })}
              />
            </label>
          </div>
          <div className="no-print mt-4 flex flex-wrap gap-2">
            <button
              type="button"
              className="rounded-full bg-ink px-4 py-2 text-sm font-semibold text-on-ink"
              onClick={() => setCaseFile(structuredClone(HYPOTHETICAL))}
            >
              Load the hypothetical sheet
            </button>
            <button
              type="button"
              className="rounded-full border border-line px-4 py-2 text-sm font-semibold"
              onClick={() => setCaseFile(emptyCase())}
            >
              Clear
            </button>
            <button
              type="button"
              className="rounded-full border border-line px-4 py-2 text-sm font-semibold"
              onClick={exportMarkdown}
            >
              Export profile
            </button>
          </div>
        </section>

        <section className="order-3 grid gap-4 lg:col-start-1">
          {caseFile.impacts.map((impact, index) => (
            <ImpactCard
              key={impact.id}
              index={index}
              impact={impact}
              onChange={(partial) => patchImpact(impact.id, partial)}
              onRemove={() => removeImpact(impact.id)}
            />
          ))}
          <button
            type="button"
            className="rounded-2xl border border-dashed border-line px-4 py-3 text-left text-sm font-semibold text-leaf"
            onClick={() =>
              setCaseFile((current) => ({
                ...current,
                impacts: [...current.impacts, blankImpact()],
              }))
            }
          >
            Add an impact
          </button>
        </section>
        </div>
        <Profile
          benefits={profile.benefits}
          harms={profile.harms}
          review={profile.review}
          unscored={profile.unscored.length}
        />
      </div>
    </div>
  );
}
