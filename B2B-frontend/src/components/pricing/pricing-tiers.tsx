import { AnimatePresence, motion } from "motion/react"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  ArrowRight01Icon,
  CheckmarkCircle02Icon,
  Cancel01Icon,
  Rocket01Icon,
  ChartIncreaseIcon,
  Building03Icon,
} from "@hugeicons/core-free-icons"
import { cn } from "@/lib/utils"
import type { Billing } from "./use-billing"
import { StaggerGroup, StaggerItem } from "@/components/motion/primitives"

type Tier = {
  id: "starter" | "growth" | "enterprise"
  name: string
  tagline: string
  icon: typeof Rocket01Icon
  monthly: number | null
  annual: number | null
  ctaLabel: string
  ctaHref: string
  highlighted?: boolean
  meta: { label: string; value: string }[]
  features: { label: string; included: boolean }[]
}

const tiers: Tier[] = [
  {
    id: "starter",
    name: "Starter",
    tagline: "For new sellers testing the marketplace. List free, pay only when you sell.",
    icon: Rocket01Icon,
    monthly: 0,
    annual: 0,
    ctaLabel: "Start selling free",
    ctaHref: "#trial",
    meta: [
      { label: "Listings", value: "Up to 100" },
      { label: "Sales commission", value: "8%" },
      { label: "Service commission", value: "8%" },
      { label: "Payouts", value: "Weekly" },
    ],
    features: [
      { label: "Storefront page on Buildora", included: true },
      { label: "Up to 100 active listings", included: true },
      { label: "Standard search placement", included: true },
      { label: "Basic seller dashboard", included: true },
      { label: "Email support (24h SLA)", included: true },
      { label: "Featured placement & search boost", included: false },
      { label: "Storefront analytics & cohorts", included: false },
      { label: "Dedicated success manager", included: false },
    ],
  },
  {
    id: "growth",
    name: "Growth",
    tagline: "For active sellers ready to scale reach and conversion.",
    icon: ChartIncreaseIcon,
    monthly: 4990,
    annual: 3990,
    ctaLabel: "Become a seller",
    ctaHref: "#quote",
    highlighted: true,
    meta: [
      { label: "Listings", value: "Up to 1,000" },
      { label: "Sales commission", value: "5%" },
      { label: "Service commission", value: "6%" },
      { label: "Payouts", value: "Weekly" },
    ],
    features: [
      { label: "Everything in Starter", included: true },
      { label: "Up to 1,000 active listings", included: true },
      { label: "Featured placement on category pages", included: true },
      { label: "Storefront analytics & cohort views", included: true },
      { label: "Promo codes & flash-deal slots", included: true },
      { label: "Verified-pro badge eligibility", included: true },
      { label: "Priority chat support (4h SLA)", included: true },
      { label: "Onboarding migration manager", included: true },
    ],
  },
  {
    id: "enterprise",
    name: "Pro",
    tagline: "For high-volume sellers & multi-branch operators.",
    icon: Building03Icon,
    monthly: 14990,
    annual: 11990,
    ctaLabel: "Talk to sales",
    ctaHref: "#sales",
    meta: [
      { label: "Listings", value: "Unlimited" },
      { label: "Sales commission", value: "3%" },
      { label: "Service commission", value: "4%" },
      { label: "Payouts", value: "Daily" },
    ],
    features: [
      { label: "Everything in Growth", included: true },
      { label: "Unlimited listings across branches", included: true },
      { label: "Top-of-feed placement on home & search", included: true },
      { label: "Custom contract pricing per buyer", included: true },
      { label: "Daily payouts & priority dispute review", included: true },
      { label: "Open API & webhook access", included: true },
      { label: "Dedicated success manager", included: true },
      { label: "Quarterly performance reviews", included: true },
    ],
  },
]

export function PricingTiers({ billing }: { billing: Billing }) {
  return (
    <section className="relative -mt-16 pb-16 sm:-mt-24 sm:pb-20 lg:-mt-32 lg:pb-24">
      <StaggerGroup
        className="mx-auto grid max-w-7xl gap-5 px-6 lg:grid-cols-3"
        amount={0.05}
      >
        {tiers.map((t) => (
          <StaggerItem key={t.id}>
            <TierCard tier={t} billing={billing} />
          </StaggerItem>
        ))}
      </StaggerGroup>

      <p className="mx-auto mt-10 max-w-2xl px-6 text-center text-xs text-brand-black/55">
        Prices in PHP. Subscription is billed monthly or annually (annual saves 20%).
        Sales commission is taken automatically per order. Buyers always shop free —
        no membership fees, no buyer-side commission.
      </p>
    </section>
  )
}

function TierCard({ tier, billing }: { tier: Tier; billing: Billing }) {
  const price = billing === "annual" ? tier.annual : tier.monthly
  const isCustom = price === null
  const isFree = price === 0

  return (
    <article
      className={cn(
        "relative flex flex-col rounded-md p-7 transition-shadow",
        tier.highlighted
          ? "bg-brand-orange text-brand-ink shadow-[0_30px_60px_-30px_rgba(201,169,97,0.6)]"
          : "border border-brand-black/10 bg-white text-brand-black"
      )}
    >
      {tier.highlighted && (
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-brand-black px-4 py-1.5 text-[10px] font-semibold tracking-[0.25em] text-white uppercase shadow-lg">
          Most Popular
        </span>
      )}

      <header className="flex items-start justify-between">
        <span
          className={cn(
            "flex size-11 items-center justify-center rounded-md",
            tier.highlighted
              ? "bg-white/20 text-white"
              : "bg-brand-orange/10 text-brand-orange"
          )}
        >
          <HugeiconsIcon icon={tier.icon} className="size-5" />
        </span>
        <span
          className={cn(
            "text-[10px] font-semibold tracking-[0.25em] uppercase",
            tier.highlighted ? "text-white/70" : "text-brand-black/50"
          )}
        >
          Tier 0{tiers.indexOf(tier) + 1}
        </span>
      </header>

      <h3 className="mt-5 text-2xl font-extrabold tracking-tight">{tier.name}</h3>
      <p
        className={cn(
          "mt-1 text-sm",
          tier.highlighted ? "text-white/85" : "text-brand-black/60"
        )}
      >
        {tier.tagline}
      </p>

      <div className="mt-6 flex items-end gap-2">
        {isCustom ? (
          <span className="text-4xl font-extrabold leading-none">Custom</span>
        ) : isFree ? (
          <>
            <span className="text-5xl font-extrabold leading-none">Free</span>
            <span
              className={cn(
                "pb-1 text-xs",
                tier.highlighted ? "text-white/70" : "text-brand-black/55"
              )}
            >
              · pay only when you sell
            </span>
          </>
        ) : (
          <>
            <AnimatePresence mode="popLayout">
              <motion.span
                key={`${tier.id}-${price}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0, transition: { duration: 0.25 } }}
                exit={{ opacity: 0, y: -10, transition: { duration: 0.15 } }}
                className="text-5xl font-extrabold leading-none"
              >
                ₱{price?.toLocaleString()}
              </motion.span>
            </AnimatePresence>
            <span
              className={cn(
                "pb-1 text-xs",
                tier.highlighted ? "text-white/70" : "text-brand-black/55"
              )}
            >
              / mo · billed {billing}
            </span>
          </>
        )}
      </div>

      <a
        href={tier.ctaHref}
        className={cn(
          "mt-7 inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-xs font-semibold tracking-[0.2em] uppercase transition-colors",
          tier.highlighted
            ? "bg-brand-black text-white hover:bg-brand-ink"
            : "bg-brand-orange text-brand-ink hover:bg-brand-orange-soft"
        )}
      >
        {tier.ctaLabel}
        <span
          className={cn(
            "flex size-6 items-center justify-center rounded-full",
            tier.highlighted ? "bg-brand-orange" : "bg-white/20"
          )}
        >
          <HugeiconsIcon icon={ArrowRight01Icon} className="size-3" />
        </span>
      </a>

      <dl
        className={cn(
          "mt-7 grid grid-cols-2 gap-4 rounded-md p-4 text-xs",
          tier.highlighted ? "bg-white/10" : "bg-brand-orange/5"
        )}
      >
        {tier.meta.map((m) => (
          <div key={m.label}>
            <dt
              className={cn(
                "text-[10px] font-semibold tracking-[0.2em] uppercase",
                tier.highlighted ? "text-white/65" : "text-brand-black/50"
              )}
            >
              {m.label}
            </dt>
            <dd className="mt-1 text-sm font-bold">{m.value}</dd>
          </div>
        ))}
      </dl>

      <ul className="mt-7 space-y-3 text-sm">
        {tier.features.map((f) => (
          <li
            key={f.label}
            className={cn(
              "flex items-start gap-2.5",
              !f.included &&
                (tier.highlighted ? "text-white/45" : "text-brand-black/40")
            )}
          >
            <HugeiconsIcon
              icon={f.included ? CheckmarkCircle02Icon : Cancel01Icon}
              className={cn(
                "mt-0.5 size-4 shrink-0",
                f.included
                  ? tier.highlighted
                    ? "text-white"
                    : "text-brand-orange"
                  : tier.highlighted
                    ? "text-white/40"
                    : "text-brand-black/30"
              )}
            />
            <span className="leading-snug">{f.label}</span>
          </li>
        ))}
      </ul>
    </article>
  )
}
