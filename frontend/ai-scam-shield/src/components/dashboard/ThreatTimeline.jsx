import { motion } from "framer-motion";
import { ShieldAlert, Mail, Link2, QrCode, Mic } from "lucide-react";

const EVENTS = [
  {
    icon: Link2,
    severity: "high",
    title: "Phishing link blocked",
    detail: "secure-bank0nline.com impersonated a login page.",
    time: "10:42 AM",
  },
  {
    icon: Mail,
    severity: "medium",
    title: "Spoofed sender flagged",
    detail: "\"HR Dept\" email didn't match the company's domain.",
    time: "9:58 AM",
  },
  {
    icon: QrCode,
    severity: "low",
    title: "QR code decoded",
    detail: "Redirected to a known, verified merchant site.",
    time: "9:15 AM",
  },
  {
    icon: Mic,
    severity: "high",
    title: "Voice scam pattern detected",
    detail: "Call used urgency and payment-request language.",
    time: "8:30 AM",
  },
  {
    icon: ShieldAlert,
    severity: "medium",
    title: "Suspicious redirect chain",
    detail: "Shortened link resolved through 3 unfamiliar domains.",
    time: "Yesterday",
  },
];

const SEVERITY_COLOR = { high: "#F43F5E", medium: "#F59E0B", low: "#34D399" };

export default function ThreatTimeline() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="rounded-2xl border border-white/10 bg-white/[0.03] p-6"
    >
      <h3 className="font-display text-base font-semibold text-ink-primary">Threat timeline</h3>
      <p className="mb-5 font-body text-xs text-ink-muted">Flagged activity in chronological order</p>

      <div className="relative pl-6">
        <div className="absolute left-[7px] top-1 bottom-1 w-px bg-white/10" />
        <div className="flex flex-col gap-6">
          {EVENTS.map((event, i) => {
            const color = SEVERITY_COLOR[event.severity];
            return (
              <motion.div
                key={event.title}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.15 + i * 0.08, duration: 0.4 }}
                className="relative"
              >
                <span
                  className="absolute -left-6 top-1 flex h-3.5 w-3.5 items-center justify-center rounded-full border-2 border-void"
                  style={{ backgroundColor: color, boxShadow: `0 0 8px ${color}` }}
                />
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-2.5">
                    <event.icon size={15} className="mt-0.5 shrink-0" style={{ color }} />
                    <div>
                      <p className="font-body text-sm text-ink-primary">{event.title}</p>
                      <p className="mt-0.5 font-body text-xs text-ink-muted">{event.detail}</p>
                    </div>
                  </div>
                  <span className="shrink-0 font-mono text-[11px] text-ink-faint">{event.time}</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}
