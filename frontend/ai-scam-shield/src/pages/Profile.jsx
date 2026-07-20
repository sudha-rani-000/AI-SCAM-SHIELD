import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Award, ShieldCheck, Link2, Mail, Save, Check } from "lucide-react";
import DashboardLayout from "../components/dashboard/DashboardLayout.jsx";
import RiskMeter from "../components/dashboard/RiskMeter.jsx";
import { HISTORY } from "../lib/mockHistory.js";
import { cn } from "../lib/utils.js";

const BADGES = [
  { id: 1, label: "First Scan", desc: "Ran your first scan", unlocked: true },
  { id: 2, label: "Link Detective", desc: "Scanned 10 URLs", unlocked: true },
  { id: 3, label: "Inbox Guardian", desc: "Scanned 5 emails", unlocked: true },
  { id: 4, label: "Streak Keeper", desc: "7 days of activity", unlocked: true },
  { id: 5, label: "Threat Hunter", desc: "Flagged 25 threats", unlocked: false },
  { id: 6, label: "Voice Vigilant", desc: "Analyzed a call transcript", unlocked: false },
];

function Badge({ badge, i }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: i * 0.06, type: "spring", stiffness: 260, damping: 20 }}
      whileHover={{ y: -3 }}
      className={cn(
        "flex flex-col items-center gap-2 rounded-xl border p-4 text-center",
        badge.unlocked ? "border-cyan-glow/30 bg-cyan-glow/5" : "border-white/10 bg-white/[0.02] opacity-50"
      )}
    >
      <div
        className={cn(
          "flex h-11 w-11 items-center justify-center rounded-full",
          badge.unlocked ? "bg-gradient-to-br from-cyan-glow to-violet-glow text-void" : "bg-white/10 text-ink-faint"
        )}
      >
        <Award size={18} />
      </div>
      <p className="font-display text-xs font-semibold text-ink-primary">{badge.label}</p>
      <p className="font-body text-[11px] text-ink-muted">{badge.desc}</p>
    </motion.div>
  );
}

function ProfileForm() {
  const [name, setName] = useState("Morgan Reyes");
  const [email, setEmail] = useState("morgan.reyes@example.com");
  const [saved, setSaved] = useState(false);

  function handleSave(e) {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2200);
  }

  return (
    <form onSubmit={handleSave} className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
      <h3 className="mb-4 font-display text-base font-semibold text-ink-primary">Account details</h3>
      <div className="flex flex-col gap-4">
        <div>
          <label className="mb-1.5 block font-body text-xs text-ink-muted">Full name</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded-xl border border-white/10 bg-white/[0.02] px-4 py-2.5 font-body text-sm text-ink-primary focus:border-cyan-glow/50 focus:outline-none"
          />
        </div>
        <div>
          <label className="mb-1.5 block font-body text-xs text-ink-muted">Email</label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-xl border border-white/10 bg-white/[0.02] px-4 py-2.5 font-body text-sm text-ink-primary focus:border-cyan-glow/50 focus:outline-none"
          />
        </div>
      </div>

      <div className="mt-5 flex items-center gap-3">
        <button
          type="submit"
          className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-glow to-blue-neon px-5 py-2.5 font-display text-sm font-semibold text-void shadow-glow-blue"
        >
          <Save size={15} /> Save changes
        </button>
        <AnimatePresence>
          {saved && (
            <motion.span
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0 }}
              className="flex items-center gap-1.5 font-body text-sm text-success"
            >
              <Check size={14} /> Saved
            </motion.span>
          )}
        </AnimatePresence>
      </div>
    </form>
  );
}

function ProfileContent() {
  const recent = HISTORY.slice(0, 5);

  return (
    <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
      <div className="flex flex-col gap-5 lg:col-span-1">
        <RiskMeter score={87} />
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
          <h3 className="mb-3 font-display text-sm font-semibold text-ink-primary">Achievements</h3>
          <div className="grid grid-cols-2 gap-3">
            {BADGES.map((b, i) => (
              <Badge key={b.id} badge={b} i={i} />
            ))}
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-5 lg:col-span-2">
        <ProfileForm />

        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
          <h3 className="mb-4 font-display text-base font-semibold text-ink-primary">Activity timeline</h3>
          <div className="flex flex-col gap-3">
            {recent.map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.06 }}
                className="flex items-center gap-3 rounded-xl bg-white/[0.02] px-3 py-2.5"
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/[0.05] text-ink-muted">
                  <item.icon size={16} />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate font-body text-sm text-ink-primary">{item.target}</p>
                  <p className="font-mono text-[11px] text-ink-faint">{new Date(item.date).toLocaleDateString()}</p>
                </div>
                <span
                  className={cn(
                    "font-mono text-[11px]",
                    item.verdict === "Safe" ? "text-success" : "text-danger"
                  )}
                >
                  {item.verdict}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Profile() {
  return (
    <DashboardLayout title="Profile" subtitle="Your security score, achievements, and account details.">
      <ProfileContent />
    </DashboardLayout>
  );
}
