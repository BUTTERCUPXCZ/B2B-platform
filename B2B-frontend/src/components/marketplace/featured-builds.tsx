import { useState } from "react"
import { motion } from "motion/react"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  ArrowRight01Icon,
  Location01Icon,
} from "@hugeicons/core-free-icons"
import { cn } from "@/lib/utils"
import { Reveal, StaggerGroup, StaggerItem } from "@/components/motion/primitives"

const filters = ["All", "New Build", "Renovation", "Repair"] as const
type Filter = (typeof filters)[number]

type Build = {
  name: string
  contractor: string
  location: string
  value: string
  filter: Filter
  image: string
}

const builds: Build[] = [
  {
    name: "The Cebu Coastal Residence",
    contractor: "Heritage Build Co.",
    location: "Cebu City",
    value: "₱4.8M",
    filter: "New Build",
    image:
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=900&q=80&auto=format&fit=crop",
  },
  {
    name: "Salcedo Loft Renovation",
    contractor: "Studio Manille",
    location: "Makati",
    value: "₱1.2M",
    filter: "Renovation",
    image:
      "https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=900&q=80&auto=format&fit=crop",
  },
  {
    name: "Tagaytay Hillside House",
    contractor: "Apex General Builders",
    location: "Tagaytay",
    value: "₱6.5M",
    filter: "New Build",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=900&q=80&auto=format&fit=crop",
  },
  {
    name: "BGC Penthouse Refit",
    contractor: "Northline Interiors",
    location: "Taguig",
    value: "₱950k",
    filter: "Renovation",
    image:
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=900&q=80&auto=format&fit=crop",
  },
  {
    name: "QC Roof &amp; Gutter Repair",
    contractor: "Stormshield Roofing",
    location: "Quezon City",
    value: "₱165k",
    filter: "Repair",
    image:
      "https://images.unsplash.com/photo-1632759145355-8b8f1f4f5c0c?w=900&q=80&auto=format&fit=crop",
  },
  {
    name: "Alabang Two-Storey Build",
    contractor: "Pillar Group",
    location: "Muntinlupa",
    value: "₱8.2M",
    filter: "New Build",
    image:
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=900&q=80&auto=format&fit=crop",
  },
]

export function FeaturedBuilds() {
  const [active, setActive] = useState<Filter>("All")
  const visible =
    active === "All" ? builds : builds.filter((b) => b.filter === active)

  return (
    <section className="bg-[#f5f3ef] py-24">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal className="mb-10 flex flex-col items-start justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <span className="text-[11px] font-semibold tracking-[0.3em] text-brand-orange uppercase">
              Featured Builds
            </span>
            <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-brand-black sm:text-4xl">
              Real homes, built through Buildora.
            </h2>
          </div>
          <div className="flex flex-wrap gap-1.5 text-xs font-semibold">
            {filters.map((f) => (
              <button
                key={f}
                type="button"
                onClick={() => setActive(f)}
                className={cn(
                  "relative rounded-full px-4 py-2 transition-colors",
                  active === f
                    ? "text-white"
                    : "bg-brand-black/5 text-brand-black/70 hover:bg-brand-orange/10 hover:text-brand-orange"
                )}
              >
                {active === f && (
                  <motion.span
                    layoutId="builds-filter"
                    className="absolute inset-0 rounded-full bg-brand-orange"
                    transition={{ type: "spring", stiffness: 320, damping: 30 }}
                  />
                )}
                <span className="relative">{f}</span>
              </button>
            ))}
          </div>
        </Reveal>

        <StaggerGroup
          key={active}
          className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {visible.map((b) => (
            <StaggerItem
              key={b.name}
              className="group relative aspect-[4/5] overflow-hidden rounded-md bg-brand-black"
            >
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                style={{ backgroundImage: `url('${b.image}')` }}
              />
              <div
                aria-hidden
                className="absolute inset-0 bg-gradient-to-t from-brand-black via-brand-black/40 to-transparent"
              />
              <div className="absolute inset-x-0 bottom-0 p-6 text-white">
                <span className="text-[10px] font-semibold tracking-[0.25em] text-brand-orange uppercase">
                  {b.filter}
                </span>
                <h3 className="mt-1 text-xl leading-tight font-bold">
                  {b.name.replace(/&amp;/g, "&")}
                </h3>
                <p className="mt-1.5 text-xs text-white/80">
                  by {b.contractor}
                </p>
                <div className="mt-3 flex items-center justify-between text-xs">
                  <span className="inline-flex items-center gap-1.5 text-white/75">
                    <HugeiconsIcon
                      icon={Location01Icon}
                      className="size-3.5 text-brand-orange"
                    />
                    {b.location}
                  </span>
                  <span className="rounded-full bg-brand-orange/90 px-3 py-1 text-[11px] font-bold">
                    {b.value}
                  </span>
                </div>
              </div>
              <span className="absolute top-4 right-4 flex size-9 items-center justify-center rounded-full bg-white text-brand-orange opacity-0 transition-opacity group-hover:opacity-100">
                <HugeiconsIcon icon={ArrowRight01Icon} className="size-4" />
              </span>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  )
}
