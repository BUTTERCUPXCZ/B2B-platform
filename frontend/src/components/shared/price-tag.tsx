import { cn } from "@/lib/utils"

const pesoFormatter = new Intl.NumberFormat("en-PH", {
  style: "currency",
  currency: "PHP",
  maximumFractionDigits: 0,
})

export const peso = (n: number) => pesoFormatter.format(n)

export function PriceTag({
  price,
  oldPrice,
  unit,
  size = "md",
  className,
}: {
  price: number
  oldPrice?: number
  unit?: string
  size?: "sm" | "md" | "lg"
  className?: string
}) {
  const main =
    size === "lg" ? "text-2xl" : size === "md" ? "text-lg" : "text-base"
  const old = size === "lg" ? "text-sm" : "text-xs"
  return (
    <div className={cn("flex items-baseline gap-2", className)}>
      <span className={cn("font-bold tracking-tight text-brand-black", main)}>
        {peso(price)}
      </span>
      {oldPrice !== undefined && oldPrice > price && (
        <span className={cn("text-muted-foreground line-through", old)}>
          {peso(oldPrice)}
        </span>
      )}
      {unit && (
        <span className={cn("text-muted-foreground", old)}>· {unit}</span>
      )}
    </div>
  )
}