import { useState } from "react"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  ArrowDown01Icon,
  ArrowRight01Icon,
  CheckmarkCircle02Icon,
  Location01Icon,
  Mail01Icon,
  Call02Icon,
  Clock01Icon,
} from "@hugeicons/core-free-icons"

const guarantees = [
  "Dedicated success manager",
  "Implementation in <60 days",
  "Transparent SaaS pricing",
  "Migration of catalog included",
]

const services = [
  "Materials e-commerce",
  "Service quoting & RFQs",
  "Project workspace",
  "Combined materials + services",
  "Custom enterprise plan",
]

export function QuoteForm() {
  const [submitted, setSubmitted] = useState(false)

  return (
    <section
      id="quote"
      className="relative isolate overflow-hidden bg-brand-ink py-16 sm:py-20 lg:py-24 text-white"
    >
      <div
        aria-hidden
        className="absolute inset-0 bg-cover bg-center opacity-15"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1429497419816-9ca5cfb4571a?w=1920&q=80&auto=format&fit=crop')",
        }}
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-b from-brand-ink/95 via-brand-ink/85 to-brand-ink"
      />

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="text-center">
          <h2 className="mx-auto max-w-3xl text-4xl leading-tight font-extrabold tracking-tight sm:text-[44px]">
            The Operating System For
            <br />
            <span className="text-brand-orange">Construction Commerce</span>
          </h2>

          <ul className="mt-6 flex flex-wrap items-center justify-center gap-x-7 gap-y-3 text-sm text-white/85">
            {guarantees.map((g) => (
              <li key={g} className="flex items-center gap-2">
                <HugeiconsIcon
                  icon={CheckmarkCircle02Icon}
                  className="size-4 text-brand-orange"
                />
                {g}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-12 grid gap-5 lg:grid-cols-[1.4fr_1fr]">
          <div className="rounded-md bg-brand-orange p-7 sm:p-9">
            <h3 className="text-xl font-bold tracking-tight">Request A Demo</h3>
            <p className="mt-2 max-w-md text-sm text-white/85">
              Tell us about your business. We&rsquo;ll come back within one
              business day with a tailored walkthrough and pricing.
            </p>

            {submitted ? (
              <div className="mt-7 flex items-center gap-3 rounded-md bg-white/15 p-5">
                <HugeiconsIcon
                  icon={CheckmarkCircle02Icon}
                  className="size-6 text-white"
                />
                <p className="text-sm">
                  Thanks — we&rsquo;ll be in touch shortly.
                </p>
              </div>
            ) : (
              <form
                className="mt-7 space-y-4"
                onSubmit={(e) => {
                  e.preventDefault()
                  setSubmitted(true)
                }}
              >
                <div className="grid gap-4 sm:grid-cols-2">
                  <Input name="name" placeholder="Full name" required />
                  <Input name="email" type="email" placeholder="Work email" required />
                  <Input name="phone" placeholder="Phone (optional)" />
                  <Select name="service" options={services} />
                </div>
                <Textarea
                  name="details"
                  placeholder="Tell us about your business — branches, monthly orders, current stack..."
                  rows={4}
                />
                <button
                  type="submit"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-brand-black py-4 text-sm font-semibold tracking-[0.2em] text-white uppercase transition-colors hover:bg-brand-ink"
                >
                  Submit Request
                  <HugeiconsIcon icon={ArrowRight01Icon} className="size-4" />
                </button>
              </form>
            )}
          </div>

          <aside className="rounded-md bg-brand-orange p-7 sm:p-9">
            <h3 className="text-xl font-bold tracking-tight">Contact Sales</h3>

            <ContactRow
              icon={Location01Icon}
              label="Headquarters"
              lines={["18 Office Park · 21st Floor", "Manila · Jakarta · Dubai"]}
            />
            <ContactRow
              icon={Mail01Icon}
              label="Email"
              lines={["sales@leviteconstruction.com", "support@leviteconstruction.com"]}
            />
            <ContactRow
              icon={Call02Icon}
              label="Phone"
              lines={["+1 (415) 555-2310", "Mon–Fri · 9am–6pm GMT+8"]}
            />
            <ContactRow
              icon={Clock01Icon}
              label="Implementation"
              lines={["Average 6–9 weeks", "Migration team included"]}
            />

            <a
              href="mailto:sales@leviteconstruction.com"
              className="mt-7 inline-flex w-full items-center justify-center gap-2 rounded-md bg-brand-black py-4 text-sm font-semibold tracking-[0.2em] text-white uppercase transition-colors hover:bg-brand-ink"
            >
              Talk to Sales
            </a>
          </aside>
        </div>
      </div>
    </section>
  )
}

type IconType = Parameters<typeof HugeiconsIcon>[0]["icon"]

function ContactRow({
  icon,
  label,
  lines,
}: {
  icon: IconType
  label: string
  lines: string[]
}) {
  return (
    <div className="mt-5 flex items-start gap-3 border-t border-white/15 pt-5 first-of-type:mt-7 first-of-type:border-t-0 first-of-type:pt-0">
      <span className="flex size-9 shrink-0 items-center justify-center rounded-md bg-white/15 text-white">
        <HugeiconsIcon icon={icon} className="size-4" />
      </span>
      <div>
        <p className="text-[10px] font-semibold tracking-[0.25em] text-white/70 uppercase">
          {label}
        </p>
        {lines.map((l) => (
          <p key={l} className="text-sm leading-relaxed text-white/95">
            {l}
          </p>
        ))}
      </div>
    </div>
  )
}

const inputClass =
  "w-full rounded-md bg-white px-4 py-3 text-sm text-brand-black placeholder:text-brand-black/50 outline-none ring-2 ring-transparent transition-shadow focus:ring-brand-black"

function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} className={inputClass} />
}

function Textarea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea {...props} className={`${inputClass} resize-none`} />
}

function Select({ name, options }: { name: string; options: string[] }) {
  return (
    <div className="relative">
      <select
        name={name}
        defaultValue=""
        className={`${inputClass} appearance-none pr-10`}
      >
        <option value="" disabled>
          Select your interest
        </option>
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
      <HugeiconsIcon
        icon={ArrowDown01Icon}
        className="pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2 text-brand-black/70"
      />
    </div>
  )
}
