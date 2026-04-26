import { HugeiconsIcon } from "@hugeicons/react"
import {
  AppleIcon,
  GoogleIcon,
  SmartPhone02Icon,
  CheckmarkCircle02Icon,
} from "@hugeicons/core-free-icons"
import { Reveal } from "@/components/motion/primitives"

const appBullets = [
  "Reorder past materials in two taps",
  "Track every delivery against the jobsite map",
  "Push notifications when new bids land on your job",
]

export function AppPromo() {
  return (
    <section className="relative isolate overflow-hidden bg-brand-orange py-14 sm:py-16 lg:py-20 text-white">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 lg:grid-cols-[1.2fr_1fr]">
        <Reveal>
          <span className="text-[11px] font-semibold tracking-[0.3em] text-brand-black uppercase">
            Mobile App
          </span>
          <h2 className="mt-3 text-3xl leading-tight font-extrabold tracking-tight sm:text-4xl">
            Levite in your pocket.
            <br />
            Built for the jobsite.
          </h2>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-white/85">
            Order materials, accept quotes, and chat with your contractor — all
            from the boots-on-the-ground app. Built for one-tap reorders and
            spotty connectivity.
          </p>

          <ul className="mt-6 space-y-3 text-sm">
            {appBullets.map((b) => (
              <li key={b} className="flex items-start gap-2.5">
                <HugeiconsIcon
                  icon={CheckmarkCircle02Icon}
                  className="mt-0.5 size-4 shrink-0"
                />
                <span>{b}</span>
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href="#"
              className="inline-flex items-center gap-3 rounded-md bg-brand-black px-5 py-3 text-left transition-colors hover:bg-brand-ink"
            >
              <HugeiconsIcon icon={AppleIcon} className="size-7" />
              <span className="leading-none">
                <span className="block text-[10px] tracking-wider text-white/75 uppercase">
                  Download on the
                </span>
                <span className="block text-base font-bold tracking-tight">
                  App Store
                </span>
              </span>
            </a>
            <a
              href="#"
              className="inline-flex items-center gap-3 rounded-md bg-brand-black px-5 py-3 text-left transition-colors hover:bg-brand-ink"
            >
              <HugeiconsIcon icon={GoogleIcon} className="size-7" />
              <span className="leading-none">
                <span className="block text-[10px] tracking-wider text-white/75 uppercase">
                  Get it on
                </span>
                <span className="block text-base font-bold tracking-tight">
                  Google Play
                </span>
              </span>
            </a>
          </div>
        </Reveal>

        <Reveal className="relative mx-auto w-full max-w-sm">
          <div className="relative aspect-[9/16] overflow-hidden rounded-[2.5rem] border-[10px] border-brand-black bg-brand-black shadow-[0_30px_60px_-30px_rgba(0,0,0,0.6)]">
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage:
                  "url('https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=900&q=80&auto=format&fit=crop')",
              }}
            />
            <div
              aria-hidden
              className="absolute inset-0 bg-gradient-to-b from-brand-black/85 via-brand-black/50 to-brand-black/95"
            />
            <div className="relative flex h-full flex-col p-6 text-white">
              <span className="text-[10px] font-semibold tracking-[0.3em] text-brand-orange uppercase">
                Levite · Today
              </span>
              <h3 className="mt-2 text-xl leading-tight font-bold">
                Cement order arriving 2:30pm
              </h3>
              <p className="mt-1 text-xs text-white/70">
                Driver: Joel · Truck B-12 · 80 bags
              </p>
              <div className="mt-5 space-y-3">
                {[
                  { label: "Pending bids", value: "3" },
                  { label: "Active jobsites", value: "2" },
                  { label: "This month spend", value: "₱428,500" },
                ].map((s) => (
                  <div
                    key={s.label}
                    className="flex items-center justify-between rounded-md bg-white/10 px-4 py-3 backdrop-blur-sm ring-1 ring-white/10"
                  >
                    <span className="text-xs text-white/75">{s.label}</span>
                    <span className="text-sm font-bold">{s.value}</span>
                  </div>
                ))}
              </div>
              <div className="mt-auto rounded-md bg-brand-orange p-4 text-center">
                <p className="text-xs font-semibold">Ready to checkout</p>
                <p className="mt-1 text-2xl font-extrabold tracking-tight">
                  ₱18,940
                </p>
                <p className="mt-1 text-[10px] text-white/85">
                  12 items · Free delivery to Site A
                </p>
              </div>
            </div>
          </div>

          <span className="absolute -top-4 -right-4 hidden size-16 items-center justify-center rounded-2xl bg-brand-black text-white shadow-xl sm:flex">
            <HugeiconsIcon icon={SmartPhone02Icon} className="size-7" />
          </span>
        </Reveal>
      </div>
    </section>
  )
}
