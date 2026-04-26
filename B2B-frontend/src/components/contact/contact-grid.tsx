import { useState } from "react"
import { AnimatePresence, motion } from "motion/react"
import { HugeiconsIcon } from "@hugeicons/react"
import { Reveal, StaggerGroup, StaggerItem } from "@/components/motion/primitives"
import {
  ArrowDown01Icon,
  ArrowRight01Icon,
  CheckmarkCircle02Icon,
  Mail01Icon,
  Call02Icon,
  Megaphone01Icon,
  HeadsetIcon,
} from "@hugeicons/core-free-icons"

const personas = [
  "Buyer — homeowner",
  "Buyer — contractor",
  "Seller — materials supplier",
  "Seller — service contractor",
  "Press / media",
  "Partnerships",
  "Other",
]

const channels = [
  {
    icon: Call02Icon,
    label: "Buyer Support",
    body: "Order issues, deliveries, refunds, escrow questions.",
    email: "help@buildora.co",
    phone: "+63 2 8555 2380",
  },
  {
    icon: HeadsetIcon,
    label: "Seller Success",
    body: "Listings, payouts, performance, account issues.",
    email: "sellers@buildora.co",
    phone: "+63 2 8555 2310",
  },
  {
    icon: Mail01Icon,
    label: "Become a Seller",
    body: "Onboarding new materials sellers and contractors.",
    email: "sales@buildora.co",
    phone: "+63 2 8555 2330",
  },
  {
    icon: Megaphone01Icon,
    label: "Press & Partnerships",
    body: "Media inquiries, integration partners, brand collaborations.",
    email: "press@buildora.co",
    phone: "—",
  },
]

export function ContactGrid() {
  const [submitted, setSubmitted] = useState(false)

  return (
    <section className="bg-white py-24">
      <div className="mx-auto grid max-w-7xl gap-5 px-6 lg:grid-cols-[1.4fr_1fr]">
        <Reveal className="rounded-md border border-brand-black/10 bg-white p-7 sm:p-9">
          <span className="text-[11px] font-semibold tracking-[0.3em] text-brand-orange uppercase">
            General Inquiry
          </span>
          <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-brand-black sm:text-4xl">
            Send Us A Message
          </h2>
          <p className="mt-3 max-w-md text-sm text-brand-black/60">
            Tell us who you are and what you need. Buyer support averages
            34 minutes to first reply. Seller and partnership replies usually
            land same business day.
          </p>

          <AnimatePresence mode="wait">
          {submitted ? (
            <motion.div
              key="confirm"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0, transition: { duration: 0.35 } }}
              exit={{ opacity: 0 }}
              className="mt-8 flex items-center gap-3 rounded-md bg-brand-orange/10 p-5"
            >
              <HugeiconsIcon
                icon={CheckmarkCircle02Icon}
                className="size-6 text-brand-orange"
              />
              <p className="text-sm text-brand-black">
                Thanks — your message is in. A specialist will reply within 4
                business hours.
              </p>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { duration: 0.3 } }}
              exit={{ opacity: 0 }}
              className="mt-8 space-y-4"
              onSubmit={(e) => {
                e.preventDefault()
                setSubmitted(true)
              }}
            >
              <div className="grid gap-4 sm:grid-cols-2">
                <Input name="name" placeholder="Full name" required />
                <Input name="email" type="email" placeholder="Work email" required />
                <Input name="company" placeholder="Company" required />
                <Select name="persona" options={personas} placeholder="What best describes you?" />
              </div>
              <Textarea
                name="message"
                placeholder="Tell us about your business and what you're looking for…"
                rows={5}
                required
              />
              <button
                type="submit"
                className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-brand-orange py-4 text-sm font-semibold tracking-[0.2em] text-white uppercase transition-colors hover:bg-brand-orange-soft"
              >
                Send Message
                <HugeiconsIcon icon={ArrowRight01Icon} className="size-4" />
              </button>
            </motion.form>
          )}
          </AnimatePresence>
        </Reveal>

        <StaggerGroup className="space-y-3">
          {channels.map((c) => (
            <StaggerItem
              key={c.label}
              className="rounded-md border border-brand-black/10 bg-white p-5 transition-colors hover:border-brand-orange/40"
            >
              <div className="flex items-start gap-4">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-md bg-brand-orange/10 text-brand-orange">
                  <HugeiconsIcon icon={c.icon} className="size-5" />
                </span>
                <div className="flex-1">
                  <h3 className="text-base font-bold text-brand-black">
                    {c.label}
                  </h3>
                  <p className="mt-1 text-xs text-brand-black/60">{c.body}</p>
                  <dl className="mt-3 space-y-1 text-xs">
                    <div className="flex items-center gap-2">
                      <dt className="text-brand-black/45">Email</dt>
                      <dd>
                        <a
                          href={`mailto:${c.email}`}
                          className="font-semibold text-brand-orange hover:underline"
                        >
                          {c.email}
                        </a>
                      </dd>
                    </div>
                    <div className="flex items-center gap-2">
                      <dt className="text-brand-black/45">Phone</dt>
                      <dd className="font-semibold text-brand-black/85">
                        {c.phone}
                      </dd>
                    </div>
                  </dl>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  )
}

const inputClass =
  "w-full rounded-md border border-brand-black/10 bg-white px-4 py-3 text-sm text-brand-black placeholder:text-brand-black/45 outline-none ring-2 ring-transparent transition-shadow focus:border-brand-orange/40 focus:ring-brand-orange/20"

function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} className={inputClass} />
}

function Textarea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea {...props} className={`${inputClass} resize-none`} />
}

function Select({
  name,
  options,
  placeholder,
}: {
  name: string
  options: string[]
  placeholder: string
}) {
  return (
    <div className="relative">
      <select name={name} defaultValue="" className={`${inputClass} appearance-none pr-10`}>
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
      <HugeiconsIcon
        icon={ArrowDown01Icon}
        className="pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2 text-brand-black/55"
      />
    </div>
  )
}
