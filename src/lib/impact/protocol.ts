export const PROTOCOL_NAME = "Person-Centered Technology Impact Protocol";
export const PROTOCOL_VERSION = "0.1";

export const QUESTION =
  "Who benefits, who bears the costs, through which systems, compared with what alternative — and what must change?";

/** Queue score only. Not a probability and not a measure of welfare. */
export function impactPriority(magnitude: number, likelihood: number): number {
  return (100 * magnitude * likelihood) / 16;
}

export function formatPriority(value: number): string {
  return new Intl.NumberFormat("en", { maximumFractionDigits: 2 }).format(value);
}

export type Valence = "benefit" | "harm";
export type LevelId = "person" | "micro" | "meso" | "exo" | "macro" | "time";
export type DomainId =
  | "agency"
  | "health"
  | "relationships"
  | "material"
  | "peace"
  | "knowledge";

export type Magnitude = 0 | 1 | 2 | 3 | 4;
export type Likelihood = 1 | 2 | 3 | 4;

export interface Impact {
  id: string;
  name: string;
  valence: Valence;
  level: LevelId;
  domain: DomainId;
  magnitude: Magnitude | null;
  likelihood: Likelihood | null;
  who: string;
  exposed: string;
  horizon: string;
  evidence: string;
}

export interface CaseFile {
  product: string;
  person: string;
  alternative: string;
  impacts: Impact[];
}

export const LEVELS: { id: LevelId; label: string }[] = [
  { id: "person", label: "Person" },
  { id: "micro", label: "Micro" },
  { id: "meso", label: "Meso" },
  { id: "exo", label: "Exo" },
  { id: "macro", label: "Macro" },
  { id: "time", label: "Time" },
];

export const DOMAINS: { id: DomainId; label: string }[] = [
  { id: "agency", label: "Agency, rights, and access" },
  { id: "health", label: "Health, safety, and development" },
  { id: "relationships", label: "Relationships and participation" },
  { id: "material", label: "Material security" },
  { id: "peace", label: "Environment, institutions, and peace" },
  { id: "knowledge", label: "Knowledge, discovery, and creativity" },
];

export const MAGNITUDE_LABELS = [
  "0 Negligible",
  "1 Small",
  "2 Moderate",
  "3 Major",
  "4 Severe or transformative",
] as const;

export const LIKELIHOOD_LABELS = [
  "1 Unlikely",
  "2 Possible",
  "3 Likely",
  "4 Very likely",
] as const;

export function blankImpact(): Impact {
  return {
    id: crypto.randomUUID(),
    name: "",
    valence: "benefit",
    level: "person",
    domain: "agency",
    magnitude: null,
    likelihood: null,
    who: "",
    exposed: "",
    horizon: "",
    evidence: "",
  };
}

export function scoredPriority(impact: Impact): number | null {
  if (impact.magnitude === null || impact.likelihood === null) return null;
  return impactPriority(impact.magnitude, impact.likelihood);
}

/** A major or severe harm is reviewed on its own. Benefits do not clear it. */
export function needsReview(impact: Impact): boolean {
  return impact.valence === "harm" && impact.magnitude !== null && impact.magnitude >= 3;
}

export function levelLabel(id: LevelId): string {
  return LEVELS.find((level) => level.id === id)?.label ?? id;
}

export function domainLabel(id: DomainId): string {
  return DOMAINS.find((domain) => domain.id === id)?.label ?? id;
}

function row(
  partial: Omit<Impact, "id"> & { id?: string },
): Impact {
  return { id: partial.id ?? crypto.randomUUID(), ...partial };
}

/** Hypothetical company ratings. Not an affected-person review and not a validation. */
export const HYPOTHETICAL: CaseFile = {
  product: "Hypothetical sheet from the v0.1 draft",
  person: "An autistic young person, and a low-income household near a data center",
  alternative: "Not named in the draft — do not treat these magnitudes as differences from a stated baseline",
  impacts: [
    row({
      name: "Greater independence in self-chosen tasks",
      valence: "benefit",
      level: "person",
      domain: "agency",
      magnitude: 3,
      likelihood: 3,
      who: "Autistic youth",
      exposed: "Not counted",
      horizon: "Not stated",
      evidence: "Hypothetical. Not the young person's own rating.",
    }),
    row({
      name: "Sleep disruption from notifications",
      valence: "harm",
      level: "person",
      domain: "health",
      magnitude: 2,
      likelihood: 3,
      who: "The same young person",
      exposed: "Not counted",
      horizon: "Immediate",
      evidence: "Hypothetical.",
    }),
    row({
      name: "Increased household energy burden",
      valence: "harm",
      level: "exo",
      domain: "material",
      magnitude: 3,
      likelihood: 3,
      who: "Low-income household near a data center",
      exposed: "Not counted",
      horizon: "Cumulative",
      evidence: "Hypothetical pathway. Each link still needs evidence.",
    }),
  ],
};

export function emptyCase(): CaseFile {
  return {
    product: "",
    person: "",
    alternative: "",
    impacts: [blankImpact()],
  };
}
