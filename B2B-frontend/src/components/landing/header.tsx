import { Link } from "@tanstack/react-router"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  Search01Icon,
  ArrowRight01Icon,
  ConstructionIcon,
} from "@hugeicons/core-free-icons"

const navItems: Array<{ label: string; to: string }> = [
  { label: "Home", to: "/" },
  { label: "Platform", to: "/platform" },
  { label: "Solutions", to: "/solutions" },
  { label: "Pricing", to: "/pricing" },
  { label: "Resources", to: "/resources" },
  { label: "Contact", to: "/contact" },
]

export function Header() {
  return (
    <header className="absolute inset-x-0 top-0 z-30">
      <div className="mx-auto max-w-7xl px-6 py-4">
        <div className="flex items-center justify-between gap-4 rounded-full bg-white/95 px-3 py-2 shadow-[0_24px_60px_-30px_rgba(0,0,0,0.5)] backdrop-blur">
          <Link to="/" className="flex items-center gap-2 pl-3">
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
              className="inline-flex items-center gap-2 rounded-full bg-brand-orange px-5 py-2.5 text-xs font-semibold tracking-wide text-white uppercase transition-colors hover:bg-brand-orange-soft"
            >
              Book a Demo
              <HugeiconsIcon icon={ArrowRight01Icon} className="size-3.5" />
            </a>
          </div>
        </div>
      </div>
    </header>
  )
}
