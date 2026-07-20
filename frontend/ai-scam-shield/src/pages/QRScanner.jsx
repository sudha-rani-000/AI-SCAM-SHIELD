import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { QrCode, ScanLine, CheckCircle2, ShieldAlert, Upload, Sparkles } from "lucide-react";
import DashboardLayout from "../components/dashboard/DashboardLayout.jsx";
import PrimaryButton from "../components/PrimaryButton.jsx";
import { useToast } from "../lib/ToastContext.jsx";
import { analyzeUrl } from "../lib/urlAnalyzer.js";
import { scanText } from "../lib/scamDetector.js";
import { cn } from "../lib/utils.js";

const SAMPLES = [
  "https://menu.your-favorite-cafe.com/table-12",
  "https://secure-wallet-verify-claim.top/reward",
  "https://bit.ly/3xR2fake",
];

function CameraFrame({ phase }) {
  // phase: idle | scanning | decoded
  return (
    <div className="relative mx-auto flex aspect-square w-full max-w-xs items-center justify-center overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-void-panel to-void">
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            "linear-gradient(rgba(34,211,238,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(34,211,238,0.08) 1px, transparent 1px)",
          backgroundSize: "18px 18px",
        }}
      />

      {/* corner brackets */}
      {[
        "top-6 left-6 border-t-2 border-l-2",
        "top-6 right-6 border-t-2 border-r-2",
        "bottom-6 left-6 border-b-2 border-l-2",
        "bottom-6 right-6 border-b-2 border-r-2",
      ].map((pos) => (
        <div key={pos} className={cn("absolute h-8 w-8 rounded-sm border-cyan-glow/60", pos)} />
      ))}

      <AnimatePresence mode="wait">
        {phase === "idle" && (
          <motion.div key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <QrCode size={64} className="text-ink-faint/60" />
          </motion.div>
        )}
        {phase === "scanning" && (
          <motion.div key="scanning" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <QrCode size={64} className="text-cyan-glow/70" />
          </motion.div>
        )}
        {phase === "decoded" && (
          <motion.div
            key="decoded"
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", stiffness: 260, damping: 18 }}
          >
            <Sparkles size={56} className="text-violet-glow" />
          </motion.div>
        )}
      </AnimatePresence>

      {phase === "scanning" && (
        <motion.div
          className="absolute inset-x-8 h-0.5 bg-cyan-glow shadow-glow-cyan"
          initial={{ top: "12%" }}
          animate={{ top: "88%" }}
          transition={{ duration: 1.1, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
        />
      )}
    </div>
  );
}

function QRScannerContent() {
  const { push } = useToast();
  const [raw, setRaw] = useState("");
  const [phase, setPhase] = useState("idle");
  const [result, setResult] = useState(null);

  function runDecode(text) {
    if (!text.trim() || phase === "scanning") return;
    setResult(null);
    setPhase("scanning");

    setTimeout(() => {
      setPhase("decoded");

      const looksLikeUrl = /^(https?:\/\/|www\.)/i.test(text.trim()) || text.includes(".");
      let analysis;
      if (looksLikeUrl) {
        const urlResult = analyzeUrl(text.trim());
        analysis = urlResult.valid
          ? { kind: "url", verdict: urlResult.verdict, detail: urlResult }
          : { kind: "text", verdict: "Suspicious", detail: { explanation: urlResult.reason, recommendations: [] } };
      } else {
        const textResult = scanText(text.trim());
        analysis = { kind: "text", verdict: textResult.verdict === "Scam" ? "Dangerous" : textResult.verdict, detail: textResult };
      }

      setResult({ raw: text.trim(), ...analysis });

      push({
        title: `QR decoded — ${analysis.verdict}`,
        description:
          analysis.verdict === "Safe"
            ? "This code points somewhere with no red flags."
            : "This code shows risk signals. Don't act on it without verifying.",
        variant: analysis.verdict === "Safe" ? "success" : "danger",
      });
    }, 1500);
  }

  const dangerous = result && result.verdict !== "Safe";

  return (
    <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
      <div className="flex flex-col items-center gap-5 rounded-2xl border border-white/10 bg-white/[0.03] p-6 lg:col-span-1">
        <CameraFrame phase={phase} />
        <p className="text-center font-body text-xs text-ink-muted">
          Camera decoding isn't wired up in this preview — paste the QR code's decoded content below and simulate a scan.
        </p>
        <textarea
          value={raw}
          onChange={(e) => setRaw(e.target.value)}
          rows={3}
          placeholder="Paste decoded QR content (a link or message)…"
          className="w-full rounded-xl border border-white/10 bg-white/[0.02] px-3 py-2 font-mono text-xs text-ink-primary placeholder:text-ink-faint focus:border-cyan-glow/50 focus:outline-none"
        />
        <div className="w-full">
          <PrimaryButton type="button" status={phase === "scanning" ? "loading" : "idle"} onClick={() => runDecode(raw)}>
            <span className="flex items-center gap-2">
              <ScanLine size={16} /> Simulate Scan
            </span>
          </PrimaryButton>
        </div>
        <div className="flex w-full flex-wrap gap-2">
          {SAMPLES.map((s) => (
            <button
              key={s}
              onClick={() => {
                setRaw(s);
                runDecode(s);
              }}
              className="flex items-center gap-1 rounded-full border border-white/10 bg-white/[0.02] px-2.5 py-1 font-mono text-[11px] text-ink-muted transition-colors hover:border-cyan-glow/40 hover:text-ink-primary"
            >
              <Upload size={10} /> sample
            </button>
          ))}
        </div>
      </div>

      <div className="lg:col-span-2">
        <AnimatePresence mode="wait">
          {!result ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex h-full min-h-[320px] flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-white/10 p-8 text-center"
            >
              <QrCode size={28} className="text-ink-faint" />
              <p className="font-body text-sm text-ink-muted">Decode a QR code to see its safety analysis here.</p>
            </motion.div>
          ) : (
            <motion.div
              key="result"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-2xl border border-white/10 bg-white/[0.03] p-6"
            >
              <div className="flex items-center justify-between">
                <h3 className="font-display text-base font-semibold text-ink-primary">Decoded content</h3>
                <motion.div
                  initial={{ scale: 0.6, opacity: 0 }}
                  animate={{ scale: [0.6, 1.15, 1], opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  className={cn(
                    "flex items-center gap-1.5 rounded-full px-3 py-1 font-mono text-xs",
                    dangerous ? "bg-danger/10 text-danger" : "bg-success/10 text-success"
                  )}
                >
                  {dangerous ? <ShieldAlert size={14} /> : <CheckCircle2 size={14} />}
                  {result.verdict}
                </motion.div>
              </div>

              <p className="mt-3 break-all rounded-lg bg-white/[0.02] px-3 py-2 font-mono text-xs text-ink-muted">
                {result.raw}
              </p>

              <p className="mt-4 font-body text-sm leading-relaxed text-ink-muted">
                {result.detail.explanation}
              </p>

              {result.detail.recommendations?.length > 0 && (
                <ul className="mt-4 flex flex-col gap-2">
                  {result.detail.recommendations.slice(0, 4).map((r, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 + i * 0.06 }}
                      className="flex gap-2 font-body text-xs text-ink-muted"
                    >
                      <span className="mt-1 h-1 w-1 shrink-0 rounded-full bg-cyan-glow" />
                      {r}
                    </motion.li>
                  ))}
                </ul>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default function QRScanner() {
  return (
    <DashboardLayout title="QR Scanner" subtitle="Decode a QR code and check where it actually leads before you follow it.">
      <QRScannerContent />
    </DashboardLayout>
  );
}
