import { Link } from "@tanstack/react-router"
import { HugeiconsIcon } from "@hugeicons/react"
import { Location01Icon, CheckmarkCircle02Icon } from "@hugeicons/core-free-icons"

import { UserAvatar as Avatar } from "@/components/shared/user-avatar"
import { Badge } from "@/components/ui/badge"
import { RatingStars } from "@/components/shared/rating-stars"
import { VerifiedBadge } from "@/components/shared/verified-badge"
import { type Contractor } from "./contractors-data"

export function ContractorCard({ contractor }: { contractor: Contractor }) {
  return (
    <Link
      to="/contractors/$contractorId"
      params={{ contractorId: contractor.id }}
      className="group flex flex-col gap-3 rounded-none border border-border bg-white p-5 transition-shadow hover:shadow-[0_24px_60px_-30px_rgba(0,0,0,0.25)]"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <Avatar src={contractor.avatar} alt={contractor.name} size="lg" />
          <div>
            <p className="text-base font-bold text-brand-black group-hover:text-brand-orange">
              {contractor.name}
            </p>
            <p className="text-xs text-muted-foreground">{contractor.trade}</p>
          </div>
        </div>
        {contractor.featured && (
          <Badge variant="accent" size="sm">
            Featured
          </Badge>
        )}
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <RatingStars rating={contractor.rating} reviews={contractor.reviewCount} />
        <VerifiedBadge level={contractor.badgeLevel} size="sm" />
      </div>

      <p className="line-clamp-2 text-sm text-brand-black/70">{contractor.bio}</p>

      <div className="flex flex-wrap gap-1.5">
        {contractor.expertiseTags.slice(0, 3).map((t) => (
          <Badge key={t} variant="muted" size="sm">
            {t}
          </Badge>
        ))}
      </div>

      <div className="mt-auto flex flex-wrap items-center justify-between gap-2 border-t border-border pt-3 text-xs text-brand-black/70">
        <span className="inline-flex items-center gap-1">
          <HugeiconsIcon icon={Location01Icon} className="size-3" />
          {contractor.location}
        </span>
        <span className="inline-flex items-center gap-1">
          <HugeiconsIcon icon={CheckmarkCircle02Icon} className="size-3" />
          {contractor.jobsCompleted} jobs
        </span>
        <span className="font-semibold text-brand-black">From {contractor.startingFrom}</span>
      </div>
    </Link>
  )
}
