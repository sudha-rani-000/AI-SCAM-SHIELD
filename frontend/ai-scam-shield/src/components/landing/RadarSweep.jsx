import { motion } from "framer-motion";

export default function RadarSweep({ size = 340 }) {
  return (
    <div
      className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
      style={{ width: size, height: size }}
      aria-hidden="true"
    >
      <div className="absolute inset-0 rounded-full border border-cyan-glow/10" />
      <div className="absolute inset-[15%] rounded-full border border-cyan-glow/10" />
      <div className="absolute inset-[30%] rounded-full border border-cyan-glow/10" />
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{
          background:
            "conic-gradient(from 0deg, rgba(34,211,238,0.35), transparent 25%, transparent 100%)",
        }}
        animate={{ rotate: 360 }}
        transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
      />
    </div>
  );
}
