import { useMemo, useState } from "react"
import { createFileRoute, Link } from "@tanstack/react-router"

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
import { estimates } from "@/components/estimate/estimates-data"
import {
  clientEstimatesOverview,
  type ClientEstimateStatus,
} from "@/components/dashboard/client-data"
import { peso } from "@/components/shared/price-tag"
import { cn } from "@/lib/utils"

const statusVariant: Record<ClientEstimateStatus, "outline" | "secondary" | "destructive"> = {
  pending: "secondary",
  ready: "outline",
  expired: "destructive",
}

const statusLabel: Record<ClientEstimateStatus, string> = {
  pending: "Pending",
  ready: "Ready",
  expired: "Expired",
}

const filterChips: { id: "all" | ClientEstimateStatus; label: string }[] = [
  { id: "all", label: "All" },
  { id: "pending", label: "Pending" },
  { id: "ready", label: "Ready" },
  { id: "expired", label: "Expired" },
]

export const Route = createFileRoute("/dashboard/client/estimates")({
  component: ClientEstimatesRoute,
})

function ClientEstimatesRoute() {
  const [active, setActive] = useState<"all" | ClientEstimateStatus>("all")

  const rows = useMemo(() => {
    if (active === "all") return clientEstimatesOverview
    return clientEstimatesOverview.filter((o) => o.status === active)
  }, [active])

  const ready = clientEstimatesOverview.filter((o) => o.status === "ready").length
  const pending = clientEstimatesOverview.filter((o) => o.status === "pending").length
  const totalSpent = clientEstimatesOverview.reduce((s, o) => s + o.paidAmount, 0)
  const avgTurnaround =
    clientEstimatesOverview
      .filter((o) => o.status === "ready")
      .reduce((s, o) => s + o.turnaroundDays, 0) / Math.max(ready, 1)

  return (
    <ShadcnDashboardShell role="client" title="Estimates">
      <div className="grid grid-cols-2 gap-4 px-4 lg:grid-cols-4 lg:px-6">
        <Card>
          <CardHeader>
            <CardDescription>Pending</CardDescription>
            <CardTitle className="text-2xl font-semibold">{pending}</CardTitle>
            <p className="text-xs text-muted-foreground">Estimator preparing report</p>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <CardDescription>Ready</CardDescription>
            <CardTitle className="text-2xl font-semibold">{ready}</CardTitle>
            <p className="text-xs text-muted-foreground">PDF available to download</p>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <CardDescription>Avg turnaround</CardDescription>
            <CardTitle className="text-2xl font-semibold">{avgTurnaround.toFixed(1)}d</CardTitle>
            <p className="text-xs text-muted-foreground">Submission to delivery</p>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <CardDescription>Total paid (estimates)</CardDescription>
            <CardTitle className="text-2xl font-semibold">{peso(totalSpent)}</CardTitle>
            <p className="text-xs text-muted-foreground">₱500–2,000 per estimate</p>
          </CardHeader>
        </Card>
      </div>

      <SubPage
        title="My fair cost estimates"
        description="Reports prepared by licensed estimators."
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
          <Button size="sm" className="ml-auto" render={<Link to="/estimate" />}>
            Request estimate
          </Button>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Reference</TableHead>
              <TableHead>Project type</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Tier</TableHead>
              <TableHead className="text-right">Total</TableHead>
              <TableHead className="text-right">Paid</TableHead>
              <TableHead className="text-right">Status</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((ov) => {
              const e = estimates.find((x) => x.id === ov.estimateId)
              return (
                <TableRow key={ov.estimateId}>
                  <TableCell className="font-medium">{ov.estimateId}</TableCell>
                  <TableCell>{e?.projectType ?? "—"}</TableCell>
                  <TableCell>{e?.location ?? "—"}</TableCell>
                  <TableCell>
                    <Badge variant="secondary">{e?.tier ?? "—"}</Badge>
                  </TableCell>
                  <TableCell className="text-right">{e ? peso(e.total) : "—"}</TableCell>
                  <TableCell className="text-right">{peso(ov.paidAmount)}</TableCell>
                  <TableCell className="text-right">
                    <Badge variant={statusVariant[ov.status]}>{statusLabel[ov.status]}</Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    {ov.status === "ready" ? (
                      <Button
                        size="sm"
                        variant="outline"
                        render={
                          <Link
                            to="/estimate/report/$estimateId"
                            params={{ estimateId: ov.estimateId }}
                          />
                        }
                      >
                        View report
                      </Button>
                    ) : ov.status === "pending" ? (
                      <span className="text-xs text-muted-foreground">~2–5 business days</span>
                    ) : (
                      <span className="text-xs text-muted-foreground">Expired</span>
                    )}
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </SubPage>
    </ShadcnDashboardShell>
  )
}
