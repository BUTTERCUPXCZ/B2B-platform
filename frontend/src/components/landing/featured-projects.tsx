import { useState } from "react"
import { motion } from "motion/react"
import { HugeiconsIcon } from "@hugeicons/react"
import { ArrowRight01Icon } from "@hugeicons/core-free-icons"
import { cn } from "@/lib/utils"
import { Reveal, StaggerGroup, StaggerItem } from "@/components/motion/primitives"

const filters = ["All", "New Build", "Renovation", "Repair", "Interior"] as const
type Filter = (typeof filters)[number]

const projects: Array<{
  name: string
  category: string
  filter: Filter
  image: string
}> = [
  {
    name: "Cebu Coastal Residence",
    category: "Heritage Build Co. · ₱4.8M",
    filter: "New Build",
    image:
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=900&q=80&auto=format&fit=crop",
  },
  {
    name: "Salcedo Loft Refit",
    category: "Studio Manille · ₱1.2M",
    filter: "Renovation",
    image:
      "https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=900&q=80&auto=format&fit=crop",
  },
  {
    name: "Tagaytay Hillside Home",
    category: "Apex General Builders · ₱6.5M",
    filter: "New Build",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=900&q=80&auto=format&fit=crop",
  },
  {
    name: "BGC Penthouse Refit",
    category: "Northline Interiors · ₱950k",
    filter: "Interior",
    image:
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=900&q=80&auto=format&fit=crop",
  },
  {
    name: "QC Roof & Gutter Repair",
    category: "Stormshield Roofing · ₱165k",
    filter: "Repair",
    image:
      "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=900&q=80&auto=format&fit=crop",
  },
  {
    name: "Alabang Two-Storey Build",
    category: "Pillar Group · ₱8.2M",
    filter: "New Build",
    image:
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=900&q=80&auto=format&fit=crop",
  },
  {
    name: "Makati Studio Renovation",
    category: "Northline Interiors · ₱520k",
    filter: "Renovation",
    image:
      "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=900&q=80&auto=format&fit=crop",
  },
  {
    name: "Pasig Plumbing Overhaul",
    category: "AquaFlow Plumbing · ₱85k",
    filter: "Repair",
    image:
      "https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?w=900&q=80&auto=format&fit=crop",
  },
]

export function FeaturedProjects() {
  const [active, setActive] = useState<Filter>("All")
  const visible =
    active === "All" ? projects : projects.filter((p) => p.filter === active)

  return (
    <section
      id="projects"
      className="relative bg-brand-orange pt-4 pb-20 text-white"
    >
      <div className="mx-auto max-w-7xl px-6">
        <Reveal className="flex flex-col gap-6 pt-8 pb-10 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <span className="text-[11px] font-semibold tracking-[0.3em] text-white/80 uppercase">
              Real builds
            </span>
            <h2 className="mt-2 text-4xl font-extrabold tracking-tight text-brand-black sm:text-[44px]">
              Built through Levite.
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
                  active === f ? "text-white" : "bg-white/15 text-white/85 hover:bg-white/25"
                )}
              >
                {active === f && (
                  <motion.span
                    layoutId="featured-filter"
                    className="absolute inset-0 rounded-full bg-brand-black"
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
          className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
        >
          {visible.map((p) => (
            <StaggerItem
              key={p.name}
              className="group relative aspect-[3/4] overflow-hidden rounded-md bg-brand-black"
            >
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                style={{ backgroundImage: `url('${p.image}')` }}
              />
              <div
                aria-hidden
                className="absolute inset-0 bg-gradient-to-t from-brand-black via-brand-black/30 to-transparent"
              />
              <div className="absolute inset-x-0 bottom-0 p-5">
                <span className="text-[10px] font-semibold tracking-[0.25em] text-brand-orange uppercase">
                  {p.filter}
                </span>
                <h3 className="mt-1 text-lg leading-tight font-bold">
                  {p.name}
                </h3>
                <p className="mt-1 text-xs text-white/70">{p.category}</p>
              </div>
              <span className="absolute top-4 right-4 flex size-9 items-center justify-center rounded-full bg-white text-brand-orange opacity-0 transition-opacity group-hover:opacity-100">
                <HugeiconsIcon icon={ArrowRight01Icon} className="size-4" />
              </span>
            </StaggerItem>
          ))}
        </StaggerGroup>

        <div className="mt-10 flex justify-center">
          <a
            href="#"
            className="inline-flex items-center gap-2 rounded-full bg-brand-black px-6 py-3 text-xs font-semibold tracking-[0.2em] text-white uppercase transition-colors hover:bg-brand-ink"
          >
            Explore all builds
            <span className="flex size-6 items-center justify-center rounded-full bg-brand-orange">
              <HugeiconsIcon icon={ArrowRight01Icon} className="size-3" />
            </span>
          </a>
        </div>
      </div>
    </section>
  )
}
