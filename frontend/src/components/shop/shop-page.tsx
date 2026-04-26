import { useMemo, useState } from "react"
import { motion } from "motion/react"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  Search01Icon,
  ArrowRight01Icon,
  StarIcon,
  ShoppingCart01Icon,
  ArrowDown01Icon,
  CheckmarkBadge02Icon,
  FilterHorizontalIcon,
  Cancel01Icon,
} from "@hugeicons/core-free-icons"
import { cn } from "@/lib/utils"
import { Reveal, StaggerGroup, StaggerItem } from "@/components/motion/primitives"
import {
  productCategories,
  products,
  sortOptions,
  type Product,
  type ProductCategory,
  type SortOption,
} from "./shop-data"

const PRICE_BUCKETS: { id: string; label: string; min: number; max: number }[] = [
  { id: "under-500", label: "Under ₱500", min: 0, max: 500 },
  { id: "under-2000", label: "₱500 – ₱2,000", min: 500, max: 2_000 },
  { id: "under-5000", label: "₱2,000 – ₱5,000", min: 2_000, max: 5_000 },
  { id: "over-5000", label: "₱5,000+", min: 5_000, max: Infinity },
]

export function ShopPage({ initialQuery = "" }: { initialQuery?: string }) {
  const [query, setQuery] = useState(initialQuery)
  const [activeCategory, setActiveCategory] = useState<ProductCategory | null>(null)
  const [activePrice, setActivePrice] = useState<string | null>(null)
  const [sort, setSort] = useState<SortOption>("popular")
  const [filtersOpen, setFiltersOpen] = useState(false)

  const visible = useMemo(() => {
    let list: Product[] = products
    if (query.trim()) {
      const q = query.trim().toLowerCase()
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.supplier.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q)
      )
    }
    if (activeCategory) list = list.filter((p) => p.category === activeCategory)
    if (activePrice) {
      const b = PRICE_BUCKETS.find((b) => b.id === activePrice)
      if (b) list = list.filter((p) => p.price >= b.min && p.price < b.max)
    }
    switch (sort) {
      case "price-asc":
        list = [...list].sort((a, b) => a.price - b.price)
        break
      case "price-desc":
        list = [...list].sort((a, b) => b.price - a.price)
        break
      case "rating":
        list = [...list].sort((a, b) => b.rating - a.rating)
        break
    }
    return list
  }, [query, activeCategory, activePrice, sort])

  const clearAll = () => {
    setQuery("")
    setActiveCategory(null)
    setActivePrice(null)
  }

  return (
    <main className="bg-white">
      <Hero query={query} setQuery={setQuery} onOpenFilters={() => setFiltersOpen(true)} />

      <section className="bg-white pt-10 pb-16 sm:pt-14 sm:pb-20 lg:pt-16 lg:pb-24">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[260px_1fr]">
          <Filters
            activeCategory={activeCategory}
            setActiveCategory={setActiveCategory}
            activePrice={activePrice}
            setActivePrice={setActivePrice}
            isOpen={filtersOpen}
            onClose={() => setFiltersOpen(false)}
            onClear={clearAll}
          />

          <div>
            <Reveal className="mb-6 flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
              <p className="text-sm text-brand-black/65">
                <span className="font-bold text-brand-black">{visible.length}</span> of{" "}
                {products.length} listings
                {activeCategory ? ` in ${activeCategory}` : ""}
              </p>
              <SortMenu sort={sort} setSort={setSort} />
            </Reveal>

            {visible.length === 0 ? (
              <EmptyState onClear={clearAll} />
            ) : (
              <StaggerGroup
                key={`${activeCategory ?? "all"}-${activePrice ?? "all"}-${sort}-${query}`}
                className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
              >
                {visible.map((p) => (
                  <StaggerItem key={p.id}>
                    <ProductCard product={p} />
                  </StaggerItem>
                ))}
              </StaggerGroup>
            )}
          </div>
        </div>
      </section>
    </main>
  )
}

function Hero({
  query,
  setQuery,
  onOpenFilters,
}: {
  query: string
  setQuery: (v: string) => void
  onOpenFilters: () => void
}) {
  return (
    <section className="relative isolate overflow-hidden bg-brand-ink pt-32 pb-12 text-white sm:pt-40 lg:pt-44">
      <div
        aria-hidden
        className="absolute inset-0 bg-cover bg-center opacity-25"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=1920&q=80&auto=format&fit=crop')",
        }}
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-b from-brand-ink/95 via-brand-ink/85 to-brand-ink"
      />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <span className="inline-flex items-center gap-2 rounded-full border border-brand-orange/40 bg-brand-orange/10 px-4 py-1.5 text-[11px] font-semibold tracking-[0.2em] text-brand-orange uppercase">
          <span className="size-1.5 rounded-full bg-brand-orange" />
          Marketplace · Materials
        </span>

        <h1 className="mt-5 text-3xl leading-tight font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
          Shop 24,000+ verified materials.
        </h1>
        <p className="mt-3 max-w-xl text-sm text-white/70">
          Filter by category and price, compare suppliers, and pay safely
          through escrow.
        </p>

        <form
          className="mt-7 flex max-w-3xl items-center gap-2 rounded-full bg-white p-1.5 shadow-[0_24px_60px_-24px_rgba(0,0,0,0.6)] focus-within:ring-2 focus-within:ring-brand-orange/40"
          onSubmit={(e) => e.preventDefault()}
        >
          <span className="flex size-9 shrink-0 items-center justify-center text-brand-black/55">
            <HugeiconsIcon icon={Search01Icon} className="size-4" />
          </span>
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search materials — cement, tiles, paint, tools…"
            className="flex-1 bg-transparent py-1.5 text-sm text-brand-black placeholder:text-brand-black/45 outline-none"
          />
          <button
            type="button"
            onClick={onOpenFilters}
            className="inline-flex h-9 items-center gap-1.5 rounded-full bg-brand-black/5 px-4 text-[11px] font-semibold tracking-[0.18em] text-brand-black uppercase transition-colors hover:bg-brand-orange/10 hover:text-brand-orange lg:hidden"
          >
            <HugeiconsIcon icon={FilterHorizontalIcon} className="size-3.5" />
            Filters
          </button>
        </form>
      </div>
    </section>
  )
}

function Filters({
  activeCategory,
  setActiveCategory,
  activePrice,
  setActivePrice,
  isOpen,
  onClose,
  onClear,
}: {
  activeCategory: ProductCategory | null
  setActiveCategory: (c: ProductCategory | null) => void
  activePrice: string | null
  setActivePrice: (p: string | null) => void
  isOpen: boolean
  onClose: () => void
  onClear: () => void
}) {
  const content = (
    <>
      <div className="flex items-center justify-between">
        <h2 className="text-xs font-bold tracking-[0.25em] text-brand-black uppercase">
          Filters
        </h2>
        <button
          type="button"
          onClick={onClear}
          className="text-[11px] font-semibold tracking-wider text-brand-orange uppercase hover:underline"
        >
          Clear all
        </button>
      </div>

      <div className="mt-6">
        <p className="text-[10px] font-bold tracking-[0.25em] text-brand-black/55 uppercase">
          Category
        </p>
        <ul className="mt-3 space-y-1 text-sm">
          <FilterItem
            label="All categories"
            active={activeCategory === null}
            onClick={() => setActiveCategory(null)}
          />
          {productCategories.map((c) => (
            <FilterItem
              key={c.name}
              label={c.name}
              count={c.count}
              active={activeCategory === c.name}
              onClick={() => setActiveCategory(c.name)}
            />
          ))}
        </ul>
      </div>

      <div className="mt-7 border-t border-brand-black/10 pt-7">
        <p className="text-[10px] font-bold tracking-[0.25em] text-brand-black/55 uppercase">
          Price
        </p>
        <ul className="mt-3 space-y-1 text-sm">
          <FilterItem
            label="Any price"
            active={activePrice === null}
            onClick={() => setActivePrice(null)}
          />
          {PRICE_BUCKETS.map((b) => (
            <FilterItem
              key={b.id}
              label={b.label}
              active={activePrice === b.id}
              onClick={() => setActivePrice(b.id)}
            />
          ))}
        </ul>
      </div>
    </>
  )

  return (
    <>
      <aside className="sticky top-24 hidden h-fit rounded-md border border-brand-black/10 bg-white p-6 lg:block">
        {content}
      </aside>

      {isOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <button
            type="button"
            aria-label="Close filters"
            onClick={onClose}
            className="absolute inset-0 bg-brand-ink/70 backdrop-blur-sm"
          />
          <motion.div
            initial={{ x: "-100%" }}
            animate={{
              x: 0,
              transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] },
            }}
            className="absolute top-0 left-0 flex h-full w-[88%] max-w-sm flex-col overflow-y-auto bg-white p-6 shadow-2xl"
          >
            <div className="mb-2 flex items-center justify-between">
              <span className="text-base font-bold text-brand-black">
                Filter listings
              </span>
              <button
                type="button"
                aria-label="Close filters"
                onClick={onClose}
                className="flex size-9 items-center justify-center rounded-full bg-brand-black/5 text-brand-black"
              >
                <HugeiconsIcon icon={Cancel01Icon} className="size-4" />
              </button>
            </div>
            {content}
            <button
              type="button"
              onClick={onClose}
              className="mt-8 inline-flex w-full items-center justify-center rounded-full bg-brand-orange py-3 text-xs font-semibold tracking-[0.2em] text-white uppercase transition-colors hover:bg-brand-orange-soft"
            >
              Apply filters
            </button>
          </motion.div>
        </div>
      )}
    </>
  )
}

function FilterItem({
  label,
  count,
  active,
  onClick,
}: {
  label: string
  count?: number
  active: boolean
  onClick: () => void
}) {
  return (
    <li>
      <button
        type="button"
        onClick={onClick}
        className={cn(
          "flex w-full items-center justify-between rounded-md px-3 py-2 text-left transition-colors",
          active
            ? "bg-brand-orange/10 font-semibold text-brand-orange"
            : "text-brand-black/70 hover:bg-brand-black/5"
        )}
      >
        <span>{label}</span>
        {typeof count === "number" && (
          <span className="text-[11px] text-brand-black/45">
            {count.toLocaleString()}
          </span>
        )}
      </button>
    </li>
  )
}

function SortMenu({
  sort,
  setSort,
}: {
  sort: SortOption
  setSort: (s: SortOption) => void
}) {
  const [open, setOpen] = useState(false)
  const active = sortOptions.find((s) => s.id === sort)!
  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="inline-flex items-center gap-2 rounded-full border border-brand-black/15 bg-white px-4 py-2 text-xs font-semibold text-brand-black transition-colors hover:border-brand-orange/40"
      >
        Sort: {active.label}
        <HugeiconsIcon icon={ArrowDown01Icon} className="size-3.5" />
      </button>
      {open && (
        <div className="absolute top-full right-0 z-10 mt-2 w-56 rounded-md border border-brand-black/10 bg-white p-1 shadow-lg">
          {sortOptions.map((o) => (
            <button
              key={o.id}
              type="button"
              onClick={() => {
                setSort(o.id)
                setOpen(false)
              }}
              className={cn(
                "block w-full rounded-md px-3 py-2 text-left text-sm transition-colors",
                o.id === sort
                  ? "bg-brand-orange/10 font-semibold text-brand-orange"
                  : "text-brand-black/75 hover:bg-brand-black/5"
              )}
            >
              {o.label}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

function ProductCard({ product }: { product: Product }) {
  const off =
    product.oldPrice != null
      ? Math.round((1 - product.price / product.oldPrice) * 100)
      : 0
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-md border border-brand-black/10 bg-white shadow-[0_8px_20px_-12px_rgba(0,0,0,0.12)] transition-all hover:-translate-y-1 hover:border-brand-orange/40 hover:shadow-[0_25px_50px_-25px_rgba(255,116,32,0.25)]">
      <div className="relative aspect-square overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
          style={{ backgroundImage: `url('${product.image}')` }}
        />
        {off > 0 && (
          <span className="absolute top-3 left-3 rounded-md bg-brand-black px-2 py-0.5 text-[10px] font-bold tracking-wider text-brand-orange">
            −{off}%
          </span>
        )}
        {product.badge && (
          <span className="absolute top-3 right-3 inline-flex items-center gap-1 rounded-full bg-white/95 px-2 py-0.5 text-[10px] font-semibold text-brand-black">
            <HugeiconsIcon
              icon={CheckmarkBadge02Icon}
              className="size-3 text-brand-orange"
            />
            {product.badge}
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-5">
        <p className="text-[10px] font-semibold tracking-[0.25em] text-brand-orange uppercase">
          {product.category}
        </p>
        <h3 className="mt-1 text-base leading-snug font-bold text-brand-black">
          {product.name}
        </h3>
        <p className="mt-1 text-xs text-brand-black/55">by {product.supplier}</p>

        <div className="mt-3 flex items-center gap-1 text-xs text-brand-black/65">
          <HugeiconsIcon icon={StarIcon} className="size-3.5 text-brand-orange" />
          <span className="font-semibold text-brand-black">{product.rating}</span>
          <span>· {product.reviews} reviews</span>
        </div>

        <div className="mt-auto flex items-end justify-between pt-4">
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-lg font-extrabold text-brand-black">
                ₱{product.price.toLocaleString()}
              </span>
              {product.oldPrice && (
                <span className="text-xs text-brand-black/40 line-through">
                  ₱{product.oldPrice.toLocaleString()}
                </span>
              )}
            </div>
            <p className="text-[11px] text-brand-black/50">{product.unit}</p>
          </div>
          <button
            type="button"
            aria-label={`Add ${product.name} to cart`}
            className="inline-flex size-10 items-center justify-center rounded-full bg-brand-orange text-white transition-colors hover:bg-brand-orange-soft"
          >
            <HugeiconsIcon icon={ShoppingCart01Icon} className="size-4" />
          </button>
        </div>
      </div>
    </article>
  )
}

function EmptyState({ onClear }: { onClear: () => void }) {
  return (
    <div className="rounded-md border border-dashed border-brand-black/15 bg-brand-black/[0.02] p-12 text-center">
      <p className="text-sm font-semibold text-brand-black">No listings match</p>
      <p className="mt-1 text-xs text-brand-black/55">
        Try clearing some filters or searching for something different.
      </p>
      <button
        type="button"
        onClick={onClear}
        className="mt-5 inline-flex items-center gap-2 rounded-full bg-brand-orange px-5 py-2.5 text-xs font-semibold tracking-[0.2em] text-white uppercase transition-colors hover:bg-brand-orange-soft"
      >
        Reset filters
        <HugeiconsIcon icon={ArrowRight01Icon} className="size-3" />
      </button>
    </div>
  )
}
