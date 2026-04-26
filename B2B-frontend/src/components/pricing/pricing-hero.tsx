import { useState } from "react"
import { motion } from "motion/react"
import { cn } from "@/lib/utils"
import { fadeUp, stagger } from "@/components/motion/primitives"

export type Billing = "monthly" | "annual"

export function PricingHero({
  billing,
  onChange,
}: {
  billing: Billing
  onChange: (b: Billing) => void
}) {
  return (
    <section className="relative isolate overflow-hidden bg-brand-ink pt-44 pb-20 text-white">
      <div
        aria-hidden
        className="absolute inset-0 bg-cover bg-center opacity-30"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1920&q=80&auto=format&fit=crop')",
        }}
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-b from-brand-ink/95 via-brand-ink/80 to-brand-ink"
      />
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-brand-ink to-transparent"
      />

      <motion.div
        className="relative mx-auto max-w-4xl px-6 text-center"
        initial="hidden"
        animate="show"
        variants={stagger}
      >
        <motion.h1
          variants={fadeUp}
          className="mt-6 text-5xl leading-[1.05] font-extrabold tracking-tight sm:text-6xl"
        >
          Pricing That Scales With
          <br />
          <span className="text-brand-orange">Your Construction Business.</span>
        </motion.h1>

        <motion.p
          variants={fadeUp}
          className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-white/75"
        >
          One platform, three tiers. Start with the storefront, add quoting and
          project workspace as you grow, and consolidate onto Enterprise when
          you need contract pricing, multi-branch, and dedicated support.
        </motion.p>

        <motion.div variants={fadeUp}>
          <BillingToggle billing={billing} onChange={onChange} />
        </motion.div>
      </motion.div>
    </section>
  )
}

function BillingToggle({
  billing,
  onChange,
}: {
  billing: Billing
  onChange: (b: Billing) => void
}) {
  return (
    <div className="mt-10 inline-flex items-center gap-1 rounded-full border border-white/15 bg-white/5 p-1 text-xs font-semibold backdrop-blur">
      {(["monthly", "annual"] as const).map((b) => (
        <button
          key={b}
          type="button"
          onClick={() => onChange(b)}
          className={cn(
            "relative rounded-full px-5 py-2 tracking-[0.18em] uppercase transition-colors",
            billing === b ? "text-white" : "text-white/65 hover:text-white"
          )}
        >
          {billing === b && (
            <motion.span
              layoutId="billing-pill"
              className="absolute inset-0 rounded-full bg-brand-orange shadow-lg"
              transition={{ type: "spring", stiffness: 320, damping: 30 }}
            />
          )}
          {b === "annual" ? (
            <span className="relative flex items-center gap-2">
              Annual
              <span
                className={cn(
                  "rounded-full px-2 py-0.5 text-[9px] tracking-wider",
                  billing === "annual"
                    ? "bg-white/20 text-white"
                    : "bg-brand-orange/15 text-brand-orange"
                )}
              >
                −20%
              </span>
            </span>
          ) : (
            <span className="relative">Monthly</span>
          )}
        </button>
      ))}
    </div>
  )
}

export function useBilling() {
  return useState<Billing>("annual")
}
