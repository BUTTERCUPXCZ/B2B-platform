import { motion } from "motion/react"
import { fadeUp, stagger } from "@/components/motion/variants"

export function SolutionsHero() {
  return (
    <section className="relative isolate overflow-hidden bg-brand-ink pt-44 pb-24 text-white">
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
        <motion.span
          variants={fadeUp}
          className="inline-flex items-center gap-2 rounded-full border border-brand-orange/40 bg-brand-orange/10 px-4 py-1.5 text-[11px] font-semibold tracking-[0.2em] text-brand-orange uppercase"
        >
          <span className="size-1.5 rounded-full bg-brand-orange" />
          Solutions
        </motion.span>

        <motion.h1
          variants={fadeUp}
          className="mt-6 text-5xl leading-[1.05] font-extrabold tracking-tight sm:text-6xl lg:text-[64px]"
        >
          Built For Every Shape Of
          <br />
          <span className="text-brand-orange">Construction Commerce.</span>
        </motion.h1>

        <motion.p
          variants={fadeUp}
          className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-white/75"
        >
          A materials yard, a parts retailer, a renovation contractor, a hardware
          chain, and the rare operator who runs all of them — they each have a
          different RFQ, a different ledger, a different field workflow.
          Buildora ships a tailored configuration for each.
        </motion.p>
      </motion.div>
    </section>
  )
}
