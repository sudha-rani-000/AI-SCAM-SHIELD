import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

/**
 * Ticks upward at a randomized interval to suggest live scanning
 * activity. Starting value is illustrative product data, not a
 * live feed — swap `start` for a real metrics endpoint when available.
 */
export default function LiveStatCounter({ start = 128940, label = "Threats blocked today" }) {
  const [value, setValue] = useState(start);

  useEffect(() => {
    const tick = () => {
      setValue((v) => v + Math.floor(Math.random() * 3) + 1);
    };
    const interval = setInterval(tick, 2200);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="font-mono">
      <AnimatePresence mode="popLayout">
        <motion.span
          key={value}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.25 }}
          className="block text-2xl font-semibold text-cyan-glow"
        >
          {value.toLocaleString()}
        </motion.span>
      </AnimatePresence>
      <span className="text-xs text-ink-muted">{label}</span>
    </div>
  );
}
