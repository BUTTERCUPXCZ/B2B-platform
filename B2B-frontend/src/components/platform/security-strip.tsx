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
    title: "SOC 2 Type II",
    body: "Independently audited annually. Reports available under NDA on request.",
  },
  {
    icon: CertificateIcon,
    title: "GDPR-ready DPA",
    body: "Standard data processing addendum for EU and global buyers, with sub-processor disclosures.",
  },
  {
    icon: LicenseIcon,
    title: "99.9% uptime SLA",
    body: "Multi-AZ infrastructure with documented uptime credits. 99.99% on Enterprise.",
  },
  {
    icon: CheckmarkSquare02Icon,
    title: "Audit logs & SSO",
    body: "Full audit trail, SAML SSO, SCIM provisioning, IP allowlisting on Enterprise plans.",
  },
]

export function SecurityStrip() {
  return (
    <section className="bg-brand-black py-20 text-white">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <span className="text-[11px] font-semibold tracking-[0.3em] text-brand-orange uppercase">
              Security & Compliance
            </span>
            <h2 className="mt-3 text-3xl leading-tight font-extrabold tracking-tight sm:text-4xl">
              Procurement-Grade By Default.
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
