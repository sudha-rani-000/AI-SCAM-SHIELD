import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mail,
  Paperclip,
  Link2,
  ShieldCheck,
  ShieldAlert,
  CheckCircle2,
  XCircle,
  Loader2,
} from "lucide-react";
import DashboardLayout from "../components/dashboard/DashboardLayout.jsx";
import PrimaryButton from "../components/PrimaryButton.jsx";
import { useToast } from "../lib/ToastContext.jsx";
import { scanText } from "../lib/scamDetector.js";
import { analyzeUrl } from "../lib/urlAnalyzer.js";
import { cn } from "../lib/utils.js";

const STAGES = [
  { key: "headers", label: "Scanning headers", icon: Mail },
  { key: "links", label: "Scanning links", icon: Link2 },
  { key: "attachments", label: "Scanning attachments", icon: Paperclip },
];

function extractUrls(text) {
  const matches = text.match(/\bhttps?:\/\/[^\s)>\]]+/gi) ?? [];
  return [...new Set(matches)].slice(0, 5);
}

function StageRow({ stage, status }) {
  const Icon = stage.icon;
  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      className="flex items-center justify-between rounded-xl bg-white/[0.02] px-4 py-3"
    >
      <div className="flex items-center gap-3">
        <Icon size={16} className="text-ink-muted" />
        <span className="font-body text-sm text-ink-primary">{stage.label}</span>
      </div>
      <AnimatePresence mode="wait">
        {status === "pending" && (
          <motion.span key="pending" className="font-mono text-[11px] text-ink-faint">
            queued
          </motion.span>
        )}
        {status === "active" && (
          <motion.span key="active" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <Loader2 size={16} className="animate-spin text-cyan-glow" />
          </motion.span>
        )}
        {status === "done" && (
          <motion.span key="done" initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
            <CheckCircle2 size={16} className="text-success" />
          </motion.span>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function EmailScannerContent() {
  const { push } = useToast();
  const [sender, setSender] = useState("");
  const [body, setBody] = useState("");
  const [hasAttachment, setHasAttachment] = useState(false);
  const [scanning, setScanning] = useState(false);
  const [activeStage, setActiveStage] = useState(-1);
  const [result, setResult] = useState(null);

  function handleScan() {
    if (scanning || !body.trim()) return;
    setResult(null);
    setScanning(true);
    setActiveStage(0);

    let i = 0;
    const advance = () => {
      i += 1;
      if (i < STAGES.length) {
        setActiveStage(i);
        setTimeout(advance, 700);
      } else {
        setTimeout(() => {
          const links = extractUrls(body);
          const linkResults = links.map((l) => analyzeUrl(l)).filter((r) => r.valid);
          const worstLink = linkResults.sort((a, b) => b.score - a.score)[0];
          const textResult = scanText(`${sender} ${body}`);

          const attachmentRisky = hasAttachment && (textResult.verdict !== "Safe" || (worstLink && worstLink.verdict !== "Safe"));

          const combinedScore = Math.max(textResult.score, worstLink?.score ?? 0) + (attachmentRisky ? 10 : 0);
          const verdict = combinedScore >= 55 ? "Scam" : combinedScore >= 25 ? "Suspicious" : "Safe";

          const finalResult = {
            verdict,
            textResult,
            links: linkResults,
            hasAttachment,
            attachmentRisky,
          };
          setResult(finalResult);
          setScanning(false);
          setActiveStage(-1);

          push({
            title: `Email scan complete — ${verdict}`,
            description:
              verdict === "Safe"
                ? "No strong scam indicators found in this email."
                : "This email shows signs consistent with a scam or phishing attempt.",
            variant: verdict === "Safe" ? "success" : "danger",
          });
        }, 600);
      }
    };
    setTimeout(advance, 700);
  }

  const stageStatus = (idx) => {
    if (!scanning && activeStage === -1) return "pending";
    if (idx < activeStage) return "done";
    if (idx === activeStage) return "active";
    return "pending";
  };

  return (
    <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
      <div className="flex flex-col gap-5 lg:col-span-2">
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
          <label className="mb-2 block font-body text-sm text-ink-muted">Sender address</label>
          <input
            value={sender}
            onChange={(e) => setSender(e.target.value)}
            placeholder="billing@paypa1-support.com"
            className="mb-4 w-full rounded-xl border border-white/10 bg-white/[0.02] px-4 py-2.5 font-mono text-sm text-ink-primary placeholder:text-ink-faint focus:border-cyan-glow/50 focus:outline-none"
          />

          <label className="mb-2 block font-body text-sm text-ink-muted">Email body</label>
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            rows={7}
            placeholder="Paste the full email content here, including any links…"
            className="w-full rounded-xl border border-white/10 bg-white/[0.02] px-4 py-3 font-body text-sm text-ink-primary placeholder:text-ink-faint focus:border-cyan-glow/50 focus:outline-none"
          />

          <label className="mt-4 flex items-center gap-2 font-body text-sm text-ink-muted">
            <input
              type="checkbox"
              checked={hasAttachment}
              onChange={(e) => setHasAttachment(e.target.checked)}
              className="h-4 w-4 rounded border-white/20 bg-white/[0.02] accent-cyan-glow"
            />
            This email includes an attachment
          </label>

          <div className="mt-5">
            <PrimaryButton type="button" status={scanning ? "loading" : "idle"} onClick={handleScan}>
              Scan Email
            </PrimaryButton>
          </div>
        </div>

        <AnimatePresence>
          {scanning && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="flex flex-col gap-2 rounded-2xl border border-white/10 bg-white/[0.03] p-4"
            >
              {STAGES.map((s, i) => (
                <StageRow key={s.key} stage={s} status={stageStatus(i)} />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="lg:col-span-1">
        <AnimatePresence mode="wait">
          {!result ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex h-full min-h-[280px] flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-white/10 p-8 text-center"
            >
              <Mail size={26} className="text-ink-faint" />
              <p className="font-body text-sm text-ink-muted">Risk breakdown appears here after scanning.</p>
            </motion.div>
          ) : (
            <motion.div
              key="result"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-2xl border border-white/10 bg-white/[0.03] p-6"
            >
              <div className="mb-4 flex items-center gap-2">
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
                  {result.verdict}
                </h3>
              </div>

              <div className="flex flex-col gap-2 font-body text-sm">
                <div className="flex items-center justify-between rounded-lg bg-white/[0.02] px-3 py-2">
                  <span className="text-ink-muted">Message language</span>
                  <span className="font-mono text-xs text-ink-primary">{result.textResult.verdict}</span>
                </div>
                <div className="flex items-center justify-between rounded-lg bg-white/[0.02] px-3 py-2">
                  <span className="text-ink-muted">Links found</span>
                  <span className="font-mono text-xs text-ink-primary">{result.links.length}</span>
                </div>
                <div className="flex items-center justify-between rounded-lg bg-white/[0.02] px-3 py-2">
                  <span className="text-ink-muted">Attachment</span>
                  <span className="flex items-center gap-1 font-mono text-xs">
                    {!result.hasAttachment ? (
                      <span className="text-ink-faint">none</span>
                    ) : result.attachmentRisky ? (
                      <span className="flex items-center gap-1 text-danger">
                        <XCircle size={12} /> risky context
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 text-success">
                        <CheckCircle2 size={12} /> low risk context
                      </span>
                    )}
                  </span>
                </div>
              </div>

              {result.links.length > 0 && (
                <div className="mt-4 flex flex-col gap-2">
                  {result.links.map((l) => (
                    <div key={l.url} className="flex items-center justify-between rounded-lg bg-white/[0.02] px-3 py-2">
                      <span className="truncate font-mono text-[11px] text-ink-muted">{l.hostname}</span>
                      <span
                        className={cn(
                          "font-mono text-[11px]",
                          l.verdict === "Safe" ? "text-success" : "text-danger"
                        )}
                      >
                        {l.verdict}
                      </span>
                    </div>
                  ))}
                </div>
              )}

              <p className="mt-4 font-body text-xs leading-relaxed text-ink-muted">
                {result.textResult.explanation}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default function EmailScanner() {
  return (
    <DashboardLayout
      title="Email Scanner"
      subtitle="Check a suspicious email's headers, links, and attachment context in one pass."
    >
      <EmailScannerContent />
    </DashboardLayout>
  );
}
