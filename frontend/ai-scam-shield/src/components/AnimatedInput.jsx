import { useId, useState } from "react";
import { motion } from "framer-motion";
import { Eye, EyeOff } from "lucide-react";
import { cn } from "../lib/utils.js";

export default function AnimatedInput({
  label,
  type = "text",
  icon: Icon,
  error,
  value,
  onChange,
  autoComplete,
  name,
}) {
  const id = useId();
  const [focused, setFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";
  const resolvedType = isPassword && showPassword ? "text" : type;
  const floated = focused || Boolean(value);

  return (
    <div className="w-full">
      <motion.div
        animate={error ? { x: [0, -8, 8, -6, 6, 0] } : { x: 0 }}
        transition={{ duration: 0.4 }}
        className={cn(
          "relative flex items-center rounded-xl border bg-void-panel/60 px-4 transition-colors duration-200",
          error
            ? "border-danger/70"
            : focused
            ? "border-cyan-glow/70 shadow-glow-cyan"
            : "border-white/10"
        )}
      >
        {Icon && (
          <Icon
            size={18}
            className={cn(
              "mr-3 shrink-0 transition-colors",
              focused ? "text-cyan-glow" : "text-ink-faint"
            )}
          />
        )}

        <div className="relative flex-1 pt-5 pb-2">
          <label
            htmlFor={id}
            className={cn(
              "pointer-events-none absolute left-0 origin-left font-body transition-all duration-200",
              floated
                ? "top-0.5 scale-[0.78] text-ink-muted"
                : "top-1/2 -translate-y-1/2 scale-100 text-ink-muted"
            )}
          >
            {label}
          </label>
          <input
            id={id}
            name={name}
            type={resolvedType}
            value={value}
            onChange={onChange}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            autoComplete={autoComplete}
            className="w-full bg-transparent font-body text-ink-primary outline-none"
          />
        </div>

        {isPassword && (
          <button
            type="button"
            tabIndex={-1}
            onClick={() => setShowPassword((s) => !s)}
            className="ml-2 shrink-0 text-ink-faint transition-colors hover:text-ink-muted"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        )}
      </motion.div>

      {error && (
        <motion.p
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-1.5 pl-1 font-body text-xs text-danger"
        >
          {error}
        </motion.p>
      )}
    </div>
  );
}
