import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { User, Mail, Lock } from "lucide-react";
import AuthLayout from "../components/AuthLayout.jsx";
import AnimatedInput from "../components/AnimatedInput.jsx";
import PasswordStrengthMeter from "../components/PasswordStrengthMeter.jsx";
import PrimaryButton from "../components/PrimaryButton.jsx";
import GlassCard from "../components/GlassCard.jsx";
import { scorePassword } from "../lib/utils.js";

export default function Signup() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "", confirm: "" });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle");
  const [agreed, setAgreed] = useState(false);

  const score = form.password ? scorePassword(form.password) : null;

  function update(field) {
    return (e) => setForm((f) => ({ ...f, [field]: e.target.value }));
  }

  function validate() {
    const next = {};
    if (form.name.trim().length < 2) next.name = "Enter your full name";
    if (!/^\S+@\S+\.\S+$/.test(form.email)) next.email = "Enter a valid email address";
    if ((score ?? 0) < 2) next.password = "Choose a stronger password";
    if (form.confirm !== form.password) next.confirm = "Passwords don't match";
    return next;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const next = validate();
    setErrors(next);
    if (Object.keys(next).length > 0 || !agreed) {
      if (!agreed) next.terms = true;
      setErrors(next);
      return;
    }

    setStatus("loading");
    // Placeholder for a real signup call. Swap this timeout for your API request.
    await new Promise((resolve) => setTimeout(resolve, 1200));
    setStatus("success");
    setTimeout(() => navigate("/dashboard"), 700);
  }

  return (
    <AuthLayout
      shieldProgress={(score ?? 0) / 4}
      tagline="Your shield assembles as you go — a stronger password means stronger protection from day one."
    >
      <GlassCard>
        <h1 className="font-display text-2xl font-semibold text-ink-primary">Create your account</h1>
        <p className="mt-2 font-body text-sm text-ink-muted">
          Set up AI Scam Shield in under a minute.
        </p>

        <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-4">
          <AnimatedInput
            label="Full name"
            name="name"
            icon={User}
            value={form.name}
            onChange={update("name")}
            autoComplete="name"
            error={errors.name}
          />
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
          <div>
            <AnimatedInput
              label="Password"
              type="password"
              name="password"
              icon={Lock}
              value={form.password}
              onChange={update("password")}
              autoComplete="new-password"
              error={errors.password}
            />
            <PasswordStrengthMeter score={score} />
          </div>
          <AnimatedInput
            label="Confirm password"
            type="password"
            name="confirm"
            icon={Lock}
            value={form.confirm}
            onChange={update("confirm")}
            autoComplete="new-password"
            error={errors.confirm}
          />

          <label className="flex items-start gap-2 pt-1 font-body text-sm text-ink-muted">
            <input
              type="checkbox"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
              className="mt-0.5 h-4 w-4 rounded border-white/20 bg-void-panel text-cyan-glow focus-visible:outline-cyan-glow"
            />
            <span>
              I agree to the{" "}
              <a href="#" className="text-cyan-glow hover:underline">
                Terms of Service
              </a>{" "}
              and{" "}
              <a href="#" className="text-cyan-glow hover:underline">
                Privacy Policy
              </a>
              .
            </span>
          </label>
          {errors.terms && (
            <p className="-mt-2 font-body text-xs text-danger">
              Please accept the terms to continue
            </p>
          )}

          <div className="pt-2">
            <PrimaryButton status={status}>Create account</PrimaryButton>
          </div>
        </form>

        <p className="mt-6 text-center font-body text-sm text-ink-muted">
          Already protected?{" "}
          <Link to="/login" className="text-cyan-glow hover:underline">
            Sign in
          </Link>
        </p>
      </GlassCard>
    </AuthLayout>
  );
}
