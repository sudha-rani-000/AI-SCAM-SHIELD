import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link2, Mail, QrCode, Mic, Globe2, CheckCircle2, ShieldAlert } from "lucide-react";

const SOURCES = [
  { icon: Link2, label: "URL scan" },
  { icon: Mail, label: "Email scan" },
  { icon: QrCode, label: "QR scan" },
  { icon: Mic, label: "Voice scan" },
  { icon: Globe2, label: "Website scan" },
];

const TARGETS = [
  "login-verify-secure.net",
  "invoice_payment_2024.pdf",
  "promo-giftcard-claim.com",
  "+1 (302) 555-0199",
  "shopfast-deals.store",
  "account-update-required.com",
];

function randomEvent(id) {
  const source = SOURCES[Math.floor(Math.random() * SOURCES.length)];
  const safe = Math.random() > 0.4;
  return {
    id,
    ...source,
    target: TARGETS[Math.floor(Math.random() * TARGETS.length)],
    safe,
    time: "just now",
  };
}

const INITIAL = [
  { id: 1, icon: Link2, label: "URL scan", target: "amaz0n-rewards-claim.com", safe: false, time: "2m ago" },
  { id: 2, icon: Mail, label: "Email scan", target: "billing@paypa1-support.com", safe: false, time: "14m ago" },
  { id: 3, icon: Globe2, label: "Website scan", target: "official-store.com", safe: true, time: "32m ago" },
  { id: 4, icon: QrCode, label: "QR scan", target: "menu.restaurant-app.com", safe: true, time: "1h ago" },
];

export default function ActivityFeed() {
  const [events, setEvents] = useState(INITIAL);
  const [nextId, setNextId] = useState(5);

  useEffect(() => {
    const timer = setInterval(() => {
      setEvents((prev) => [randomEvent(nextId), ...prev].slice(0, 6));
      setNextId((id) => id + 1);
    }, 6000);
    return () => clearInterval(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nextId]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.15 }}
      className="rounded-2xl border border-white/10 bg-white/[0.03] p-6"
    >
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h3 className="font-display text-base font-semibold text-ink-primary">Recent activity</h3>
          <p className="font-body text-xs text-ink-muted">Live feed of scans across all channels</p>
        </div>
        <span className="flex items-center gap-1.5 font-mono text-[11px] text-success">
          <span className="h-1.5 w-1.5 rounded-full bg-success shadow-glow-cyan" />
          Live
        </span>
      </div>

      <div className="flex flex-col gap-2">
        <AnimatePresence initial={false}>
          {events.map((event) => (
            <motion.div
              key={event.id}
              layout
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35 }}
              className="flex items-center gap-3 rounded-xl px-2 py-2.5 transition-colors hover:bg-white/[0.03]"
            >
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/[0.05] text-ink-muted">
                <event.icon size={16} />
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate font-body text-sm text-ink-primary">{event.target}</p>
                <p className="font-body text-xs text-ink-muted">{event.label}</p>
              </div>
              <div className="flex shrink-0 items-center gap-2">
                {event.safe ? (
                  <span className="flex items-center gap-1 rounded-full bg-success/10 px-2 py-1 font-mono text-[11px] text-success">
                    <CheckCircle2 size={12} /> Safe
                  </span>
                ) : (
                  <span className="flex items-center gap-1 rounded-full bg-danger/10 px-2 py-1 font-mono text-[11px] text-danger">
                    <ShieldAlert size={12} /> Threat
                  </span>
                )}
                <span className="w-14 shrink-0 text-right font-mono text-[11px] text-ink-faint">
                  {event.time}
                </span>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
