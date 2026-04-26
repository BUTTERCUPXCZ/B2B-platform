import { motion } from "motion/react"
import { HugeiconsIcon } from "@hugeicons/react"
import { Search01Icon } from "@hugeicons/core-free-icons"
import { fadeUp, stagger } from "@/components/motion/variants"

export function ResourcesHero() {
  return (
    <section className="relative isolate overflow-hidden bg-brand-ink pt-32 sm:pt-40 lg:pt-44 pb-16 sm:pb-20 lg:pb-24 text-white">
      <div
        aria-hidden
        className="absolute inset-0 bg-cover bg-center opacity-20"
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
        className="relative mx-auto max-w-4xl px-6 text-center"
        initial="hidden"
        animate="show"
        variants={stagger}
      >
        <motion.h1
          variants={fadeUp}
          className="mt-6 text-5xl leading-[1.05] font-extrabold tracking-tight sm:text-6xl"
        >
          Everything You Need
          <br />
          <span className="text-brand-orange">To Build Smarter.</span>
        </motion.h1>

        <motion.p
          variants={fadeUp}
          className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-white/75"
        >
          Buying guides for homeowners and contractors, growth playbooks for
          sellers, and project deep-dives from real Buildora builds. Written by
          the people who ship the marketplace and the operators who use it.
        </motion.p>

        <motion.form
          variants={fadeUp}
          className="mx-auto mt-9 flex max-w-xl items-center overflow-hidden rounded-full bg-white/5 ring-1 ring-white/15 backdrop-blur focus-within:ring-brand-orange"
          onSubmit={(e) => e.preventDefault()}
        >
          <span className="flex size-12 shrink-0 items-center justify-center text-white/55">
            <HugeiconsIcon icon={Search01Icon} className="size-4" />
          </span>
          <input
            type="search"
            placeholder="Search guides, builds, seller playbooks…"
            className="flex-1 bg-transparent py-3 pr-4 text-sm text-white placeholder:text-white/40 outline-none"
          />
          <button
            type="submit"
            className="m-1.5 rounded-full bg-brand-orange px-5 py-2.5 text-xs font-semibold tracking-[0.2em] text-brand-ink uppercase transition-colors hover:bg-brand-orange-soft"
          >
            Search
          </button>
        </motion.form>
      </motion.div>
    </section>
  )
}
