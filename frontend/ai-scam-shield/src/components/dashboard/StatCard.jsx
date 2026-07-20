import { motion } from "framer-motion";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";
import AnimatedCounter from "../landing/AnimatedCounter.jsx";

export default function StatCard({
  icon: Icon,
  label,
  target,
  suffix = "",
  decimals = 0,
  trend,
  accent = "#22D3EE",
  delay = 0,
}) {
  const positive = trend >= 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -4 }}
      className="group relative rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition-colors hover:border-white/20"
    >
      <div
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ boxShadow: `0 0 28px -6px ${accent}55` }}
      />
      <div className="flex items-start justify-between">
        <div
          className="flex h-9 w-9 items-center justify-center rounded-lg"
          style={{ backgroundColor: `${accent}1A`, color: accent }}
        >
          <Icon size={16} />
        </div>
        {typeof trend === "number" && (
          <span
            className={`flex items-center gap-0.5 rounded-full px-2 py-0.5 font-mono text-[11px] ${
              positive ? "bg-success/10 text-success" : "bg-danger/10 text-danger"
            }`}
          >
            {positive ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
            {Math.abs(trend)}%
          </span>
        )}
      </div>

      <div className="mt-4">
        <AnimatedCounter
          target={target}
          suffix={suffix}
          decimals={decimals}
          align="left"
          size="sm"
          duration={1.4}
        />
        <p className="mt-1 font-body text-sm text-ink-muted">{label}</p>
      </div>
    </motion.div>
  );
}
