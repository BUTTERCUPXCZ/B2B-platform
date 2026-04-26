import { HugeiconsIcon } from "@hugeicons/react"
import {
  Search01Icon,
  ShoppingCart01Icon,
  TruckDeliveryIcon,
  PaintBrush01Icon,
  CustomerService01Icon,
  CheckmarkBadge02Icon,
  ShoppingBag03Icon,
  Wrench01Icon,
} from "@hugeicons/core-free-icons"
import { Reveal } from "@/components/motion/primitives"

type Step = {
  icon: typeof Search01Icon
  title: string
  body: string
}

const buyerSteps: Step[] = [
  {
    icon: Search01Icon,
    title: "Browse 24,000+ items",
    body: "Compare prices, reviews, and stock across verified suppliers in one feed.",
  },
  {
    icon: ShoppingCart01Icon,
    title: "Add to cart, pay safely",
    body: "Pay by card, GCash, bank transfer, or contractor net-terms.",
  },
  {
    icon: TruckDeliveryIcon,
    title: "Delivered to your site",
    body: "Track every order. Doorstep — or yard-side — drop-off, scheduled by you.",
  },
]

const serviceSteps: Step[] = [
  {
    icon: PaintBrush01Icon,
    title: "Describe the job",
    body: "Tell us what you need built. Photos, sizes, deadlines — whatever you have.",
  },
  {
    icon: CustomerService01Icon,
    title: "Compare quotes",
    body: "Get up to 5 bids from verified pros within 24 hours. Pick on price, rating, or availability.",
  },
  {
    icon: CheckmarkBadge02Icon,
    title: "Hire & track",
    body: "Pay through escrow. Funds release as each milestone is signed off.",
  },
]

export function HowItWorks() {
  return (
    <section className="bg-[#f5f3ef] py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal className="mb-12 text-center">
          <span className="text-[11px] font-semibold tracking-[0.3em] text-brand-orange uppercase">
            How it works
          </span>
          <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-brand-black sm:text-4xl">
            Two paths, one platform.
          </h2>
        </Reveal>

        <div className="grid gap-6 lg:grid-cols-2">
          <Path
            title="Buy materials"
            tagline="From cart to jobsite in days."
            icon={ShoppingBag03Icon}
            steps={buyerSteps}
          />
          <Path
            title="Book a builder"
            tagline="From idea to handover, fully managed."
            icon={Wrench01Icon}
            steps={serviceSteps}
          />
        </div>
      </div>
    </section>
  )
}

function Path({
  title,
  tagline,
  icon,
  steps,
}: {
  title: string
  tagline: string
  icon: typeof Search01Icon
  steps: Step[]
}) {
  return (
    <Reveal className="rounded-md border border-brand-black/10 bg-white p-7 sm:p-9">
      <div className="flex items-center gap-3">
        <span className="flex size-12 items-center justify-center rounded-md bg-brand-orange text-brand-ink">
          <HugeiconsIcon icon={icon} className="size-5" />
        </span>
        <div>
          <h3 className="text-2xl font-extrabold tracking-tight text-brand-black">
            {title}
          </h3>
          <p className="text-xs text-brand-black/55">{tagline}</p>
        </div>
      </div>

      <ol className="mt-8 space-y-5">
        {steps.map((s, i) => (
          <li key={s.title} className="flex gap-4">
            <div className="relative flex flex-col items-center">
              <span className="flex size-9 items-center justify-center rounded-full bg-brand-orange/10 text-sm font-bold text-brand-orange">
                {i + 1}
              </span>
              {i < steps.length - 1 && (
                <span className="mt-1 h-full w-px flex-1 bg-brand-orange/20" />
              )}
            </div>
            <div className="flex-1 pb-2">
              <div className="flex items-center gap-2">
                <HugeiconsIcon icon={s.icon} className="size-4 text-brand-orange" />
                <p className="text-sm font-semibold text-brand-black">{s.title}</p>
              </div>
              <p className="mt-1 text-xs leading-relaxed text-brand-black/60">
                {s.body}
              </p>
            </div>
          </li>
        ))}
      </ol>
    </Reveal>
  )
}
