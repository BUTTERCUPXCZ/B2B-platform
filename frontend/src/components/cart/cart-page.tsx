import { Link } from "@tanstack/react-router"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  ShoppingCart01Icon,
  Delete02Icon,
  PlusSignIcon,
  MinusSignIcon,
} from "@hugeicons/core-free-icons"

import { Header } from "@/components/landing/header"
import { Footer } from "@/components/landing/footer"
import { Breadcrumbs } from "@/components/shared/breadcrumbs"
import { peso } from "@/components/shared/price-tag"
import { EmptyState } from "@/components/ui/empty-state"
import { useCart } from "./cart-context"
import { CartSummary } from "./cart-summary"

export function CartPage() {
  const cart = useCart()

  return (
    <div className="bg-gray-100">
      <Header />
      <main className="mx-auto max-w-[1280px] px-4 pt-32 pb-20 sm:px-6 lg:px-8">
        <Breadcrumbs
          className="mb-6"
          items={[{ label: "Shop", to: "/shop" }, { label: "Cart" }]}
        />
        <h1 className="mb-8 text-4xl font-bold tracking-tight text-brand-black">
          Your cart
        </h1>

        {cart.lines.length === 0 ? (
          <EmptyState
            icon={ShoppingCart01Icon}
            title="Your cart is empty"
            description="Browse the materials marketplace and add items to get started."
            action={
              <Link
                to="/shop"
                className="inline-flex h-11 items-center justify-center rounded-lg bg-brand-orange px-6 text-xs font-semibold tracking-widest text-white uppercase transition-colors hover:bg-brand-orange-soft active:scale-[0.97]"
              >
                Browse materials
              </Link>
            }
          />
        ) : (
          <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
            <ul className="flex flex-col divide-y divide-border rounded-lg border border-border bg-white" role="list" aria-label="Cart items">
              {cart.lines.map((line) => (
                <li key={line.product.id} className="flex gap-4 p-5 sm:gap-6 sm:p-6">
                  <Link
                    to="/shop/$productId"
                    params={{ productId: line.product.id }}
                    className="aspect-square size-24 shrink-0 overflow-hidden rounded-lg bg-muted sm:size-28"
                  >
                    <img
                      src={line.product.image}
                      alt={line.product.name}
                      className="size-full object-cover"
                      loading="lazy"
                    />
                  </Link>
                  <div className="flex flex-1 flex-col gap-2">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-xs text-muted-foreground">
                          {line.product.supplier}
                        </p>
                        <Link
                          to="/shop/$productId"
                          params={{ productId: line.product.id }}
                          className="text-sm font-semibold text-brand-black transition-colors hover:text-brand-orange sm:text-base"
                        >
                          {line.product.name}
                        </Link>
                        <p className="text-xs text-muted-foreground">
                          {line.product.unit}
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => cart.remove(line.product.id)}
                        className="inline-flex size-8 shrink-0 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-red-50 hover:text-red-600 focus-visible:ring-2 focus-visible:ring-red-300"
                        aria-label={`Remove ${line.product.name} from cart`}
                      >
                        <HugeiconsIcon icon={Delete02Icon} className="size-4" />
                      </button>
                    </div>
                    <div className="mt-auto flex items-center justify-between gap-3">
                      <div className="inline-flex items-center gap-2 rounded-full border border-border px-2 py-1" role="group" aria-label={`Quantity for ${line.product.name}`}>
                        <button
                          type="button"
                          onClick={() => cart.setQty(line.product.id, line.qty - 1)}
                          className="inline-flex size-7 items-center justify-center rounded-full text-brand-black/70 transition-colors hover:bg-muted focus-visible:ring-2 focus-visible:ring-brand-orange"
                          aria-label={`Decrease quantity of ${line.product.name}`}
                        >
                          <HugeiconsIcon icon={MinusSignIcon} className="size-3.5" />
                        </button>
                        <span className="min-w-6 text-center text-sm font-semibold" aria-label={`Quantity: ${line.qty}`}>
                          {line.qty}
                        </span>
                        <button
                          type="button"
                          onClick={() => cart.setQty(line.product.id, line.qty + 1)}
                          className="inline-flex size-7 items-center justify-center rounded-full text-brand-black/70 transition-colors hover:bg-muted focus-visible:ring-2 focus-visible:ring-brand-orange"
                          aria-label={`Increase quantity of ${line.product.name}`}
                        >
                          <HugeiconsIcon icon={PlusSignIcon} className="size-3.5" />
                        </button>
                      </div>
                      <span className="text-base font-bold text-brand-black">
                        {peso(line.lineTotal)}
                      </span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <CartSummary />
          </div>
        )}
      </main>
      <Footer />
    </div>
  )
}