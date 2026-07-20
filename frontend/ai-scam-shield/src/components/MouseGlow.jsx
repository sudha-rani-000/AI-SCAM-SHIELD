import { useEffect, useRef } from "react";

/**
 * Renders a single glowing div whose position is updated directly via
 * a ref + transform on pointer move — no React state/re-render per
 * mousemove, so this stays cheap even on a busy page.
 */
export default function MouseGlow() {
  const glowRef = useRef(null);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) return;

    function handleMove(e) {
      const el = glowRef.current;
      if (!el) return;
      el.style.transform = `translate(${e.clientX - 200}px, ${e.clientY - 200}px)`;
    }

    window.addEventListener("pointermove", handleMove, { passive: true });
    return () => window.removeEventListener("pointermove", handleMove);
  }, []);

  return (
    <div
      ref={glowRef}
      className="pointer-events-none fixed left-0 top-0 z-0 h-[400px] w-[400px] rounded-full opacity-[0.15] blur-[90px] will-change-transform"
      style={{
        background: "radial-gradient(circle, #22D3EE, #8B5CF6 60%, transparent 80%)",
      }}
      aria-hidden="true"
    />
  );
}
