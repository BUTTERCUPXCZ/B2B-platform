import { HugeiconsIcon } from "@hugeicons/react"
import {
  House04Icon,
  Building03Icon,
  Wrench01Icon,
  TapIcon,
  FlashIcon,
  PaintBrush01Icon,
  PlantIcon,
  ToolsIcon,
  ArrowRight01Icon,
  ArrowUpRight01Icon,
} from "@hugeicons/core-free-icons"
import { Reveal, StaggerGroup, StaggerItem } from "@/components/motion/primitives"

type Service = {
  icon: typeof House04Icon
  name: string
  desc: string
  starting: string
  image: string
}

const services: Service[] = [
  {
    icon: House04Icon,
    name: "Custom Home Build",
    desc: "Ground-up new builds from a vetted general contractor.",
    starting: "₱1.2M",
    image:
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=900&q=80&auto=format&fit=crop",
  },
  {
    icon: Building03Icon,
    name: "Renovation",
    desc: "Kitchen, bath, and full-home remodels with on-site PM.",
    starting: "₱180k",
    image:
      "https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=900&q=80&auto=format&fit=crop",
  },
  {
    icon: ToolsIcon,
    name: "Roofing",
    desc: "Re-roofing, leaks, gutters, and full roof replacement.",
    starting: "₱75k",
    image:
      "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=900&q=80&auto=format&fit=crop",
  },
  {
    icon: TapIcon,
    name: "Plumbing",
    desc: "Installs, repairs, fixtures, and emergency call-outs.",
    starting: "₱2.5k",
    image:
      "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=900&q=80&auto=format&fit=crop",
  },
  {
    icon: FlashIcon,
    name: "Electrical",
    desc: "Wiring, panels, fixture installs, and code upgrades.",
    starting: "₱3k",
    image:
      "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=900&q=80&auto=format&fit=crop",
  },
  {
    icon: PaintBrush01Icon,
    name: "Painting",
    desc: "Interior and exterior painting with 2-year finish warranty.",
    starting: "₱120/sqm",
    image:
      "https://images.unsplash.com/photo-1562259949-e8e7689d7828?w=900&q=80&auto=format&fit=crop",
  },
  {
    icon: PlantIcon,
    name: "Landscaping",
    desc: "Garden builds, hardscape, irrigation, lawn restoration.",
    starting: "₱45k",
    image:
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=900&q=80&auto=format&fit=crop",
  },
  {
    icon: Wrench01Icon,
    name: "Repairs & Handyman",
    desc: "Doors, locks, drywall, tile, small jobs done right.",
    starting: "₱1.5k",
    image:
      "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=900&q=80&auto=format&fit=crop",
  },
]

export function ServicesShowcase() {
  return (
    <section className="bg-white py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal className="mb-10 flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-end">
          <div>
            <span className="text-[11px] font-semibold tracking-[0.3em] text-brand-orange uppercase">
              Services
            </span>
            <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-brand-black sm:text-4xl">
              Need it built? Hire a vetted pro.
            </h2>
            <p className="mt-2 max-w-xl text-sm text-brand-black/60">
              Every contractor on Levite is identity-verified, licensed, and
              backed by buyer escrow. Pay only when each milestone is signed off.
            </p>
          </div>
          <a
            href="#"
            className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.2em] text-brand-orange uppercase transition-colors hover:text-brand-black"
          >
            See all services
            <HugeiconsIcon icon={ArrowRight01Icon} className="size-3.5" />
          </a>
        </Reveal>

        <StaggerGroup className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((s) => (
            <StaggerItem
              key={s.name}
              className="group relative flex flex-col overflow-hidden rounded-md border border-brand-black/15 bg-white shadow-[0_12px_30px_-15px_rgba(15,16,15,0.18)] ring-1 ring-brand-black/[0.04] transition-all hover:-translate-y-1 hover:border-brand-orange/40 hover:shadow-[0_25px_50px_-15px_rgba(255,116,32,0.25)]"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                  style={{ backgroundImage: `url('${s.image}')` }}
                />
                <span className="absolute top-3 left-3 flex size-10 items-center justify-center rounded-md bg-white/95 text-brand-orange shadow-md">
                  <HugeiconsIcon icon={s.icon} className="size-5" />
                </span>
                <HugeiconsIcon
                  icon={ArrowUpRight01Icon}
                  className="absolute top-4 right-4 size-4 text-white/0 transition-colors group-hover:text-white"
                />
              </div>

              <div className="flex flex-1 flex-col p-5">
                <h3 className="text-base font-bold text-brand-black">
                  {s.name}
                </h3>
                <p className="mt-1.5 flex-1 text-xs leading-relaxed text-brand-black/60">
                  {s.desc}
                </p>
                <div className="mt-4 flex items-center justify-between">
                  <p className="text-xs text-brand-black/55">
                    Starting from{" "}
                    <span className="font-bold text-brand-black">
                      {s.starting}
                    </span>
                  </p>
                  <a
                    href="#"
                    className="text-[11px] font-semibold tracking-[0.2em] text-brand-orange uppercase hover:underline"
                  >
                    Get quotes →
                  </a>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  )
}
