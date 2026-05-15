import { type ReactNode } from "react"
import { HugeiconsIcon } from "@hugeicons/react"

import { cn } from "@/lib/utils"

type EmptyStateProps = {
  icon?: typeof HugeiconsIcon extends never ? never : Parameters<typeof HugeiconsIcon>[0]["icon"]
  title: string
  description?: string
  action?: ReactNode
  className?: string
}

export function EmptyState({ icon, title, description, action, className }: EmptyStateProps) {
  return (
    <div
      data-slot="empty-state"
      className={cn(
        "flex flex-col items-center justify-center gap-3 border border-dashed border-border bg-white p-10 text-center",
        className
      )}
    >
      {icon && (
        <span className="flex size-12 items-center justify-center bg-brand-orange/10 text-brand-orange">
          <HugeiconsIcon icon={icon} className="size-5" />
        </span>
      )}
      <h3 className="text-base font-semibold text-brand-black">{title}</h3>
      {description && (
        <p className="max-w-sm text-sm text-muted-foreground">{description}</p>
      )}
      {action && <div className="pt-2">{action}</div>}
    </div>
  )
}
