import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Users, ShieldAlert, FileDown, Loader2, CheckCircle2 } from "lucide-react";
import DashboardLayout from "../components/dashboard/DashboardLayout.jsx";
import { HISTORY } from "../lib/mockHistory.js";
import { cn } from "../lib/utils.js";

function buildSeries(n = 24) {
  return Array.from({ length: n }, (_, i) => ({
    t: i,
    scans: 20 + Math.round(Math.sin(i / 3) * 10 + Math.random() * 12 + i * 0.6),
  }));
}

const USERS = [
  { id: 1, name: "Morgan Reyes", email: "morgan.reyes@example.com", scans: 142, risk: "Low" },
  { id: 2, name: "Priya Nair", email: "priya.nair@example.com", scans: 87, risk: "Low" },
  { id: 3, name: "Diego Alvarez", email: "diego.alvarez@example.com", scans: 231, risk: "Medium" },
  { id: 4, name: "Aiko Tanaka", email: "aiko.tanaka@example.com", scans: 54, risk: "Low" },
  { id: 5, name: "Sam O'Connell", email: "sam.oconnell@example.com", scans: 19, risk: "High" },
];

const AUDIT_LOGS = [
  { id: 1, actor: "system", action: "Threat feed updated", time: "2m ago" },
  { id: 2, actor: "admin@shield.ai", action: "Exported user report", time: "26m ago" },
  { id: 3, actor: "system", action: "Blocked 14 phishing domains", time: "1h ago" },
  { id: 4, actor: "admin@shield.ai", action: "Adjusted risk threshold to 55", time: "3h ago" },
];

function LiveAnalytics() {
  const [data, setData] = useState(buildSeries());

  useEffect(() => {
    const id = setInterval(() => {
      setData((prev) => {
        const next = prev.slice(1);
        const last = next[next.length - 1]?.scans ?? 30;
        next.push({ t: prev[prev.length - 1].t + 1, scans: Math.max(5, last + (Math.random() - 0.5) * 14) });
        return next;
      });
    }, 2500);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
      <div className="mb-2 flex items-center justify-between">
        <h3 className="font-display text-base font-semibold text-ink-primary">Platform scan volume</h3>
        <span className="flex items-center gap-1.5 font-mono text-[11px] text-success">
          <span className="h-1.5 w-1.5 rounded-full bg-success shadow-glow-cyan" /> Live
        </span>
      </div>
      <div className="h-56">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="adminArea" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#22D3EE" stopOpacity={0.4} />
                <stop offset="100%" stopColor="#22D3EE" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="t" hide />
            <YAxis hide />
            <Tooltip
              contentStyle={{ background: "#0B1220", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8 }}
              labelStyle={{ display: "none" }}
              itemStyle={{ color: "#22D3EE", fontSize: 12 }}
            />
            <Area type="monotone" dataKey="scans" stroke="#22D3EE" strokeWidth={2} fill="url(#adminArea)" isAnimationActive />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

function ThreatFeed() {
  const [feed, setFeed] = useState(HISTORY.filter((h) => h.verdict !== "Safe").slice(0, 5));

  useEffect(() => {
    const id = setInterval(() => {
      const pool = HISTORY.filter((h) => h.verdict !== "Safe");
      const random = pool[Math.floor(Math.random() * pool.length)];
      setFeed((prev) => [{ ...random, id: Date.now() }, ...prev].slice(0, 6));
    }, 7000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
      <h3 className="mb-4 font-display text-base font-semibold text-ink-primary">Live threat feed</h3>
      <div className="flex flex-col gap-2">
        <AnimatePresence initial={false}>
          {feed.map((item) => (
            <motion.div
              key={item.id}
              layout
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0 }}
              className="flex items-center gap-3 rounded-xl bg-danger/5 px-3 py-2.5"
            >
              <ShieldAlert size={16} className="shrink-0 text-danger" />
              <p className="min-w-0 flex-1 truncate font-mono text-xs text-ink-muted">{item.target}</p>
              <span className="shrink-0 font-mono text-[11px] text-danger">{item.verdict}</span>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}

function UserTable() {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
      <div className="mb-4 flex items-center gap-2">
        <Users size={16} className="text-cyan-glow" />
        <h3 className="font-display text-base font-semibold text-ink-primary">Users</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="font-body text-xs text-ink-faint">
              <th className="pb-2">Name</th>
              <th className="pb-2">Email</th>
              <th className="pb-2">Scans</th>
              <th className="pb-2">Risk</th>
            </tr>
          </thead>
          <tbody>
            {USERS.map((u, i) => (
              <motion.tr
                key={u.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.05 }}
                className="border-t border-white/5 font-body text-sm text-ink-primary hover:bg-white/[0.02]"
              >
                <td className="py-2.5">{u.name}</td>
                <td className="py-2.5 font-mono text-xs text-ink-muted">{u.email}</td>
                <td className="py-2.5 font-mono text-xs">{u.scans}</td>
                <td className="py-2.5">
                  <span
                    className={cn(
                      "rounded-full px-2 py-0.5 font-mono text-[11px]",
                      u.risk === "Low" && "bg-success/10 text-success",
                      u.risk === "Medium" && "bg-[#F59E0B]/10 text-[#F59E0B]",
                      u.risk === "High" && "bg-danger/10 text-danger"
                    )}
                  >
                    {u.risk}
                  </span>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function AuditLogs() {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
      <h3 className="mb-4 font-display text-base font-semibold text-ink-primary">Audit logs</h3>
      <div className="flex flex-col gap-3">
        {AUDIT_LOGS.map((log, i) => (
          <motion.div
            key={log.id}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.05 }}
            className="flex items-center justify-between border-b border-white/5 pb-3 last:border-none last:pb-0"
          >
            <div>
              <p className="font-body text-sm text-ink-primary">{log.action}</p>
              <p className="font-mono text-[11px] text-ink-faint">{log.actor}</p>
            </div>
            <span className="font-mono text-[11px] text-ink-muted">{log.time}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function ReportGenerator() {
  const [status, setStatus] = useState("idle");

  function generate() {
    if (status !== "idle") return;
    setStatus("loading");
    setTimeout(() => {
      const rows = "id,type,label,target,verdict,date\n" + HISTORY.map((h) => `${h.id},${h.type},${h.label},"${h.target}",${h.verdict},${h.date}`).join("\n");
      const blob = new Blob([rows], { type: "text/csv" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "platform-report.csv";
      a.click();
      URL.revokeObjectURL(url);
      setStatus("done");
      setTimeout(() => setStatus("idle"), 2000);
    }, 1400);
  }

  return (
    <button
      onClick={generate}
      className="flex items-center gap-2 rounded-xl border border-cyan-glow/30 bg-cyan-glow/10 px-4 py-2.5 font-body text-sm text-cyan-glow transition-colors hover:bg-cyan-glow/20"
    >
      <AnimatePresence mode="wait" initial={false}>
        {status === "loading" ? (
          <motion.span key="l" className="flex items-center gap-2">
            <Loader2 size={15} className="animate-spin" /> Generating…
          </motion.span>
        ) : status === "done" ? (
          <motion.span key="d" initial={{ scale: 0.7 }} animate={{ scale: 1 }} className="flex items-center gap-2">
            <CheckCircle2 size={15} /> Report ready
          </motion.span>
        ) : (
          <motion.span key="i" className="flex items-center gap-2">
            <FileDown size={15} /> Generate report
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  );
}

function AdminContent() {
  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center justify-end">
        <ReportGenerator />
      </div>
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <LiveAnalytics />
        </div>
        <div className="lg:col-span-1">
          <ThreatFeed />
        </div>
      </div>
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <UserTable />
        </div>
        <div className="lg:col-span-1">
          <AuditLogs />
        </div>
      </div>
    </div>
  );
}

export default function AdminDashboard() {
  return (
    <DashboardLayout title="Admin Dashboard" subtitle="Platform-wide analytics, threat feed, and user oversight.">
      <AdminContent />
    </DashboardLayout>
  );
}
