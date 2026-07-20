import { AnimatePresence, motion } from "framer-motion";
import { ScanLine, Sparkles } from "lucide-react";
import ScanBeam from "./ScanBeam.jsx";
import ScanRadar from "./ScanRadar.jsx";
import ScanCompleteBurst from "./ScanCompleteBurst.jsx";
import AIThinkingText from "./AIThinkingText.jsx";

const EXAMPLES = [
  {
    label: "Gift card scam",
    text: "URGENT: Your Netflix account will be suspended within 24 hours due to a billing issue. To keep your account active, please purchase a $100 iTunes gift card and reply with the card number and PIN immediately.",
  },
  {
    label: "Fake prize",
    text: "Congratulations! You have won a $1,000 Walmart gift card. Click here to claim your prize now before it expires: bit.ly/claim-prize-now. Limited time offer, act now!",
  },
  {
    label: "Ordinary message",
    text: "Hey, just checking if we're still on for lunch tomorrow at 1pm? Let me know if you need to reschedule.",
  },
];

// status: "idle" | "scanning" | "complete"
export default function ScanInputCard({ value, onChange, onScan, status, progress, pendingVerdict }) {
  const scanning = status === "scanning";
  const disabled = status !== "idle" || value.trim().length === 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative rounded-2xl border border-white/10 bg-white/[0.03] p-6"
    >
      {scanning && <ScanBeam />}

      <div className="relative flex items-center gap-2">
        <ScanLine size={18} className="text-cyan-glow" />
        <h2 className="font-display text-base font-semibold text-ink-primary">
          Paste a message to analyze
        </h2>
      </div>
      <p className="relative mt-1 font-body text-xs text-ink-muted">
        Drop in a suspicious email, text message, or chat — we'll check it against known scam
        patterns in seconds.
      </p>

      <div className="relative mt-4">
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          disabled={status !== "idle"}
          rows={8}
          placeholder="Paste the full message here, including any links or sender details you have…"
          className="w-full resize-none rounded-xl border border-white/10 bg-void-panel/60 p-4 font-body text-sm leading-relaxed text-ink-primary placeholder:text-ink-faint transition-colors focus:border-cyan-glow/70 focus:shadow-glow-cyan focus:outline-none disabled:opacity-60"
        />
        <span className="absolute bottom-3 right-4 font-mono text-[11px] text-ink-faint">
          {value.length.toLocaleString()} characters
        </span>
      </div>

      <div className="relative mt-4 flex flex-wrap items-center gap-2">
        <span className="flex items-center gap-1 font-mono text-[11px] text-ink-faint">
          <Sparkles size={12} /> Try an example:
        </span>
        {EXAMPLES.map((example) => (
          <button
            key={example.label}
            type="button"
            disabled={status !== "idle"}
            onClick={() => onChange(example.text)}
            className="rounded-full border border-white/10 px-3 py-1 font-mono text-[11px] text-ink-muted transition-colors hover:border-cyan-glow/50 hover:text-cyan-glow disabled:opacity-50"
          >
            {example.label}
          </button>
        ))}
      </div>

      <div className="relative mt-6 flex items-center justify-between gap-4">
        <span className="font-body text-xs text-ink-muted">
          {status === "idle"
            ? "Nothing you paste here is stored beyond this session."
            : "\u00A0"}
        </span>

        <motion.button
          type="button"
          onClick={onScan}
          disabled={disabled}
          whileTap={{ scale: 0.97 }}
          className="flex shrink-0 items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-glow to-blue-neon px-5 py-2.5 font-display text-sm font-semibold text-void shadow-glow-blue transition-shadow hover:shadow-glow-cyan disabled:cursor-not-allowed disabled:opacity-40 disabled:shadow-none"
        >
          <ScanLine size={16} />
          {status === "idle" ? "AI Scan" : status === "scanning" ? "Scanning…" : "Done"}
        </motion.button>
      </div>

      <AnimatePresence>
        {status !== "idle" && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="relative overflow-hidden"
          >
            <div className="mt-6 flex flex-col items-center gap-4 border-t border-white/5 pt-6">
              {status === "scanning" ? (
                <>
                  <ScanRadar progress={progress} />
                  <AIThinkingText />
                </>
              ) : (
                <ScanCompleteBurst verdict={pendingVerdict} />
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
