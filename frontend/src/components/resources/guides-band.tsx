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
    title: "Homeowner's Construction Buying Guide",
    body: "How to plan a renovation or new build on Levite — from materials takeoff to hiring contractors to managing payments through escrow.",
    pages: "48 pages",
  },
  {
    icon: LibrariesIcon,
    title: "Seller Playbook: Your First 90 Days",
    body: "The exact onboarding rhythm Top Seller badge holders follow — pricing, listings, photography, response time, and review strategy.",
    pages: "36 pages",
  },
  {
    icon: BookOpen01Icon,
    title: "Contractor's Guide to Winning Bids",
    body: "How verified-pro contractors structure their bids, photos, and response time to win 3× more jobs than the median pro on the platform.",
    pages: "22 pages",
  },
]

export function GuidesBand() {
  return (
    <section className="bg-brand-orange py-14 sm:py-16 lg:py-20 text-white">
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
