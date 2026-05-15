import { Link } from "@tanstack/react-router"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  Location01Icon,
  CheckmarkCircle02Icon,
  Mail01Icon,
  Calendar03Icon,
  Shield02Icon,
} from "@hugeicons/core-free-icons"

import { Header } from "@/components/landing/header"
import { Footer } from "@/components/landing/footer"
import { Breadcrumbs } from "@/components/shared/breadcrumbs"
import { RatingStars } from "@/components/shared/rating-stars"
import { VerifiedBadge } from "@/components/shared/verified-badge"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { type ServicePro, getServiceProDetail } from "./services-data"
import { ServicePortfolioGrid } from "./service-portfolio-grid"
import { ServiceReviews } from "./service-reviews"

const badgeMap: Record<NonNullable<ServicePro["badge"]>, "topRated" | "verified" | "warning"> = {
  "Top Rated": "topRated",
  "Verified Pro": "verified",
  "Quick Responder": "warning",
}

export function ServiceDetailPage({ pro }: { pro: ServicePro }) {
  const { portfolio, packages, customerReviews } = getServiceProDetail(pro)

  return (
    <div className="bg-background">
      <Header />
      <main className="pt-12 pb-20">
        <div className="mx-auto max-w-[1280px] px-6 sm:px-12 lg:px-20 xl:px-24">
          <Breadcrumbs
            className="mb-6"
            items={[
              { label: "Services", to: "/services" },
              { label: pro.category },
              { label: pro.name },
            ]}
          />

          <section className="grid gap-6 lg:grid-cols-[1.3fr_1fr]">
            <div className="relative overflow-hidden rounded-none bg-brand-ink">
              <img src={pro.image} alt={pro.name} className="size-full object-cover opacity-80" />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-ink via-brand-ink/40 to-transparent" />
              <div className="absolute bottom-0 left-0 flex flex-col gap-3 p-6 text-white sm:p-8">
                <div className="flex flex-wrap gap-2">
                  <Badge variant="muted" className="bg-white/15 text-white">
                    {pro.category}
                  </Badge>
                  {pro.badge && (
                    <Badge variant={badgeMap[pro.badge]}>{pro.badge}</Badge>
                  )}
                  <VerifiedBadge level="license" />
                </div>
                <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">{pro.name}</h1>
                <p className="max-w-xl text-sm text-white/80">{pro.blurb}</p>
                <div className="flex flex-wrap items-center gap-4 text-sm">
                  <span className="inline-flex items-center gap-1.5">
                    <HugeiconsIcon icon={Location01Icon} className="size-4" />
                    {pro.location}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <HugeiconsIcon icon={CheckmarkCircle02Icon} className="size-4" />
                    {pro.jobsCompleted} jobs completed
                  </span>
                  <RatingStars rating={pro.rating} reviews={pro.reviews} size="md" className="text-white" />
                </div>
              </div>
            </div>

            <aside className="flex flex-col gap-3 rounded-none border border-border bg-white p-6">
              <div>
                <span className="text-xs tracking-widest text-muted-foreground uppercase">
                  Starting from
                </span>
                <p className="text-3xl font-bold tracking-tight text-brand-black">
                  {pro.startingFrom}
                </p>
              </div>
              <Separator />
              <div className="space-y-2 text-sm">
                <Detail icon={Shield02Icon} label="Escrow protected" />
                <Detail icon={Calendar03Icon} label="Available next week" />
                <Detail icon={CheckmarkCircle02Icon} label="On-site PM included" />
              </div>
              <Link
                to="/messages"
                search={{ to: pro.id }}
                className="mt-4 inline-flex h-12 items-center justify-center gap-2 rounded-none bg-brand-orange text-xs font-semibold tracking-widest text-white uppercase transition-colors hover:bg-brand-orange-soft"
              >
                <HugeiconsIcon icon={Mail01Icon} className="size-4" />
                Message provider
              </Link>
              <Link
                to="/jobs/post"
                className="inline-flex h-12 items-center justify-center rounded-none border border-border bg-white text-xs font-semibold tracking-widest text-brand-black uppercase transition-colors hover:bg-muted"
              >
                Request a quote
              </Link>
            </aside>
          </section>

          <section className="mt-12">
            <Tabs defaultValue="packages">
              <TabsList>
                <TabsTrigger value="packages">Packages</TabsTrigger>
                <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
                <TabsTrigger value="reviews">Reviews ({customerReviews.length})</TabsTrigger>
              </TabsList>

              <TabsContent value="packages" className="mt-6">
                <div className="grid gap-4 md:grid-cols-3">
                  {packages.map((p) => (
                    <div
                      key={p.name}
                      className="flex flex-col gap-3 rounded-none border border-border bg-white p-6"
                    >
                      <div>
                        <h3 className="text-base font-bold text-brand-black">{p.name}</h3>
                        <p className="text-2xl font-bold tracking-tight text-brand-black">
                          {p.price}
                        </p>
                        <p className="text-xs tracking-widest text-muted-foreground uppercase">
                          {p.duration}
                        </p>
                      </div>
                      <p className="flex-1 text-sm text-brand-black/70">{p.description}</p>
                      <Link
                        to="/messages"
                        search={{ to: pro.id }}
                        className="inline-flex h-10 items-center justify-center rounded-none bg-brand-black text-xs font-semibold tracking-wide text-white uppercase transition-colors hover:bg-brand-black/90"
                      >
                        Book package
                      </Link>
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="portfolio" className="mt-6">
                <ServicePortfolioGrid images={portfolio} />
              </TabsContent>

              <TabsContent value="reviews" className="mt-6">
                <ServiceReviews reviews={customerReviews} />
              </TabsContent>
            </Tabs>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  )
}

function Detail({
  icon,
  label,
}: {
  icon: typeof Shield02Icon
  label: string
}) {
  return (
    <div className="flex items-center gap-2 text-brand-black/80">
      <HugeiconsIcon icon={icon} className="size-4 text-brand-orange" />
      <span>{label}</span>
    </div>
  )
}
