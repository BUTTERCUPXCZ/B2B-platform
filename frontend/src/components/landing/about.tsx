import { useState } from "react"
import { AnimatePresence, motion } from "motion/react"
import { HugeiconsIcon } from "@hugeicons/react"
import { ArrowRight01Icon, Call02Icon } from "@hugeicons/core-free-icons"
import { cn } from "@/lib/utils"
import { Reveal } from "@/components/motion/primitives"

const tabs = [
  {
    id: "buyers",
    label: "For Buyers",
    body: "Homeowners and contractors browse 24,000+ listings from 200+ verified suppliers, compare prices side-by-side, post jobs to vetted builders, and pay through escrow. Free, always — no membership, no hidden buyer fees.",
  },
  {
    id: "sellers",
    label: "For Sellers",
    body: "Materials yards and hardware retailers list their catalog in days, reach 12,000+ buyers across the country, and get paid weekly straight to the bank. Subscription from free, with transparent commissions per order.",
  },
  {
    id: "contractors",
    label: "For Contractors",
    body: "Service contractors apply free, get matched to jobs in their trade and area, send templated bids, and only pay when they win. The verified-pro badge boosts win rates by 3.2× over an unverified pro.",
  },
] as const

export function About() {
  const [active, setActive] = useState<(typeof tabs)[number]["id"]>("buyers")
  const activeTab = tabs.find((t) => t.id === active)!

  return (
    <section className="relative bg-white py-16 sm:py-20 lg:py-24">
      <div className="mx-auto grid max-w-7xl gap-14 px-6 lg:grid-cols-2 lg:items-center">
        <Reveal className="relative">
          <div
            className="aspect-[4/5] w-full overflow-hidden rounded-md bg-cover bg-center shadow-[0_30px_60px_-30px_rgba(0,0,0,0.25)]"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=900&q=80&auto=format&fit=crop')",
            }}
          />
          <div className="absolute -right-4 bottom-12 hidden w-52 overflow-hidden rounded-md bg-brand-orange p-5 text-white shadow-2xl sm:block">
            <span className="block text-[10px] font-medium tracking-[0.25em] uppercase">
              Marketplace GMV
            </span>
            <span className="mt-2 flex items-end gap-1 leading-none">
              <span className="text-5xl font-extrabold">₱840M</span>
            </span>
            <span className="mt-2 block text-xs text-white/85">
              processed in escrow across 12k+ buyers
            </span>
          </div>
        </Reveal>

        <Reveal>
          <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.25em] text-brand-orange uppercase">
            <span className="h-px w-8 bg-brand-orange" />
            About the Marketplace
          </span>
          <h2 className="mt-4 text-4xl leading-tight font-extrabold tracking-tight text-brand-black sm:text-[44px]">
            One Marketplace.
            <br />
            Three Sides Of The Trade.
          </h2>
          <p className="mt-5 text-sm leading-relaxed text-brand-black/65">
            Levite is the construction marketplace where homeowners and
            contractors shop materials and hire builders, while suppliers and
            service pros pay a transparent subscription to reach them. Every
            order moves through escrow — so trust isn&rsquo;t a leap of faith.
          </p>

          <div className="mt-8 overflow-x-auto border-b border-brand-black/10">
            <div className="flex gap-5 sm:gap-8">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActive(tab.id)}
                  className={cn(
                    "relative shrink-0 pb-3 text-sm font-semibold whitespace-nowrap transition-colors",
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
            <a href="#sell" className="pill-cta">
              Become a seller
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
                  Buyer support
                </span>
                <span className="block text-sm font-semibold text-brand-black">
                  +63 2 8555 2380
                </span>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
