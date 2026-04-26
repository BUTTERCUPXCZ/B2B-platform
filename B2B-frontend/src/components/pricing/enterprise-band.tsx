import { HugeiconsIcon } from "@hugeicons/react"
import {
  ArrowRight01Icon,
  Building03Icon,
  UserMultipleIcon,
  ChartIncreaseIcon,
} from "@hugeicons/core-free-icons"

const points = [
  {
    icon: Building03Icon,
    title: "Multi-branch sellers",
    body: "Run a regional chain of yards or stores under one Pro account. Listings stay branch-scoped; payouts can be split per location.",
  },
  {
    icon: UserMultipleIcon,
    title: "Custom contract pricing",
    body: "Negotiate per-buyer prices for your top contractors directly inside Buildora. Automatic order discounts, no spreadsheets.",
  },
  {
    icon: ChartIncreaseIcon,
    title: "Top-of-feed reach",
    body: "Pro sellers earn the lowest commission and the highest visibility — top placement on home, search, and category pages.",
  },
]

export function EnterpriseBand() {
  return (
    <section className="relative overflow-hidden bg-brand-orange py-20 text-white">
      <div
        aria-hidden
        className="absolute inset-0 bg-cover bg-center opacity-10 mix-blend-overlay"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1600&q=80&auto=format&fit=crop')",
        }}
      />
      <div className="relative mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-[1fr_1.3fr] lg:items-center">
        <div>
          <span className="text-[11px] font-semibold tracking-[0.3em] text-brand-black uppercase">
            Pro Plan
          </span>
          <h2 className="mt-3 text-4xl leading-tight font-extrabold tracking-tight sm:text-[42px]">
            Top-of-feed reach.
            <br />
            Lowest commission.
          </h2>
          <p className="mt-5 max-w-md text-sm leading-relaxed text-white/85">
            For high-volume sellers running multiple branches or service
            crews. Daily payouts, the lowest commissions on the platform, a
            dedicated success manager, and prime placement that puts your
            listings in front of every relevant buyer.
          </p>
          <a
            href="#sales"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-brand-black px-6 py-3 text-xs font-semibold tracking-[0.2em] text-white uppercase transition-colors hover:bg-brand-ink"
          >
            Talk to Sales
            <span className="flex size-6 items-center justify-center rounded-full bg-brand-orange">
              <HugeiconsIcon icon={ArrowRight01Icon} className="size-3" />
            </span>
          </a>
        </div>

        <div className="grid gap-3 sm:grid-cols-3">
          {points.map((p) => (
            <article
              key={p.title}
              className="rounded-md bg-brand-black/40 p-5 backdrop-blur-sm ring-1 ring-white/10"
            >
              <span className="flex size-10 items-center justify-center rounded-md bg-white/10 text-white">
                <HugeiconsIcon icon={p.icon} className="size-5" />
              </span>
              <h3 className="mt-4 text-base font-semibold leading-tight">
                {p.title}
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-white/75">
                {p.body}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
