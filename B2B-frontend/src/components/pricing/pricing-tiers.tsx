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
    tagline: "For materials yards and hardware stores going digital.",
    icon: Rocket01Icon,
    monthly: 149,
    annual: 119,
    ctaLabel: "Start free trial",
    ctaHref: "#trial",
    meta: [
      { label: "Users", value: "Up to 5" },
      { label: "Branches", value: "1" },
      { label: "Orders / mo", value: "500" },
      { label: "Catalog SKUs", value: "2,000" },
    ],
    features: [
      { label: "B2B materials storefront", included: true },
      { label: "Buyer accounts & order history", included: true },
      { label: "Inventory & low-stock alerts", included: true },
      { label: "Stripe & local card payments", included: true },
      { label: "Email + chat support", included: true },
      { label: "Service quoting & RFQs", included: false },
      { label: "Project workspace & field reports", included: false },
      { label: "Net-terms billing & contract pricing", included: false },
    ],
  },
  {
    id: "growth",
    name: "Growth",
    tagline: "For combined materials + services businesses scaling regionally.",
    icon: ChartIncreaseIcon,
    monthly: 449,
    annual: 359,
    ctaLabel: "Book a demo",
    ctaHref: "#quote",
    highlighted: true,
    meta: [
      { label: "Users", value: "Up to 25" },
      { label: "Branches", value: "Up to 4" },
      { label: "Orders / mo", value: "5,000" },
      { label: "Catalog SKUs", value: "20,000" },
    ],
    features: [
      { label: "Everything in Starter", included: true },
      { label: "Service quoting & digital sign-off", included: true },
      { label: "Project workspace & field reports", included: true },
      { label: "Multi-branch inventory & transfers", included: true },
      { label: "Net-30 / net-60 billing", included: true },
      { label: "Customer portal & RFQ inbox", included: true },
      { label: "Accounting & ERP integrations", included: true },
      { label: "Dedicated onboarding manager", included: true },
    ],
  },
  {
    id: "enterprise",
    name: "Enterprise",
    tagline: "For multi-region operators with custom workflows and audit needs.",
    icon: Building03Icon,
    monthly: null,
    annual: null,
    ctaLabel: "Talk to sales",
    ctaHref: "#sales",
    meta: [
      { label: "Users", value: "Unlimited" },
      { label: "Branches", value: "Unlimited" },
      { label: "Orders / mo", value: "Unlimited" },
      { label: "Catalog SKUs", value: "Unlimited" },
    ],
    features: [
      { label: "Everything in Growth", included: true },
      { label: "Custom contract pricing per buyer", included: true },
      { label: "Approval workflows & spend limits", included: true },
      { label: "SSO, SCIM, audit logs, SOC 2 reports", included: true },
      { label: "Dedicated infra & SLAs (99.99%)", included: true },
      { label: "Custom integrations & API quotas", included: true },
      { label: "Priority security review", included: true },
      { label: "Named CSM + quarterly business reviews", included: true },
    ],
  },
]

export function PricingTiers({ billing }: { billing: Billing }) {
  return (
    <section className="relative -mt-32 pb-24">
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
        Prices in USD. Plus payment processing (1.9% + $0.30 / order, waived on
        Enterprise). 14-day free trial on Starter and Growth — no card required.
      </p>
    </section>
  )
}

function TierCard({ tier, billing }: { tier: Tier; billing: Billing }) {
  const price = billing === "annual" ? tier.annual : tier.monthly
  const isCustom = price === null

  return (
    <article
      className={cn(
        "relative flex flex-col rounded-md p-7 transition-shadow",
        tier.highlighted
          ? "bg-brand-orange text-white shadow-[0_30px_60px_-30px_rgba(255,116,32,0.6)]"
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
                ${price}
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
            : "bg-brand-orange text-white hover:bg-brand-orange-soft"
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
