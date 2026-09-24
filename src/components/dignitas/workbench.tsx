import { useEffect, useMemo, useState, type ComponentType, type ReactNode } from "react";
import { clsx } from "clsx";
import { Check } from "lucide-react";
import { IndexPanel } from "@/components/dignitas/index-panel";
import { Brief, Method } from "@/components/dignitas/views";
import { downloadText, recordSlug, toJson, toMarkdown } from "@/lib/dignitas/export";
import {
  ANCHORS,
  CONSTRUCTS,
  DOMAINS,
  DOMAIN_WEIGHT,
  FLAGS,
  GOVERNANCE_ANCHORS,
  POWER_ANCHORS,
  PROTOCOL_VERSION,
  SCENARIOS,
  SHARE_STEPS,
  STAGES,
  TECHNOLOGY_CLASSES,
  WORTH_LINE,
  cloneEvaluation,
  isEvaluation,
  loadScenario,
  type Anchor,
  type Confidence,
  type Construct,
  type DomainId,
  type Evaluation,
  type Posture,
} from "@/lib/dignitas/model";
import { scoreEvaluation, type Recommendation, type ScoreResult } from "@/lib/dignitas/score";

const DRAFT_KEY = "dignitas.protocol.v1.draft";
const RECORD_KEY = "dignitas.protocol.v1.records";

type View = "score" | "brief" | "method";
type Step = "case" | DomainId;

interface Snapshot {
  id: string;
  savedAt: string;
  evaluation: Evaluation;
  index: number | null;
  recommendation: Recommendation;
  holds: number;
}

const STEPS: { id: Step; label: string }[] = [
  { id: "case", label: "Case" },
  ...DOMAINS.map((domain) => ({ id: domain.id, label: domain.short })),
];

function readRecords(): Snapshot[] {
  try {
    const parsed = JSON.parse(localStorage.getItem(RECORD_KEY) ?? "[]") as unknown;
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((item): item is Snapshot => {
      if (!item || typeof item !== "object") return false;
      const snapshot = item as Snapshot;
      return typeof snapshot.id === "string" && isEvaluation(snapshot.evaluation);
    });
  } catch {
    return [];
  }
}

export function Workbench() {
  const [evaluation, setEvaluation] = useState<Evaluation>(() => loadScenario("autistic-calm"));
  const [view, setView] = useState<View>("score");
  const [step, setStep] = useState<Step>("case");
  const [records, setRecords] = useState<Snapshot[]>([]);
  const [notice, setNotice] = useState<string | null>(null);
  const [ready, setReady] = useState(false);

  const result = useMemo(() => scoreEvaluation(evaluation), [evaluation]);
  const heldDomains = useMemo(() => {
    const ids = new Set<DomainId>();
    for (const safeguard of result.safeguards) {
      if (safeguard.status !== "hold") continue;
      for (const id of safeguard.domains) ids.add(id);
    }
    return ids;
  }, [result]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(DRAFT_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as unknown;
        if (isEvaluation(parsed)) setEvaluation(parsed);
      }
    } catch {
      /* keep the teaching case */
    }
    setRecords(readRecords());
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    localStorage.setItem(DRAFT_KEY, JSON.stringify(evaluation));
  }, [evaluation, ready]);

  useEffect(() => {
    if (!notice) return;
    const timer = window.setTimeout(() => setNotice(null), 2400);
    return () => window.clearTimeout(timer);
  }, [notice]);

  function update(change: (draft: Evaluation) => void) {
    setEvaluation((current) => {
      const next = cloneEvaluation(current);
      change(next);
      next.sourceId = null;
      next.updatedAt = new Date().toISOString();
      return next;
    });
  }

  function saveSnapshot() {
    const snapshot: Snapshot = {
      id: crypto.randomUUID(),
      savedAt: new Date().toISOString(),
      evaluation: cloneEvaluation(evaluation),
      index: result.index,
      recommendation: result.recommendation,
      holds: result.safeguards.filter((item) => item.status === "hold").length,
    };
    const next = [snapshot, ...records].slice(0, 24);
    localStorage.setItem(RECORD_KEY, JSON.stringify(next));
    setRecords(next);
    setNotice("Snapshot saved in this browser.");
  }

  function removeSnapshot(id: string) {
    const next = records.filter((item) => item.id !== id);
    localStorage.setItem(RECORD_KEY, JSON.stringify(next));
    setRecords(next);
  }

  const touched = (id: DomainId) => {
    const domain = evaluation.domains[id];
    return domain.benefit !== null || domain.opportunity !== null || domain.cost !== null || domain.threat !== null;
  };

  return (
    <div className="min-h-screen">
      <header className="bg-ink text-on-ink">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-6 sm:flex-row sm:items-end sm:justify-between sm:px-6">
          <div className="flex items-center gap-3">
            <span className="relative grid size-11 shrink-0 place-items-center" aria-hidden>
              <span className="absolute inset-0 rounded-full border border-on-ink-muted" />
              <span className="absolute inset-1.5 rounded-full border border-on-ink-muted" />
              <span className="size-2.5 rounded-full bg-leaf" />
            </span>
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-on-ink-muted">Protocol v{PROTOCOL_VERSION}</p>
              <h1 className="font-display text-4xl leading-none">Dignitas</h1>
            </div>
          </div>
          <p className="max-w-md text-sm text-pretty text-on-ink-muted">
            Score how a technology bears on one person — benefits, opportunities, costs, and threats — across the systems that hold them.
          </p>
        </div>
      </header>

      <div className="no-print sticky top-0 z-10 border-b border-line bg-paper">
        <div className="mx-auto flex max-w-6xl gap-2 px-4 py-2 sm:px-6" role="tablist" aria-label="Protocol views">
          {(
            [
              ["score", "Score"],
              ["brief", "Brief"],
              ["method", "Method"],
            ] as const
          ).map(([id, label]) => (
            <button
              key={id}
              type="button"
              role="tab"
              aria-selected={view === id}
              onClick={() => setView(id)}
              className={clsx(
                "view-tab min-h-11 rounded-xl px-4 text-sm font-semibold",
                view === id ? "bg-ink text-surface" : "text-muted",
              )}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {view === "method" && <Method />}
      {view === "brief" && <Brief evaluation={evaluation} result={result} onPrint={() => window.print()} />}
      {view === "score" && (
        <div className="mx-auto grid max-w-6xl gap-6 px-4 py-6 lg:grid-cols-[minmax(0,1fr)_22rem] lg:px-6">
          <div className="order-2 min-w-0 space-y-4 lg:order-1">
            <label className="block">
              <span className="mb-1 block text-sm font-semibold">Open a case</span>
              <select
                className="field"
                value={evaluation.sourceId ?? "edited"}
                onChange={(event) => {
                  const value = event.target.value;
                  if (value === "edited") return;
                  setEvaluation(loadScenario(value));
                }}
              >
                {evaluation.sourceId === null && <option value="edited">Edited case</option>}
                {SCENARIOS.map((scenario) => (
                  <option key={scenario.id} value={scenario.id}>
                    {scenario.id === "blank" ? "Blank protocol" : scenario.title}
                  </option>
                ))}
              </select>
              <span className="mt-1 block text-sm text-muted">
                {evaluation.sourceId && evaluation.sourceId !== "blank"
                  ? "Teaching record, not a finding about a real company. Edit any anchor and it becomes your case."
                  : evaluation.sourceId === "blank"
                    ? "Name one decision and one person before you trust an index."
                    : "Edited. A snapshot keeps this version in this browser."}
              </span>
            </label>

            <div className="flex gap-2 overflow-x-auto pb-1" role="tablist" aria-label="Protocol steps">
              {STEPS.map((item) => {
                const domainId = item.id === "case" ? null : item.id;
                const on = step === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    role="tab"
                    aria-selected={on}
                    onClick={() => setStep(item.id)}
                    className={clsx(
                      "chip inline-flex min-h-11 shrink-0 items-center gap-2 rounded-full px-3 text-sm font-semibold",
                      on ? "bg-ink text-surface" : "raised text-ink",
                    )}
                  >
                    {item.label}
                    {domainId && heldDomains.has(domainId) && <span className="size-2 rounded-full bg-oxide" aria-label="Safeguard hold" />}
                    {domainId && !heldDomains.has(domainId) && touched(domainId) && (
                      <span className={clsx("size-2 rounded-full", on ? "bg-leaf" : "bg-leaf")} aria-hidden />
                    )}
                  </button>
                );
              })}
            </div>

            {step === "case" ? (
              <CaseStep evaluation={evaluation} records={records} update={update} onOpen={(item) => setEvaluation(cloneEvaluation(item))} onRemove={removeSnapshot} />
            ) : (
              <DomainStep
                evaluation={evaluation}
                result={result}
                domainId={step}
                update={update}
              />
            )}

            {result.cells > 0 && (
              <section className="panel p-4 sm:p-5">
                <h2 className="font-display text-2xl">Profile across systems</h2>
                <p className="mt-1 text-sm text-muted">Goods in green, harms in oxide. Read the person before the average of the bars.</p>
                <div className="mt-4">
                  <Profile evaluation={evaluation} />
                </div>
              </section>
            )}
          </div>
          <IndexPanel
            evaluation={evaluation}
            result={result}
            notice={notice}
            onPosture={(posture) => update((draft) => { draft.posture = posture; })}
            onSave={saveSnapshot}
            onMarkdown={() => {
              downloadText(`${recordSlug(evaluation)}.md`, toMarkdown(evaluation, result), "text/markdown");
              setNotice("Markdown downloaded.");
            }}
            onJson={() => {
              downloadText(`${recordSlug(evaluation)}.json`, toJson(evaluation, result), "application/json");
              setNotice("JSON downloaded.");
            }}
          />
        </div>
      )}

      <footer className="mx-auto max-w-6xl px-4 py-8 text-sm text-pretty text-muted sm:px-6">
        Dignitas Protocol v{PROTOCOL_VERSION}. Weights stay fixed so records can be compared. {WORTH_LINE}
      </footer>
    </div>
  );
}

function Profile({ evaluation }: { evaluation: Evaluation }) {
  const [Chart, setChart] = useState<ComponentType<{ evaluation: Evaluation }> | null>(null);
  useEffect(() => {
    let live = true;
    void import("./domain-chart").then((mod) => {
      if (live) setChart(() => mod.DomainChart);
    });
    return () => {
      live = false;
    };
  }, []);
  if (!Chart) return <div className="h-80" />;
  return <Chart evaluation={evaluation} />;
}

function CaseStep({
  evaluation,
  records,
  update,
  onOpen,
  onRemove,
}: {
  evaluation: Evaluation;
  records: Snapshot[];
  update: (change: (draft: Evaluation) => void) => void;
  onOpen: (evaluation: Evaluation) => void;
  onRemove: (id: string) => void;
}) {
  return (
    <div className="space-y-4">
      <section className="panel space-y-4 p-4 sm:p-5">
        <div>
          <h2 className="font-display text-2xl">The decision</h2>
          <p className="mt-1 text-sm text-pretty text-muted">One technology choice, at one stage. Not the whole company.</p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Decision" className="sm:col-span-2">
            <input
              className="field"
              value={evaluation.title}
              placeholder="Name the decision, not the slogan"
              autoComplete="off"
              onChange={(event) => update((draft) => { draft.title = event.target.value; })}
            />
          </Field>
          <Field label="Organization">
            <input
              className="field"
              value={evaluation.organization}
              autoComplete="off"
              onChange={(event) => update((draft) => { draft.organization = event.target.value; })}
            />
          </Field>
          <Field label="Rater">
            <input
              className="field"
              value={evaluation.rater}
              autoComplete="off"
              onChange={(event) => update((draft) => { draft.rater = event.target.value; })}
            />
          </Field>
          <Field label="Class">
            <select className="field" value={evaluation.technologyClass} onChange={(event) => update((draft) => { draft.technologyClass = event.target.value; })}>
              {TECHNOLOGY_CLASSES.map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>
          </Field>
          <Field label="Stage">
            <select className="field" value={evaluation.stage} onChange={(event) => update((draft) => { draft.stage = event.target.value; })}>
              {STAGES.map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>
          </Field>
          <Field label="Date">
            <input className="field" type="date" value={evaluation.date} onChange={(event) => update((draft) => { draft.date = event.target.value; })} />
          </Field>
        </div>
      </section>

      <section className="panel space-y-4 p-4 sm:p-5">
        <div>
          <h2 className="font-display text-2xl">The person at the center</h2>
          <p className="mt-1 text-sm text-pretty text-muted">Name someone who can be harmed or helped. If the typical customer is a different person, score them in a second record. Do not average the two.</p>
        </div>
        <Field label="Rights-bearer">
          <input
            className="field"
            value={evaluation.person}
            placeholder="A 13-year-old autistic student, a household downstream, a patient"
            autoComplete="off"
            onChange={(event) => update((draft) => { draft.person = event.target.value; })}
          />
        </Field>
        <Field label="Setting">
          <input
            className="field"
            value={evaluation.setting}
            placeholder="Home, school, clinic, watershed, ward, street"
            autoComplete="off"
            onChange={(event) => update((draft) => { draft.setting = event.target.value; })}
          />
        </Field>
        <ol className="grid gap-2 text-sm sm:grid-cols-2">
          {[
            ["Micro", "The person, in their own body and day."],
            ["Mezzo", "Ties between home, school, clinic, work, and peers."],
            ["Exo", "Decisions made elsewhere that still land here — a permit, a procurement, a campus."],
            ["Macro", "Peace, climate, law, and the worth assigned to a person."],
            ["Chrono", "Time: prevention, the next stage, people not yet born."],
          ].map(([level, text]) => (
            <li key={level} className="rounded-xl bg-paper px-3 py-2">
              <span className="font-semibold">{level}. </span>
              <span className="text-muted">{text}</span>
            </li>
          ))}
        </ol>
      </section>

      <section className="panel space-y-4 p-4 sm:p-5">
        <div>
          <h2 className="font-display text-2xl">Where harm lands</h2>
          <p className="mt-1 text-sm text-pretty text-muted">
            These flags do not lower anyone’s worth and they do not score a diagnosis. They raise the weight of costs and threats when those fall on people with less room to refuse, adapt, or leave.
          </p>
        </div>
        <div className="grid gap-2">
          {FLAGS.map((flag) => {
            const on = evaluation.vulnerability[flag.id];
            return (
              <button
                key={flag.id}
                type="button"
                aria-pressed={on}
                onClick={() => update((draft) => { draft.vulnerability[flag.id] = !draft.vulnerability[flag.id]; })}
                className={clsx("choice flex min-h-11 w-full items-start gap-3 rounded-xl px-3 py-2 text-left", on ? "bg-ink text-surface" : "bg-paper text-ink")}
              >
                <span className={clsx("mt-0.5 grid size-5 shrink-0 place-items-center rounded border", on ? "border-surface" : "border-line")}>
                  {on ? <Check className="size-3" aria-hidden /> : null}
                </span>
                <span>
                  <span className="block font-semibold">{flag.label}</span>
                  <span className={clsx("block text-sm text-pretty", on ? "text-on-ink-muted" : "text-muted")}>{flag.detail}</span>
                </span>
              </button>
            );
          })}
        </div>
        <div>
          <p className="text-sm font-semibold">Share of the harms, costs, and residual risks that land on the people flagged</p>
          <p className="text-sm text-muted">Not the share of benefits. Until a flag is on, this share does nothing.</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {SHARE_STEPS.map((step) => (
              <button
                key={step.value}
                type="button"
                aria-pressed={evaluation.vulnerability.share === step.value}
                onClick={() => update((draft) => { draft.vulnerability.share = step.value; })}
                className={clsx(
                  "choice min-h-11 rounded-xl px-3 text-sm font-semibold",
                  evaluation.vulnerability.share === step.value ? "bg-ink text-surface" : "bg-paper text-ink",
                )}
              >
                {step.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="panel space-y-4 p-4 sm:p-5">
        <div>
          <h2 className="font-display text-2xl">Power and the capacity to govern it</h2>
          <p className="mt-1 text-sm text-pretty text-muted">Greater power to transform the world has to be matched by a greater capacity to discern and to stop. If you do not know the governance, score it 0.</p>
        </div>
        <Scale
          label="Scale of power"
          value={evaluation.power}
          options={POWER_ANCHORS}
          onChange={(value) => update((draft) => { draft.power = value; })}
        />
        <Scale
          label="Governance that actually exists"
          value={evaluation.governance}
          options={GOVERNANCE_ANCHORS}
          onChange={(value) => update((draft) => { draft.governance = value; })}
        />
      </section>

      <section className="panel space-y-3 p-4 sm:p-5">
        <h2 className="font-display text-2xl">Rater note</h2>
        <textarea
          className="field"
          value={evaluation.notes}
          placeholder="Why this posture, what you refused to score, what the second rater disputed."
          onChange={(event) => update((draft) => { draft.notes = event.target.value; })}
        />
      </section>

      <section className="panel space-y-3 p-4 sm:p-5">
        <h2 className="font-display text-2xl">Snapshots in this browser</h2>
        {records.length === 0 && <p className="text-sm text-muted">Nothing saved yet. A snapshot stays on this device.</p>}
        <ul className="space-y-2">
          {records.map((record) => (
            <li key={record.id} className="flex flex-wrap items-center justify-between gap-2 rounded-xl bg-paper px-3 py-2">
              <div className="min-w-0">
                <p className="truncate font-semibold">{record.evaluation.title || "Untitled decision"}</p>
                <p className="text-sm tabular-nums text-muted">
                  {record.index === null ? "—" : Math.round(record.index)}
                  {record.holds ? ` · ${record.holds} hold${record.holds === 1 ? "" : "s"}` : ""} · {new Date(record.savedAt).toLocaleString()}
                </p>
              </div>
              <div className="flex gap-2">
                <button type="button" className="choice min-h-11 rounded-xl bg-ink px-3 text-sm font-semibold text-surface" onClick={() => onOpen(record.evaluation)}>
                  Open
                </button>
                <button type="button" className="choice min-h-11 rounded-xl px-3 text-sm font-semibold text-oxide" onClick={() => onRemove(record.id)}>
                  Remove
                </button>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

function DomainStep({
  evaluation,
  result,
  domainId,
  update,
}: {
  evaluation: Evaluation;
  result: ScoreResult;
  domainId: DomainId;
  update: (change: (draft: Evaluation) => void) => void;
}) {
  const domain = DOMAINS.find((item) => item.id === domainId)!;
  const score = evaluation.domains[domainId];
  const holds = result.safeguards.filter((item) => item.status === "hold" && item.domains.includes(domainId));
  return (
    <section className="panel space-y-5 p-4 sm:p-5">
      <div>
        <p className="text-xs font-semibold uppercase tracking-widest text-muted">
          {domain.level} · weight {DOMAIN_WEIGHT[domainId].toFixed(2)}
        </p>
        <h2 className="mt-1 font-display text-3xl">{domain.label}</h2>
        <p className="mt-2 text-pretty">{domain.ask}</p>
        <p className="mt-1 text-sm text-pretty text-muted">{domain.watch}</p>
      </div>
      {holds.map((hold) => (
        <p key={hold.id} className="rounded-xl bg-oxide-soft px-3 py-2 text-sm text-pretty text-ink">
          <span className="font-semibold text-oxide">{hold.title} holds. </span>
          {hold.detail}
        </p>
      ))}
      <div className="grid gap-4 lg:grid-cols-2">
        {CONSTRUCTS.map((construct) => (
          <ScorePicker
            key={construct.id}
            construct={construct.id}
            label={construct.label}
            hint={construct.hint}
            tone={construct.tone}
            value={score[construct.id]}
            onChange={(value) =>
              update((draft) => {
                draft.domains[domainId][construct.id] = value;
              })
            }
          />
        ))}
      </div>
      <Field label="Evidence">
        <textarea
          className="field"
          value={score.evidence}
          placeholder="A source for any 3 or 4: a measurement, a control, a contract, a visit, the person’s own account."
          onChange={(event) => update((draft) => { draft.domains[domainId].evidence = event.target.value; })}
        />
      </Field>
      <div>
        <p className="text-sm font-semibold">Confidence in this domain</p>
        <p className="text-sm text-muted">One judgment for the domain. Low confidence widens the band. It does not pretend the anchor was a 2.</p>
        <div className="mt-2 flex flex-wrap gap-2">
          {(["low", "moderate", "high"] as Confidence[]).map((level) => (
            <button
              key={level}
              type="button"
              aria-pressed={score.confidence === level}
              onClick={() => update((draft) => { draft.domains[domainId].confidence = level; })}
              className={clsx(
                "choice min-h-11 rounded-xl px-3 text-sm font-semibold capitalize",
                score.confidence === level ? "bg-ink text-surface" : "bg-paper text-ink",
              )}
            >
              {level}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

function ScorePicker({
  construct,
  label,
  hint,
  tone,
  value,
  onChange,
}: {
  construct: Construct;
  label: string;
  hint: string;
  tone: "good" | "harm";
  value: Anchor | null;
  onChange: (value: Anchor | null) => void;
}) {
  return (
    <fieldset className="rounded-xl bg-paper p-3">
      <legend className="px-1 font-semibold">{label}</legend>
      <p className="mb-2 text-sm text-pretty text-muted">{hint}</p>
      <div className="flex flex-wrap gap-2" role="group" aria-label={label}>
        <button
          type="button"
          aria-pressed={value === null}
          onClick={() => onChange(null)}
          className={clsx(
            "choice grid h-11 w-11 place-items-center rounded-xl font-semibold",
            value === null ? "bg-ink text-surface" : "bg-surface text-muted",
          )}
        >
          —
        </button>
        {([0, 1, 2, 3, 4] as Anchor[]).map((anchor) => (
          <button
            key={anchor}
            type="button"
            aria-pressed={value === anchor}
            onClick={() => onChange(anchor)}
            className={clsx(
              "choice grid h-11 w-11 place-items-center rounded-xl font-semibold tabular-nums",
              value === anchor ? (tone === "good" ? "bg-leaf text-surface" : "bg-oxide text-surface") : "bg-surface text-ink",
            )}
          >
            {anchor}
          </button>
        ))}
      </div>
      <p className="mt-2 min-h-11 text-sm text-pretty">
        {value === null ? "Unscored. This anchor will be left out, not treated as zero." : ANCHORS[construct][value]}
      </p>
    </fieldset>
  );
}

function Scale({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: Anchor;
  options: Record<Anchor, { short: string; text: string }>;
  onChange: (value: Anchor) => void;
}) {
  return (
    <fieldset>
      <legend className="text-sm font-semibold">{label}</legend>
      <div className="mt-2 flex flex-wrap gap-2">
        {([0, 1, 2, 3, 4] as Anchor[]).map((anchor) => (
          <button
            key={anchor}
            type="button"
            aria-pressed={value === anchor}
            onClick={() => onChange(anchor)}
            className={clsx(
              "choice min-h-11 rounded-xl px-3 text-sm font-semibold",
              value === anchor ? "bg-ink text-surface" : "bg-paper text-ink",
            )}
          >
            {anchor} {options[anchor].short}
          </button>
        ))}
      </div>
      <p className="mt-2 text-sm text-pretty text-muted">{options[value].text}</p>
    </fieldset>
  );
}

function Field({ label, children, className }: { label: string; children: ReactNode; className?: string }) {
  return (
    <label className={clsx("block", className)}>
      <span className="mb-1 block text-sm font-semibold">{label}</span>
      {children}
    </label>
  );
}
