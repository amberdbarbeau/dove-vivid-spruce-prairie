import {
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { ANCHORS, DOMAINS, type Construct, type Evaluation } from "@/lib/dignitas/model";

const FILL: Record<Construct, string> = {
  benefit: "#1e6b45",
  opportunity: "#7eaa93",
  cost: "#c9a29b",
  threat: "#8f3d32",
};

interface Row {
  name: string;
  benefit: number | null;
  opportunity: number | null;
  cost: number | null;
  threat: number | null;
}

function Tip({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: { dataKey?: string; value?: number; color?: string }[];
  label?: string;
}) {
  if (!active || !payload?.length) return null;
  return (
    <div className="panel max-w-xs px-3 py-2 text-sm text-ink">
      <p className="font-semibold">{label}</p>
      <ul className="mt-1 space-y-1">
        {payload.map((item) => {
          const key = item.dataKey as Construct;
          const value = item.value;
          if (value === undefined || value === null || Number.isNaN(value)) return null;
          const anchor = value as 0 | 1 | 2 | 3 | 4;
          return (
            <li key={key}>
              <span className="font-semibold capitalize">{key}</span> {value}. {ANCHORS[key][anchor]}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export function DomainChart({ evaluation }: { evaluation: Evaluation }) {
  const data: Row[] = DOMAINS.map((domain) => {
    const score = evaluation.domains[domain.id];
    return {
      name: domain.short,
      benefit: score.benefit,
      opportunity: score.opportunity,
      cost: score.cost,
      threat: score.threat,
    };
  });

  return (
    <div>
      <div className="mb-3 flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted">
        <span className="inline-flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-leaf" /> Benefit
        </span>
        <span className="inline-flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-leaf/45" /> Opportunity
        </span>
        <span className="inline-flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-oxide/45" /> Cost
        </span>
        <span className="inline-flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-oxide" /> Threat
        </span>
      </div>
      <div className="h-80 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} layout="vertical" margin={{ left: 0, right: 8, top: 0, bottom: 0 }} barGap={2} barCategoryGap={10}>
            <XAxis
              type="number"
              domain={[0, 4]}
              ticks={[0, 1, 2, 3, 4]}
              tick={{ fill: "#5c564e", fontSize: 12 }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              type="category"
              dataKey="name"
              width={72}
              tick={{ fill: "#1c1915", fontSize: 12 }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip content={<Tip />} cursor={{ fill: "rgba(28, 25, 21, 0.04)" }} />
            <Bar dataKey="benefit" fill={FILL.benefit} radius={2} isAnimationActive={false} />
            <Bar dataKey="opportunity" fill={FILL.opportunity} radius={2} isAnimationActive={false} />
            <Bar dataKey="cost" fill={FILL.cost} radius={2} isAnimationActive={false} />
            <Bar dataKey="threat" fill={FILL.threat} radius={2} isAnimationActive={false} />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <p className="mt-2 text-sm text-muted">Anchor scale 0–4. A missing bar is unscored, not a zero.</p>
    </div>
  );
}
