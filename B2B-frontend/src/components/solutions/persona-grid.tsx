import { Link } from "@tanstack/react-router"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  ArrowRight01Icon,
  CheckmarkCircle02Icon,
  House04Icon,
  ToolsIcon,
  Building03Icon,
  Store02Icon,
  Wrench01Icon,
  PackageIcon,
} from "@hugeicons/core-free-icons"
import { cn } from "@/lib/utils"
import { StaggerGroup, StaggerItem } from "@/components/motion/primitives"

type Persona = {
  icon: typeof House04Icon
  side: "Buyer" | "Seller"
  name: string
  pain: string
  outcomes: string[]
  image: string
  highlight?: boolean
  cta: string
}

const personas: Persona[] = [
  // ---------- Buyer side ----------
  {
    icon: House04Icon,
    side: "Buyer",
    name: "Homeowners",
    pain: "You want to renovate the kitchen — but pricing is opaque and contractors are hard to vet.",
    outcomes: [
      "Compare materials by price, brand, and reviews",
      "Get up to 5 contractor bids in 24 hours",
      "Pay through escrow, only when work is signed off",
    ],
    image:
      "https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=900&q=80&auto=format&fit=crop",
    cta: "Start a project",
  },
  {
    icon: ToolsIcon,
    side: "Buyer",
    name: "Independent Contractors",
    pain: "Every job is a scramble to source cement, lumber, and hardware on time.",
    outcomes: [
      "Bulk pricing across 200+ verified suppliers",
      "Doorstep delivery scheduled to the hour",
      "Net-terms credit line for repeat buyers",
    ],
    image:
      "https://images.unsplash.com/photo-1572981779307-38b8cabb2407?w=900&q=80&auto=format&fit=crop",
    cta: "Open a contractor account",
  },
  {
    icon: Building03Icon,
    side: "Buyer",
    name: "Construction Companies",
    pain: "Procurement is split across five suppliers, three reps, and a WhatsApp group.",
    outcomes: [
      "One PO covers materials from multiple sellers",
      "Multi-user accounts with approval limits",
      "Volume contract pricing across the catalog",
    ],
    image:
      "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=900&q=80&auto=format&fit=crop",
    cta: "Talk to procurement",
  },

  // ---------- Seller side (sweet spot in the middle) ----------
  {
    icon: Store02Icon,
    side: "Seller",
    name: "Materials Suppliers",
    pain: "Your yard sells locally, but contractors three towns over can’t find you.",
    outcomes: [
      "Storefront live in days — no IT team required",
      "Reach 12,000+ verified buyers across the country",
      "Weekly payouts straight to your bank",
    ],
    image:
      "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=900&q=80&auto=format&fit=crop",
    cta: "Become a seller",
  },
  {
    icon: Wrench01Icon,
    side: "Seller",
    name: "Service Contractors",
    pain: "You’re great on the job, but bidding for new work is half your week.",
    outcomes: [
      "Pre-filtered job feed in your trade & area",
      "Verified-pro badge boosts win rate by 3.2×",
      "Escrow protection — paid for work delivered",
    ],
    image:
      "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=900&q=80&auto=format&fit=crop",
    cta: "Apply as a contractor",
    highlight: true,
  },
  {
    icon: PackageIcon,
    side: "Seller",
    name: "Hardware Retail Going Digital",
    pain: "A printed catalog and a cash register, watching marketplaces eat your foot traffic.",
    outcomes: [
      "Live online catalog from your existing inventory",
      "Same-day fulfillment for nearby buyers",
      "9-week launch, no engineering work needed",
    ],
    image:
      "https://images.unsplash.com/photo-1495433324511-bf8e92934d90?w=900&q=80&auto=format&fit=crop",
    cta: "Move online",
  },
]

export function PersonaGrid() {
  return (
    <section className="bg-white py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-6">
        <StaggerGroup className="grid gap-5 lg:grid-cols-2">
          {personas.map((p, idx) => (
            <StaggerItem
              key={p.name}
              className={cn(
                "group relative flex flex-col overflow-hidden rounded-md border bg-white shadow-[0_12px_30px_-15px_rgba(15,16,15,0.18)] ring-1 ring-brand-black/[0.04] transition-shadow hover:shadow-[0_30px_60px_-30px_rgba(0,0,0,0.25)]",
                p.highlight
                  ? "border-brand-orange/40 lg:col-span-2"
                  : "border-brand-black/15"
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
                  <span
                    className={cn(
                      "absolute top-4 left-4 rounded-full px-3 py-1 text-[10px] font-semibold tracking-[0.25em] uppercase shadow-md",
                      p.side === "Buyer"
                        ? "bg-white text-brand-black"
                        : "bg-brand-black text-white"
                    )}
                  >
                    {p.side} side
                  </span>
                  {p.highlight && (
                    <span className="absolute top-4 right-4 rounded-full bg-brand-orange px-3 py-1 text-[10px] font-semibold tracking-[0.25em] text-brand-ink uppercase shadow-md">
                      Top earner
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
                    {p.cta}
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
