import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mic, Square, ShieldCheck, ShieldAlert } from "lucide-react";
import DashboardLayout from "../components/dashboard/DashboardLayout.jsx";
import PrimaryButton from "../components/PrimaryButton.jsx";
import { useToast } from "../lib/ToastContext.jsx";
import { scanText } from "../lib/scamDetector.js";
import { cn } from "../lib/utils.js";

function MicOrb({ listening }) {
  return (
    <div className="relative flex h-40 w-40 items-center justify-center">
      {listening &&
        [0, 1, 2].map((i) => (
          <motion.span
            key={i}
            className="absolute h-full w-full rounded-full border border-cyan-glow/40"
            initial={{ scale: 0.6, opacity: 0.7 }}
            animate={{ scale: 1.6, opacity: 0 }}
            transition={{ duration: 2, repeat: Infinity, delay: i * 0.6, ease: "easeOut" }}
          />
        ))}
      <motion.div
        animate={listening ? { scale: [1, 1.06, 1] } : { scale: 1 }}
        transition={{ duration: 1.1, repeat: listening ? Infinity : 0 }}
        className={cn(
          "flex h-24 w-24 items-center justify-center rounded-full",
          listening ? "bg-gradient-to-br from-cyan-glow to-violet-glow shadow-glow-cyan" : "bg-white/[0.06]"
        )}
      >
        <Mic size={32} className={listening ? "text-void" : "text-ink-muted"} />
      </motion.div>
    </div>
  );
}

function Waveform({ listening }) {
  const [bars, setBars] = useState(Array.from({ length: 28 }, () => 8));

  useEffect(() => {
    if (!listening) {
      setBars(Array.from({ length: 28 }, () => 6));
      return;
    }
    const id = setInterval(() => {
      setBars(Array.from({ length: 28 }, () => 6 + Math.random() * 34));
    }, 140);
    return () => clearInterval(id);
  }, [listening]);

  return (
    <div className="flex h-16 items-center justify-center gap-1">
      {bars.map((h, i) => (
        <motion.span
          key={i}
          animate={{ height: h }}
          transition={{ duration: 0.15 }}
          className={cn("w-1 rounded-full", listening ? "bg-cyan-glow" : "bg-white/10")}
          style={{ height: h }}
        />
      ))}
    </div>
  );
}

function VoiceScannerContent() {
  const { push } = useToast();
  const [listening, setListening] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [transcript, setTranscript] = useState("");
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState(null);
  const timerRef = useRef(null);

  function startListening() {
    setResult(null);
    setListening(true);
    setSeconds(0);
    timerRef.current = setInterval(() => setSeconds((s) => s + 1), 1000);
  }

  function stopListening() {
    setListening(false);
    clearInterval(timerRef.current);
  }

  useEffect(() => () => clearInterval(timerRef.current), []);

  function analyzeTranscript() {
    if (!transcript.trim() || analyzing) return;
    setAnalyzing(true);
    setResult(null);
    setTimeout(() => {
      const scan = scanText(transcript);
      const verdict = scan.verdict === "Scam" ? "Dangerous" : scan.verdict;
      setResult({ ...scan, verdict });
      setAnalyzing(false);
      push({
        title: `Call analysis complete — ${verdict}`,
        description:
          verdict === "Safe"
            ? "Nothing in this transcript matches known scam call patterns."
            : "This transcript matches patterns common in scam calls.",
        variant: verdict === "Safe" ? "success" : "danger",
      });
    }, 1300);
  }

  const mm = String(Math.floor(seconds / 60)).padStart(2, "0");
  const ss = String(seconds % 60).padStart(2, "0");

  return (
    <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
      <div className="flex flex-col items-center gap-5 rounded-2xl border border-white/10 bg-white/[0.03] p-8 lg:col-span-1">
        <MicOrb listening={listening} />
        <div className="font-mono text-sm text-ink-muted">{listening ? `${mm}:${ss}` : "Ready"}</div>
        <Waveform listening={listening} />
        <button
          onClick={listening ? stopListening : startListening}
          className={cn(
            "flex items-center gap-2 rounded-xl px-5 py-2.5 font-display text-sm font-semibold transition-shadow",
            listening
              ? "bg-danger/15 text-danger shadow-glow-danger hover:shadow-glow-danger"
              : "bg-gradient-to-r from-cyan-glow to-violet-glow text-void shadow-glow-cyan"
          )}
        >
          {listening ? <Square size={16} /> : <Mic size={16} />}
          {listening ? "Stop Listening" : "Start Listening"}
        </button>
        <p className="text-center font-body text-xs text-ink-muted">
          Live call audio isn't captured in this preview — type or paste what was said below to analyze it.
        </p>
      </div>

      <div className="flex flex-col gap-5 lg:col-span-2">
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
          <label className="mb-2 block font-body text-sm text-ink-muted">Call transcript</label>
          <textarea
            value={transcript}
            onChange={(e) => setTranscript(e.target.value)}
            rows={6}
            placeholder='e.g. "This is the IRS. You have a warrant unless you pay immediately with gift cards…"'
            className="w-full rounded-xl border border-white/10 bg-white/[0.02] px-4 py-3 font-body text-sm text-ink-primary placeholder:text-ink-faint focus:border-cyan-glow/50 focus:outline-none"
          />
          <div className="mt-4 w-48">
            <PrimaryButton type="button" status={analyzing ? "loading" : "idle"} onClick={analyzeTranscript}>
              Analyze Speech
            </PrimaryButton>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {analyzing && (
            <motion.div
              key="thinking"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-5"
            >
              <motion.span
                animate={{ rotate: 360 }}
                transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
                className="h-4 w-4 rounded-full border-2 border-cyan-glow border-t-transparent"
              />
              <span className="font-body text-sm text-ink-muted">Analyzing speech patterns…</span>
            </motion.div>
          )}

          {result && !analyzing && (
            <motion.div
              key="result"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-2xl border border-white/10 bg-white/[0.03] p-6"
            >
              <div className="mb-3 flex items-center gap-2">
                {result.verdict === "Safe" ? (
                  <ShieldCheck size={20} className="text-success" />
                ) : (
                  <ShieldAlert size={20} className="text-danger" />
                )}
                <h3
                  className={cn(
                    "font-display text-base font-semibold",
                    result.verdict === "Safe" ? "text-success" : "text-danger"
                  )}
                >
                  {result.verdict} · {result.confidence}% confidence
                </h3>
              </div>
              <p className="font-body text-sm leading-relaxed text-ink-muted">{result.explanation}</p>

              {result.indicators.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {result.indicators.map((ind) => (
                    <span
                      key={ind.id}
                      className="rounded-full border border-danger/30 bg-danger/10 px-3 py-1 font-mono text-[11px] text-danger"
                    >
                      {ind.label}
                    </span>
                  ))}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default function VoiceScanner() {
  return (
    <DashboardLayout
      title="Voice Scam Scanner"
      subtitle="Catch social-engineering patterns in a call by analyzing what was said."
    >
      <VoiceScannerContent />
    </DashboardLayout>
  );
}
