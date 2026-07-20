import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import Skeleton from "./Skeleton.jsx";

const DATA = [
  { day: "Mon", scans: 320, threats: 18 },
  { day: "Tue", scans: 410, threats: 24 },
  { day: "Wed", scans: 380, threats: 15 },
  { day: "Thu", scans: 520, threats: 31 },
  { day: "Fri", scans: 610, threats: 28 },
  { day: "Sat", scans: 340, threats: 12 },
  { day: "Sun", scans: 290, threats: 9 },
];

function ChartTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-lg border border-white/10 bg-void-panel/95 px-3 py-2 font-body text-xs shadow-lg backdrop-blur-xl">
      <p className="text-ink-primary">{label}</p>
      {payload.map((entry) => (
        <p key={entry.dataKey} style={{ color: entry.color }}>
          {entry.name}: {entry.value}
        </p>
      ))}
    </div>
  );
}

export default function WeeklyScanChart() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 700);
    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="rounded-2xl border border-white/10 bg-white/[0.03] p-6"
    >
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h3 className="font-display text-base font-semibold text-ink-primary">Weekly scan volume</h3>
          <p className="font-body text-xs text-ink-muted">Scans run vs. threats caught, last 7 days</p>
        </div>
        <div className="flex items-center gap-4 font-mono text-[11px] text-ink-muted">
          <span className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-cyan-glow" /> Scans
          </span>
          <span className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-violet-glow" /> Threats
          </span>
        </div>
      </div>

      {loading ? (
        <Skeleton className="h-[260px] w-full" />
      ) : (
        <div className="h-[260px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={DATA} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="scansGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#22D3EE" stopOpacity={0.35} />
                  <stop offset="100%" stopColor="#22D3EE" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="threatsGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#8B5CF6" stopOpacity={0.35} />
                  <stop offset="100%" stopColor="#8B5CF6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid stroke="rgba(255,255,255,0.05)" vertical={false} />
              <XAxis
                dataKey="day"
                stroke="rgba(255,255,255,0.3)"
                tick={{ fill: "#7C8BA8", fontSize: 12 }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                stroke="rgba(255,255,255,0.3)"
                tick={{ fill: "#7C8BA8", fontSize: 12 }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip content={<ChartTooltip />} />
              <Area
                type="monotone"
                dataKey="scans"
                name="Scans"
                stroke="#22D3EE"
                strokeWidth={2}
                fill="url(#scansGradient)"
                animationDuration={1100}
              />
              <Area
                type="monotone"
                dataKey="threats"
                name="Threats"
                stroke="#8B5CF6"
                strokeWidth={2}
                fill="url(#threatsGradient)"
                animationDuration={1100}
                animationBegin={150}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      )}
    </motion.div>
  );
}
