import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import Skeleton from "./Skeleton.jsx";

const DATA = [
  { name: "Phishing links", value: 38, color: "#22D3EE" },
  { name: "Spoofed emails", value: 27, color: "#3B82F6" },
  { name: "Fake websites", value: 18, color: "#8B5CF6" },
  { name: "QR redirects", value: 10, color: "#F59E0B" },
  { name: "Voice scams", value: 7, color: "#F43F5E" },
];

function DonutTooltip({ active, payload }) {
  if (!active || !payload?.length) return null;
  const { name, value } = payload[0];
  return (
    <div className="rounded-lg border border-white/10 bg-void-panel/95 px-3 py-2 font-body text-xs shadow-lg backdrop-blur-xl">
      <p className="text-ink-primary">{name}</p>
      <p className="text-ink-muted">{value}% of threats</p>
    </div>
  );
}

export default function ThreatDistributionChart() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 850);
    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.05 }}
      className="rounded-2xl border border-white/10 bg-white/[0.03] p-6"
    >
      <h3 className="font-display text-base font-semibold text-ink-primary">Threat distribution</h3>
      <p className="font-body text-xs text-ink-muted">By category, last 30 days</p>

      {loading ? (
        <Skeleton className="mx-auto mt-6 h-[200px] w-[200px] rounded-full" />
      ) : (
        <div className="mt-2 flex flex-col items-center gap-4">
          <div className="h-[200px] w-[200px] shrink-0">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={DATA}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={58}
                  outerRadius={80}
                  paddingAngle={3}
                  animationDuration={900}
                >
                  {DATA.map((entry) => (
                    <Cell key={entry.name} fill={entry.color} stroke="none" />
                  ))}
                </Pie>
                <Tooltip content={<DonutTooltip />} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="flex w-full flex-col gap-2">
            {DATA.map((entry) => (
              <div key={entry.name} className="flex items-center justify-between gap-3">
                <span className="flex items-center gap-2 font-body text-xs text-ink-muted">
                  <span className="h-2 w-2 rounded-full" style={{ backgroundColor: entry.color }} />
                  {entry.name}
                </span>
                <span className="font-mono text-xs text-ink-primary">{entry.value}%</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
}
