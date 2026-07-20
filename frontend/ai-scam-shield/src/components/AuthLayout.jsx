import { motion } from "framer-motion";
import { ShieldCheck } from "lucide-react";
import CyberGridBackground from "./CyberGridBackground.jsx";
import FloatingParticles from "./FloatingParticles.jsx";
import ShieldEmblem from "./ShieldEmblem.jsx";
import LiveStatCounter from "./LiveStatCounter.jsx";

const pageTransition = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: 0.35, ease: "easeInOut" },
};

export default function AuthLayout({ children, shieldProgress = 1, tagline }) {
  return (
    <motion.div
      {...pageTransition}
      className="relative flex min-h-screen w-full overflow-hidden bg-void"
    >
      {/* Brand panel */}
      <div className="relative hidden w-[46%] flex-col justify-between overflow-hidden border-r border-white/5 px-12 py-10 lg:flex">
        <CyberGridBackground />
        <FloatingParticles count={14} />

        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative z-10 flex items-center gap-2"
        >
          <ShieldCheck className="text-cyan-glow" size={22} />
          <span className="font-display text-lg font-semibold tracking-wide">AI Scam Shield</span>
        </motion.div>

        <div className="relative z-10 flex flex-1 flex-col items-center justify-center gap-8">
          <ShieldEmblem progress={shieldProgress} />
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="max-w-sm text-center font-body text-sm leading-relaxed text-ink-muted"
          >
            {tagline}
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="relative z-10"
        >
          <LiveStatCounter />
        </motion.div>
      </div>

      {/* Form panel */}
      <div className="relative flex w-full flex-1 items-center justify-center px-6 py-12 lg:w-[54%]">
        <div className="pointer-events-none absolute inset-0 lg:hidden">
          <CyberGridBackground />
        </div>
        <div className="relative z-10 w-full max-w-sm">{children}</div>
      </div>
    </motion.div>
  );
}
