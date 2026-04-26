import { useState } from "react"
import { AnimatePresence, motion } from "motion/react"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  ArrowLeft01Icon,
  ArrowRight01Icon,
  QuoteUpIcon,
} from "@hugeicons/core-free-icons"
import { cn } from "@/lib/utils"

const reviews = [
  {
    quote:
      "Buildora replaced four tools and a WhatsApp group. We now process orders for 12 contractor accounts on net terms, and our quote turnaround dropped from three days to under four hours.",
    name: "Marlon Reyes",
    title: "COO, Skyline Materials",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80&auto=format&fit=crop",
  },
  {
    quote:
      "We run a 24-crew renovation business. The project workspace and field photo logs alone saved us a full ops hire. Buildora paid for itself in the first quarter.",
    name: "Elena Marsh",
    title: "Founder, Heritage Renovation Co.",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80&auto=format&fit=crop",
  },
  {
    quote:
      "Our hardware chain went from a paper catalog to a live B2B storefront in nine weeks. Same-day net-terms approvals are a real moat against the wholesale incumbents.",
    name: "Daniel Okafor",
    title: "GM, Foundry Hardware",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80&auto=format&fit=crop",
  },
]

export function Testimonial() {
  const [i, setI] = useState(0)
  const r = reviews[i]
  const prev = () => setI((p) => (p - 1 + reviews.length) % reviews.length)
  const next = () => setI((p) => (p + 1) % reviews.length)

  return (
    <section className="bg-brand-ink py-20 text-white">
      <div className="mx-auto max-w-3xl px-6 text-center">
        <span className="text-[11px] font-semibold tracking-[0.35em] text-brand-orange uppercase">
          What Our Customers Say
        </span>

        <HugeiconsIcon
          icon={QuoteUpIcon}
          className="mx-auto mt-6 size-8 text-brand-orange/60"
        />

        <AnimatePresence mode="wait">
          <motion.div
            key={r.name}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0, transition: { duration: 0.4 } }}
            exit={{ opacity: 0, y: -12, transition: { duration: 0.2 } }}
          >
            <p className="mt-4 text-base leading-relaxed text-white/85 sm:text-lg">
              &ldquo;{r.quote}&rdquo;
            </p>
            <div className="mt-8">
              <p className="text-base font-semibold">{r.name}</p>
              <p className="text-xs text-white/55">{r.title}</p>
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="mt-8 flex items-center justify-center gap-3">
          <button
            type="button"
            onClick={prev}
            aria-label="Previous testimonial"
            className="inline-flex items-center gap-2 text-xs text-white/60 transition-colors hover:text-white"
          >
            <span className="flex size-7 items-center justify-center rounded-full border border-white/20">
              <HugeiconsIcon icon={ArrowLeft01Icon} className="size-3" />
            </span>
            Prev
          </button>

          <div className="flex items-center gap-2">
            {reviews.map((rev, idx) => (
              <button
                key={rev.name}
                type="button"
                onClick={() => setI(idx)}
                aria-label={`Show ${rev.name}'s review`}
                className={cn(
                  "transition-all",
                  idx === i
                    ? "size-12 rounded-full ring-2 ring-brand-orange ring-offset-2 ring-offset-brand-ink"
                    : "size-8 opacity-50 hover:opacity-100"
                )}
              >
                <span
                  className="block size-full rounded-full bg-cover bg-center"
                  style={{ backgroundImage: `url('${rev.avatar}')` }}
                />
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={next}
            aria-label="Next testimonial"
            className="inline-flex items-center gap-2 text-xs text-white/60 transition-colors hover:text-white"
          >
            Next
            <span className="flex size-7 items-center justify-center rounded-full border border-white/20">
              <HugeiconsIcon icon={ArrowRight01Icon} className="size-3" />
            </span>
          </button>
        </div>
      </div>
    </section>
  )
}
