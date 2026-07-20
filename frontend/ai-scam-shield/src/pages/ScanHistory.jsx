import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Filter, Download, X, ShieldCheck, ShieldAlert } from "lucide-react";
import DashboardLayout from "../components/dashboard/DashboardLayout.jsx";
import { HISTORY, HISTORY_TYPES, HISTORY_VERDICTS } from "../lib/mockHistory.js";
import { cn } from "../lib/utils.js";

function verdictColor(v) {
  if (v === "Safe") return "text-success bg-success/10 border-success/30";
  if (v === "Suspicious") return "text-[#F59E0B] bg-[#F59E0B]/10 border-[#F59E0B]/30";
  return "text-danger bg-danger/10 border-danger/30";
}

function exportCsv(rows) {
  const header = "id,type,label,target,verdict,date\n";
  const body = rows
    .map((r) => [r.id, r.type, r.label, `"${r.target.replace(/"/g, '""')}"`, r.verdict, r.date].join(","))
    .join("\n");
  const blob = new Blob([header + body], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "scan-history.csv";
  a.click();
  URL.revokeObjectURL(url);
}

function DetailDrawer({ item, onClose }) {
  return (
    <AnimatePresence>
      {item && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-40 bg-black/50"
          />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 32 }}
            className="fixed right-0 top-0 z-50 h-full w-full max-w-md border-l border-white/10 bg-void-panel p-6"
          >
            <div className="mb-6 flex items-center justify-between">
              <h3 className="font-display text-lg font-semibold text-ink-primary">Scan detail</h3>
              <button onClick={onClose} className="text-ink-muted hover:text-ink-primary">
                <X size={20} />
              </button>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/[0.05]">
                <item.icon size={20} className="text-cyan-glow" />
              </div>
              <div>
                <p className="font-body text-sm text-ink-primary">{item.label}</p>
                <p className="font-mono text-xs text-ink-faint">{new Date(item.date).toLocaleString()}</p>
              </div>
            </div>

            <p className="mt-5 break-all rounded-xl bg-white/[0.03] px-4 py-3 font-mono text-sm text-ink-muted">
              {item.target}
            </p>

            <div className={cn("mt-5 flex items-center gap-2 rounded-xl border px-4 py-3", verdictColor(item.verdict))}>
              {item.verdict === "Safe" ? <ShieldCheck size={18} /> : <ShieldAlert size={18} />}
              <span className="font-display text-sm font-semibold">{item.verdict}</span>
            </div>

            <p className="mt-5 font-body text-sm leading-relaxed text-ink-muted">
              This is a record from your scan history. Re-run this item through its original scanner from the
              sidebar if you'd like an updated result.
            </p>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

function HistoryContent() {
  const [query, setQuery] = useState("");
  const [type, setType] = useState("all");
  const [verdict, setVerdict] = useState("all");
  const [selected, setSelected] = useState(null);

  const filtered = useMemo(() => {
    return HISTORY.filter((h) => {
      if (type !== "all" && h.type !== type) return false;
      if (verdict !== "all" && h.verdict !== verdict) return false;
      if (query && !h.target.toLowerCase().includes(query.toLowerCase())) return false;
      return true;
    });
  }, [query, type, verdict]);

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-wrap items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-4">
        <div className="flex flex-1 items-center gap-2 rounded-xl border border-white/10 bg-white/[0.02] px-3 py-2">
          <Search size={15} className="text-ink-faint" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by target…"
            className="w-full bg-transparent font-body text-sm text-ink-primary placeholder:text-ink-faint focus:outline-none"
          />
        </div>

        <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.02] px-3 py-2">
          <Filter size={14} className="text-ink-faint" />
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="bg-transparent font-body text-sm text-ink-primary focus:outline-none"
          >
            {HISTORY_TYPES.map((t) => (
              <option key={t} value={t} className="bg-void-panel">
                {t === "all" ? "All types" : t}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.02] px-3 py-2">
          <select
            value={verdict}
            onChange={(e) => setVerdict(e.target.value)}
            className="bg-transparent font-body text-sm text-ink-primary focus:outline-none"
          >
            {HISTORY_VERDICTS.map((v) => (
              <option key={v} value={v} className="bg-void-panel">
                {v === "all" ? "All verdicts" : v}
              </option>
            ))}
          </select>
        </div>

        <button
          onClick={() => exportCsv(filtered)}
          className="flex items-center gap-2 rounded-xl border border-cyan-glow/30 bg-cyan-glow/10 px-3 py-2 font-body text-sm text-cyan-glow transition-colors hover:bg-cyan-glow/20"
        >
          <Download size={14} /> Export CSV
        </button>
      </div>

      <div className="relative flex flex-col gap-2 pl-4">
        <div className="absolute bottom-2 left-1 top-2 w-px bg-white/10" />
        <AnimatePresence>
          {filtered.map((item, i) => (
            <motion.button
              key={item.id}
              layout
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0 }}
              transition={{ delay: i * 0.03 }}
              onClick={() => setSelected(item)}
              className="relative flex items-center gap-4 rounded-xl px-3 py-3 text-left transition-colors hover:bg-white/[0.03]"
            >
              <span className="absolute -left-3 h-2 w-2 rounded-full bg-cyan-glow shadow-glow-cyan" />
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/[0.05]">
                <item.icon size={16} className="text-ink-muted" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate font-body text-sm text-ink-primary">{item.target}</p>
                <p className="font-mono text-[11px] text-ink-faint">
                  {item.label} · {new Date(item.date).toLocaleDateString()}
                </p>
              </div>
              <span className={cn("shrink-0 rounded-full border px-2.5 py-1 font-mono text-[11px]", verdictColor(item.verdict))}>
                {item.verdict}
              </span>
            </motion.button>
          ))}
        </AnimatePresence>

        {filtered.length === 0 && (
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="py-10 text-center font-body text-sm text-ink-muted">
            No scans match those filters.
          </motion.p>
        )}
      </div>

      <DetailDrawer item={selected} onClose={() => setSelected(null)} />
    </div>
  );
}

export default function ScanHistory() {
  return (
    <DashboardLayout title="Scan History" subtitle="Every scan you've run, searchable and exportable.">
      <HistoryContent />
    </DashboardLayout>
  );
}
