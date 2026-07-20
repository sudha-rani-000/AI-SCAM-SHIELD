import { motion } from "framer-motion";
import { Globe2, CheckCircle2, XCircle } from "lucide-react";

function Row({ label, value, i }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -6 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.05 * i }}
      className="flex items-center justify-between border-b border-white/5 py-2.5 last:border-0"
    >
      <span className="font-body text-xs text-ink-muted">{label}</span>
      <span className="font-mono text-xs text-ink-primary">{value}</span>
    </motion.div>
  );
}

function BoolTag({ value, trueLabel, falseLabel }) {
  return value ? (
    <span className="flex items-center gap-1 text-danger">
      <XCircle size={12} /> {trueLabel}
    </span>
  ) : (
    <span className="flex items-center gap-1 text-success">
      <CheckCircle2 size={12} /> {falseLabel}
    </span>
  );
}

export default function DomainInfoCard({ result }) {
  const rows = [
    { label: "Protocol", value: result.protocol.toUpperCase() },
    { label: "Full domain", value: result.hostname },
    { label: "Root domain", value: result.rootDomain },
    { label: "Subdomain depth", value: result.subdomainCount },
    { label: "Path", value: result.path || "/" },
    { label: "Query parameters", value: result.hasQuery ? "Present" : "None" },
    {
      label: "Raw IP address",
      value: <BoolTag value={result.isIP} trueLabel="Yes" falseLabel="No" />,
    },
    {
      label: "Punycode domain",
      value: <BoolTag value={result.isPunycode} trueLabel="Yes" falseLabel="No" />,
    },
    {
      label: "URL shortener",
      value: <BoolTag value={result.isShortener} trueLabel="Yes" falseLabel="No" />,
    },
  ];

  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4">
      <div className="mb-2 flex items-center gap-2">
        <Globe2 size={14} className="text-cyan-glow" />
        <h4 className="font-display text-sm font-semibold text-ink-primary">Domain information</h4>
      </div>
      <div>
        {rows.map((row, i) => (
          <Row key={row.label} label={row.label} value={row.value} i={i} />
        ))}
      </div>
    </div>
  );
}
