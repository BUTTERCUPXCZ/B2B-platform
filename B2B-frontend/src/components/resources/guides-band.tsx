import { HugeiconsIcon } from "@hugeicons/react"
import {
  BookOpen01Icon,
  DownloadIcon,
  LibrariesIcon,
} from "@hugeicons/core-free-icons"

import { StaggerGroup, StaggerItem } from "@/components/motion/primitives"

const guides = [
  {
    icon: BookOpen01Icon,
    title: "B2B E-commerce Playbook for Construction",
    body: "62-page operator playbook on launching a B2B storefront for materials and parts — pricing models, catalog structure, buyer onboarding.",
    pages: "62 pages",
  },
  {
    icon: LibrariesIcon,
    title: "RFQ-to-Cash in 30 Days",
    body: "A step-by-step quoting workflow used by our top-performing customers to compress RFQ turnaround from days to hours.",
    pages: "28 pages",
  },
  {
    icon: BookOpen01Icon,
    title: "Net-Terms Underwriting Cheat Sheet",
    body: "The exact credit-check workflow our growth customers use to approve 80% of new contractor accounts without taking on bad debt.",
    pages: "14 pages",
  },
]

export function GuidesBand() {
  return (
    <section className="bg-brand-orange py-20 text-white">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col items-start justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <span className="text-[11px] font-semibold tracking-[0.3em] text-brand-black uppercase">
              Guides &amp; Playbooks
            </span>
            <h2 className="mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl">
              Operator-Grade Downloads.
            </h2>
            <p className="mt-3 max-w-md text-sm text-white/85">
              Long-form playbooks distilled from real implementations. Free —
              one email gate, no sales follow-up unless you ask.
            </p>
          </div>
        </div>

        <StaggerGroup className="mt-10 grid gap-4 lg:grid-cols-3">
          {guides.map((g) => (
            <StaggerItem
              key={g.title}
              className="flex flex-col rounded-md bg-brand-black/40 p-6 ring-1 ring-white/10 backdrop-blur-sm transition-colors hover:bg-brand-black/60"
            >
              <div className="flex items-center justify-between">
                <span className="flex size-11 items-center justify-center rounded-md bg-white/15 text-white">
                  <HugeiconsIcon icon={g.icon} className="size-5" />
                </span>
                <span className="text-[10px] font-semibold tracking-[0.25em] text-white/65 uppercase">
                  {g.pages}
                </span>
              </div>
              <h3 className="mt-5 text-lg leading-snug font-bold">
                {g.title}
              </h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-white/80">
                {g.body}
              </p>
              <a
                href="#"
                className="mt-6 inline-flex items-center justify-center gap-2 rounded-full bg-white px-5 py-2.5 text-xs font-semibold tracking-[0.2em] text-brand-orange uppercase transition-colors hover:bg-brand-black hover:text-white"
              >
                Download PDF
                <HugeiconsIcon icon={DownloadIcon} className="size-3.5" />
              </a>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  )
}
