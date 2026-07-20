import { motion } from "framer-motion";

const ZONES = [
  { label: "Safe", color: "#34D399", from: 0, to: 25 },
  { label: "Suspicious", color: "#F59E0B", from: 25, to: 55 },
  { label: "Dangerous", color: "#F43F5E", from: 55, to: 100 },
];

export default function TrustGauge({ score, verdict }) {
  const activeColor = ZONES.find((z) => verdict === z.label)?.color ?? "#22D3EE";

  return (
    <div>
      <div className="flex items-center justify-between">
        <span className="font-body text-sm text-ink-muted">Threat level</span>
        <span className="font-display text-sm font-semibold" style={{ color: activeColor }}>
          {verdict}
        </span>
      </div>

      <div className="relative mt-3 h-2.5 w-full overflow-hidden rounded-full bg-white/5">
        {ZONES.map((zone) => (
          <div
            key={zone.label}
            className="absolute h-full"
            style={{
              left: `${zone.from}%`,
              width: `${zone.to - zone.from}%`,
              backgroundColor: `${zone.color}55`,
            }}
          />
        ))}
        <motion.div
          className="absolute top-0 h-full w-1.5 -translate-x-1/2 rounded-full bg-white shadow-[0_0_10px_2px_rgba(255,255,255,0.6)]"
          initial={{ left: "0%" }}
          animate={{ left: `${score}%` }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        />
      </div>

      <div className="mt-1.5 flex justify-between font-mono text-[10px] text-ink-faint">
        <span>Safe</span>
        <span>Suspicious</span>
        <span>Dangerous</span>
      </div>
    </div>
  );
}
