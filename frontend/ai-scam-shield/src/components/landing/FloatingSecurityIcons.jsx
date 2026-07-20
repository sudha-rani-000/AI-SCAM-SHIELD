import { motion } from "framer-motion";
import { Mail, Phone, QrCode, Globe, Lock } from "lucide-react";

const ICONS = [
  { Icon: Mail, top: "8%", left: "6%", delay: 0 },
  { Icon: Phone, top: "68%", left: "2%", delay: 0.4 },
  { Icon: QrCode, top: "78%", left: "82%", delay: 0.8 },
  { Icon: Globe, top: "4%", left: "84%", delay: 1.2 },
  { Icon: Lock, top: "42%", left: "92%", delay: 1.6 },
];

export default function FloatingSecurityIcons() {
  return (
    <div className="pointer-events-none absolute inset-0" aria-hidden="true">
      {ICONS.map(({ Icon, top, left, delay }, i) => (
        <motion.div
          key={i}
          className="absolute flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] backdrop-blur-md"
          style={{ top, left }}
          animate={{ y: [0, -14, 0] }}
          transition={{ duration: 5 + i, delay, repeat: Infinity, ease: "easeInOut" }}
        >
          <Icon size={18} className="text-cyan-glow/80" />
        </motion.div>
      ))}
    </div>
  );
}
