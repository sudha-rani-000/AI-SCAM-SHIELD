import { motion } from "framer-motion";
import { ShieldCheck } from "lucide-react";
import CircularProgress from "./CircularProgress.jsx";

function scoreColor(score) {
  if (score >= 80) return "#34D399";
  if (score >= 50) return "#F59E0B";
  return "#F43F5E";
}

function scoreLabel(score) {
  if (score >= 80) return "Well protected";
  if (score >= 50) return "Needs attention";
  return "At risk";
}

export default function RiskMeter({ score = 87 }) {
  const color = scoreColor(score);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative flex flex-col items-center rounded-2xl border border-white/10 bg-white/[0.03] p-6 text-center"
    >
      <div className="flex items-center gap-2 self-start font-body text-sm text-ink-muted">
        <ShieldCheck size={16} className="text-cyan-glow" />
        AI Security Score
      </div>

      <div className="mt-4">
        <CircularProgress value={score} max={100} size={150} strokeWidth={11} color={color}>
          <div>
            <div className="font-display text-3xl font-semibold text-ink-primary">{score}</div>
            <div className="font-mono text-[11px] text-ink-faint">/ 100</div>
          </div>
        </CircularProgress>
      </div>

      <p className="mt-4 font-display text-sm font-semibold" style={{ color }}>
        {scoreLabel(score)}
      </p>
      <p className="mt-1 max-w-[220px] font-body text-xs leading-relaxed text-ink-muted">
        Based on scan volume, response to flagged threats, and account settings.
      </p>
    </motion.div>
  );
}
