import { HugeiconsIcon } from "@hugeicons/react"
import {
  Pdf02Icon,
  Calendar03Icon,
  Location01Icon,
  Square01Icon,
  Shield02Icon,
  AlertCircleIcon,
} from "@hugeicons/core-free-icons"

import { Header } from "@/components/landing/header"
import { Footer } from "@/components/landing/footer"
import { Breadcrumbs } from "@/components/shared/breadcrumbs"
import { peso } from "@/components/shared/price-tag"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { type Estimate } from "./estimates-data"
import { LaborTable, MaterialsTable } from "./cost-breakdown-table"

const tierLabels: Record<Estimate["tier"], string> = {
  standard: "Standard finishes",
  mid: "Mid-range finishes",
  premium: "Premium finishes",
}

export function EstimateReportPage({ estimate }: { estimate: Estimate }) {
  const print = () => window.print()

  return (
    <div className="bg-background">
      <Header />
      <main className="pt-32 pb-20 print:pt-8">
        <div className="mx-auto max-w-5xl px-6 sm:px-10 lg:px-16">
          <div className="print:hidden">
            <Breadcrumbs
              className="mb-6"
              items={[
                { label: "Fair Cost Estimation", to: "/estimate" },
                { label: estimate.id },
              ]}
            />
          </div>

          <div className="rounded-none border border-border bg-white p-6 sm:p-10 print:border-0 print:p-0">
            <header className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between print:gap-2">
              <div>
                <p className="text-xs tracking-widest text-brand-orange uppercase">
                  STRUKTURA · Fair Cost Estimate
                </p>
                <h1 className="mt-1 text-3xl font-bold tracking-tight text-brand-black sm:text-4xl">
                  {estimate.projectType}
                </h1>
                <p className="mt-1 text-sm text-muted-foreground">{estimate.id}</p>
              </div>
              <button
                type="button"
                onClick={print}
                className="inline-flex h-11 items-center justify-center gap-2 rounded-none bg-brand-black px-6 text-xs font-semibold tracking-widest text-white uppercase hover:bg-brand-black/90 print:hidden"
              >
                <HugeiconsIcon icon={Pdf02Icon} className="size-4" />
                Download PDF
              </button>
            </header>

            <section className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              <Meta icon={Location01Icon} label="Location" value={estimate.location} />
              <Meta icon={Square01Icon} label="Floor area" value={`${estimate.areaSqm} sqm`} />
              <Meta
                icon={Calendar03Icon}
                label="Valid until"
                value={estimate.validUntil}
              />
              <Meta
                icon={Shield02Icon}
                label="Estimator"
                value={estimate.estimatorName}
              />
            </section>

            <div className="mt-3">
              <Badge variant="muted" size="lg">
                {tierLabels[estimate.tier]}
              </Badge>
            </div>

            <Separator className="my-8" />

            <section className="space-y-3">
              <h2 className="text-xl font-bold tracking-tight text-brand-black">
                Materials breakdown
              </h2>
              <MaterialsTable rows={estimate.materials} />
            </section>

            <section className="mt-8 space-y-3">
              <h2 className="text-xl font-bold tracking-tight text-brand-black">
                Labor breakdown
              </h2>
              <LaborTable rows={estimate.labor} />
            </section>

            <section className="mt-8 space-y-2 rounded-none border border-border bg-muted/40 p-6">
              <h3 className="text-sm font-semibold text-brand-black">Adjustments</h3>
              <Row
                label={`Contingency buffer (${estimate.contingencyPct}%)`}
                value={peso(estimate.contingency)}
                hint="Industry standard for unforeseen costs."
              />
              <Row
                label={`Regional pricing adjustment (${estimate.regionalAdjPct}%)`}
                value={peso(estimate.regionalAdjustment)}
                hint="Reflects local material/labor rates."
              />
            </section>

            <section className="mt-6 rounded-none border-2 border-brand-orange bg-brand-orange/5 p-6">
              <div className="flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
                <div>
                  <p className="text-xs tracking-widest text-muted-foreground uppercase">
                    Estimated total
                  </p>
                  <p className="text-3xl font-bold tracking-tight text-brand-black sm:text-4xl">
                    {peso(estimate.total)}
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Subtotal {peso(estimate.subtotal)} · contingency
                    {" "}
                    {peso(estimate.contingency)} · regional adj.
                    {" "}
                    {peso(estimate.regionalAdjustment)}
                  </p>
                </div>
                <Badge variant="topRated" size="lg">
                  Valid until {estimate.validUntil}
                </Badge>
              </div>
            </section>

            <section className="mt-6 flex items-start gap-3 rounded-none border border-amber-200 bg-amber-50 p-5 text-sm text-amber-900">
              <HugeiconsIcon
                icon={AlertCircleIcon}
                className="mt-0.5 size-4 shrink-0"
              />
              <div>
                <p className="font-semibold">Notes from your estimator</p>
                <p className="mt-1">{estimate.notes}</p>
              </div>
            </section>

            <footer className="mt-10 flex flex-col gap-2 border-t border-border pt-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
              <span>
                This estimate was prepared by {estimate.estimatorName} on the STRUKTURA
                platform. Pricing is non-binding until contract.
              </span>
              <span className="tracking-widest uppercase">struktura.ph · {estimate.id}</span>
            </footer>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

function Meta({
  icon,
  label,
  value,
}: {
  icon: typeof Location01Icon
  label: string
  value: string
}) {
  return (
    <div className="flex items-center gap-3 rounded-none border border-border bg-white p-4">
      <span className="flex size-9 shrink-0 items-center justify-center rounded-none bg-brand-orange/10 text-brand-orange">
        <HugeiconsIcon icon={icon} className="size-4" />
      </span>
      <div className="min-w-0">
        <p className="text-[10px] tracking-widest text-muted-foreground uppercase">
          {label}
        </p>
        <p className="truncate text-sm font-semibold text-brand-black">{value}</p>
      </div>
    </div>
  )
}

function Row({
  label,
  value,
  hint,
}: {
  label: string
  value: string
  hint?: string
}) {
  return (
    <div className="flex items-start justify-between gap-4 text-sm">
      <div>
        <p className="font-medium text-brand-black">{label}</p>
        {hint && <p className="text-xs text-muted-foreground">{hint}</p>}
      </div>
      <p className="font-semibold tabular-nums text-brand-black">{value}</p>
    </div>
  )
}
