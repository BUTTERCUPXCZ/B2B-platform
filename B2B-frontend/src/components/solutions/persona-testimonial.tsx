import { HugeiconsIcon } from "@hugeicons/react"
import { QuoteUpIcon, ArrowRight01Icon } from "@hugeicons/core-free-icons"

export function PersonaTestimonial() {
  return (
    <section className="relative isolate overflow-hidden bg-brand-ink py-24 text-white">
      <div
        aria-hidden
        className="absolute inset-0 bg-cover bg-center opacity-15"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1920&q=80&auto=format&fit=crop')",
        }}
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-b from-brand-ink/95 via-brand-ink/85 to-brand-ink"
      />

      <div className="relative mx-auto grid max-w-6xl gap-12 px-6 lg:grid-cols-[1.4fr_1fr] lg:items-center">
        <div>
          <span className="rounded-full bg-brand-orange/15 px-3 py-1 text-[10px] font-semibold tracking-[0.3em] text-brand-orange uppercase">
            Persona · Combined Materials + Services
          </span>
          <HugeiconsIcon
            icon={QuoteUpIcon}
            className="mt-6 size-10 text-brand-orange/70"
          />
          <p className="mt-4 text-2xl leading-snug font-medium text-white/90 sm:text-[28px]">
            &ldquo;We sold materials at the front and ran renovation crews at
            the back, on completely different software. Buildora put both on
            one customer record. We now upsell projects from the storefront
            and invoice both lines on one statement.&rdquo;
          </p>

          <div className="mt-7 flex items-center gap-4">
            <span
              className="size-12 rounded-full bg-cover bg-center"
              style={{
                backgroundImage:
                  "url('https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80&auto=format&fit=crop')",
              }}
            />
            <div>
              <p className="text-sm font-semibold">Marisol Tan</p>
              <p className="text-xs text-white/55">
                Managing Director, Orange County Build &amp; Supply
              </p>
            </div>
          </div>

          <a
            href="#"
            className="mt-9 inline-flex items-center gap-2 rounded-full bg-brand-orange px-5 py-2.5 text-xs font-semibold tracking-[0.2em] text-white uppercase transition-colors hover:bg-brand-orange-soft"
          >
            Read the case study
            <HugeiconsIcon icon={ArrowRight01Icon} className="size-3.5" />
          </a>
        </div>

        <dl className="grid grid-cols-2 gap-4">
          {[
            { label: "Orders / mo", value: "4,200" },
            { label: "Quote turnaround", value: "−47%" },
            { label: "AR collection days", value: "−18" },
            { label: "Tools replaced", value: "5" },
          ].map((m) => (
            <div
              key={m.label}
              className="rounded-md border border-white/10 bg-white/[0.04] p-5"
            >
              <dt className="text-[10px] font-semibold tracking-[0.25em] text-white/55 uppercase">
                {m.label}
              </dt>
              <dd className="mt-2 text-3xl font-extrabold tracking-tight text-brand-orange">
                {m.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
