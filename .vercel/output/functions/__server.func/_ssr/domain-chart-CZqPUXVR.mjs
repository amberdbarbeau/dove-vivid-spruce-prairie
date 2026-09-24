import { I as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as ANCHORS, r as DOMAINS } from "./routes-DwUwU2xn.mjs";
import { a as ResponsiveContainer, i as Bar, n as YAxis, o as Tooltip, r as XAxis, t as BarChart } from "../_libs/recharts+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/domain-chart-CZqPUXVR.js
var import_jsx_runtime = require_jsx_runtime();
var FILL = {
	benefit: "#1e6b45",
	opportunity: "#7eaa93",
	cost: "#c9a29b",
	threat: "#8f3d32"
};
function Tip({ active, payload, label }) {
	if (!active || !payload?.length) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "panel max-w-xs px-3 py-2 text-sm text-ink",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "font-semibold",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "mt-1 space-y-1",
			children: payload.map((item) => {
				const key = item.dataKey;
				const value = item.value;
				if (value === void 0 || value === null || Number.isNaN(value)) return null;
				const anchor = value;
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-semibold capitalize",
						children: key
					}),
					" ",
					value,
					". ",
					ANCHORS[key][anchor]
				] }, key);
			})
		})]
	});
}
function DomainChart({ evaluation }) {
	const data = DOMAINS.map((domain) => {
		const score = evaluation.domains[domain.id];
		return {
			name: domain.short,
			benefit: score.benefit,
			opportunity: score.opportunity,
			cost: score.cost,
			threat: score.threat
		};
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-3 flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "inline-flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-2 w-2 rounded-full bg-leaf" }), " Benefit"]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "inline-flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-2 w-2 rounded-full bg-leaf/45" }), " Opportunity"]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "inline-flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-2 w-2 rounded-full bg-oxide/45" }), " Cost"]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "inline-flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-2 w-2 rounded-full bg-oxide" }), " Threat"]
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "h-80 w-full",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
				width: "100%",
				height: "100%",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(BarChart, {
					data,
					layout: "vertical",
					margin: {
						left: 0,
						right: 8,
						top: 0,
						bottom: 0
					},
					barGap: 2,
					barCategoryGap: 10,
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
							type: "number",
							domain: [0, 4],
							ticks: [
								0,
								1,
								2,
								3,
								4
							],
							tick: {
								fill: "#5c564e",
								fontSize: 12
							},
							axisLine: false,
							tickLine: false
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
							type: "category",
							dataKey: "name",
							width: 72,
							tick: {
								fill: "#1c1915",
								fontSize: 12
							},
							axisLine: false,
							tickLine: false
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {
							content: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tip, {}),
							cursor: { fill: "rgba(28, 25, 21, 0.04)" }
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
							dataKey: "benefit",
							fill: FILL.benefit,
							radius: 2,
							isAnimationActive: false
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
							dataKey: "opportunity",
							fill: FILL.opportunity,
							radius: 2,
							isAnimationActive: false
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
							dataKey: "cost",
							fill: FILL.cost,
							radius: 2,
							isAnimationActive: false
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
							dataKey: "threat",
							fill: FILL.threat,
							radius: 2,
							isAnimationActive: false
						})
					]
				})
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-2 text-sm text-muted",
			children: "Anchor scale 0–4. A missing bar is unscored, not a zero."
		})
	] });
}
//#endregion
export { DomainChart };
