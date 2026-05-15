import { Link } from "@tanstack/react-router"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  CheckmarkCircle02Icon,
  Mail01Icon,
  Calendar03Icon,
  Pdf02Icon,
} from "@hugeicons/core-free-icons"

import { Header } from "@/components/landing/header"
import { Footer } from "@/components/landing/footer"
import { estimates } from "./estimates-data"

export function EstimateSuccess({ id }: { id: string }) {
  // Use first sample estimate for demo "view your report" link.
  const sample = estimates[0]

  return (
    <div className="bg-background">
      <Header />
      <main className="mx-auto max-w-3xl px-4 pt-32 pb-20 text-center sm:px-6">
        <span className="mx-auto inline-flex size-20 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
          <HugeiconsIcon icon={CheckmarkCircle02Icon} className="size-10" />
        </span>
        <h1 className="mt-6 text-4xl font-bold tracking-tight text-brand-black">
          Payment received
        </h1>
        <p className="mt-3 text-muted-foreground">
          A licensed estimator has been assigned to your project.
        </p>
        <p className="mt-8 inline-block rounded-none bg-muted px-5 py-2 text-xs font-semibold tracking-widest text-brand-black uppercase">
          Reference · {id}
        </p>

        <div className="mt-12 grid gap-4 text-left sm:grid-cols-3">
          <Step icon={Mail01Icon} title="Estimator outreach" body="They'll message you within 24 hours for clarifying questions." />
          <Step icon={Calendar03Icon} title="Report in 2–5 days" body="Itemized cost breakdown delivered to your dashboard." />
          <Step icon={Pdf02Icon} title="Downloadable PDF" body="Print or share with contractors when you're ready to bid." />
        </div>

        <div className="mt-12 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            to="/estimate/report/$estimateId"
            params={{ estimateId: sample.id }}
            className="inline-flex h-11 items-center justify-center rounded-none bg-brand-orange px-6 text-xs font-semibold tracking-widest text-white uppercase transition-colors hover:bg-brand-orange-soft"
          >
            View sample report
          </Link>
          <Link
            to="/dashboard/client"
            className="inline-flex h-11 items-center justify-center rounded-none border border-border bg-white px-6 text-xs font-semibold tracking-widest text-brand-black uppercase hover:bg-muted"
          >
            Go to dashboard
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  )
}

function Step({
  icon,
  title,
  body,
}: {
  icon: typeof CheckmarkCircle02Icon
  title: string
  body: string
}) {
  return (
    <div className="rounded-none border border-border bg-white p-5">
      <span className="flex size-10 items-center justify-center rounded-none bg-brand-orange/10 text-brand-orange">
        <HugeiconsIcon icon={icon} className="size-5" />
      </span>
      <h3 className="mt-3 text-sm font-semibold text-brand-black">{title}</h3>
      <p className="mt-1 text-sm text-muted-foreground">{body}</p>
    </div>
  )
}
