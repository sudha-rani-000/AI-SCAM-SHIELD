import { useState } from "react";
import { motion } from "framer-motion";
import { Link2, Mail, QrCode, Mic, Loader2 } from "lucide-react";
import { useToast } from "../../lib/ToastContext.jsx";

const ACTIONS = [
  { icon: Link2, label: "Scan a URL", accent: "#22D3EE" },
  { icon: Mail, label: "Scan an email", accent: "#3B82F6" },
  { icon: QrCode, label: "Scan a QR code", accent: "#8B5CF6" },
  { icon: Mic, label: "Scan a call", accent: "#F59E0B" },
];

export default function QuickScanButtons() {
  const { push } = useToast();
  const [loadingIndex, setLoadingIndex] = useState(null);

  function handleScan(action, index) {
    if (loadingIndex !== null) return;
    setLoadingIndex(index);
    push({ title: `Running ${action.label.toLowerCase()}…`, variant: "info", duration: 1400 });

    setTimeout(() => {
      setLoadingIndex(null);
      push({
        title: "Scan complete",
        description: "No threats detected in this submission.",
        variant: "success",
      });
    }, 1400);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.05 }}
      className="rounded-2xl border border-white/10 bg-white/[0.03] p-6"
    >
      <h3 className="font-display text-base font-semibold text-ink-primary">Quick scan</h3>
      <p className="mb-5 font-body text-xs text-ink-muted">Jump straight into checking something</p>

      <div className="grid grid-cols-2 gap-3">
        {ACTIONS.map((action, i) => {
          const loading = loadingIndex === i;
          return (
            <motion.button
              key={action.label}
              onClick={() => handleScan(action, i)}
              whileTap={{ scale: 0.97 }}
              disabled={loading}
              className="group flex flex-col items-start gap-3 rounded-xl border border-white/10 bg-white/[0.02] p-4 text-left transition-colors hover:border-white/20 hover:bg-white/[0.05] disabled:cursor-wait"
            >
              <div
                className="flex h-9 w-9 items-center justify-center rounded-lg transition-shadow group-hover:shadow-[0_0_16px_-2px_var(--accent)]"
                style={{ backgroundColor: `${action.accent}1A`, color: action.accent, "--accent": action.accent }}
              >
                {loading ? <Loader2 size={16} className="animate-spin" /> : <action.icon size={16} />}
              </div>
              <span className="font-body text-sm text-ink-primary">{action.label}</span>
            </motion.button>
          );
        })}
      </div>
    </motion.div>
  );
}
