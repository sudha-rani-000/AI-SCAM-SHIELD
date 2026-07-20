import { motion } from "framer-motion";

/**
 * A perspective-tilted grid that recedes toward a horizon glow.
 * Pure CSS gradients + one animated sheen — no per-frame JS work.
 */
export default function CyberGridBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-void" />

      {/* Horizon glow */}
      <div
        className="absolute left-1/2 top-[62%] h-[420px] w-[900px] -translate-x-1/2 rounded-full opacity-40 blur-3xl"
        style={{
          background:
            "radial-gradient(closest-side, rgba(59,130,246,0.35), rgba(139,92,246,0.12), transparent)",
        }}
      />

      {/* Grid, tilted toward the horizon */}
      <div
        className="absolute inset-0 bg-grid-lines"
        style={{
          backgroundSize: "42px 42px",
          maskImage:
            "linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.9) 35%, black 65%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.9) 35%, black 65%, transparent 100%)",
        }}
      />

      {/* Slow diagonal sheen sweeping across the grid */}
      <motion.div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(115deg, transparent 40%, rgba(34,211,238,0.06) 50%, transparent 60%)",
          backgroundSize: "200% 200%",
        }}
        animate={{ backgroundPosition: ["0% 0%", "100% 100%"] }}
        transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
      />
    </div>
  );
}
