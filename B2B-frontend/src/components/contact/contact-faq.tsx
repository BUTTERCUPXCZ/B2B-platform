import { useState } from "react"
import { HugeiconsIcon } from "@hugeicons/react"
import { PlusSignIcon } from "@hugeicons/core-free-icons"
import { cn } from "@/lib/utils"
import { StaggerGroup, StaggerItem } from "@/components/motion/primitives"

const faqs = [
  {
    q: "How fast will I hear back?",
    a: "Sales: under 4 business hours during your local working day. Support: same-day, with a 4-hour SLA on Growth and 1-hour on Enterprise. Press, partnerships, and other inquiries: within 1 business day.",
  },
  {
    q: "How long is a demo?",
    a: "Standard demos are 45 minutes — 10 minutes of context, 25 minutes of product walkthrough tailored to your business, 10 minutes of Q&A. Bring your team; we encourage 2–4 stakeholders.",
  },
  {
    q: "Do you offer a free trial?",
    a: "Yes — 14 days on Starter and Growth, no card required. Enterprise customers get a tailored sandbox environment during the sales process so you can run real data through it.",
  },
  {
    q: "Can you complete our security questionnaire?",
    a: "Yes. We respond to standard security questionnaires (CAIQ, SIG Lite, custom) within 5 business days. SOC 2 Type II reports, our DPA, and pen-test summaries are available under NDA on request.",
  },
]

export function ContactFAQ() {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <section className="bg-white py-24">
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
                    <p className="px-6 pb-5 text-sm leading-relaxed text-brand-black/65">
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
