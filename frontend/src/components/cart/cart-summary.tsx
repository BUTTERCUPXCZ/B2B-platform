import { Link } from "@tanstack/react-router"

import { peso } from "@/components/shared/price-tag"
import { Separator } from "@/components/ui/separator"
import { useCart } from "./cart-context"

export function CartSummary({ showCheckout = true }: { showCheckout?: boolean }) {
  const { subtotal, commission, total, count } = useCart()
  return (
    <aside aria-label="Order summary" className="sticky top-28 flex flex-col gap-4 rounded-lg border border-border bg-white p-6 shadow-sm">
      <h2 className="text-lg font-bold tracking-tight text-brand-black">Order summary</h2>
      <dl className="space-y-2 text-sm">
        <Row label={`Subtotal (${count} items)`} value={peso(subtotal)} />
        <Row
          label="Platform commission (8%)"
          hint="Funds platform escrow and dispute resolution"
          value={peso(commission)}
        />
        <Row label="Shipping" value="Calculated at checkout" muted />
      </dl>
      <Separator />
      <div className="flex items-baseline justify-between">
        <span className="text-sm font-semibold text-brand-black">Total</span>
        <span className="text-2xl font-bold tracking-tight text-brand-black">
          {peso(total)}
        </span>
      </div>
      {showCheckout && (
        <Link
          to="/checkout"
          aria-label={count === 0 ? "Cart is empty" : `Proceed to checkout — ${peso(total)}`}
          className={
            count === 0
              ? "pointer-events-none inline-flex h-12 items-center justify-center rounded-lg bg-muted text-xs font-semibold tracking-widest text-muted-foreground uppercase"
              : "inline-flex h-12 items-center justify-center rounded-lg bg-brand-orange text-xs font-semibold tracking-widest text-white uppercase transition-colors hover:bg-brand-orange-soft active:scale-[0.97]"
          }
        >
          Proceed to checkout
        </Link>
      )}
      <p className="text-center text-[10px] tracking-widest text-muted-foreground uppercase">
        Escrow protected · BSP-compliant
      </p>
    </aside>
  )
}

function Row({
  label,
  value,
  hint,
  muted,
}: {
  label: string
  value: string
  hint?: string
  muted?: boolean
}) {
  return (
    <div className="flex items-start justify-between gap-4">
      <dt className="flex flex-col">
        <span className="text-brand-black/70">{label}</span>
        {hint && <span className="text-[11px] text-muted-foreground">{hint}</span>}
      </dt>
      <dd className={muted ? "text-muted-foreground" : "font-medium text-brand-black"}>
        {value}
      </dd>
    </div>
  )
}