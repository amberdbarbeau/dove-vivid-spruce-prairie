import { i as __toESM } from "../_runtime.mjs";
import { I as require_jsx_runtime, L as require_react } from "../_libs/@tanstack/react-router+[...].mjs";
import { i as Check, n as Minus, r as Circle, t as TriangleAlert } from "../_libs/lucide-react.mjs";
import { t as clsx } from "../_libs/clsx.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-DwUwU2xn.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var __defProp = Object.defineProperty;
var __exportAll = (all, no_symbols) => {
	let target = {};
	for (var name in all) __defProp(target, name, {
		get: all[name],
		enumerable: true
	});
	if (!no_symbols) __defProp(target, Symbol.toStringTag, { value: "Module" });
	return target;
};
var WORTH_LINE = "The Dignity Index scores a technology’s bearing on a person. It is not a measure of anyone’s worth, not a diagnosis, and not a verdict on autistic people or on the poor.";
var TECHNOLOGY_CLASSES = [
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
	"Other"
];
var STAGES = [
	"Research",
	"Design",
	"Pilot",
	"Deployment",
	"Scale",
	"Procurement"
];
var CONFIDENCE_WEIGHT = {
	low: .55,
	moderate: .78,
	high: 1
};
/** Fixed in v1.0 so two reviews can be compared. Do not retune them to pass a product. */
var DOMAIN_WEIGHT = {
	person: .18,
	relationships: .12,
	community: .12,
	health: .12,
	subsistence: .14,
	peace: .14,
	knowledge: .08,
	generations: .1
};
var GOOD_MIX = {
	benefit: .62,
	opportunity: .38
};
var HARM_MIX = {
	cost: .45,
	threat: .55
};
var DOMAINS = [
	{
		id: "person",
		label: "The person",
		short: "Dignity",
		level: "Micro",
		ask: "Does this treat the person as an end — with agency, privacy, and the ability to refuse — or as a data point, a target, or a means?",
		watch: "Consent, non-discrimination, and whether refusal costs them a life domain."
	},
	{
		id: "relationships",
		label: "Mezzo ties",
		short: "Mezzo",
		level: "Mezzo",
		ask: "What happens to the ties between the settings that hold this person: home, school, clinic, work, congregation, peers?",
		watch: "For an autistic youth: sensory load, predictability, and whether caregivers and educators are partners or are bypassed."
	},
	{
		id: "community",
		label: "Place and livelihood",
		short: "Place",
		level: "Mezzo → exo",
		ask: "When the infrastructure arrives — a data center, a grid, a platform, a mandate — what happens to neighbors who cannot simply opt out?",
		watch: "Jobs that end when construction ends do not cancel a loss of water, land, or the local economy."
	},
	{
		id: "health",
		label: "Body and health",
		short: "Health",
		level: "Micro → exo",
		ask: "Does it improve diagnosis, treatment, or day-to-day functioning — and what does it cost the body, the nerves, or the mind?",
		watch: "Access far from specialty care. Also anxiety, masking, and over-monitoring."
	},
	{
		id: "subsistence",
		label: "Food, water, and energy",
		short: "Water",
		level: "Exo → macro",
		ask: "What does it draw in water, power, and materials, and what does it return to food, energy, and the living world?",
		watch: "Who loses access when the system is stressed. Count cooling water, grid load, and emissions."
	},
	{
		id: "peace",
		label: "Peace and freedom",
		short: "Peace",
		level: "Macro",
		ask: "Could it surveil, manipulate, discriminate, attack through networks, or apply violence without a human who can refuse?",
		watch: "Oversight that can actually stop the system, not a policy nobody can invoke."
	},
	{
		id: "knowledge",
		label: "Knowledge and cooperation",
		short: "Knowledge",
		level: "Macro",
		ask: "Does it deepen understanding of the universe and the natural world, and widen cooperation — or lock knowledge inside a few firms?",
		watch: "Youth, local knowledge, other disciplines, and traditions are part of the score, not decoration."
	},
	{
		id: "generations",
		label: "Time and generations",
		short: "Time",
		level: "Chrono",
		ask: "Does it move from emergency response toward prevention, and is the burden fair to people who are not in the room?",
		watch: "Rescore at the next stage. A design-stage proceed is not permission to scale."
	}
];
var CONSTRUCTS = [
	{
		id: "benefit",
		label: "Benefit",
		hint: "Good already designed in or likely for this person.",
		tone: "good"
	},
	{
		id: "opportunity",
		label: "Opportunity",
		hint: "Further good, not yet real, if responsibility grows.",
		tone: "good"
	},
	{
		id: "cost",
		label: "Cost",
		hint: "A fairly certain burden: water, energy, money, time, attention, land, stigma.",
		tone: "harm"
	},
	{
		id: "threat",
		label: "Threat",
		hint: "Harm that may arrive: war, manipulation, discrimination, shortage, developmental injury.",
		tone: "harm"
	}
];
var ANCHORS = {
	benefit: {
		0: "No identifiable good for this person.",
		1: "Incidental or narrowly private gain.",
		2: "Partial good, unevenly shared.",
		3: "Substantial good for the person and their setting.",
		4: "Systemic good, evidenced, and reaching those who bear the most."
	},
	opportunity: {
		0: "No credible further good.",
		1: "Speculative upside, with no path.",
		2: "Plausible upside if governance improves.",
		3: "Clear upside with a named next step.",
		4: "Upside is designed in and resourced."
	},
	cost: {
		0: "No material burden.",
		1: "Minor, absorbable burden.",
		2: "Noticeable burden on time, money, attention, land, water, or energy.",
		3: "Heavy burden, concentrated on those least able to bear it.",
		4: "Severe certain burden: displacement, depletion, or loss of livelihood."
	},
	threat: {
		0: "No credible path to harm.",
		1: "Low, monitored, and reversible.",
		2: "Real risk if safeguards slip.",
		3: "Serious risk to dignity, peace, health, or subsistence.",
		4: "Severe or hard-to-reverse harm."
	}
};
var FLAGS = [
	{
		id: "poverty",
		loading: .22,
		label: "Fewest resources to adapt",
		detail: "Households and communities hit first when a shock arrives, with the least to spend on leaving or repairing."
	},
	{
		id: "livelihood",
		loading: .18,
		label: "Livelihood tied to land, forest, or ocean",
		detail: "Farming, fishing, herding, forest work — a place the technology can dry, flood, occupy, or bypass."
	},
	{
		id: "neurodivergentYouth",
		loading: .18,
		label: "Autistic or neurodivergent youth in the path of the tool",
		detail: "A young person whose sensory world, consent, and support ties are easy for a product to bypass. This raises the weight of harm. It does not treat autism as a cost."
	},
	{
		id: "childOrFuture",
		loading: .18,
		label: "A child, or a generation not in the room",
		detail: "Including people not yet born who inherit the water, the record, the weapon, or the climate."
	},
	{
		id: "conflict",
		loading: .24,
		label: "Conflict-affected, or unable to leave",
		detail: "War, displacement, or any setting where refusal is not a real option. Exit is the last safeguard a person has."
	}
];
var SHARE_STEPS = [
	{
		value: 0,
		label: "Little of it"
	},
	{
		value: .25,
		label: "A quarter"
	},
	{
		value: .5,
		label: "About half"
	},
	{
		value: .75,
		label: "Most"
	},
	{
		value: 1,
		label: "Essentially all"
	}
];
var POWER_ANCHORS = {
	0: {
		short: "Study",
		text: "A contained study or a single prototype."
	},
	1: {
		short: "Refusable",
		text: "A product a person can refuse without losing a life domain."
	},
	2: {
		short: "Mandate",
		text: "A regional service, a campus, or a program people are pressed to use."
	},
	3: {
		short: "Infrastructure",
		text: "Infrastructure or a system people must live beside or inside."
	},
	4: {
		short: "Hard to recall",
		text: "Global scale, or a class of system that is hard to recall: frontier models, weapons, grids."
	}
};
var GOVERNANCE_ANCHORS = {
	0: {
		short: "Builder only",
		text: "No real oversight, or oversight only by the builder. If you do not know, score 0."
	},
	1: {
		short: "Paper policy",
		text: "A policy exists. The person who bears the consequences cannot use it."
	},
	2: {
		short: "Partial review",
		text: "Some review, and a weak power to stop."
	},
	3: {
		short: "Voice and a halt",
		text: "Independent review and a voice for the person who bears it, with a way to halt."
	},
	4: {
		short: "Matched",
		text: "Oversight matched to the power: refusal, rescoring at the next stage, and repair."
	}
};
var POSTURE_LABEL = {
	proceed: "Proceed",
	conditions: "Proceed with conditions",
	redesign: "Redesign before going further",
	stop: "Do not proceed"
};
var ILLUSTRATED_AT = "2026-09-24T12:00:00.000Z";
function emptyDomain() {
	return {
		benefit: null,
		opportunity: null,
		cost: null,
		threat: null,
		evidence: "",
		confidence: "moderate"
	};
}
function emptyDomains() {
	return {
		person: emptyDomain(),
		relationships: emptyDomain(),
		community: emptyDomain(),
		health: emptyDomain(),
		subsistence: emptyDomain(),
		peace: emptyDomain(),
		knowledge: emptyDomain(),
		generations: emptyDomain()
	};
}
function d(benefit, opportunity, cost, threat, evidence, confidence = "moderate") {
	return {
		benefit,
		opportunity,
		cost,
		threat,
		evidence,
		confidence
	};
}
function base(partial) {
	return partial;
}
var noFlags = {
	poverty: false,
	livelihood: false,
	neurodivergentYouth: false,
	childOrFuture: false,
	conflict: false,
	share: .5
};
var SCENARIOS = [
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
		vulnerability: {
			...noFlags,
			neurodivergentYouth: true,
			share: .75
		},
		posture: null,
		notes: "Stage is design. Proceed would mean this design may go to a pilot, not that a district may mandate it. Rescore before scale. The student can refuse the tool without losing the class.",
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
			generations: d(2, 3, 1, 1, "The pattern can be reused. No long-lived biometric or behavior file.")
		}
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
		vulnerability: {
			...noFlags,
			neurodivergentYouth: true,
			childOrFuture: true,
			share: 1
		},
		posture: null,
		notes: "Same person as the classroom companion. The index moves because the system around the youth changed, not because the youth did.",
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
			generations: d(0, 1, 2, 3, "A behavior record can outlive the class and travel with the child.")
		}
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
			share: .75
		},
		posture: null,
		notes: "Construction wages are scored as a benefit. They are not allowed to cancel water loss. That is what the subsistence hold is for.",
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
			generations: d(0, 1, 3, 3, "Emissions and aquifer draw are shifted forward. Offsets on paper are not prevention.")
		}
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
		vulnerability: {
			...noFlags,
			poverty: true,
			share: .5
		},
		posture: null,
		notes: "The patient can refuse. The clinician remains responsible for the decision. Rescore if the aid is later wired into coverage denial.",
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
			generations: d(2, 3, 0, 0, "The pilot can be stopped. No claim on future patients without a rescore at scale.")
		}
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
			share: .75
		},
		posture: null,
		notes: "Preparation, not heroics after the flood. Local knowledge is scored as knowledge, not as color. Rescore if boat-location data is later reused for policing.",
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
			generations: d(4, 3, 1, 1, "The point is preparation before the disaster. What failed is kept for the next storm.", "high")
		}
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
			share: 1
		},
		posture: null,
		notes: "High confidence means the harm is the point of the system. It is not a reason to trust a favorable index. The raw value is below the floor of the scale.",
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
			generations: d(0, 0, 4, 4, "The weapon teaches the next decade how to do this. Civilians inherit the doctrine.", "high")
		}
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
		vulnerability: {
			...noFlags,
			share: .5
		},
		posture: null,
		notes: "",
		createdAt: ILLUSTRATED_AT,
		updatedAt: ILLUSTRATED_AT,
		domains: emptyDomains()
	})
];
function cloneEvaluation(evaluation) {
	return JSON.parse(JSON.stringify(evaluation));
}
function loadScenario(id) {
	return cloneEvaluation(SCENARIOS.find((scenario) => scenario.id === id) ?? SCENARIOS[0]);
}
function isEvaluation(value) {
	if (!value || typeof value !== "object") return false;
	const record = value;
	return typeof record.title === "string" && !!record.domains && !!record.domains.person && !!record.vulnerability && typeof record.power === "number" && typeof record.governance === "number";
}
function domainById(id) {
	const domain = DOMAINS.find((item) => item.id === id);
	if (!domain) throw new Error(`Unknown domain ${id}`);
	return domain;
}
var CONSTRUCT_IDS = CONSTRUCTS.map((item) => item.id);
function clamp(value, min, max) {
	return Math.min(max, Math.max(min, value));
}
function meanOf(values) {
	if (!values.length) return 0;
	return values.reduce((sum, value) => sum + value, 0) / values.length;
}
function constructStats(evaluation, construct) {
	let numerator = 0;
	let denominator = 0;
	let weightScored = 0;
	const parts = [];
	for (const domain of DOMAINS) {
		const weight = DOMAIN_WEIGHT[domain.id];
		const anchor = evaluation.domains[domain.id][construct];
		if (anchor === null) continue;
		const weighted = weight * CONFIDENCE_WEIGHT[evaluation.domains[domain.id].confidence];
		numerator += weighted * (anchor / 4);
		denominator += weighted;
		weightScored += weight;
		parts.push({
			domain: domain.id,
			anchor,
			weight: weighted
		});
	}
	return {
		value: denominator === 0 ? null : numerator / denominator * 100,
		coverage: weightScored,
		denominator,
		parts
	};
}
function mix(parts) {
	const present = parts.filter((part) => part.value !== null);
	if (!present.length) return {
		value: null,
		share: {}
	};
	const denominator = present.reduce((sum, part) => sum + part.weight, 0);
	const share = {};
	let value = 0;
	for (const part of present) {
		const portion = part.weight / denominator;
		share[part.key] = portion;
		value += portion * part.value;
	}
	return {
		value,
		share
	};
}
function vulnerabilityMultiplier(evaluation) {
	const load = FLAGS.reduce((sum, flag) => {
		return evaluation.vulnerability[flag.id] ? sum + flag.loading : sum;
	}, 0);
	return 1 + clamp(evaluation.vulnerability.share, 0, 1) * load;
}
function gapSentence(gap) {
	if (gap === 0) return "Governance matches the scale of power.";
	const points = Math.abs(gap);
	const unit = points === 1 ? "anchor point" : "anchor points";
	if (gap < 0) return `Governance is ahead of power by ${points} ${unit}.`;
	const base = `Power is ahead of governance by ${points} ${unit}.`;
	if (gap >= 2) return `${base} The capacity to govern has not kept up with the power to transform.`;
	return base;
}
function statusDetail(status, hold, clear, untested, na) {
	if (status === "hold") return hold;
	if (status === "clear") return clear;
	if (status === "na") return na ?? clear;
	return untested;
}
function safeguardsFor(evaluation, gap) {
	const person = evaluation.domains.person;
	const peace = evaluation.domains.peace;
	const subsistence = evaluation.domains.subsistence;
	const generations = evaluation.domains.generations;
	const relationships = evaluation.domains.relationships;
	const community = evaluation.domains.community;
	const dignity = person.threat === null ? "untested" : person.threat >= 3 ? "hold" : "clear";
	const peaceStatus = peace.threat === null || peace.benefit === null ? "untested" : peace.threat >= 3 && peace.benefit <= 1 ? "hold" : "clear";
	const subsistenceStatus = subsistence.threat === null || subsistence.cost === null || subsistence.benefit === null ? "untested" : subsistence.threat >= 3 && subsistence.cost >= 3 && subsistence.benefit <= 1 ? "hold" : "clear";
	const generationsStatus = generations.threat === null || generations.benefit === null ? "untested" : generations.threat >= 3 && generations.benefit <= 1 ? "hold" : "clear";
	const flagged = FLAGS.some((flag) => evaluation.vulnerability[flag.id]);
	const relKnown = relationships.threat !== null && relationships.benefit !== null;
	const placeKnown = community.threat !== null && community.benefit !== null;
	const relFail = relKnown && relationships.threat >= 3 && relationships.benefit <= 1;
	const placeFail = placeKnown && community.threat >= 3 && community.benefit <= 1;
	let vulnerability = "na";
	if (flagged) {
		if (relFail || placeFail) vulnerability = "hold";
		else if (relKnown && placeKnown) vulnerability = "clear";
		else vulnerability = "untested";
	}
	const threats = DOMAINS.map((domain) => evaluation.domains[domain.id].threat);
	const anyThreatScored = threats.some((anchor) => anchor !== null);
	const anySevereThreat = threats.some((anchor) => anchor !== null && anchor >= 3);
	const discernment = gap < 3 ? "clear" : !anyThreatScored ? "untested" : anySevereThreat ? "hold" : "clear";
	return [
		{
			id: "dignity",
			title: "Dignity",
			status: dignity,
			domains: ["person"],
			detail: statusDetail(dignity, "The person-domain threat is 3 or higher. The technology treats the person as a means, a target, or a class.", "Person-domain threat is below 3.", "Not tested. Score threat on the person.")
		},
		{
			id: "vulnerability",
			title: "Exposure",
			status: vulnerability,
			domains: ["relationships", "community"],
			detail: statusDetail(vulnerability, "Harm at anchor 3 or higher is landing on mezzo ties or on place, while benefit there is 1 or lower, and the people flagged have less room to refuse.", "Mezzo ties and place were scored. This exposure rule is not met.", "Not tested. Score benefit and threat for mezzo ties and for place.", "Not applicable. No exposure flag is set. Flags raise the weight of harm; they do not score a person’s worth.")
		},
		{
			id: "subsistence",
			title: "Subsistence",
			status: subsistenceStatus,
			domains: ["subsistence"],
			detail: statusDetail(subsistenceStatus, "Food, water, or energy shows threat and cost at 3 or higher, with benefit at 1 or lower. A shortage imposed on people is not offset by gains elsewhere.", "The subsistence rule is not met.", "Not tested. Score benefit, cost, and threat for food, water, and energy.")
		},
		{
			id: "peace",
			title: "Peace",
			status: peaceStatus,
			domains: ["peace"],
			detail: statusDetail(peaceStatus, "Peace threat is 3 or higher while benefit is 1 or lower. Surveillance, manipulation, discrimination, cyber offense, or autonomous violence is not bought off by other goods.", "The peace rule is not met.", "Not tested. Score benefit and threat for peace and freedom.")
		},
		{
			id: "generations",
			title: "Preparedness",
			status: generationsStatus,
			domains: ["generations"],
			detail: statusDetail(generationsStatus, "Time-and-generations threat is 3 or higher while benefit is 1 or lower. Shocks are being pushed onto people who are not here to consent.", "The preparedness rule is not met.", "Not tested. Score benefit and threat for time and generations.")
		},
		{
			id: "discernment",
			title: "Discernment",
			status: discernment,
			domains: [],
			detail: statusDetail(discernment, "Power outruns governance by 3 or more anchors, and at least one threat is serious. Greater power requires a greater capacity to refuse the harm.", gap < 3 ? "Power does not outrun governance by the hold threshold of 3." : "Threats were scored. None is at the serious threshold while the gap is this wide.", "Not tested. The governance gap is wide, and no threat has been scored yet.")
		}
	];
}
function uncitedAnchors(evaluation) {
	const found = [];
	for (const domain of DOMAINS) for (const construct of CONSTRUCT_IDS) {
		const anchor = evaluation.domains[domain.id][construct];
		if (anchor !== null && anchor >= 3 && !evaluation.domains[domain.id].evidence.trim()) found.push({
			domain: domain.id,
			construct
		});
	}
	return found;
}
function driversFrom(parts, denominator, construct, mixWeight, scale) {
	if (denominator === 0 || mixWeight === 0) return [];
	return parts.filter((part) => part.anchor > 0).map((part) => ({
		domain: part.domain,
		construct,
		anchor: part.anchor,
		points: part.weight / denominator * (part.anchor / 4) * 100 * mixWeight * scale
	}));
}
function recommend(input) {
	const holds = input.safeguards.filter((item) => item.status === "hold");
	if (holds.length) return {
		recommendation: "stop",
		reason: `Do not proceed. Safeguard hold: ${holds.map((item) => item.title.toLowerCase()).join(", ")}. A gain in another domain does not buy a hold down.`
	};
	if (input.index === null) return {
		recommendation: "incomplete",
		reason: "Score at least one benefit or opportunity, and at least one cost or threat. Unscored is not zero."
	};
	const qualifiers = [];
	if (input.safeguards.some((item) => item.status === "untested")) qualifiers.push("a safeguard is still untested");
	if (input.uncited.length) qualifiers.push("an anchor of 3 or 4 has no source");
	if (input.coverage < .75) qualifiers.push("too many domains are still unscored");
	if (input.gap >= 2) qualifiers.push("power is ahead of governance");
	if (input.index < 40) return {
		recommendation: "stop",
		reason: "The index is under 40. This decision burdens the person too heavily to proceed in this form."
	};
	if (input.index < 55) return {
		recommendation: "redesign",
		reason: "The index is mixed-to-low. Redesign the path that produces the harm before this stage goes further."
	};
	if (qualifiers.length) {
		const because = qualifiers.join("; ");
		if (input.index >= 60) return {
			recommendation: "conditions",
			reason: `Proceed only with conditions. The index is ${Math.round(input.index)}, but ${because}.`
		};
		return {
			recommendation: "redesign",
			reason: `Redesign before going further. ${because.charAt(0).toUpperCase()}${because.slice(1)}.`
		};
	}
	if (input.index >= 70 && input.gap <= 0 && input.coverage >= .9) return {
		recommendation: "proceed",
		reason: "Proceed at this stage. The index clears 70, governance is at least level with power, safeguards are clear, and high anchors are sourced. Rescore before the next stage."
	};
	if (input.index >= 60) return {
		recommendation: "conditions",
		reason: "Proceed with conditions. The index serves the person, but it is not high enough, or governance is not ahead enough, for an unqualified proceed."
	};
	return {
		recommendation: "redesign",
		reason: "Redesign before going further. The index sits in the mixed band."
	};
}
function bandLabel(index) {
	if (index === null) return "Not yet scored";
	if (index >= 80) return "Strongly serves the person";
	if (index >= 65) return "Serves the person";
	if (index >= 50) return "Mixed";
	if (index >= 35) return "Burdens the person";
	return "Grave misalignment";
}
function scoreEvaluation(evaluation) {
	const stats = {
		benefit: constructStats(evaluation, "benefit"),
		opportunity: constructStats(evaluation, "opportunity"),
		cost: constructStats(evaluation, "cost"),
		threat: constructStats(evaluation, "threat")
	};
	const coverages = {
		benefit: stats.benefit.coverage,
		opportunity: stats.opportunity.coverage,
		cost: stats.cost.coverage,
		threat: stats.threat.coverage
	};
	const coverage = meanOf(CONSTRUCT_IDS.map((id) => coverages[id]));
	const goodMix = mix([{
		key: "benefit",
		value: stats.benefit.value,
		weight: GOOD_MIX.benefit
	}, {
		key: "opportunity",
		value: stats.opportunity.value,
		weight: GOOD_MIX.opportunity
	}]);
	const harmMix = mix([{
		key: "cost",
		value: stats.cost.value,
		weight: HARM_MIX.cost
	}, {
		key: "threat",
		value: stats.threat.value,
		weight: HARM_MIX.threat
	}]);
	const vulnerability = vulnerabilityMultiplier(evaluation);
	const good = goodMix.value;
	const harm = harmMix.value;
	const adjustedHarm = harm === null ? null : harm * vulnerability;
	let rawIndex = null;
	let index = null;
	let clamped = false;
	if (good !== null && adjustedHarm !== null) {
		rawIndex = 50 + .5 * (good - adjustedHarm);
		const floored = clamp(rawIndex, 0, 100);
		clamped = floored !== rawIndex;
		index = floored;
	}
	let cells = 0;
	let confidenceSum = 0;
	for (const domain of DOMAINS) for (const construct of CONSTRUCT_IDS) if (evaluation.domains[domain.id][construct] !== null) {
		cells += 1;
		confidenceSum += CONFIDENCE_WEIGHT[evaluation.domains[domain.id].confidence];
	}
	const meanConfidence = cells ? confidenceSum / cells : 0;
	const evidenceHalf = index === null ? null : Math.round((1 - meanConfidence * coverage) * 18);
	const band = index === null || evidenceHalf === null || rawIndex === null ? null : [clamp(Math.round(rawIndex - evidenceHalf), 0, 100), clamp(Math.round(rawIndex + evidenceHalf), 0, 100)];
	const gap = evaluation.power - evaluation.governance;
	const benefitShare = goodMix.share.benefit ?? 0;
	const opportunityShare = goodMix.share.opportunity ?? 0;
	const costShare = harmMix.share.cost ?? 0;
	const threatShare = harmMix.share.threat ?? 0;
	const driversGood = [...driversFrom(stats.benefit.parts, stats.benefit.denominator, "benefit", benefitShare, 1), ...driversFrom(stats.opportunity.parts, stats.opportunity.denominator, "opportunity", opportunityShare, 1)].sort((a, b) => b.points - a.points).slice(0, 3);
	const driversHarm = [...driversFrom(stats.cost.parts, stats.cost.denominator, "cost", costShare, vulnerability), ...driversFrom(stats.threat.parts, stats.threat.denominator, "threat", threatShare, vulnerability)].sort((a, b) => b.points - a.points).slice(0, 3);
	const safeguards = safeguardsFor(evaluation, gap);
	const uncited = uncitedAnchors(evaluation);
	const decision = recommend({
		index,
		gap,
		coverage,
		safeguards,
		uncited
	});
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
		reason: decision.reason
	};
}
function line(value) {
	if (value === null || value === void 0 || value === "") return "—";
	return String(value);
}
function num(value, digits = 1) {
	if (value === null) return "—";
	return value.toFixed(digits);
}
function slug(title) {
	return title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || "dignitas-record";
}
function recordSlug(evaluation) {
	return slug(evaluation.title || "untitled-decision");
}
function anchorCell(value) {
	return value === null ? "—" : String(value);
}
function toMarkdown(evaluation, result) {
	const flags = FLAGS.filter((flag) => evaluation.vulnerability[flag.id]).map((flag) => flag.label).join("; ");
	const domainRows = DOMAINS.map((domain) => {
		const score = evaluation.domains[domain.id];
		return `| ${domain.label} | ${domain.level} | ${anchorCell(score.benefit)} | ${anchorCell(score.opportunity)} | ${anchorCell(score.cost)} | ${anchorCell(score.threat)} | ${score.confidence} | ${score.evidence.replace(/\|/g, "/").replace(/\n/g, " ") || "—"} |`;
	}).join("\n");
	const safeguards = result.safeguards.map((item) => `- **${item.title}** — ${item.status}. ${item.detail}`).join("\n");
	const posture = evaluation.posture ? POSTURE_LABEL[evaluation.posture] : "Not recorded";
	const suggestion = result.recommendation === "incomplete" ? "Incomplete protocol" : POSTURE_LABEL[result.recommendation];
	return `# Dignitas Protocol v1.0

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
		const lines = [
			0,
			1,
			2,
			3,
			4
		].map((anchor) => `  - ${anchor}: ${ANCHORS[construct.id][anchor]}`).join("\n");
		return `### ${construct.label}\n\n${lines}`;
	}).join("\n\n")}

## Formula (v1.0, weights fixed)

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
var GOOD_TEXT = "0.62×Benefits + 0.38×Opportunities";
var HARM_TEXT = "0.45×Costs + 0.55×Threats";
function toJson(evaluation, result) {
	return JSON.stringify({
		protocol: `Dignitas 1.0`,
		worth: WORTH_LINE,
		evaluation,
		result,
		weights: {
			domains: DOMAIN_WEIGHT,
			good: {
				benefit: .62,
				opportunity: .38
			},
			harm: {
				cost: .45,
				threat: .55
			},
			flags: Object.fromEntries(FLAGS.map((flag) => [flag.id, flag.loading]))
		}
	}, null, 2);
}
function downloadText(filename, text, type) {
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
function constructLabel(construct) {
	return CONSTRUCTS.find((item) => item.id === construct)?.label ?? construct;
}
function one$1(value) {
	return value === null ? "—" : value.toFixed(1);
}
function statusIcon(status) {
	if (status === "hold") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, {
		className: "size-4 text-oxide",
		"aria-hidden": true
	});
	if (status === "clear") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, {
		className: "size-4 text-leaf",
		"aria-hidden": true
	});
	if (status === "na") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Minus, {
		className: "size-4 text-muted",
		"aria-hidden": true
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Circle, {
		className: "size-4 text-muted",
		"aria-hidden": true
	});
}
var STATUS_WORD = {
	hold: "Holds",
	clear: "Clear",
	untested: "Not tested",
	na: "Not used"
};
function IndexPanel({ evaluation, result, notice, onPosture, onSave, onMarkdown, onJson }) {
	if (result.cells === 0) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
		className: "panel order-1 p-5 lg:sticky lg:top-4 lg:order-2 lg:max-h-screen lg:overflow-y-auto",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs font-semibold uppercase tracking-widest text-muted",
				children: "Dignity Index"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 font-display text-6xl leading-none text-muted",
				children: "—"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-4 text-sm text-pretty text-ink",
				children: "Score at least one benefit or opportunity, and one cost or threat. Unscored is not zero."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 text-sm text-pretty text-muted",
				children: WORTH_LINE
			})
		]
	});
	const held = result.safeguards.some((item) => item.status === "hold");
	const numberTone = held || result.index !== null && result.index < 50 ? "text-oxide" : result.index !== null && result.index >= 65 ? "text-leaf" : "text-ink";
	const suggestion = result.recommendation === "incomplete" ? "Incomplete" : POSTURE_LABEL[result.recommendation];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
		className: "panel order-1 p-5 lg:sticky lg:top-4 lg:order-2 lg:max-h-screen lg:overflow-y-auto",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-xs font-semibold uppercase tracking-widest text-muted",
				children: ["Dignity Index · v", "1.0"]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: clsx("mt-2 font-display text-7xl leading-none tabular-nums", numberTone),
				"aria-live": "polite",
				children: result.index === null ? "—" : Math.round(result.index)
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-lg font-semibold text-balance",
				children: bandLabel(result.index)
			}),
			held && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-sm font-semibold text-oxide",
				children: "Safeguard hold. Do not read the index as permission."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "relative mt-4 h-1.5 rounded-full bg-line",
				"aria-hidden": true,
				children: result.index !== null && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "absolute top-1/2 size-3.5 -translate-y-1/2 rounded-full bg-ink",
					style: { left: `clamp(0px, calc(${result.index}% - 7px), calc(100% - 14px))` }
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-1 flex justify-between text-xs text-muted",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "0" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "no effect" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "100" })
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-4 text-sm text-pretty text-muted",
				children: WORTH_LINE
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
				className: "mt-5 grid grid-cols-2 gap-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Metric, {
						label: "Benefits",
						value: result.benefit,
						tone: "good"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Metric, {
						label: "Opportunities",
						value: result.opportunity,
						tone: "good"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Metric, {
						label: "Costs",
						value: result.cost,
						tone: "harm"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Metric, {
						label: "Threats",
						value: result.threat,
						tone: "harm"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-4 text-sm tabular-nums text-ink",
				children: [
					"Good ",
					one$1(result.good),
					" − adjusted harm ",
					one$1(result.adjustedHarm)
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-sm tabular-nums text-muted",
				children: [
					"Raw ",
					one$1(result.rawIndex),
					result.clamped ? " · floored at the scale. Past the floor, read the holds, not a lower number." : "",
					result.band ? ` · evidence band ${result.band[0]}–${result.band[1]}` : ""
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-2 text-sm text-pretty text-muted",
				children: [
					"Harm × ",
					result.vulnerability.toFixed(2),
					". The multiplier raises costs and threats when they land on people with less room to refuse. It never raises benefits, and it is not a score of the person."
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-sm text-pretty text-ink",
				children: result.gapSentence
			}),
			result.safeguards.some((item) => item.status === "hold" || item.status === "untested") && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "mt-4 space-y-3",
				children: result.safeguards.filter((item) => item.status === "hold" || item.status === "untested").map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "flex gap-2 text-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "mt-0.5",
						children: statusIcon(item.status)
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-semibold",
							children: item.title
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "text-muted",
							children: [
								" · ",
								STATUS_WORD[item.status],
								". "
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-pretty text-ink",
							children: item.detail
						})
					] })]
				}, item.id))
			}),
			result.safeguards.some((item) => item.status === "clear" || item.status === "na") && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("details", {
				className: "mt-3 text-sm",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("summary", {
					className: "min-h-11 cursor-pointer py-2 font-semibold",
					children: [
						result.safeguards.filter((item) => item.status === "clear").length,
						" clear",
						result.safeguards.some((item) => item.status === "na") ? " · some not used" : ""
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "space-y-3 pb-2",
					children: result.safeguards.filter((item) => item.status === "clear" || item.status === "na").map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "flex gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "mt-0.5",
							children: statusIcon(item.status)
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-semibold",
								children: item.title
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "text-muted",
								children: [
									" · ",
									STATUS_WORD[item.status],
									". "
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-pretty",
								children: item.detail
							})
						] })]
					}, item.id))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-5 border-t border-line pt-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs font-semibold uppercase tracking-widest text-muted",
						children: "Suggestion for this stage"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 font-semibold",
						children: suggestion
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-sm text-pretty text-muted",
						children: result.reason
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs font-semibold uppercase tracking-widest text-muted",
						children: "Rater posture"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-2 grid gap-2",
						children: Object.keys(POSTURE_LABEL).map((posture) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							"aria-pressed": evaluation.posture === posture,
							onClick: () => onPosture(posture),
							className: clsx("choice min-h-11 rounded-xl px-3 text-left text-sm font-semibold", evaluation.posture === posture ? "bg-ink text-surface" : "bg-paper text-ink"),
							children: POSTURE_LABEL[posture]
						}, posture))
					}),
					evaluation.posture && evaluation.posture !== result.recommendation && result.recommendation !== "incomplete" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm text-muted",
						children: "This posture differs from the protocol suggestion. Say why in the rater note."
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 flex flex-wrap gap-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: onSave,
						className: "choice min-h-11 rounded-xl bg-leaf px-4 font-semibold text-surface",
						children: "Save snapshot"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: onMarkdown,
						className: "choice min-h-11 rounded-xl bg-paper px-4 font-semibold text-ink",
						children: "Markdown"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: onJson,
						className: "choice min-h-11 rounded-xl bg-paper px-4 font-semibold text-ink",
						children: "JSON"
					})
				]
			}),
			notice && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-sm text-leaf",
				children: notice
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("details", {
				className: "mt-4 text-sm",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("summary", {
						className: "min-h-11 cursor-pointer py-2 font-semibold",
						children: "What is pulling the number"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-pretty text-muted",
						children: [
							"Based on ",
							result.cells,
							" of 32 anchors. Confidence does not drag a score toward 50. When domains disagree, stronger evidence outweighs weaker. Thin evidence widens the band. The band is not a statistical confidence interval."
						]
					}),
					result.driversGood.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 font-semibold",
						children: "Largest goods"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "mt-1 space-y-1",
						children: result.driversGood.map((driver) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "tabular-nums",
							children: [
								domainById(driver.domain).short,
								" ",
								constructLabel(driver.construct).toLowerCase(),
								" ",
								driver.anchor,
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "text-muted",
									children: [
										" · ",
										driver.points.toFixed(1),
										" pts of good"
									]
								})
							]
						}, `${driver.domain}-${driver.construct}`))
					}),
					result.driversHarm.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 font-semibold",
						children: "Largest harms"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "mt-1 space-y-1",
						children: result.driversHarm.map((driver) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "tabular-nums",
							children: [
								domainById(driver.domain).short,
								" ",
								constructLabel(driver.construct).toLowerCase(),
								" ",
								driver.anchor,
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "text-muted",
									children: [
										" · ",
										driver.points.toFixed(1),
										" pts of adjusted harm"
									]
								})
							]
						}, `${driver.domain}-${driver.construct}`))
					}),
					result.uncited.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-3 text-pretty",
						children: [
							"Anchors of 3 or 4 still need a source:",
							" ",
							result.uncited.map((item) => `${domainById(item.domain).short} ${constructLabel(item.construct).toLowerCase()}`).join(", "),
							"."
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-3 text-muted",
						children: [
							"Domain weights in this version: ",
							DOMAINS.map((domain) => `${domain.short} ${DOMAIN_WEIGHT[domain.id]}`).join(" · "),
							"."
						]
					})
				]
			})
		]
	});
}
function Metric({ label, value, tone }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-xl bg-paper px-3 py-2",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
				className: "text-xs font-semibold uppercase tracking-widest text-muted",
				children: label
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
				className: "mt-1 font-display text-3xl leading-none tabular-nums",
				children: value === null ? "—" : Math.round(value)
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("progress", {
				className: clsx("mt-2", tone === "harm" && "harm", tone === "good" && "good"),
				value: value ?? 0,
				max: 100
			})
		]
	});
}
function one(value) {
	return value === null ? "—" : value.toFixed(1);
}
function Brief({ evaluation, result, onPrint }) {
	const flags = FLAGS.filter((flag) => evaluation.vulnerability[flag.id]);
	const suggestion = result.recommendation === "incomplete" ? "Incomplete protocol" : POSTURE_LABEL[result.recommendation];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: "mx-auto max-w-3xl px-4 py-8 sm:px-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "no-print mb-6 flex justify-end",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: onPrint,
					className: "choice min-h-11 rounded-xl bg-ink px-4 font-semibold text-surface",
					children: "Print brief"
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-xs font-semibold uppercase tracking-widest text-muted",
				children: ["Dignitas Protocol v", "1.0"]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mt-2 font-display text-4xl leading-tight",
				children: evaluation.title || "Untitled decision"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-2 text-muted",
				children: [
					evaluation.technologyClass,
					" · ",
					evaluation.stage,
					evaluation.organization ? ` · ${evaluation.organization}` : ""
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-6 font-display text-6xl leading-none tabular-nums",
				children: result.index === null ? "—" : Math.round(result.index)
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-lg font-semibold",
				children: bandLabel(result.index)
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-sm text-pretty text-muted",
				children: WORTH_LINE
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-4 text-sm tabular-nums",
				children: [
					"Benefits ",
					one(result.benefit),
					" · Opportunities ",
					one(result.opportunity),
					" · Costs ",
					one(result.cost),
					" · Threats",
					" ",
					one(result.threat)
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-sm tabular-nums text-muted",
				children: [
					"Good ",
					one(result.good),
					" − adjusted harm ",
					one(result.adjustedHarm),
					" · raw ",
					one(result.rawIndex),
					result.band ? ` · evidence band ${result.band[0]}–${result.band[1]}` : ""
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				className: "mt-8 font-display text-2xl",
				children: "The person"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2",
				children: evaluation.person || "Unnamed."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-muted",
				children: evaluation.setting || "Setting not stated."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-2 text-sm",
				children: [
					"Exposure flags: ",
					flags.length ? flags.map((flag) => flag.label).join("; ") : "none",
					". Share of harms on those flags: ",
					Math.round(evaluation.vulnerability.share * 100),
					"%. Multiplier ×",
					result.vulnerability.toFixed(2),
					"."
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-sm",
				children: result.gapSentence
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-sm text-muted",
				children: [
					"Power ",
					evaluation.power,
					": ",
					POWER_ANCHORS[evaluation.power].text,
					" Governance ",
					evaluation.governance,
					":",
					" ",
					GOVERNANCE_ANCHORS[evaluation.governance].text
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				className: "mt-8 font-display text-2xl",
				children: "Safeguards"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "mt-2 space-y-2 text-sm",
				children: result.safeguards.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-semibold",
						children: item.title
					}),
					" — ",
					item.status,
					". ",
					item.detail
				] }, item.id))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				className: "mt-8 font-display text-2xl",
				children: "Posture"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-2 text-sm",
				children: [
					"Suggestion: ",
					suggestion,
					". ",
					result.reason
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-1 text-sm",
				children: ["Rater posture: ", evaluation.posture ? POSTURE_LABEL[evaluation.posture] : "Not recorded."]
			}),
			evaluation.notes && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 text-pretty",
				children: evaluation.notes
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				className: "mt-8 font-display text-2xl",
				children: "Domains"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-3 space-y-4",
				children: DOMAINS.map((domain) => {
					const score = evaluation.domains[domain.id];
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "border-t border-line pt-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h4", {
								className: "font-semibold",
								children: [
									domain.label,
									" ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "font-normal text-muted",
										children: ["· ", domain.level]
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-sm tabular-nums text-muted",
								children: [
									"Benefit ",
									score.benefit ?? "—",
									" · Opportunity ",
									score.opportunity ?? "—",
									" · Cost ",
									score.cost ?? "—",
									" · Threat",
									" ",
									score.threat ?? "—",
									" · ",
									score.confidence,
									" confidence"
								]
							}),
							score.evidence && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-sm text-pretty",
								children: score.evidence
							})
						]
					}, domain.id);
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-8 text-sm text-muted",
				children: [
					"Rater ",
					evaluation.rater || "unnamed",
					evaluation.date ? ` · ${evaluation.date}` : "",
					". Computed with Dignitas Protocol v",
					"1.0",
					". Weights are fixed in this version."
				]
			})
		]
	});
}
function Method() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: "mx-auto max-w-3xl space-y-8 px-4 py-8 sm:px-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-xs font-semibold uppercase tracking-widest text-muted",
					children: ["Protocol v", "1.0"]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-2 font-display text-4xl",
					children: "How to evaluate a technology against a person"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 text-pretty text-muted",
					children: WORTH_LINE
				})
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "space-y-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "font-display text-2xl",
						children: "What the number is"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "The Dignity Index runs from 0 to 100. Fifty means no assessed effect. It is not a passing grade. Above 50, the scored goods outweigh the adjusted harms. Below 50, they do not." }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Benefits and opportunities are the goods. Costs and threats are the harms. Opportunities are discounted, because a breakthrough that is only promised is not yet a good in someone’s life. Threats outweigh costs inside the harm term, because surveillance, manipulation, weapons, and shortage can outrun a line item." }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "panel space-y-1 p-4 text-sm tabular-nums",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Good = 0.62 × Benefits + 0.38 × Opportunities" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Harm = 0.45 × Costs + 0.55 × Threats" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Adjusted harm = Harm × vulnerability multiplier" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Raw index = 50 + ½ (Good − Adjusted harm)" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Dignity Index = clamp(raw, 0, 100), then rounded for the headline" })
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted",
						children: "Unscored domains are left out. They are not zeros. If only one construct on a side is scored, that side uses it alone. Confidence changes the point estimate only when domains disagree: stronger evidence outweighs weaker. It does not pull a lonely judgment toward 50. Thin evidence widens the evidence band. That band is not a sampling confidence interval."
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "space-y-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "font-display text-2xl",
						children: "The person in their systems"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "The unit of analysis is one rights-bearing person in the settings that hold them, not an averaged user and not the product. The map follows ecological systems: micro (the person), mezzo (the ties between home, school, clinic, and work — Bronfenbrenner’s mesosystem), exo (decisions made elsewhere that land on them, such as a data-center permit), macro (peace, climate, law, the worth a society assigns), and chrono (time, prevention, and the people not yet born)." }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "space-y-2 text-sm",
						children: DOMAINS.map((domain) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-semibold",
								children: domain.label
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "text-muted",
								children: [
									" · ",
									domain.level,
									" · weight ",
									DOMAIN_WEIGHT[domain.id],
									". "
								]
							}),
							domain.ask
						] }, domain.id))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-sm text-muted",
						children: [
							"Weights are fixed in v",
							"1.0",
							" so two reviews can be compared. Do not retune them to pass a product. If an organization needs different weights, publish a new version. Do not hide the change inside a scoring session."
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "space-y-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "font-display text-2xl",
						children: "Four judgments, one anchor scale"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Each domain is scored 0 to 4 on four constructs. The anchors are the instrument. A number without them is a mood." }),
					CONSTRUCTS.map((construct) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
							className: "font-semibold",
							children: construct.label
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-muted",
							children: construct.hint
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "mt-1 text-sm",
							children: [
								0,
								1,
								2,
								3,
								4
							].map((anchor) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "tabular-nums font-semibold",
								children: [anchor, ". "]
							}), ANCHORS[construct.id][anchor]] }, anchor))
						})
					] }, construct.id)),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm",
						children: "An anchor of 3 or 4 needs a source in the evidence line: a measurement, a contract, a control you can point to, a site visit, or a statement from the people who bear it."
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "space-y-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "font-display text-2xl",
						children: "Where harm lands"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "The multiplier is 1 plus the share of harms — not the share of benefits — that fall on the flags you mark, times the loadings below. It tops out at 2. It never increases a benefit. Marking an autistic youth, or a poor household, does not say that person is a cost. It says a harm landing on someone with less room to refuse counts more than the same harm landing on someone who can walk away." }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "space-y-2 text-sm",
						children: FLAGS.map((flag) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-semibold",
								children: flag.label
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "tabular-nums text-muted",
								children: [
									" · loading ",
									flag.loading,
									". "
								]
							}),
							flag.detail
						] }, flag.id))
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "space-y-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "font-display text-2xl",
						children: "Safeguards are not averaged away"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "A food-system breakthrough does not license an ungoverned weapon. A construction wage does not cancel a lost aquifer. These holds survive a high index. While one holds, the suggestion is do not proceed." }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
						className: "list-disc space-y-2 pl-5 text-sm",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Dignity. Person-domain threat is 3 or higher." }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Exposure. A flag is on, and mezzo ties or place show threat of 3 or higher with benefit of 1 or lower." }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Subsistence. Food, water, and energy show threat and cost of 3 or higher, and benefit of 1 or lower." }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Peace. Threat is 3 or higher and benefit is 1 or lower: surveillance, manipulation, discrimination, cyber offense, or violence without a human who can refuse." }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Preparedness. Generations threat is 3 or higher and benefit is 1 or lower." }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Discernment. Power outruns governance by 3 or more anchors, and any threat is 3 or higher." })
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "space-y-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "font-display text-2xl",
						children: "How a suggestion is chosen"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
						className: "list-disc space-y-2 pl-5 text-sm",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Any safeguard hold: do not proceed." }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Index cannot be computed: incomplete." }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Index under 40: do not proceed." }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Index from 40 up to but not including 55: redesign." }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "From 55 upward, a qualifier — untested safeguard, unsourced anchor of 3 or 4, coverage under 75 percent, or power ahead of governance by 2 or more — blocks an unqualified proceed. At 60 or higher the suggestion is proceed with conditions. Below that, redesign." }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Index of 70 or higher, no qualifier, governance at least level with power, coverage at least 90 percent: proceed at this stage." }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Otherwise, 60 or higher is proceed with conditions, and the rest is redesign." })
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted",
						children: "The band of the number and the posture can disagree. A system can “serve” on the arithmetic and still be stopped by a hold. That disagreement is the point of a non-compensatory rule. The posture applies to this stage. Rescore at design, pilot, and scale."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm",
						children: "Bands: 80–100 strongly serves the person; 65–79 serves the person; 50–64 mixed; 35–49 burdens the person; below 35, grave misalignment."
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "space-y-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "font-display text-2xl",
					children: "How a company runs it"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ol", {
					className: "list-decimal space-y-2 pl-5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Name one decision. Not the whole firm." }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Name the person who bears the sharpest consequences. If a typical customer is someone else, write a second record. Do not average them into a fictional user." }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Set the scale of power, and the governance that actually exists. A PDF policy is not a 4. Unknown governance is a 0." }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Score only what you can anchor. Leave the rest blank." }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Put a source on every 3 and every 4." }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Read the holds before you celebrate the index." }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Record a posture. If you overrule the suggestion, write why." }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Export the markdown into the decision record — the repository, the review packet, the procurement file." }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Rescore when the stage changes. A design-stage proceed is not permission to scale." })
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "space-y-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "font-display text-2xl",
						children: "Two readings worth making"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Open the predictable classroom companion, then the behavior-scoring app. The person does not change. The system around an autistic student does. The index moves because of that, not because autism was entered as a deficit." }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Open the compute campus. Construction wages are a real benefit. They do not buy down a subsistence hold when cooling water and power land on a household that farms downstream." }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Open the flood warning and the clinician-held aid beside the loitering munition. High confidence is not goodness. On the weapon, high confidence means the harm is designed in, and the raw value falls through the floor of the scale." })
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "space-y-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "font-display text-2xl",
					children: "Limits"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
					className: "list-disc space-y-2 pl-5 text-sm",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "This build stores one rater. If a second rater disagrees by more than one anchor, that disagreement is a finding. Do not silently average it away." }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Ordinal anchors are treated as equally spaced. That is a modeling assumption, not a proven interval scale." }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "One confidence judgment covers the whole domain." }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "The evidence band is not a confidence interval and not a margin of error." }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "This is not a clinical instrument, not an environmental impact statement, and not a legal finding." }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "A high index does not replace asking the person. Consent that was never sought cannot be inferred from a score." }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "The holds will miss harms that do not show up in these eight domains. Absence of a hold is not a proof of safety." })
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "space-y-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "font-display text-2xl",
						children: "Where the standard comes from"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "The normative frame is the address to the Pontifical Academy of Sciences on “The Future of Science in a Changing World.” It treats digitalization, artificial intelligence, and robotics as grounds for hope — medicine, food and energy, a deeper reading of the universe and the natural world, creativity and cooperation — and as grounds for restraint: surveillance, manipulation, discrimination, cyber capability and autonomous weapons without human oversight, and the energy and water those systems drink. It says technological progress is never only technical, that power to transform the world has to be matched by discernment, and that climate shocks fall first on the poor and on people whose livelihoods are the land, the forests, and the oceans. The response it asks for is prevention rather than emergency, cooperation across disciplines and borders, and the young in the room." }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Companies do not need to share that theology to use the protocol. They do need to keep a person, not a market, as the unit of analysis. The arithmetic is an evaluation model. It is not a measurement of moral worth." })
				]
			})
		]
	});
}
var DRAFT_KEY = "dignitas.protocol.v1.draft";
var RECORD_KEY = "dignitas.protocol.v1.records";
var STEPS = [{
	id: "case",
	label: "Case"
}, ...DOMAINS.map((domain) => ({
	id: domain.id,
	label: domain.short
}))];
function readRecords() {
	try {
		const parsed = JSON.parse(localStorage.getItem(RECORD_KEY) ?? "[]");
		if (!Array.isArray(parsed)) return [];
		return parsed.filter((item) => {
			if (!item || typeof item !== "object") return false;
			const snapshot = item;
			return typeof snapshot.id === "string" && isEvaluation(snapshot.evaluation);
		});
	} catch {
		return [];
	}
}
function Workbench() {
	const [evaluation, setEvaluation] = (0, import_react.useState)(() => loadScenario("autistic-calm"));
	const [view, setView] = (0, import_react.useState)("score");
	const [step, setStep] = (0, import_react.useState)("case");
	const [records, setRecords] = (0, import_react.useState)([]);
	const [notice, setNotice] = (0, import_react.useState)(null);
	const [ready, setReady] = (0, import_react.useState)(false);
	const result = (0, import_react.useMemo)(() => scoreEvaluation(evaluation), [evaluation]);
	const heldDomains = (0, import_react.useMemo)(() => {
		const ids = /* @__PURE__ */ new Set();
		for (const safeguard of result.safeguards) {
			if (safeguard.status !== "hold") continue;
			for (const id of safeguard.domains) ids.add(id);
		}
		return ids;
	}, [result]);
	(0, import_react.useEffect)(() => {
		try {
			const raw = localStorage.getItem(DRAFT_KEY);
			if (raw) {
				const parsed = JSON.parse(raw);
				if (isEvaluation(parsed)) setEvaluation(parsed);
			}
		} catch {}
		setRecords(readRecords());
		setReady(true);
	}, []);
	(0, import_react.useEffect)(() => {
		if (!ready) return;
		localStorage.setItem(DRAFT_KEY, JSON.stringify(evaluation));
	}, [evaluation, ready]);
	(0, import_react.useEffect)(() => {
		if (!notice) return;
		const timer = window.setTimeout(() => setNotice(null), 2400);
		return () => window.clearTimeout(timer);
	}, [notice]);
	function update(change) {
		setEvaluation((current) => {
			const next = cloneEvaluation(current);
			change(next);
			next.sourceId = null;
			next.updatedAt = (/* @__PURE__ */ new Date()).toISOString();
			return next;
		});
	}
	function saveSnapshot() {
		const next = [{
			id: crypto.randomUUID(),
			savedAt: (/* @__PURE__ */ new Date()).toISOString(),
			evaluation: cloneEvaluation(evaluation),
			index: result.index,
			recommendation: result.recommendation,
			holds: result.safeguards.filter((item) => item.status === "hold").length
		}, ...records].slice(0, 24);
		localStorage.setItem(RECORD_KEY, JSON.stringify(next));
		setRecords(next);
		setNotice("Snapshot saved in this browser.");
	}
	function removeSnapshot(id) {
		const next = records.filter((item) => item.id !== id);
		localStorage.setItem(RECORD_KEY, JSON.stringify(next));
		setRecords(next);
	}
	const touched = (id) => {
		const domain = evaluation.domains[id];
		return domain.benefit !== null || domain.opportunity !== null || domain.cost !== null || domain.threat !== null;
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
				className: "bg-ink text-on-ink",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto flex max-w-6xl flex-col gap-4 px-4 py-6 sm:flex-row sm:items-end sm:justify-between sm:px-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "relative grid size-11 shrink-0 place-items-center",
							"aria-hidden": true,
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute inset-0 rounded-full border border-on-ink-muted" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute inset-1.5 rounded-full border border-on-ink-muted" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "size-2.5 rounded-full bg-leaf" })
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-xs font-semibold uppercase tracking-widest text-on-ink-muted",
							children: ["Protocol v", "1.0"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "font-display text-4xl leading-none",
							children: "Dignitas"
						})] })]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "max-w-md text-sm text-pretty text-on-ink-muted",
						children: "Score how a technology bears on one person — benefits, opportunities, costs, and threats — across the systems that hold them."
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "no-print sticky top-0 z-10 border-b border-line bg-paper",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mx-auto flex max-w-6xl gap-2 px-4 py-2 sm:px-6",
					role: "tablist",
					"aria-label": "Protocol views",
					children: [
						["score", "Score"],
						["brief", "Brief"],
						["method", "Method"]
					].map(([id, label]) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						role: "tab",
						"aria-selected": view === id,
						onClick: () => setView(id),
						className: clsx("view-tab min-h-11 rounded-xl px-4 text-sm font-semibold", view === id ? "bg-ink text-surface" : "text-muted"),
						children: label
					}, id))
				})
			}),
			view === "method" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Method, {}),
			view === "brief" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Brief, {
				evaluation,
				result,
				onPrint: () => window.print()
			}),
			view === "score" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto grid max-w-6xl gap-6 px-4 py-6 lg:grid-cols-[minmax(0,1fr)_22rem] lg:px-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "order-2 min-w-0 space-y-4 lg:order-1",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "block",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "mb-1 block text-sm font-semibold",
									children: "Open a case"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
									className: "field",
									value: evaluation.sourceId ?? "edited",
									onChange: (event) => {
										const value = event.target.value;
										if (value === "edited") return;
										setEvaluation(loadScenario(value));
									},
									children: [evaluation.sourceId === null && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "edited",
										children: "Edited case"
									}), SCENARIOS.map((scenario) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: scenario.id,
										children: scenario.id === "blank" ? "Blank protocol" : scenario.title
									}, scenario.id))]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "mt-1 block text-sm text-muted",
									children: evaluation.sourceId && evaluation.sourceId !== "blank" ? "Teaching record, not a finding about a real company. Edit any anchor and it becomes your case." : evaluation.sourceId === "blank" ? "Name one decision and one person before you trust an index." : "Edited. A snapshot keeps this version in this browser."
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex gap-2 overflow-x-auto pb-1",
							role: "tablist",
							"aria-label": "Protocol steps",
							children: STEPS.map((item) => {
								const domainId = item.id === "case" ? null : item.id;
								const on = step === item.id;
								return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "button",
									role: "tab",
									"aria-selected": on,
									onClick: () => setStep(item.id),
									className: clsx("chip inline-flex min-h-11 shrink-0 items-center gap-2 rounded-full px-3 text-sm font-semibold", on ? "bg-ink text-surface" : "raised text-ink"),
									children: [
										item.label,
										domainId && heldDomains.has(domainId) && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "size-2 rounded-full bg-oxide",
											"aria-label": "Safeguard hold"
										}),
										domainId && !heldDomains.has(domainId) && touched(domainId) && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: clsx("size-2 rounded-full", on ? "bg-leaf" : "bg-leaf"),
											"aria-hidden": true
										})
									]
								}, item.id);
							})
						}),
						step === "case" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CaseStep, {
							evaluation,
							records,
							update,
							onOpen: (item) => setEvaluation(cloneEvaluation(item)),
							onRemove: removeSnapshot
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DomainStep, {
							evaluation,
							result,
							domainId: step,
							update
						}),
						result.cells > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
							className: "panel p-4 sm:p-5",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "font-display text-2xl",
									children: "Profile across systems"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1 text-sm text-muted",
									children: "Goods in green, harms in oxide. Read the person before the average of the bars."
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mt-4",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Profile, { evaluation })
								})
							]
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IndexPanel, {
					evaluation,
					result,
					notice,
					onPosture: (posture) => update((draft) => {
						draft.posture = posture;
					}),
					onSave: saveSnapshot,
					onMarkdown: () => {
						downloadText(`${recordSlug(evaluation)}.md`, toMarkdown(evaluation, result), "text/markdown");
						setNotice("Markdown downloaded.");
					},
					onJson: () => {
						downloadText(`${recordSlug(evaluation)}.json`, toJson(evaluation, result), "application/json");
						setNotice("JSON downloaded.");
					}
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", {
				className: "mx-auto max-w-6xl px-4 py-8 text-sm text-pretty text-muted sm:px-6",
				children: [
					"Dignitas Protocol v",
					"1.0",
					". Weights stay fixed so records can be compared. ",
					WORTH_LINE
				]
			})
		]
	});
}
function Profile({ evaluation }) {
	const [Chart, setChart] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		let live = true;
		import("./domain-chart-CZqPUXVR.mjs").then((mod) => {
			if (live) setChart(() => mod.DomainChart);
		});
		return () => {
			live = false;
		};
	}, []);
	if (!Chart) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-80" });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chart, { evaluation });
}
function CaseStep({ evaluation, records, update, onOpen, onRemove }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "panel space-y-4 p-4 sm:p-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-2xl",
					children: "The decision"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-sm text-pretty text-muted",
					children: "One technology choice, at one stage. Not the whole company."
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-4 sm:grid-cols-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Decision",
							className: "sm:col-span-2",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								className: "field",
								value: evaluation.title,
								placeholder: "Name the decision, not the slogan",
								autoComplete: "off",
								onChange: (event) => update((draft) => {
									draft.title = event.target.value;
								})
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Organization",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								className: "field",
								value: evaluation.organization,
								autoComplete: "off",
								onChange: (event) => update((draft) => {
									draft.organization = event.target.value;
								})
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Rater",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								className: "field",
								value: evaluation.rater,
								autoComplete: "off",
								onChange: (event) => update((draft) => {
									draft.rater = event.target.value;
								})
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Class",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
								className: "field",
								value: evaluation.technologyClass,
								onChange: (event) => update((draft) => {
									draft.technologyClass = event.target.value;
								}),
								children: TECHNOLOGY_CLASSES.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: item }, item))
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Stage",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
								className: "field",
								value: evaluation.stage,
								onChange: (event) => update((draft) => {
									draft.stage = event.target.value;
								}),
								children: STAGES.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: item }, item))
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Date",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								className: "field",
								type: "date",
								value: evaluation.date,
								onChange: (event) => update((draft) => {
									draft.date = event.target.value;
								})
							})
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "panel space-y-4 p-4 sm:p-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-2xl",
						children: "The person at the center"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-sm text-pretty text-muted",
						children: "Name someone who can be harmed or helped. If the typical customer is a different person, score them in a second record. Do not average the two."
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Rights-bearer",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							className: "field",
							value: evaluation.person,
							placeholder: "A 13-year-old autistic student, a household downstream, a patient",
							autoComplete: "off",
							onChange: (event) => update((draft) => {
								draft.person = event.target.value;
							})
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Setting",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							className: "field",
							value: evaluation.setting,
							placeholder: "Home, school, clinic, watershed, ward, street",
							autoComplete: "off",
							onChange: (event) => update((draft) => {
								draft.setting = event.target.value;
							})
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
						className: "grid gap-2 text-sm sm:grid-cols-2",
						children: [
							["Micro", "The person, in their own body and day."],
							["Mezzo", "Ties between home, school, clinic, work, and peers."],
							["Exo", "Decisions made elsewhere that still land here — a permit, a procurement, a campus."],
							["Macro", "Peace, climate, law, and the worth assigned to a person."],
							["Chrono", "Time: prevention, the next stage, people not yet born."]
						].map(([level, text]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "rounded-xl bg-paper px-3 py-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "font-semibold",
								children: [level, ". "]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-muted",
								children: text
							})]
						}, level))
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "panel space-y-4 p-4 sm:p-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-2xl",
						children: "Where harm lands"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-sm text-pretty text-muted",
						children: "These flags do not lower anyone’s worth and they do not score a diagnosis. They raise the weight of costs and threats when those fall on people with less room to refuse, adapt, or leave."
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid gap-2",
						children: FLAGS.map((flag) => {
							const on = evaluation.vulnerability[flag.id];
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								"aria-pressed": on,
								onClick: () => update((draft) => {
									draft.vulnerability[flag.id] = !draft.vulnerability[flag.id];
								}),
								className: clsx("choice flex min-h-11 w-full items-start gap-3 rounded-xl px-3 py-2 text-left", on ? "bg-ink text-surface" : "bg-paper text-ink"),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: clsx("mt-0.5 grid size-5 shrink-0 place-items-center rounded border", on ? "border-surface" : "border-line"),
									children: on ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, {
										className: "size-3",
										"aria-hidden": true
									}) : null
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "block font-semibold",
									children: flag.label
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: clsx("block text-sm text-pretty", on ? "text-on-ink-muted" : "text-muted"),
									children: flag.detail
								})] })]
							}, flag.id);
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm font-semibold",
							children: "Share of the harms, costs, and residual risks that land on the people flagged"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-muted",
							children: "Not the share of benefits. Until a flag is on, this share does nothing."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-2 flex flex-wrap gap-2",
							children: SHARE_STEPS.map((step) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								"aria-pressed": evaluation.vulnerability.share === step.value,
								onClick: () => update((draft) => {
									draft.vulnerability.share = step.value;
								}),
								className: clsx("choice min-h-11 rounded-xl px-3 text-sm font-semibold", evaluation.vulnerability.share === step.value ? "bg-ink text-surface" : "bg-paper text-ink"),
								children: step.label
							}, step.value))
						})
					] })
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "panel space-y-4 p-4 sm:p-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-2xl",
						children: "Power and the capacity to govern it"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-sm text-pretty text-muted",
						children: "Greater power to transform the world has to be matched by a greater capacity to discern and to stop. If you do not know the governance, score it 0."
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scale, {
						label: "Scale of power",
						value: evaluation.power,
						options: POWER_ANCHORS,
						onChange: (value) => update((draft) => {
							draft.power = value;
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scale, {
						label: "Governance that actually exists",
						value: evaluation.governance,
						options: GOVERNANCE_ANCHORS,
						onChange: (value) => update((draft) => {
							draft.governance = value;
						})
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "panel space-y-3 p-4 sm:p-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-2xl",
					children: "Rater note"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
					className: "field",
					value: evaluation.notes,
					placeholder: "Why this posture, what you refused to score, what the second rater disputed.",
					onChange: (event) => update((draft) => {
						draft.notes = event.target.value;
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "panel space-y-3 p-4 sm:p-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-2xl",
						children: "Snapshots in this browser"
					}),
					records.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted",
						children: "Nothing saved yet. A snapshot stays on this device."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "space-y-2",
						children: records.map((record) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "flex flex-wrap items-center justify-between gap-2 rounded-xl bg-paper px-3 py-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "min-w-0",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "truncate font-semibold",
									children: record.evaluation.title || "Untitled decision"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "text-sm tabular-nums text-muted",
									children: [
										record.index === null ? "—" : Math.round(record.index),
										record.holds ? ` · ${record.holds} hold${record.holds === 1 ? "" : "s"}` : "",
										" · ",
										new Date(record.savedAt).toLocaleString()
									]
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									className: "choice min-h-11 rounded-xl bg-ink px-3 text-sm font-semibold text-surface",
									onClick: () => onOpen(record.evaluation),
									children: "Open"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									className: "choice min-h-11 rounded-xl px-3 text-sm font-semibold text-oxide",
									onClick: () => onRemove(record.id),
									children: "Remove"
								})]
							})]
						}, record.id))
					})
				]
			})
		]
	});
}
function DomainStep({ evaluation, result, domainId, update }) {
	const domain = DOMAINS.find((item) => item.id === domainId);
	const score = evaluation.domains[domainId];
	const holds = result.safeguards.filter((item) => item.status === "hold" && item.domains.includes(domainId));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "panel space-y-5 p-4 sm:p-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-xs font-semibold uppercase tracking-widest text-muted",
					children: [
						domain.level,
						" · weight ",
						DOMAIN_WEIGHT[domainId].toFixed(2)
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-1 font-display text-3xl",
					children: domain.label
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-pretty",
					children: domain.ask
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-sm text-pretty text-muted",
					children: domain.watch
				})
			] }),
			holds.map((hold) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "rounded-xl bg-oxide-soft px-3 py-2 text-sm text-pretty text-ink",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "font-semibold text-oxide",
					children: [hold.title, " holds. "]
				}), hold.detail]
			}, hold.id)),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-4 lg:grid-cols-2",
				children: CONSTRUCTS.map((construct) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScorePicker, {
					construct: construct.id,
					label: construct.label,
					hint: construct.hint,
					tone: construct.tone,
					value: score[construct.id],
					onChange: (value) => update((draft) => {
						draft.domains[domainId][construct.id] = value;
					})
				}, construct.id))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Evidence",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
					className: "field",
					value: score.evidence,
					placeholder: "A source for any 3 or 4: a measurement, a control, a contract, a visit, the person’s own account.",
					onChange: (event) => update((draft) => {
						draft.domains[domainId].evidence = event.target.value;
					})
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm font-semibold",
					children: "Confidence in this domain"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted",
					children: "One judgment for the domain. Low confidence widens the band. It does not pretend the anchor was a 2."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-2 flex flex-wrap gap-2",
					children: [
						"low",
						"moderate",
						"high"
					].map((level) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						"aria-pressed": score.confidence === level,
						onClick: () => update((draft) => {
							draft.domains[domainId].confidence = level;
						}),
						className: clsx("choice min-h-11 rounded-xl px-3 text-sm font-semibold capitalize", score.confidence === level ? "bg-ink text-surface" : "bg-paper text-ink"),
						children: level
					}, level))
				})
			] })
		]
	});
}
function ScorePicker({ construct, label, hint, tone, value, onChange }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("fieldset", {
		className: "rounded-xl bg-paper p-3",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("legend", {
				className: "px-1 font-semibold",
				children: label
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mb-2 text-sm text-pretty text-muted",
				children: hint
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap gap-2",
				role: "group",
				"aria-label": label,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					"aria-pressed": value === null,
					onClick: () => onChange(null),
					className: clsx("choice grid h-11 w-11 place-items-center rounded-xl font-semibold", value === null ? "bg-ink text-surface" : "bg-surface text-muted"),
					children: "—"
				}), [
					0,
					1,
					2,
					3,
					4
				].map((anchor) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					"aria-pressed": value === anchor,
					onClick: () => onChange(anchor),
					className: clsx("choice grid h-11 w-11 place-items-center rounded-xl font-semibold tabular-nums", value === anchor ? tone === "good" ? "bg-leaf text-surface" : "bg-oxide text-surface" : "bg-surface text-ink"),
					children: anchor
				}, anchor))]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 min-h-11 text-sm text-pretty",
				children: value === null ? "Unscored. This anchor will be left out, not treated as zero." : ANCHORS[construct][value]
			})
		]
	});
}
function Scale({ label, value, options, onChange }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("fieldset", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("legend", {
			className: "text-sm font-semibold",
			children: label
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-2 flex flex-wrap gap-2",
			children: [
				0,
				1,
				2,
				3,
				4
			].map((anchor) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				"aria-pressed": value === anchor,
				onClick: () => onChange(anchor),
				className: clsx("choice min-h-11 rounded-xl px-3 text-sm font-semibold", value === anchor ? "bg-ink text-surface" : "bg-paper text-ink"),
				children: [
					anchor,
					" ",
					options[anchor].short
				]
			}, anchor))
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-2 text-sm text-pretty text-muted",
			children: options[value].text
		})
	] });
}
function Field({ label, children, className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
		className: clsx("block", className),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "mb-1 block text-sm font-semibold",
			children: label
		}), children]
	});
}
var routes_exports = /* @__PURE__ */ __exportAll({ component: () => Home });
function Home() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Workbench, {});
}
//#endregion
export { ANCHORS as n, DOMAINS as r, routes_exports as t };
