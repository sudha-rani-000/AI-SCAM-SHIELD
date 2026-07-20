import { useState } from "react";
import { motion, AnimatePresence, animate } from "framer-motion";
import { Globe2, Lock, ShieldAlert, ShieldCheck, RotateCw, TriangleAlert } from "lucide-react";
import DashboardLayout from "../components/dashboard/DashboardLayout.jsx";
import PrimaryButton from "../components/PrimaryButton.jsx";
import { useToast } from "../lib/ToastContext.jsx";
import { analyzeUrl } from "../lib/urlAnalyzer.js";
import { cn } from "../lib/utils.js";

function BrowserPreview({ analysis, scanning, progress }) {
  const hostname = analysis?.hostname ?? "example.com";
  const risky = analysis && analysis.verdict !== "Safe";

  return (
    <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03]">
      {/* Browser chrome */}
      <div className="flex items-center gap-3 border-b border-white/5 bg-void-raised/60 px-4 py-3">
        <div className="flex gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-danger/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#F59E0B]/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-success/70" />
        </div>
        <div className="flex flex-1 items-center gap-2 rounded-lg bg-white/[0.04] px-3 py-1.5">
          <AnimatePresence mode="wait" initial={false}>
            {analysis?.https ? (
              <motion.span key="lock" initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
                <Lock size={12} className="text-success" />
              </motion.span>
            ) : (
              <motion.span key="warn" initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
                <TriangleAlert size={12} className="text-[#F59E0B]" />
              </motion.span>
            )}
          </AnimatePresence>
          <span className="truncate font-mono text-xs text-ink-muted">{hostname}</span>
        </div>
        <RotateCw size={14} className={cn("text-ink-faint", scanning && "animate-spin")} />
      </div>

      {/* Scan sweep over "page" */}
      <div className="relative h-56 overflow-hidden bg-gradient-to-br from-void-panel to-void">
        <div
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage:
              "linear-gradient(rgba(139,92,246,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(139,92,246,0.06) 1px, transparent 1px)",
            backgroundSize: "22px 22px",
          }}
        />
        {scanning && (
          <motion.div
            className="absolute inset-x-0 h-24 bg-gradient-to-b from-cyan-glow/0 via-cyan-glow/15 to-cyan-glow/0"
            initial={{ top: "-30%" }}
            animate={{ top: "110%" }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "linear" }}
          />
        )}

        <div className="relative flex h-full flex-col items-center justify-center gap-3 px-6 text-center">
          {!analysis && !scanning && (
            <>
              <Globe2 size={32} className="text-ink-faint" />
              <p className="font-body text-sm text-ink-muted">
                Enter a website address below to preview and scan it.
              </p>
            </>
          )}

          {scanning && (
            <>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1.4, repeat: Infinity, ease: "linear" }}
                className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-dashed border-cyan-glow/50"
              >
                <Globe2 size={20} className="text-cyan-glow" />
              </motion.div>
              <p className="font-mono text-xs text-ink-muted">Rendering & inspecting page structure… {Math.round(progress)}%</p>
            </>
          )}

          <AnimatePresence>
            {analysis && !scanning && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center gap-3"
              >
                {risky ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex items-center gap-2 rounded-xl border border-danger/30 bg-danger/10 px-4 py-3"
                  >
                    <ShieldAlert size={20} className="text-danger" />
                    <div className="text-left">
                      <p className="font-display text-sm font-semibold text-danger">
                        This looks like it could be a fake or spoofed website
                      </p>
                      <p className="font-body text-xs text-ink-muted">
                        Structural signals suggest impersonation — avoid entering credentials here.
                      </p>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex items-center gap-2 rounded-xl border border-success/30 bg-success/10 px-4 py-3"
                  >
                    <ShieldCheck size={20} className="text-success" />
                    <p className="font-display text-sm font-semibold text-success">
                      No structural red flags on this page
                    </p>
                  </motion.div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

function TrustBadge({ analysis }) {
  if (!analysis) return null;
  const map = {
    Safe: { color: "#34D399", text: "Trusted structure" },
    Suspicious: { color: "#F59E0B", text: "Use caution" },
    Dangerous: { color: "#F43F5E", text: "High risk" },
  };
  const cfg = map[analysis.verdict] ?? map.Suspicious;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 22 }}
      className="flex items-center gap-2 rounded-full border px-3 py-1.5"
      style={{ borderColor: `${cfg.color}44`, background: `${cfg.color}14` }}
    >
      <span className="h-2 w-2 rounded-full" style={{ background: cfg.color, boxShadow: `0 0 8px ${cfg.color}` }} />
      <span className="font-mono text-xs" style={{ color: cfg.color }}>
        {cfg.text}
      </span>
    </motion.div>
  );
}

function ThreatReport({ analysis }) {
  if (!analysis) return null;
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-2xl border border-white/10 bg-white/[0.03] p-6"
    >
      <div className="mb-4 flex items-center justify-between">
        <h3 className="font-display text-base font-semibold text-ink-primary">Threat report</h3>
        <TrustBadge analysis={analysis} />
      </div>
      <div className="flex flex-col gap-2">
        {analysis.signals.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 + i * 0.06 }}
            className="flex items-center justify-between rounded-lg bg-white/[0.02] px-3 py-2"
          >
            <span className="font-body text-sm text-ink-muted">{s.label}</span>
            <span
              className={cn(
                "font-mono text-xs",
                s.ok ? "text-success" : "text-danger"
              )}
            >
              {s.ok ? "Pass" : "Flag"}
            </span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

function WebsiteScannerContent() {
  const { push } = useToast();
  const [value, setValue] = useState("");
  const [scanning, setScanning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [analysis, setAnalysis] = useState(null);
  const [error, setError] = useState("");

  function handleScan() {
    if (scanning || !value.trim()) return;
    const result = analyzeUrl(value);
    if (!result.valid) {
      setError(result.reason);
      setAnalysis(null);
      return;
    }
    setError("");
    setAnalysis(null);
    setScanning(true);
    setProgress(0);

    animate(0, 100, {
      duration: 1.7,
      ease: "easeInOut",
      onUpdate: setProgress,
      onComplete: () => {
        const hasIndicator = (id) => result.indicators.some((i) => i.id === id);
        const signals = [
          { label: "Valid HTTPS certificate", ok: result.https },
          { label: "No IP-address hostname", ok: !result.isIP },
          { label: "No brand impersonation pattern", ok: !hasIndicator("brand-mismatch") },
          { label: "Not a known URL shortener", ok: !result.isShortener },
          { label: "Normal subdomain structure", ok: !hasIndicator("deep-subdomains") },
        ];
        const enriched = { ...result, signals };
        setAnalysis(enriched);
        setScanning(false);
        push({
          title: `Website scan complete — ${result.verdict}`,
          description:
            result.verdict === "Safe"
              ? "No spoofing signals detected."
              : "This site shows signs of impersonation. Proceed with caution.",
          variant: result.verdict === "Safe" ? "success" : "danger",
        });
      },
    });
  }

  return (
    <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
      <div className="flex flex-col gap-5 lg:col-span-2">
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
          <label className="mb-2 block font-body text-sm text-ink-muted">Website address</label>
          <div className="flex gap-3">
            <input
              value={value}
              onChange={(e) => {
                setValue(e.target.value);
                if (error) setError("");
              }}
              onKeyDown={(e) => e.key === "Enter" && handleScan()}
              placeholder="e.g. secure-login-update-portal.com"
              className="flex-1 rounded-xl border border-white/10 bg-white/[0.02] px-4 py-3 font-mono text-sm text-ink-primary placeholder:text-ink-faint focus:border-cyan-glow/50 focus:outline-none"
            />
            <div className="w-40">
              <PrimaryButton status={scanning ? "loading" : "idle"} type="button" onClick={handleScan}>
                Preview & Scan
              </PrimaryButton>
            </div>
          </div>
          <AnimatePresence>
            {error && (
              <motion.p
                initial={{ opacity: 0, x: 0 }}
                animate={{ opacity: 1, x: [0, -6, 6, -4, 4, 0] }}
                transition={{ duration: 0.4 }}
                className="mt-2 font-body text-xs text-danger"
              >
                {error}
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        <BrowserPreview analysis={analysis} scanning={scanning} progress={progress} />
      </div>

      <div className="lg:col-span-1">
        <AnimatePresence mode="wait">
          {analysis ? (
            <ThreatReport analysis={analysis} />
          ) : (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex h-full flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-white/10 p-8 text-center"
            >
              <Globe2 size={26} className="text-ink-faint" />
              <p className="font-body text-sm text-ink-muted">
                Your threat report will appear here after scanning.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default function WebsiteScanner() {
  return (
    <DashboardLayout
      title="Website Scanner"
      subtitle="Preview a site and check its structure for spoofing before you trust it."
    >
      <WebsiteScannerContent />
    </DashboardLayout>
  );
}
