import { motion } from "framer-motion";
import { Link2, ScanLine, Sparkles, AlertCircle } from "lucide-react";
import ScanProgressBar from "./ScanProgressBar.jsx";
import VerificationSteps from "./VerificationSteps.jsx";

const EXAMPLES = [
  { label: "Known safe site", value: "https://www.wikipedia.org" },
  { label: "Phishing pattern", value: "http://secure-paypal-login-verify.com/account/confirm" },
  { label: "Shortened link", value: "https://bit.ly/3xample" },
];

export default function URLInputCard({ value, onChange, onScan, scanning, progress, error }) {
  function handleSubmit(e) {
    e.preventDefault();
    onScan();
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative rounded-2xl border border-white/10 bg-white/[0.03] p-6"
    >
      <div className="flex items-center gap-2">
        <Link2 size={18} className="text-cyan-glow" />
        <h2 className="font-display text-base font-semibold text-ink-primary">Scan a URL</h2>
      </div>
      <p className="mt-1 font-body text-xs text-ink-muted">
        Paste any link to check its structure for phishing and impersonation patterns.
      </p>

      <form onSubmit={handleSubmit} className="mt-4">
        <motion.div
          animate={error ? { x: [0, -8, 8, -6, 6, 0] } : { x: 0 }}
          transition={{ duration: 0.4 }}
          className={`flex items-center gap-3 rounded-xl border bg-void-panel/60 px-4 py-3.5 transition-colors ${
            error ? "border-danger/70" : "border-white/10 focus-within:border-cyan-glow/70 focus-within:shadow-glow-cyan"
          }`}
        >
          <ScanLine size={16} className="shrink-0 text-ink-faint" />
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            disabled={scanning}
            placeholder="https://example.com/path"
            className="flex-1 bg-transparent font-mono text-sm text-ink-primary placeholder:text-ink-faint focus:outline-none disabled:opacity-60"
          />
          <button
            type="submit"
            disabled={scanning || value.trim().length === 0}
            className="flex shrink-0 items-center gap-2 rounded-lg bg-gradient-to-r from-cyan-glow to-blue-neon px-4 py-2 font-display text-sm font-semibold text-void shadow-glow-blue transition-shadow hover:shadow-glow-cyan disabled:cursor-not-allowed disabled:opacity-40 disabled:shadow-none"
          >
            <ScanLine size={15} />
            {scanning ? "Scanning…" : "Scan"}
          </button>
        </motion.div>

        {error && (
          <motion.p
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-2 flex items-center gap-1.5 font-body text-xs text-danger"
          >
            <AlertCircle size={13} />
            {error}
          </motion.p>
        )}
      </form>

      <div className="mt-4 flex flex-wrap items-center gap-2">
        <span className="flex items-center gap-1 font-mono text-[11px] text-ink-faint">
          <Sparkles size={12} /> Try an example:
        </span>
        {EXAMPLES.map((example) => (
          <button
            key={example.label}
            type="button"
            disabled={scanning}
            onClick={() => onChange(example.value)}
            className="rounded-full border border-white/10 px-3 py-1 font-mono text-[11px] text-ink-muted transition-colors hover:border-cyan-glow/50 hover:text-cyan-glow disabled:opacity-50"
          >
            {example.label}
          </button>
        ))}
      </div>

      {scanning && (
        <div className="mt-5 flex flex-col gap-2.5">
          <ScanProgressBar progress={progress} />
          <VerificationSteps />
        </div>
      )}
    </motion.div>
  );
}
