import ScrollReveal from "../ScrollReveal.jsx";
import AnimatedCounter from "./AnimatedCounter.jsx";

const STATS = [
  { target: 2400000, suffix: "+", label: "Scans completed" },
  { target: 99.7, suffix: "%", decimals: 1, label: "Detection accuracy*" },
  { target: 154, suffix: "", label: "Countries protected" },
  { target: 41000, suffix: "+", label: "Scams blocked this week" },
];

export default function StatsBar() {
  return (
    <section className="relative border-y border-white/5 bg-void-panel/40 py-12">
      <ScrollReveal>
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-8 px-6 sm:grid-cols-4">
          {STATS.map((stat) => (
            <AnimatedCounter key={stat.label} {...stat} />
          ))}
        </div>
        <p className="mt-8 text-center font-mono text-[11px] text-ink-faint">
          *Detection accuracy measured against a labeled benchmark set of known scam samples.
        </p>
      </ScrollReveal>
    </section>
  );
}
