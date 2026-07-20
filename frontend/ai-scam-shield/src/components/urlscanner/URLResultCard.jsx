import { motion } from "framer-motion";
import { ShieldCheck, ShieldAlert, ShieldQuestion, Brain } from "lucide-react";
import CircularProgress from "../dashboard/CircularProgress.jsx";
import HTTPSBadge from "./HTTPSBadge.jsx";
import TrustGauge from "./TrustGauge.jsx";
import DomainInfoCard from "./DomainInfoCard.jsx";
import ScamIndicatorsList from "../scanner/ScamIndicatorsList.jsx";
import RecommendationsList from "../scanner/RecommendationsList.jsx";

const VERDICT_META = {
  Safe: { icon: ShieldCheck, color: "#34D399" },
  Suspicious: { icon: ShieldQuestion, color: "#F59E0B" },
  Dangerous: { icon: ShieldAlert, color: "#F43F5E" },
};

export default function URLResultCard({ result }) {
  const { verdict, score, trustScore, url, https, explanation, indicators, recommendations } = result;
  const meta = VERDICT_META[verdict];

  return (
    <motion.div
      initial={{ opacity: 0, y: 24, scale: 0.98 }}
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
            <p className="truncate font-mono text-[11px] text-ink-faint" style={{ maxWidth: 260 }}>
              {url}
            </p>
            <h3 className="font-display text-2xl font-semibold" style={{ color: meta.color }}>
              {verdict}
            </h3>
            <div className="mt-1.5">
              <HTTPSBadge https={https} />
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <CircularProgress value={trustScore} max={100} size={78} strokeWidth={7} color="#22D3EE">
            <div className="text-center">
              <div className="font-display text-lg font-semibold text-ink-primary">{trustScore}</div>
            </div>
          </CircularProgress>
          <div>
            <p className="font-body text-sm text-ink-primary">Trust score</p>
            <p className="font-body text-xs text-ink-muted">out of 100</p>
          </div>
        </div>
      </div>

      <div className="relative mt-6">
        <TrustGauge score={score} verdict={verdict} />
      </div>

      <div className="relative mt-6 flex items-start gap-2.5 rounded-xl border border-white/10 bg-white/[0.02] p-4">
        <Brain size={16} className="mt-0.5 shrink-0 text-violet-glow" />
        <p className="font-body text-sm leading-relaxed text-ink-muted">{explanation}</p>
      </div>

      <div className="relative mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
        <DomainInfoCard result={result} />
        <div>
          <h4 className="mb-3 font-display text-sm font-semibold text-ink-primary">Risk indicators</h4>
          <ScamIndicatorsList indicators={indicators} />
        </div>
      </div>

      <div className="relative mt-6">
        <h4 className="mb-3 font-display text-sm font-semibold text-ink-primary">
          Security recommendations
        </h4>
        <RecommendationsList recommendations={recommendations} />
      </div>
    </motion.div>
  );
}
