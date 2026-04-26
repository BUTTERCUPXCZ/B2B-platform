import { HugeiconsIcon } from "@hugeicons/react"
import {
  CheckmarkBadge02Icon,
  Shield01Icon,
  CertificateIcon,
  TruckDeliveryIcon,
  HeadsetIcon,
} from "@hugeicons/core-free-icons"
import { StaggerGroup, StaggerItem } from "@/components/motion/primitives"

const trust = [
  { icon: CheckmarkBadge02Icon, label: "Verified suppliers" },
  { icon: Shield01Icon, label: "Escrow payments" },
  { icon: CertificateIcon, label: "Quality guarantee" },
  { icon: TruckDeliveryIcon, label: "Doorstep delivery" },
  { icon: HeadsetIcon, label: "24/7 buyer support" },
]

export function TrustStrip() {
  return (
    <section className="bg-brand-orange py-10 text-white">
      <StaggerGroup className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-8 gap-y-4 px-6">
        {trust.map((t) => (
          <StaggerItem
            key={t.label}
            className="inline-flex items-center gap-2.5 text-sm font-semibold"
          >
            <span className="flex size-9 items-center justify-center rounded-full bg-brand-black/30 ring-1 ring-white/15">
              <HugeiconsIcon icon={t.icon} className="size-4" />
            </span>
            {t.label}
          </StaggerItem>
        ))}
      </StaggerGroup>
    </section>
  )
}
