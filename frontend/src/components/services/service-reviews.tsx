import { UserAvatar as Avatar } from "@/components/shared/user-avatar"
import { RatingStars } from "@/components/shared/rating-stars"
import { type ServiceReview } from "./services-data"

export function ServiceReviews({ reviews }: { reviews: ServiceReview[] }) {
  return (
    <ul className="flex flex-col gap-4">
      {reviews.map((r, i) => (
        <li
          key={i}
          className="flex flex-col gap-2 rounded-none border border-border bg-white p-5"
        >
          <div className="flex items-center gap-3">
            <Avatar fallback={r.author} size="sm" />
            <div className="flex-1">
              <p className="text-sm font-semibold text-brand-black">{r.author}</p>
              <p className="text-xs text-muted-foreground">{r.date}</p>
            </div>
            <RatingStars rating={r.rating} />
          </div>
          <p className="text-sm text-brand-black/80">{r.text}</p>
        </li>
      ))}
    </ul>
  )
}
