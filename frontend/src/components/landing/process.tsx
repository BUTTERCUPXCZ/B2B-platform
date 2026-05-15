import { Link } from "@tanstack/react-router"
import { StaggerGroup, StaggerItem } from "@/components/motion/primitives"

const steps: Array<{ step: string; title: string; to?: string; description?: string }> = [
  { step: "Step 1", title: "Browse 24,000+ Listings & Verified Pros", to: "/shop", description: "Search materials, compare prices, and check verified supplier ratings." },
  { step: "Step 2", title: "Post A Job · Compare Bids In 24h", to: "/jobs", description: "Describe your project and receive competitive bids from vetted professionals." },
  { step: "Step 3", title: "Pay Safely Through Escrow", description: "Funds are held securely until you confirm the work is complete." },
  { step: "Step 4", title: "Receive Or Sign Off — Build", description: "Approve completed work and release payment with confidence." },
]

export function Process() {
  return (
    <section className="bg-brand-orange py-16 text-white" aria-labelledby="process-heading">
      <div className="mx-auto max-w-[1440px] px-6">
        <h2 id="process-heading" className="sr-only">How it works</h2>
        <StaggerGroup className="relative grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div
            aria-hidden
            className="absolute top-12 right-6 left-6 hidden h-px bg-white/35 lg:block"
          />
          {steps.map((s, i) => {
            const inner = (
              <>
                <div className="relative mx-auto mb-5 flex size-7 items-center justify-center rounded-full bg-white text-[10px] font-bold text-brand-orange ring-4 ring-brand-orange">
                  {i + 1}
                </div>
                <p className="text-base leading-snug font-semibold sm:text-[17px]">
                  {s.title}
                </p>
                {s.description && (
                  <p className="mt-2 text-xs text-white/65 leading-relaxed">
                    {s.description}
                  </p>
                )}
                <p className="mt-2 text-[11px] tracking-[0.25em] text-white/70 uppercase">
                  {s.step}
                </p>
              </>
            )
            return (
              <StaggerItem key={s.step} className="relative text-center">
                {s.to ? (
                  <Link
                    to={s.to}
                    className="block transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 rounded-lg"
                  >
                    {inner}
                  </Link>
                ) : (
                  inner
                )}
              </StaggerItem>
            )
          })}
        </StaggerGroup>
      </div>
    </section>
  )
}