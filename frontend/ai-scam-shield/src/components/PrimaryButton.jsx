import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, Check } from "lucide-react";
import { cn } from "../lib/utils.js";

export default function PrimaryButton({ children, status = "idle", type = "submit", onClick }) {
  const [ripples, setRipples] = useState([]);

  function handleClick(e) {
    const rect = e.currentTarget.getBoundingClientRect();
    const id = Date.now();
    setRipples((r) => [
      ...r,
      { id, x: e.clientX - rect.left, y: e.clientY - rect.top },
    ]);
    setTimeout(() => setRipples((r) => r.filter((ripple) => ripple.id !== id)), 600);
    onClick?.(e);
  }

  const disabled = status === "loading" || status === "success";

  return (
    <motion.button
      type={type}
      disabled={disabled}
      onClick={handleClick}
      whileTap={{ scale: 0.98 }}
      className={cn(
        "relative w-full overflow-hidden rounded-xl px-5 py-3 font-display text-sm font-semibold tracking-wide text-void",
        "transition-shadow duration-200 disabled:cursor-not-allowed",
        status === "success"
          ? "bg-success shadow-glow-cyan"
          : "bg-gradient-to-r from-cyan-glow to-blue-neon shadow-glow-blue hover:shadow-glow-cyan"
      )}
    >
      {ripples.map((r) => (
        <motion.span
          key={r.id}
          className="pointer-events-none absolute rounded-full bg-white/40"
          style={{ left: r.x, top: r.y, width: 10, height: 10, translateX: "-50%", translateY: "-50%" }}
          initial={{ scale: 0, opacity: 0.6 }}
          animate={{ scale: 22, opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        />
      ))}

      <span className="relative flex items-center justify-center gap-2">
        <AnimatePresence mode="wait" initial={false}>
          {status === "loading" ? (
            <motion.span
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center gap-2"
            >
              <Loader2 size={16} className="animate-spin" />
              Verifying…
            </motion.span>
          ) : status === "success" ? (
            <motion.span
              key="success"
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center gap-2"
            >
              <Check size={16} />
              Success
            </motion.span>
          ) : (
            <motion.span key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              {children}
            </motion.span>
          )}
        </AnimatePresence>
      </span>
    </motion.button>
  );
}
