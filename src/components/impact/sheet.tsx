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

function Profile({
  benefits,
  harms,
  review,
  unscored,
}: {
  benefits: Impact[];
  harms: Impact[];
  review: Impact[];
  unscored: number;
}) {
  return (
    <aside className="panel order-1 h-fit p-5 lg:sticky lg:top-4 lg:order-2">
      <h2 className="font-display text-2xl font-medium">Profile</h2>
      <p className="mt-2 text-sm text-muted">
        These scores are not combined. A benefit does not pay for a harm.
      </p>
      {review.length > 0 ? (
        <p className="mt-4 rounded-xl bg-oxide-soft px-3 py-2 text-sm font-medium text-oxide">
          Independent review. {review.length} harm{review.length === 1 ? "" : "s"} at magnitude 3
          or 4. Benefits do not clear {review.length === 1 ? "it" : "them"}.
        </p>
      ) : (
        <p className="mt-4 rounded-xl bg-leaf-soft px-3 py-2 text-sm text-ink">
          No magnitude 3 or 4 harm is on this sheet.
        </p>
      )}
      <ImpactList title="Benefits" impacts={benefits} tone="benefit" />
      <ImpactList title="Harms" impacts={harms} tone="harm" />
      {unscored > 0 ? (
        <p className="mt-4 text-sm text-muted">
          {unscored} impact{unscored === 1 ? "" : "s"} not scored. A blank is not a zero.
        </p>
      ) : null}
      <p className="mt-4 text-sm text-muted">
        Priority = 100 \u00d7 (magnitude \u00d7 likelihood) / 16. Likelihood starts at 1, so an unlikely
        transformative effect scores 25, the same as a small very likely one. Headcount is not
        in the formula.
      </p>
    </aside>
  );
}

function ImpactList({
  title,
  impacts,
  tone,
}: {
  title: string;
  impacts: Impact[];
  tone: "benefit" | "harm";
}) {
  return (
    <div className="mt-5">
      <h3 className="text-sm font-semibold">{title}</h3>
      {impacts.length === 0 ? (
        <p className="mt-1 text-sm text-muted">None yet.</p>
      ) : (
        <ul className="mt-2 grid gap-3">
          {impacts.map((impact) => {
            const priority = scoredPriority(impact);
            return (
              <li key={impact.id}>
                <div className="flex items-baseline justify-between gap-3">
                  <span className="text-sm">{impact.name || "Untitled"}</span>
                  <span className="font-display text-xl font-medium tabular-nums">
                    {priority === null ? "\u2014" : formatPriority(priority)}
                  </span>
                </div>
                {priority === null ? null : (
                  <progress
                    className={tone === "harm" ? "harm mt-1" : "good mt-1"}
                    max={100}
                    value={priority}
                    aria-label={impact.name || title}
                  />
                )}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

function ImpactCard({
  index,
  impact,
  onChange,
  onRemove,
}: {
  index: number;
  impact: Impact;
  onChange: (partial: Partial<Impact>) => void;
  onRemove: () => void;
}) {
  const priority = scoredPriority(impact);
  return (
    <article className="panel p-5">
      <div className="flex items-start justify-between gap-3">
        <h2 className="font-display text-xl font-medium">Impact {index + 1}</h2>
        <button type="button" className="text-sm font-semibold text-oxide" onClick={onRemove}>
          Remove
        </button>
      </div>
      <label className="mt-3 grid gap-1 text-sm font-medium">
        What changes for the person
        <input
          className="field font-normal"
          value={impact.name}
          onChange={(event) => onChange({ name: event.target.value })}
        />
      </label>
      <fieldset className="mt-4">
        <legend className="text-sm font-medium">Benefit or harm</legend>
        <div className="mt-2 flex gap-2">
          {(["benefit", "harm"] as const).map((valence) => (
            <button
              key={valence}
              type="button"
              aria-pressed={impact.valence === valence}
              className={
                impact.valence === valence
                  ? valence === "benefit"
                    ? "rounded-full bg-leaf px-4 py-2 text-sm font-semibold text-on-ink"
                    : "rounded-full bg-oxide px-4 py-2 text-sm font-semibold text-on-ink"
                  : "rounded-full border border-line px-4 py-2 text-sm font-semibold"
              }
              onClick={() => onChange({ valence })}
            >
              {valence === "benefit" ? "Benefit" : "Harm"}
            </button>
          ))}
        </div>
      </fieldset>
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <label className="grid gap-1 text-sm font-medium">
          System
          <select
            className="field font-normal"
            value={impact.level}
            onChange={(event) => onChange({ level: event.target.value as Impact["level"] })}
          >
            {LEVELS.map((level) => (
              <option key={level.id} value={level.id}>
                {level.label}
              </option>
            ))}
          </select>
        </label>
        <label className="grid gap-1 text-sm font-medium">
          Domain
          <select
            className="field font-normal"
            value={impact.domain}
            onChange={(event) => onChange({ domain: event.target.value as Impact["domain"] })}
          >
            {DOMAINS.map((domain) => (
              <option key={domain.id} value={domain.id}>
                {domain.label}
              </option>
            ))}
          </select>
        </label>
      </div>
      <Scale
        legend="Magnitude"
        value={impact.magnitude}
        options={MAGNITUDE_LABELS.map((label, value) => ({ label, value: value as Magnitude }))}
        onChange={(magnitude) => onChange({ magnitude })}
      />
      <Scale
        legend="Likelihood, within the horizon you name"
        value={impact.likelihood}
        options={LIKELIHOOD_LABELS.map((label) => {
          const value = Number(label.slice(0, 1)) as Likelihood;
          return { label, value };
        })}
        onChange={(likelihood) => onChange({ likelihood })}
      />
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <label className="grid gap-1 text-sm font-medium">
          Who experiences it
          <input
            className="field font-normal"
            value={impact.who}
            onChange={(event) => onChange({ who: event.target.value })}
          />
        </label>
        <label className="grid gap-1 text-sm font-medium">
          How many are exposed
          <input
            className="field font-normal"
            value={impact.exposed}
            onChange={(event) => onChange({ exposed: event.target.value })}
          />
          <span className="font-normal text-muted">Not multiplied into the priority.</span>
        </label>
        <label className="grid gap-1 text-sm font-medium">
          Horizon
          <input
            className="field font-normal"
            placeholder="Immediate, cumulative, delayed, or intergenerational"
            value={impact.horizon}
            onChange={(event) => onChange({ horizon: event.target.value })}
          />
        </label>
        <label className="grid gap-1 text-sm font-medium">
          Evidence, including what is missing
          <input
            className="field font-normal"
            value={impact.evidence}
            onChange={(event) => onChange({ evidence: event.target.value })}
          />
        </label>
      </div>
      <p className="mt-4 text-sm">
        Priority{" "}
        <span className="font-display text-2xl font-medium tabular-nums">
          {priority === null ? "not scored" : formatPriority(priority)}
        </span>
        {needsReview(impact) ? (
          <span className="ml-2 font-semibold text-oxide">Review required</span>
        ) : null}
      </p>
    </article>
  );
}

function Scale<T extends number>({
  legend,
  value,
  options,
  onChange,
}: {
  legend: string;
  value: T | null;
  options: { label: string; value: T }[];
  onChange: (value: T) => void;
}) {
  return (
    <fieldset className="mt-4">
      <legend className="text-sm font-medium">{legend}</legend>
      <div className="mt-2 flex flex-wrap gap-2">
        {options.map((option) => (
          <button
            key={option.value}
            type="button"
            aria-pressed={value === option.value}
            className={
              value === option.value
                ? "rounded-full bg-ink px-3 py-2 text-sm font-semibold text-on-ink"
                : "rounded-full border border-line px-3 py-2 text-sm font-semibold"
            }
            onClick={() => onChange(option.value)}
          >
            {option.label}
          </button>
        ))}
      </div>
    </fieldset>
  );
}
