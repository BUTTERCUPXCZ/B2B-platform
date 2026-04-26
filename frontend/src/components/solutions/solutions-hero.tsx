import { motion } from "motion/react"
import { fadeUp, stagger } from "@/components/motion/variants"

export function SolutionsHero() {
  return (
    <section className="relative isolate overflow-hidden bg-brand-ink pt-32 sm:pt-40 lg:pt-44 pb-16 sm:pb-20 lg:pb-24 text-white">
      <div
        aria-hidden
        className="absolute inset-0 bg-cover bg-center opacity-25"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1920&q=80&auto=format&fit=crop')",
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

        <motion.h1
          variants={fadeUp}
          className="mt-6 text-5xl leading-[1.05] font-extrabold tracking-tight sm:text-6xl lg:text-[64px]"
        >
          Built For Everyone
          <br />
          <span className="text-brand-orange">Who Builds.</span>
        </motion.h1>

        <motion.p
          variants={fadeUp}
          className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-white/75"
        >
          Homeowners renovating a kitchen, contractors stocking a jobsite,
          materials yards going online, builders winning new projects —
          Levite is the construction marketplace that fits every side of the
          trade.
        </motion.p>
      </motion.div>
    </section>
  )
}
