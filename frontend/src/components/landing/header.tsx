import { useEffect, useState } from "react"
import { Link } from "@tanstack/react-router"
import { AnimatePresence, motion } from "motion/react"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  Search01Icon,
  ArrowRight01Icon,
  ConstructionIcon,
  Menu01Icon,
  Cancel01Icon,
} from "@hugeicons/core-free-icons"
import { cn } from "@/lib/utils"

const navItems: Array<{ label: string; to: string }> = [
  { label: "Home", to: "/" },
  { label: "Platform", to: "/platform" },
  { label: "Solutions", to: "/solutions" },
  { label: "Pricing", to: "/pricing" },
  { label: "Resources", to: "/resources" },
  { label: "Contact", to: "/contact" },
]

export function Header() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [open])

  return (
    <header className="absolute inset-x-0 top-0 z-30">
      <div className="mx-auto max-w-7xl px-4 py-3 sm:px-6 sm:py-4">
        <div className="flex items-center justify-between gap-3 rounded-full bg-white/95 px-3 py-2 shadow-[0_24px_60px_-30px_rgba(0,0,0,0.5)] backdrop-blur">
          <Link to="/" className="flex items-center gap-2 pl-2 sm:pl-3">
            <span className="flex size-9 items-center justify-center rounded-full bg-brand-orange text-white">
              <HugeiconsIcon icon={ConstructionIcon} className="size-5" />
            </span>
            <span className="text-lg font-bold tracking-tight text-brand-black">
              Buildora
            </span>
          </Link>

          <nav className="hidden items-center gap-7 text-sm font-medium text-brand-black/80 md:flex">
            {navItems.map((item) => (
              <Link
                key={item.label}
                to={item.to}
                className="relative transition-colors hover:text-brand-orange [&.active]:text-brand-orange"
                activeOptions={{ exact: true }}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <button
              type="button"
              aria-label="Search"
              className="hidden size-9 items-center justify-center rounded-full text-brand-black/70 transition-colors hover:bg-brand-orange/10 hover:text-brand-orange md:inline-flex"
            >
              <HugeiconsIcon icon={Search01Icon} className="size-4" />
            </button>
            <a
              href="#quote"
              className="hidden items-center gap-2 rounded-full bg-brand-orange px-5 py-2.5 text-xs font-semibold tracking-wide text-white uppercase transition-colors hover:bg-brand-orange-soft sm:inline-flex"
            >
              Book a Demo
              <HugeiconsIcon icon={ArrowRight01Icon} className="size-3.5" />
            </a>

            <button
              type="button"
              aria-label="Open menu"
              aria-expanded={open}
              onClick={() => setOpen(true)}
              className="inline-flex size-10 items-center justify-center rounded-full bg-brand-orange text-white transition-colors hover:bg-brand-orange-soft md:hidden"
            >
              <HugeiconsIcon icon={Menu01Icon} className="size-5" />
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {open && <MobileMenu onClose={() => setOpen(false)} />}
      </AnimatePresence>
    </header>
  )
}

function MobileMenu({ onClose }: { onClose: () => void }) {
  return (
    <motion.div
      key="mobile-menu"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 0.2 } }}
      exit={{ opacity: 0, transition: { duration: 0.15 } }}
      className="fixed inset-0 z-40 md:hidden"
    >
      <button
        type="button"
        aria-label="Close menu"
        onClick={onClose}
        className="absolute inset-0 bg-brand-ink/70 backdrop-blur-sm"
      />

      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: 0, transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] } }}
        exit={{ x: "100%", transition: { duration: 0.2 } }}
        className="absolute top-0 right-0 flex h-full w-[85%] max-w-sm flex-col bg-brand-ink p-6 text-white shadow-2xl"
      >
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2" onClick={onClose}>
            <span className="flex size-9 items-center justify-center rounded-full bg-brand-orange text-white">
              <HugeiconsIcon icon={ConstructionIcon} className="size-5" />
            </span>
            <span className="text-lg font-bold tracking-tight">Buildora</span>
          </Link>
          <button
            type="button"
            aria-label="Close menu"
            onClick={onClose}
            className="flex size-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
          >
            <HugeiconsIcon icon={Cancel01Icon} className="size-5" />
          </button>
        </div>

        <nav className="mt-10 flex flex-col gap-1 text-base font-semibold">
          {navItems.map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, x: 20 }}
              animate={{
                opacity: 1,
                x: 0,
                transition: { duration: 0.3, delay: 0.1 + i * 0.05 },
              }}
            >
              <Link
                to={item.to}
                onClick={onClose}
                className={cn(
                  "block rounded-md px-4 py-3 transition-colors hover:bg-white/5",
                  "[&.active]:bg-brand-orange/15 [&.active]:text-brand-orange"
                )}
                activeOptions={{ exact: true }}
              >
                {item.label}
              </Link>
            </motion.div>
          ))}
        </nav>

        <div className="mt-auto space-y-3 pt-8">
          <a
            href="#quote"
            onClick={onClose}
            className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-brand-orange px-5 py-3 text-xs font-semibold tracking-[0.18em] text-white uppercase transition-colors hover:bg-brand-orange-soft"
          >
            Book a Demo
            <HugeiconsIcon icon={ArrowRight01Icon} className="size-3.5" />
          </a>
          <p className="text-center text-[10px] tracking-[0.25em] text-white/40 uppercase">
            Construction marketplace · 12k+ buyers
          </p>
        </div>
      </motion.div>
    </motion.div>
  )
}
