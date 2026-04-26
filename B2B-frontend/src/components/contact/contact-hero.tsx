import { motion } from "motion/react"
import { fadeUp, stagger } from "@/components/motion/primitives"

export function ContactHero() {
  return (
    <section className="relative isolate overflow-hidden bg-brand-ink pt-44 pb-24 text-white">
      <div
        aria-hidden
        className="absolute inset-0 bg-cover bg-center opacity-20"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1429497419816-9ca5cfb4571a?w=1920&q=80&auto=format&fit=crop')",
        }}
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-b from-brand-ink/95 via-brand-ink/85 to-brand-ink"
      />

      <motion.div
        className="relative mx-auto max-w-4xl px-6 text-center"
        initial="hidden"
        animate="show"
        variants={stagger}
      >
        <motion.span
          variants={fadeUp}
          className="inline-flex items-center gap-2 rounded-full border border-brand-orange/40 bg-brand-orange/10 px-4 py-1.5 text-[11px] font-semibold tracking-[0.2em] text-brand-orange uppercase"
        >
          <span className="size-1.5 rounded-full bg-brand-orange" />
          Contact
        </motion.span>

        <motion.h1
          variants={fadeUp}
          className="mt-6 text-5xl leading-[1.05] font-extrabold tracking-tight sm:text-6xl"
        >
          Talk To A Construction
          <br />
          <span className="text-brand-orange">Commerce Specialist.</span>
        </motion.h1>

        <motion.p
          variants={fadeUp}
          className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-white/75"
        >
          Sales replies in under 4 business hours. Support tickets are answered
          same-day during your local working hours. No phone trees, no
          chatbots — every reply comes from someone who has run a yard or a
          crew before joining Buildora.
        </motion.p>
      </motion.div>
    </section>
  )
}
