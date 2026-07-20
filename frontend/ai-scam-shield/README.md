# AI Scam Shield — Landing, Auth & Dashboard

A dark, glassmorphic marketing site, auth flow, and dashboard for the AI
Scam Shield platform, built with React, Vite, Tailwind CSS, Framer Motion,
and Recharts.

## What's here

- **`/`** — landing page: typing-effect hero, radar-sweep shield visual,
  count-up stats, a scroll-revealed feature grid (with pointer-tracked 3D
  tilt on hover), a 3-step "how it works," a rotating testimonial, an FAQ
  accordion, and a footer.
- **`/login`** — email/password sign-in, animated inputs, error-shake
  validation, ripple + loading/success button states, redirects into the
  dashboard on success.
- **`/signup`** — name/email/password, live password-strength meter, terms
  checkbox, same redirect on success.
- **`/dashboard`** — animated sidebar with a sliding active-item indicator,
  a topbar with search and a notification dropdown, an AI Security Score
  gauge, 7 live-counting stat cards (scans, threats, safe sites, suspicious
  URLs, email/QR/voice threats), a weekly scan-volume area chart, a threat
  distribution donut chart, a threat timeline, a live-updating activity
  feed, quick-scan buttons that fire real toast notifications, and loading
  skeletons on both charts before they draw in.
- **`/dashboard/scam-scanner`** — paste any email, SMS, or chat message and
  get a verdict. Runs a real (if simple) client-side heuristic detector —
  not mocked random numbers — that scores the text against known scam
  language patterns. The scan sequence is: a scan beam sweeps the input →
  a radar with a rotating sweep and live progress ring takes over → a
  colored burst animation marks completion → the full result card reveals
  with a staggered entrance (verdict, confidence ring, threat-level meter,
  AI explanation, indicator cards, and recommendation cards). Includes a
  scan-history preview in the sidebar.
- **`/dashboard/url`** — validates and normalizes any URL, then scores it
  against phishing-style structural patterns (HTTPS, raw IPs, punycode,
  shorteners, hyphenated/impersonation-style domains, suspicious TLDs).
  Shows an HTTPS badge, a trust-score ring, a threat gauge, a domain-info
  breakdown, and the same indicator/recommendation cards used by the AI
  Scam Scanner, plus a recently-scanned-URLs sidebar.
- **Signature element** — a shield emblem drawn from converging network
  lines. It assembles as the signup password gets stronger, sits inside a
  rotating radar sweep in the landing hero, and reappears at full glow
  above the final call-to-action.
- Reduced-motion support and visible focus rings baked into `index.css`.

## Running it

This code was written and reviewed in an offline sandbox, so dependencies
haven't been installed or build-tested here — do that on your machine:

```bash
npm install
npm run dev
```

Then open the printed local URL (default `http://localhost:5173`) and visit
`/login` or `/signup`.

## Structure

```
src/
  components/
    AnimatedInput.jsx        floating-label input with focus glow + error shake
    AuthLayout.jsx           split-screen shell shared by Login and Signup
    CyberGridBackground.jsx  perspective grid + horizon glow
    FloatingParticles.jsx    ambient drifting dots
    GlassCard.jsx            frosted glass card wrapper
    LiveStatCounter.jsx      ticking "threats blocked" stat (auth panel)
    MouseGlow.jsx            cursor-follow glow (landing page)
    ScrollReveal.jsx         fade+lift-into-view wrapper for landing sections
    TypingText.jsx           typewriter effect for the hero headline
    PasswordStrengthMeter.jsx
    PrimaryButton.jsx        ripple + loading/success button
    ShieldEmblem.jsx         the signature shield visual
    landing/
      Navbar.jsx, Hero.jsx, RadarSweep.jsx, FloatingSecurityIcons.jsx,
      StatsBar.jsx, AnimatedCounter.jsx, FeatureGrid.jsx, FeatureCard.jsx,
      HowItWorks.jsx, Testimonials.jsx, FAQ.jsx, CTASection.jsx, Footer.jsx
    dashboard/
      DashboardLayout.jsx   shared sidebar+topbar+toast shell for every dashboard page
      Sidebar.jsx, Topbar.jsx, NotificationsDropdown.jsx, RiskMeter.jsx,
      CircularProgress.jsx, StatCard.jsx, WeeklyScanChart.jsx,
      ThreatDistributionChart.jsx, ThreatTimeline.jsx, ActivityFeed.jsx,
      QuickScanButtons.jsx, ToastContainer.jsx, Skeleton.jsx
    scanner/
      ScanInputCard.jsx, ScanBeam.jsx, ScanRadar.jsx, ScanCompleteBurst.jsx,
      AIThinkingText.jsx, ThreatLevelMeter.jsx, ScamIndicatorsList.jsx,
      RecommendationsList.jsx, ScanResultCard.jsx, ScanHistoryPreview.jsx
    urlscanner/
      URLInputCard.jsx, ScanProgressBar.jsx, VerificationSteps.jsx,
      HTTPSBadge.jsx, TrustGauge.jsx, DomainInfoCard.jsx, URLResultCard.jsx,
      RecentScannedURLs.jsx
  pages/
    Landing.jsx
    Login.jsx
    Signup.jsx
    Dashboard.jsx
    ScamScanner.jsx
    URLScanner.jsx
  lib/
    utils.js          classnames + password scoring helpers
    scamDetector.js   heuristic scam-language scorer used by the AI Scam Scanner
    urlAnalyzer.js    heuristic URL/domain risk scorer used by the URL Scanner
    ToastContext.jsx  toast notification provider/hook used across the dashboard
```

## Notes on the dashboard

- The sidebar links to `/dashboard/email`, `/dashboard/qr`, etc. for the
  remaining individual scanner pages — those routes aren't built yet (the
  AI Scam Scanner and URL Scanner are), so those links won't resolve until
  the corresponding pages and routes are added.
- All chart, stat, and activity data is local mock data generated in each
  component. Swap the arrays at the top of `WeeklyScanChart.jsx`,
  `ThreatDistributionChart.jsx`, `ActivityFeed.jsx`, `ThreatTimeline.jsx`,
  and the `STATS` array in `Dashboard.jsx` for real API data when ready.
- `scamDetector.js` and `urlAnalyzer.js` are genuine rule-based scorers
  (regex/structural pattern matching + weighted scoring), not placeholder
  output — but they're first-pass heuristics, not trained models or live
  threat-feed lookups. Swap `scanText()` / `analyzeUrl()` for a real API
  call when you have a backend model or threat-intel service to call.
- `ScamIndicatorsList.jsx` and `RecommendationsList.jsx` (in `scanner/`)
  are shared between the AI Scam Scanner and the URL Scanner — both take
  the same generic `{ id, label, tip }` / string-array shapes, so any
  future scanner page can reuse them too.

## Next pieces

This covers the landing page, auth flow, dashboard overview, the AI Scam
Scanner, and the URL Scanner. The website/QR/email/voice scanner pages,
scan history, profile/settings, and admin dashboard can be built the same
way, reusing `GlassCard`, `AnimatedInput`, `PrimaryButton`, `ScrollReveal`,
`Skeleton`, `ToastContext`, `DashboardLayout`, and the background
components already in place here.
