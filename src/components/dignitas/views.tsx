import {
  ANCHORS,
  CONSTRUCTS,
  DOMAINS,
  DOMAIN_WEIGHT,
  FLAGS,
  GOVERNANCE_ANCHORS,
  POSTURE_LABEL,
  POWER_ANCHORS,
  PROTOCOL_VERSION,
  WORTH_LINE,
  type Anchor,
  type Evaluation,
} from "@/lib/dignitas/model";
import { bandLabel, type ScoreResult } from "@/lib/dignitas/score";

function one(value: number | null) {
  return value === null ? "—" : value.toFixed(1);
}

export function Brief({
  evaluation,
  result,
  onPrint,
}: {
  evaluation: Evaluation;
  result: ScoreResult;
  onPrint: () => void;
}) {
  const flags = FLAGS.filter((flag) => evaluation.vulnerability[flag.id]);
  const suggestion = result.recommendation === "incomplete" ? "Incomplete protocol" : POSTURE_LABEL[result.recommendation];
  return (
    <article className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
      <div className="no-print mb-6 flex justify-end">
        <button type="button" onClick={onPrint} className="choice min-h-11 rounded-xl bg-ink px-4 font-semibold text-surface">
          Print brief
        </button>
      </div>
      <p className="text-xs font-semibold uppercase tracking-widest text-muted">Dignitas Protocol v{PROTOCOL_VERSION}</p>
      <h2 className="mt-2 font-display text-4xl leading-tight">{evaluation.title || "Untitled decision"}</h2>
      <p className="mt-2 text-muted">
        {evaluation.technologyClass} · {evaluation.stage}
        {evaluation.organization ? ` · ${evaluation.organization}` : ""}
      </p>
      <p className="mt-6 font-display text-6xl leading-none tabular-nums">
        {result.index === null ? "—" : Math.round(result.index)}
      </p>
      <p className="mt-2 text-lg font-semibold">{bandLabel(result.index)}</p>
      <p className="mt-2 text-sm text-pretty text-muted">{WORTH_LINE}</p>
      <p className="mt-4 text-sm tabular-nums">
        Benefits {one(result.benefit)} · Opportunities {one(result.opportunity)} · Costs {one(result.cost)} · Threats{" "}
        {one(result.threat)}
      </p>
      <p className="text-sm tabular-nums text-muted">
        Good {one(result.good)} − adjusted harm {one(result.adjustedHarm)} · raw {one(result.rawIndex)}
        {result.band ? ` · evidence band ${result.band[0]}–${result.band[1]}` : ""}
      </p>

      <h3 className="mt-8 font-display text-2xl">The person</h3>
      <p className="mt-2">{evaluation.person || "Unnamed."}</p>
      <p className="text-muted">{evaluation.setting || "Setting not stated."}</p>
      <p className="mt-2 text-sm">
        Exposure flags: {flags.length ? flags.map((flag) => flag.label).join("; ") : "none"}. Share of harms on those
        flags: {Math.round(evaluation.vulnerability.share * 100)}%. Multiplier ×{result.vulnerability.toFixed(2)}.
      </p>
      <p className="mt-2 text-sm">{result.gapSentence}</p>
      <p className="text-sm text-muted">
        Power {evaluation.power}: {POWER_ANCHORS[evaluation.power].text} Governance {evaluation.governance}:{" "}
        {GOVERNANCE_ANCHORS[evaluation.governance].text}
      </p>

      <h3 className="mt-8 font-display text-2xl">Safeguards</h3>
      <ul className="mt-2 space-y-2 text-sm">
        {result.safeguards.map((item) => (
          <li key={item.id}>
            <span className="font-semibold">{item.title}</span> — {item.status}. {item.detail}
          </li>
        ))}
      </ul>

      <h3 className="mt-8 font-display text-2xl">Posture</h3>
      <p className="mt-2 text-sm">
        Suggestion: {suggestion}. {result.reason}
      </p>
      <p className="mt-1 text-sm">Rater posture: {evaluation.posture ? POSTURE_LABEL[evaluation.posture] : "Not recorded."}</p>
      {evaluation.notes && <p className="mt-3 text-pretty">{evaluation.notes}</p>}

      <h3 className="mt-8 font-display text-2xl">Domains</h3>
      <div className="mt-3 space-y-4">
        {DOMAINS.map((domain) => {
          const score = evaluation.domains[domain.id];
          return (
            <section key={domain.id} className="border-t border-line pt-3">
              <h4 className="font-semibold">
                {domain.label} <span className="font-normal text-muted">· {domain.level}</span>
              </h4>
              <p className="text-sm tabular-nums text-muted">
                Benefit {score.benefit ?? "—"} · Opportunity {score.opportunity ?? "—"} · Cost {score.cost ?? "—"} · Threat{" "}
                {score.threat ?? "—"} · {score.confidence} confidence
              </p>
              {score.evidence && <p className="mt-1 text-sm text-pretty">{score.evidence}</p>}
            </section>
          );
        })}
      </div>
      <p className="mt-8 text-sm text-muted">
        Rater {evaluation.rater || "unnamed"}
        {evaluation.date ? ` · ${evaluation.date}` : ""}. Computed with Dignitas Protocol v{PROTOCOL_VERSION}. Weights are
        fixed in this version.
      </p>
    </article>
  );
}

export function Method() {
  return (
    <article className="mx-auto max-w-3xl space-y-8 px-4 py-8 sm:px-6">
      <header>
        <p className="text-xs font-semibold uppercase tracking-widest text-muted">Protocol v{PROTOCOL_VERSION}</p>
        <h2 className="mt-2 font-display text-4xl">How to evaluate a technology against a person</h2>
        <p className="mt-3 text-pretty text-muted">{WORTH_LINE}</p>
      </header>

      <section className="space-y-3">
        <h3 className="font-display text-2xl">What the number is</h3>
        <p>
          The Dignity Index runs from 0 to 100. Fifty means no assessed effect. It is not a passing grade. Above 50, the
          scored goods outweigh the adjusted harms. Below 50, they do not.
        </p>
        <p>
          Benefits and opportunities are the goods. Costs and threats are the harms. Opportunities are discounted,
          because a breakthrough that is only promised is not yet a good in someone’s life. Threats outweigh costs inside
          the harm term, because surveillance, manipulation, weapons, and shortage can outrun a line item.
        </p>
        <div className="panel space-y-1 p-4 text-sm tabular-nums">
          <p>Good = 0.62 × Benefits + 0.38 × Opportunities</p>
          <p>Harm = 0.45 × Costs + 0.55 × Threats</p>
          <p>Adjusted harm = Harm × vulnerability multiplier</p>
          <p>Raw index = 50 + ½ (Good − Adjusted harm)</p>
          <p>Dignity Index = clamp(raw, 0, 100), then rounded for the headline</p>
        </div>
        <p className="text-sm text-muted">
          Unscored domains are left out. They are not zeros. If only one construct on a side is scored, that side uses it
          alone. Confidence changes the point estimate only when domains disagree: stronger evidence outweighs weaker. It
          does not pull a lonely judgment toward 50. Thin evidence widens the evidence band. That band is not a sampling
          confidence interval.
        </p>
      </section>

      <section className="space-y-3">
        <h3 className="font-display text-2xl">The person in their systems</h3>
        <p>
          The unit of analysis is one rights-bearing person in the settings that hold them, not an averaged user and not
          the product. The map follows ecological systems: micro (the person), mezzo (the ties between home, school,
          clinic, and work — Bronfenbrenner’s mesosystem), exo (decisions made elsewhere that land on them, such as a
          data-center permit), macro (peace, climate, law, the worth a society assigns), and chrono (time, prevention,
          and the people not yet born).
        </p>
        <ul className="space-y-2 text-sm">
          {DOMAINS.map((domain) => (
            <li key={domain.id}>
              <span className="font-semibold">{domain.label}</span>
              <span className="text-muted"> · {domain.level} · weight {DOMAIN_WEIGHT[domain.id]}. </span>
              {domain.ask}
            </li>
          ))}
        </ul>
        <p className="text-sm text-muted">
          Weights are fixed in v{PROTOCOL_VERSION} so two reviews can be compared. Do not retune them to pass a product.
          If an organization needs different weights, publish a new version. Do not hide the change inside a scoring
          session.
        </p>
      </section>

      <section className="space-y-3">
        <h3 className="font-display text-2xl">Four judgments, one anchor scale</h3>
        <p>Each domain is scored 0 to 4 on four constructs. The anchors are the instrument. A number without them is a mood.</p>
        {CONSTRUCTS.map((construct) => (
          <div key={construct.id}>
            <h4 className="font-semibold">{construct.label}</h4>
            <p className="text-sm text-muted">{construct.hint}</p>
            <ul className="mt-1 text-sm">
              {([0, 1, 2, 3, 4] as Anchor[]).map((anchor) => (
                <li key={anchor}>
                  <span className="tabular-nums font-semibold">{anchor}. </span>
                  {ANCHORS[construct.id][anchor]}
                </li>
              ))}
            </ul>
          </div>
        ))}
        <p className="text-sm">An anchor of 3 or 4 needs a source in the evidence line: a measurement, a contract, a control you can point to, a site visit, or a statement from the people who bear it.</p>
      </section>

      <section className="space-y-3">
        <h3 className="font-display text-2xl">Where harm lands</h3>
        <p>
          The multiplier is 1 plus the share of harms — not the share of benefits — that fall on the flags you mark,
          times the loadings below. It tops out at 2. It never increases a benefit. Marking an autistic youth, or a poor
          household, does not say that person is a cost. It says a harm landing on someone with less room to refuse
          counts more than the same harm landing on someone who can walk away.
        </p>
        <ul className="space-y-2 text-sm">
          {FLAGS.map((flag) => (
            <li key={flag.id}>
              <span className="font-semibold">{flag.label}</span>
              <span className="tabular-nums text-muted"> · loading {flag.loading}. </span>
              {flag.detail}
            </li>
          ))}
        </ul>
      </section>

      <section className="space-y-3">
        <h3 className="font-display text-2xl">Safeguards are not averaged away</h3>
        <p>
          A food-system breakthrough does not license an ungoverned weapon. A construction wage does not cancel a lost
          aquifer. These holds survive a high index. While one holds, the suggestion is do not proceed.
        </p>
        <ul className="list-disc space-y-2 pl-5 text-sm">
          <li>Dignity. Person-domain threat is 3 or higher.</li>
          <li>Exposure. A flag is on, and mezzo ties or place show threat of 3 or higher with benefit of 1 or lower.</li>
          <li>Subsistence. Food, water, and energy show threat and cost of 3 or higher, and benefit of 1 or lower.</li>
          <li>Peace. Threat is 3 or higher and benefit is 1 or lower: surveillance, manipulation, discrimination, cyber offense, or violence without a human who can refuse.</li>
          <li>Preparedness. Generations threat is 3 or higher and benefit is 1 or lower.</li>
          <li>Discernment. Power outruns governance by 3 or more anchors, and any threat is 3 or higher.</li>
        </ul>
      </section>

      <section className="space-y-3">
        <h3 className="font-display text-2xl">How a suggestion is chosen</h3>
        <ul className="list-disc space-y-2 pl-5 text-sm">
          <li>Any safeguard hold: do not proceed.</li>
          <li>Index cannot be computed: incomplete.</li>
          <li>Index under 40: do not proceed.</li>
          <li>Index from 40 up to but not including 55: redesign.</li>
          <li>From 55 upward, a qualifier — untested safeguard, unsourced anchor of 3 or 4, coverage under 75 percent, or power ahead of governance by 2 or more — blocks an unqualified proceed. At 60 or higher the suggestion is proceed with conditions. Below that, redesign.</li>
          <li>Index of 70 or higher, no qualifier, governance at least level with power, coverage at least 90 percent: proceed at this stage.</li>
          <li>Otherwise, 60 or higher is proceed with conditions, and the rest is redesign.</li>
        </ul>
        <p className="text-sm text-muted">
          The band of the number and the posture can disagree. A system can “serve” on the arithmetic and still be
          stopped by a hold. That disagreement is the point of a non-compensatory rule. The posture applies to this
          stage. Rescore at design, pilot, and scale.
        </p>
        <p className="text-sm">
          Bands: 80–100 strongly serves the person; 65–79 serves the person; 50–64 mixed; 35–49 burdens the person;
          below 35, grave misalignment.
        </p>
      </section>

      <section className="space-y-3">
        <h3 className="font-display text-2xl">How a company runs it</h3>
        <ol className="list-decimal space-y-2 pl-5">
          <li>Name one decision. Not the whole firm.</li>
          <li>Name the person who bears the sharpest consequences. If a typical customer is someone else, write a second record. Do not average them into a fictional user.</li>
          <li>Set the scale of power, and the governance that actually exists. A PDF policy is not a 4. Unknown governance is a 0.</li>
          <li>Score only what you can anchor. Leave the rest blank.</li>
          <li>Put a source on every 3 and every 4.</li>
          <li>Read the holds before you celebrate the index.</li>
          <li>Record a posture. If you overrule the suggestion, write why.</li>
          <li>Export the markdown into the decision record — the repository, the review packet, the procurement file.</li>
          <li>Rescore when the stage changes. A design-stage proceed is not permission to scale.</li>
        </ol>
      </section>

      <section className="space-y-3">
        <h3 className="font-display text-2xl">Two readings worth making</h3>
        <p>
          Open the predictable classroom companion, then the behavior-scoring app. The person does not change. The
          system around an autistic student does. The index moves because of that, not because autism was entered as a
          deficit.
        </p>
        <p>
          Open the compute campus. Construction wages are a real benefit. They do not buy down a subsistence hold when
          cooling water and power land on a household that farms downstream.
        </p>
        <p>
          Open the flood warning and the clinician-held aid beside the loitering munition. High confidence is not
          goodness. On the weapon, high confidence means the harm is designed in, and the raw value falls through the
          floor of the scale.
        </p>
      </section>

      <section className="space-y-3">
        <h3 className="font-display text-2xl">Limits</h3>
        <ul className="list-disc space-y-2 pl-5 text-sm">
          <li>This build stores one rater. If a second rater disagrees by more than one anchor, that disagreement is a finding. Do not silently average it away.</li>
          <li>Ordinal anchors are treated as equally spaced. That is a modeling assumption, not a proven interval scale.</li>
          <li>One confidence judgment covers the whole domain.</li>
          <li>The evidence band is not a confidence interval and not a margin of error.</li>
          <li>This is not a clinical instrument, not an environmental impact statement, and not a legal finding.</li>
          <li>A high index does not replace asking the person. Consent that was never sought cannot be inferred from a score.</li>
          <li>The holds will miss harms that do not show up in these eight domains. Absence of a hold is not a proof of safety.</li>
        </ul>
      </section>

      <section className="space-y-3">
        <h3 className="font-display text-2xl">Where the standard comes from</h3>
        <p>
          The normative frame is the address to the Pontifical Academy of Sciences on “The Future of Science in a
          Changing World.” It treats digitalization, artificial intelligence, and robotics as grounds for hope —
          medicine, food and energy, a deeper reading of the universe and the natural world, creativity and cooperation —
          and as grounds for restraint: surveillance, manipulation, discrimination, cyber capability and autonomous
          weapons without human oversight, and the energy and water those systems drink. It says technological progress
          is never only technical, that power to transform the world has to be matched by discernment, and that climate
          shocks fall first on the poor and on people whose livelihoods are the land, the forests, and the oceans. The
          response it asks for is prevention rather than emergency, cooperation across disciplines and borders, and the
          young in the room.
        </p>
        <p>
          Companies do not need to share that theology to use the protocol. They do need to keep a person, not a market,
          as the unit of analysis. The arithmetic is an evaluation model. It is not a measurement of moral worth.
        </p>
      </section>
    </article>
  );
}
