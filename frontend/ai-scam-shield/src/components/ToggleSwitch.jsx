import { motion } from "framer-motion";
import { cn } from "../lib/utils.js";

export default function ToggleSwitch({ checked, onChange }) {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className={cn(
        "relative h-6 w-11 shrink-0 rounded-full transition-colors",
        checked ? "bg-gradient-to-r from-cyan-glow to-blue-neon shadow-glow-cyan" : "bg-white/10"
      )}
    >
      <motion.span
        layout
        animate={{ x: checked ? 20 : 2 }}
        transition={{ type: "spring", stiffness: 500, damping: 32 }}
        className="absolute top-1 h-4 w-4 rounded-full bg-white"
      />
    </button>
  );
}
