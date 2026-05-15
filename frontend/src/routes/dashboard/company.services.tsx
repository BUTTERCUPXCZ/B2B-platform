import { useMemo, useState } from "react"
import { createFileRoute } from "@tanstack/react-router"
import { HugeiconsIcon } from "@hugeicons/react"
import { PlusSignIcon } from "@hugeicons/core-free-icons"

import { ShadcnDashboardShell } from "@/components/dashboard/shadcn-dashboard"
import { SubPage } from "@/components/dashboard/sub-page"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { peso } from "@/components/shared/price-tag"
import {
  companyServices,
  type CompanyServiceStatus,
} from "@/components/dashboard/company-data"
import { cn } from "@/lib/utils"

const filterChips: { id: "all" | CompanyServiceStatus; label: string }[] = [
  { id: "all", label: "All" },
  { id: "live", label: "Live" },
  { id: "paused", label: "Paused" },
  { id: "draft", label: "Draft" },
]

const pricingLabel: Record<"fixed" | "hourly" | "quote", string> = {
  fixed: "Fixed",
  hourly: "Hourly",
  quote: "Quote",
}

function statusBadge(status: CompanyServiceStatus) {
  if (status === "live") return <Badge variant="outline">Live</Badge>
  if (status === "paused") return <Badge variant="secondary">Paused</Badge>
  return <Badge variant="secondary">Draft</Badge>
}

export const Route = createFileRoute("/dashboard/company/services")({
  component: CompanyServicesRoute,
})

function CompanyServicesRoute() {
  const [active, setActive] = useState<"all" | CompanyServiceStatus>("all")

  const filtered = useMemo(
    () => (active === "all" ? companyServices : companyServices.filter((s) => s.status === active)),
    [active],
  )

  const total = companyServices.length
  const bookings30d = companyServices.reduce((s, x) => s + x.bookings30d, 0)
  const live = companyServices.filter((s) => s.status === "live").length
  const avgValue =
    companyServices
      .filter((s) => s.bookings30d > 0)
      .reduce((s, x) => s + x.startingPrice, 0) /
    Math.max(companyServices.filter((s) => s.bookings30d > 0).length, 1)
  const coverage = new Set(companyServices.map((s) => s.coverage)).size

  return (
    <ShadcnDashboardShell role="company" title="My services">
      <div className="grid grid-cols-2 gap-4 px-4 lg:grid-cols-4 lg:px-6">
        <Card>
          <CardHeader>
            <CardDescription>Total services</CardDescription>
            <CardTitle className="text-2xl font-semibold">{total}</CardTitle>
            <p className="text-xs text-muted-foreground">{live} live · {total - live} not live</p>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <CardDescription>Bookings (30d)</CardDescription>
            <CardTitle className="text-2xl font-semibold">{bookings30d}</CardTitle>
            <p className="text-xs text-muted-foreground">Across all live services</p>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <CardDescription>Avg starting price</CardDescription>
            <CardTitle className="text-2xl font-semibold">{peso(Math.round(avgValue))}</CardTitle>
            <p className="text-xs text-muted-foreground">Across booked services</p>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <CardDescription>Coverage zones</CardDescription>
            <CardTitle className="text-2xl font-semibold">{coverage}</CardTitle>
            <p className="text-xs text-muted-foreground">Distinct service areas</p>
          </CardHeader>
        </Card>
      </div>

      <SubPage
        title="Services I offer"
        description="Edit pricing, pause for the season, or promote to boost reach."
      >
        <div className="mb-4 flex flex-wrap items-center gap-2">
          {filterChips.map((chip) => {
            const isActive = active === chip.id
            return (
              <button
                key={chip.id}
                type="button"
                onClick={() => setActive(chip.id)}
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
          <Button size="sm" className="ml-auto">
            <HugeiconsIcon icon={PlusSignIcon} strokeWidth={2} />
            Add service
          </Button>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Service</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Pricing</TableHead>
              <TableHead className="text-right">Starting at</TableHead>
              <TableHead>Coverage</TableHead>
              <TableHead className="text-right">Bookings (30d)</TableHead>
              <TableHead className="text-right">Rating</TableHead>
              <TableHead className="text-right">Updated</TableHead>
              <TableHead className="text-right">Status</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((s) => (
              <TableRow key={s.id}>
                <TableCell className="font-medium">{s.name}</TableCell>
                <TableCell>{s.category}</TableCell>
                <TableCell>
                  <Badge variant="secondary">{pricingLabel[s.pricingModel]}</Badge>
                </TableCell>
                <TableCell className="text-right">{peso(s.startingPrice)}</TableCell>
                <TableCell>{s.coverage}</TableCell>
                <TableCell className="text-right">{s.bookings30d}</TableCell>
                <TableCell className="text-right">
                  {s.reviewCount > 0 ? `${s.rating} (${s.reviewCount})` : "—"}
                </TableCell>
                <TableCell className="text-right text-xs text-muted-foreground">{s.updated}</TableCell>
                <TableCell className="text-right">{statusBadge(s.status)}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-1">
                    <Button size="sm" variant="ghost">
                      Edit
                    </Button>
                    {s.status === "live" ? (
                      <Button size="sm" variant="ghost">
                        Pause
                      </Button>
                    ) : (
                      <Button size="sm" variant="ghost">
                        Publish
                      </Button>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </SubPage>
    </ShadcnDashboardShell>
  )
}
