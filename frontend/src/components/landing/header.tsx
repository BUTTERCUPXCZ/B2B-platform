import { useCallback, useEffect, useRef, useState } from "react"
import { Link, useRouterState } from "@tanstack/react-router"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  ShoppingCart01Icon,
  ConstructionIcon,
  Menu01Icon,
  Cancel01Icon,
  Mail01Icon,
} from "@hugeicons/core-free-icons"

import { cn } from "@/lib/utils"
import { useCart } from "@/components/cart/cart-context"

const navItems: Array<{ label: string; to: string }> = [
  { label: "Home", to: "/" },
  { label: "Materials", to: "/shop" },
  { label: "Services", to: "/services" },
  { label: "Contractors", to: "/contractors" },
  { label: "Jobs", to: "/jobs" },
  { label: "Estimate", to: "/estimate" },
  { label: "Dashboard", to: "/dashboard" },
]

export function Header() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const cart = useCart()
  const { location } = useRouterState()
  const onHome = location.pathname === "/"

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden"
      requestAnimationFrame(() => menuRef.current?.focus())
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [open])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  // Close mobile menu on route change
  useEffect(() => {
    setOpen(false)
  }, [location.pathname])

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      setOpen(false)
      buttonRef.current?.focus()
    }
  }, [])

  const transparent = onHome && !scrolled

  return (
    <header
      className={cn(
        "z-30 flex items-center justify-between px-6 py-4 transition-all duration-300 md:px-12 lg:px-20 xl:px-32",
        transparent && "absolute inset-x-0 top-0 border-transparent bg-transparent text-white",
        onHome && scrolled && "fixed inset-x-0 top-0 border-b border-border bg-white/95 backdrop-blur-md shadow-sm",
        !onHome && "sticky top-0 border-b border-border bg-white"
      )}
    >
      <Link to="/" className="flex items-center gap-2" aria-label="STRUKTURA home">
        <span className="flex size-9 items-center justify-center rounded-full bg-brand-orange text-white">
          <HugeiconsIcon icon={ConstructionIcon} className="size-5" />
        </span>
        <span
          className={cn(
            "text-lg font-bold tracking-tight",
            transparent ? "text-white" : "text-brand-black"
          )}
        >
          STRUKTURA
        </span>
      </Link>

      <nav className="hidden items-center gap-8 lg:flex" aria-label="Main navigation">
        {navItems.map((item) => (
          <Link
            key={item.label}
            to={item.to}
            className={cn(
              "text-sm font-medium transition-colors hover:text-brand-orange",
              transparent ? "text-white/85" : "text-brand-black/80",
              "[&.active]:text-brand-orange [&.active]:font-semibold"
            )}
          >
            {item.label}
          </Link>
        ))}
      </nav>

      <div className="hidden items-center gap-4 lg:flex">
        <Link
          to="/messages"
          aria-label="Messages"
          className={cn(
            "transition-colors hover:text-brand-orange",
            transparent ? "text-white/80" : "text-brand-black/70"
          )}
        >
          <HugeiconsIcon icon={Mail01Icon} className="size-5" />
        </Link>

        <Link to="/cart" aria-label="Shopping cart" className="relative">
          <HugeiconsIcon icon={ShoppingCart01Icon} className={cn("size-5", transparent ? "text-white" : "text-brand-orange")} />
          {cart.count > 0 && (
            <span
              className="absolute -top-2 -right-3 inline-flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-brand-orange px-1 text-[10px] font-bold text-white animate-scale-in"
              aria-label={`${cart.count} items in cart`}
            >
              {cart.count}
            </span>
          )}
        </Link>

        <Link
          to="/auth/login"
          className="rounded-full bg-brand-orange px-8 py-2 text-sm font-semibold text-white transition-colors hover:bg-brand-orange-soft active:scale-[0.97]"
        >
          Login
        </Link>
      </div>

      <button
        ref={buttonRef}
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        aria-controls="mobile-menu"
        className="lg:hidden"
      >
        <HugeiconsIcon
          icon={open ? Cancel01Icon : Menu01Icon}
          className={cn("size-6", transparent ? "text-white" : "text-brand-black")}
        />
      </button>

      <div
        id="mobile-menu"
        ref={menuRef}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation"
        tabIndex={-1}
        onKeyDown={handleKeyDown}
        className={cn(
          "absolute left-0 top-full w-full border-b border-border bg-white px-6 py-4 text-sm shadow-lg transition-all duration-300 md:px-12 lg:hidden",
          open
            ? "flex animate-slide-down flex-col items-start gap-2 opacity-100"
            : "pointer-events-none invisible opacity-0"
        )}
      >
        {navItems.map((item) => (
          <Link
            key={item.label}
            to={item.to}
            onClick={() => setOpen(false)}
            className="block w-full rounded-md px-2 py-2 text-brand-black/80 transition-colors hover:bg-muted hover:text-brand-orange [&.active]:font-semibold [&.active]:text-brand-orange"
          >
            {item.label}
          </Link>
        ))}
        <div className="my-2 h-px w-full bg-border" />
        <Link
          to="/cart"
          onClick={() => setOpen(false)}
          className="flex w-full items-center gap-2 rounded-md px-2 py-2 text-brand-black/80 hover:bg-muted hover:text-brand-orange"
        >
          Cart
          {cart.count > 0 && (
            <span className="rounded-full bg-brand-orange px-2 py-0.5 text-[10px] font-bold text-white">
              {cart.count}
            </span>
          )}
        </Link>
        <Link
          to="/messages"
          onClick={() => setOpen(false)}
          className="block w-full rounded-md px-2 py-2 text-brand-black/80 hover:bg-muted hover:text-brand-orange"
        >
          Messages
        </Link>
        <Link
          to="/auth/login"
          onClick={() => setOpen(false)}
          className="mt-2 rounded-full bg-brand-orange px-6 py-2 text-center text-sm font-semibold text-white transition-colors hover:bg-brand-orange-soft active:scale-[0.97]"
        >
          Login
        </Link>
      </div>
    </header>
  )
}