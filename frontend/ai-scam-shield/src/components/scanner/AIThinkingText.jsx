import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Loader2 } from "lucide-react";

const STEPS = [
  "Reading message content…",
  "Checking for urgency and pressure tactics…",
  "Cross-referencing known scam patterns…",
  "Evaluating payment and credential requests…",
  "Calculating threat score…",
];

export default function AIThinkingText() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setIndex((i) => (i + 1) % STEPS.length), 650);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex items-center gap-2 font-mono text-sm text-cyan-glow">
      <Loader2 size={14} className="animate-spin" />
      <AnimatePresence mode="wait">
        <motion.span
          key={index}
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          transition={{ duration: 0.2 }}
        >
          {STEPS[index]}
        </motion.span>
      </AnimatePresence>
    </div>
  );
}
