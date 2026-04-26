import { Link } from "@tanstack/react-router"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  ArrowRight01Icon,
  CheckmarkCircle02Icon,
  TruckIcon,
  PackageIcon,
  Wrench01Icon,
  BlockchainIcon,
  Building03Icon,
} from "@hugeicons/core-free-icons"
import { cn } from "@/lib/utils"
import { StaggerGroup, StaggerItem } from "@/components/motion/primitives"

const personas = [
  {
    icon: TruckIcon,
    name: "Materials Suppliers",
    pain: "Quoting cement, rebar, and aggregates over WhatsApp.",
    outcomes: [
      "Branded B2B storefront with contract pricing",
      "RFQ inbox that converts to quote in 3 clicks",
      "Net-30 billing for repeat contractor accounts",
    ],
    image:
      "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=900&q=80&auto=format&fit=crop",
  },
  {
    icon: PackageIcon,
    name: "Parts & Spares Sellers",
    pain: "Serialized inventory across branches with no source of truth.",
    outcomes: [
      "Serialized SKUs across every branch in one ledger",
      "Same-day buyer credit underwriting",
      "Inter-branch transfers without spreadsheets",
    ],
    image:
      "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=900&q=80&auto=format&fit=crop",
  },
  {
    icon: Wrench01Icon,
    name: "Service Contractors",
    pain: "Running renovations across crews, customers, and a paper logbook.",
    outcomes: [
      "Service catalog with reusable line items",
      "Project workspace with daily field reports",
      "Customer-facing timeline & invoice portal",
    ],
    image:
      "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=900&q=80&auto=format&fit=crop",
  },
  {
    icon: BlockchainIcon,
    name: "Combined Materials + Services",
    pain: "Two businesses pretending to be one, on five different tools.",
    outcomes: [
      "Shared customer record across products and projects",
      "Materials reserved straight from project plans",
      "One unified invoice covering both lines",
    ],
    image:
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=900&q=80&auto=format&fit=crop",
    highlight: true,
  },
  {
    icon: Building03Icon,
    name: "Hardware Retail Going Digital",
    pain: "A printed catalog and a cash register, watching wholesale incumbents move online.",
    outcomes: [
      "Live B2B catalog from existing inventory data",
      "Same-day net-terms approvals against your AR ledger",
      "9-week implementation, no IT team required",
    ],
    image:
      "https://images.unsplash.com/photo-1495433324511-bf8e92934d90?w=900&q=80&auto=format&fit=crop",
  },
]

export function PersonaGrid() {
  return (
    <section className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-6">
        <StaggerGroup className="grid gap-5 lg:grid-cols-2">
          {personas.map((p, idx) => (
            <StaggerItem
              key={p.name}
              className={cn(
                "group relative flex flex-col overflow-hidden rounded-md border bg-white transition-shadow hover:shadow-[0_30px_60px_-30px_rgba(0,0,0,0.25)]",
                p.highlight
                  ? "border-brand-orange/40 lg:col-span-2"
                  : "border-brand-black/10"
              )}
            >
              <div className="grid h-full gap-0 sm:grid-cols-[1fr_1.4fr]">
                <div
                  className="relative aspect-[4/3] sm:aspect-auto"
                  style={{
                    backgroundImage: `url('${p.image}')`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                >
                  {p.highlight && (
                    <span className="absolute top-4 left-4 rounded-full bg-brand-orange px-4 py-1.5 text-[10px] font-semibold tracking-[0.25em] text-white uppercase shadow-lg">
                      Our sweet spot
                    </span>
                  )}
                </div>

                <div className="flex flex-col justify-between p-7">
                  <div>
                    <span className="flex size-11 items-center justify-center rounded-md bg-brand-orange/10 text-brand-orange">
                      <HugeiconsIcon icon={p.icon} className="size-5" />
                    </span>
                    <span className="mt-5 block text-[10px] font-semibold tracking-[0.3em] text-brand-orange uppercase">
                      Persona 0{idx + 1}
                    </span>
                    <h3 className="mt-1 text-2xl font-extrabold tracking-tight text-brand-black">
                      {p.name}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-brand-black/55 italic">
                      {p.pain}
                    </p>
                    <ul className="mt-5 space-y-2 text-sm">
                      {p.outcomes.map((o) => (
                        <li
                          key={o}
                          className="flex items-start gap-2.5 text-brand-black/80"
                        >
                          <HugeiconsIcon
                            icon={CheckmarkCircle02Icon}
                            className="mt-0.5 size-4 shrink-0 text-brand-orange"
                          />
                          <span>{o}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Link
                    to="/platform"
                    className="mt-7 inline-flex items-center gap-2 self-start text-xs font-semibold tracking-[0.2em] text-brand-orange uppercase transition-colors hover:text-brand-black"
                  >
                    See how it works
                    <HugeiconsIcon icon={ArrowRight01Icon} className="size-3.5" />
                  </Link>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  )
}
