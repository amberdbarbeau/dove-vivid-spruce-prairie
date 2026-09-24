import {
  ANCHORS,
  CONFIDENCE_WEIGHT,
  CONSTRUCTS,
  DOMAIN_WEIGHT,
  DOMAINS,
  FLAGS,
  GOOD_MIX,
  HARM_MIX,
  type Anchor,
  type Construct,
  type DomainId,
  type Evaluation,
  type Posture,
} from "./model";

export type SafeguardStatus = "hold" | "clear" | "untested" | "na";

export interface Safeguard {
  id: string;
  title: string;
  status: SafeguardStatus;
  detail: string;
  domains: DomainId[];
}

export interface Driver {
  domain: DomainId;
  construct: Construct;
  anchor: Anchor;
  points: number;
}

export type Recommendation = Posture | "incomplete";

export interface ScoreResult {
  benefit: number | null;
  opportunity: number | null;
  cost: number | null;
  threat: number | null;
  coverages: Record<Construct, number>;
  coverage: number;
  good: number | null;
  harm: number | null;
  vulnerability: number;
  adjustedHarm: number | null;
  index: number | null;
  rawIndex: number | null;
  clamped: boolean;
  cells: number;
  evidenceHalf: number | null;
  band: [number, number] | null;
  gap: number;
  gapSentence: string;
  safeguards: Safeguard[];
  driversGood: Driver[];
  driversHarm: Driver[];
  uncited: { domain: DomainId; construct: Construct }[];
  recommendation: Recommendation;
  reason: string;
}

const CONSTRUCT_IDS = CONSTRUCTS.map((item) => item.id);

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function meanOf(values: number[]) {
  if (!values.length) return 0;
  return values.reduce((sum, value) => sum + value, 0) / values.length;
}

interface ConstructStats {
  value: number | null;
  coverage: number;
  denominator: number;
  parts: { domain: DomainId; anchor: Anchor; weight: number }[];
}

function constructStats(evaluation: Evaluation, construct: Construct): ConstructStats {
  let numerator = 0;
  let denominator = 0;
  let weightScored = 0;
  const parts: ConstructStats["parts"] = [];
  for (const domain of DOMAINS) {
    const weight = DOMAIN_WEIGHT[domain.id];
    const anchor = evaluation.domains[domain.id][construct];
    if (anchor === null) continue;
    const confidence = CONFIDENCE_WEIGHT[evaluation.domains[domain.id].confidence];
    const weighted = weight * confidence;
    numerator += weighted * (anchor / 4);
    denominator += weighted;
    weightScored += weight;
    parts.push({ domain: domain.id, anchor, weight: weighted });
  }
  return {
    value: denominator === 0 ? null : (numerator / denominator) * 100,
    coverage: weightScored,
    denominator,
    parts,
  };
}

function mix(parts: { key: string; value: number | null; weight: number }[]) {
  const present = parts.filter((part) => part.value !== null) as {
    key: string;
    value: number;
    weight: number;
  }[];
  if (!present.length) return { value: null as number | null, share: {} as Record<string, number> };
  const denominator = present.reduce((sum, part) => sum + part.weight, 0);
  const share: Record<string, number> = {};
  let value = 0;
  for (const part of present) {
    const portion = part.weight / denominator;
    share[part.key] = portion;
    value += portion * part.value;
  }
  return { value, share };
}

function vulnerabilityMultiplier(evaluation: Evaluation) {
  const load = FLAGS.reduce((sum, flag) => {
    return evaluation.vulnerability[flag.id] ? sum + flag.loading : sum;
  }, 0);
  const share = clamp(evaluation.vulnerability.share, 0, 1);
  return 1 + share * load;
}

function gapSentence(gap: number) {
  if (gap === 0) return "Governance matches the scale of power.";
  const points = Math.abs(gap);
  const unit = points === 1 ? "anchor point" : "anchor points";
  if (gap < 0) return `Governance is ahead of power by ${points} ${unit}.`;
  const base = `Power is ahead of governance by ${points} ${unit}.`;
  if (gap >= 2) return `${base} The capacity to govern has not kept up with the power to transform.`;
  return base;
}

function statusDetail(status: SafeguardStatus, hold: string, clear: string, untested: string, na?: string) {
  if (status === "hold") return hold;
  if (status === "clear") return clear;
  if (status === "na") return na ?? clear;
  return untested;
}

function safeguardsFor(evaluation: Evaluation, gap: number): Safeguard[] {
  const person = evaluation.domains.person;
  const peace = evaluation.domains.peace;
  const subsistence = evaluation.domains.subsistence;
  const generations = evaluation.domains.generations;
  const relationships = evaluation.domains.relationships;
  const community = evaluation.domains.community;

  const dignity: SafeguardStatus =
    person.threat === null ? "untested" : person.threat >= 3 ? "hold" : "clear";

  const peaceStatus: SafeguardStatus =
    peace.threat === null || peace.benefit === null
      ? "untested"
      : peace.threat >= 3 && peace.benefit <= 1
        ? "hold"
        : "clear";

  const subsistenceStatus: SafeguardStatus =
    subsistence.threat === null || subsistence.cost === null || subsistence.benefit === null
      ? "untested"
      : subsistence.threat >= 3 && subsistence.cost >= 3 && subsistence.benefit <= 1
        ? "hold"
        : "clear";

  const generationsStatus: SafeguardStatus =
    generations.threat === null || generations.benefit === null
      ? "untested"
      : generations.threat >= 3 && generations.benefit <= 1
        ? "hold"
        : "clear";

  const flagged = FLAGS.some((flag) => evaluation.vulnerability[flag.id]);
  const relKnown = relationships.threat !== null && relationships.benefit !== null;
  const placeKnown = community.threat !== null && community.benefit !== null;
  const relFail = relKnown && relationships.threat! >= 3 && relationships.benefit! <= 1;
  const placeFail = placeKnown && community.threat! >= 3 && community.benefit! <= 1;
  let vulnerability: SafeguardStatus = "na";
  if (flagged) {
    if (relFail || placeFail) vulnerability = "hold";
    else if (relKnown && placeKnown) vulnerability = "clear";
    else vulnerability = "untested";
  }

  const threats = DOMAINS.map((domain) => evaluation.domains[domain.id].threat);
  const anyThreatScored = threats.some((anchor) => anchor !== null);
  const anySevereThreat = threats.some((anchor) => anchor !== null && anchor >= 3);
  const discernment: SafeguardStatus =
    gap < 3 ? "clear" : !anyThreatScored ? "untested" : anySevereThreat ? "hold" : "clear";

  return [
    {
      id: "dignity",
      title: "Dignity",
      status: dignity,
      domains: ["person"],
      detail: statusDetail(
        dignity,
        "The person-domain threat is 3 or higher. The technology treats the person as a means, a target, or a class.",
        "Person-domain threat is below 3.",
        "Not tested. Score threat on the person.",
      ),
    },
    {
      id: "vulnerability",
      title: "Exposure",
      status: vulnerability,
      domains: ["relationships", "community"],
      detail: statusDetail(
        vulnerability,
        "Harm at anchor 3 or higher is landing on mezzo ties or on place, while benefit there is 1 or lower, and the people flagged have less room to refuse.",
        "Mezzo ties and place were scored. This exposure rule is not met.",
        "Not tested. Score benefit and threat for mezzo ties and for place.",
        "Not applicable. No exposure flag is set. Flags raise the weight of harm; they do not score a person’s worth.",
      ),
    },
    {
      id: "subsistence",
      title: "Subsistence",
      status: subsistenceStatus,
      domains: ["subsistence"],
      detail: statusDetail(
        subsistenceStatus,
        "Food, water, or energy shows threat and cost at 3 or higher, with benefit at 1 or lower. A shortage imposed on people is not offset by gains elsewhere.",
        "The subsistence rule is not met.",
        "Not tested. Score benefit, cost, and threat for food, water, and energy.",
      ),
    },
    {
      id: "peace",
      title: "Peace",
      status: peaceStatus,
      domains: ["peace"],
      detail: statusDetail(
        peaceStatus,
        "Peace threat is 3 or higher while benefit is 1 or lower. Surveillance, manipulation, discrimination, cyber offense, or autonomous violence is not bought off by other goods.",
        "The peace rule is not met.",
        "Not tested. Score benefit and threat for peace and freedom.",
      ),
    },
    {
      id: "generations",
      title: "Preparedness",
      status: generationsStatus,
      domains: ["generations"],
      detail: statusDetail(
        generationsStatus,
        "Time-and-generations threat is 3 or higher while benefit is 1 or lower. Shocks are being pushed onto people who are not here to consent.",
        "The preparedness rule is not met.",
        "Not tested. Score benefit and threat for time and generations.",
      ),
    },
    {
      id: "discernment",
      title: "Discernment",
      status: discernment,
      domains: [],
      detail: statusDetail(
        discernment,
        "Power outruns governance by 3 or more anchors, and at least one threat is serious. Greater power requires a greater capacity to refuse the harm.",
        gap < 3
          ? "Power does not outrun governance by the hold threshold of 3."
          : "Threats were scored. None is at the serious threshold while the gap is this wide.",
        "Not tested. The governance gap is wide, and no threat has been scored yet.",
      ),
    },
  ];
}

function uncitedAnchors(evaluation: Evaluation) {
  const found: { domain: DomainId; construct: Construct }[] = [];
  for (const domain of DOMAINS) {
    for (const construct of CONSTRUCT_IDS) {
      const anchor = evaluation.domains[domain.id][construct];
      if (anchor !== null && anchor >= 3 && !evaluation.domains[domain.id].evidence.trim()) {
        found.push({ domain: domain.id, construct });
      }
    }
  }
  return found;
}

function driversFrom(
  parts: { domain: DomainId; anchor: Anchor; weight: number }[],
  denominator: number,
  construct: Construct,
  mixWeight: number,
  scale: number,
): Driver[] {
  if (denominator === 0 || mixWeight === 0) return [];
  return parts
    .filter((part) => part.anchor > 0)
    .map((part) => ({
      domain: part.domain,
      construct,
      anchor: part.anchor,
      points: (part.weight / denominator) * (part.anchor / 4) * 100 * mixWeight * scale,
    }));
}

function recommend(input: {
  index: number | null;
  gap: number;
  coverage: number;
  safeguards: Safeguard[];
  uncited: { domain: DomainId; construct: Construct }[];
}): { recommendation: Recommendation; reason: string } {
  const holds = input.safeguards.filter((item) => item.status === "hold");
  if (holds.length) {
    const names = holds.map((item) => item.title.toLowerCase()).join(", ");
    return {
      recommendation: "stop",
      reason: `Do not proceed. Safeguard hold: ${names}. A gain in another domain does not buy a hold down.`,
    };
  }
  if (input.index === null) {
    return {
      recommendation: "incomplete",
      reason: "Score at least one benefit or opportunity, and at least one cost or threat. Unscored is not zero.",
    };
  }
  const qualifiers: string[] = [];
  if (input.safeguards.some((item) => item.status === "untested")) {
    qualifiers.push("a safeguard is still untested");
  }
  if (input.uncited.length) {
    qualifiers.push("an anchor of 3 or 4 has no source");
  }
  if (input.coverage < 0.75) {
    qualifiers.push("too many domains are still unscored");
  }
  if (input.gap >= 2) {
    qualifiers.push("power is ahead of governance");
  }
  if (input.index < 40) {
    return {
      recommendation: "stop",
      reason: "The index is under 40. This decision burdens the person too heavily to proceed in this form.",
    };
  }
  if (input.index < 55) {
    return {
      recommendation: "redesign",
      reason: "The index is mixed-to-low. Redesign the path that produces the harm before this stage goes further.",
    };
  }
  if (qualifiers.length) {
    const because = qualifiers.join("; ");
    if (input.index >= 60) {
      return {
        recommendation: "conditions",
        reason: `Proceed only with conditions. The index is ${Math.round(input.index)}, but ${because}.`,
      };
    }
    return {
      recommendation: "redesign",
      reason: `Redesign before going further. ${because.charAt(0).toUpperCase()}${because.slice(1)}.`,
    };
  }
  if (input.index >= 70 && input.gap <= 0 && input.coverage >= 0.9) {
    return {
      recommendation: "proceed",
      reason:
        "Proceed at this stage. The index clears 70, governance is at least level with power, safeguards are clear, and high anchors are sourced. Rescore before the next stage.",
    };
  }
  if (input.index >= 60) {
    return {
      recommendation: "conditions",
      reason: "Proceed with conditions. The index serves the person, but it is not high enough, or governance is not ahead enough, for an unqualified proceed.",
    };
  }
  return {
    recommendation: "redesign",
    reason: "Redesign before going further. The index sits in the mixed band.",
  };
}

export function bandLabel(index: number | null) {
  if (index === null) return "Not yet scored";
  if (index >= 80) return "Strongly serves the person";
  if (index >= 65) return "Serves the person";
  if (index >= 50) return "Mixed";
  if (index >= 35) return "Burdens the person";
  return "Grave misalignment";
}

export function scoreEvaluation(evaluation: Evaluation): ScoreResult {
  const stats = {
    benefit: constructStats(evaluation, "benefit"),
    opportunity: constructStats(evaluation, "opportunity"),
    cost: constructStats(evaluation, "cost"),
    threat: constructStats(evaluation, "threat"),
  };
  const coverages: Record<Construct, number> = {
    benefit: stats.benefit.coverage,
    opportunity: stats.opportunity.coverage,
    cost: stats.cost.coverage,
    threat: stats.threat.coverage,
  };
  const coverage = meanOf(CONSTRUCT_IDS.map((id) => coverages[id]));

  const goodMix = mix([
    { key: "benefit", value: stats.benefit.value, weight: GOOD_MIX.benefit },
    { key: "opportunity", value: stats.opportunity.value, weight: GOOD_MIX.opportunity },
  ]);
  const harmMix = mix([
    { key: "cost", value: stats.cost.value, weight: HARM_MIX.cost },
    { key: "threat", value: stats.threat.value, weight: HARM_MIX.threat },
  ]);

  const vulnerability = vulnerabilityMultiplier(evaluation);
  const good = goodMix.value;
  const harm = harmMix.value;
  const adjustedHarm = harm === null ? null : harm * vulnerability;

  let rawIndex: number | null = null;
  let index: number | null = null;
  let clamped = false;
  if (good !== null && adjustedHarm !== null) {
    rawIndex = 50 + 0.5 * (good - adjustedHarm);
    const floored = clamp(rawIndex, 0, 100);
    clamped = floored !== rawIndex;
    index = floored;
  }

  let cells = 0;
  let confidenceSum = 0;
  for (const domain of DOMAINS) {
    for (const construct of CONSTRUCT_IDS) {
      if (evaluation.domains[domain.id][construct] !== null) {
        cells += 1;
        confidenceSum += CONFIDENCE_WEIGHT[evaluation.domains[domain.id].confidence];
      }
    }
  }
  const meanConfidence = cells ? confidenceSum / cells : 0;
  const evidenceHalf =
    index === null ? null : Math.round((1 - meanConfidence * coverage) * 18);
  const band: [number, number] | null =
    index === null || evidenceHalf === null || rawIndex === null
      ? null
      : [clamp(Math.round(rawIndex - evidenceHalf), 0, 100), clamp(Math.round(rawIndex + evidenceHalf), 0, 100)];

  const gap = evaluation.power - evaluation.governance;
  const benefitShare = goodMix.share.benefit ?? 0;
  const opportunityShare = goodMix.share.opportunity ?? 0;
  const costShare = harmMix.share.cost ?? 0;
  const threatShare = harmMix.share.threat ?? 0;

  const driversGood = [
    ...driversFrom(stats.benefit.parts, stats.benefit.denominator, "benefit", benefitShare, 1),
    ...driversFrom(stats.opportunity.parts, stats.opportunity.denominator, "opportunity", opportunityShare, 1),
  ]
    .sort((a, b) => b.points - a.points)
    .slice(0, 3);

  const driversHarm = [
    ...driversFrom(stats.cost.parts, stats.cost.denominator, "cost", costShare, vulnerability),
    ...driversFrom(stats.threat.parts, stats.threat.denominator, "threat", threatShare, vulnerability),
  ]
    .sort((a, b) => b.points - a.points)
    .slice(0, 3);

  const safeguards = safeguardsFor(evaluation, gap);
  const uncited = uncitedAnchors(evaluation);
  const decision = recommend({ index, gap, coverage, safeguards, uncited });

  return {
    benefit: stats.benefit.value,
    opportunity: stats.opportunity.value,
    cost: stats.cost.value,
    threat: stats.threat.value,
    coverages,
    coverage,
    good,
    harm,
    vulnerability,
    adjustedHarm,
    index,
    rawIndex,
    clamped,
    cells,
    evidenceHalf,
    band,
    gap,
    gapSentence: gapSentence(gap),
    safeguards,
    driversGood,
    driversHarm,
    uncited,
    recommendation: decision.recommendation,
    reason: decision.reason,
  };
}

export function anchorText(construct: Construct, anchor: Anchor) {
  return ANCHORS[construct][anchor];
}
