import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, PlayCircle } from "lucide-react";
import CyberGridBackground from "../CyberGridBackground.jsx";
import FloatingParticles from "../FloatingParticles.jsx";
import ShieldEmblem from "../ShieldEmblem.jsx";
import RadarSweep from "./RadarSweep.jsx";
import FloatingSecurityIcons from "./FloatingSecurityIcons.jsx";
import TypingText from "../TypingText.jsx";

const SCAM_TYPES = ["phishing emails", "scam calls", "fake checkout links", "fraudulent QR codes"];

const PILLS = [
  { value: "2.4M+", label: "scans run" },
  { value: "99.7%", label: "detection accuracy" },
  { value: "24/7", label: "AI monitoring" },
];

export default function Hero() {
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden pt-24">
      <CyberGridBackground />
      <FloatingParticles count={20} />

      <div className="relative z-10 mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-12 px-6 lg:grid-cols-2">
        {/* Copy column */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 font-mono text-xs text-cyan-glow"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-success shadow-glow-cyan" />
            AI models updated 4 minutes ago
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-6 font-display text-4xl font-semibold leading-[1.1] text-ink-primary sm:text-5xl"
          >
            Stop{" "}
            <TypingText phrases={SCAM_TYPES} className="text-violet-glow" />
            <br />
            before they cost you.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-6 max-w-md font-body text-base leading-relaxed text-ink-muted"
          >
            AI Scam Shield scans your messages, links, calls, and QR codes in
            real time, flagging fraud before you ever click, answer, or pay.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-8 flex flex-wrap items-center gap-4"
          >
            <Link
              to="/signup"
              className="group inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-glow to-blue-neon px-6 py-3 font-display text-sm font-semibold text-void shadow-glow-blue transition-shadow hover:shadow-glow-cyan"
            >
              Get protected free
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </Link>
            <button className="inline-flex items-center gap-2 rounded-xl border border-white/10 px-6 py-3 font-display text-sm font-semibold text-ink-primary transition-colors hover:bg-white/[0.06]">
              <PlayCircle size={18} className="text-cyan-glow" />
              See it in action
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-12 flex flex-wrap gap-8"
          >
            {PILLS.map((pill) => (
              <div key={pill.label}>
                <div className="font-display text-2xl font-semibold text-ink-primary">{pill.value}</div>
                <div className="font-body text-xs text-ink-muted">{pill.label}</div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Visual column */}
        <div className="relative hidden h-[420px] items-center justify-center lg:flex">
          <RadarSweep />
          <FloatingSecurityIcons />
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative z-10"
          >
            <ShieldEmblem progress={1} size={220} />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
