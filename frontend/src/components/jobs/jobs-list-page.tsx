import { useMemo, useState } from "react"
import { Link } from "@tanstack/react-router"
import { motion } from "motion/react"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  Search01Icon,
  ArrowRight01Icon,
  ArrowDown01Icon,
  Location01Icon,
  TimerIcon,
  CheckmarkBadge02Icon,
  Wrench01Icon,
} from "@hugeicons/core-free-icons"
import { cn } from "@/lib/utils"
import { Reveal } from "@/components/motion/primitives"
import {
  serviceCategories,
  type ServiceCategory,
} from "@/components/services/services-data"
import {
  jobs,
  jobSortOptions,
  type Job,
  type JobSortOption,
} from "./jobs-data"

const budgetOrder: Record<string, number> = {
  "Under ₱25k": 1,
  "₱25k – ₱100k": 2,
  "₱100k – ₱500k": 3,
  "₱500k – ₱2M": 4,
  "₱2M+": 5,
}

export function JobsListPage({
  initialCategory = null,
}: {
  initialCategory?: ServiceCategory | null
}) {
  const [query, setQuery] = useState("")
  const [activeCategory, setActiveCategory] = useState<ServiceCategory | null>(
    initialCategory
  )
  const [sort, setSort] = useState<JobSortOption>("recent")

  const visible = useMemo(() => {
    let list: Job[] = jobs
    if (query.trim()) {
      const q = query.trim().toLowerCase()
      list = list.filter(
        (j) =>
          j.title.toLowerCase().includes(q) ||
          j.description.toLowerCase().includes(q) ||
          j.location.toLowerCase().includes(q) ||
          j.category.toLowerCase().includes(q)
      )
    }
    if (activeCategory) list = list.filter((j) => j.category === activeCategory)
    switch (sort) {
      case "budget-desc":
        list = [...list].sort(
          (a, b) => (budgetOrder[b.budget] ?? 0) - (budgetOrder[a.budget] ?? 0)
        )
        break
      case "bids-asc":
        list = [...list].sort((a, b) => a.bidCount - b.bidCount)
        break
    }
    return list
  }, [query, activeCategory, sort])

  return (
    <main className="bg-white">
      <Hero query={query} setQuery={setQuery} />

      <section className="bg-white pt-4 pb-16 sm:pt-6 sm:pb-20 lg:pb-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <Reveal>
            <CategoryRail
              active={activeCategory}
              setActive={setActiveCategory}
            />
          </Reveal>

          <div className="mt-8 mb-6 flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
            <p className="text-sm text-brand-black/65">
              <span className="font-bold text-brand-black">{visible.length}</span>{" "}
              of {jobs.length} open jobs
              {activeCategory ? ` in ${activeCategory}` : ""}
            </p>
            <SortMenu sort={sort} setSort={setSort} />
          </div>

          {visible.length === 0 ? (
            <EmptyState
              onClear={() => {
                setQuery("")
                setActiveCategory(null)
              }}
            />
          ) : (
            <div className="grid gap-4">
              {visible.map((j) => (
                <JobCard key={j.id} job={j} />
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  )
}

function Hero({
  query,
  setQuery,
}: {
  query: string
  setQuery: (v: string) => void
}) {
  return (
    <section className="relative isolate overflow-hidden bg-brand-ink pt-32 pb-12 text-white sm:pt-40 lg:pt-44">
      <div
        aria-hidden
        className="absolute inset-0 bg-cover bg-center opacity-25"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1920&q=80&auto=format&fit=crop')",
        }}
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-b from-brand-ink/95 via-brand-ink/85 to-brand-ink"
      />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <span className="inline-flex items-center gap-2 rounded-full border border-brand-orange/40 bg-brand-orange/10 px-4 py-1.5 text-[11px] font-semibold tracking-[0.2em] text-brand-orange uppercase">
          <span className="size-1.5 rounded-full bg-brand-orange" />
          Job Board
        </span>

        <h1 className="mt-5 text-3xl leading-tight font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
          Open jobs from buyers across the country.
        </h1>
        <p className="mt-3 max-w-xl text-sm text-white/70">
          Browse jobs that match your trade and area. Submit a bid in minutes —
          win the job, get paid through escrow as you deliver.
        </p>

        <div className="mt-6 flex flex-wrap items-center gap-3">
          <Link
            to="/jobs/post"
            className="inline-flex items-center gap-2 rounded-full bg-brand-orange px-5 py-2.5 text-xs font-semibold tracking-[0.2em] text-white uppercase transition-colors hover:bg-brand-orange-soft"
          >
            Post a job instead
            <HugeiconsIcon icon={ArrowRight01Icon} className="size-3.5" />
          </Link>
          <span className="text-xs text-white/55">
            Free to post · pay only when you hire
          </span>
        </div>

        <form
          className="mt-6 flex max-w-3xl items-center gap-2 rounded-full bg-white p-1.5 shadow-[0_24px_60px_-24px_rgba(0,0,0,0.6)] focus-within:ring-2 focus-within:ring-brand-orange/40"
          onSubmit={(e) => e.preventDefault()}
        >
          <span className="flex size-9 shrink-0 items-center justify-center text-brand-black/55">
            <HugeiconsIcon icon={Search01Icon} className="size-4" />
          </span>
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by trade, location, or keyword…"
            className="flex-1 bg-transparent py-1.5 text-sm text-brand-black placeholder:text-brand-black/45 outline-none"
          />
        </form>
      </div>
    </section>
  )
}

function CategoryRail({
  active,
  setActive,
}: {
  active: ServiceCategory | null
  setActive: (c: ServiceCategory | null) => void
}) {
  return (
    <div className="-mx-4 overflow-x-auto px-4 pt-10 pb-2 sm:mx-0 sm:px-0">
      <div className="flex min-w-max gap-2 sm:flex-wrap sm:gap-2">
        <button
          type="button"
          onClick={() => setActive(null)}
          className={cn(
            "relative inline-flex shrink-0 items-center gap-2 rounded-full border px-4 py-2 text-xs font-semibold transition-colors",
            active === null
              ? "border-brand-orange text-white"
              : "border-brand-black/10 bg-white text-brand-black/70 hover:border-brand-orange/40 hover:text-brand-orange"
          )}
        >
          {active === null && (
            <motion.span
              layoutId="jobs-cat-pill"
              className="absolute inset-0 rounded-full bg-brand-orange"
              transition={{ type: "spring", stiffness: 320, damping: 30 }}
            />
          )}
          <span className="relative">All trades</span>
        </button>
        {serviceCategories.map((c) => {
          const isActive = active === c.name
          return (
            <button
              key={c.name}
              type="button"
              onClick={() => setActive(c.name)}
              className={cn(
                "relative inline-flex shrink-0 items-center gap-2 rounded-full border px-4 py-2 text-xs font-semibold transition-colors",
                isActive
                  ? "border-brand-orange text-white"
                  : "border-brand-black/10 bg-white text-brand-black/70 hover:border-brand-orange/40 hover:text-brand-orange"
              )}
            >
              {isActive && (
                <motion.span
                  layoutId="jobs-cat-pill"
                  className="absolute inset-0 -z-10 rounded-full bg-brand-orange"
                  transition={{ type: "spring", stiffness: 320, damping: 30 }}
                />
              )}
              <span className="relative flex items-center gap-1.5">
                <HugeiconsIcon icon={c.icon} className="size-3.5" />
                {c.name}
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}

function SortMenu({
  sort,
  setSort,
}: {
  sort: JobSortOption
  setSort: (s: JobSortOption) => void
}) {
  const [open, setOpen] = useState(false)
  const active = jobSortOptions.find((s) => s.id === sort)!
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
        <div className="absolute top-full right-0 z-10 mt-2 w-64 rounded-md border border-brand-black/10 bg-white p-1 shadow-lg">
          {jobSortOptions.map((o) => (
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

function JobCard({ job }: { job: Job }) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-md border border-brand-black/10 bg-white p-6 shadow-[0_8px_20px_-12px_rgba(0,0,0,0.12)] transition-all hover:-translate-y-0.5 hover:border-brand-orange/40 hover:shadow-[0_25px_50px_-25px_rgba(255,116,32,0.25)] sm:p-7">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-orange/10 px-3 py-1 text-[10px] font-semibold tracking-[0.2em] text-brand-orange uppercase">
            {job.category}
          </span>
          <span className="inline-flex items-center gap-1 text-[11px] text-brand-black/55">
            <HugeiconsIcon
              icon={Location01Icon}
              className="size-3 text-brand-orange"
            />
            {job.location}
          </span>
        </div>
        <span className="text-[11px] tracking-wider text-brand-black/45 uppercase">
          {job.postedAgo}
        </span>
      </div>

      <h3 className="mt-3 text-lg leading-snug font-bold text-brand-black sm:text-xl">
        {job.title}
      </h3>
      <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-brand-black/65">
        {job.description}
      </p>

      <div className="mt-4 flex flex-wrap items-center gap-3 text-[11px] text-brand-black/65">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-black/[0.04] px-3 py-1 font-semibold">
          Budget · {job.budget}
        </span>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-black/[0.04] px-3 py-1">
          <HugeiconsIcon icon={TimerIcon} className="size-3" />
          {job.startWindow}
        </span>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-black/[0.04] px-3 py-1">
          <HugeiconsIcon icon={Wrench01Icon} className="size-3" />
          {job.bidCount} bid{job.bidCount === 1 ? "" : "s"} so far
        </span>
      </div>

      <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-brand-black/10 pt-5">
        <span className="inline-flex items-center gap-2 text-xs text-brand-black/65">
          Posted by{" "}
          <span className="font-semibold text-brand-black">
            {job.buyer.name}
          </span>
          {job.buyer.verified && (
            <span className="inline-flex items-center gap-1 rounded-full bg-brand-orange/10 px-2 py-0.5 text-[10px] font-semibold text-brand-orange">
              <HugeiconsIcon icon={CheckmarkBadge02Icon} className="size-3" />
              Verified buyer
            </span>
          )}
        </span>
        <Link
          to="/auth/signup"
          search={{ role: "contractor" }}
          className="inline-flex items-center gap-1.5 rounded-full bg-brand-orange px-4 py-2 text-[11px] font-semibold tracking-[0.18em] text-white uppercase transition-colors hover:bg-brand-orange-soft"
        >
          Submit a bid
          <HugeiconsIcon icon={ArrowRight01Icon} className="size-3" />
        </Link>
      </div>
    </article>
  )
}

function EmptyState({ onClear }: { onClear: () => void }) {
  return (
    <div className="rounded-md border border-dashed border-brand-black/15 bg-brand-black/[0.02] p-12 text-center">
      <p className="text-sm font-semibold text-brand-black">No open jobs match</p>
      <p className="mt-1 text-xs text-brand-black/55">
        New jobs post every day. Try a different trade or clear the filters.
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
