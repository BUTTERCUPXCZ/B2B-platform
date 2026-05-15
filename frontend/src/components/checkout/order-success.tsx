import { Link } from "@tanstack/react-router"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  CheckmarkCircle02Icon,
  TruckDeliveryIcon,
  Mail01Icon,
  Shield02Icon,
} from "@hugeicons/core-free-icons"

import { Header } from "@/components/landing/header"
import { Footer } from "@/components/landing/footer"

export function OrderSuccess({ orderId }: { orderId: string }) {
  return (
    <div className="bg-gray-100">
      <Header />
      <main className="mx-auto max-w-3xl px-4 pt-32 pb-20 text-center sm:px-6">
        <span className="mx-auto inline-flex size-20 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
          <HugeiconsIcon icon={CheckmarkCircle02Icon} className="size-10" />
        </span>
        <h1 className="mt-6 text-4xl font-bold tracking-tight text-brand-black">
          Order placed
        </h1>
        <p className="mt-3 text-muted-foreground">
          Your payment is held in escrow. Suppliers have been notified.
        </p>
        <p className="mt-8 inline-block rounded-none bg-muted px-5 py-2 text-xs font-semibold tracking-widest text-brand-black uppercase">
          Order ref · {orderId}
        </p>

        <div className="mt-12 grid gap-4 text-left sm:grid-cols-3">
          <Step icon={Mail01Icon} title="Confirmation email" body="A receipt was sent to your inbox." />
          <Step icon={TruckDeliveryIcon} title="Dispatch within 48h" body="Suppliers prepare and ship your items." />
          <Step icon={Shield02Icon} title="Funds released on receipt" body="Escrow releases payment after delivery confirmation." />
        </div>

        <div className="mt-12 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            to="/dashboard/client"
            className="inline-flex h-11 items-center justify-center rounded-none bg-brand-orange px-6 text-xs font-semibold tracking-widest text-white uppercase transition-colors hover:bg-brand-orange-soft"
          >
            View my orders
          </Link>
          <Link
            to="/shop"
            className="inline-flex h-11 items-center justify-center rounded-full border border-border bg-transparent px-6 text-xs font-semibold tracking-widest text-brand-black uppercase hover:bg-muted"
          >
            Continue shopping
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
