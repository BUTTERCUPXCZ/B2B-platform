import { useState } from "react"
import { AnimatePresence, motion } from "motion/react"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  ArrowLeft01Icon,
  ArrowRight01Icon,
  QuoteUpIcon,
  StarIcon,
} from "@hugeicons/core-free-icons"
import { cn } from "@/lib/utils"

type Review = {
  quote: string
  name: string
  title: string
  tag: "Material buyer" | "Service client"
  rating: number
  avatar: string
}

const reviews: Review[] = [
  {
    quote:
      "I order all my project cement and rebar through Buildora now. Prices beat my old yard, delivery hits the site on the day I scheduled, and the receipts auto-export to QuickBooks. Saved me at least 6 hours a week of running around.",
    name: "Marlon Reyes",
    title: "General Contractor · Reyes Build",
    tag: "Material buyer",
    rating: 5,
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80&auto=format&fit=crop",
  },
  {
    quote:
      "We needed a roof replaced before typhoon season. Posted the job on Sunday, had three quotes by Tuesday morning, hired Stormshield Wednesday — they finished a week ahead of schedule. The escrow gave me real peace of mind.",
    name: "Elena Marsh",
    title: "Homeowner · Quezon City",
    tag: "Service client",
    rating: 5,
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80&auto=format&fit=crop",
  },
  {
    quote:
      "The verified-pro badge actually means something. We hired a contractor through Buildora to extend our kitchen and the quality matched the photos in their portfolio. Milestone payments meant we never felt out of control.",
    name: "Daniel Okafor",
    title: "Homeowner · Makati",
    tag: "Service client",
    rating: 5,
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80&auto=format&fit=crop",
  },
]

export function BuyerReviews() {
  const [i, setI] = useState(0)
  const r = reviews[i]
  const prev = () => setI((p) => (p - 1 + reviews.length) % reviews.length)
  const next = () => setI((p) => (p + 1) % reviews.length)

  return (
    <section className="bg-brand-ink py-14 sm:py-16 lg:py-20 text-white">
      <div className="mx-auto max-w-3xl px-6 text-center">
        <span className="text-[11px] font-semibold tracking-[0.35em] text-brand-orange uppercase">
          Buyer Reviews
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

            <div className="mt-6 inline-flex items-center gap-1 text-brand-orange">
              {Array.from({ length: r.rating }).map((_, idx) => (
                <HugeiconsIcon key={idx} icon={StarIcon} className="size-4" />
              ))}
            </div>

            <div className="mt-4">
              <p className="text-base font-semibold">{r.name}</p>
              <p className="text-xs text-white/55">{r.title}</p>
              <span className="mt-3 inline-block rounded-full bg-brand-orange/15 px-3 py-1 text-[10px] font-semibold tracking-[0.25em] text-brand-orange uppercase">
                {r.tag}
              </span>
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="mt-8 flex items-center justify-center gap-3">
          <button
            type="button"
            onClick={prev}
            aria-label="Previous review"
            className="flex size-9 items-center justify-center rounded-full border border-white/20 text-white/65 transition-colors hover:border-brand-orange hover:text-brand-orange"
          >
            <HugeiconsIcon icon={ArrowLeft01Icon} className="size-3.5" />
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
                    ? "size-11 rounded-full ring-2 ring-brand-orange ring-offset-2 ring-offset-brand-ink"
                    : "size-7 opacity-50 hover:opacity-100"
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
            aria-label="Next review"
            className="flex size-9 items-center justify-center rounded-full border border-white/20 text-white/65 transition-colors hover:border-brand-orange hover:text-brand-orange"
          >
            <HugeiconsIcon icon={ArrowRight01Icon} className="size-3.5" />
          </button>
        </div>
      </div>
    </section>
  )
}
