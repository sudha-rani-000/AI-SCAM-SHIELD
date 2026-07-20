import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import ScrollReveal from "../ScrollReveal.jsx";

const FAQS = [
  {
    q: "How fast is a scan?",
    a: "Most links, emails, and QR codes return a verdict in under three seconds. Voice recordings take a little longer since they're analyzed for speech patterns, not just links.",
  },
  {
    q: "Do you store what I scan?",
    a: "Scanned content is processed to produce a result and then discarded. Only the risk verdict and a timestamp are kept in your scan history, not the original content.",
  },
  {
    q: "Can it be wrong?",
    a: "No detection system is perfect. We show a confidence score alongside every verdict so you can weigh it, and we're always retraining on newly reported scams.",
  },
  {
    q: "Is there a free plan?",
    a: "Yes — every account starts on the free plan, which includes unlimited URL and email scans. Voice and bulk scanning are part of the paid tier.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section id="faq" className="relative py-24">
      <div className="mx-auto max-w-3xl px-6">
        <ScrollReveal>
          <div className="text-center">
            <span className="font-mono text-xs uppercase tracking-widest text-cyan-glow">FAQ</span>
            <h2 className="mt-3 font-display text-3xl font-semibold text-ink-primary">
              Questions, answered plainly
            </h2>
          </div>
        </ScrollReveal>

        <div className="mt-10 flex flex-col gap-3">
          {FAQS.map((item, i) => {
            const open = openIndex === i;
            return (
              <ScrollReveal key={item.q} delay={i * 0.05}>
                <div className="overflow-hidden rounded-xl border border-white/10 bg-white/[0.03]">
                  <button
                    onClick={() => setOpenIndex(open ? -1 : i)}
                    className="flex w-full items-center justify-between px-5 py-4 text-left"
                    aria-expanded={open}
                  >
                    <span className="font-body text-sm font-medium text-ink-primary">{item.q}</span>
                    <motion.span animate={{ rotate: open ? 45 : 0 }} transition={{ duration: 0.2 }}>
                      <Plus size={16} className="text-cyan-glow" />
                    </motion.span>
                  </button>
                  <AnimatePresence initial={false}>
                    {open && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: "easeInOut" }}
                      >
                        <p className="px-5 pb-4 font-body text-sm leading-relaxed text-ink-muted">
                          {item.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
