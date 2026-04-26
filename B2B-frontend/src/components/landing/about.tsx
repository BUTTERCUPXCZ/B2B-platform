import { useState } from "react"
import { AnimatePresence, motion } from "motion/react"
import { HugeiconsIcon } from "@hugeicons/react"
import { ArrowRight01Icon, Call02Icon } from "@hugeicons/core-free-icons"
import { cn } from "@/lib/utils"
import { Reveal } from "@/components/motion/primitives"

const tabs = [
  {
    id: "mission",
    label: "Our Mission",
    body: "Bring every construction supply and service business online with the same operational rigor as the largest enterprise distributors — without the eight-figure software bill.",
  },
  {
    id: "vision",
    label: "Our Vision",
    body: "A connected construction economy where materials, labor, and project data flow on shared infrastructure — so a renovation in Cebu and a tower in Riyadh both ship on time.",
  },
  {
    id: "value",
    label: "Our Value",
    body: "Outcome-first software. Customers using Buildora process 3× more orders, cut quote turnaround by 40%, and reduce reliance on spreadsheets and WhatsApp by 80%.",
  },
] as const

export function About() {
  const [active, setActive] = useState<(typeof tabs)[number]["id"]>("mission")
  const activeTab = tabs.find((t) => t.id === active)!

  return (
    <section className="relative bg-white py-24">
      <div className="mx-auto grid max-w-7xl gap-14 px-6 lg:grid-cols-2 lg:items-center">
        <Reveal className="relative">
          <div
            className="aspect-[4/5] w-full overflow-hidden rounded-md bg-cover bg-center shadow-[0_30px_60px_-30px_rgba(0,0,0,0.25)]"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=900&q=80&auto=format&fit=crop')",
            }}
          />
          <div className="absolute -right-4 bottom-12 hidden w-48 overflow-hidden rounded-md bg-brand-orange p-5 text-white shadow-2xl sm:block">
            <span className="block text-[10px] font-medium tracking-[0.25em] uppercase">
              Operating since
            </span>
            <span className="mt-2 flex items-end gap-1 leading-none">
              <span className="text-5xl font-extrabold">14</span>
              <span className="pb-1.5 text-xs font-semibold uppercase">years</span>
            </span>
            <span className="mt-2 block text-xs text-white/80">
              powering construction commerce
            </span>
          </div>
        </Reveal>

        <Reveal>
          <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.25em] text-brand-orange uppercase">
            <span className="h-px w-8 bg-brand-orange" />
            About Buildora
          </span>
          <h2 className="mt-4 text-4xl leading-tight font-extrabold tracking-tight text-brand-black sm:text-[44px]">
            Built By Operators Who Ran
            <br />
            Construction Supply Businesses
          </h2>
          <p className="mt-5 text-sm leading-relaxed text-brand-black/65">
            Buildora was founded by a team that spent a decade running materials
            yards and renovation crews on a tangle of spreadsheets, WhatsApp
            threads, and disconnected accounting tools. We rebuilt the stack we
            wished existed — and opened it to the entire industry.
          </p>

          <div className="mt-8 border-b border-brand-black/10">
            <div className="flex gap-8">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActive(tab.id)}
                  className={cn(
                    "relative pb-3 text-sm font-semibold transition-colors",
                    active === tab.id
                      ? "text-brand-black"
                      : "text-brand-black/50 hover:text-brand-black"
                  )}
                >
                  {tab.label}
                  {active === tab.id && (
                    <span className="absolute right-0 bottom-0 left-0 h-0.5 bg-brand-orange" />
                  )}
                </button>
              ))}
            </div>
          </div>
          <AnimatePresence mode="wait">
            <motion.p
              key={activeTab.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0, transition: { duration: 0.3 } }}
              exit={{ opacity: 0, y: -4, transition: { duration: 0.15 } }}
              className="mt-5 max-w-xl text-sm leading-relaxed text-brand-black/65"
            >
              {activeTab.body}
            </motion.p>
          </AnimatePresence>

          <div className="mt-9 flex flex-wrap items-center gap-6">
            <a href="#quote" className="pill-cta">
              Talk to Sales
              <span className="pill-cta-icon">
                <HugeiconsIcon icon={ArrowRight01Icon} className="size-3.5" />
              </span>
            </a>
            <div className="flex items-center gap-3">
              <span className="flex size-11 items-center justify-center rounded-full bg-brand-orange/10 text-brand-orange">
                <HugeiconsIcon icon={Call02Icon} className="size-5" />
              </span>
              <div>
                <span className="block text-[11px] tracking-wider text-brand-black/50 uppercase">
                  Want to discuss?
                </span>
                <span className="block text-sm font-semibold text-brand-black">
                  +1 (415) 555-2310
                </span>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
