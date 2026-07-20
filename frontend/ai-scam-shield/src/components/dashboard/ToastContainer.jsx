import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, ShieldAlert, Info, X } from "lucide-react";
import { useToast } from "../../lib/ToastContext.jsx";

const VARIANT_STYLES = {
  success: { icon: CheckCircle2, color: "#34D399" },
  danger: { icon: ShieldAlert, color: "#F43F5E" },
  info: { icon: Info, color: "#22D3EE" },
};

export default function ToastContainer() {
  const { toasts, dismiss } = useToast();

  return (
    <div className="pointer-events-none fixed bottom-6 right-6 z-[100] flex w-80 flex-col gap-2">
      <AnimatePresence>
        {toasts.map((toast) => {
          const { icon: Icon, color } = VARIANT_STYLES[toast.variant] ?? VARIANT_STYLES.info;
          return (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, x: 40, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 40, scale: 0.95 }}
              transition={{ duration: 0.25 }}
              className="pointer-events-auto flex items-start gap-3 rounded-xl border border-white/10 bg-void-panel/95 p-4 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.6)] backdrop-blur-xl"
            >
              <div
                className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg"
                style={{ backgroundColor: `${color}1A`, color }}
              >
                <Icon size={16} />
              </div>
              <div className="min-w-0 flex-1">
                <p className="font-body text-sm font-medium text-ink-primary">{toast.title}</p>
                {toast.description && (
                  <p className="mt-0.5 font-body text-xs text-ink-muted">{toast.description}</p>
                )}
              </div>
              <button
                onClick={() => dismiss(toast.id)}
                className="shrink-0 text-ink-faint transition-colors hover:text-ink-primary"
                aria-label="Dismiss notification"
              >
                <X size={14} />
              </button>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
