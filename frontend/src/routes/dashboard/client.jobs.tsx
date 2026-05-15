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
import { jobs } from "@/components/jobs/jobs-data"
import {
  clientJobsOverview,
  type ClientJobStatus,
} from "@/components/dashboard/client-data"
import { cn } from "@/lib/utils"

const overviewById = new Map(clientJobsOverview.map((o) => [o.jobId, o]))
const myJobs = jobs.filter((j) => overviewById.has(j.id))

const statusLabel: Record<ClientJobStatus, string> = {
  open: "Open",
  bidding: "Bidding",
  hired: "Hired",
  completed: "Completed",
}

const statusVariant: Record<ClientJobStatus, "outline" | "secondary"> = {
  open: "secondary",
  bidding: "secondary",
  hired: "outline",
  completed: "outline",
}

const filterChips: { id: "all" | ClientJobStatus; label: string }[] = [
  { id: "all", label: "All" },
  { id: "open", label: "Open" },
  { id: "bidding", label: "Bidding" },
  { id: "hired", label: "Hired" },
  { id: "completed", label: "Completed" },
]

export const Route = createFileRoute("/dashboard/client/jobs")({
  component: ClientJobsRoute,
})

function ClientJobsRoute() {
  const [active, setActive] = useState<"all" | ClientJobStatus>("all")

  const rows = useMemo(() => {
    if (active === "all") return myJobs
    return myJobs.filter((j) => overviewById.get(j.id)?.status === active)
  }, [active])

  const open = clientJobsOverview.filter((o) => o.status === "open").length
  const bidding = clientJobsOverview.filter((o) => o.status === "bidding").length
  const hired = clientJobsOverview.filter((o) => o.status === "hired").length
  const totalActiveBids = myJobs
    .filter((j) => {
      const s = overviewById.get(j.id)?.status
      return s === "open" || s === "bidding"
    })
    .reduce((s, j) => s + j.bidCount, 0)

  return (
    <ShadcnDashboardShell role="client" title="Posted jobs">
      <div className="grid grid-cols-2 gap-4 px-4 lg:grid-cols-4 lg:px-6">
        <Card>
          <CardHeader>
            <CardDescription>Open jobs</CardDescription>
            <CardTitle className="text-2xl font-semibold">{open + bidding}</CardTitle>
            <p className="text-xs text-muted-foreground">Awaiting hire decision</p>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <CardDescription>Active bids</CardDescription>
            <CardTitle className="text-2xl font-semibold">{totalActiveBids}</CardTitle>
            <p className="text-xs text-muted-foreground">Across all open jobs</p>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <CardDescription>Hired (active)</CardDescription>
            <CardTitle className="text-2xl font-semibold">{hired}</CardTitle>
            <p className="text-xs text-muted-foreground">In escrow-protected build</p>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <CardDescription>Avg time to hire</CardDescription>
            <CardTitle className="text-2xl font-semibold">3.4d</CardTitle>
            <p className="text-xs text-muted-foreground">Across last 5 hires</p>
          </CardHeader>
        </Card>
      </div>

      <SubPage title="My posted jobs" description="Track bids and award contractors.">
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
          <Button size="sm" className="ml-auto" render={<Link to="/jobs/post" />}>
            Post new job
          </Button>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Location</TableHead>
              <TableHead className="text-right">Budget</TableHead>
              <TableHead className="text-right">Bids</TableHead>
              <TableHead className="text-right">Status</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((j) => {
              const ov = overviewById.get(j.id)!
              return (
                <TableRow key={j.id}>
                  <TableCell className="font-medium">
                    <Link
                      to="/jobs/$jobId"
                      params={{ jobId: j.id }}
                      className="hover:text-brand-orange hover:underline"
                    >
                      {j.title}
                    </Link>
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary">{j.category}</Badge>
                  </TableCell>
                  <TableCell>{j.location}</TableCell>
                  <TableCell className="text-right">{j.budget}</TableCell>
                  <TableCell className="text-right">
                    <span className="inline-flex items-center gap-1.5">
                      {j.bidCount}
                      {ov.newBidsSinceLastView > 0 && (
                        <Badge variant="outline" className="text-brand-orange">
                          +{ov.newBidsSinceLastView} new
                        </Badge>
                      )}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <Badge variant={statusVariant[ov.status]}>{statusLabel[ov.status]}</Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    {(ov.status === "open" || ov.status === "bidding") && (
                      <Button
                        size="sm"
                        variant="outline"
                        render={<Link to="/jobs/$jobId" params={{ jobId: j.id }} />}
                      >
                        View bids
                      </Button>
                    )}
                    {ov.status === "hired" && (
                      <span className="text-xs text-muted-foreground">{ov.hiredContractor}</span>
                    )}
                    {ov.status === "completed" && (
                      <span className="text-xs text-muted-foreground">—</span>
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
