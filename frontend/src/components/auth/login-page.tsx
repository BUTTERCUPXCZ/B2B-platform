import { useState } from "react"
import { Link, useNavigate } from "@tanstack/react-router"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  Mail01Icon,
  LockPasswordIcon,
  ArrowRight01Icon,
  ViewIcon,
  ViewOffSlashIcon,
  GoogleIcon,
  AppleIcon,
} from "@hugeicons/core-free-icons"
import { AuthShell } from "./auth-shell"

export function LoginPage() {
  const navigate = useNavigate()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPw, setShowPw] = useState(false)
  const [remember, setRemember] = useState(true)

  return (
    <AuthShell
      title="Welcome back."
      subtitle="Sign in to your buyer or seller account."
      bottomPrompt={
        <>
          New to Levite?{" "}
          <Link
            to="/auth/signup"
            className="font-semibold text-brand-orange hover:underline"
          >
            Create an account
          </Link>
        </>
      }
    >
      <form
        onSubmit={(e) => {
          e.preventDefault()
          // Auth backend wires here later (Supabase Auth via Nest proxy).
          navigate({ to: "/" })
        }}
        className="space-y-5"
      >
        <div className="grid grid-cols-2 gap-3">
          <SocialButton icon={GoogleIcon} label="Google" />
          <SocialButton icon={AppleIcon} label="Apple" />
        </div>

        <div className="relative my-2 text-center">
          <span className="absolute inset-x-0 top-1/2 h-px bg-brand-black/10" />
          <span className="relative bg-white px-3 text-[10px] tracking-[0.25em] text-brand-black/50 uppercase">
            or
          </span>
        </div>

        <Field label="Work email">
          <InputWithIcon
            icon={Mail01Icon}
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@company.com"
            autoComplete="email"
            required
          />
        </Field>

        <Field
          label="Password"
          right={
            <Link
              to="/"
              className="text-[11px] font-semibold text-brand-orange hover:underline"
            >
              Forgot password?
            </Link>
          }
        >
          <PasswordField
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            show={showPw}
            onToggle={() => setShowPw((v) => !v)}
          />
        </Field>

        <label className="flex items-center gap-2 text-xs text-brand-black/65">
          <input
            type="checkbox"
            checked={remember}
            onChange={(e) => setRemember(e.target.checked)}
            className="size-4 rounded border-brand-black/20 text-brand-orange focus:ring-brand-orange/40"
          />
          Keep me signed in for 30 days
        </label>

        <button
          type="submit"
          className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-brand-orange py-3 text-xs font-semibold tracking-[0.2em] text-white uppercase transition-colors hover:bg-brand-orange-soft"
        >
          Sign in
          <HugeiconsIcon icon={ArrowRight01Icon} className="size-3.5" />
        </button>
      </form>
    </AuthShell>
  )
}

function Field({
  label,
  right,
  children,
}: {
  label: string
  right?: React.ReactNode
  children: React.ReactNode
}) {
  return (
    <div>
      <div className="flex items-baseline justify-between">
        <label className="text-xs font-bold tracking-wide text-brand-black uppercase">
          {label}
        </label>
        {right}
      </div>
      <div className="mt-2">{children}</div>
    </div>
  )
}

const inputClass =
  "w-full rounded-md border border-brand-black/15 bg-white px-4 py-3 text-sm text-brand-black placeholder:text-brand-black/45 outline-none transition-shadow focus:border-brand-orange/40 focus:ring-2 focus:ring-brand-orange/20"

function InputWithIcon({
  icon,
  ...props
}: { icon: typeof Mail01Icon } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className="relative">
      <span className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-brand-black/45">
        <HugeiconsIcon icon={icon} className="size-4" />
      </span>
      <input {...props} className={`${inputClass} pl-10`} />
    </div>
  )
}

function PasswordField({
  value,
  onChange,
  show,
  onToggle,
}: {
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  show: boolean
  onToggle: () => void
}) {
  return (
    <div className="relative">
      <span className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-brand-black/45">
        <HugeiconsIcon icon={LockPasswordIcon} className="size-4" />
      </span>
      <input
        type={show ? "text" : "password"}
        value={value}
        onChange={onChange}
        placeholder="At least 8 characters"
        autoComplete="current-password"
        required
        minLength={8}
        className={`${inputClass} pr-10 pl-10`}
      />
      <button
        type="button"
        onClick={onToggle}
        aria-label={show ? "Hide password" : "Show password"}
        className="absolute top-1/2 right-3 -translate-y-1/2 text-brand-black/45 transition-colors hover:text-brand-orange"
      >
        <HugeiconsIcon
          icon={show ? ViewOffSlashIcon : ViewIcon}
          className="size-4"
        />
      </button>
    </div>
  )
}

function SocialButton({
  icon,
  label,
}: {
  icon: typeof GoogleIcon
  label: string
}) {
  return (
    <button
      type="button"
      className="inline-flex items-center justify-center gap-2 rounded-md border border-brand-black/15 bg-white px-4 py-2.5 text-sm font-semibold text-brand-black transition-colors hover:border-brand-orange/40 hover:bg-brand-orange/5"
    >
      <HugeiconsIcon icon={icon} className="size-4" />
      {label}
    </button>
  )
}
