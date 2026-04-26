import { capabilities } from "./capability-data"

const shortLabels: Record<string, string> = {
  marketplace: "Marketplace",
  quotes: "Job Quotes",
  escrow: "Escrow",
  delivery: "Delivery",
  storefront: "Storefront",
  services: "Service Listings",
  dashboard: "Seller Dashboard",
  trust: "Trust & Verification",
}

export function CapabilityNav() {
  return (
    <nav className="sticky top-0 z-20 -mt-12 border-b border-brand-black/10 bg-white/95 shadow-sm backdrop-blur">
      <div className="mx-auto max-w-7xl overflow-x-auto px-6">
        <ul className="flex gap-1 py-3 text-xs font-semibold whitespace-nowrap">
          {capabilities.map((c, i) => (
            <li key={c.id}>
              <a
                href={`#${c.id}`}
                className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-brand-black/70 transition-colors hover:bg-brand-orange/10 hover:text-brand-orange"
              >
                <span className="text-[10px] font-bold tracking-widest text-brand-orange">
                  0{i + 1}
                </span>
                <span>{shortLabels[c.id]}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}
