# 🛡️ AI Scam Shield

A full-stack scam & phishing detection platform — a React dashboard covering
message, URL, website, QR, email, and voice scanning, an AI assistant, and
scan history, backed by an Express API with real user auth and Gemini-powered
scam analysis.

> **Current status:** Auth and the AI message scanner are live and working
> end-to-end. Other scanners and features below are planned but not yet built
> — see [Roadmap](#-roadmap).

---

## ✨ Features

### ✅ Working now
- **Landing page** — animated hero, radar-sweep shield visual, live stats,
  feature grid, FAQ, testimonials.
- **Auth** — signup/login with a live password-strength meter, backed by
  real bcrypt + JWT auth on the server.
- **AI Scam Scanner** — paste any email/SMS/chat message and get a verdict
  (`isScam`, `riskLevel`, `reasons`, `summary`) from Google's Gemini API.

### 🚧 Planned / not yet built
- **Dashboard Overview** — AI security score gauge, total scans, threats
  blocked, safe-website count, and per-category stat cards.
- **URL Scanner** — checks any URL against phishing-style structural
  patterns (HTTPS, raw IPs, punycode, shorteners, suspicious TLDs).
- **Website Scanner** — live preview of a site plus a structural threat
  report.
- **QR Scanner** — scan a QR code and run the decoded URL/text through the
  same scam-detection pipeline.
- **Email Scanner** — analyze email content/headers for phishing indicators.
- **Voice Scanner** — analyze call/voice content for scam indicators.
- **AI Assistant** — conversational helper for scam-related questions.
- **Scan History** — searchable log of every past scan.
- **Profile & Settings** — account management.
- **Persistent history in MongoDB** — the backend currently stores users
  in-memory (data resets on server restart). Switching to MongoDB is planned
  for persistent, per-user scan history.

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
- In-memory user store (MongoDB + Mongoose planned)
- JWT auth + bcrypt password hashing
- Google Gemini API (`@google/generative-ai`) for scam analysis
- dotenv, cors

---

## 📁 Project Structure

```
ai-scam-shield/
├── frontend/
│   └── ai-scam-shield/       React + Vite app (see its own README)
└── backend/                  Express API (see its own README)
    ├── server.js
    └── src/
        ├── controllers/      authController.js, scamController.js
        ├── models/           User.js (in-memory)
        ├── middleware/       auth.js (JWT verification)
        ├── routes/           auth.js, scam.js
        └── lib/              gemini.js, generateToken.js
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
# edit .env: set JWT_SECRET and GEMINI_API_KEY
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

---

## 🔑 Environment Variables

The backend needs a `.env` file (see `backend/.env.example` for the template):

| Variable | Description |
|---|---|
| `JWT_SECRET` | Any long random string for signing tokens |
| `JWT_EXPIRES_IN` | Token lifetime, e.g. `7d` |
| `GEMINI_API_KEY` | API key from [aistudio.google.com/app/apikey](https://aistudio.google.com/app/apikey) |
| `PORT` | Backend port (default `4000`) |
| `CLIENT_ORIGIN` | Frontend origin for CORS (default `http://localhost:5173`) |

`.env` is git-ignored on purpose — never commit real credentials.

---

## 📡 API Reference (current)

| Method | Endpoint | Auth required | Description |
|---|---|---|---|
| POST | `/api/auth/register` | No | Create a new account |
| POST | `/api/auth/login` | No | Log in, returns JWT |
| GET | `/api/auth/me` | Yes | Get current user |
| POST | `/api/scam/check` | No | `{ "text": "..." }` → scam analysis via Gemini |
| GET | `/api/health` | No | Health check |

---

## 🗺️ Roadmap
1. Fix Gemini API key and confirm `/api/scam/check` works end-to-end
2. Switch user storage from in-memory to MongoDB Atlas
3. Add per-user scan history, persisted in MongoDB
4. Build URL / Website / QR / Email / Voice scanners
5. Build dashboard overview + AI assistant

---

## 📄 License
Add your license of choice here (MIT, Apache-2.0, etc.).
