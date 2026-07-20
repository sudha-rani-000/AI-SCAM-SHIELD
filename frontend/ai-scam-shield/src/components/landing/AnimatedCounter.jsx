import { useEffect, useRef, useState } from "react";
import { motion, useInView, animate } from "framer-motion";
import { cn } from "../../lib/utils.js";

export default function AnimatedCounter({
  target,
  suffix = "",
  prefix = "",
  label,
  duration = 1.6,
  decimals = 0,
  align = "center",
  size = "lg",
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const controls = animate(0, target, {
      duration,
      ease: "easeOut",
      onUpdate: (v) => setDisplay(v),
    });
    return () => controls.stop();
  }, [isInView, target, duration]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 12 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5 }}
      className={align === "center" ? "text-center" : "text-left"}
    >
      <div
        className={cn(
          "font-display font-semibold text-ink-primary",
          size === "lg" ? "text-3xl sm:text-4xl" : "text-2xl"
        )}
      >
        {prefix}
        {decimals > 0 ? display.toFixed(decimals) : Math.round(display).toLocaleString()}
        {suffix}
      </div>
      {label && <div className="mt-1 font-body text-sm text-ink-muted">{label}</div>}
    </motion.div>
  );
}
