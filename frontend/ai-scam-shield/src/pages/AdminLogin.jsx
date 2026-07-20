import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ShieldCheck, Lock, Mail } from "lucide-react";
import AuthLayout from "../components/AuthLayout.jsx";
import AnimatedInput from "../components/AnimatedInput.jsx";
import PrimaryButton from "../components/PrimaryButton.jsx";
import GlassCard from "../components/GlassCard.jsx";
import { useAuth } from "../lib/AuthContext.jsx";

export default function AdminLogin() {
  const navigate = useNavigate();
  const { loginAdmin } = useAuth();
  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const [formError, setFormError] = useState("");

  function update(field) {
    return (e) => setForm((f) => ({ ...f, [field]: e.target.value }));
  }

  function validate() {
    const next = {};
    if (!/^\S+@\S+\.\S+$/.test(form.email)) next.email = "Enter a valid email address";
    if (form.password.length < 6) next.password = "Enter your admin password";
    return next;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setFormError("");
    const next = validate();
    setErrors(next);
    if (Object.keys(next).length > 0) return;

    setStatus("loading");
    // Placeholder for a real admin auth call — swap for your API/backend when ready.
    await new Promise((resolve) => setTimeout(resolve, 900));

    const result = loginAdmin(form);
    if (!result.ok) {
      setStatus("error");
      setFormError(result.error || "Invalid admin credentials");
      setTimeout(() => setStatus("idle"), 1200);
      return;
    }

    setStatus("success");
    setTimeout(() => navigate("/dashboard/admin"), 700);
  }

  return (
    <AuthLayout
      shieldProgress={1}
      tagline="Restricted access — platform oversight, user management, and live threat analytics for the AI Scam Shield team."
    >
      <GlassCard>
        <div className="flex items-center gap-2">
          <ShieldCheck className="text-cyan-glow" size={20} />
          <h1 className="font-display text-2xl font-semibold text-ink-primary">Admin sign in</h1>
        </div>
        <p className="mt-2 font-body text-sm text-ink-muted">
          This area is restricted to platform administrators.
        </p>

        <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-4">
          <AnimatedInput
            label="Admin email"
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

          {formError && (
            <p className="rounded-lg bg-danger/10 px-3 py-2 font-body text-sm text-danger">{formError}</p>
          )}

          <div className="pt-2">
            <PrimaryButton status={status}>Sign in as admin</PrimaryButton>
          </div>
        </form>

        <p className="mt-6 text-center font-body text-sm text-ink-muted">
          Not an admin?{" "}
          <Link to="/login" className="text-cyan-glow hover:underline">
            Go to user sign in
          </Link>
        </p>
      </GlassCard>
    </AuthLayout>
  );
}
