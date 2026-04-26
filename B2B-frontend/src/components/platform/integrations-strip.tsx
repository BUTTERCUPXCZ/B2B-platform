import { HugeiconsIcon } from "@hugeicons/react"
import { LinkIcon, ArrowRight01Icon } from "@hugeicons/core-free-icons"
import { StaggerGroup, StaggerItem } from "@/components/motion/primitives"
import { staggerFast } from "@/components/motion/variants"

const integrations = [
  { name: "QuickBooks", category: "Accounting" },
  { name: "Xero", category: "Accounting" },
  { name: "SAP B1", category: "ERP" },
  { name: "NetSuite", category: "ERP" },
  { name: "Stripe", category: "Payments" },
  { name: "Adyen", category: "Payments" },
  { name: "Shopify", category: "Storefront" },
  { name: "Shippo", category: "Shipping" },
  { name: "EasyPost", category: "Shipping" },
  { name: "Slack", category: "Comms" },
  { name: "Zapier", category: "Automation" },
  { name: "HubSpot", category: "CRM" },
]

export function IntegrationsStrip() {
  return (
    <section className="relative overflow-hidden bg-brand-orange py-20 text-white">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-10 lg:grid-cols-[1fr_2fr] lg:items-end">
          <div>
            <span className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-[0.3em] text-brand-black uppercase">
              <HugeiconsIcon icon={LinkIcon} className="size-3.5" />
              Integrations
            </span>
            <h2 className="mt-3 text-3xl leading-tight font-extrabold tracking-tight sm:text-4xl">
              Plays Well With Your
              <br />
              Existing Stack.
            </h2>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/85">
              Buildora ships with first-party integrations across accounting,
              ERP, payments, shipping, and comms — and a typed REST + webhook
              API for everything else.
            </p>
            <a
              href="#"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-brand-black px-5 py-2.5 text-xs font-semibold tracking-[0.2em] text-white uppercase transition-colors hover:bg-brand-ink"
            >
              See full directory
              <HugeiconsIcon icon={ArrowRight01Icon} className="size-3.5" />
            </a>
          </div>

          <StaggerGroup
            className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4"
            variants={staggerFast}
          >
            {integrations.map((i) => (
              <StaggerItem
                key={i.name}
                className="rounded-md bg-white/10 p-4 ring-1 ring-white/10 backdrop-blur-sm transition-colors hover:bg-white/15"
              >
                <p className="text-base font-bold tracking-tight">{i.name}</p>
                <p className="mt-1 text-[10px] font-semibold tracking-[0.2em] text-white/70 uppercase">
                  {i.category}
                </p>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </div>
    </section>
  )
}
