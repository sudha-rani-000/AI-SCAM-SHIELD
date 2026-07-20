export default function Skeleton({ className = "" }) {
  return (
    <div
      className={`animate-shimmer rounded-lg bg-gradient-to-r from-white/[0.03] via-white/[0.08] to-white/[0.03] bg-[length:200%_100%] ${className}`}
    />
  );
}
