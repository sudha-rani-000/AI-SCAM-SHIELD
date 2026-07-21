# 🛡️ AI Scam Shield

A full-stack scam & phishing detection platform — a React dashboard covering
message, URL, website, QR, email, and voice scanning, an AI assistant, and
scan history, backed by an Express + MongoDB API with real user auth.

---

## ✨ Features

- **Landing page** — animated hero, radar-sweep shield visual, live stats,
  feature grid, FAQ, testimonials.
- **Auth** — signup/login with a live password-strength meter, backed by
  real bcrypt + JWT auth on the server.
- **Dashboard Overview** — AI security score gauge, total scans, threats
  blocked, safe-website count, and per-category stat cards.
- **AI Scam Scanner** — paste any email/SMS/chat message, get a scored
  verdict from a heuristic scam-language detector, with a full animated
  scan sequence (beam → radar → result reveal).
- **URL Scanner** — checks any URL against phishing-style structural
  patterns (HTTPS, raw IPs, punycode, shorteners, suspicious TLDs) with a
  trust-score gauge, threat-level bar, and recently-scanned list.
- **Website Scanner** — live preview of a site plus a structural threat
  report (HTTPS validity, IP-literal hostnames, brand-impersonation
  patterns, shortener detection, subdomain structure).
- **QR Scanner** — scan a QR code and run the decoded URL/text through the
  same scam-detection pipeline.
- **Email Scanner** — analyze email content/headers for phishing indicators.
- **Voice Scanner** — analyze call/voice content for scam indicators.
- **AI Assistant** — conversational helper for scam-related questions.
- **Scan History** — searchable log of every past scan.
- **Profile & Settings** — account management.
- **Persistent history** — every scan is saved per-user in MongoDB via
  the backend API, not just kept in the browser.

---

## 🧱 Tech Stack

**Frontend**
- React 18 + Vite
- React Router
- Tailwind CSS
- Framer Motion (animation)
- Recharts (charts)
- Lucide (icons)

**Backend**
- Node.js + Express
- MongoDB + Mongoose
- JWT auth + bcrypt password hashing
- dotenv, cors

---

## 📁 Project Structure

```
ai-scam-shield/
├── frontend/
│   └── ai-scam-shield/       React + Vite app (see its own README)
└── backend/                  Express + MongoDB API (see its own README)
```

Each half has its own detailed README:
- [`frontend/ai-scam-shield/README.md`](frontend/ai-scam-shield/README.md) — components, pages, and structure
- [`backend/README.md`](backend/README.md) — API routes, models, and setup

---

## 🚀 Getting Started

### 1. Clone the repo
```bash
git clone https://github.com/sudha-rani-000/AI-SCAM-SHIELD.git
cd AI-SCAM-SHIELD
```

### 2. Set up the backend
```bash
cd backend
npm install
cp .env.example .env
# edit .env: set MONGODB_URI (MongoDB Atlas) and JWT_SECRET
npm run dev
```
Runs on `http://localhost:4000` by default.

### 3. Set up the frontend
Open a new terminal:
```bash
cd frontend/ai-scam-shield
npm install
npm run dev
```
Runs on `http://localhost:5173` by default.

### 4. Open the app
Visit `http://localhost:5173` in your browser, then try `/signup` or `/login`.
Once signed in you land on `/dashboard`, with every scanner available from
the sidebar.

---

## 🔑 Environment Variables

The backend needs a `.env` file (see `backend/.env.example` for the template):

| Variable | Description |
|---|---|
| `MONGODB_URI` | Your MongoDB Atlas (or local) connection string |
| `JWT_SECRET` | Any long random string for signing tokens |
| `PORT` | Backend port (default `4000`) |
| `CLIENT_ORIGIN` | Frontend origin for CORS (default `http://localhost:5173`) |

`.env` is git-ignored on purpose — never commit real credentials.

---

## 📄 License

Add your license of choice here (MIT, Apache-2.0, etc.).