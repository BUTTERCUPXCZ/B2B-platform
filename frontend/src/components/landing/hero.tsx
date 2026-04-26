import { useState } from "react"
import { Link, useNavigate } from "@tanstack/react-router"
import { motion } from "motion/react"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  ArrowRight01Icon,
  Search01Icon,
  ShoppingBag03Icon,
  Wrench01Icon,
} from "@hugeicons/core-free-icons"
import { cn } from "@/lib/utils"
import { StaggerGroup, StaggerItem } from "@/components/motion/primitives"
import { fadeUp, stagger } from "@/components/motion/variants"

type Mode = "materials" | "services"

export function Hero() {
  const [mode, setMode] = useState<Mode>("materials")
  const [query, setQuery] = useState("")
  const navigate = useNavigate()

  const submitSearch = () => {
    if (!query.trim()) return
    navigate({
      to: mode === "materials" ? "/shop" : "/services",
      search: { q: query.trim() },
    })
  }

  return (
    <section className="relative isolate overflow-hidden bg-brand-ink pt-32 sm:pt-40 lg:pt-44 pb-12 text-white">
      <div
        aria-hidden
        className="absolute inset-0 bg-cover bg-center opacity-60"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1920&q=80&auto=format&fit=crop')",
        }}
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-r from-brand-ink via-brand-ink/85 to-brand-ink/30"
      />
      <div
        aria-hidden
        className="absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-brand-ink/0 to-brand-ink/40"
      />

      <motion.div
        className="relative mx-auto grid max-w-7xl gap-10 px-6 pb-16 sm:pb-24 lg:grid-cols-12 lg:gap-12 lg:pb-32"
        initial="hidden"
        animate="show"
        variants={stagger}
      >
        <div className="lg:col-span-7">
          <motion.h1
            variants={fadeUp}
            className="mt-6 text-4xl leading-[1.05] font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-[68px]"
          >
            Build Anything.
            <br />
            <span className="text-brand-orange">Source Everything.</span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="mt-6 max-w-xl text-base leading-relaxed text-white/75"
          >
            Shop materials from verified suppliers. Hire vetted builders for
            every project. One marketplace — from the first bag of cement to
            the final coat of paint.
          </motion.p>

          <motion.div variants={fadeUp} className="mt-8 max-w-xl">
            <div className="inline-flex items-center gap-1 rounded-full border border-white/15 bg-white/5 p-1 text-[11px] font-semibold backdrop-blur">
              {(["materials", "services"] as const).map((m) => (
                <button
                  key={m}
                  type="button"
                  onClick={() => setMode(m)}
                  className={cn(
                    "relative inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 tracking-[0.18em] uppercase transition-colors",
                    mode === m ? "text-white" : "text-white/60 hover:text-white"
                  )}
                >
                  {mode === m && (
                    <motion.span
                      layoutId="hero-mode-pill"
                      className="absolute inset-0 rounded-full bg-brand-orange shadow-lg"
                      transition={{ type: "spring", stiffness: 320, damping: 30 }}
                    />
                  )}
                  <span className="relative flex items-center gap-1.5">
                    <HugeiconsIcon
                      icon={mode === "materials" ? ShoppingBag03Icon : Wrench01Icon}
                      className="size-3"
                    />
                    {m === "materials" ? "Shop materials" : "Hire a builder"}
                  </span>
                </button>
              ))}
            </div>

            <form
              className="mt-3 flex items-center gap-2 rounded-full bg-white p-1.5 shadow-[0_24px_60px_-24px_rgba(0,0,0,0.6)] focus-within:ring-2 focus-within:ring-brand-orange/40"
              onSubmit={(e) => {
                e.preventDefault()
                submitSearch()
              }}
            >
              <span className="flex size-9 shrink-0 items-center justify-center text-brand-black/55">
                <HugeiconsIcon icon={Search01Icon} className="size-4" />
              </span>
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={
                  mode === "materials"
                    ? "Search 24,000+ materials — cement, tiles, tools…"
                    : "Search 1,800+ services — roofing, plumbing, full builds…"
                }
                className="flex-1 bg-transparent py-1.5 text-sm text-brand-black placeholder:text-brand-black/45 outline-none"
              />
              <button
                type="submit"
                className="inline-flex h-9 items-center gap-1.5 rounded-full bg-brand-orange px-4 text-[11px] font-semibold tracking-[0.18em] text-white uppercase transition-colors hover:bg-brand-orange-soft"
              >
                Search
                <HugeiconsIcon icon={ArrowRight01Icon} className="size-3" />
              </button>
            </form>
          </motion.div>

          <motion.div
            variants={fadeUp}
            className="mt-7 flex flex-wrap items-center gap-4"
          >
            <Link to="/shop" className="pill-cta">
              Browse marketplace
              <span className="pill-cta-icon">
                <HugeiconsIcon icon={ArrowRight01Icon} className="size-3.5" />
              </span>
            </Link>
            <Link to="/sell" className="pill-ghost">
              <span className="flex size-7 items-center justify-center rounded-full bg-white/15">
                <HugeiconsIcon icon={ShoppingBag03Icon} className="size-3" />
              </span>
              Sell on Levite
            </Link>
          </motion.div>
        </div>

        <div className="hidden lg:col-span-5 lg:block" aria-hidden />
      </motion.div>

      <Stats />
    </section>
  )
}

const stats = [
  { value: "12k+", label: "Verified\nbuyers" },
  { value: "200+", label: "Active\nsellers" },
  { value: "24h", label: "Median bid\nturnaround" },
  { value: "₱840M", label: "Escrow GMV\nprocessed" },
]

function Stats() {
  return (
    <StaggerGroup className="relative mx-auto mt-8 grid max-w-7xl grid-cols-2 gap-8 px-6 sm:grid-cols-4">
      {stats.map((s) => (
        <StaggerItem key={s.label} className="flex flex-col gap-1.5 border-l-2 border-brand-orange/40 pl-4">
          <span className="text-3xl font-extrabold leading-none text-brand-orange sm:text-4xl">
            {s.value}
          </span>
          <span className="text-xs leading-snug text-white/70 whitespace-pre-line">
            {s.label}
          </span>
        </StaggerItem>
      ))}
    </StaggerGroup>
  )
}
