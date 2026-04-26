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
    title: "Multi-region operators",
    body: "Run dozens of branches, multiple legal entities, and regional pricing books on shared infrastructure.",
  },
  {
    icon: UserMultipleIcon,
    title: "Procurement-grade buyer accounts",
    body: "SSO, spend limits, approval chains, and per-buyer contract pricing your largest customers expect.",
  },
  {
    icon: ChartIncreaseIcon,
    title: "Built-in compliance posture",
    body: "SOC 2 Type II, GDPR-ready DPA, audit logs, and dedicated infra options for regulated industries.",
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
            Enterprise
          </span>
          <h2 className="mt-3 text-4xl leading-tight font-extrabold tracking-tight sm:text-[42px]">
            Built For The Largest
            <br />
            Construction Operators.
          </h2>
          <p className="mt-5 max-w-md text-sm leading-relaxed text-white/85">
            When you outgrow the Growth tier — multi-region, multi-entity,
            audited, integrated — Enterprise gives you a dedicated CSM,
            custom contracts, and infrastructure that meets procurement
            standards for the largest buyers in the industry.
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
