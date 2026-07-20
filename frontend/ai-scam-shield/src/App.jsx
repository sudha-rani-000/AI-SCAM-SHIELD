import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Landing from "./pages/Landing.jsx";
import Login from "./pages/Login.jsx";
import AdminLogin from "./pages/AdminLogin.jsx";
import Signup from "./pages/Signup.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import ScamScanner from "./pages/ScamScanner.jsx";
import URLScanner from "./pages/URLScanner.jsx";
import WebsiteScanner from "./pages/WebsiteScanner.jsx";
import QRScanner from "./pages/QRScanner.jsx";
import EmailScanner from "./pages/EmailScanner.jsx";
import VoiceScanner from "./pages/VoiceScanner.jsx";
import AIAssistant from "./pages/AIAssistant.jsx";
import ScanHistory from "./pages/ScanHistory.jsx";
import Profile from "./pages/Profile.jsx";
import AdminDashboard from "./pages/AdminDashboard.jsx";
import Settings from "./pages/Settings.jsx";
import NotificationsPage from "./pages/NotificationsPage.jsx";
import { RequireAuth, RequireAdmin } from "./components/RouteGuards.jsx";

export default function App() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/dashboard"
          element={
            <RequireAuth>
              <Dashboard />
            </RequireAuth>
          }
        />
        <Route
          path="/dashboard/scam-scanner"
          element={
            <RequireAuth>
              <ScamScanner />
            </RequireAuth>
          }
        />
        <Route
          path="/dashboard/url"
          element={
            <RequireAuth>
              <URLScanner />
            </RequireAuth>
          }
        />
        <Route
          path="/dashboard/website"
          element={
            <RequireAuth>
              <WebsiteScanner />
            </RequireAuth>
          }
        />
        <Route
          path="/dashboard/qr"
          element={
            <RequireAuth>
              <QRScanner />
            </RequireAuth>
          }
        />
        <Route
          path="/dashboard/email"
          element={
            <RequireAuth>
              <EmailScanner />
            </RequireAuth>
          }
        />
        <Route
          path="/dashboard/voice"
          element={
            <RequireAuth>
              <VoiceScanner />
            </RequireAuth>
          }
        />
        <Route
          path="/dashboard/assistant"
          element={
            <RequireAuth>
              <AIAssistant />
            </RequireAuth>
          }
        />
        <Route
          path="/dashboard/history"
          element={
            <RequireAuth>
              <ScanHistory />
            </RequireAuth>
          }
        />
        <Route
          path="/dashboard/profile"
          element={
            <RequireAuth>
              <Profile />
            </RequireAuth>
          }
        />
        <Route
          path="/dashboard/admin"
          element={
            <RequireAdmin>
              <AdminDashboard />
            </RequireAdmin>
          }
        />
        <Route
          path="/dashboard/settings"
          element={
            <RequireAuth>
              <Settings />
            </RequireAuth>
          }
        />
        <Route
          path="/dashboard/notifications"
          element={
            <RequireAuth>
              <NotificationsPage />
            </RequireAuth>
          }
        />
      </Routes>
    </AnimatePresence>
  );
}
