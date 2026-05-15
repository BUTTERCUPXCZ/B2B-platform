import { Link } from "@tanstack/react-router"
import { HugeiconsIcon } from "@hugeicons/react"
import { ArrowRight01Icon } from "@hugeicons/core-free-icons"

import { cn } from "@/lib/utils"

export type Crumb = { label: string; to?: string }

export function Breadcrumbs({
  items,
  className,
}: {
  items: Crumb[]
  className?: string
}) {
  return (
    <nav
      aria-label="Breadcrumb"
      className={cn(
        "flex flex-wrap items-center gap-1.5 text-xs font-medium tracking-wide text-brand-black/60",
        className
      )}
    >
      <ol className="flex flex-wrap items-center gap-1.5" itemType="https://schema.org/BreadcrumbList">
        {items.map((item, i) => {
          const last = i === items.length - 1
          return (
            <li
              key={i}
              className="inline-flex items-center gap-1.5"
              itemProp="itemListElement"
              itemScope
              itemType="https://schema.org/ListItem"
            >
              {item.to && !last ? (
                <Link
                  to={item.to}
                  className="transition-colors hover:text-brand-orange"
                  itemProp="item"
                >
                  <span itemProp="name">{item.label}</span>
                </Link>
              ) : (
                <span
                  className={cn(last && "text-brand-black", "font-medium")}
                  aria-current={last ? "page" : undefined}
                  itemProp="name"
                >
                  {item.label}
                </span>
              )}
              <meta itemProp="position" content={String(i + 1)} />
              {!last && (
                <HugeiconsIcon
                  icon={ArrowRight01Icon}
                  className="size-3 text-brand-black/30"
                  aria-hidden
                />
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}