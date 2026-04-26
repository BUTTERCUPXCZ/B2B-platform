import { HugeiconsIcon } from "@hugeicons/react"
import {
  Shield01Icon,
  CertificateIcon,
  LicenseIcon,
  CheckmarkSquare02Icon,
  ArrowRight01Icon,
} from "@hugeicons/core-free-icons"

import { StaggerGroup, StaggerItem } from "@/components/motion/primitives"

const trustItems = [
  {
    icon: Shield01Icon,
    title: "Buyer Escrow",
    body: "Every order and service payment is held in escrow until you sign off. Funds never reach the seller before delivery.",
  },
  {
    icon: CertificateIcon,
    title: "Verified Sellers",
    body: "Every seller passes ID + business-permit checks. Service contractors add a license check on top.",
  },
  {
    icon: LicenseIcon,
    title: "Quality Guarantee",
    body: "If a delivered material doesn’t match its listing, we refund the order — no questions asked, within 7 days.",
  },
  {
    icon: CheckmarkSquare02Icon,
    title: "Dispute Resolution",
    body: "Buildora mediates disputes between buyers and sellers within 3 business days, with full transaction logs.",
  },
]

export function SecurityStrip() {
  return (
    <section className="bg-brand-black py-14 sm:py-16 lg:py-20 text-white">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <span className="text-[11px] font-semibold tracking-[0.3em] text-brand-orange uppercase">
              Trust &amp; Safety
            </span>
            <h2 className="mt-3 text-3xl leading-tight font-extrabold tracking-tight sm:text-4xl">
              Buyer-protected by default.
            </h2>
          </div>
          <a
            href="#"
            className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.2em] text-white/70 uppercase transition-colors hover:text-brand-orange"
          >
            Read security overview
            <HugeiconsIcon icon={ArrowRight01Icon} className="size-3.5" />
          </a>
        </div>

        <StaggerGroup className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {trustItems.map((t) => (
            <StaggerItem
              key={t.title}
              className="rounded-md border border-white/10 bg-white/[0.03] p-5 transition-colors hover:border-brand-orange/40"
            >
              <span className="flex size-10 items-center justify-center rounded-md bg-brand-orange/15 text-brand-orange">
                <HugeiconsIcon icon={t.icon} className="size-5" />
              </span>
              <h3 className="mt-4 text-base font-semibold">{t.title}</h3>
              <p className="mt-2 text-xs leading-relaxed text-white/65">
                {t.body}
              </p>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  )
}
