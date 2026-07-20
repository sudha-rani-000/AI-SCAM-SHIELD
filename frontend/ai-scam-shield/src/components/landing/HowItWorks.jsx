import { ScanSearch, Brain, ShieldCheck } from "lucide-react";
import ScrollReveal from "../ScrollReveal.jsx";

const STEPS = [
  {
    number: "01",
    icon: ScanSearch,
    title: "Send it over",
    description: "Drop in a link, forward an email, upload a call recording, or scan a QR code.",
  },
  {
    number: "02",
    icon: Brain,
    title: "AI checks it in seconds",
    description: "Our models cross-reference threat databases and behavioral patterns in real time.",
  },
  {
    number: "03",
    icon: ShieldCheck,
    title: "Get a clear verdict",
    description: "A plain-language risk score and recommendation — no security jargon required.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="relative py-24">
      <div className="mx-auto max-w-6xl px-6">
        <ScrollReveal>
          <div className="mx-auto max-w-xl text-center">
            <span className="font-mono text-xs uppercase tracking-widest text-cyan-glow">
              How it works
            </span>
            <h2 className="mt-3 font-display text-3xl font-semibold text-ink-primary">
              Three steps between you and certainty
            </h2>
          </div>
        </ScrollReveal>

        <div className="mt-14 grid grid-cols-1 gap-8 md:grid-cols-3">
          {STEPS.map((step, i) => (
            <ScrollReveal key={step.number} delay={i * 0.1}>
              <div className="relative">
                <span className="font-mono text-5xl font-bold text-white/5">{step.number}</span>
                <div className="-mt-8 flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-cyan-glow">
                  <step.icon size={20} />
                </div>
                <h3 className="mt-4 font-display text-lg font-semibold text-ink-primary">
                  {step.title}
                </h3>
                <p className="mt-2 font-body text-sm leading-relaxed text-ink-muted">
                  {step.description}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
