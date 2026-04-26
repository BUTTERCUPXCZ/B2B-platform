import { HugeiconsIcon } from "@hugeicons/react"
import {
  Calendar01Icon,
  Clock01Icon,
  ArrowRight01Icon,
  VideoReplayIcon,
} from "@hugeicons/core-free-icons"

import { StaggerGroup, StaggerItem } from "@/components/motion/primitives"

const webinars = [
  {
    date: "May 12",
    time: "11:00 GMT+8 · 60 min",
    title: "Listing 101: Photo, Pricing, and Description Best Practices",
    speaker: "Adi Santoso · Head of Marketplace, Buildora",
    tag: "Sellers",
  },
  {
    date: "May 27",
    time: "10:00 GMT+8 · 45 min",
    title: "How To Plan A Home Renovation You Can Actually Afford",
    speaker: "Jonas Park · Buyer Advocate, Buildora",
    tag: "Buyers",
  },
  {
    date: "Jun 03",
    time: "13:00 GMT+8 · 75 min",
    title: "Q&A With A Verified-Pro: Winning Service Jobs on Buildora",
    speaker: "Elena Marsh · Founder, Heritage Renovation Co.",
    tag: "Contractors",
  },
]

export function WebinarsList() {
  return (
    <section className="bg-brand-black py-14 sm:py-16 lg:py-20 text-white">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col items-start justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <span className="text-[11px] font-semibold tracking-[0.3em] text-brand-orange uppercase">
              Live Webinars
            </span>
            <h2 className="mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl">
              Coming Up Next.
            </h2>
          </div>
          <a
            href="#"
            className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.2em] text-white/70 uppercase transition-colors hover:text-brand-orange"
          >
            <HugeiconsIcon icon={VideoReplayIcon} className="size-3.5" />
            Browse past recordings
          </a>
        </div>

        <StaggerGroup className="mt-10 divide-y divide-white/10 border-y border-white/10">
          {webinars.map((w) => (
            <StaggerItem
              key={w.title}
              className="grid items-center gap-5 py-6 sm:grid-cols-[auto_1fr_auto]"
            >
              <div className="flex w-32 flex-col rounded-md bg-brand-orange p-3 text-center">
                <span className="flex items-center justify-center gap-1 text-[10px] font-semibold tracking-[0.2em] uppercase">
                  <HugeiconsIcon icon={Calendar01Icon} className="size-3" />
                  Live
                </span>
                <span className="mt-1 text-2xl leading-tight font-extrabold tracking-tight">
                  {w.date}
                </span>
                <span className="mt-1 inline-flex items-center justify-center gap-1 text-[10px] text-white/85">
                  <HugeiconsIcon icon={Clock01Icon} className="size-3" />
                  {w.time}
                </span>
              </div>

              <div>
                <span className="text-[10px] font-semibold tracking-[0.25em] text-brand-orange uppercase">
                  {w.tag}
                </span>
                <h3 className="mt-1 text-lg leading-snug font-bold">
                  {w.title}
                </h3>
                <p className="mt-1 text-xs text-white/65">{w.speaker}</p>
              </div>

              <a
                href="#"
                className="inline-flex items-center gap-2 self-start rounded-full bg-white px-5 py-2.5 text-xs font-semibold tracking-[0.2em] text-brand-black uppercase transition-colors hover:bg-brand-orange hover:text-white sm:self-center"
              >
                Register
                <HugeiconsIcon icon={ArrowRight01Icon} className="size-3.5" />
              </a>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  )
}
