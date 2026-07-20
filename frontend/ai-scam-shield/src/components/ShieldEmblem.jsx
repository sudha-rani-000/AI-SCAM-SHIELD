import { motion } from "framer-motion";

/**
 * The product's signature visual: a shield drawn from four concentric
 * "trust" strokes plus a network of converging lines. `progress` (0–1)
 * controls how many strokes are lit — on the signup page this is wired
 * to password strength, so the shield literally assembles as the
 * person builds a stronger password. On login it sits at 1 and idles.
 */
export default function ShieldEmblem({ progress = 1, size = 260 }) {
  const clamped = Math.max(0, Math.min(1, progress));
  const strokes = [0.25, 0.5, 0.75, 1];

  return (
    <div className="relative" style={{ width: size, height: size }}>
      {/* Ambient glow behind the shield, brightens with progress */}
      <motion.div
        className="absolute inset-0 rounded-full blur-2xl"
        style={{ background: "radial-gradient(circle, rgba(34,211,238,0.35), transparent 70%)" }}
        animate={{ opacity: 0.3 + clamped * 0.5 }}
        transition={{ duration: 0.6 }}
      />

      <svg viewBox="0 0 200 200" className="relative h-full w-full" fill="none">
        <defs>
          <linearGradient id="shieldStroke" x1="0" y1="0" x2="200" y2="200">
            <stop offset="0%" stopColor="#22D3EE" />
            <stop offset="100%" stopColor="#8B5CF6" />
          </linearGradient>
        </defs>

        {/* Converging network lines, fade in first as "signal" before the shield locks in */}
        {[
          "M20,40 L90,90",
          "M180,40 L110,90",
          "M20,160 L90,120",
          "M180,160 L110,120",
          "M100,10 L100,60",
        ].map((d, i) => (
          <motion.path
            key={d}
            d={d}
            stroke="#3B82F6"
            strokeWidth="1"
            strokeLinecap="round"
            initial={{ opacity: 0 }}
            animate={{ opacity: clamped > 0.05 ? 0.5 : 0 }}
            transition={{ duration: 0.5, delay: i * 0.05 }}
          />
        ))}

        {/* Outer shield outline, revealed with a drawing animation */}
        <motion.path
          d="M100 18 L165 45 V100 C165 140 135 168 100 182 C65 168 35 140 35 100 V45 Z"
          stroke="url(#shieldStroke)"
          strokeWidth="3"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 1.1, ease: "easeInOut" }}
        />

        {/* Four inner trust strokes that light up in sequence as progress rises */}
        {strokes.map((threshold, i) => {
          const lit = clamped >= threshold - 0.001;
          const r = 22 + i * 14;
          return (
            <motion.circle
              key={threshold}
              cx="100"
              cy="100"
              r={r}
              stroke={lit ? "#22D3EE" : "#1E293B"}
              strokeWidth="1.5"
              strokeDasharray="6 5"
              initial={false}
              animate={{
                opacity: lit ? 0.85 : 0.25,
                rotate: lit ? 360 : 0,
              }}
              transition={{
                opacity: { duration: 0.4 },
                rotate: { duration: 40, repeat: lit ? Infinity : 0, ease: "linear" },
              }}
              style={{ transformOrigin: "100px 100px" }}
            />
          );
        })}

        {/* Checkmark, only fully opaque once progress reaches max */}
        <motion.path
          d="M78 100 L96 118 L128 82"
          stroke="#34D399"
          strokeWidth="6"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{
            pathLength: clamped >= 0.999 ? 1 : 0,
            opacity: clamped >= 0.999 ? 1 : 0,
          }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />
      </svg>
    </div>
  );
}
