import { HugeiconsIcon } from "@hugeicons/react"
import {
  ShoppingCart01Icon,
  TimerIcon,
  StarIcon,
  ArrowRight01Icon,
} from "@hugeicons/core-free-icons"
import { Reveal, StaggerGroup, StaggerItem } from "@/components/motion/primitives"

type Deal = {
  name: string
  supplier: string
  rating: number
  reviews: string
  was: string
  now: string
  off: string
  image: string
}

const deals: Deal[] = [
  {
    name: "Portland Cement (40kg) — Type I",
    supplier: "Eagle Materials",
    rating: 4.8,
    reviews: "1.2k",
    was: "₱350",
    now: "₱265",
    off: "−24%",
    image:
      "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=600&q=80&auto=format&fit=crop",
  },
  {
    name: "Porcelain Tiles 60×60 — Matte Grey",
    supplier: "Mosaic Yard Co.",
    rating: 4.7,
    reviews: "640",
    was: "₱1,290",
    now: "₱899",
    off: "−30%",
    image:
      "https://images.unsplash.com/photo-1615873968403-89e068629265?w=600&q=80&auto=format&fit=crop",
  },
  {
    name: "Premium Latex Paint — 4L Eggshell",
    supplier: "ProCoat Supply",
    rating: 4.9,
    reviews: "2.1k",
    was: "₱1,150",
    now: "₱799",
    off: "−30%",
    image:
      "https://images.unsplash.com/photo-1562259949-e8e7689d7828?w=600&q=80&auto=format&fit=crop",
  },
  {
    name: "Rebar — Grade 60, 12mm × 6m (10pc)",
    supplier: "Steelhouse Pasig",
    rating: 4.6,
    reviews: "380",
    was: "₱4,500",
    now: "₱3,499",
    off: "−22%",
    image:
      "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=600&q=80&auto=format&fit=crop",
  },
  {
    name: "Cordless Drill Kit — 18V, 2 Batt",
    supplier: "BoltWorks Hardware",
    rating: 4.9,
    reviews: "3.4k",
    was: "₱6,990",
    now: "₱4,890",
    off: "−30%",
    image:
      "https://images.unsplash.com/photo-1572981779307-38b8cabb2407?w=600&q=80&auto=format&fit=crop",
  },
  {
    name: "Marine Plywood 4×8 — 18mm",
    supplier: "Greenbelt Lumber",
    rating: 4.7,
    reviews: "510",
    was: "₱1,850",
    now: "₱1,399",
    off: "−24%",
    image:
      "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=600&q=80&auto=format&fit=crop",
  },
]

export function FlashDeals() {
  return (
    <section className="bg-brand-orange py-14 sm:py-16 lg:py-20 text-white">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal className="mb-8 flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-end">
          <div>
            <span className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-[0.3em] text-brand-black uppercase">
              <span className="size-1.5 rounded-full bg-brand-black" />
              Today&rsquo;s Deals
            </span>
            <h2 className="mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl">
              Flash drops, refreshed daily.
            </h2>
          </div>
          <div className="inline-flex items-center gap-2 rounded-full bg-brand-black/30 px-4 py-2 text-xs font-semibold backdrop-blur">
            <HugeiconsIcon icon={TimerIcon} className="size-4" />
            Ends in <span className="font-bold tracking-wider">14 : 32 : 09</span>
          </div>
        </Reveal>

        <StaggerGroup className="grid grid-cols-2 gap-4 lg:grid-cols-3 xl:grid-cols-6">
          {deals.map((d) => (
            <StaggerItem
              key={d.name}
              className="group flex flex-col overflow-hidden rounded-md bg-white text-brand-black shadow-md transition-shadow hover:shadow-[0_25px_50px_-25px_rgba(0,0,0,0.4)]"
            >
              <div className="relative aspect-square overflow-hidden">
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                  style={{ backgroundImage: `url('${d.image}')` }}
                />
                <span className="absolute top-2 left-2 rounded-md bg-brand-black px-2 py-0.5 text-[10px] font-bold tracking-wider text-brand-orange">
                  {d.off}
                </span>
              </div>

              <div className="flex flex-1 flex-col p-3">
                <h3 className="line-clamp-2 text-[13px] leading-snug font-semibold">
                  {d.name}
                </h3>
                <p className="mt-1 text-[11px] text-brand-black/65">
                  {d.supplier}
                </p>
                <div className="mt-1 flex items-center gap-1 text-[11px] text-brand-black/75">
                  <HugeiconsIcon icon={StarIcon} className="size-3 text-brand-orange" />
                  <span className="font-semibold text-brand-black">{d.rating}</span>
                  <span>· {d.reviews}</span>
                </div>

                <div className="mt-auto pt-3">
                  <div className="flex items-baseline gap-2">
                    <span className="text-base font-extrabold text-brand-orange">
                      {d.now}
                    </span>
                    <span className="text-[11px] text-brand-black/40 line-through">
                      {d.was}
                    </span>
                  </div>
                  <button
                    type="button"
                    className="mt-2 inline-flex w-full items-center justify-center gap-1.5 rounded-full bg-brand-black py-2 text-[11px] font-semibold tracking-[0.15em] text-white uppercase transition-colors hover:bg-brand-ink"
                  >
                    <HugeiconsIcon icon={ShoppingCart01Icon} className="size-3.5" />
                    Add to cart
                  </button>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerGroup>

        <div className="mt-10 flex justify-center">
          <a
            href="#"
            className="inline-flex items-center gap-2 rounded-full bg-brand-black px-6 py-3 text-xs font-semibold tracking-[0.2em] text-white uppercase transition-colors hover:bg-brand-ink"
          >
            See all deals
            <HugeiconsIcon icon={ArrowRight01Icon} className="size-3.5" />
          </a>
        </div>
      </div>
    </section>
  )
}
