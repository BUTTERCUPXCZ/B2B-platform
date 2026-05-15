import { cn } from "@/lib/utils"

export function Progress({
  value,
  max = 100,
  className,
  barClassName,
}: {
  value: number
  max?: number
  className?: string
  barClassName?: string
}) {
  const pct = Math.max(0, Math.min(100, (value / max) * 100))
  return (
    <div
      role="progressbar"
      aria-valuenow={value}
      aria-valuemax={max}
      data-slot="progress"
      className={cn("h-2 w-full overflow-hidden bg-muted", className)}
    >
      <div
        className={cn("h-full bg-brand-orange transition-[width] duration-500", barClassName)}
        style={{ width: `${pct}%` }}
      />
    </div>
  )
}
