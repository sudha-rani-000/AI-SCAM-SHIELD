import { motion } from "framer-motion";
import CircularProgress from "../dashboard/CircularProgress.jsx";

/**
 * The central scanning visualization: concentric radar rings with a
 * rotating sweep, and a progress ring reporting the actual scan
 * percentage layered on top. This is the page's signature moment —
 * everything else (beam, thinking text) supports it.
 */
export default function ScanRadar({ progress, size = 148 }) {
  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      {/* Radar rings */}
      <div className="absolute inset-0 rounded-full border border-cyan-glow/15" />
      <div className="absolute inset-[16%] rounded-full border border-cyan-glow/15" />
      <div className="absolute inset-[32%] rounded-full border border-cyan-glow/15" />

      {/* Rotating sweep */}
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{
          background: "conic-gradient(from 0deg, rgba(34,211,238,0.4), transparent 30%, transparent 100%)",
        }}
        animate={{ rotate: 360 }}
        transition={{ duration: 2.4, repeat: Infinity, ease: "linear" }}
      />

      {/* Progress ring + live percentage, sitting above the sweep */}
      <div className="relative z-10">
        <CircularProgress value={progress} max={100} size={size * 0.62} strokeWidth={5} color="#22D3EE">
          <span className="font-display text-lg font-semibold text-ink-primary">
            {Math.round(progress)}%
          </span>
        </CircularProgress>
      </div>
    </div>
  );
}
