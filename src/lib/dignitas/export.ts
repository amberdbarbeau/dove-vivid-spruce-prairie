import {
  ANCHORS,
  CONSTRUCTS,
  DOMAIN_WEIGHT,
  DOMAINS,
  FLAGS,
  POSTURE_LABEL,
  PROTOCOL_VERSION,
  WORTH_LINE,
  type Construct,
  type Evaluation,
} from "./model";
import { bandLabel, type ScoreResult } from "./score";

function line(value: string | number | null | undefined) {
  if (value === null || value === undefined || value === "") return "—";
  return String(value);
}

function num(value: number | null, digits = 1) {
  if (value === null) return "—";
  return value.toFixed(digits);
}

function slug(title: string) {
  const cleaned = title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
  return cleaned || "dignitas-record";
}

export function recordSlug(evaluation: Evaluation) {
  return slug(evaluation.title || "untitled-decision");
}

function anchorCell(value: number | null) {
  return value === null ? "—" : String(value);
}

export function toMarkdown(evaluation: Evaluation, result: ScoreResult) {
  const flags = FLAGS.filter((flag) => evaluation.vulnerability[flag.id])
    .map((flag) => flag.label)
    .join("; ");
  const domainRows = DOMAINS.map((domain) => {
    const score = evaluation.domains[domain.id];
    return `| ${domain.label} | ${domain.level} | ${anchorCell(score.benefit)} | ${anchorCell(score.opportunity)} | ${anchorCell(score.cost)} | ${anchorCell(score.threat)} | ${score.confidence} | ${score.evidence.replace(/\|/g, "/").replace(/\n/g, " ") || "—"} |`;
  }).join("\n");
  const safeguards = result.safeguards
    .map((item) => `- **${item.title}** — ${item.status}. ${item.detail}`)
    .join("\n");
  const posture = evaluation.posture ? POSTURE_LABEL[evaluation.posture] : "Not recorded";
  const suggestion =
    result.recommendation === "incomplete" ? "Incomplete protocol" : POSTURE_LABEL[result.recommendation];

  return `# Dignitas Protocol v${PROTOCOL_VERSION}

${WORTH_LINE}

## Decision

- Title: ${line(evaluation.title)}
- Organization: ${line(evaluation.organization)}
- Class: ${line(evaluation.technologyClass)}
- Stage: ${line(evaluation.stage)}
- Rater: ${line(evaluation.rater)}
- Date: ${line(evaluation.date)}

## The person

- Rights-bearer: ${line(evaluation.person)}
- Setting: ${line(evaluation.setting)}
- Where harm lands: ${flags || "No exposure flag"}
- Share of harms on those flags: ${Math.round(evaluation.vulnerability.share * 100)}%
- Power: ${evaluation.power} · Governance: ${evaluation.governance}
- ${result.gapSentence}

## Index

- Dignity Index: ${result.index === null ? "—" : Math.round(result.index)}
- Raw: ${num(result.rawIndex)}${result.clamped ? " (clamped to 0–100)" : ""}
- Band: ${bandLabel(result.index)}
- Evidence band: ${result.band ? `${result.band[0]}–${result.band[1]}` : "—"}
- Benefits: ${num(result.benefit)}
- Opportunities: ${num(result.opportunity)}
- Costs: ${num(result.cost)}
- Threats: ${num(result.threat)}
- Good: ${num(result.good)}
- Harm: ${num(result.harm)}
- Vulnerability multiplier: ×${num(result.vulnerability)}
- Adjusted harm: ${num(result.adjustedHarm)}
- Anchors scored: ${result.cells} of 32
- Coverage: ${num(result.coverage * 100, 0)}%

## Safeguards

${safeguards}

## Suggestion and posture

- Protocol suggestion: ${suggestion}
- Why: ${result.reason}
- Rater posture: ${posture}
- Note: ${line(evaluation.notes)}

## Domain scores

Anchor scale 0–4. Blank means unscored, not zero.

| Domain | System | Benefit | Opportunity | Cost | Threat | Confidence | Evidence |
| --- | --- | --- | --- | --- | --- | --- | --- |
${domainRows}

## How to read the anchors

${CONSTRUCTS.map((construct) => {
  const lines = ([0, 1, 2, 3, 4] as const)
    .map((anchor) => `  - ${anchor}: ${ANCHORS[construct.id][anchor]}`)
    .join("\n");
  return `### ${construct.label}\n\n${lines}`;
}).join("\n\n")}

## Formula (v${PROTOCOL_VERSION}, weights fixed)

Good = ${GOOD_TEXT}
Harm = ${HARM_TEXT}
Adjusted harm = Harm × vulnerability multiplier
Raw index = 50 + ½ (Good − Adjusted harm)
Dignity Index = clamp(raw, 0, 100)

Unscored domains are omitted, not treated as zero. If only one construct on a side is scored, that side uses it alone.

Domain weights: ${DOMAINS.map((domain) => `${domain.short} ${DOMAIN_WEIGHT[domain.id]}`).join(", ")}.

${WORTH_LINE}
`;
}

const GOOD_TEXT = "0.62×Benefits + 0.38×Opportunities";
const HARM_TEXT = "0.45×Costs + 0.55×Threats";

export function toJson(evaluation: Evaluation, result: ScoreResult) {
  return JSON.stringify(
    {
      protocol: `Dignitas ${PROTOCOL_VERSION}`,
      worth: WORTH_LINE,
      evaluation,
      result,
      weights: {
        domains: DOMAIN_WEIGHT,
        good: { benefit: 0.62, opportunity: 0.38 },
        harm: { cost: 0.45, threat: 0.55 },
        flags: Object.fromEntries(FLAGS.map((flag) => [flag.id, flag.loading])),
      },
    },
    null,
    2,
  );
}

export function downloadText(filename: string, text: string, type: string) {
  const blob = new Blob([text], { type });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

export function constructLabel(construct: Construct) {
  return CONSTRUCTS.find((item) => item.id === construct)?.label ?? construct;
}
