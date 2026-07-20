import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldAlert, ShieldCheck, Info, CheckCheck } from "lucide-react";
import DashboardLayout from "../components/dashboard/DashboardLayout.jsx";
import { cn } from "../lib/utils.js";

const INITIAL = [
  { id: 1, type: "danger", title: "Dangerous URL blocked", detail: "amaz0n-rewards-claim.com matched 4 phishing signals.", time: "2m ago", read: false },
  { id: 2, type: "danger", title: "Scam email detected", detail: "billing@paypa1-support.com — credential harvesting pattern.", time: "18m ago", read: false },
  { id: 3, type: "info", title: "Weekly digest ready", detail: "Your scan summary for last week is available.", time: "1h ago", read: false },
  { id: 4, type: "success", title: "Website verified safe", detail: "official-northface-store.com passed all structural checks.", time: "3h ago", read: true },
  { id: 5, type: "danger", title: "Suspicious call flagged", detail: "Transcript matched IRS-impersonation scam pattern.", time: "1d ago", read: true },
  { id: 6, type: "info", title: "New achievement unlocked", detail: "You earned the \"Streak Keeper\" badge.", time: "2d ago", read: true },
];

const ICONS = { danger: ShieldAlert, success: ShieldCheck, info: Info };
const COLORS = {
  danger: "text-danger bg-danger/10",
  success: "text-success bg-success/10",
  info: "text-cyan-glow bg-cyan-glow/10",
};

function NotificationsContent() {
  const [items, setItems] = useState(INITIAL);
  const unread = items.filter((i) => !i.read).length;

  return (
    <div className="mx-auto flex max-w-2xl flex-col gap-4">
      <div className="flex items-center justify-between">
        <p className="font-body text-sm text-ink-muted">
          {unread > 0 ? `${unread} unread notification${unread > 1 ? "s" : ""}` : "You're all caught up"}
        </p>
        {unread > 0 && (
          <button
            onClick={() => setItems((prev) => prev.map((i) => ({ ...i, read: true })))}
            className="flex items-center gap-1.5 font-body text-xs text-cyan-glow transition-colors hover:text-ink-primary"
          >
            <CheckCheck size={14} /> Mark all read
          </button>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <AnimatePresence initial={false}>
          {items.map((item, i) => {
            const Icon = ICONS[item.type];
            return (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.04 }}
                onClick={() => setItems((prev) => prev.map((n) => (n.id === item.id ? { ...n, read: true } : n)))}
                className={cn(
                  "relative flex cursor-pointer items-start gap-3 rounded-xl border p-4 transition-colors",
                  item.read ? "border-white/5 bg-white/[0.015]" : "border-white/10 bg-white/[0.04]"
                )}
              >
                {!item.read && (
                  <motion.span
                    className="absolute right-3 top-3 h-2 w-2 rounded-full bg-cyan-glow"
                    animate={{ scale: [1, 1.5, 1], opacity: [1, 0.4, 1] }}
                    transition={{ duration: 1.6, repeat: Infinity }}
                  />
                )}
                <div className={cn("flex h-9 w-9 shrink-0 items-center justify-center rounded-lg", COLORS[item.type])}>
                  <Icon size={16} />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-body text-sm text-ink-primary">{item.title}</p>
                  <p className="mt-0.5 font-body text-xs text-ink-muted">{item.detail}</p>
                  <p className="mt-1.5 font-mono text-[11px] text-ink-faint">{item.time}</p>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default function NotificationsPage() {
  return (
    <DashboardLayout title="Notifications" subtitle="Every alert your shield has raised, in one place.">
      <NotificationsContent />
    </DashboardLayout>
  );
}
