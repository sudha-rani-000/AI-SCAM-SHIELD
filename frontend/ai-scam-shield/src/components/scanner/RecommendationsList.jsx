import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

/**
 * Renders each recommendation as its own glass card rather than a plain
 * checklist line — gives them the same visual weight as the indicator
 * cards next to them, and gives each one an individual hover glow.
 */
export default function RecommendationsList({ recommendations }) {
  return (
    <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
      {recommendations.map((rec, i) => (
        <motion.div
          key={rec}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 + i * 0.06 }}
          whileHover={{ y: -2 }}
          className="group relative flex items-start gap-2.5 rounded-xl border border-white/10 bg-white/[0.02] p-3.5 transition-colors hover:border-cyan-glow/30"
        >
          <div
            className="pointer-events-none absolute inset-0 rounded-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            style={{ boxShadow: "0 0 20px -4px rgba(34,211,238,0.35)" }}
          />
          <CheckCircle2 size={15} className="relative mt-0.5 shrink-0 text-cyan-glow" />
          <p className="relative font-body text-sm leading-relaxed text-ink-muted">{rec}</p>
        </motion.div>
      ))}
    </div>
  );
}
