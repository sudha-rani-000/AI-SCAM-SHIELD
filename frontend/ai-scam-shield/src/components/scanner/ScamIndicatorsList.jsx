import { motion } from "framer-motion";
import { AlertTriangle, ShieldCheck } from "lucide-react";

export default function ScamIndicatorsList({ indicators }) {
  if (indicators.length === 0) {
    return (
      <div className="flex items-start gap-2.5 rounded-xl border border-white/10 bg-white/[0.02] p-4">
        <ShieldCheck size={16} className="mt-0.5 shrink-0 text-success" />
        <p className="font-body text-sm text-ink-muted">
          No known scam indicators were found in this message.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      {indicators.map((indicator, i) => (
        <motion.div
          key={indicator.id}
          initial={{ opacity: 0, x: -8 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.06 }}
          className="flex items-start gap-2.5 rounded-xl border border-danger/20 bg-danger/[0.06] p-3.5"
        >
          <AlertTriangle size={15} className="mt-0.5 shrink-0 text-danger" />
          <div>
            <p className="font-body text-sm text-ink-primary">{indicator.label}</p>
            <p className="mt-0.5 font-body text-xs text-ink-muted">{indicator.tip}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
