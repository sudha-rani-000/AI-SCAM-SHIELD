import { useEffect, useState } from "react";

/**
 * Cycles through `phrases`, typing and deleting each one. Falls back
 * to just showing the first phrase statically if the user prefers
 * reduced motion, since the flicker of typing is itself a motion effect.
 */
export default function TypingText({ phrases, className, typeSpeed = 45, holdMs = 1600 }) {
  const [reduced, setReduced] = useState(false);
  const [text, setText] = useState("");
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  useEffect(() => {
    if (reduced) {
      setText(phrases[0]);
      return;
    }

    const current = phrases[phraseIndex % phrases.length];
    let timeout;

    if (!deleting && text.length < current.length) {
      timeout = setTimeout(() => setText(current.slice(0, text.length + 1)), typeSpeed);
    } else if (!deleting && text.length === current.length) {
      timeout = setTimeout(() => setDeleting(true), holdMs);
    } else if (deleting && text.length > 0) {
      timeout = setTimeout(() => setText(current.slice(0, text.length - 1)), typeSpeed / 1.6);
    } else if (deleting && text.length === 0) {
      setDeleting(false);
      setPhraseIndex((i) => i + 1);
    }

    return () => clearTimeout(timeout);
  }, [text, deleting, phraseIndex, phrases, reduced, typeSpeed, holdMs]);

  return (
    <span className={className}>
      {text}
      {!reduced && <span className="ml-0.5 inline-block w-[2px] animate-pulseGlow bg-cyan-glow">&nbsp;</span>}
    </span>
  );
}
