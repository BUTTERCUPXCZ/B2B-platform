import { Link } from "@tanstack/react-router"
import { HugeiconsIcon } from "@hugeicons/react"
import { Calendar03Icon, Mail01Icon } from "@hugeicons/core-free-icons"

import { peso } from "@/components/shared/price-tag"
import { UserAvatar as Avatar } from "@/components/shared/user-avatar"
import { RatingStars } from "@/components/shared/rating-stars"
import { VerifiedBadge } from "@/components/shared/verified-badge"
import { Progress } from "@/components/ui/progress"
import { type Bid } from "./bids-data"

export function BidsList({ bids }: { bids: Bid[] }) {
  if (bids.length === 0) {
    return (
      <p className="rounded-none border border-dashed border-border p-8 text-center text-sm text-muted-foreground">
        No bids yet. Be the first to bid on this project.
      </p>
    )
  }

  return (
    <ul className="flex flex-col gap-4">
      {bids.map((b) => (
        <li
          key={b.id}
          className="flex flex-col gap-4 rounded-none border border-border bg-white p-5 sm:p-6"
        >
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-3">
              <Avatar src={b.contractorAvatar} alt={b.contractorName} size="lg" />
              <div>
                <Link
                  to="/contractors/$contractorId"
                  params={{ contractorId: b.contractorId }}
                  className="text-base font-bold text-brand-black hover:text-brand-orange"
                >
                  {b.contractorName}
                </Link>
                <div className="mt-0.5 flex flex-wrap items-center gap-2">
                  <RatingStars rating={b.contractorRating} reviews={b.contractorReviews} />
                  <VerifiedBadge level={b.contractorBadge} size="sm" />
                </div>
              </div>
            </div>
            <div className="text-right">
              <p className="text-xl font-bold tracking-tight text-brand-black">
                {peso(b.amount)}
              </p>
              <p className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                <HugeiconsIcon icon={Calendar03Icon} className="size-3" />
                {b.timelineDays} days
              </p>
            </div>
          </div>

          <p className="text-sm text-brand-black/80">{b.coverMessage}</p>

          <div>
            <p className="mb-2 text-xs font-semibold tracking-widest text-brand-black/60 uppercase">
              Milestones
            </p>
            <div className="flex flex-col gap-2">
              {b.milestones.map((m, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-brand-black">{m.title}</span>
                      <span className="text-xs font-semibold text-brand-black/70">{m.pct}%</span>
                    </div>
                    <Progress value={m.pct} className="mt-1 h-1.5" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 pt-1">
            <span className="flex-1 text-xs text-muted-foreground">Submitted {b.submittedAgo}</span>
            <Link
              to="/messages"
              search={{ to: b.contractorId }}
              className="inline-flex h-9 items-center justify-center gap-1.5 rounded-none border border-border bg-white px-4 text-xs font-semibold tracking-wide text-brand-black uppercase transition-colors hover:bg-muted"
            >
              <HugeiconsIcon icon={Mail01Icon} className="size-3.5" />
              Message
            </Link>
            <button
              type="button"
              className="inline-flex h-9 items-center justify-center rounded-none bg-brand-orange px-5 text-xs font-semibold tracking-wide text-white uppercase transition-colors hover:bg-brand-orange-soft"
              onClick={() => alert(`Awarded to ${b.contractorName} (mock).`)}
            >
              Award contract
            </button>
          </div>
        </li>
      ))}
    </ul>
  )
}
