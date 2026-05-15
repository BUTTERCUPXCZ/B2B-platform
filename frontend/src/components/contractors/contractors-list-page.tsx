import { useMemo, useState } from "react"
import { HugeiconsIcon } from "@hugeicons/react"
import { Search01Icon, FilterIcon } from "@hugeicons/core-free-icons"

import { Header } from "@/components/landing/header"
import { Footer } from "@/components/landing/footer"
import { Input } from "@/components/ui/input"
import { EmptyState } from "@/components/ui/empty-state"
import { contractors } from "./contractors-data"
import { ContractorCard } from "./contractor-card"
import { serviceCategories } from "@/components/services/services-data"
import { type BadgeLevel } from "@/components/shared/verified-badge"

const badgeLevels: Array<{ id: "all" | BadgeLevel; label: string }> = [
  { id: "all", label: "All badges" },
  { id: "top-rated", label: "Top Rated" },
  { id: "license", label: "License Verified" },
  { id: "portfolio", label: "Portfolio Verified" },
  { id: "identity", label: "ID Verified" },
]

const sorts = [
  { id: "rating", label: "Top rated" },
  { id: "jobs", label: "Most jobs completed" },
  { id: "price", label: "Lowest starting price" },
] as const

type Sort = (typeof sorts)[number]["id"]

export function ContractorsListPage() {
  const [q, setQ] = useState("")
  const [trade, setTrade] = useState<"all" | string>("all")
  const [badge, setBadge] = useState<"all" | BadgeLevel>("all")
  const [sort, setSort] = useState<Sort>("rating")

  const filtered = useMemo(() => {
    let list = contractors.slice()
    if (q.trim()) {
      const needle = q.toLowerCase()
      list = list.filter(
        (c) =>
          c.name.toLowerCase().includes(needle) ||
          c.bio.toLowerCase().includes(needle) ||
          c.expertiseTags.join(" ").toLowerCase().includes(needle) ||
          c.location.toLowerCase().includes(needle)
      )
    }
    if (trade !== "all") list = list.filter((c) => c.trade === trade)
    if (badge !== "all") list = list.filter((c) => c.badgeLevel === badge)

    if (sort === "rating") list.sort((a, b) => b.rating - a.rating)
    else if (sort === "jobs") list.sort((a, b) => b.jobsCompleted - a.jobsCompleted)
    else if (sort === "price")
      list.sort((a, b) => priceWeight(a.startingFrom) - priceWeight(b.startingFrom))

    return list
  }, [q, trade, badge, sort])

  const featured = contractors.filter((c) => c.featured).slice(0, 3)

  return (
    <div className="bg-gray-100">
      <Header />
      <main className="pb-20">
        <section className="bg-brand-ink pt-12 pb-12 text-white">
          <div className="mx-auto max-w-[1280px] px-6 sm:px-12 lg:px-20 xl:px-24">
            <p className="text-xs tracking-widest text-brand-orange uppercase">
              Contractor directory
            </p>
            <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">
              Hire verified contractors
            </h1>
            <p className="mt-3 max-w-2xl text-white/70">
              Identity, license, and portfolio-verified pros. Escrow-protected
              payments. Reviews from real STRUKTURA clients.
            </p>

            <div className="mt-8 grid gap-3 sm:grid-cols-[1fr_auto_auto_auto]">
              <label className="relative">
                <HugeiconsIcon
                  icon={Search01Icon}
                  className="absolute top-1/2 left-4 size-4 -translate-y-1/2 text-muted-foreground"
                />
                <Input
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  placeholder="Search by name, expertise, city..."
                  className="h-12 border border-border bg-white px-4 pl-11 text-sm text-brand-black"
                />
              </label>
              <select
                value={trade}
                onChange={(e) => setTrade(e.target.value)}
                aria-label="Filter by trade"
                className="h-12 border border-border bg-white px-3 text-sm text-brand-black sm:w-52"
              >
                <option value="all">All trades</option>
                {serviceCategories.map((c) => (
                  <option key={c.name} value={c.name}>
                    {c.name}
                  </option>
                ))}
              </select>
              <select
                value={badge}
                onChange={(e) => setBadge(e.target.value as typeof badge)}
                aria-label="Filter by badge"
                className="h-12 border border-border bg-white px-3 text-sm text-brand-black sm:w-52"
              >
                {badgeLevels.map((b) => (
                  <option key={b.id} value={b.id}>
                    {b.label}
                  </option>
                ))}
              </select>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as Sort)}
                aria-label="Sort"
                className="h-12 border border-border bg-white px-3 text-sm text-brand-black sm:w-52"
              >
                {sorts.map((s) => (
                  <option key={s.id} value={s.id}>
                    Sort: {s.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-[1280px] px-6 py-12 sm:px-12 lg:px-20 xl:px-24">
          {featured.length > 0 && q === "" && trade === "all" && badge === "all" && (
            <div className="mb-12 space-y-4">
              <header className="flex items-center justify-between">
                <h2 className="text-2xl font-bold tracking-tight text-brand-black">
                  Featured contractors
                </h2>
                <span className="text-xs tracking-widest text-brand-orange uppercase">
                  Premium placement
                </span>
              </header>
              <div className="grid gap-4 md:grid-cols-3">
                {featured.map((c) => (
                  <ContractorCard key={c.id} contractor={c} />
                ))}
              </div>
            </div>
          )}

          <header className="mb-6 flex items-center justify-between">
            <h2 className="text-2xl font-bold tracking-tight text-brand-black">
              {filtered.length} contractor{filtered.length === 1 ? "" : "s"}
            </h2>
            <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
              <HugeiconsIcon icon={FilterIcon} className="size-3" />
              All escrow protected
            </span>
          </header>

          {filtered.length === 0 ? (
            <EmptyState
              icon={Search01Icon}
              title="No contractors match"
              description="Try a different trade, badge level, or clear your search."
            />
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {filtered.map((c) => (
                <ContractorCard key={c.id} contractor={c} />
              ))}
            </div>
          )}
        </section>
      </main>
      <Footer />
    </div>
  )
}

function priceWeight(s: string) {
  const n = Number(s.replace(/[^\d.]/g, ""))
  if (s.toLowerCase().includes("m")) return n * 1_000_000
  if (s.toLowerCase().includes("k")) return n * 1000
  return n
}
