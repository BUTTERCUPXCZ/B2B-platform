import { HugeiconsIcon } from "@hugeicons/react"
import {
  LayersIcon,
  Building03Icon,
  Tree02Icon,
  Layers01Icon,
  PaintBucketIcon,
  ToolsIcon,
  TapIcon,
  FlashIcon,
  House04Icon,
  Door01Icon,
  Wrench02Icon,
  PlantIcon,
  ArrowRight01Icon,
} from "@hugeicons/core-free-icons"
import { StaggerGroup, StaggerItem } from "@/components/motion/primitives"
import { Reveal } from "@/components/motion/primitives"

type Category = {
  icon: typeof LayersIcon
  name: string
  count: string
}

const categories: Category[] = [
  { icon: LayersIcon, name: "Cement & Concrete", count: "2,400+ items" },
  { icon: Building03Icon, name: "Steel & Rebar", count: "1,180+ items" },
  { icon: Tree02Icon, name: "Lumber & Wood", count: "3,650+ items" },
  { icon: Layers01Icon, name: "Tiles & Flooring", count: "5,210+ items" },
  { icon: PaintBucketIcon, name: "Paint & Finishes", count: "2,090+ items" },
  { icon: ToolsIcon, name: "Tools & Equipment", count: "8,420+ items" },
  { icon: TapIcon, name: "Plumbing", count: "1,940+ items" },
  { icon: FlashIcon, name: "Electrical", count: "2,330+ items" },
  { icon: House04Icon, name: "Roofing", count: "880+ items" },
  { icon: Door01Icon, name: "Doors & Windows", count: "1,420+ items" },
  { icon: Wrench02Icon, name: "Hardware", count: "6,150+ items" },
  { icon: PlantIcon, name: "Landscaping", count: "1,070+ items" },
]

export function CategoryGrid() {
  return (
    <section id="categories" className="bg-white py-14 sm:py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal className="mb-10 flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-end">
          <div>
            <span className="text-[11px] font-semibold tracking-[0.3em] text-brand-orange uppercase">
              Shop by Category
            </span>
            <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-brand-black sm:text-4xl">
              Every material, in one place.
            </h2>
          </div>
          <a
            href="#"
            className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.2em] text-brand-orange uppercase transition-colors hover:text-brand-black"
          >
            Browse all categories
            <HugeiconsIcon icon={ArrowRight01Icon} className="size-3.5" />
          </a>
        </Reveal>

        <StaggerGroup className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {categories.map((c) => (
            <StaggerItem
              key={c.name}
              className="group relative flex aspect-square flex-col items-center justify-center rounded-md border border-brand-black/10 bg-white p-4 text-center transition-all hover:-translate-y-1 hover:border-brand-orange/40 hover:bg-brand-orange/[0.03] hover:shadow-[0_20px_40px_-20px_rgba(201,169,97,0.4)]"
            >
              <a href="#" aria-label={`Browse ${c.name}`} className="absolute inset-0 rounded-md" />
              <span className="flex size-12 items-center justify-center rounded-full bg-brand-orange/10 text-brand-orange transition-colors group-hover:bg-brand-orange group-hover:text-brand-ink">
                <HugeiconsIcon icon={c.icon} className="size-6" />
              </span>
              <p className="mt-3 text-sm font-semibold text-brand-black">{c.name}</p>
              <p className="mt-0.5 text-[11px] text-brand-black/50">{c.count}</p>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  )
}
