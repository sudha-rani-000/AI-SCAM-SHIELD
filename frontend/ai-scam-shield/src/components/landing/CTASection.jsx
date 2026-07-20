import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import ScrollReveal from "../ScrollReveal.jsx";
import ShieldEmblem from "../ShieldEmblem.jsx";

export default function CTASection() {
  return (
    <section className="relative overflow-hidden py-24">
      <div className="mx-auto max-w-4xl px-6 text-center">
        <ScrollReveal>
          <div className="mx-auto mb-6 flex justify-center opacity-80">
            <ShieldEmblem progress={1} size={100} />
          </div>
          <h2 className="font-display text-3xl font-semibold text-ink-primary sm:text-4xl">
            Your shield is one signup away
          </h2>
          <p className="mx-auto mt-4 max-w-md font-body text-base text-ink-muted">
            Free to start, no card required. Set it up in under a minute.
          </p>
          <Link
            to="/signup"
            className="mt-8 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-glow to-blue-neon px-7 py-3.5 font-display text-sm font-semibold text-void shadow-glow-blue transition-shadow hover:shadow-glow-cyan"
          >
            Create your free account
            <ArrowRight size={16} />
          </Link>
        </ScrollReveal>
      </div>
    </section>
  );
}
