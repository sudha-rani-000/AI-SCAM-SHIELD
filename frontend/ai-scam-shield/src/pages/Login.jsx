import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock } from "lucide-react";
import AuthLayout from "../components/AuthLayout.jsx";
import AnimatedInput from "../components/AnimatedInput.jsx";
import PrimaryButton from "../components/PrimaryButton.jsx";
import GlassCard from "../components/GlassCard.jsx";
import { useAuth } from "../lib/AuthContext.jsx";

export default function Login() {
  const navigate = useNavigate();
  const { loginUser } = useAuth();
  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | loading | success | error

  function update(field) {
    return (e) => setForm((f) => ({ ...f, [field]: e.target.value }));
  }

  function validate() {
    const next = {};
    if (!/^\S+@\S+\.\S+$/.test(form.email)) next.email = "Enter a valid email address";
    if (form.password.length < 8) next.password = "Password must be at least 8 characters";
    return next;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const next = validate();
    setErrors(next);
    if (Object.keys(next).length > 0) return;

    setStatus("loading");
    // Placeholder for a real auth call. Swap this timeout for your API request.
    await new Promise((resolve) => setTimeout(resolve, 1200));
    loginUser(form);
    setStatus("success");
    setTimeout(() => navigate("/dashboard"), 700);
  }

  return (
    <AuthLayout
      shieldProgress={1}
      tagline="Real-time protection against phishing, scam calls, and fraudulent sites — powered by AI that never sleeps."
    >
      <GlassCard>
        <h1 className="font-display text-2xl font-semibold text-ink-primary">Welcome back</h1>
        <p className="mt-2 font-body text-sm text-ink-muted">
          Sign in to keep watching over your inbox, calls, and links.
        </p>

        <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-4">
          <AnimatedInput
            label="Email address"
            type="email"
            name="email"
            icon={Mail}
            value={form.email}
            onChange={update("email")}
            autoComplete="email"
            error={errors.email}
          />
          <AnimatedInput
            label="Password"
            type="password"
            name="password"
            icon={Lock}
            value={form.password}
            onChange={update("password")}
            autoComplete="current-password"
            error={errors.password}
          />

          <div className="flex items-center justify-between pt-1">
            <label className="flex items-center gap-2 font-body text-sm text-ink-muted">
              <input
                type="checkbox"
                className="h-4 w-4 rounded border-white/20 bg-void-panel text-cyan-glow focus-visible:outline-cyan-glow"
              />
              Remember me
            </label>
            <a href="#" className="font-body text-sm text-cyan-glow hover:underline">
              Forgot password?
            </a>
          </div>

          <div className="pt-2">
            <PrimaryButton status={status}>Sign in</PrimaryButton>
          </div>
        </form>

        <p className="mt-6 text-center font-body text-sm text-ink-muted">
          New to AI Scam Shield?{" "}
          <Link to="/signup" className="text-cyan-glow hover:underline">
            Create an account
          </Link>
        </p>
        <p className="mt-2 text-center font-body text-xs text-ink-faint">
          Platform administrator?{" "}
          <Link to="/admin-login" className="text-ink-muted hover:underline">
            Admin sign in
          </Link>
        </p>
      </GlassCard>
    </AuthLayout>
  );
}
