import { useMemo, useState } from "react"
import { createFileRoute, Link } from "@tanstack/react-router"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  StarIcon,
  Tick02Icon,
  FlagIcon,
  Sent02Icon,
  SentIcon,
} from "@hugeicons/core-free-icons"

import { ShadcnDashboardShell } from "@/components/dashboard/shadcn-dashboard"
import { SubPage } from "@/components/dashboard/sub-page"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { sellerReviews, type SellerReview } from "@/components/dashboard/dashboard-data"
import { products } from "@/components/shop/shop-data"
import { cn } from "@/lib/utils"

const productMap = new Map(products.map((p) => [p.id, p]))

type RatingFilter = "all" | 5 | 4 | 3 | 2 | 1
type ReplyFilter = "all" | "replied" | "unreplied"

export const Route = createFileRoute("/dashboard/seller/reviews")({
  component: SellerReviewsRoute,
})

function Stars({ rating, size = "md" }: { rating: number; size?: "sm" | "md" }) {
  const s = size === "sm" ? "size-3" : "size-4"
  return (
    <span className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <HugeiconsIcon
          key={i}
          icon={StarIcon}
          className={cn(
            s,
            i <= rating ? "fill-amber-400 text-amber-400" : "text-muted-foreground/40",
          )}
          strokeWidth={2}
        />
      ))}
    </span>
  )
}

function SellerReviewsRoute() {
  const [ratingFilter, setRatingFilter] = useState<RatingFilter>("all")
  const [replyFilter, setReplyFilter] = useState<ReplyFilter>("all")
  const [verifiedOnly, setVerifiedOnly] = useState(false)
  const [drafts, setDrafts] = useState<Record<string, string>>({})

  const total = sellerReviews.length
  const avg =
    sellerReviews.reduce((s, r) => s + r.rating, 0) / Math.max(total, 1)
  const fiveStar = Math.round(
    (sellerReviews.filter((r) => r.rating === 5).length / Math.max(total, 1)) * 100,
  )
  const pendingReply = sellerReviews.filter((r) => !r.reply).length

  const breakdown = [5, 4, 3, 2, 1].map((star) => ({
    star,
    count: sellerReviews.filter((r) => r.rating === star).length,
  }))

  const filtered = useMemo(() => {
    return sellerReviews.filter((r) => {
      if (ratingFilter !== "all" && r.rating !== ratingFilter) return false
      if (replyFilter === "replied" && !r.reply) return false
      if (replyFilter === "unreplied" && r.reply) return false
      if (verifiedOnly && !r.verified) return false
      return true
    })
  }, [ratingFilter, replyFilter, verifiedOnly])

  const ratingChips: { id: RatingFilter; label: string }[] = [
    { id: "all", label: "All" },
    { id: 5, label: "5 ★" },
    { id: 4, label: "4 ★" },
    { id: 3, label: "3 ★" },
    { id: 2, label: "2 ★" },
    { id: 1, label: "1 ★" },
  ]

  return (
    <ShadcnDashboardShell role="seller" title="Reviews">
      <div className="grid grid-cols-2 gap-4 px-4 lg:grid-cols-4 lg:px-6">
        <Card>
          <CardHeader>
            <CardDescription>Average rating</CardDescription>
            <CardTitle className="flex items-baseline gap-2 text-2xl font-semibold">
              {avg.toFixed(1)}
              <span className="text-sm font-normal text-muted-foreground">/ 5</span>
            </CardTitle>
            <Stars rating={Math.round(avg)} size="sm" />
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <CardDescription>Total reviews</CardDescription>
            <CardTitle className="text-2xl font-semibold">{total}</CardTitle>
            <p className="text-xs text-muted-foreground">All from verified deliveries</p>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <CardDescription>5-star share</CardDescription>
            <CardTitle className="text-2xl font-semibold">{fiveStar}%</CardTitle>
            <p className="text-xs text-muted-foreground">Of all reviews to date</p>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <CardDescription>Pending reply</CardDescription>
            <CardTitle className="text-2xl font-semibold">{pendingReply}</CardTitle>
            <p className="text-xs text-muted-foreground">Reply within 48h to keep rating velocity</p>
          </CardHeader>
        </Card>
      </div>

      <div className="px-4 lg:px-6">
        <Card>
          <CardHeader>
            <CardTitle>Rating breakdown</CardTitle>
            <CardDescription>Distribution across all reviews</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            {breakdown.map(({ star, count }) => {
              const pct = total ? (count / total) * 100 : 0
              return (
                <div key={star} className="flex items-center gap-3 text-sm">
                  <span className="flex w-12 items-center gap-1 text-muted-foreground">
                    {star}
                    <HugeiconsIcon icon={StarIcon} className="size-3 text-amber-400" strokeWidth={2} />
                  </span>
                  <span className="relative h-2 flex-1 overflow-hidden rounded-full bg-muted">
                    <span
                      className="absolute inset-y-0 left-0 bg-amber-400"
                      style={{ width: `${pct}%` }}
                    />
                  </span>
                  <span className="w-8 text-right tabular-nums text-muted-foreground">
                    {count}
                  </span>
                </div>
              )
            })}
          </CardContent>
        </Card>
      </div>

      <SubPage
        title="Customer reviews"
        description="Buyers can only review after a delivered order. Reply quickly to build seller reputation."
      >
        <div className="mb-4 flex flex-wrap items-center gap-2">
          {ratingChips.map((chip) => {
            const isActive = ratingFilter === chip.id
            return (
              <button
                key={String(chip.id)}
                type="button"
                onClick={() => setRatingFilter(chip.id)}
                className={cn(
                  "rounded-full border border-border px-3 py-1 text-xs font-medium transition-colors",
                  isActive
                    ? "border-brand-orange bg-brand-orange text-white"
                    : "bg-white text-brand-black/70 hover:bg-muted",
                )}
              >
                {chip.label}
              </button>
            )
          })}
          <span className="mx-2 h-5 w-px bg-border" aria-hidden />
          <select
            value={replyFilter}
            onChange={(e) => setReplyFilter(e.target.value as ReplyFilter)}
            className="rounded-full border border-border bg-white px-3 py-1 text-xs font-medium text-brand-black/70 focus-visible:border-brand-orange focus-visible:outline-none"
          >
            <option value="all">All replies</option>
            <option value="replied">Replied</option>
            <option value="unreplied">Unreplied</option>
          </select>
          <label className="flex items-center gap-2 text-xs font-medium text-brand-black/70">
            <input
              type="checkbox"
              checked={verifiedOnly}
              onChange={(e) => setVerifiedOnly(e.target.checked)}
              className="size-3.5 accent-brand-orange"
            />
            Verified only
          </label>
          <span className="ml-auto text-xs text-muted-foreground">
            {filtered.length} of {total}
          </span>
        </div>

        <div className="flex flex-col gap-4">
          {filtered.map((review) => {
            const product = productMap.get(review.productId)
            return (
              <article
                key={review.id}
                className="rounded-xl border border-border bg-white p-4"
              >
                <header className="flex flex-wrap items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <Avatar className="size-10">
                      <AvatarFallback className="bg-brand-orange/15 text-xs font-semibold text-brand-orange">
                        {review.buyerInitials}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-semibold text-brand-black">
                        {review.buyerName}
                      </p>
                      <div className="mt-0.5 flex items-center gap-2">
                        <Stars rating={review.rating} size="sm" />
                        <span className="text-xs text-muted-foreground">
                          {review.date}
                        </span>
                        <Badge variant="outline" className="gap-1">
                          <HugeiconsIcon
                            icon={Tick02Icon}
                            className="size-3 text-emerald-600"
                            strokeWidth={2.5}
                          />
                          Verified delivery
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {product && (
                      <Link
                        to="/shop/$productId"
                        params={{ productId: product.id }}
                        className="text-xs font-medium text-muted-foreground hover:text-brand-orange hover:underline"
                      >
                        on {product.name}
                      </Link>
                    )}
                    <Button size="icon-sm" variant="ghost" aria-label="Flag review">
                      <HugeiconsIcon icon={FlagIcon} className="size-4" strokeWidth={2} />
                    </Button>
                  </div>
                </header>

                <h3 className="mt-3 text-sm font-semibold text-brand-black">
                  {review.title}
                </h3>
                <p className="mt-1 text-sm text-brand-black/80">{review.body}</p>

                {review.reply ? (
                  <ReplyBlock review={review} />
                ) : (
                  <ComposeReply
                    review={review}
                    value={drafts[review.id] ?? ""}
                    onChange={(v) =>
                      setDrafts((prev) => ({ ...prev, [review.id]: v }))
                    }
                  />
                )}
              </article>
            )
          })}
          {filtered.length === 0 && (
            <p className="rounded-xl border border-dashed border-border bg-white px-4 py-12 text-center text-sm text-muted-foreground">
              No reviews match the current filters.
            </p>
          )}
        </div>
      </SubPage>
    </ShadcnDashboardShell>
  )
}

function ReplyBlock({ review }: { review: SellerReview }) {
  if (!review.reply) return null
  return (
    <div className="mt-4 rounded-lg border-l-2 border-brand-orange bg-muted/40 p-3">
      <p className="text-[10px] font-semibold tracking-widest text-brand-orange uppercase">
        Eagle Materials replied · {review.reply.date}
      </p>
      <p className="mt-1 text-sm text-brand-black/80">{review.reply.body}</p>
    </div>
  )
}

function ComposeReply({
  review,
  value,
  onChange,
}: {
  review: SellerReview
  value: string
  onChange: (v: string) => void
}) {
  return (
    <form
      className="mt-4 flex flex-col gap-2 rounded-lg border border-dashed border-border p-3"
      onSubmit={(e) => e.preventDefault()}
    >
      <label
        htmlFor={`reply-${review.id}`}
        className="text-[10px] font-semibold tracking-widest text-muted-foreground uppercase"
      >
        Public reply (visible on the product page)
      </label>
      <textarea
        id={`reply-${review.id}`}
        rows={2}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Thanks for the feedback…"
        className="resize-none rounded-md border border-border bg-white px-3 py-2 text-sm focus-visible:border-brand-orange focus-visible:outline-none"
      />
      <div className="flex items-center justify-end gap-2">
        <Button size="sm" variant="ghost" type="button">
          <HugeiconsIcon icon={SentIcon} className="size-4" strokeWidth={2} />
          Save draft
        </Button>
        <Button size="sm" type="submit">
          <HugeiconsIcon icon={Sent02Icon} className="size-4" strokeWidth={2} />
          Post reply
        </Button>
      </div>
    </form>
  )
}
