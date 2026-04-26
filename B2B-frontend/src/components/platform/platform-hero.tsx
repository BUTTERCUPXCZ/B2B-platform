import { Link } from "@tanstack/react-router"
import { motion } from "motion/react"
import { HugeiconsIcon } from "@hugeicons/react"
import { ArrowRight01Icon, PlayIcon } from "@hugeicons/core-free-icons"
import { fadeUp, stagger } from "@/components/motion/variants"

export function PlatformHero() {
  return (
    <section className="relative isolate overflow-hidden bg-brand-ink pt-44 pb-24 text-white">
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
          The Platform
        </motion.span>

        <motion.h1
          variants={fadeUp}
          className="mt-6 text-5xl leading-[1.05] font-extrabold tracking-tight sm:text-6xl lg:text-[68px]"
        >
          Every Construction Commerce
          <br />
          <span className="text-brand-orange">Surface, In One Stack.</span>
        </motion.h1>

        <motion.p
          variants={fadeUp}
          className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-white/75"
        >
          Buildora unifies eight operational surfaces — storefront, quoting,
          projects, accounts, inventory, billing, customer portal, and
          analytics — onto a single shared customer and inventory ledger. Stop
          reconciling between five tools every Friday.
        </motion.p>

        <motion.div
          variants={fadeUp}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <Link to="/" hash="quote" className="pill-cta">
            Book a Demo
            <span className="pill-cta-icon">
              <HugeiconsIcon icon={ArrowRight01Icon} className="size-3.5" />
            </span>
          </Link>
          <Link to="/pricing" className="pill-ghost">
            <span className="flex size-7 items-center justify-center rounded-full bg-white/15">
              <HugeiconsIcon icon={PlayIcon} className="size-3" />
            </span>
            See Pricing
          </Link>
        </motion.div>
      </motion.div>
    </section>
  )
}
