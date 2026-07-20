import { motion } from "framer-motion";

export default function ScanBeam() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-2xl" aria-hidden="true">
      <motion.div
        className="absolute inset-x-0 h-24"
        style={{
          background:
            "linear-gradient(180deg, transparent, rgba(34,211,238,0.22) 45%, rgba(34,211,238,0.4) 50%, rgba(34,211,238,0.22) 55%, transparent)",
        }}
        initial={{ top: "-15%" }}
        animate={{ top: "105%" }}
        transition={{ duration: 1.6, repeat: Infinity, ease: "linear" }}
      />
      <div className="absolute inset-0 rounded-2xl border border-cyan-glow/40 shadow-glow-cyan" />
    </div>
  );
}
