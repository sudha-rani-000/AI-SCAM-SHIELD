import { motion } from "framer-motion";
import { STRENGTH_LABELS, STRENGTH_COLORS } from "../lib/utils.js";

export default function PasswordStrengthMeter({ score }) {
  if (score === null) return null;

  return (
    <div className="mt-2 w-full">
      <div className="flex gap-1.5">
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="h-1.5 flex-1 overflow-hidden rounded-full bg-white/5">
            <motion.div
              className="h-full rounded-full"
              style={{ backgroundColor: STRENGTH_COLORS[score] }}
              initial={{ width: "0%" }}
              animate={{ width: i < score ? "100%" : "0%" }}
              transition={{ duration: 0.35, ease: "easeOut" }}
            />
          </div>
        ))}
      </div>
      <motion.p
        key={score}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="mt-1.5 font-mono text-xs"
        style={{ color: STRENGTH_COLORS[score] }}
      >
        {STRENGTH_LABELS[score]}
      </motion.p>
    </div>
  );
}
