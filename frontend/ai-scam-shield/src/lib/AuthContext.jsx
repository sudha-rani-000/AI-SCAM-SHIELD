import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext(null);

const STORAGE_KEY = "ai-scam-shield:session";

// Demo credentials (no backend in this project — swap for a real API call later).
const ADMIN_CREDENTIALS = {
  email: "admin@shield.ai",
  password: "Admin@123",
};

function readSession() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function AuthProvider({ children }) {
  const [session, setSession] = useState(() => readSession());

  useEffect(() => {
    if (session) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, [session]);

  // Regular user login — accepts any well-formed credentials (mock auth).
  function loginUser({ email }) {
    setSession({ role: "user", email });
    return { ok: true };
  }

  // Admin login — checks against the demo admin credentials.
  function loginAdmin({ email, password }) {
    if (
      email.trim().toLowerCase() === ADMIN_CREDENTIALS.email &&
      password === ADMIN_CREDENTIALS.password
    ) {
      setSession({ role: "admin", email });
      return { ok: true };
    }
    return { ok: false, error: "Invalid admin credentials" };
  }

  function logout() {
    setSession(null);
  }

  const value = {
    session,
    isAuthenticated: !!session,
    isAdmin: session?.role === "admin",
    loginUser,
    loginAdmin,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within an AuthProvider");
  return ctx;
}
