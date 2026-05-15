import { Link } from "@tanstack/react-router"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  ConstructionIcon,
  Facebook01Icon,
  TwitterIcon,
  InstagramIcon,
  Linkedin01Icon,
} from "@hugeicons/core-free-icons"

const linkGroups = [
  {
    title: "Platform",
    links: [
      { label: "Materials marketplace", to: "/shop" },
      { label: "Service listings", to: "/services" },
      { label: "Contractor bidding", to: "/contractors" },
      { label: "Fair cost estimates", to: "/estimate" },
      { label: "Escrow payments", to: "/shop" },
    ],
  },
  {
    title: "For",
    links: [
      { label: "Homeowners", to: "/" },
      { label: "Hardware suppliers", to: "/sell" },
      { label: "Contractors", to: "/contractors" },
      { label: "Service companies", to: "/services" },
      { label: "Developers", to: "/platform" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", to: "/" },
      { label: "Customers", to: "/" },
      { label: "Pricing", to: "/pricing" },
      { label: "Careers", to: "/" },
      { label: "Press kit", to: "/" },
    ],
  },
]

const socials = [
  { icon: Facebook01Icon, label: "Facebook", href: "#" },
  { icon: TwitterIcon, label: "Twitter", href: "#" },
  { icon: InstagramIcon, label: "Instagram", href: "#" },
  { icon: Linkedin01Icon, label: "LinkedIn", href: "#" },
]

export function Footer() {
  return (
    <footer className="bg-brand-black py-16 text-white" aria-label="Site footer">
      <div className="mx-auto grid max-w-[1440px] gap-10 px-6 lg:grid-cols-[1.5fr_2fr_1.2fr]">
        <div>
          <Link to="/" className="flex items-center gap-2" aria-label="STRUKTURA home">
            <span className="flex size-9 items-center justify-center rounded-full bg-brand-orange text-white">
              <HugeiconsIcon icon={ConstructionIcon} className="size-5" />
            </span>
            <span className="text-lg font-bold">STRUKTURA</span>
          </Link>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/70">
            Construction marketplace for the Philippines — materials, services,
            contractor bidding, and escrow-protected projects on a single
            platform.
          </p>

          <p className="mt-6 text-[10px] font-semibold tracking-[0.25em] text-white/65 uppercase">
            Follow us
          </p>
          <div className="mt-3 flex gap-2">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                aria-label={s.label}
                className="flex size-9 items-center justify-center rounded-full border border-white/15 text-white/70 transition-all hover:border-brand-orange hover:bg-brand-orange hover:text-white hover:scale-105"
              >
                <HugeiconsIcon icon={s.icon} className="size-4" />
              </a>
            ))}
          </div>
        </div>

        <nav className="grid grid-cols-2 gap-8 sm:grid-cols-3" aria-label="Footer navigation">
          {linkGroups.map((g) => (
            <div key={g.title}>
              <p className="text-[10px] font-semibold tracking-[0.25em] text-brand-orange uppercase">
                {g.title}
              </p>
              <ul className="mt-4 space-y-2.5 text-sm text-white/70">
                {g.links.map((l) => (
                  <li key={l.label}>
                    <Link
                      to={l.to}
                      className="transition-colors hover:text-white"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>

        <div>
          <p className="text-[10px] font-semibold tracking-[0.25em] text-brand-orange uppercase">
            Newsletter
          </p>
          <p className="mt-4 text-sm text-white/75">
            Field reports on construction commerce, monthly. No spam.
          </p>
          <form
            className="mt-4 flex overflow-hidden rounded-full bg-white/5 ring-1 ring-white/15 focus-within:ring-brand-orange transition-shadow"
            onSubmit={(e) => e.preventDefault()}
          >
            <label htmlFor="footer-email" className="sr-only">Email address</label>
            <input
              id="footer-email"
              type="email"
              required
              placeholder="you@company.com"
              className="flex-1 bg-transparent px-5 py-3 text-sm text-white placeholder:text-white/40 outline-none min-w-0"
            />
            <button
              type="submit"
              className="bg-brand-orange px-5 py-3 text-xs font-semibold tracking-[0.2em] text-white uppercase transition-colors hover:bg-brand-orange-soft"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      <div className="mx-auto mt-12 flex max-w-[1440px] flex-col items-center justify-between gap-3 border-t border-white/10 px-6 pt-6 text-xs text-white/45 sm:flex-row">
        <p>&copy; {new Date().getFullYear()} STRUKTURA Inc. All rights reserved.</p>
        <div className="flex gap-5">
          <a href="#" className="transition-colors hover:text-white">Terms</a>
          <a href="#" className="transition-colors hover:text-white">Privacy</a>
          <a href="#" className="transition-colors hover:text-white">Security</a>
        </div>
      </div>
    </footer>
  )
}