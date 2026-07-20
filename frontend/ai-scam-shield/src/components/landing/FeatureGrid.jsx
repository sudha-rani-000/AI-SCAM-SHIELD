import { Link2, Globe2, QrCode, Mail, Mic, Bot } from "lucide-react";
import ScrollReveal from "../ScrollReveal.jsx";
import FeatureCard from "./FeatureCard.jsx";

const FEATURES = [
  {
    icon: Link2,
    title: "URL Scanner",
    description: "Paste any link to check it against live threat intelligence before you open it.",
    accent: "#22D3EE",
  },
  {
    icon: Globe2,
    title: "Website Scanner",
    description: "Detect cloned checkout pages and fake login forms before you type a password.",
    accent: "#3B82F6",
  },
  {
    icon: QrCode,
    title: "QR Scanner",
    description: "Decode a QR code first, see where it actually leads, then decide.",
    accent: "#8B5CF6",
  },
  {
    icon: Mail,
    title: "Email Scanner",
    description: "Flags spoofed senders, malicious attachments, and suspicious links inline.",
    accent: "#22D3EE",
  },
  {
    icon: Mic,
    title: "Voice Scam Scanner",
    description: "Analyzes call recordings for the pressure tactics scammers rely on.",
    accent: "#3B82F6",
  },
  {
    icon: Bot,
    title: "AI Cyber Assistant",
    description: "Ask it to explain any flagged message in plain language, any time.",
    accent: "#8B5CF6",
  },
];

export default function FeatureGrid() {
  return (
    <section id="features" className="relative py-24">
      <div className="mx-auto max-w-6xl px-6">
        <ScrollReveal>
          <div className="mx-auto max-w-xl text-center">
            <span className="font-mono text-xs uppercase tracking-widest text-cyan-glow">
              Six ways in, one shield
            </span>
            <h2 className="mt-3 font-display text-3xl font-semibold text-ink-primary">
              Every doorway a scam uses, covered
            </h2>
          </div>
        </ScrollReveal>

        <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((feature, i) => (
            <ScrollReveal key={feature.title} delay={i * 0.06}>
              <FeatureCard {...feature} />
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
