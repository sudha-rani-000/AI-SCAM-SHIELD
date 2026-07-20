import { ScanSearch, ShieldAlert, Globe2, Link2, Mail, QrCode, Mic } from "lucide-react";
import DashboardLayout from "../components/dashboard/DashboardLayout.jsx";
import RiskMeter from "../components/dashboard/RiskMeter.jsx";
import StatCard from "../components/dashboard/StatCard.jsx";
import WeeklyScanChart from "../components/dashboard/WeeklyScanChart.jsx";
import ThreatDistributionChart from "../components/dashboard/ThreatDistributionChart.jsx";
import ThreatTimeline from "../components/dashboard/ThreatTimeline.jsx";
import ActivityFeed from "../components/dashboard/ActivityFeed.jsx";
import QuickScanButtons from "../components/dashboard/QuickScanButtons.jsx";

const STATS = [
  { icon: ScanSearch, label: "Total scans", target: 18420, suffix: "", trend: 12, accent: "#22D3EE" },
  { icon: ShieldAlert, label: "Threats blocked", target: 1284, suffix: "", trend: 8, accent: "#F43F5E" },
  { icon: Globe2, label: "Safe websites", target: 15960, suffix: "", trend: 5, accent: "#34D399" },
  { icon: Link2, label: "Suspicious URLs", target: 612, suffix: "", trend: -4, accent: "#F59E0B" },
  { icon: Mail, label: "Email threats", target: 347, suffix: "", trend: 3, accent: "#3B82F6" },
  { icon: QrCode, label: "QR threats", target: 89, suffix: "", trend: -9, accent: "#8B5CF6" },
  { icon: Mic, label: "Voice scam alerts", target: 54, suffix: "", trend: 15, accent: "#F43F5E" },
];

export default function Dashboard() {
  return (
    <DashboardLayout title="Overview" subtitle="Here's what your shield caught today.">
      {/* AI Security Score + core stats */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <RiskMeter score={87} />
        {STATS.map((stat, i) => (
          <StatCard key={stat.label} {...stat} delay={0.05 + i * 0.04} />
        ))}
      </div>

      {/* Charts + quick actions */}
      <div className="mt-5 grid grid-cols-1 gap-5 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <WeeklyScanChart />
        </div>
        <QuickScanButtons />
      </div>

      {/* Distribution, timeline, live activity */}
      <div className="mt-5 grid grid-cols-1 gap-5 lg:grid-cols-3">
        <ThreatDistributionChart />
        <ThreatTimeline />
        <ActivityFeed />
      </div>
    </DashboardLayout>
  );
}
