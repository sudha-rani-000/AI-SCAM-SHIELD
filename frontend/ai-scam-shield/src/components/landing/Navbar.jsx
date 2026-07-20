import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ShieldCheck } from "lucide-react";
import { cn } from "../../lib/utils.js";

const LINKS = [
  { label: "Features", href: "#features" },
  { label: "How it works", href: "#how-it-works" },
  { label: "Reviews", href: "#reviews" },
  { label: "FAQ", href: "#faq" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 12);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled ? "border-b border-white/10 bg-void/80 backdrop-blur-xl" : "bg-transparent"
      )}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link to="/" className="flex items-center gap-2">
          <ShieldCheck className="text-cyan-glow" size={22} />
          <span className="font-display text-base font-semibold tracking-wide">AI Scam Shield</span>
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="font-body text-sm text-ink-muted transition-colors hover:text-ink-primary"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/login"
            className="font-body text-sm text-ink-muted transition-colors hover:text-ink-primary"
          >
            Sign in
          </Link>
          <Link
            to="/signup"
            className="rounded-lg bg-gradient-to-r from-cyan-glow to-blue-neon px-4 py-2 font-display text-sm font-semibold text-void shadow-glow-blue transition-shadow hover:shadow-glow-cyan"
          >
            Get protected
          </Link>
        </div>
      </nav>
    </motion.header>
  );
}
