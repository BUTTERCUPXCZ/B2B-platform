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
      "Materials e-commerce",
      "Service quoting",
      "Project workspace",
      "B2B accounts",
      "Integrations",
    ],
  },
  {
    title: "Solutions",
    links: [
      "Materials suppliers",
      "Parts & spares",
      "Service contractors",
      "Combined businesses",
      "Hardware retail",
    ],
  },
  {
    title: "Company",
    links: ["About", "Customers", "Pricing", "Careers", "Press kit"],
  },
]

const socials = [
  { icon: Facebook01Icon, label: "Facebook" },
  { icon: TwitterIcon, label: "Twitter" },
  { icon: InstagramIcon, label: "Instagram" },
  { icon: Linkedin01Icon, label: "LinkedIn" },
]

export function Footer() {
  return (
    <footer className="bg-brand-black py-16 text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 lg:grid-cols-[1.5fr_2fr_1.2fr]">
        <div>
          <a href="#" className="flex items-center gap-2">
            <span className="flex size-9 items-center justify-center rounded-full bg-brand-orange text-white">
              <HugeiconsIcon icon={ConstructionIcon} className="size-5" />
            </span>
            <span className="text-lg font-bold">Levite</span>
          </a>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/60">
            The all-in-one platform for construction supply and service
            businesses — selling materials, quoting projects, and running
            field crews on shared infrastructure.
          </p>

          <p className="mt-6 text-[10px] font-semibold tracking-[0.25em] text-white/55 uppercase">
            Follow us
          </p>
          <div className="mt-3 flex gap-2">
            {socials.map((s) => (
              <a
                key={s.label}
                href="#"
                aria-label={s.label}
                className="flex size-9 items-center justify-center rounded-full border border-white/15 text-white/70 transition-colors hover:border-brand-orange hover:bg-brand-orange hover:text-white"
              >
                <HugeiconsIcon icon={s.icon} className="size-4" />
              </a>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
          {linkGroups.map((g) => (
            <div key={g.title}>
              <p className="text-[10px] font-semibold tracking-[0.25em] text-brand-orange uppercase">
                {g.title}
              </p>
              <ul className="mt-4 space-y-2.5 text-sm text-white/70">
                {g.links.map((l) => (
                  <li key={l}>
                    <a href="#" className="transition-colors hover:text-white">
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div>
          <p className="text-[10px] font-semibold tracking-[0.25em] text-brand-orange uppercase">
            Newsletter
          </p>
          <p className="mt-4 text-sm text-white/65">
            Field reports on construction commerce, monthly. No spam.
          </p>
          <form
            className="mt-4 flex overflow-hidden rounded-full bg-white/5 ring-1 ring-white/15 focus-within:ring-brand-orange"
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              type="email"
              required
              placeholder="you@company.com"
              className="flex-1 bg-transparent px-5 py-3 text-sm text-white placeholder:text-white/40 outline-none"
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

      <div className="mx-auto mt-12 flex max-w-7xl flex-col items-center justify-between gap-3 border-t border-white/10 px-6 pt-6 text-xs text-white/45 sm:flex-row">
        <p>© {new Date().getFullYear()} Levite Inc. All rights reserved.</p>
        <div className="flex gap-5">
          <a href="#" className="hover:text-white">
            Terms
          </a>
          <a href="#" className="hover:text-white">
            Privacy
          </a>
          <a href="#" className="hover:text-white">
            Security
          </a>
        </div>
      </div>
    </footer>
  )
}
