import { StaggerGroup, StaggerItem } from "@/components/motion/primitives"

const steps = [
  { step: "Step 1", title: "Discovery & Audit Of Your Operations" },
  { step: "Step 2", title: "Catalog & Pricing Migration Plan" },
  { step: "Step 3", title: "Storefront, Quoting & Workspace Launch" },
  { step: "Step 4", title: "Onboard Your Buyers & Field Teams" },
]

export function Process() {
  return (
    <section className="bg-brand-orange py-16 text-white">
      <div className="mx-auto max-w-7xl px-6">
        <StaggerGroup className="relative grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div
            aria-hidden
            className="absolute top-12 right-6 left-6 hidden h-px bg-white/35 lg:block"
          />
          {steps.map((s, i) => (
            <StaggerItem key={s.step} className="relative text-center">
              <div className="relative mx-auto mb-5 flex size-7 items-center justify-center rounded-full bg-white text-[10px] font-bold text-brand-orange ring-4 ring-brand-orange">
                {i + 1}
              </div>
              <p className="text-base leading-snug font-semibold sm:text-[17px]">
                {s.title}
              </p>
              <p className="mt-2 text-[11px] tracking-[0.25em] text-white/70 uppercase">
                {s.step}
              </p>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  )
}
