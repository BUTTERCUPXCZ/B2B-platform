import { useState } from "react"
import { HugeiconsIcon } from "@hugeicons/react"
import { PlusSignIcon } from "@hugeicons/core-free-icons"
import { cn } from "@/lib/utils"
import { StaggerGroup, StaggerItem } from "@/components/motion/primitives"

const faqs = [
  {
    q: "How fast will I hear back?",
    a: "Buyer support: under 1 hour during business hours, under 4 hours overnight. Seller success: same business day. Sales (becoming a seller): under 4 business hours. Press and partnerships: within 1 business day.",
  },
  {
    q: "I have an order issue — what do I do?",
    a: "Open a dispute directly from the order page in your account, or email help@leviteconstruction.com with your order ID. Funds stay in escrow while we investigate. Most disputes resolve within 36 hours.",
  },
  {
    q: "How do I become a seller?",
    a: "Submit the ‘Become a Seller’ form (or email sales@leviteconstruction.com). We verify your business permit and ID, then walk you through listing your first 10 items. Most sellers go live within 5 business days of applying.",
  },
  {
    q: "What about service contractors?",
    a: "Service contractors apply through the same channel and add a license check on top of the standard ID verification. Once approved, you appear in the contractor matchmaking feed for jobs in your trade and area.",
  },
]

export function ContactFAQ() {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <section className="bg-white py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-4xl px-6">
        <div className="mb-12 text-center">
          <span className="text-[11px] font-semibold tracking-[0.3em] text-brand-orange uppercase">
            Quick Answers
          </span>
          <h2 className="mt-3 text-3xl leading-tight font-extrabold tracking-tight text-brand-black sm:text-4xl">
            Before You Reach Out…
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
      </div>
    </section>
  )
}
