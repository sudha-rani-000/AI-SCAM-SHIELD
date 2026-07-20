import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Bell, ShieldAlert, Mail, Link2, CheckCircle2 } from "lucide-react";

const NOTIFICATIONS = [
  {
    icon: ShieldAlert,
    color: "#F43F5E",
    title: "High-risk link blocked",
    detail: "A phishing link posing as a bank login was flagged.",
    time: "2m ago",
  },
  {
    icon: Mail,
    color: "#F59E0B",
    title: "Suspicious email scanned",
    detail: "Sender domain doesn't match the claimed organization.",
    time: "18m ago",
  },
  {
    icon: Link2,
    color: "#22D3EE",
    title: "URL scan complete",
    detail: "shop-deals-today.com came back clean.",
    time: "1h ago",
  },
  {
    icon: CheckCircle2,
    color: "#34D399",
    title: "Weekly report ready",
    detail: "Your scam-protection summary for last week is in.",
    time: "5h ago",
  },
];

export default function NotificationsDropdown() {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    function handleClick(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        className="relative flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-white/[0.03] text-ink-muted transition-colors hover:text-ink-primary"
        aria-label="Notifications"
      >
        <Bell size={18} />
        <span className="absolute right-2 top-2 flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-danger opacity-75" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-danger" />
        </span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.97 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 top-12 z-50 w-80 overflow-hidden rounded-xl border border-white/10 bg-void-panel/95 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.6)] backdrop-blur-xl"
          >
            <div className="border-b border-white/5 px-4 py-3">
              <p className="font-display text-sm font-semibold text-ink-primary">Notifications</p>
            </div>
            <div className="max-h-80 overflow-y-auto">
              {NOTIFICATIONS.map((n, i) => (
                <motion.div
                  key={n.title}
                  initial={{ opacity: 0, x: 8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="flex gap-3 border-b border-white/5 px-4 py-3 last:border-0 hover:bg-white/[0.03]"
                >
                  <div
                    className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg"
                    style={{ backgroundColor: `${n.color}1A`, color: n.color }}
                  >
                    <n.icon size={15} />
                  </div>
                  <div>
                    <p className="font-body text-sm text-ink-primary">{n.title}</p>
                    <p className="mt-0.5 font-body text-xs text-ink-muted">{n.detail}</p>
                    <p className="mt-1 font-mono text-[11px] text-ink-faint">{n.time}</p>
                  </div>
                </motion.div>
              ))}
            </div>
            <Link
              to="/dashboard/notifications"
              onClick={() => setOpen(false)}
              className="block px-4 py-2.5 text-center font-body text-xs text-cyan-glow transition-colors hover:text-ink-primary"
            >
              View all notifications
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
