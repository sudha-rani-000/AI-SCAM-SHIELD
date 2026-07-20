import { motion } from "framer-motion";
import { cn } from "../lib/utils.js";

export default function GlassCard({ children, className, ...props }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={cn(
        "relative rounded-2xl border border-white/10 bg-white/[0.04] p-8 backdrop-blur-xl",
        "shadow-[0_0_0_1px_rgba(255,255,255,0.02),0_20px_60px_-15px_rgba(0,0,0,0.6)]",
        className
      )}
      {...props}
    >
      {/* Neon border glow, sits behind the content, ambient not distracting */}
      <div
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-60"
        style={{
          background:
            "linear-gradient(140deg, rgba(34,211,238,0.08), transparent 40%, rgba(139,92,246,0.06) 100%)",
        }}
      />
      <div className="relative">{children}</div>
    </motion.div>
  );
}
