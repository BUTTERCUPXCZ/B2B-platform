import { HugeiconsIcon } from "@hugeicons/react"
import { StarIcon, StarHalfIcon } from "@hugeicons/core-free-icons"

import { cn } from "@/lib/utils"

const FULL_STAR = 1
const HALF_STAR = 0.5
const EMPTY_STAR = 0

function getStars(rating: number): number[] {
  const stars: number[] = []
  const full = Math.floor(rating)
  const decimal = rating - full
  for (let i = 0; i < full; i++) stars.push(FULL_STAR)
  if (decimal >= 0.25 && decimal < 0.75) stars.push(HALF_STAR)
  else if (decimal >= 0.75) stars.push(FULL_STAR)
  while (stars.length < 5) stars.push(EMPTY_STAR)
  return stars.slice(0, 5)
}

export function RatingStars({
  rating,
  reviews,
  size = "sm",
  className,
}: {
  rating: number
  reviews?: number | string
  size?: "sm" | "md" | "lg"
  className?: string
}) {
  const iconSize = size === "lg" ? "size-4" : size === "md" ? "size-3.5" : "size-3"
  const textSize = size === "lg" ? "text-sm" : "text-xs"
  const stars = getStars(rating)

  return (
    <div
      className={cn("inline-flex items-center gap-1.5", className)}
      role="img"
      aria-label={`${rating.toFixed(1)} out of 5 stars${reviews !== undefined ? `, ${reviews} reviews` : ""}`}
    >
      <span className="inline-flex items-center gap-0.5" aria-hidden>
        {stars.map((star, i) =>
          star === FULL_STAR ? (
            <HugeiconsIcon key={i} icon={StarIcon} className={cn(iconSize, "text-amber-500")} />
          ) : star === HALF_STAR ? (
            <HugeiconsIcon key={i} icon={StarHalfIcon} className={cn(iconSize, "text-amber-500")} />
          ) : (
            <HugeiconsIcon key={i} icon={StarIcon} className={cn(iconSize, "text-muted-foreground/30")} />
          )
        )}
      </span>
      <span className={cn("font-semibold text-brand-black", textSize)}>
        {rating.toFixed(1)}
      </span>
      {reviews !== undefined && (
        <span className={cn("text-muted-foreground", textSize)}>({reviews})</span>
      )}
    </div>
  )
}