import { motion } from "framer-motion";
import { ShieldCheck, ShieldAlert, ShieldQuestion } from "lucide-react";

const VERDICT_META = {
  Safe: { icon: ShieldCheck, color: "#34D399" },
  Suspicious: { icon: ShieldQuestion, color: "#F59E0B" },
  Scam: { icon: ShieldAlert, color: "#F43F5E" },
};

/**
 * A brief celebratory/alert burst that plays once the scan finishes,
 * right where the radar was sitting — an expanding ring plus an icon
 * pop, colored by verdict, before the full result card takes over.
 */
export default function ScanCompleteBurst({ verdict, size = 148 }) {
  const meta = VERDICT_META[verdict] ?? VERDICT_META.Safe;

  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      {[0, 0.15, 0.3].map((delay) => (
        <motion.div
          key={delay}
          className="absolute inset-0 rounded-full border-2"
          style={{ borderColor: meta.color }}
          initial={{ scale: 0.3, opacity: 0.8 }}
          animate={{ scale: 1.4, opacity: 0 }}
          transition={{ duration: 0.9, delay, ease: "easeOut" }}
        />
      ))}

      <motion.div
        initial={{ scale: 0, rotate: -30, opacity: 0 }}
        animate={{ scale: 1, rotate: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 16 }}
        className="relative z-10 flex h-16 w-16 items-center justify-center rounded-full"
        style={{ backgroundColor: `${meta.color}1A`, boxShadow: `0 0 30px ${meta.color}55` }}
      >
        <meta.icon size={30} style={{ color: meta.color }} />
      </motion.div>
    </div>
  );
}
