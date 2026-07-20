import { motion } from "framer-motion";

export default function ScanProgressBar({ progress }) {
  return (
    <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/5">
      <motion.div
        className="h-full rounded-full bg-gradient-to-r from-cyan-glow via-blue-neon to-violet-glow"
        style={{ width: `${progress}%` }}
        transition={{ ease: "linear" }}
      />
    </div>
  );
}
