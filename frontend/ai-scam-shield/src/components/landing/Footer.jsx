import { ShieldCheck } from "lucide-react";
import ScrollReveal from "../ScrollReveal.jsx";

const COLUMNS = [
  {
    title: "Product",
    links: ["URL Scanner", "Email Scanner", "QR Scanner", "Voice Scanner", "AI Assistant"],
  },
  {
    title: "Company",
    links: ["About", "Careers", "Blog", "Contact"],
  },
  {
    title: "Legal",
    links: ["Privacy Policy", "Terms of Service", "Security"],
  },
];

export default function Footer() {
  return (
    <footer className="relative border-t border-white/5 py-16">
      <div className="mx-auto max-w-6xl px-6">
        <ScrollReveal>
          <div className="grid grid-cols-2 gap-10 sm:grid-cols-4">
            <div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="text-cyan-glow" size={20} />
                <span className="font-display text-sm font-semibold text-ink-primary">
                  AI Scam Shield
                </span>
              </div>
              <p className="mt-3 max-w-[200px] font-body text-sm text-ink-muted">
                Real-time AI protection against phishing, scam calls, and fraudulent sites.
              </p>
            </div>

            {COLUMNS.map((col) => (
              <div key={col.title}>
                <h4 className="font-display text-sm font-semibold text-ink-primary">{col.title}</h4>
                <ul className="mt-3 flex flex-col gap-2">
                  {col.links.map((link) => (
                    <li key={link}>
                      <a
                        href="#"
                        className="font-body text-sm text-ink-muted transition-colors hover:text-cyan-glow"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/5 pt-6 sm:flex-row">
            <p className="font-mono text-xs text-ink-faint">
              © {new Date().getFullYear()} AI Scam Shield. All rights reserved.
            </p>
            <p className="font-mono text-xs text-ink-faint">Built for a safer inbox.</p>
          </div>
        </ScrollReveal>
      </div>
    </footer>
  );
}
