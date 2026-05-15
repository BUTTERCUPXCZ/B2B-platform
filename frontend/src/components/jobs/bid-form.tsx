import { useState, type FormEvent } from "react"
import { Link, useNavigate } from "@tanstack/react-router"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  PlusSignIcon,
  Delete02Icon,
  ArrowLeft01Icon,
  CheckmarkCircle02Icon,
} from "@hugeicons/core-free-icons"

import { Header } from "@/components/landing/header"
import { Footer } from "@/components/landing/footer"
import { Breadcrumbs } from "@/components/shared/breadcrumbs"
import { peso } from "@/components/shared/price-tag"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { type Job } from "./jobs-data"

type LineItem = { id: string; label: string; amount: number }
type Milestone = { id: string; title: string; pct: number }

const uid = () => Math.random().toString(36).slice(2, 9)

export function BidForm({ job }: { job: Job }) {
  const navigate = useNavigate()
  const [lines, setLines] = useState<LineItem[]>([
    { id: uid(), label: "Materials", amount: 120000 },
    { id: uid(), label: "Labor", amount: 80000 },
  ])
  const [milestones, setMilestones] = useState<Milestone[]>([
    { id: uid(), title: "Demolition + prep", pct: 30 },
    { id: uid(), title: "Install + finish", pct: 50 },
    { id: uid(), title: "Cleanup + walkthrough", pct: 20 },
  ])
  const [submitted, setSubmitted] = useState(false)

  const total = lines.reduce((s, l) => s + (l.amount || 0), 0)
  const milestoneSum = milestones.reduce((s, m) => s + m.pct, 0)

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="bg-background">
        <Header />
        <main className="mx-auto max-w-3xl px-4 pt-32 pb-20 text-center sm:px-6">
          <span className="mx-auto inline-flex size-20 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
            <HugeiconsIcon icon={CheckmarkCircle02Icon} className="size-10" />
          </span>
          <h1 className="mt-6 text-3xl font-bold tracking-tight text-brand-black">
            Bid submitted
          </h1>
          <p className="mt-3 text-muted-foreground">
            The client has been notified. You'll get a message if they want to chat or
            award the project to you.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              to="/jobs/$jobId"
              params={{ jobId: job.id }}
              className="inline-flex h-11 items-center justify-center rounded-none bg-brand-orange px-6 text-xs font-semibold tracking-widest text-white uppercase transition-colors hover:bg-brand-orange-soft"
            >
              Back to project
            </Link>
            <button
              type="button"
              onClick={() => navigate({ to: "/dashboard/contractor" })}
              className="inline-flex h-11 items-center justify-center rounded-none border border-border bg-white px-6 text-xs font-semibold tracking-widest text-brand-black uppercase hover:bg-muted"
            >
              View my bids
            </button>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="bg-background">
      <Header />
      <main className="mx-auto max-w-5xl px-4 pt-32 pb-20 sm:px-6 lg:px-8">
        <Breadcrumbs
          className="mb-6"
          items={[
            { label: "Jobs", to: "/jobs" },
            { label: job.title, to: `/jobs/${job.id}` },
            { label: "Submit bid" },
          ]}
        />

        <div className="mb-8 flex items-start gap-4">
          <Link
            to="/jobs/$jobId"
            params={{ jobId: job.id }}
            className="inline-flex size-10 shrink-0 items-center justify-center rounded-none border border-border bg-white text-brand-black hover:bg-muted"
            aria-label="Back to project"
          >
            <HugeiconsIcon icon={ArrowLeft01Icon} className="size-4" />
          </Link>
          <div>
            <p className="text-xs tracking-widest text-brand-orange uppercase">
              Submit a bid
            </p>
            <h1 className="text-3xl font-bold tracking-tight text-brand-black">
              {job.title}
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              {job.location} · Budget {job.budget}
            </p>
          </div>
        </div>

        <form onSubmit={onSubmit} className="space-y-6">
          <Section title="Itemized breakdown" subtitle="Show your math — clients prefer transparent quotes.">
            <ul className="flex flex-col gap-3">
              {lines.map((line, i) => (
                <li key={line.id} className="flex flex-col gap-2 sm:flex-row sm:items-center">
                  <Input
                    aria-label={`Line ${i + 1} label`}
                    placeholder="e.g. Materials, Labor, Permits"
                    value={line.label}
                    onChange={(e) =>
                      setLines((prev) =>
                        prev.map((l) => (l.id === line.id ? { ...l, label: e.target.value } : l))
                      )
                    }
                  />
                  <Input
                    aria-label={`Line ${i + 1} amount`}
                    type="number"
                    inputMode="numeric"
                    min={0}
                    placeholder="0"
                    value={line.amount}
                    onChange={(e) =>
                      setLines((prev) =>
                        prev.map((l) =>
                          l.id === line.id ? { ...l, amount: Number(e.target.value) || 0 } : l
                        )
                      )
                    }
                    className="sm:w-44"
                  />
                  <button
                    type="button"
                    onClick={() => setLines((prev) => prev.filter((l) => l.id !== line.id))}
                    className="inline-flex size-10 shrink-0 items-center justify-center rounded-full text-muted-foreground hover:bg-red-50 hover:text-red-600"
                    aria-label="Remove line"
                  >
                    <HugeiconsIcon icon={Delete02Icon} className="size-4" />
                  </button>
                </li>
              ))}
            </ul>
            <button
              type="button"
              onClick={() =>
                setLines((prev) => [...prev, { id: uid(), label: "", amount: 0 }])
              }
              className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold tracking-wide text-brand-orange uppercase"
            >
              <HugeiconsIcon icon={PlusSignIcon} className="size-3" />
              Add line item
            </button>
            <div className="mt-5 flex items-baseline justify-between border-t border-border pt-4">
              <span className="text-sm font-semibold text-brand-black">Total bid amount</span>
              <span className="text-2xl font-bold tracking-tight text-brand-black">
                {peso(total)}
              </span>
            </div>
          </Section>

          <Section title="Timeline + milestones" subtitle="Break the work into payable milestones.">
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Total duration (days)">
                <Input type="number" min={1} defaultValue={14} />
              </Field>
              <Field label="Earliest start">
                <Input type="date" defaultValue={new Date().toISOString().slice(0, 10)} />
              </Field>
            </div>

            <ul className="mt-4 flex flex-col gap-3">
              {milestones.map((m, i) => (
                <li key={m.id} className="flex flex-col gap-2 sm:flex-row sm:items-center">
                  <span className="inline-flex size-8 shrink-0 items-center justify-center rounded-none bg-brand-orange/10 text-xs font-bold text-brand-orange">
                    {i + 1}
                  </span>
                  <Input
                    placeholder="Milestone title"
                    value={m.title}
                    onChange={(e) =>
                      setMilestones((prev) =>
                        prev.map((x) => (x.id === m.id ? { ...x, title: e.target.value } : x))
                      )
                    }
                  />
                  <Input
                    type="number"
                    min={1}
                    max={100}
                    value={m.pct}
                    onChange={(e) =>
                      setMilestones((prev) =>
                        prev.map((x) =>
                          x.id === m.id ? { ...x, pct: Number(e.target.value) || 0 } : x
                        )
                      )
                    }
                    className="sm:w-24"
                  />
                  <span className="text-xs text-muted-foreground sm:w-8">%</span>
                  <button
                    type="button"
                    onClick={() => setMilestones((prev) => prev.filter((x) => x.id !== m.id))}
                    className="inline-flex size-10 shrink-0 items-center justify-center rounded-full text-muted-foreground hover:bg-red-50 hover:text-red-600"
                    aria-label="Remove milestone"
                  >
                    <HugeiconsIcon icon={Delete02Icon} className="size-4" />
                  </button>
                </li>
              ))}
            </ul>
            <div className="mt-3 flex items-center justify-between">
              <button
                type="button"
                onClick={() =>
                  setMilestones((prev) => [...prev, { id: uid(), title: "", pct: 10 }])
                }
                className="inline-flex items-center gap-1.5 text-xs font-semibold tracking-wide text-brand-orange uppercase"
              >
                <HugeiconsIcon icon={PlusSignIcon} className="size-3" />
                Add milestone
              </button>
              <span
                className={
                  milestoneSum === 100
                    ? "text-xs font-semibold text-emerald-600"
                    : "text-xs font-semibold text-amber-600"
                }
              >
                Sum: {milestoneSum}% {milestoneSum !== 100 && "(must total 100%)"}
              </span>
            </div>
          </Section>

          <Section title="Cover message" subtitle="Why are you the right fit?">
            <Textarea
              required
              minLength={40}
              placeholder="Tell the client about your team, similar projects, and why your bid is competitive."
              defaultValue=""
              className="min-h-32"
            />
          </Section>

          <div className="flex flex-col-reverse items-center justify-between gap-3 sm:flex-row">
            <Link
              to="/jobs/$jobId"
              params={{ jobId: job.id }}
              className="inline-flex h-11 items-center justify-center rounded-none border border-border bg-white px-6 text-xs font-semibold tracking-widest text-brand-black uppercase hover:bg-muted"
            >
              Cancel
            </Link>
            <Button
              type="submit"
              size="lg"
              className="rounded-full"
              disabled={milestoneSum !== 100 || total === 0}
            >
              Submit bid · {peso(total)}
            </Button>
          </div>
        </form>
      </main>
      <Footer />
    </div>
  )
}

function Section({
  title,
  subtitle,
  children,
}: {
  title: string
  subtitle?: string
  children: React.ReactNode
}) {
  return (
    <section className="rounded-none border border-border bg-white p-6 sm:p-8">
      <header className="mb-5">
        <h2 className="text-lg font-bold tracking-tight text-brand-black">{title}</h2>
        {subtitle && <p className="text-sm text-muted-foreground">{subtitle}</p>}
      </header>
      {children}
    </section>
  )
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-xs font-semibold tracking-wide text-brand-black/70 uppercase">
        {label}
      </span>
      {children}
    </label>
  )
}
