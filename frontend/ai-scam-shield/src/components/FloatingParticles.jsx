import { useMemo } from "react";
import { motion } from "framer-motion";

const COLORS = ["#22D3EE", "#3B82F6", "#8B5CF6"];

/**
 * A small field of soft, drifting dots. Count stays low (18) since
 * each one is an independent animated element — enough for atmosphere,
 * not enough to cost a frame budget.
 */
export default function FloatingParticles({ count = 18 }) {
  const particles = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        top: Math.random() * 100,
        left: Math.random() * 100,
        size: 2 + Math.random() * 3,
        color: COLORS[i % COLORS.length],
        duration: 6 + Math.random() * 6,
        delay: Math.random() * 4,
      })),
    [count]
  );

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {particles.map((p) => (
        <motion.span
          key={p.id}
          className="absolute rounded-full"
          style={{
            top: `${p.top}%`,
            left: `${p.left}%`,
            width: p.size,
            height: p.size,
            backgroundColor: p.color,
            boxShadow: `0 0 6px ${p.color}`,
          }}
          animate={{
            y: [0, -18, 0],
            opacity: [0.2, 0.8, 0.2],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}
