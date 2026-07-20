import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Quote } from "lucide-react";
import ScrollReveal from "../ScrollReveal.jsx";

const TESTIMONIALS = [
  {
    quote:
      "Caught a fake delivery text before I clicked it. Ten seconds and it told me exactly why it was suspicious.",
    name: "Priya N.",
    role: "Small business owner",
  },
  {
    quote:
      "My dad forwards me every suspicious email now — this catches the ones I'd have missed too.",
    name: "Marcus T.",
    role: "IT support lead",
  },
  {
    quote:
      "The voice scanner flagged a call claiming to be my bank within the first fifteen seconds.",
    name: "Elena R.",
    role: "Freelance designer",
  },
];

export default function Testimonials() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setIndex((i) => (i + 1) % TESTIMONIALS.length), 5000);
    return () => clearInterval(timer);
  }, []);

  const current = TESTIMONIALS[index];

  return (
    <section id="reviews" className="relative py-24">
      <div className="mx-auto max-w-2xl px-6 text-center">
        <ScrollReveal>
          <Quote className="mx-auto mb-6 text-violet-glow" size={28} />
          <div className="relative min-h-[140px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.4 }}
              >
                <p className="font-display text-xl leading-relaxed text-ink-primary sm:text-2xl">
                  "{current.quote}"
                </p>
                <p className="mt-4 font-body text-sm text-ink-muted">
                  {current.name} · {current.role}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="mt-6 flex justify-center gap-2">
            {TESTIMONIALS.map((_, i) => (
              <button
                key={i}
                aria-label={`Show testimonial ${i + 1}`}
                onClick={() => setIndex(i)}
                className={`h-1.5 rounded-full transition-all ${
                  i === index ? "w-6 bg-cyan-glow" : "w-1.5 bg-white/15"
                }`}
              />
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
