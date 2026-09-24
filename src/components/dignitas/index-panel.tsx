import { AlertTriangle, Check, Circle, Minus } from "lucide-react";
import { clsx } from "clsx";
import {
  DOMAINS,
  DOMAIN_WEIGHT,
  POSTURE_LABEL,
  PROTOCOL_VERSION,
  WORTH_LINE,
  domainById,
  type Evaluation,
  type Posture,
} from "@/lib/dignitas/model";
import { bandLabel, type Recommendation, type ScoreResult } from "@/lib/dignitas/score";
import { constructLabel } from "@/lib/dignitas/export";

function one(value: number | null) {
  return value === null ? "—" : value.toFixed(1);
}

function statusIcon(status: ScoreResult["safeguards"][number]["status"]) {
  if (status === "hold") return <AlertTriangle className="size-4 text-oxide" aria-hidden />;
  if (status === "clear") return <Check className="size-4 text-leaf" aria-hidden />;
  if (status === "na") return <Minus className="size-4 text-muted" aria-hidden />;
  return <Circle className="size-4 text-muted" aria-hidden />;
}

const STATUS_WORD = {
  hold: "Holds",
  clear: "Clear",
  untested: "Not tested",
  na: "Not used",
} as const;

export function IndexPanel({
  evaluation,
  result,
  notice,
  onPosture,
  onSave,
  onMarkdown,
  onJson,
}: {
  evaluation: Evaluation;
  result: ScoreResult;
  notice: string | null;
  onPosture: (posture: Posture) => void;
  onSave: () => void;
  onMarkdown: () => void;
  onJson: () => void;
}) {
  if (result.cells === 0) {
    return (
      <aside className="panel order-1 p-5 lg:sticky lg:top-4 lg:order-2 lg:max-h-screen lg:overflow-y-auto">
        <p className="text-xs font-semibold uppercase tracking-widest text-muted">Dignity Index</p>
        <p className="mt-3 font-display text-6xl leading-none text-muted">—</p>
        <p className="mt-4 text-sm text-pretty text-ink">
          Score at least one benefit or opportunity, and one cost or threat. Unscored is not zero.
        </p>
        <p className="mt-3 text-sm text-pretty text-muted">{WORTH_LINE}</p>
      </aside>
    );
  }

  const held = result.safeguards.some((item) => item.status === "hold");
  const numberTone = held || (result.index !== null && result.index < 50) ? "text-oxide" : result.index !== null && result.index >= 65 ? "text-leaf" : "text-ink";
  const suggestion = result.recommendation === "incomplete" ? "Incomplete" : POSTURE_LABEL[result.recommendation];

  return (
    <aside className="panel order-1 p-5 lg:sticky lg:top-4 lg:order-2 lg:max-h-screen lg:overflow-y-auto">
      <p className="text-xs font-semibold uppercase tracking-widest text-muted">Dignity Index · v{PROTOCOL_VERSION}</p>
      <p className={clsx("mt-2 font-display text-7xl leading-none tabular-nums", numberTone)} aria-live="polite">
        {result.index === null ? "—" : Math.round(result.index)}
      </p>
      <p className="mt-2 text-lg font-semibold text-balance">{bandLabel(result.index)}</p>
      {held && (
        <p className="mt-2 text-sm font-semibold text-oxide">Safeguard hold. Do not read the index as permission.</p>
      )}
      <div className="relative mt-4 h-1.5 rounded-full bg-line" aria-hidden>
        {result.index !== null && (
          <span
            className="absolute top-1/2 size-3.5 -translate-y-1/2 rounded-full bg-ink"
            style={{ left: `clamp(0px, calc(${result.index}% - 7px), calc(100% - 14px))` }}
          />
        )}
      </div>
      <div className="mt-1 flex justify-between text-xs text-muted">
        <span>0</span>
        <span>no effect</span>
        <span>100</span>
      </div>
      <p className="mt-4 text-sm text-pretty text-muted">{WORTH_LINE}</p>

      <dl className="mt-5 grid grid-cols-2 gap-3">
        <Metric label="Benefits" value={result.benefit} tone="good" />
        <Metric label="Opportunities" value={result.opportunity} tone="good" />
        <Metric label="Costs" value={result.cost} tone="harm" />
        <Metric label="Threats" value={result.threat} tone="harm" />
      </dl>

      <p className="mt-4 text-sm tabular-nums text-ink">
        Good {one(result.good)} − adjusted harm {one(result.adjustedHarm)}
      </p>
      <p className="text-sm tabular-nums text-muted">
        Raw {one(result.rawIndex)}
        {result.clamped ? " · floored at the scale. Past the floor, read the holds, not a lower number." : ""}
        {result.band ? ` · evidence band ${result.band[0]}–${result.band[1]}` : ""}
      </p>
      <p className="mt-2 text-sm text-pretty text-muted">
        Harm × {result.vulnerability.toFixed(2)}. The multiplier raises costs and threats when they land on people with less room to refuse. It never raises benefits, and it is not a score of the person.
      </p>
      <p className="mt-2 text-sm text-pretty text-ink">{result.gapSentence}</p>

      {result.safeguards.some((item) => item.status === "hold" || item.status === "untested") && (
        <ul className="mt-4 space-y-3">
          {result.safeguards
            .filter((item) => item.status === "hold" || item.status === "untested")
            .map((item) => (
              <li key={item.id} className="flex gap-2 text-sm">
                <span className="mt-0.5">{statusIcon(item.status)}</span>
                <span>
                  <span className="font-semibold">{item.title}</span>
                  <span className="text-muted"> · {STATUS_WORD[item.status]}. </span>
                  <span className="text-pretty text-ink">{item.detail}</span>
                </span>
              </li>
            ))}
        </ul>
      )}
      {result.safeguards.some((item) => item.status === "clear" || item.status === "na") && (
        <details className="mt-3 text-sm">
          <summary className="min-h-11 cursor-pointer py-2 font-semibold">
            {result.safeguards.filter((item) => item.status === "clear").length} clear
            {result.safeguards.some((item) => item.status === "na") ? " · some not used" : ""}
          </summary>
          <ul className="space-y-3 pb-2">
            {result.safeguards
              .filter((item) => item.status === "clear" || item.status === "na")
              .map((item) => (
                <li key={item.id} className="flex gap-2">
                  <span className="mt-0.5">{statusIcon(item.status)}</span>
                  <span>
                    <span className="font-semibold">{item.title}</span>
                    <span className="text-muted"> · {STATUS_WORD[item.status]}. </span>
                    <span className="text-pretty">{item.detail}</span>
                  </span>
                </li>
              ))}
          </ul>
        </details>
      )}

      <div className="mt-5 border-t border-line pt-4">
        <p className="text-xs font-semibold uppercase tracking-widest text-muted">Suggestion for this stage</p>
        <p className="mt-1 font-semibold">{suggestion}</p>
        <p className="mt-1 text-sm text-pretty text-muted">{result.reason}</p>
      </div>

      <div className="mt-4">
        <p className="text-xs font-semibold uppercase tracking-widest text-muted">Rater posture</p>
        <div className="mt-2 grid gap-2">
          {(Object.keys(POSTURE_LABEL) as Posture[]).map((posture) => (
            <button
              key={posture}
              type="button"
              aria-pressed={evaluation.posture === posture}
              onClick={() => onPosture(posture)}
              className={clsx(
                "choice min-h-11 rounded-xl px-3 text-left text-sm font-semibold",
                evaluation.posture === posture ? "bg-ink text-surface" : "bg-paper text-ink",
              )}
            >
              {POSTURE_LABEL[posture]}
            </button>
          ))}
        </div>
        {evaluation.posture && evaluation.posture !== result.recommendation && result.recommendation !== "incomplete" && (
          <p className="mt-2 text-sm text-muted">This posture differs from the protocol suggestion. Say why in the rater note.</p>
        )}
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        <button type="button" onClick={onSave} className="choice min-h-11 rounded-xl bg-leaf px-4 font-semibold text-surface">
          Save snapshot
        </button>
        <button type="button" onClick={onMarkdown} className="choice min-h-11 rounded-xl bg-paper px-4 font-semibold text-ink">
          Markdown
        </button>
        <button type="button" onClick={onJson} className="choice min-h-11 rounded-xl bg-paper px-4 font-semibold text-ink">
          JSON
        </button>
      </div>
      {notice && <p className="mt-2 text-sm text-leaf">{notice}</p>}

      <details className="mt-4 text-sm">
        <summary className="min-h-11 cursor-pointer py-2 font-semibold">What is pulling the number</summary>
        <p className="text-pretty text-muted">
          Based on {result.cells} of 32 anchors. Confidence does not drag a score toward 50. When domains disagree, stronger evidence outweighs weaker. Thin evidence widens the band. The band is not a statistical confidence interval.
        </p>
        {result.driversGood.length > 0 && (
          <p className="mt-3 font-semibold">Largest goods</p>
        )}
        <ul className="mt-1 space-y-1">
          {result.driversGood.map((driver) => (
            <li key={`${driver.domain}-${driver.construct}`} className="tabular-nums">
              {domainById(driver.domain).short} {constructLabel(driver.construct).toLowerCase()} {driver.anchor}
              <span className="text-muted"> · {driver.points.toFixed(1)} pts of good</span>
            </li>
          ))}
        </ul>
        {result.driversHarm.length > 0 && <p className="mt-3 font-semibold">Largest harms</p>}
        <ul className="mt-1 space-y-1">
          {result.driversHarm.map((driver) => (
            <li key={`${driver.domain}-${driver.construct}`} className="tabular-nums">
              {domainById(driver.domain).short} {constructLabel(driver.construct).toLowerCase()} {driver.anchor}
              <span className="text-muted"> · {driver.points.toFixed(1)} pts of adjusted harm</span>
            </li>
          ))}
        </ul>
        {result.uncited.length > 0 && (
          <p className="mt-3 text-pretty">
            Anchors of 3 or 4 still need a source:{" "}
            {result.uncited
              .map((item) => `${domainById(item.domain).short} ${constructLabel(item.construct).toLowerCase()}`)
              .join(", ")}
            .
          </p>
        )}
        <p className="mt-3 text-muted">
          Domain weights in this version: {DOMAINS.map((domain) => `${domain.short} ${DOMAIN_WEIGHT[domain.id]}`).join(" · ")}.
        </p>
      </details>
    </aside>
  );
}

function Metric({ label, value, tone }: { label: string; value: number | null; tone: "good" | "harm" }) {
  return (
    <div className="rounded-xl bg-paper px-3 py-2">
      <dt className="text-xs font-semibold uppercase tracking-widest text-muted">{label}</dt>
      <dd className="mt-1 font-display text-3xl leading-none tabular-nums">{value === null ? "—" : Math.round(value)}</dd>
      <progress className={clsx("mt-2", tone === "harm" && "harm", tone === "good" && "good")} value={value ?? 0} max={100} />
    </div>
  );
}
