export function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

/**
 * Scores a password 0-4 based on length and character variety.
 * This is a lightweight heuristic for UI feedback only —
 * real strength enforcement should happen server-side.
 */
export function scorePassword(password) {
  if (!password) return 0;

  let score = 0;
  const lengthPoints = Math.min(2, Math.floor(password.length / 5));
  score += lengthPoints;

  const varietyChecks = [/[a-z]/, /[A-Z]/, /[0-9]/, /[^a-zA-Z0-9]/];
  const varietyHits = varietyChecks.filter((re) => re.test(password)).length;
  score += Math.min(2, Math.floor(varietyHits / 2));

  return Math.max(0, Math.min(4, score));
}

export const STRENGTH_LABELS = ["Too weak", "Weak", "Fair", "Strong", "Very strong"];
export const STRENGTH_COLORS = ["#F43F5E", "#F43F5E", "#F59E0B", "#22D3EE", "#34D399"];
