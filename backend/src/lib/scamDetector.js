/**
 * Server-side port of src/lib/scamDetector.js from the frontend.
 * Same heuristic, weighted rule-based scorer — kept identical so results
 * match what the client previously computed on its own. Running it here
 * lets scans be persisted per-user instead of staying client-only.
 */

const INDICATORS = [
  {
    id: "urgency",
    label: "Urgency or time pressure",
    pattern:
      /\b(act now|immediately|urgent(ly)?|right away|within\s+\d+\s*(hours?|minutes?|days?)|expires?\s+(today|soon)|last chance|final notice)\b/i,
    weight: 15,
    tip: "Scammers create false deadlines so you act before thinking it through.",
  },
  {
    id: "payment-method",
    label: "Unusual payment request",
    pattern:
      /\b(gift card|itunes card|wire transfer|bitcoin|crypto(currency)?|western union|money ?gram|prepaid (card|debit))\b/i,
    weight: 28,
    tip: "Legitimate organizations never ask for payment via gift cards or crypto.",
  },
  {
    id: "credential-request",
    label: "Requests login details or personal info",
    pattern:
      /\b(verify your account|confirm your password|log ?in to your account|update your (payment|billing) (info|details)|social security number|ssn|routing number|account number|one[- ]time (code|password)|otp)\b/i,
    weight: 26,
    tip: 'No legitimate service asks you to "verify" your password or send a one-time code.',
  },
  {
    id: "too-good",
    label: "Too-good-to-be-true offer",
    pattern:
      /\b(you('| ha)ve won|congratulations,? you|claim your prize|free (iphone|gift|money|reward)|lottery|you('re| are) selected)\b/i,
    weight: 22,
    tip: "Unsolicited prizes you never entered to win are a classic lure.",
  },
  {
    id: "threat",
    label: "Threat of an account or legal consequence",
    pattern:
      /\b(account (will be |has been )?(suspended|closed|terminated|locked)|legal action|arrest warrant|irs|tax debt|court (order|summons)|failure to (comply|respond))\b/i,
    weight: 22,
    tip: "Real companies don't threaten immediate suspension over email or text.",
  },
  {
    id: "link-pressure",
    label: "Pressure to click a link immediately",
    pattern: /\b(click here|click the link below|verify now|confirm now|tap (this|here)|follow this link)\b/i,
    weight: 12,
    tip: "Hover over or long-press links to preview the real destination before tapping.",
  },
  {
    id: "generic-greeting",
    label: "Generic greeting instead of your name",
    pattern: /\b(dear customer|dear (valued )?user|dear account holder|dear sir\/madam)\b/i,
    weight: 8,
    tip: "Companies you have an account with usually address you by name.",
  },
  {
    id: "brand-impersonation",
    label: "Mentions a known brand alongside a security warning",
    pattern:
      /\b(paypal|amazon|apple|microsoft|netflix|bank of america|wells fargo|chase|irs|social security administration)\b/i,
    weight: 10,
    tip: "Check the sender's actual email domain — impersonators rarely match it exactly.",
  },
  {
    id: "attachment-mention",
    label: "References an unexpected attachment or invoice",
    pattern: /\b(invoice attached|see attached|open the attachment|download (the|your) (file|invoice|document))\b/i,
    weight: 14,
    tip: "Unexpected invoices or attachments are a common malware delivery method.",
  },
];

export function scanText(rawText) {
  const text = (rawText || "").trim();
  const matched = INDICATORS.filter((indicator) => indicator.pattern.test(text));

  const rawScore = matched.reduce((sum, indicator) => sum + indicator.weight, 0);
  const score = Math.max(0, Math.min(100, rawScore));

  let verdict = "Safe";
  if (score >= 55) verdict = "Scam";
  else if (score >= 25) verdict = "Suspicious";

  const lengthSignal = Math.min(20, Math.floor(text.length / 40));
  let confidence;
  if (matched.length === 0) {
    confidence = Math.min(90, 55 + lengthSignal);
  } else {
    confidence = Math.min(97, 62 + matched.length * 7 + lengthSignal / 2);
  }

  const explanation = buildExplanation(verdict, matched, text.length);
  const recommendations = buildRecommendations(verdict, matched);

  return {
    verdict,
    score,
    confidence: Math.round(confidence),
    indicators: matched.map(({ id, label, tip, weight }) => ({ id, label, tip, weight })),
    recommendations,
    explanation,
  };
}

function buildExplanation(verdict, matched, textLength) {
  if (textLength === 0) {
    return "Paste a message to analyze — there's nothing to scan yet.";
  }

  if (matched.length === 0) {
    return "This message doesn't match any of the scam patterns we check for — no urgency language, payment requests, credential harvesting, or threats detected. That's a good sign, but it doesn't guarantee the sender is who they claim to be. When in doubt, verify through an official channel.";
  }

  const labels = matched.map((m) => m.label.toLowerCase());
  const list =
    labels.length === 1
      ? labels[0]
      : labels.slice(0, -1).join(", ") + ", and " + labels[labels.length - 1];

  if (verdict === "Scam") {
    return `This message shows strong signs of a scam: ${list}. These patterns together are a strong match for known fraud tactics — treat any links, attachments, or payment requests in it as unsafe.`;
  }

  if (verdict === "Suspicious") {
    return `This message contains some concerning language: ${list}. It's not a clear-cut scam, but these are patterns worth treating with caution — verify the sender before acting on anything it asks for.`;
  }

  return `This message triggered a minor signal — ${list} — but not enough on its own to call it suspicious. Worth keeping in mind, though it's not a strong reason for concern by itself.`;
}

function buildRecommendations(verdict, matched) {
  const base = [];

  if (verdict === "Scam") {
    base.push(
      "Don't click any links, open attachments, or reply to this message.",
      "Don't send money, gift cards, or verification codes to the sender.",
      "Report the message to your email or phone provider, then delete it.",
      "If it impersonates a company you use, contact that company directly through their official site or app."
    );
  } else if (verdict === "Suspicious") {
    base.push(
      "Don't click any links until you've verified the sender through another channel.",
      "Contact the supposed sender using a phone number or website you already trust — not one provided in the message.",
      "Watch for follow-up pressure to act quickly; that's a common escalation tactic."
    );
  } else {
    base.push(
      "No major red flags found, but always verify unexpected requests for money or personal information.",
      "If anything about the sender feels off, reach out to them through a channel you already trust."
    );
  }

  const tips = matched.slice(0, 3).map((m) => m.tip);
  return [...base, ...tips];
}
