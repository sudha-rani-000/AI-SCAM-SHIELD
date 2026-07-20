import { Link2, Mail, QrCode, Mic, Globe2, ScanSearch } from "lucide-react";

export const HISTORY = [
  { id: 1, type: "url", icon: Link2, label: "URL Scan", target: "amaz0n-rewards-claim.com", verdict: "Dangerous", date: "2026-07-19T14:32:00" },
  { id: 2, type: "email", icon: Mail, label: "Email Scan", target: "billing@paypa1-support.com", verdict: "Scam", date: "2026-07-19T11:05:00" },
  { id: 3, type: "website", icon: Globe2, label: "Website Scan", target: "official-northface-store.com", verdict: "Safe", date: "2026-07-18T20:14:00" },
  { id: 4, type: "qr", icon: QrCode, label: "QR Scan", target: "menu.restaurant-app.com", verdict: "Safe", date: "2026-07-18T09:47:00" },
  { id: 5, type: "voice", icon: Mic, label: "Voice Scan", target: "+1 (302) 555-0199", verdict: "Dangerous", date: "2026-07-17T16:22:00" },
  { id: 6, type: "message", icon: ScanSearch, label: "AI Scam Scanner", target: "\"You've won a $500 gift card, claim now…\"", verdict: "Scam", date: "2026-07-17T08:03:00" },
  { id: 7, type: "url", icon: Link2, label: "URL Scan", target: "secure-login-verify-update.top", verdict: "Suspicious", date: "2026-07-16T19:41:00" },
  { id: 8, type: "email", icon: Mail, label: "Email Scan", target: "no-reply@irs-refund-claim.net", verdict: "Scam", date: "2026-07-16T13:12:00" },
  { id: 9, type: "website", icon: Globe2, label: "Website Scan", target: "chase-secure-verify.com", verdict: "Dangerous", date: "2026-07-15T10:55:00" },
  { id: 10, type: "qr", icon: QrCode, label: "QR Scan", target: "wallet-claim-reward.top/pay", verdict: "Dangerous", date: "2026-07-14T17:30:00" },
  { id: 11, type: "voice", icon: Mic, label: "Voice Scan", target: "+1 (800) 555-0142", verdict: "Safe", date: "2026-07-14T12:08:00" },
  { id: 12, type: "message", icon: ScanSearch, label: "AI Scam Scanner", target: "\"Your package could not be delivered, confirm address…\"", verdict: "Suspicious", date: "2026-07-13T09:21:00" },
];

export const HISTORY_TYPES = ["all", "url", "email", "website", "qr", "voice", "message"];
export const HISTORY_VERDICTS = ["all", "Safe", "Suspicious", "Dangerous", "Scam"];
