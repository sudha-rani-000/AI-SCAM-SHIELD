import { useState } from "react";
import { AnimatePresence, animate } from "framer-motion";
import DashboardLayout from "../components/dashboard/DashboardLayout.jsx";
import ScanInputCard from "../components/scanner/ScanInputCard.jsx";
import ScanResultCard from "../components/scanner/ScanResultCard.jsx";
import ScanHistoryPreview from "../components/scanner/ScanHistoryPreview.jsx";
import { useToast } from "../lib/ToastContext.jsx";
import { scanText } from "../lib/scamDetector.js";

function ScamScannerContent() {
  const { push } = useToast();
  const [text, setText] = useState("");
  const [status, setStatus] = useState("idle"); // idle | scanning | complete
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState(null);
  const [pendingVerdict, setPendingVerdict] = useState(null);

  function handleScan() {
    if (!text.trim() || status !== "idle") return;

    const scanResult = scanText(text);

    setResult(null);
    setStatus("scanning");
    setProgress(0);

    animate(0, 100, {
      duration: 2.1,
      ease: "easeInOut",
      onUpdate: (v) => setProgress(v),
      onComplete: () => {
        setPendingVerdict(scanResult.verdict);
        setStatus("complete");

        setTimeout(() => {
          setResult(scanResult);
          setStatus("idle");

          push({
            title: `Scan complete — ${scanResult.verdict}`,
            description:
              scanResult.verdict === "Scam"
                ? "This message shows strong scam indicators."
                : scanResult.verdict === "Suspicious"
                ? "A few concerning patterns were found."
                : "No known scam patterns were detected.",
            variant:
              scanResult.verdict === "Scam"
                ? "danger"
                : scanResult.verdict === "Suspicious"
                ? "info"
                : "success",
          });
        }, 900);
      },
    });
  }

  return (
    <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
      <div className="flex flex-col gap-5 lg:col-span-2">
        <ScanInputCard
          value={text}
          onChange={setText}
          onScan={handleScan}
          status={status}
          progress={progress}
          pendingVerdict={pendingVerdict}
        />

        <AnimatePresence mode="wait">
          {result && <ScanResultCard key={result.explanation} result={result} />}
        </AnimatePresence>
      </div>

      <div className="lg:col-span-1">
        <ScanHistoryPreview />
      </div>
    </div>
  );
}

export default function ScamScanner() {
  return (
    <DashboardLayout
      title="AI Scam Scanner"
      subtitle="Paste any suspicious message and get a verdict in seconds."
    >
      <ScamScannerContent />
    </DashboardLayout>
  );
}
