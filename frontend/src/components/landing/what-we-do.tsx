import { HugeiconsIcon } from "@hugeicons/react"
import {
  ArrowRight01Icon,
  ArrowUpRight01Icon,
  ShoppingBag02Icon,
  CustomerService01Icon,
  Shield01Icon,
  TruckDeliveryIcon,
} from "@hugeicons/core-free-icons"
import { Reveal, StaggerGroup, StaggerItem } from "@/components/motion/primitives"

const capabilities = [
  {
    icon: ShoppingBag02Icon,
    title: "24,000+ verified listings",
    desc: "Cement, rebar, tiles, paint, tools, fixtures — sourced from 200+ identity-verified sellers in one searchable catalog.",
  },
  {
    icon: CustomerService01Icon,
    title: "Bid-ready service marketplace",
    desc: "Post a job once, get up to 5 priced bids from vetted contractors within 24 hours. Hire on price, rating, or earliest start.",
  },
  {
    icon: Shield01Icon,
    title: "Escrow on every order",
    desc: "Your money is held in escrow until you sign off. If a job goes sideways, our team mediates and refunds within 36 hours.",
  },
  {
    icon: TruckDeliveryIcon,
    title: "Doorstep & jobsite delivery",
    desc: "Schedule delivery to a home, a yard, or an active site — by the hour, not by the day. Live tracking from supplier to gate.",
  },
] as const

const targetUsers = [
  "Homeowners building or renovating",
  "Independent contractors stocking jobs",
  "Materials yards expanding online",
  "Verified pros winning more jobs",
]

export function WhatWeDo() {
  return (
    <section className="relative overflow-hidden bg-[#f5f3ef] py-16 sm:py-20 lg:py-24">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-0 hidden w-1/3 bg-cover bg-left opacity-[0.06] lg:block"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=900&q=80&auto=format&fit=crop')",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-0 hidden w-1/3 bg-cover bg-right opacity-[0.06] lg:block"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=900&q=80&auto=format&fit=crop')",
        }}
      />

      <div className="relative mx-auto grid max-w-7xl gap-14 px-6 lg:grid-cols-12 lg:items-center">
        <div className="relative hidden lg:col-span-5 lg:block">
          <div className="relative h-[560px]">
            <div
              className="absolute top-0 left-0 size-56 overflow-hidden rounded-md bg-cover bg-center shadow-2xl"
              style={{
                backgroundImage:
                  "url('https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=600&q=80&auto=format&fit=crop')",
              }}
            />
            <div
              className="absolute top-32 left-32 size-56 overflow-hidden rounded-md bg-cover bg-center shadow-2xl ring-8 ring-[#f5f3ef]"
              style={{
                backgroundImage:
                  "url('https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&q=80&auto=format&fit=crop')",
              }}
            />
            <div
              className="absolute top-72 left-12 size-48 overflow-hidden rounded-md bg-cover bg-center shadow-2xl ring-8 ring-[#f5f3ef]"
              style={{
                backgroundImage:
                  "url('https://images.unsplash.com/photo-1591955506264-3f5a6834570a?w=600&q=80&auto=format&fit=crop')",
              }}
            />
            <span className="absolute top-4 right-4 rounded-full bg-brand-orange px-4 py-1.5 text-[10px] font-semibold tracking-[0.25em] text-white uppercase shadow-lg">
              Real customers
            </span>
          </div>
        </div>

        <div className="lg:col-span-7">
          <Reveal className="mb-10">
            <h2 className="text-4xl leading-tight font-extrabold tracking-tight text-brand-black sm:text-[44px]">
              What you can do here <span className="text-brand-orange">!</span>
            </h2>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-brand-black/65">
              Buildora is a marketplace, not just a catalog. Every listing
              connects to a verified seller, every job connects to a vetted
              pro, and every transaction is escrow-backed end to end.
            </p>
          </Reveal>

          <StaggerGroup className="grid gap-4 sm:grid-cols-2">
            {capabilities.map((c) => (
              <StaggerItem
                key={c.title}
                className="group relative overflow-hidden rounded-md border border-brand-black/10 bg-white p-5 transition-all hover:-translate-y-1 hover:border-brand-orange/40 hover:shadow-[0_20px_40px_-20px_rgba(255,116,32,0.4)]"
              >
                <div className="flex items-start justify-between">
                  <span className="flex size-11 items-center justify-center rounded-md bg-brand-orange/10 text-brand-orange transition-colors group-hover:bg-brand-orange group-hover:text-white">
                    <HugeiconsIcon icon={c.icon} className="size-5" />
                  </span>
                  <HugeiconsIcon
                    icon={ArrowUpRight01Icon}
                    className="size-4 text-brand-black/30 transition-colors group-hover:text-brand-orange"
                  />
                </div>
                <h3 className="mt-4 text-base font-semibold text-brand-black">
                  {c.title}
                </h3>
                <p className="mt-1.5 text-xs leading-relaxed text-brand-black/60">
                  {c.desc}
                </p>
              </StaggerItem>
            ))}
          </StaggerGroup>

          <h3 className="mt-12 text-2xl font-bold text-brand-black">
            Built for everyone who builds
          </h3>
          <ul className="mt-4 grid gap-2 text-sm text-brand-black/70 sm:grid-cols-2">
            {targetUsers.map((item) => (
              <li key={item} className="flex items-center gap-2">
                <HugeiconsIcon
                  icon={ArrowRight01Icon}
                  className="size-3.5 text-brand-orange"
                />
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <a href="#projects" className="pill-cta mt-9">
            Browse the marketplace
            <span className="pill-cta-icon">
              <HugeiconsIcon icon={ArrowRight01Icon} className="size-3.5" />
            </span>
          </a>
        </div>
      </div>
    </section>
  )
}
