import { motion } from "framer-motion";
import { History, ShieldCheck, ShieldAlert, ShieldQuestion } from "lucide-react";

const VERDICT_META = {
  Safe: { icon: ShieldCheck, color: "#34D399" },
  Suspicious: { icon: ShieldQuestion, color: "#F59E0B" },
  Scam: { icon: ShieldAlert, color: "#F43F5E" },
};

const HISTORY = [
  { id: 1, preview: "\"Your Apple ID has been locked. Verify now to restore access…\"", verdict: "Scam", time: "12m ago" },
  { id: 2, preview: "\"Hey, are we still meeting for coffee at 10?\"", verdict: "Safe", time: "1h ago" },
  { id: 3, preview: "\"Your package couldn't be delivered. Confirm your address…\"", verdict: "Suspicious", time: "3h ago" },
  { id: 4, preview: "\"Reminder: your subscription renews on the 24th.\"", verdict: "Safe", time: "Yesterday" },
];

export default function ScanHistoryPreview() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="rounded-2xl border border-white/10 bg-white/[0.03] p-6"
    >
      <div className="mb-4 flex items-center gap-2">
        <History size={16} className="text-cyan-glow" />
        <h3 className="font-display text-base font-semibold text-ink-primary">Recent scans</h3>
      </div>

      <div className="flex flex-col gap-2">
        {HISTORY.map((item) => {
          const meta = VERDICT_META[item.verdict];
          return (
            <div
              key={item.id}
              className="group flex items-start gap-3 rounded-xl p-2.5 transition-colors hover:bg-white/[0.04]"
            >
              <div
                className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg"
                style={{ backgroundColor: `${meta.color}1A`, color: meta.color }}
              >
                <meta.icon size={13} />
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate font-body text-xs text-ink-muted">{item.preview}</p>
                <div className="mt-1 flex items-center justify-between">
                  <span className="font-mono text-[11px]" style={{ color: meta.color }}>
                    {item.verdict}
                  </span>
                  <span className="font-mono text-[11px] text-ink-faint">{item.time}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <button className="mt-4 w-full rounded-lg border border-white/10 py-2 font-body text-xs text-ink-muted transition-colors hover:border-white/20 hover:text-ink-primary">
        View full scan history
      </button>
    </motion.div>
  );
}
