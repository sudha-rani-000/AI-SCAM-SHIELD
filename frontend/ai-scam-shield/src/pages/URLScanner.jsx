import { useState } from "react";
import { AnimatePresence, animate } from "framer-motion";
import DashboardLayout from "../components/dashboard/DashboardLayout.jsx";
import URLInputCard from "../components/urlscanner/URLInputCard.jsx";
import URLResultCard from "../components/urlscanner/URLResultCard.jsx";
import RecentScannedURLs from "../components/urlscanner/RecentScannedURLs.jsx";
import { useToast } from "../lib/ToastContext.jsx";
import { analyzeUrl } from "../lib/urlAnalyzer.js";

function URLScannerContent() {
  const { push } = useToast();
  const [value, setValue] = useState("");
  const [scanning, setScanning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  function handleChange(next) {
    setValue(next);
    if (error) setError("");
  }

  function handleScan() {
    if (scanning || !value.trim()) return;

    const analysis = analyzeUrl(value);
    if (!analysis.valid) {
      setError(analysis.reason);
      setResult(null);
      return;
    }

    setError("");
    setResult(null);
    setScanning(true);
    setProgress(0);

    const controls = animate(0, 100, {
      duration: 1.9,
      ease: "easeInOut",
      onUpdate: (v) => setProgress(v),
      onComplete: () => {
        setResult(analysis);
        setScanning(false);

        push({
          title: `Scan complete — ${analysis.verdict}`,
          description:
            analysis.verdict === "Dangerous"
              ? "This URL shows strong phishing indicators."
              : analysis.verdict === "Suspicious"
              ? "A few risk signals were found."
              : "No structural red flags detected.",
          variant:
            analysis.verdict === "Dangerous"
              ? "danger"
              : analysis.verdict === "Suspicious"
              ? "info"
              : "success",
        });
      },
    });

    return () => controls.stop();
  }

  return (
    <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
      <div className="flex flex-col gap-5 lg:col-span-2">
        <URLInputCard
          value={value}
          onChange={handleChange}
          onScan={handleScan}
          scanning={scanning}
          progress={progress}
          error={error}
        />

        <AnimatePresence mode="wait">
          {result && <URLResultCard key={result.url} result={result} />}
        </AnimatePresence>
      </div>

      <div className="lg:col-span-1">
        <RecentScannedURLs />
      </div>
    </div>
  );
}

export default function URLScanner() {
  return (
    <DashboardLayout
      title="URL Scanner"
      subtitle="Check any link for phishing and impersonation patterns before you click."
    >
      <URLScannerContent />
    </DashboardLayout>
  );
}
