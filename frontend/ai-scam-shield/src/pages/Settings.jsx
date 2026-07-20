import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bell, ScanSearch, Mail, ShieldCheck, Palette, Check } from "lucide-react";
import DashboardLayout from "../components/dashboard/DashboardLayout.jsx";
import ToggleSwitch from "../components/ToggleSwitch.jsx";
import { cn } from "../lib/utils.js";

const ACCENTS = [
  { id: "cyan", label: "Electric Cyan", color: "#22D3EE" },
  { id: "violet", label: "Neon Violet", color: "#8B5CF6" },
  { id: "blue", label: "Deep Blue", color: "#3B82F6" },
];

function Row({ icon: Icon, title, desc, checked, onChange }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-center justify-between rounded-xl bg-white/[0.02] px-4 py-3.5"
    >
      <div className="flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/[0.05] text-cyan-glow">
          <Icon size={16} />
        </div>
        <div>
          <p className="font-body text-sm text-ink-primary">{title}</p>
          <p className="font-body text-xs text-ink-muted">{desc}</p>
        </div>
      </div>
      <ToggleSwitch checked={checked} onChange={onChange} />
    </motion.div>
  );
}

function SettingsContent() {
  const [prefs, setPrefs] = useState({
    scamAlerts: true,
    emailDigest: true,
    urlWarnings: true,
    twoFactor: false,
  });
  const [accent, setAccent] = useState("cyan");
  const [saved, setSaved] = useState(false);

  function update(key, value) {
    setPrefs((p) => ({ ...p, [key]: value }));
  }

  function save() {
    setSaved(true);
    setTimeout(() => setSaved(false), 2200);
  }

  return (
    <div className="mx-auto flex max-w-2xl flex-col gap-5">
      <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
        <h3 className="mb-4 font-display text-base font-semibold text-ink-primary">Notifications</h3>
        <div className="flex flex-col gap-2">
          <Row
            icon={Bell}
            title="Scam alerts"
            desc="Get notified immediately when a scan flags a threat"
            checked={prefs.scamAlerts}
            onChange={(v) => update("scamAlerts", v)}
          />
          <Row
            icon={Mail}
            title="Weekly email digest"
            desc="A summary of your scan activity every Monday"
            checked={prefs.emailDigest}
            onChange={(v) => update("emailDigest", v)}
          />
          <Row
            icon={ScanSearch}
            title="URL warnings"
            desc="Show a warning banner before opening flagged links"
            checked={prefs.urlWarnings}
            onChange={(v) => update("urlWarnings", v)}
          />
        </div>
      </div>

      <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
        <h3 className="mb-4 font-display text-base font-semibold text-ink-primary">Security</h3>
        <Row
          icon={ShieldCheck}
          title="Two-factor authentication"
          desc="Require a second step when signing in"
          checked={prefs.twoFactor}
          onChange={(v) => update("twoFactor", v)}
        />
      </div>

      <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
        <div className="mb-4 flex items-center gap-2">
          <Palette size={16} className="text-cyan-glow" />
          <h3 className="font-display text-base font-semibold text-ink-primary">Accent color</h3>
        </div>
        <div className="flex gap-3">
          {ACCENTS.map((a) => (
            <button
              key={a.id}
              onClick={() => setAccent(a.id)}
              className={cn(
                "flex flex-1 flex-col items-center gap-2 rounded-xl border p-3 transition-colors",
                accent === a.id ? "border-white/30 bg-white/[0.05]" : "border-white/10"
              )}
            >
              <motion.span
                animate={{ scale: accent === a.id ? [1, 1.15, 1] : 1 }}
                transition={{ duration: 0.4 }}
                className="h-6 w-6 rounded-full"
                style={{ background: a.color, boxShadow: accent === a.id ? `0 0 14px ${a.color}` : "none" }}
              />
              <span className="font-body text-xs text-ink-muted">{a.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={save}
          className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-glow to-blue-neon px-5 py-2.5 font-display text-sm font-semibold text-void shadow-glow-blue"
        >
          Save settings
        </button>
        <AnimatePresence>
          {saved && (
            <motion.span
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0 }}
              className="flex items-center gap-1.5 font-body text-sm text-success"
            >
              <Check size={14} /> Settings saved
            </motion.span>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default function Settings() {
  return (
    <DashboardLayout title="Settings" subtitle="Manage notifications, security, and appearance preferences.">
      <SettingsContent />
    </DashboardLayout>
  );
}
