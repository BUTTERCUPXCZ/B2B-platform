import { motion } from "motion/react"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  ArrowRight01Icon,
  CheckmarkCircle02Icon,
  PlayIcon,
} from "@hugeicons/core-free-icons"
import { StaggerGroup, StaggerItem } from "@/components/motion/primitives"
import { fadeUp, stagger } from "@/components/motion/variants"

const guarantees = [
  "Unified storefront, quoting, and project workspace in one platform",
  "Net-terms billing, contract pricing, and multi-user B2B accounts",
  "Built for materials suppliers, parts sellers, and service contractors",
]

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-brand-ink pt-44 pb-12 text-white">
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
        className="relative mx-auto grid max-w-7xl gap-10 px-6 pb-32 lg:grid-cols-12 lg:gap-12"
        initial="hidden"
        animate="show"
        variants={stagger}
      >
        <div className="lg:col-span-7">
          <motion.h1
            variants={fadeUp}
            className="mt-6 text-5xl leading-[1.05] font-extrabold tracking-tight sm:text-6xl lg:text-[68px]"
          >
            One Platform For
            <br />
            <span className="text-brand-orange">Materials &amp; Services.</span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="mt-6 max-w-xl text-base leading-relaxed text-white/75"
          >
            Buildora is the all-in-one B2B platform for construction supply and service
            businesses — sell materials online, quote projects faster, and run your
            field crews from a single source of truth.
          </motion.p>

          <motion.div
            variants={fadeUp}
            className="mt-8 flex flex-wrap items-center gap-4"
          >
            <a href="#quote" className="pill-cta">
              Book a Demo
              <span className="pill-cta-icon">
                <HugeiconsIcon icon={ArrowRight01Icon} className="size-3.5" />
              </span>
            </a>
            <a href="#projects" className="pill-ghost">
              <span className="flex size-7 items-center justify-center rounded-full bg-white/15">
                <HugeiconsIcon icon={PlayIcon} className="size-3" />
              </span>
              Watch 90-sec tour
            </a>
          </motion.div>
        </div>

        <div className="hidden lg:col-span-5 lg:block" aria-hidden />
      </motion.div>

      <div
        aria-hidden
        className="pointer-events-none absolute right-6 bottom-32 hidden max-w-md rounded-md bg-brand-orange p-6 text-white shadow-[0_30px_60px_-30px_rgba(255,116,32,0.6)] lg:block"
      >
        <ul className="space-y-3 text-sm font-medium">
          {guarantees.map((g) => (
            <li key={g} className="flex items-start gap-2">
              <HugeiconsIcon
                icon={CheckmarkCircle02Icon}
                className="mt-0.5 size-4 shrink-0"
              />
              <span>{g}</span>
            </li>
          ))}
        </ul>
      </div>

      <Stats />
    </section>
  )
}

const stats = [
  { value: "200+", label: "Construction\nbusinesses" },
  { value: "$840M", label: "B2B GMV\nprocessed" },
  { value: "40%", label: "Faster quote\nturnaround" },
  { value: "99.9%", label: "Platform\nuptime" },
]

function Stats() {
  return (
    <StaggerGroup className="relative mx-auto mt-8 grid max-w-7xl grid-cols-2 gap-8 px-6 sm:grid-cols-4">
      {stats.map((s) => (
        <StaggerItem key={s.label} className="flex items-baseline gap-3">
          <span className="text-3xl font-extrabold text-brand-orange sm:text-4xl">
            {s.value}
          </span>
          <span className="text-xs leading-tight text-white/70 whitespace-pre-line">
            {s.label}
          </span>
        </StaggerItem>
      ))}
    </StaggerGroup>
  )
}
