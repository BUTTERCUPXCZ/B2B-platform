import { HugeiconsIcon } from "@hugeicons/react"

import { cn } from "@/lib/utils"

export function StatTile({
  icon,
  label,
  value,
  hint,
  trend,
  className,
}: {
  icon: typeof HugeiconsIcon extends never ? never : Parameters<typeof HugeiconsIcon>[0]["icon"]
  label: string
  value: string
  hint?: string
  trend?: { value: string; up?: boolean }
  className?: string
}) {
  return (
    <div className={cn("flex flex-col gap-3 rounded-none border border-border bg-white p-5", className)}>
      <span className="flex size-10 items-center justify-center rounded-none bg-brand-orange/10 text-brand-orange">
        <HugeiconsIcon icon={icon} className="size-5" />
      </span>
      <div>
        <p className="text-xs tracking-widest text-muted-foreground uppercase">
          {label}
        </p>
        <p className="text-2xl font-bold tracking-tight text-brand-black">{value}</p>
        {(hint || trend) && (
          <p className="mt-1 text-xs">
            {trend && (
              <span
                className={cn(
                  "mr-2 inline-flex items-center gap-0.5 font-semibold",
                  trend.up ? "text-emerald-600" : "text-red-600"
                )}
              >
                {trend.up ? "↑" : "↓"} {trend.value}
              </span>
            )}
            {hint && <span className="text-muted-foreground">{hint}</span>}
          </p>
        )}
      </div>
    </div>
  )
}
