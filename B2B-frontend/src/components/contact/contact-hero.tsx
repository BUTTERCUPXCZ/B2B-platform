import { motion } from "motion/react"
import { fadeUp, stagger } from "@/components/motion/variants"

export function ContactHero() {
  return (
    <section className="relative isolate overflow-hidden bg-brand-ink pt-32 sm:pt-40 lg:pt-44 pb-16 sm:pb-20 lg:pb-24 text-white">
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

        <motion.h1
          variants={fadeUp}
          className="mt-6 text-5xl leading-[1.05] font-extrabold tracking-tight sm:text-6xl"
        >
          We&rsquo;re Here For Buyers,
          <br />
          <span className="text-brand-orange">Sellers, And Everyone In Between.</span>
        </motion.h1>

        <motion.p
          variants={fadeUp}
          className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-white/75"
        >
          Buyer support replies in under 1 hour. Seller success replies same
          day. Press, partnerships, and contractor applications get a real
          human reply within 24 hours — no chatbots, no phone trees.
        </motion.p>
      </motion.div>
    </section>
  )
}
