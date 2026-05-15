import { useState, useMemo } from "react"
import { Link } from "@tanstack/react-router"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  Calculator01Icon,
  Home09Icon,
  Building01Icon,
  FlipRightIcon,
  CheckmarkCircle02Icon,
  ShoppingCart01Icon,
  Briefcase01Icon,
} from "@hugeicons/core-free-icons"

import { Header } from "@/components/landing/header"
import { Footer } from "@/components/landing/footer"
import { peso } from "@/components/shared/price-tag"

// ─── rates ───────────────────────────────────────────────────────────────────

const RATE: Record<"standard" | "mid" | "premium", number> = {
  standard: 18_000,
  mid:      28_000,
  premium:  45_000,
}

const REGION_FACTOR: Record<string, number> = {
  ncr:        1.00,
  calabarzon: 0.95,
  central_visayas: 0.92,
  davao:      0.88,
  other:      0.90,
}

const STOREY_FACTOR: Record<number, number> = {
  1: 1.00,
  2: 1.75,
  3: 2.45,
}

const BREAKDOWN = { materials: 0.55, labor: 0.35, contingency: 0.10 }

// ─── types ───────────────────────────────────────────────────────────────────

type Tier = "standard" | "mid" | "premium"

// ─── component ───────────────────────────────────────────────────────────────

export function EstimateIntakePage() {
  const [sqm,     setSqm]    = useState(95)
  const [region,  setRegion] = useState("ncr")
  const [tier,    setTier]   = useState<Tier>("mid")
  const [storeys, setStoreys]= useState(1)

  const est = useMemo(() => {
    const base     = sqm * RATE[tier] * REGION_FACTOR[region] * STOREY_FACTOR[storeys]
    const low      = Math.round(base * 0.90)
    const high     = Math.round(base * 1.15)
    const mid      = Math.round(base)
    return {
      low, high, mid,
      materials:   Math.round(mid * BREAKDOWN.materials),
      labor:       Math.round(mid * BREAKDOWN.labor),
      contingency: Math.round(mid * BREAKDOWN.contingency),
    }
  }, [sqm, region, tier, storeys])

  return (
    <div className="bg-gray-100">
      <Header />

      {/* ── hero ── */}
      <section className="bg-brand-ink pt-24 pb-10 text-white sm:pt-28">
        <div className="mx-auto max-w-[1280px] px-6 sm:px-12 lg:px-20">
          <span className="inline-flex items-center gap-2 rounded-none bg-brand-orange/20 px-3 py-1 text-xs font-semibold tracking-widest text-brand-orange uppercase">
            <HugeiconsIcon icon={Calculator01Icon} className="size-3.5" />
            Free budget tool
          </span>
          <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
            Construction cost estimator
          </h1>
          <p className="mt-3 max-w-2xl text-base text-white/60">
            Get an instant budget range for your building project. Fill in the details
            and see a real-time breakdown of materials, labor, and contingency.
          </p>
        </div>
      </section>

      {/* ── calculator ── */}
      <main className="mx-auto max-w-[1280px] px-6 pb-24 pt-10 sm:px-12 lg:px-20">
        <div className="grid gap-8 lg:grid-cols-[1fr_400px]">

          {/* ── inputs ── */}
          <div className="space-y-6">

            {/* floor area + storeys */}
            <Card title="Building size">
              <div className="grid gap-5 sm:grid-cols-2">
                <Field label="Floor area (sqm)">
                  <div className="flex items-center gap-3">
                    <input
                      type="range"
                      min={20}
                      max={500}
                      step={5}
                      value={sqm}
                      onChange={(e) => setSqm(Number(e.target.value))}
                      className="w-full accent-brand-orange"
                    />
                    <input
                      type="number"
                      min={1}
                      value={sqm}
                      onChange={(e) => setSqm(Math.max(1, Number(e.target.value)))}
                      className="w-20 shrink-0 border border-border bg-white px-3 py-2 text-center text-sm font-semibold text-brand-black focus-visible:border-brand-orange focus-visible:outline-none"
                    />
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Typical home: 60–150 sqm
                  </p>
                </Field>

                <Field label="Number of storeys">
                  <div className="flex gap-2">
                    {([1, 2, 3] as const).map((n) => (
                      <button
                        key={n}
                        type="button"
                        onClick={() => setStoreys(n)}
                        className={`flex flex-1 flex-col items-center gap-1 rounded-none border py-3 text-sm font-semibold transition-colors ${
                          storeys === n
                            ? "border-brand-orange bg-brand-orange/5 text-brand-orange"
                            : "border-border bg-white text-brand-black/70 hover:border-brand-black/30"
                        }`}
                      >
                        <HugeiconsIcon
                          icon={n === 1 ? Home09Icon : n === 2 ? Building01Icon : FlipRightIcon}
                          className="size-5"
                        />
                        {n === 3 ? "3+" : n}
                      </button>
                    ))}
                  </div>
                </Field>
              </div>
            </Card>

            {/* location */}
            <Card title="Location">
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Region">
                  <select
                    value={region}
                    onChange={(e) => setRegion(e.target.value)}
                    className="h-11 w-full border border-border bg-white px-3 text-sm focus-visible:border-brand-orange focus-visible:outline-none"
                  >
                    <option value="ncr">NCR / Metro Manila</option>
                    <option value="calabarzon">Calabarzon</option>
                    <option value="central_visayas">Central Visayas (Cebu)</option>
                    <option value="davao">Davao Region</option>
                    <option value="other">Other regions</option>
                  </select>
                </Field>
              </div>
            </Card>

            {/* finish quality */}
            <Card title="Finish quality">
              <div className="grid gap-3 sm:grid-cols-3">
                {([
                  {
                    id: "standard" as Tier,
                    label: "Standard",
                    hint: "Basic finishes — CHB, plain tiles, skim coat paint",
                    rate: RATE.standard,
                  },
                  {
                    id: "mid" as Tier,
                    label: "Mid-range",
                    hint: "Porcelain tiles, acrylic paint, powder-coated grilles",
                    rate: RATE.mid,
                  },
                  {
                    id: "premium" as Tier,
                    label: "Premium",
                    hint: "Imported tiles, granite, branded fixtures, facade cladding",
                    rate: RATE.premium,
                  },
                ]).map((t) => (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => setTier(t.id)}
                    className={`flex flex-col gap-2 rounded-none border p-4 text-left transition-colors ${
                      tier === t.id
                        ? "border-brand-orange bg-brand-orange/5"
                        : "border-border bg-white hover:border-brand-black/30"
                    }`}
                  >
                    <span
                      className={`text-sm font-bold ${tier === t.id ? "text-brand-orange" : "text-brand-black"}`}
                    >
                      {t.label}
                    </span>
                    <span className="text-xs text-muted-foreground">{t.hint}</span>
                    <span className="mt-1 text-xs font-semibold text-brand-black/50">
                      ~{peso(t.rate)}/sqm
                    </span>
                  </button>
                ))}
              </div>
            </Card>

            {/* disclaimer */}
            <p className="text-xs text-muted-foreground">
              * Estimate covers structural works, finishing, and MEP rough-in for a typical
              residential build. Excludes lot, permits, architect fees, and site-specific
              conditions. Prices based on current NCR market rates (2025–2026).
            </p>
          </div>

          {/* ── results ── */}
          <aside className="lg:sticky lg:top-28 lg:self-start space-y-4">

            {/* total range */}
            <div className="rounded-none border border-brand-orange bg-brand-orange/5 p-6">
              <p className="text-xs font-semibold tracking-widest text-brand-orange uppercase">
                Estimated budget
              </p>
              <p className="mt-2 text-3xl font-bold tracking-tight text-brand-black sm:text-4xl">
                {formatM(est.low)}
              </p>
              <p className="text-lg font-semibold text-brand-black/50">
                to {formatM(est.high)}
              </p>
              <p className="mt-2 text-xs text-muted-foreground">
                Midpoint: {peso(est.mid)} · {sqm} sqm · {storeys} {storeys === 1 ? "storey" : "storeys"}
              </p>
            </div>

            {/* breakdown */}
            <div className="rounded-none border border-border bg-white p-6 space-y-5">
              <h2 className="text-sm font-bold tracking-tight text-brand-black">
                Cost breakdown
              </h2>

              <BreakdownRow
                label="Materials"
                amount={est.materials}
                total={est.mid}
                color="bg-brand-orange"
              />
              <BreakdownRow
                label="Labor"
                amount={est.labor}
                total={est.mid}
                color="bg-brand-black"
              />
              <BreakdownRow
                label="Contingency (10%)"
                amount={est.contingency}
                total={est.mid}
                color="bg-muted-foreground/40"
              />
            </div>

            {/* CTAs */}
            <div className="rounded-none border border-border bg-white p-5 space-y-3">
              <p className="text-xs font-semibold tracking-widest text-brand-black/60 uppercase">
                Ready to build?
              </p>
              <Link
                to="/shop"
                className="flex items-center gap-3 rounded-none border border-border bg-white px-4 py-3 text-sm font-semibold text-brand-black transition-colors hover:border-brand-orange hover:text-brand-orange"
              >
                <HugeiconsIcon icon={ShoppingCart01Icon} className="size-4 shrink-0" />
                Browse materials in the shop
              </Link>
              <Link
                to="/jobs/post"
                className="flex items-center gap-3 rounded-none border border-border bg-white px-4 py-3 text-sm font-semibold text-brand-black transition-colors hover:border-brand-orange hover:text-brand-orange"
              >
                <HugeiconsIcon icon={Briefcase01Icon} className="size-4 shrink-0" />
                Post a job for contractors
              </Link>
            </div>

            {/* what's included */}
            <div className="rounded-none border border-border bg-white p-5">
              <p className="mb-3 text-xs font-semibold tracking-widest text-brand-black/60 uppercase">
                What's included
              </p>
              <ul className="space-y-2">
                {[
                  "Structural works (foundation, CHB, slab)",
                  "Roofing system",
                  "Doors & windows (standard)",
                  "Electrical rough-in & fixtures",
                  "Plumbing rough-in & fixtures",
                  "Tiling & painting",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-xs text-brand-black/70">
                    <HugeiconsIcon icon={CheckmarkCircle02Icon} className="mt-0.5 size-3.5 shrink-0 text-brand-orange" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </main>

      <Footer />
    </div>
  )
}

// ─── helpers ─────────────────────────────────────────────────────────────────

function formatM(n: number) {
  if (n >= 1_000_000) return `₱${(n / 1_000_000).toFixed(2)}M`
  if (n >= 1_000)     return `₱${(n / 1_000).toFixed(0)}K`
  return peso(n)
}

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="rounded-none border border-border bg-white p-6 sm:p-8">
      <h2 className="mb-5 text-base font-bold tracking-tight text-brand-black">{title}</h2>
      {children}
    </section>
  )
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1.5">
      <span className="text-xs font-semibold tracking-wide text-brand-black/70 uppercase">
        {label}
      </span>
      {children}
    </div>
  )
}

function BreakdownRow({
  label,
  amount,
  total,
  color,
}: {
  label: string
  amount: number
  total: number
  color: string
}) {
  const pct = Math.round((amount / total) * 100)
  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between text-sm">
        <span className="text-brand-black/70">{label}</span>
        <span className="font-semibold text-brand-black">{peso(amount)}</span>
      </div>
      <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
        <div
          className={`h-full rounded-full ${color} transition-all duration-300`}
          style={{ width: `${pct}%` }}
        />
      </div>
      <p className="text-xs text-muted-foreground">{pct}% of total</p>
    </div>
  )
}
