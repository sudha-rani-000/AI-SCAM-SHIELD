import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  ScanSearch,
  Link2,
  Globe2,
  QrCode,
  Mail,
  Mic,
  Bot,
  History,
  Settings,
  ShieldCheck,
  ChevronsLeft,
  User,
  LayoutGrid,
  LogOut,
} from "lucide-react";
import { cn } from "../../lib/utils.js";
import { useAuth } from "../../lib/AuthContext.jsx";

const BASE_NAV = [
  { label: "Overview", to: "/dashboard", icon: LayoutDashboard, end: true },
  { label: "AI Scam Scanner", to: "/dashboard/scam-scanner", icon: ScanSearch },
  { label: "URL Scanner", to: "/dashboard/url", icon: Link2 },
  { label: "Website Scanner", to: "/dashboard/website", icon: Globe2 },
  { label: "QR Scanner", to: "/dashboard/qr", icon: QrCode },
  { label: "Email Scanner", to: "/dashboard/email", icon: Mail },
  { label: "Voice Scanner", to: "/dashboard/voice", icon: Mic },
  { label: "AI Assistant", to: "/dashboard/assistant", icon: Bot },
  { label: "Scan History", to: "/dashboard/history", icon: History },
  { label: "Profile", to: "/dashboard/profile", icon: User },
];

const ADMIN_NAV_ITEM = { label: "Admin", to: "/dashboard/admin", icon: LayoutGrid };

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const { isAdmin, logout } = useAuth();
  const navigate = useNavigate();

  const NAV = isAdmin ? [...BASE_NAV, ADMIN_NAV_ITEM] : BASE_NAV;

  function handleLogout() {
    logout();
    navigate("/login");
  }

  return (
    <motion.aside
      initial={false}
      animate={{ width: collapsed ? 80 : 248 }}
      transition={{ duration: 0.25, ease: "easeInOut" }}
      className="relative hidden h-screen flex-col border-r border-white/5 bg-void-panel/60 py-6 backdrop-blur-xl lg:flex"
    >
      <div className={cn("flex items-center gap-2 px-5", collapsed && "justify-center px-0")}>
        <ShieldCheck className="shrink-0 text-cyan-glow" size={22} />
        {!collapsed && (
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="whitespace-nowrap font-display text-sm font-semibold text-ink-primary"
          >
            AI Scam Shield
          </motion.span>
        )}
      </div>

      <nav className="mt-8 flex flex-1 flex-col gap-1 px-3">
        {NAV.map((item) => (
          <NavLink key={item.to} to={item.to} end={item.end}>
            {({ isActive }) => (
              <div
                className={cn(
                  "relative flex items-center gap-3 rounded-lg px-3 py-2.5 font-body text-sm transition-colors",
                  isActive ? "text-ink-primary" : "text-ink-muted hover:text-ink-primary"
                )}
              >
                {isActive && (
                  <motion.div
                    layoutId="sidebar-active-pill"
                    className="absolute inset-0 rounded-lg bg-white/[0.06] shadow-glow-cyan"
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                )}
                <item.icon size={18} className={cn("relative shrink-0", isActive && "text-cyan-glow")} />
                {!collapsed && <span className="relative whitespace-nowrap">{item.label}</span>}
              </div>
            )}
          </NavLink>
        ))}
      </nav>

      <div className="px-3">
        <NavLink to="/dashboard/settings">
          <div className="flex items-center gap-3 rounded-lg px-3 py-2.5 font-body text-sm text-ink-muted transition-colors hover:text-ink-primary">
            <Settings size={18} className="shrink-0" />
            {!collapsed && <span>Settings</span>}
          </div>
        </NavLink>

        <button
          onClick={() => setCollapsed((c) => !c)}
          className="mt-2 flex w-full items-center gap-3 rounded-lg px-3 py-2.5 font-body text-sm text-ink-faint transition-colors hover:text-ink-primary"
        >
          <motion.span animate={{ rotate: collapsed ? 180 : 0 }} transition={{ duration: 0.25 }}>
            <ChevronsLeft size={18} />
          </motion.span>
          {!collapsed && <span>Collapse</span>}
        </button>

        <button
          onClick={handleLogout}
          className="mt-1 flex w-full items-center gap-3 rounded-lg px-3 py-2.5 font-body text-sm text-ink-faint transition-colors hover:text-danger"
        >
          <LogOut size={18} className="shrink-0" />
          {!collapsed && <span>Log out</span>}
        </button>
      </div>
    </motion.aside>
  );
}
