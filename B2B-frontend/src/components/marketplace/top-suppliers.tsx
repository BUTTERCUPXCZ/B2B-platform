import { HugeiconsIcon } from "@hugeicons/react"
import {
  StarIcon,
  ArrowRight01Icon,
  Store02Icon,
  CheckmarkBadge02Icon,
} from "@hugeicons/core-free-icons"
import { Reveal, StaggerGroup, StaggerItem } from "@/components/motion/primitives"

type Supplier = {
  name: string
  category: string
  rating: number
  reviews: string
  items: string
  badge?: string
  initials: string
}

const suppliers: Supplier[] = [
  { name: "Eagle Materials", category: "Cement & Concrete", rating: 4.9, reviews: "12.4k", items: "2,180 items", badge: "Top Seller", initials: "EM" },
  { name: "Mosaic Yard Co.", category: "Tiles & Flooring", rating: 4.8, reviews: "6.2k", items: "1,420 items", initials: "MY" },
  { name: "ProCoat Supply", category: "Paint & Finishes", rating: 4.9, reviews: "9.8k", items: "980 items", badge: "Top Seller", initials: "PC" },
  { name: "Steelhouse Pasig", category: "Steel & Rebar", rating: 4.7, reviews: "4.1k", items: "640 items", initials: "SP" },
  { name: "BoltWorks Hardware", category: "Tools & Equipment", rating: 4.8, reviews: "8.6k", items: "3,210 items", initials: "BW" },
  { name: "Greenbelt Lumber", category: "Lumber & Wood", rating: 4.7, reviews: "3.4k", items: "880 items", initials: "GL" },
  { name: "Sparkline Electric", category: "Electrical", rating: 4.9, reviews: "5.2k", items: "1,180 items", badge: "New", initials: "SE" },
  { name: "AquaFlow Plumbing", category: "Plumbing", rating: 4.8, reviews: "2.9k", items: "920 items", initials: "AF" },
]

export function TopSuppliers() {
  return (
    <section className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal className="mb-10 flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-end">
          <div>
            <span className="text-[11px] font-semibold tracking-[0.3em] text-brand-orange uppercase">
              Top Suppliers
            </span>
            <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-brand-black sm:text-4xl">
              The names buyers trust this month.
            </h2>
          </div>
          <a
            href="#"
            className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.2em] text-brand-orange uppercase transition-colors hover:text-brand-black"
          >
            All sellers
            <HugeiconsIcon icon={ArrowRight01Icon} className="size-3.5" />
          </a>
        </Reveal>

        <StaggerGroup className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {suppliers.map((s) => (
            <StaggerItem
              key={s.name}
              className="group relative flex flex-col rounded-md border border-brand-black/10 bg-white p-5 transition-all hover:-translate-y-1 hover:border-brand-orange/40 hover:shadow-[0_25px_50px_-25px_rgba(0,0,0,0.2)]"
            >
              {s.badge && (
                <span className="absolute top-3 right-3 inline-flex items-center gap-1 rounded-full bg-brand-orange/10 px-2 py-0.5 text-[10px] font-bold tracking-wider text-brand-orange uppercase">
                  <HugeiconsIcon icon={CheckmarkBadge02Icon} className="size-3" />
                  {s.badge}
                </span>
              )}

              <div className="flex size-14 items-center justify-center rounded-md bg-gradient-to-br from-brand-orange to-brand-orange-soft text-base font-extrabold text-white shadow-md">
                {s.initials}
              </div>

              <h3 className="mt-4 text-base font-bold text-brand-black">
                {s.name}
              </h3>
              <p className="text-xs text-brand-black/55">{s.category}</p>

              <div className="mt-3 flex items-center gap-1 text-xs text-brand-black/65">
                <HugeiconsIcon icon={StarIcon} className="size-3.5 text-brand-orange" />
                <span className="font-semibold text-brand-black">{s.rating}</span>
                <span>· {s.reviews} reviews</span>
              </div>
              <p className="mt-1 text-xs text-brand-black/55">{s.items}</p>

              <a
                href="#"
                className="mt-5 inline-flex items-center gap-2 self-start text-xs font-semibold tracking-[0.2em] text-brand-orange uppercase transition-colors hover:text-brand-black"
              >
                <HugeiconsIcon icon={Store02Icon} className="size-3.5" />
                Visit store
              </a>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  )
}
