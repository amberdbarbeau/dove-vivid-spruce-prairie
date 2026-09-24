export const PROTOCOL_VERSION = "1.0";

export const WORTH_LINE =
  "The Dignity Index scores a technology’s bearing on a person. It is not a measure of anyone’s worth, not a diagnosis, and not a verdict on autistic people or on the poor.";

export type DomainId =
  | "person"
  | "relationships"
  | "community"
  | "health"
  | "subsistence"
  | "peace"
  | "knowledge"
  | "generations";

export type Construct = "benefit" | "opportunity" | "cost" | "threat";

export type Anchor = 0 | 1 | 2 | 3 | 4;

export type Confidence = "low" | "moderate" | "high";

export type Posture = "proceed" | "conditions" | "redesign" | "stop";

export type FlagId =
  | "poverty"
  | "livelihood"
  | "neurodivergentYouth"
  | "childOrFuture"
  | "conflict";

export interface DomainScore {
  benefit: Anchor | null;
  opportunity: Anchor | null;
  cost: Anchor | null;
  threat: Anchor | null;
  evidence: string;
  confidence: Confidence;
}

export interface Vulnerability {
  poverty: boolean;
  livelihood: boolean;
  neurodivergentYouth: boolean;
  childOrFuture: boolean;
  conflict: boolean;
  /** Share of harms, costs, and residual risks — not benefits — that land on flagged people. 0–1. */
  share: number;
}

export interface Evaluation {
  id: string;
  sourceId: string | null;
  title: string;
  organization: string;
  technologyClass: string;
  stage: string;
  rater: string;
  date: string;
  person: string;
  setting: string;
  power: Anchor;
  governance: Anchor;
  vulnerability: Vulnerability;
  domains: Record<DomainId, DomainScore>;
  posture: Posture | null;
  notes: string;
  createdAt: string;
  updatedAt: string;
}

export const TECHNOLOGY_CLASSES = [
  "Foundation model or AI system",
  "Educational or therapeutic software",
  "Clinical decision support",
  "Data center or compute campus",
  "Climate and environmental sensing",
  "Energy or water system",
  "Food system technology",
  "Platform or social media",
  "Robotics",
  "Cyber capability or weapon system",
  "Other",
] as const;

export const STAGES = [
  "Research",
  "Design",
  "Pilot",
  "Deployment",
  "Scale",
  "Procurement",
] as const;

export const CONFIDENCE_WEIGHT: Record<Confidence, number> = {
  low: 0.55,
  moderate: 0.78,
  high: 1,
};

/** Fixed in v1.0 so two reviews can be compared. Do not retune them to pass a product. */
export const DOMAIN_WEIGHT: Record<DomainId, number> = {
  person: 0.18,
  relationships: 0.12,
  community: 0.12,
  health: 0.12,
  subsistence: 0.14,
  peace: 0.14,
  knowledge: 0.08,
  generations: 0.1,
};

export const GOOD_MIX = { benefit: 0.62, opportunity: 0.38 } as const;
export const HARM_MIX = { cost: 0.45, threat: 0.55 } as const;

export const DOMAINS: {
  id: DomainId;
  label: string;
  short: string;
  level: string;
  ask: string;
  watch: string;
}[] = [
  {
    id: "person",
    label: "The person",
    short: "Dignity",
    level: "Micro",
    ask: "Does this treat the person as an end — with agency, privacy, and the ability to refuse — or as a data point, a target, or a means?",
    watch: "Consent, non-discrimination, and whether refusal costs them a life domain.",
  },
  {
    id: "relationships",
    label: "Mezzo ties",
    short: "Mezzo",
    level: "Mezzo",
    ask: "What happens to the ties between the settings that hold this person: home, school, clinic, work, congregation, peers?",
    watch: "For an autistic youth: sensory load, predictability, and whether caregivers and educators are partners or are bypassed.",
  },
  {
    id: "community",
    label: "Place and livelihood",
    short: "Place",
    level: "Mezzo → exo",
    ask: "When the infrastructure arrives — a data center, a grid, a platform, a mandate — what happens to neighbors who cannot simply opt out?",
    watch: "Jobs that end when construction ends do not cancel a loss of water, land, or the local economy.",
  },
  {
    id: "health",
    label: "Body and health",
    short: "Health",
    level: "Micro → exo",
    ask: "Does it improve diagnosis, treatment, or day-to-day functioning — and what does it cost the body, the nerves, or the mind?",
    watch: "Access far from specialty care. Also anxiety, masking, and over-monitoring.",
  },
  {
    id: "subsistence",
    label: "Food, water, and energy",
    short: "Water",
    level: "Exo → macro",
    ask: "What does it draw in water, power, and materials, and what does it return to food, energy, and the living world?",
    watch: "Who loses access when the system is stressed. Count cooling water, grid load, and emissions.",
  },
  {
    id: "peace",
    label: "Peace and freedom",
    short: "Peace",
    level: "Macro",
    ask: "Could it surveil, manipulate, discriminate, attack through networks, or apply violence without a human who can refuse?",
    watch: "Oversight that can actually stop the system, not a policy nobody can invoke.",
  },
  {
    id: "knowledge",
    label: "Knowledge and cooperation",
    short: "Knowledge",
    level: "Macro",
    ask: "Does it deepen understanding of the universe and the natural world, and widen cooperation — or lock knowledge inside a few firms?",
    watch: "Youth, local knowledge, other disciplines, and traditions are part of the score, not decoration.",
  },
  {
    id: "generations",
    label: "Time and generations",
    short: "Time",
    level: "Chrono",
    ask: "Does it move from emergency response toward prevention, and is the burden fair to people who are not in the room?",
    watch: "Rescore at the next stage. A design-stage proceed is not permission to scale.",
  },
];

export const CONSTRUCTS: {
  id: Construct;
  label: string;
  hint: string;
  tone: "good" | "harm";
}[] = [
  {
    id: "benefit",
    label: "Benefit",
    hint: "Good already designed in or likely for this person.",
    tone: "good",
  },
  {
    id: "opportunity",
    label: "Opportunity",
    hint: "Further good, not yet real, if responsibility grows.",
    tone: "good",
  },
  {
    id: "cost",
    label: "Cost",
    hint: "A fairly certain burden: water, energy, money, time, attention, land, stigma.",
    tone: "harm",
  },
  {
    id: "threat",
    label: "Threat",
    hint: "Harm that may arrive: war, manipulation, discrimination, shortage, developmental injury.",
    tone: "harm",
  },
];

export const ANCHORS: Record<Construct, Record<Anchor, string>> = {
  benefit: {
    0: "No identifiable good for this person.",
    1: "Incidental or narrowly private gain.",
    2: "Partial good, unevenly shared.",
    3: "Substantial good for the person and their setting.",
    4: "Systemic good, evidenced, and reaching those who bear the most.",
  },
  opportunity: {
    0: "No credible further good.",
    1: "Speculative upside, with no path.",
    2: "Plausible upside if governance improves.",
    3: "Clear upside with a named next step.",
    4: "Upside is designed in and resourced.",
  },
  cost: {
    0: "No material burden.",
    1: "Minor, absorbable burden.",
    2: "Noticeable burden on time, money, attention, land, water, or energy.",
    3: "Heavy burden, concentrated on those least able to bear it.",
    4: "Severe certain burden: displacement, depletion, or loss of livelihood.",
  },
  threat: {
    0: "No credible path to harm.",
    1: "Low, monitored, and reversible.",
    2: "Real risk if safeguards slip.",
    3: "Serious risk to dignity, peace, health, or subsistence.",
    4: "Severe or hard-to-reverse harm.",
  },
};

export const FLAGS: {
  id: FlagId;
  loading: number;
  label: string;
  detail: string;
}[] = [
  {
    id: "poverty",
    loading: 0.22,
    label: "Fewest resources to adapt",
    detail: "Households and communities hit first when a shock arrives, with the least to spend on leaving or repairing.",
  },
  {
    id: "livelihood",
    loading: 0.18,
    label: "Livelihood tied to land, forest, or ocean",
    detail: "Farming, fishing, herding, forest work — a place the technology can dry, flood, occupy, or bypass.",
  },
  {
    id: "neurodivergentYouth",
    loading: 0.18,
    label: "Autistic or neurodivergent youth in the path of the tool",
    detail:
      "A young person whose sensory world, consent, and support ties are easy for a product to bypass. This raises the weight of harm. It does not treat autism as a cost.",
  },
  {
    id: "childOrFuture",
    loading: 0.18,
    label: "A child, or a generation not in the room",
    detail: "Including people not yet born who inherit the water, the record, the weapon, or the climate.",
  },
  {
    id: "conflict",
    loading: 0.24,
    label: "Conflict-affected, or unable to leave",
    detail: "War, displacement, or any setting where refusal is not a real option. Exit is the last safeguard a person has.",
  },
];

export const SHARE_STEPS: { value: number; label: string }[] = [
  { value: 0, label: "Little of it" },
  { value: 0.25, label: "A quarter" },
  { value: 0.5, label: "About half" },
  { value: 0.75, label: "Most" },
  { value: 1, label: "Essentially all" },
];

export const POWER_ANCHORS: Record<Anchor, { short: string; text: string }> = {
  0: { short: "Study", text: "A contained study or a single prototype." },
  1: { short: "Refusable", text: "A product a person can refuse without losing a life domain." },
  2: { short: "Mandate", text: "A regional service, a campus, or a program people are pressed to use." },
  3: { short: "Infrastructure", text: "Infrastructure or a system people must live beside or inside." },
  4: { short: "Hard to recall", text: "Global scale, or a class of system that is hard to recall: frontier models, weapons, grids." },
};

export const GOVERNANCE_ANCHORS: Record<Anchor, { short: string; text: string }> = {
  0: { short: "Builder only", text: "No real oversight, or oversight only by the builder. If you do not know, score 0." },
  1: { short: "Paper policy", text: "A policy exists. The person who bears the consequences cannot use it." },
  2: { short: "Partial review", text: "Some review, and a weak power to stop." },
  3: { short: "Voice and a halt", text: "Independent review and a voice for the person who bears it, with a way to halt." },
  4: { short: "Matched", text: "Oversight matched to the power: refusal, rescoring at the next stage, and repair." },
};

export const POSTURE_LABEL: Record<Posture, string> = {
  proceed: "Proceed",
  conditions: "Proceed with conditions",
  redesign: "Redesign before going further",
  stop: "Do not proceed",
};

const ILLUSTRATED_AT = "2026-09-24T12:00:00.000Z";

function emptyDomain(): DomainScore {
  return {
    benefit: null,
    opportunity: null,
    cost: null,
    threat: null,
    evidence: "",
    confidence: "moderate",
  };
}

export function emptyDomains(): Record<DomainId, DomainScore> {
  return {
    person: emptyDomain(),
    relationships: emptyDomain(),
    community: emptyDomain(),
    health: emptyDomain(),
    subsistence: emptyDomain(),
    peace: emptyDomain(),
    knowledge: emptyDomain(),
    generations: emptyDomain(),
  };
}

function d(
  benefit: Anchor,
  opportunity: Anchor,
  cost: Anchor,
  threat: Anchor,
  evidence: string,
  confidence: Confidence = "moderate",
): DomainScore {
  return { benefit, opportunity, cost, threat, evidence, confidence };
}

function base(partial: Omit<Evaluation, "domains" | "vulnerability"> & { vulnerability: Vulnerability; domains: Record<DomainId, DomainScore> }): Evaluation {
  return partial;
}

const noFlags: Vulnerability = {
  poverty: false,
  livelihood: false,
  neurodivergentYouth: false,
  childOrFuture: false,
  conflict: false,
  share: 0.5,
};

export const SCENARIOS: Evaluation[] = [
  base({
    id: "autistic-calm",
    sourceId: "autistic-calm",
    title: "Predictable classroom companion",
    organization: "",
    technologyClass: "Educational or therapeutic software",
    stage: "Design",
    rater: "Illustration",
    date: "2026-09-24",
    person: "A 13-year-old autistic student",
    setting: "A public middle-school classroom, and the home that has to live with the tool",
    power: 1,
    governance: 3,
    vulnerability: { ...noFlags, neurodivergentYouth: true, share: 0.75 },
    posture: null,
    notes:
      "Stage is design. Proceed would mean this design may go to a pilot, not that a district may mandate it. Rescore before scale. The student can refuse the tool without losing the class.",
    createdAt: ILLUSTRATED_AT,
    updatedAt: ILLUSTRATED_AT,
    domains: {
      person: d(3, 3, 1, 1, "Opt-out keeps the student in the lesson. No compliance profile is sold or scored.", "high"),
      relationships: d(4, 3, 1, 1, "Teacher and parent set the same predictable routines. The tool does not message the child around them.", "high"),
      community: d(2, 2, 1, 0, "This decision is one classroom, not a school-wide surveillance rollout."),
      health: d(3, 3, 1, 1, "Design cuts noise, surprise transitions, and timed social demands. It does not claim to treat autism."),
      subsistence: d(1, 1, 1, 0, "One school device. Energy draw is ordinary, not a campus."),
      peace: d(2, 2, 1, 1, "No behavioral-surveillance product. Data stays with the school under a written limit."),
      knowledge: d(3, 2, 0, 0, "Supports the student’s own work. Does not explain the student to the class as a problem."),
      generations: d(2, 3, 1, 1, "The pattern can be reused. No long-lived biometric or behavior file."),
    },
  }),
  base({
    id: "autistic-score",
    sourceId: "autistic-score",
    title: "Behavior-scoring app on an autistic student",
    organization: "",
    technologyClass: "Educational or therapeutic software",
    stage: "Scale",
    rater: "Illustration",
    date: "2026-09-24",
    person: "A 13-year-old autistic student",
    setting: "A district mandate, cameras in the classroom, a dashboard for administrators",
    power: 2,
    governance: 1,
    vulnerability: { ...noFlags, neurodivergentYouth: true, childOrFuture: true, share: 1 },
    posture: null,
    notes:
      "Same person as the classroom companion. The index moves because the system around the youth changed, not because the youth did.",
    createdAt: ILLUSTRATED_AT,
    updatedAt: ILLUSTRATED_AT,
    domains: {
      person: d(0, 1, 3, 4, "The student is scored for looking away and moving. Refusal is marked noncompliance.", "high"),
      relationships: d(0, 1, 3, 4, "Parents see scores after the fact. Teachers are bypassed by a district dashboard.", "high"),
      community: d(1, 1, 2, 2, "No land or water fight. Stigma can follow the student through the school."),
      health: d(1, 1, 3, 3, "Pressure to mask. Anxiety is a cost of compliance scoring, not a side note."),
      subsistence: d(0, 0, 1, 0, "Devices and servers. Not the main harm, and not a reason to ignore it."),
      peace: d(0, 1, 2, 3, "Continuous behavioral surveillance of a minor, without a human veto the student can reach.", "high"),
      knowledge: d(1, 1, 1, 1, "Data taken from the student is not understanding offered to the student."),
      generations: d(0, 1, 2, 3, "A behavior record can outlive the class and travel with the child."),
    },
  }),
  base({
    id: "watershed",
    sourceId: "watershed",
    title: "Compute campus beside a farming watershed",
    organization: "",
    technologyClass: "Data center or compute campus",
    stage: "Deployment",
    rater: "Illustration",
    date: "2026-09-24",
    person: "A smallholder household downstream of the site",
    setting: "A low-income agricultural valley; household income depends on irrigation",
    power: 3,
    governance: 1,
    vulnerability: {
      ...noFlags,
      poverty: true,
      livelihood: true,
      childOrFuture: true,
      share: 0.75,
    },
    posture: null,
    notes:
      "Construction wages are scored as a benefit. They are not allowed to cancel water loss. That is what the subsistence hold is for.",
    createdAt: ILLUSTRATED_AT,
    updatedAt: ILLUSTRATED_AT,
    domains: {
      person: d(1, 2, 2, 2, "A few construction wages. No voice in siting. The household is an externality in the permit."),
      relationships: d(1, 1, 2, 2, "Night noise and truck traffic strain neighbors. The school is not a partner in the decision."),
      community: d(1, 2, 4, 3, "Construction jobs end. Irrigation is the livelihood. There is no community veto.", "high"),
      health: d(1, 1, 2, 2, "Heat and dust during the build. No clinic is gained."),
      subsistence: d(1, 2, 4, 4, "Cooling water and grid load are large. The farm does not eat the compute. Drought years are unmitigated.", "high"),
      peace: d(1, 1, 1, 2, "Site security watches a road people use. This is not a weapon, and it is still a new watch."),
      knowledge: d(1, 2, 1, 1, "The campus trains few local people. Any science benefit accrues elsewhere."),
      generations: d(0, 1, 3, 3, "Emissions and aquifer draw are shifted forward. Offsets on paper are not prevention."),
    },
  }),
  base({
    id: "clinical",
    sourceId: "clinical",
    title: "Clinician-held diagnostic aid",
    organization: "",
    technologyClass: "Clinical decision support",
    stage: "Pilot",
    rater: "Illustration",
    date: "2026-09-24",
    person: "An adult patient two hours from a specialist",
    setting: "A rural clinic; the patient, not the vendor, is the rights-bearer",
    power: 2,
    governance: 3,
    vulnerability: { ...noFlags, poverty: true, share: 0.5 },
    posture: null,
    notes:
      "The patient can refuse. The clinician remains responsible for the decision. Rescore if the aid is later wired into coverage denial.",
    createdAt: ILLUSTRATED_AT,
    updatedAt: ILLUSTRATED_AT,
    domains: {
      person: d(3, 3, 1, 1, "The clinician decides. The patient is told what the model suggested and can refuse the referral.", "high"),
      relationships: d(3, 3, 1, 0, "The local clinic is strengthened. The tool does not replace the person they already trust."),
      community: d(2, 3, 0, 0, "One clinic. No water or land take."),
      health: d(4, 3, 1, 1, "Earlier referral for treatable disease, checked against specialist review rather than against the model grading itself.", "high"),
      subsistence: d(1, 2, 2, 1, "Off-site compute is modest. Clinic power is a real but limited cost."),
      peace: d(3, 2, 1, 0, "Health data stays in the clinical record. This design has no secondary score for insurance denial."),
      knowledge: d(3, 3, 0, 0, "Errors are reviewed with the clinic. The model is not a sealed oracle."),
      generations: d(2, 3, 0, 0, "The pilot can be stopped. No claim on future patients without a rescore at scale."),
    },
  }),
  base({
    id: "coastal",
    sourceId: "coastal",
    title: "Flood early warning with local knowledge",
    organization: "",
    technologyClass: "Climate and environmental sensing",
    stage: "Pilot",
    rater: "Illustration",
    date: "2026-09-24",
    person: "A fisher household on a flood-prone coast",
    setting: "A harbor town; income from the fishery; youth help keep the gauges",
    power: 2,
    governance: 3,
    vulnerability: {
      ...noFlags,
      poverty: true,
      livelihood: true,
      childOrFuture: true,
      share: 0.75,
    },
    posture: null,
    notes:
      "Preparation, not heroics after the flood. Local knowledge is scored as knowledge, not as color. Rescore if boat-location data is later reused for policing.",
    createdAt: ILLUSTRATED_AT,
    updatedAt: ILLUSTRATED_AT,
    domains: {
      person: d(3, 3, 1, 1, "Warnings arrive in the language people fish in. A person can act, not only be modeled."),
      relationships: d(3, 4, 1, 0, "Youth, fishers, the clinic, and the town council share one protocol. Scientists are not invited only after the flood.", "high"),
      community: d(3, 4, 1, 1, "Routes and gear caches were set with the harbor, not only with the capital."),
      health: d(2, 3, 1, 1, "Fewer delayed injuries. This is not a hospital."),
      subsistence: d(3, 4, 1, 1, "Boats and food stores get lead time. The sensors’ own energy is small beside a lost season."),
      peace: d(2, 2, 0, 1, "Boat locations are not a policing feed in this design. That limit is written down."),
      knowledge: d(4, 4, 0, 0, "Coastal science and local observation are both in the model. Youth maintain the gauges.", "high"),
      generations: d(4, 3, 1, 1, "The point is preparation before the disaster. What failed is kept for the next storm.", "high"),
    },
  }),
  base({
    id: "weapon",
    sourceId: "weapon",
    title: "Loitering munition with weak oversight",
    organization: "",
    technologyClass: "Cyber capability or weapon system",
    stage: "Deployment",
    rater: "Illustration",
    date: "2026-09-24",
    person: "A civilian in a contested city",
    setting: "A dense neighborhood; the person is not a combatant and cannot easily leave",
    power: 4,
    governance: 0,
    vulnerability: {
      poverty: true,
      livelihood: true,
      neurodivergentYouth: false,
      childOrFuture: true,
      conflict: true,
      share: 1,
    },
    posture: null,
    notes:
      "High confidence means the harm is the point of the system. It is not a reason to trust a favorable index. The raw value is below the floor of the scale.",
    createdAt: ILLUSTRATED_AT,
    updatedAt: ILLUSTRATED_AT,
    domains: {
      person: d(0, 0, 4, 4, "The person can be killed or maimed without a human knowing who they are.", "high"),
      relationships: d(0, 0, 4, 4, "Families, clinics, and schools lose the people who held them together.", "high"),
      community: d(0, 0, 4, 4, "A neighborhood did not consent to be a target. Rubble is what remains of the local economy.", "high"),
      health: d(0, 0, 4, 4, "Injury, trauma, and destroyed care.", "high"),
      subsistence: d(0, 0, 4, 3, "Power, water, and markets fail in the pattern of strikes.", "high"),
      peace: d(0, 0, 3, 4, "Autonomous pursuit without a safeguard that can refuse.", "high"),
      knowledge: d(1, 1, 1, 2, "Technical cleverness is not understanding that serves the person under the flight path."),
      generations: d(0, 0, 4, 4, "The weapon teaches the next decade how to do this. Civilians inherit the doctrine.", "high"),
    },
  }),
  base({
    id: "blank",
    sourceId: "blank",
    title: "",
    organization: "",
    technologyClass: "Foundation model or AI system",
    stage: "Design",
    rater: "",
    date: "",
    person: "",
    setting: "",
    power: 1,
    governance: 0,
    vulnerability: { ...noFlags, share: 0.5 },
    posture: null,
    notes: "",
    createdAt: ILLUSTRATED_AT,
    updatedAt: ILLUSTRATED_AT,
    domains: emptyDomains(),
  }),
];

export function cloneEvaluation(evaluation: Evaluation): Evaluation {
  return JSON.parse(JSON.stringify(evaluation)) as Evaluation;
}

export function loadScenario(id: string): Evaluation {
  const found = SCENARIOS.find((scenario) => scenario.id === id) ?? SCENARIOS[0];
  return cloneEvaluation(found);
}

export function isEvaluation(value: unknown): value is Evaluation {
  if (!value || typeof value !== "object") return false;
  const record = value as Evaluation;
  return (
    typeof record.title === "string" &&
    !!record.domains &&
    !!record.domains.person &&
    !!record.vulnerability &&
    typeof record.power === "number" &&
    typeof record.governance === "number"
  );
}

export function domainById(id: DomainId) {
  const domain = DOMAINS.find((item) => item.id === id);
  if (!domain) throw new Error(`Unknown domain ${id}`);
  return domain;
}
