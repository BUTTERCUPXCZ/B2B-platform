import { useState } from "react"
import { HugeiconsIcon } from "@hugeicons/react"
import { PlusSignIcon } from "@hugeicons/core-free-icons"
import { cn } from "@/lib/utils"
import { StaggerGroup, StaggerItem } from "@/components/motion/primitives"

const faqs = [
  {
    q: "Is Levite really free for buyers?",
    a: "Yes — buyers never pay a membership fee, transaction fee, or commission. The seller pays a transparent commission per order, which is already built into the listed price. What you see at checkout is what you pay.",
  },
  {
    q: "How does the seller commission work?",
    a: "Commission is taken automatically per fulfilled order. Material orders: 8% on Starter, 5% on Growth, 3% on Pro. Service jobs: 8% / 6% / 4% per won job. Payment processing is included — no card-network add-ons.",
  },
  {
    q: "What's the difference between Starter, Growth, and Pro?",
    a: "Starter is free and ideal for small sellers testing the platform — list up to 100 items, pay only when you sell. Growth adds featured placement, analytics, promo tools, and lower commissions. Pro is for high-volume sellers — unlimited listings, top-of-feed placement, daily payouts, and a dedicated CSM.",
  },
  {
    q: "Can I switch between seller tiers later?",
    a: "Yes — upgrade or downgrade anytime. Annual sellers can step up immediately (we prorate the difference) and right-size at renewal. Listings, orders, and reviews stay intact across tier changes.",
  },
  {
    q: "How fast do I get paid?",
    a: "Weekly payouts to your bank on Starter and Growth (every Friday for the previous week). Pro sellers get daily payouts with same-day settlement on weekdays.",
  },
  {
    q: "Do service contractors pay the same?",
    a: "Service contractors apply free and pay only the per-won-job commission (8% / 6% / 4% by tier). Subscriptions are optional but unlock featured placement and the verified-pro badge that boosts win rates by 3.2×.",
  },
  {
    q: "What if a buyer disputes an order?",
    a: "Levite holds the buyer's payment in escrow until they sign off. If a dispute is opened, our team reviews transaction logs and mediates within 3 business days — refunding the buyer or releasing funds to the seller based on the evidence.",
  },
]

export function PricingFAQ() {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <section className="bg-[#f5f3ef] py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-4xl px-6">
        <div className="mb-12 text-center">
          <span className="text-[11px] font-semibold tracking-[0.3em] text-brand-orange uppercase">
            Pricing FAQ
          </span>
          <h2 className="mt-3 text-4xl leading-tight font-extrabold tracking-tight text-brand-black sm:text-[44px]">
            Questions, Answered.
          </h2>
        </div>

        <StaggerGroup className="space-y-3">
          {faqs.map((f, i) => {
            const isOpen = open === i
            return (
              <StaggerItem
                key={f.q}
                className={cn(
                  "overflow-hidden rounded-md border bg-white transition-colors",
                  isOpen
                    ? "border-brand-orange/40 shadow-[0_20px_40px_-30px_rgba(255,116,32,0.5)]"
                    : "border-brand-black/10"
                )}
              >
                <button
                  type="button"
                  aria-expanded={isOpen}
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-6 px-6 py-5 text-left"
                >
                  <span className="text-base font-semibold text-brand-black">
                    {f.q}
                  </span>
                  <span
                    className={cn(
                      "flex size-9 shrink-0 items-center justify-center rounded-full transition-all",
                      isOpen
                        ? "rotate-45 bg-brand-orange text-white"
                        : "bg-brand-orange/10 text-brand-orange"
                    )}
                  >
                    <HugeiconsIcon icon={PlusSignIcon} className="size-4" />
                  </span>
                </button>
                <div
                  className={cn(
                    "grid transition-[grid-template-rows] duration-300 ease-out",
                    isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                  )}
                >
                  <div className="overflow-hidden">
                    <p className="px-6 pb-5 text-sm leading-relaxed text-brand-black/75">
                      {f.a}
                    </p>
                  </div>
                </div>
              </StaggerItem>
            )
          })}
        </StaggerGroup>

        <p className="mt-12 text-center text-sm text-brand-black/75">
          Still unsure?{" "}
          <a
            href="#sales"
            className="font-semibold text-brand-orange hover:underline"
          >
            Talk to a product specialist →
          </a>
        </p>
      </div>
    </section>
  )
}
