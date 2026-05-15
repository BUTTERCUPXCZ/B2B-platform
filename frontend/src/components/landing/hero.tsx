import { Link } from "@tanstack/react-router"
import { motion } from "motion/react"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  ArrowRight01Icon,
  ShoppingBag03Icon,
} from "@hugeicons/core-free-icons"
import { fadeUp, stagger } from "@/components/motion/variants"

export function Hero() {
  return (
    <section
      className="relative isolate flex min-h-svh flex-col items-center justify-center overflow-hidden bg-brand-ink text-white"
      aria-label="Hero"
    >
      <div
        aria-hidden
        className="absolute inset-0 bg-cover bg-center opacity-60 transition-opacity duration-700"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1920&q=80&auto=format&fit=crop')",
        }}
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-b from-brand-ink/70 via-brand-ink/60 to-brand-ink"
      />

      <motion.div
        className="relative mx-auto w-full max-w-[860px] px-6 py-24 text-center sm:py-32"
        initial="hidden"
        animate="show"
        variants={stagger}
      >
          <motion.h1
            variants={fadeUp}
            className="text-4xl leading-[1.05] font-bold tracking-[-0.02em] sm:text-5xl md:text-6xl lg:text-[72px]"
          >
            Build Anything.
            <br />
            <span className="text-brand-orange">Source Everything.</span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-white/80"
          >
            Shop materials from verified suppliers. Hire vetted builders for
            every project. One marketplace — from the first bag of cement to
            the final coat of paint.
          </motion.p>

          <motion.div
            variants={fadeUp}
            className="mt-9 flex flex-wrap items-center justify-center gap-4"
          >
            <Link to="/shop" className="pill-cta group/pill">
              Browse marketplace
              <span className="pill-cta-icon">
                <HugeiconsIcon icon={ArrowRight01Icon} className="size-3.5" />
              </span>
            </Link>
            <Link to="/sell" className="pill-ghost">
              <span className="flex size-7 items-center justify-center rounded-full bg-white/15">
                <HugeiconsIcon icon={ShoppingBag03Icon} className="size-3" />
              </span>
              Sell on STRUKTURA
            </Link>
          </motion.div>
      </motion.div>
    </section>
  )
}