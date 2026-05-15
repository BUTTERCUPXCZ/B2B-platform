import { useState, type FormEvent } from "react"
import { Link } from "@tanstack/react-router"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  CreditCardIcon,
  Wallet01Icon,
  PackageIcon,
  CheckmarkCircle02Icon,
  TruckDeliveryIcon,
  Mail01Icon,
} from "@hugeicons/core-free-icons"

import { Header } from "@/components/landing/header"
import { Footer } from "@/components/landing/footer"
import { Breadcrumbs } from "@/components/shared/breadcrumbs"
import { peso } from "@/components/shared/price-tag"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { useCart } from "@/components/cart/cart-context"

type PayMethod = "gcash" | "card" | "cod"

const methods: Array<{ id: PayMethod; label: string; hint: string; icon: typeof CreditCardIcon }> = [
  { id: "gcash", label: "GCash", hint: "Mobile wallet — instant", icon: Wallet01Icon },
  { id: "card", label: "Credit / Debit", hint: "Visa, Mastercard, JCB", icon: CreditCardIcon },
  { id: "cod", label: "Cash on Delivery", hint: "Pay when materials arrive", icon: PackageIcon },
]

export function CheckoutPage() {
  const cart = useCart()
  const [pay, setPay] = useState<PayMethod>("gcash")
  const [submitting, setSubmitting] = useState(false)
  const [orderId, setOrderId] = useState<string | null>(null)

  if (orderId) {
    return (
      <div className="bg-gray-100">
        <Header />
        <main className="mx-auto max-w-3xl px-4 pt-32 pb-20 text-center sm:px-6">
          <span className="mx-auto inline-flex size-20 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
            <HugeiconsIcon icon={CheckmarkCircle02Icon} className="size-10" />
          </span>
          <h1 className="mt-6 text-4xl font-bold tracking-tight text-brand-black">Order placed!</h1>
          <p className="mt-3 text-muted-foreground">
            {pay === "cod"
              ? "Pay the driver when your materials arrive."
              : "Complete your payment via your selected method. We'll notify you once confirmed."}
          </p>
          <p className="mt-8 inline-block rounded-none bg-muted px-5 py-2 text-xs font-semibold tracking-widest text-brand-black uppercase">
            Order ref · {orderId}
          </p>
          <div className="mt-12 grid gap-4 text-left sm:grid-cols-2">
            <div className="rounded-none border border-border bg-white p-5">
              <span className="flex size-10 items-center justify-center rounded-none bg-brand-orange/10 text-brand-orange">
                <HugeiconsIcon icon={Mail01Icon} className="size-5" />
              </span>
              <h3 className="mt-3 text-sm font-semibold text-brand-black">Confirmation email</h3>
              <p className="mt-1 text-sm text-muted-foreground">A receipt was sent to your inbox.</p>
            </div>
            <div className="rounded-none border border-border bg-white p-5">
              <span className="flex size-10 items-center justify-center rounded-none bg-brand-orange/10 text-brand-orange">
                <HugeiconsIcon icon={TruckDeliveryIcon} className="size-5" />
              </span>
              <h3 className="mt-3 text-sm font-semibold text-brand-black">Dispatch within 48h</h3>
              <p className="mt-1 text-sm text-muted-foreground">Supplier prepares and ships your items.</p>
            </div>
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

  if (cart.lines.length === 0) {
    return (
      <div className="bg-gray-100">
        <Header />
        <main className="mx-auto max-w-3xl px-4 pt-32 pb-20 text-center sm:px-6">
          <h1 className="mb-4 text-3xl font-bold tracking-tight text-brand-black">
            Nothing to checkout
          </h1>
          <p className="mb-8 text-muted-foreground">
            Add materials to your cart before placing an order.
          </p>
          <Link
            to="/shop"
            className="inline-flex h-11 items-center justify-center rounded-none bg-brand-orange px-6 text-xs font-semibold tracking-widest text-white uppercase transition-colors hover:bg-brand-orange-soft"
          >
            Browse materials
          </Link>
        </main>
        <Footer />
      </div>
    )
  }

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    setTimeout(() => {
      const id = `KSK-${Date.now().toString().slice(-8)}`
      cart.clear()
      setOrderId(id)
    }, 600)
  }

  return (
    <div className="bg-background">
      <Header />
      <main className="mx-auto max-w-[1280px] px-4 pt-32 pb-20 sm:px-6 lg:px-8">
        <Breadcrumbs
          className="mb-6"
          items={[
            { label: "Shop", to: "/shop" },
            { label: "Cart", to: "/cart" },
            { label: "Checkout" },
          ]}
        />
        <h1 className="mb-8 text-4xl font-bold tracking-tight text-brand-black">
          Checkout
        </h1>

        <form onSubmit={onSubmit} className="grid gap-8 lg:grid-cols-[1fr_400px]">
          <div className="space-y-8">
            <Section title="Shipping address">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Field label="Full name" required>
                  <Input required defaultValue="Juan Dela Cruz" />
                </Field>
                <Field label="Phone" required>
                  <Input required type="tel" defaultValue="+63 917 555 0123" />
                </Field>
                <Field label="Email" required>
                  <Input required type="email" defaultValue="juan@example.ph" />
                </Field>
                <Field label="Region" required>
                  <select
                    required
                    defaultValue="ncr"
                    className="h-11 w-full border border-border bg-white px-3 text-sm"
                  >
                    <option value="ncr">NCR / Metro Manila</option>
                    <option value="calabarzon">Calabarzon</option>
                    <option value="cebu">Central Visayas</option>
                    <option value="davao">Davao Region</option>
                  </select>
                </Field>
                <Field label="City / Municipality" required className="sm:col-span-2">
                  <Input required defaultValue="Quezon City" />
                </Field>
                <Field label="Address" required className="sm:col-span-2">
                  <Textarea required defaultValue="123 Sampaguita St., Brgy. San Roque" />
                </Field>
              </div>
            </Section>

            <Section title="Payment method">
              <div className="grid gap-3 sm:grid-cols-3">
                {methods.map((m) => {
                  const active = pay === m.id
                  return (
                    <button
                      key={m.id}
                      type="button"
                      onClick={() => setPay(m.id)}
                      className={`flex flex-col items-start gap-2 rounded-none border p-4 text-left transition-colors ${
                        active
                          ? "border-brand-orange bg-brand-orange/5"
                          : "border-border bg-white hover:border-brand-black/30"
                      }`}
                    >
                      <span
                        className={`flex size-10 items-center justify-center rounded-full ${
                          active ? "bg-brand-orange text-white" : "bg-muted text-brand-black/70"
                        }`}
                      >
                        <HugeiconsIcon icon={m.icon} className="size-5" />
                      </span>
                      <span className="text-sm font-semibold text-brand-black">{m.label}</span>
                      <span className="text-xs text-muted-foreground">{m.hint}</span>
                    </button>
                  )
                })}
              </div>
            </Section>

            <Section title="Order review">
              <ul className="divide-y divide-border">
                {cart.lines.map((line) => (
                  <li key={line.product.id} className="flex items-center gap-4 py-3">
                    <div className="size-12 shrink-0 overflow-hidden rounded-lg bg-muted">
                      <img src={line.product.image} alt="" className="size-full object-cover" />
                    </div>
                    <div className="flex-1">
                      <p className="line-clamp-1 text-sm font-medium text-brand-black">
                        {line.product.name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Qty {line.qty} · {line.product.unit}
                      </p>
                    </div>
                    <span className="text-sm font-semibold text-brand-black">
                      {peso(line.lineTotal)}
                    </span>
                  </li>
                ))}
              </ul>
            </Section>
          </div>

          <aside className="space-y-4 lg:sticky lg:top-28 lg:self-start">
            <div className="rounded-none border border-border bg-white p-6">
              <h2 className="text-lg font-bold tracking-tight text-brand-black">
                Order summary
              </h2>
              <dl className="mt-4 space-y-2 text-sm">
                <Row label="Subtotal" value={peso(cart.subtotal)} />
                <Row label="Platform commission (8%)" value={peso(cart.commission)} />
                <Row label="Shipping" value="Free over ₱5,000" muted />
              </dl>
              <Separator className="my-4" />
              <div className="flex items-baseline justify-between">
                <span className="text-sm font-semibold text-brand-black">Total</span>
                <span className="text-2xl font-bold tracking-tight text-brand-black">
                  {peso(cart.total)}
                </span>
              </div>
              <Button
                type="submit"
                size="lg"
                disabled={submitting}
                className="mt-5 w-full rounded-full"
              >
                {submitting ? "Placing order…" : `Place order · ${peso(cart.total)}`}
              </Button>
              <p className="mt-3 text-[11px] tracking-widest text-muted-foreground uppercase">
                {pay === "cod" ? "Pay driver on delivery" : "You will be contacted to complete payment"}
              </p>
            </div>
          </aside>
        </form>
      </main>
      <Footer />
    </div>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="rounded-none border border-border bg-white p-6 sm:p-8">
      <h2 className="mb-5 text-lg font-bold tracking-tight text-brand-black">{title}</h2>
      {children}
    </section>
  )
}

function Field({
  label,
  required,
  children,
  className,
}: {
  label: string
  required?: boolean
  children: React.ReactNode
  className?: string
}) {
  return (
    <label className={`flex flex-col gap-1.5 ${className ?? ""}`}>
      <span className="text-xs font-semibold tracking-wide text-brand-black/70 uppercase">
        {label}
        {required && <span className="ml-1 text-brand-orange">*</span>}
      </span>
      {children}
    </label>
  )
}

function Row({ label, value, muted }: { label: string; value: string; muted?: boolean }) {
  return (
    <div className="flex items-center justify-between">
      <dt className="text-brand-black/70">{label}</dt>
      <dd className={muted ? "text-muted-foreground" : "font-medium text-brand-black"}>
        {value}
      </dd>
    </div>
  )
}
