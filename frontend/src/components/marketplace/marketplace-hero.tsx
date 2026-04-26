import { useState } from "react"
import { motion } from "motion/react"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  Search01Icon,
  ShoppingBag03Icon,
  Wrench01Icon,
  ArrowRight01Icon,
  CheckmarkCircle02Icon,
} from "@hugeicons/core-free-icons"
import { cn } from "@/lib/utils"
import { fadeUp, stagger } from "@/components/motion/variants"

type Mode = "materials" | "services"

const popularChips = {
  materials: ["Cement", "Rebar", "Tiles", "Paint", "Lumber", "Tools"],
  services: ["Roof repair", "House extension", "Electrical wiring", "Painting", "Plumbing", "Renovation"],
} as const

export function MarketplaceHero() {
  const [mode, setMode] = useState<Mode>("materials")

  return (
    <section className="relative isolate overflow-hidden bg-brand-ink pt-36 pb-16 sm:pb-20 lg:pb-24 text-white">
      <div
        aria-hidden
        className="absolute inset-0 bg-cover bg-center opacity-35"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1920&q=80&auto=format&fit=crop')",
        }}
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-b from-brand-ink/95 via-brand-ink/85 to-brand-ink"
      />

      <motion.div
        className="relative mx-auto max-w-5xl px-6 text-center"
        initial="hidden"
        animate="show"
        variants={stagger}
      >
        <motion.span
          variants={fadeUp}
          className="inline-flex items-center gap-2 rounded-full border border-brand-orange/40 bg-brand-orange/10 px-4 py-1.5 text-[11px] font-semibold tracking-[0.2em] text-brand-orange uppercase"
        >
          <span className="size-1.5 rounded-full bg-brand-orange" />
          Construction Marketplace
        </motion.span>

        <motion.h1
          variants={fadeUp}
          className="mt-6 text-5xl leading-[1.05] font-extrabold tracking-tight sm:text-6xl lg:text-[68px]"
        >
          Build Anything.
          <br />
          <span className="text-brand-orange">Source Everything.</span>
        </motion.h1>

        <motion.p
          variants={fadeUp}
          className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-white/75"
        >
          Shop construction materials from verified suppliers. Hire vetted builders
          for every project. One platform — from the first bag of cement to the
          final coat of paint.
        </motion.p>

        <motion.div variants={fadeUp} className="mx-auto mt-10 max-w-3xl">
          <div className="inline-flex items-center gap-1 rounded-full border border-white/15 bg-white/5 p-1 text-xs font-semibold backdrop-blur">
            {(["materials", "services"] as const).map((m) => (
              <button
                key={m}
                type="button"
                onClick={() => setMode(m)}
                className={cn(
                  "relative inline-flex items-center gap-2 rounded-full px-5 py-2 tracking-[0.18em] uppercase transition-colors",
                  mode === m ? "text-white" : "text-white/75 hover:text-white"
                )}
              >
                {mode === m && (
                  <motion.span
                    layoutId="hero-mode-pill"
                    className="absolute inset-0 rounded-full bg-brand-orange shadow-lg"
                    transition={{ type: "spring", stiffness: 320, damping: 30 }}
                  />
                )}
                <span className="relative flex items-center gap-2">
                  <HugeiconsIcon
                    icon={m === "materials" ? ShoppingBag03Icon : Wrench01Icon}
                    className="size-3.5"
                  />
                  {m === "materials" ? "Shop Materials" : "Hire a Builder"}
                </span>
              </button>
            ))}
          </div>

          <form
            className="mt-5 flex items-center gap-2 rounded-full bg-white p-2 shadow-[0_30px_60px_-30px_rgba(0,0,0,0.6)] focus-within:ring-2 focus-within:ring-brand-orange/40"
            onSubmit={(e) => e.preventDefault()}
          >
            <span className="flex size-11 shrink-0 items-center justify-center text-brand-black/65">
              <HugeiconsIcon icon={Search01Icon} className="size-5" />
            </span>
            <input
              type="search"
              placeholder={
                mode === "materials"
                  ? "Search 24,000+ materials — cement, tiles, tools…"
                  : "Search 1,800+ services — roofing, plumbing, full builds…"
              }
              className="flex-1 bg-transparent py-2 text-sm text-brand-black placeholder:text-brand-black/45 outline-none sm:text-base"
            />
            <button
              type="submit"
              className="hidden h-11 items-center gap-2 rounded-full bg-brand-orange px-6 text-xs font-semibold tracking-[0.2em] text-white uppercase transition-colors hover:bg-brand-orange-soft sm:inline-flex"
            >
              Search
              <HugeiconsIcon icon={ArrowRight01Icon} className="size-3.5" />
            </button>
            <button
              type="submit"
              aria-label="Search"
              className="flex size-11 items-center justify-center rounded-full bg-brand-orange text-white transition-colors hover:bg-brand-orange-soft sm:hidden"
            >
              <HugeiconsIcon icon={ArrowRight01Icon} className="size-4" />
            </button>
          </form>

          <ul className="mt-5 flex flex-wrap items-center justify-center gap-2 text-xs">
            <li className="text-white/50">Popular:</li>
            {popularChips[mode].map((c) => (
              <li key={c}>
                <a
                  href="#categories"
                  className="rounded-full border border-white/15 bg-white/5 px-3 py-1.5 font-medium text-white/85 transition-colors hover:border-brand-orange hover:bg-brand-orange/10 hover:text-brand-orange"
                >
                  {c}
                </a>
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.p
          variants={fadeUp}
          className="mt-9 inline-flex items-center gap-2 text-xs text-white/65"
        >
          <HugeiconsIcon icon={CheckmarkCircle02Icon} className="size-3.5 text-brand-orange" />
          Trusted by 12,000+ buyers across 200+ verified construction sellers
        </motion.p>
      </motion.div>
    </section>
  )
}
