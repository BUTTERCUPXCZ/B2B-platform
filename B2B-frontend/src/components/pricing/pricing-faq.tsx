import { useState } from "react"
import { HugeiconsIcon } from "@hugeicons/react"
import { PlusSignIcon } from "@hugeicons/core-free-icons"
import { cn } from "@/lib/utils"
import { StaggerGroup, StaggerItem } from "@/components/motion/primitives"

const faqs = [
  {
    q: "Can I switch between tiers later?",
    a: "Yes — upgrade or downgrade anytime. Annual contracts can be moved up at any time (we prorate the difference) and adjusted at renewal. No data migration required between tiers.",
  },
  {
    q: "What's the difference between Starter and Growth?",
    a: "Starter is a B2B materials storefront with buyer accounts and basic inventory. Growth adds the service quoting workflow, project workspace, multi-branch support, and net-terms billing — the full combined materials + services operator stack.",
  },
  {
    q: "Do you charge per transaction?",
    a: "On Starter and Growth, payment processing is 1.9% + $0.30 per order on top of the platform fee. Enterprise plans bundle processing into the contract or let you bring your own merchant account.",
  },
  {
    q: "What does implementation look like?",
    a: "Average go-live is 6–9 weeks. Growth and Enterprise include a dedicated implementation manager who handles catalog migration, buyer account import, and team training. Most customers replace 3–4 existing tools during onboarding.",
  },
  {
    q: "Is there a free trial?",
    a: "Yes — 14 days on Starter and Growth, no card required. Enterprise customers get a tailored sandbox during the sales process.",
  },
  {
    q: "What happens to my data if I cancel?",
    a: "You can export your full catalog, orders, quotes, and customer records at any time as CSV / JSON. Data is retained for 90 days post-cancellation, then permanently deleted on request per our DPA.",
  },
  {
    q: "Do you support custom integrations?",
    a: "Growth includes our standard integrations (QuickBooks, Xero, SAP B1, Stripe, major shipping carriers). Enterprise plans include scoped custom integration work and custom API quotas.",
  },
]

export function PricingFAQ() {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <section className="bg-[#f5f3ef] py-24">
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
                    <p className="px-6 pb-5 text-sm leading-relaxed text-brand-black/65">
                      {f.a}
                    </p>
                  </div>
                </div>
              </StaggerItem>
            )
          })}
        </StaggerGroup>

        <p className="mt-12 text-center text-sm text-brand-black/65">
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
