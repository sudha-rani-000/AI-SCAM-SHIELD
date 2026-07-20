import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Search } from "lucide-react";
import NotificationsDropdown from "./NotificationsDropdown.jsx";

export default function Topbar({
  title = "Overview",
  subtitle = "Here's what your shield caught today.",
}) {
  return (
    <motion.header
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="flex items-center justify-between border-b border-white/5 px-6 py-4 lg:px-8"
    >
      <div>
        <h1 className="font-display text-xl font-semibold text-ink-primary">{title}</h1>
        <p className="font-body text-sm text-ink-muted">{subtitle}</p>
      </div>

      <div className="flex items-center gap-3">
        <div className="hidden items-center gap-2 rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2 sm:flex">
          <Search size={16} className="text-ink-faint" />
          <input
            type="text"
            placeholder="Search scans, senders, domains…"
            className="w-56 bg-transparent font-body text-sm text-ink-primary placeholder:text-ink-faint focus:outline-none"
          />
        </div>

        <NotificationsDropdown />

        <Link
          to="/dashboard/profile"
          className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-cyan-glow to-violet-glow font-display text-sm font-semibold text-void transition-transform hover:scale-105"
        >
          MR
        </Link>
      </div>
    </motion.header>
  );
}
