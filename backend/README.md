# AI Scam Shield — Backend

A real Express + MongoDB backend for the AI Scam Shield frontend: user
auth (bcrypt + JWT) and the two scanners (message/text scam detector,
URL/phishing analyzer), each backed by the same heuristic scoring logic
already in the frontend's `src/lib/`, now running server-side so results
get saved to a real per-user scan history instead of living only in the
browser.

## Setup

```bash
cd backend
npm install
cp .env.example .env
# then edit .env: set MONGODB_URI (MongoDB Atlas) and JWT_SECRET
npm run dev      # nodemon, restarts on changes
# or
npm start        # plain node
```

Server listens on `http://localhost:4000` by default (`PORT` in `.env`).
CORS is locked to `CLIENT_ORIGIN` (defaults to the Vite dev server at
`http://localhost:5173`).

## Structure

```
backend/
  server.js                   entry point: loads .env, connects DB, starts express
  src/
    app.js                    express app + middleware + route mounting
    config/
      db.js                   mongoose connection
    models/
      User.js                 name, email, hashed password
      ScanHistory.js          one doc per scan (text or url), tied to a user
    lib/
      scamDetector.js         server-side port of the message heuristic scorer
      urlAnalyzer.js          server-side port of the URL heuristic scorer
    controllers/
      authController.js       register / login / getMe
      scanController.js       run + persist scans, history, stats
    routes/
      authRoutes.js           /api/auth/*
      scanRoutes.js           /api/scans/*  (all protected)
    middleware/
      auth.js                 JWT verification, attaches req.user
      errorHandler.js         central error + 404 handling
    utils/
      generateToken.js        signs a 7-day JWT
```

## API

All request/response bodies are JSON. Protected routes require:
`Authorization: Bearer <token>`.

| Method | Path                     | Auth | Body                              | Notes |
|--------|--------------------------|------|------------------------------------|-------|
| GET    | `/api/health`            | no   | —                                   | uptime check |
| POST   | `/api/auth/register`     | no   | `{ name, email, password }`         | returns `{ user, token }` |
| POST   | `/api/auth/login`        | no   | `{ email, password }`               | returns `{ user, token }` |
| GET    | `/api/auth/me`           | yes  | —                                   | returns `{ user }` |
| POST   | `/api/scans/text`        | yes  | `{ text }`                          | runs the message scorer, saves it, returns `{ result, scanId }` |
| POST   | `/api/scans/url`         | yes  | `{ url }`                           | runs the URL scorer, saves it, returns `{ result, scanId }` |
| GET    | `/api/scans`             | yes  | query: `type`, `page`, `limit`      | paginated scan history |
| GET    | `/api/scans/:id`         | yes  | —                                   | a single saved scan |
| DELETE | `/api/scans/:id`         | yes  | —                                   | deletes a saved scan |
| GET    | `/api/scans/stats/summary` | yes | —                                 | totals by verdict + last-7-days daily volume, for the dashboard |

## Wiring up the frontend

The frontend currently calls `scanText()` / `analyzeUrl()` from
`src/lib/` directly in the browser, and `Login.jsx` / `Signup.jsx` use a
`setTimeout` placeholder instead of a real request. To connect them:

1. Store the `token` from register/login (e.g. in memory + a React
   context, or `localStorage` if you're fine with that trade-off) and
   send it as `Authorization: Bearer <token>` on every `/api/scans/*`
   call.
2. In `ScamScanner.jsx` / `URLScanner.jsx`, replace the direct
   `scanText(...)` / `analyzeUrl(...)` calls with a `fetch`/`axios` call
   to `POST /api/scans/text` or `POST /api/scans/url` — the response
   `result` shape is identical to what the client-side functions already
   return, so the existing result components don't need to change.
3. In `Dashboard.jsx`, swap the local mock `STATS` array for a call to
   `GET /api/scans/stats/summary`, and feed `WeeklyScanChart.jsx` /
   `ActivityFeed.jsx` from `GET /api/scans`.

## Notes

- Passwords are hashed with bcrypt before saving; the hash is never
  returned in any API response (`select: false` on the schema field).
- JWTs are signed for 7 days. There's no refresh-token flow — reauthenticate
  after expiry.
- `MONGODB_URI` must point at a real MongoDB instance (Atlas or local)
  for the server to start; it fails fast with a clear error if it's missing.
