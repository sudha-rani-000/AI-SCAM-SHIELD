import { motion } from "framer-motion";

/**
 * An SVG ring whose stroke draws in from 0 to `value`/`max` on mount.
 * Pass a single color, or a gradientId already defined by the parent
 * (e.g. the risk meter uses a red-to-green gradient stop-set).
 */
export default function CircularProgress({
  value,
  max = 100,
  size = 140,
  strokeWidth = 10,
  color = "#22D3EE",
  trackColor = "rgba(255,255,255,0.06)",
  children,
}) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const pct = Math.max(0, Math.min(1, value / max));

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={trackColor}
          strokeWidth={strokeWidth}
        />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: circumference * (1 - pct) }}
          transition={{ duration: 1.1, ease: "easeOut" }}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">{children}</div>
    </div>
  );
}
