# AI Scam Shield — Frontend

React + Vite dashboard for AI Scam Shield: landing page, auth, and the
message/URL/website/QR/email/voice scanning UI, talking to the
[backend API](../../backend/README.md).

---

## 🧱 Tech Stack

- **React 18** — UI
- **Vite** — dev server & build tool
- **React Router** — client-side routing between pages
- **Tailwind CSS** — styling
- **Framer Motion** — page/element animations (radar sweep, scan beam, etc.)
- **Recharts** — dashboard charts
- **Lucide React** — icon set

---

## 🖥️ Pages

| Page | Description |
|---|---|
| Landing | Animated hero, live stats, feature grid, FAQ, testimonials |
| Sign up / Log in | Auth with a live password-strength meter on signup |
| Dashboard Overview | AI security score gauge, total scans, threats blocked, safe-website count |
| AI Scam Scanner | Paste a message, get an animated risk-scored verdict |
| URL Scanner | Check a URL's structure for phishing indicators, with recent scans list |
| Website Scanner | Live site preview + structural threat report (HTTPS, impersonation, shorteners) |
| QR Scanner | Scan a QR code, run the decoded content through the scanners |
| Email Scanner | Analyze email content/headers for phishing indicators |
| Voice Scanner | Analyze call/voice content for scam indicators |
| AI Assistant | Conversational helper for scam-related questions |
| Scan History | Searchable log of past scans |
| Profile & Settings | Account management |

---

## 🚀 Setup Process

### 1. Install dependencies
```bash
cd frontend/ai-scam-shield
npm install
```

### 2. Configure the backend URL (if applicable)
If the app reads the API URL from an environment variable, create a
`.env` file in this folder:
```env
VITE_API_URL=http://localhost:4000
```
Vite only exposes variables prefixed with `VITE_` to the client.

### 3. Start the backend first
Make sure the [backend](../../backend/README.md) is running (default
`http://localhost:4000`) so auth and scanning requests succeed.

### 4. Run the dev server
```bash
npm run dev
```
Opens on `http://localhost:5173`.

### 5. Build for production
```bash
npm run build      # outputs to dist/
npm run preview     # preview the production build locally
```

---

## 📄 Notes

Exact file/folder names inside `src/` (components, pages, hooks) aren't
documented here since they can change as the app evolves — check the
`src/` folder directly in the repo for the current structure.

