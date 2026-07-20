import { motion } from "framer-motion";
import { ShieldCheck, ShieldAlert, ShieldQuestion, Brain } from "lucide-react";
import CircularProgress from "../dashboard/CircularProgress.jsx";
import ThreatLevelMeter from "./ThreatLevelMeter.jsx";
import ScamIndicatorsList from "./ScamIndicatorsList.jsx";
import RecommendationsList from "./RecommendationsList.jsx";

const VERDICT_META = {
  Safe: { icon: ShieldCheck, color: "#34D399" },
  Suspicious: { icon: ShieldQuestion, color: "#F59E0B" },
  Scam: { icon: ShieldAlert, color: "#F43F5E" },
};

export default function ScanResultCard({ result }) {
  const { verdict, score, confidence, explanation, indicators, recommendations } = result;
  const meta = VERDICT_META[verdict];

  return (
    <motion.div
      initial={{ opacity: 0, y: 28, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-6"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{ background: `radial-gradient(circle at 15% 0%, ${meta.color}14, transparent 55%)` }}
      />

      <div className="relative flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <motion.div
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 260, damping: 18, delay: 0.1 }}
            className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl"
            style={{ backgroundColor: `${meta.color}1A`, color: meta.color }}
          >
            <meta.icon size={26} />
          </motion.div>
          <div>
            <p className="font-mono text-[11px] uppercase tracking-widest text-ink-faint">
              Scan result
            </p>
            <motion.h3
              initial={{ opacity: 0, x: -6 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.15 }}
              className="font-display text-2xl font-semibold"
              style={{ color: meta.color }}
            >
              {verdict}
            </motion.h3>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="flex items-center gap-3"
        >
          <CircularProgress value={confidence} max={100} size={78} strokeWidth={7} color="#22D3EE">
            <div className="text-center">
              <div className="font-display text-lg font-semibold text-ink-primary">{confidence}%</div>
            </div>
          </CircularProgress>
          <div>
            <p className="font-body text-sm text-ink-primary">Confidence</p>
            <p className="font-body text-xs text-ink-muted">in this verdict</p>
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25 }}
        className="relative mt-6"
      >
        <ThreatLevelMeter score={score} verdict={verdict} />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="relative mt-6 flex items-start gap-2.5 rounded-xl border border-white/10 bg-white/[0.02] p-4"
      >
        <Brain size={16} className="mt-0.5 shrink-0 text-violet-glow" />
        <p className="font-body text-sm leading-relaxed text-ink-muted">{explanation}</p>
      </motion.div>

      <div className="relative mt-6">
        <h4 className="mb-3 font-display text-sm font-semibold text-ink-primary">
          Scam indicators found
        </h4>
        <ScamIndicatorsList indicators={indicators} />
      </div>

      <div className="relative mt-6">
        <h4 className="mb-3 font-display text-sm font-semibold text-ink-primary">
          Safety recommendations
        </h4>
        <RecommendationsList recommendations={recommendations} />
      </div>
    </motion.div>
  );
}
