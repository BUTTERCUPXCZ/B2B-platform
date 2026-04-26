import { HugeiconsIcon } from "@hugeicons/react"
import {
  Location01Icon,
  Call02Icon,
  Clock01Icon,
} from "@hugeicons/core-free-icons"

import { StaggerGroup, StaggerItem } from "@/components/motion/primitives"

const offices = [
  {
    city: "Manila",
    region: "APAC HQ",
    address: "18 Office Park, 21st Floor, BGC, Taguig 1634",
    phone: "+63 2 8555 2310",
    hours: "Mon–Fri · 09:00–18:00 GMT+8",
    image:
      "https://images.unsplash.com/photo-1596423585025-32a04bcfa72f?w=900&q=80&auto=format&fit=crop",
  },
  {
    city: "Jakarta",
    region: "Engineering",
    address: "Wisma 46, 18th Floor, Jl. Jend. Sudirman Kav. 1, Jakarta 10220",
    phone: "+62 21 5555 2310",
    hours: "Mon–Fri · 09:00–18:00 GMT+7",
    image:
      "https://images.unsplash.com/photo-1555899434-94d1368aa7af?w=900&q=80&auto=format&fit=crop",
  },
  {
    city: "Dubai",
    region: "MENA Sales",
    address: "Boulevard Plaza Tower 1, 14th Floor, Downtown Dubai",
    phone: "+971 4 555 2310",
    hours: "Sun–Thu · 09:00–18:00 GMT+4",
    image:
      "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=900&q=80&auto=format&fit=crop",
  },
]

export function OfficesGrid() {
  return (
    <section className="bg-[#f5f3ef] py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-12 flex flex-col items-start justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <span className="text-[11px] font-semibold tracking-[0.3em] text-brand-orange uppercase">
              Offices
            </span>
            <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-brand-black sm:text-4xl">
              Where We Work.
            </h2>
          </div>
          <p className="max-w-sm text-sm text-brand-black/70">
            We&rsquo;re a remote-first team with anchor offices in three regions
            — drop in if you&rsquo;re nearby.
          </p>
        </div>

        <StaggerGroup className="grid gap-5 lg:grid-cols-3">
          {offices.map((o) => (
            <StaggerItem
              key={o.city}
              className="group flex flex-col overflow-hidden rounded-md border border-brand-black/10 bg-white transition-shadow hover:shadow-[0_25px_50px_-25px_rgba(0,0,0,0.25)]"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                  style={{ backgroundImage: `url('${o.image}')` }}
                />
                <span className="absolute top-4 left-4 rounded-full bg-brand-orange px-3 py-1 text-[10px] font-semibold tracking-[0.2em] text-white uppercase">
                  {o.region}
                </span>
              </div>

              <div className="flex flex-1 flex-col p-6">
                <h3 className="text-2xl font-extrabold tracking-tight text-brand-black">
                  {o.city}
                </h3>

                <dl className="mt-5 space-y-3 text-sm">
                  <Row icon={Location01Icon}>{o.address}</Row>
                  <Row icon={Call02Icon}>{o.phone}</Row>
                  <Row icon={Clock01Icon}>{o.hours}</Row>
                </dl>
              </div>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  )
}

type IconType = Parameters<typeof HugeiconsIcon>[0]["icon"]

function Row({
  icon,
  children,
}: {
  icon: IconType
  children: React.ReactNode
}) {
  return (
    <div className="flex items-start gap-3 text-brand-black/75">
      <span className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-md bg-brand-orange/10 text-brand-orange">
        <HugeiconsIcon icon={icon} className="size-3.5" />
      </span>
      <span className="text-[13px] leading-relaxed">{children}</span>
    </div>
  )
}
