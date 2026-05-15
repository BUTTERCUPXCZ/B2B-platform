import { useState } from "react"
import { createFileRoute } from "@tanstack/react-router"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  ChartUpIcon,
  ChartDownIcon,
  AnalyticsIcon,
} from "@hugeicons/core-free-icons"

import { ShadcnDashboardShell } from "@/components/dashboard/shadcn-dashboard"
import { SubPage } from "@/components/dashboard/sub-page"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
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
import { ChartAreaInteractive } from "@/components/chart-area-interactive"
import {
  adminKpiSnapshots,
  adminTopPerformers,
} from "@/components/dashboard/admin-data"
import { cn } from "@/lib/utils"

const periods = [
  { id: "7d", label: "Last 7 days" },
  { id: "30d", label: "Last 30 days" },
  { id: "90d", label: "Last 90 days" },
  { id: "custom", label: "Custom" },
] as const

type PeriodId = (typeof periods)[number]["id"]

export const Route = createFileRoute("/dashboard/admin/reports")({
  component: AdminReportsRoute,
})

function AdminReportsRoute() {
  const [period, setPeriod] = useState<PeriodId>("30d")

  return (
    <ShadcnDashboardShell role="admin" title="Reports">
      <div className="flex flex-wrap items-center gap-3 px-4 lg:px-6">
        <p className="text-xs font-semibold tracking-widest text-muted-foreground uppercase">
          Period
        </p>
        <div className="flex flex-wrap gap-2">
          {periods.map((p) => {
            const active = period === p.id
            return (
              <button
                key={p.id}
                type="button"
                onClick={() => setPeriod(p.id)}
                className={cn(
                  "rounded-full border border-border px-3 py-1 text-xs font-medium transition-colors",
                  active
                    ? "border-brand-orange bg-brand-orange text-white"
                    : "bg-white text-brand-black/70 hover:bg-muted",
                )}
              >
                {p.label}
              </button>
            )
          })}
        </div>
        <Button size="sm" variant="outline" className="ml-auto">
          <HugeiconsIcon icon={AnalyticsIcon} strokeWidth={2} />
          Export CSV
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-linear-to-t *:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4 dark:*:data-[slot=card]:bg-card">
        {adminKpiSnapshots.map((s) => (
          <Card key={s.label} className="@container/card">
            <CardHeader>
              <CardDescription>{s.label}</CardDescription>
              <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                {s.value}
              </CardTitle>
              <CardAction>
                <Badge variant="outline">
                  <HugeiconsIcon icon={s.trendUp ? ChartUpIcon : ChartDownIcon} strokeWidth={2} />
                  {s.delta}
                </Badge>
              </CardAction>
            </CardHeader>
            <CardFooter className="text-xs text-muted-foreground">{s.hint}</CardFooter>
          </Card>
        ))}
      </div>

      <div className="px-4 lg:px-6">
        <ChartAreaInteractive />
      </div>

      <SubPage title="Top performers" description="Top 5 sellers by GMV and top 5 contractors by released earnings.">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Segment</TableHead>
              <TableHead>Metric</TableHead>
              <TableHead className="text-right">Value</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {adminTopPerformers.map((p) => (
              <TableRow key={p.id}>
                <TableCell className="font-medium">{p.name}</TableCell>
                <TableCell>
                  <Badge variant="secondary">{p.segment}</Badge>
                </TableCell>
                <TableCell>{p.metricLabel}</TableCell>
                <TableCell className="text-right font-semibold">{peso(p.metric)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </SubPage>
    </ShadcnDashboardShell>
  )
}
