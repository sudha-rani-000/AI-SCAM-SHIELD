import { motion } from "framer-motion";
import { Lock, LockOpen } from "lucide-react";

export default function HTTPSBadge({ https }) {
  const color = https ? "#34D399" : "#F43F5E";

  return (
    <motion.div
      initial={{ scale: 0.7, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: "spring", stiffness: 260, damping: 18 }}
      className="flex items-center gap-2 rounded-full border px-3 py-1.5"
      style={{ borderColor: `${color}40`, backgroundColor: `${color}14` }}
    >
      {https ? <Lock size={13} style={{ color }} /> : <LockOpen size={13} style={{ color }} />}
      <span className="font-mono text-[11px] font-medium" style={{ color }}>
        {https ? "HTTPS secured" : "Not encrypted (HTTP)"}
      </span>
    </motion.div>
  );
}
