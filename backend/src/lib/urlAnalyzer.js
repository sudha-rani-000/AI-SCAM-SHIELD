/**
 * Server-side port of src/lib/urlAnalyzer.js from the frontend.
 * Same structural heuristic scorer — no live threat-feed lookup, kept
 * identical to the client version so results match, but run here so
 * scans can be persisted per-user.
 */

const SUSPICIOUS_TLDS = [
  "zip", "top", "xyz", "click", "work", "loan", "review", "country",
  "kim", "gq", "ml", "cf", "tk", "icu", "cam", "quest",
];

const URL_SHORTENERS = [
  "bit.ly", "tinyurl.com", "t.co", "goo.gl", "is.gd", "ow.ly", "buff.ly",
  "rebrand.ly", "cutt.ly", "shorturl.at",
];

const BRAND_KEYWORDS = [
  "paypal", "amazon", "apple", "microsoft", "netflix", "google",
  "facebook", "instagram", "bankofamerica", "wellsfargo", "chase",
  "irs", "usps", "fedex", "dhl",
];

const SUSPICIOUS_PATH_KEYWORDS =
  /\b(verify|secure|login|signin|account|update|confirm|webscr|billing|suspended)\b/i;

export function analyzeUrl(rawInput) {
  const input = (rawInput || "").trim();
  if (!input) {
    return { valid: false, reason: "Enter a URL to scan." };
  }

  const candidate = /^[a-zA-Z][a-zA-Z0-9+.-]*:\/\//.test(input) ? input : `https://${input}`;

  let parsed;
  try {
    parsed = new URL(candidate);
  } catch {
    return { valid: false, reason: "That doesn't look like a valid URL." };
  }

  if (!/^https?:$/.test(parsed.protocol)) {
    return { valid: false, reason: "Only http and https URLs can be scanned." };
  }

  if (!parsed.hostname.includes(".") && parsed.hostname !== "localhost") {
    return { valid: false, reason: "Enter a full domain, e.g. example.com." };
  }

  const hostname = parsed.hostname.toLowerCase();
  const isIP = /^\d{1,3}(\.\d{1,3}){3}$/.test(hostname);
  const isPunycode = hostname.includes("xn--");
  const isShortener = URL_SHORTENERS.some((s) => hostname === s || hostname.endsWith(`.${s}`));
  const https = parsed.protocol === "https:";
  const labels = hostname.split(".");
  const tld = labels[labels.length - 1];
  const rootDomain = isIP ? hostname : labels.slice(-2).join(".");
  const subdomainCount = Math.max(0, labels.length - 2);
  const hyphenCount = (hostname.match(/-/g) || []).length;
  const fullUrl = parsed.toString();

  const indicators = [];

  if (!https) {
    indicators.push({
      id: "no-https",
      label: "No HTTPS encryption",
      tip: "Traffic to this site isn't encrypted, so any data submitted could be intercepted.",
      weight: 22,
    });
  }

  if (isIP) {
    indicators.push({
      id: "ip-host",
      label: "Uses a raw IP address instead of a domain",
      tip: "Legitimate sites almost always use a registered domain name, not a bare IP address.",
      weight: 28,
    });
  }

  if (isPunycode) {
    indicators.push({
      id: "punycode",
      label: "Punycode domain (possible lookalike characters)",
      tip: "Punycode can render as letters that look identical to a trusted brand's domain.",
      weight: 30,
    });
  }

  if (isShortener) {
    indicators.push({
      id: "shortener",
      label: "Shortened URL — real destination is hidden",
      tip: "Shorteners hide the actual domain. Expand it or hover before clicking to see the true destination.",
      weight: 15,
    });
  }

  if (SUSPICIOUS_TLDS.includes(tld)) {
    indicators.push({
      id: "suspicious-tld",
      label: `Uses a high-risk top-level domain (.${tld})`,
      tip: "This TLD is disproportionately used for throwaway phishing domains.",
      weight: 14,
    });
  }

  if (hyphenCount >= 3) {
    indicators.push({
      id: "many-hyphens",
      label: "Unusually many hyphens in the domain",
      tip: 'Long, hyphenated domains like "secure-account-verify-now.com" are a common phishing pattern.',
      weight: 12,
    });
  }

  if (subdomainCount >= 3) {
    indicators.push({
      id: "deep-subdomains",
      label: "Deeply nested subdomains",
      tip: "Scammers sometimes bury a brand name in a subdomain to make the URL look legitimate at a glance.",
      weight: 10,
    });
  }

  const mentionedBrand = BRAND_KEYWORDS.find((brand) => hostname.includes(brand));
  if (mentionedBrand && !rootDomain.startsWith(mentionedBrand)) {
    indicators.push({
      id: "brand-mismatch",
      label: `Mentions "${mentionedBrand}" outside the main domain name`,
      tip: `The root domain isn't ${mentionedBrand}'s own — this pattern is common in impersonation attempts.`,
      weight: 26,
    });
  }

  if (SUSPICIOUS_PATH_KEYWORDS.test(parsed.pathname + parsed.search) && (mentionedBrand || isShortener)) {
    indicators.push({
      id: "credential-path",
      label: "Path suggests a login or verification page",
      tip: "Combined with the domain pattern above, this looks built to harvest credentials.",
      weight: 16,
    });
  }

  if (fullUrl.length > 100) {
    indicators.push({
      id: "long-url",
      label: "Unusually long URL",
      tip: "Very long URLs are sometimes used to bury a suspicious domain or obscure a redirect chain.",
      weight: 8,
    });
  }

  const rawScore = indicators.reduce((sum, i) => sum + i.weight, 0);
  const score = Math.max(0, Math.min(100, rawScore));
  const trustScore = Math.max(0, 100 - score);

  let verdict = "Safe";
  if (score >= 55) verdict = "Dangerous";
  else if (score >= 25) verdict = "Suspicious";

  const explanation = buildExplanation(verdict, indicators, hostname, https);
  const recommendations = buildRecommendations(verdict, indicators);

  return {
    valid: true,
    url: fullUrl,
    hostname,
    rootDomain,
    protocol: parsed.protocol.replace(":", ""),
    path: parsed.pathname === "/" ? "" : parsed.pathname,
    hasQuery: parsed.search.length > 0,
    https,
    isIP,
    isPunycode,
    isShortener,
    subdomainCount,
    tld,
    score,
    trustScore,
    verdict,
    indicators,
    recommendations,
    explanation,
  };
}

function buildExplanation(verdict, indicators, hostname, https) {
  if (indicators.length === 0) {
    return `${hostname} doesn't match any of the structural red flags we check for — it uses ${
      https ? "a valid HTTPS connection" : "a standard connection"
    } and a normal domain pattern. That's a good sign, but it doesn't confirm the site's content or ownership. Stay cautious with anything it asks you to enter.`;
  }

  const labels = indicators.map((i) => i.label.toLowerCase());
  const list =
    labels.length === 1
      ? labels[0]
      : labels.slice(0, -1).join(", ") + ", and " + labels[labels.length - 1];

  if (verdict === "Dangerous") {
    return `${hostname} shows multiple strong risk signals: ${list}. This combination is a strong match for phishing infrastructure — avoid entering any information on this site.`;
  }

  if (verdict === "Suspicious") {
    return `${hostname} has some patterns worth a second look: ${list}. It's not a definitive scam signal on its own, but proceed carefully and avoid entering sensitive information until you're sure.`;
  }

  return `${hostname} triggered a minor signal — ${list} — but not enough on its own to call the site suspicious. Worth keeping in mind, though it's not a strong reason for concern by itself.`;
}

function buildRecommendations(verdict, indicators) {
  const base = [];

  if (verdict === "Dangerous") {
    base.push(
      "Don't enter any passwords, payment details, or personal information on this site.",
      "Close the tab and don't follow any further links from wherever you found this URL.",
      "If you already entered credentials, change that password immediately on the real site."
    );
  } else if (verdict === "Suspicious") {
    base.push(
      "Navigate to the site directly by typing the known domain yourself, instead of using this link.",
      "Avoid entering login credentials or payment info until you've verified the domain independently."
    );
  } else {
    base.push(
      "No major structural red flags, but always check that a login page's domain matches the real service exactly.",
      "Look for the padlock and verify the domain spelling before entering sensitive information."
    );
  }

  const tips = indicators.slice(0, 3).map((i) => i.tip);
  return [...base, ...tips];
}
