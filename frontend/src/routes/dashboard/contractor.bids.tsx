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
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { peso } from "@/components/shared/price-tag"
import { jobs } from "@/components/jobs/jobs-data"
import {
  contractorBids,
  type ContractorBidStatus,
} from "@/components/dashboard/contractor-data"

const statusVariant: Record<ContractorBidStatus, "outline" | "secondary" | "destructive"> = {
  pending: "secondary",
  won: "outline",
  lost: "destructive",
  withdrawn: "secondary",
}

const tabs: { id: "all" | ContractorBidStatus; label: string }[] = [
  { id: "all", label: "All" },
  { id: "pending", label: "Pending" },
  { id: "won", label: "Won" },
  { id: "lost", label: "Lost" },
  { id: "withdrawn", label: "Withdrawn" },
]

export const Route = createFileRoute("/dashboard/contractor/bids")({
  component: ContractorBidsRoute,
})

function ContractorBidsRoute() {
  const [active, setActive] = useState<"all" | ContractorBidStatus>("all")

  const counts = useMemo(() => {
    return contractorBids.reduce(
      (acc, b) => ({
        ...acc,
        [b.status]: (acc[b.status] ?? 0) + 1,
        all: acc.all + 1,
      }),
      { all: 0 } as Record<string, number>,
    )
  }, [])

  const filtered = useMemo(
    () => (active === "all" ? contractorBids : contractorBids.filter((b) => b.status === active)),
    [active],
  )

  const inFlight = counts.pending ?? 0
  const won = counts.won ?? 0
  const lost = counts.lost ?? 0
  const decided = won + lost
  const winRate = decided ? Math.round((won / decided) * 100) : 0
  const avgBidValue =
    contractorBids.reduce((s, b) => s + b.amount, 0) / Math.max(contractorBids.length, 1)

  return (
    <ShadcnDashboardShell role="contractor" title="My bids">
      <div className="grid grid-cols-2 gap-4 px-4 lg:grid-cols-4 lg:px-6">
        <Card>
          <CardHeader>
            <CardDescription>Bids in flight</CardDescription>
            <CardTitle className="text-2xl font-semibold">{inFlight}</CardTitle>
            <p className="text-xs text-muted-foreground">Awaiting client decision</p>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <CardDescription>Win rate (90d)</CardDescription>
            <CardTitle className="text-2xl font-semibold">{winRate}%</CardTitle>
            <p className="text-xs text-muted-foreground">
              {won} won · {lost} lost
            </p>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <CardDescription>Avg bid value</CardDescription>
            <CardTitle className="text-2xl font-semibold">{peso(Math.round(avgBidValue))}</CardTitle>
            <p className="text-xs text-muted-foreground">Across all submitted bids</p>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <CardDescription>Avg client response</CardDescription>
            <CardTitle className="text-2xl font-semibold">2.1d</CardTitle>
            <p className="text-xs text-muted-foreground">Submission to decision</p>
          </CardHeader>
        </Card>
      </div>

      <SubPage title="Submitted bids" description="Filter by outcome to focus your follow-ups.">
        <Tabs
          value={active}
          onValueChange={(v) => setActive(v as "all" | ContractorBidStatus)}
          className="mb-4"
        >
          <TabsList variant="line">
            {tabs.map((t) => (
              <TabsTrigger key={t.id} value={t.id}>
                {t.label}
                <span className="ml-1 rounded-full bg-muted px-1.5 text-[10px] tracking-normal normal-case">
                  {t.id === "all" ? counts.all : counts[t.id] ?? 0}
                </span>
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Project</TableHead>
              <TableHead>Client</TableHead>
              <TableHead className="text-right">Bid</TableHead>
              <TableHead className="text-right">Timeline</TableHead>
              <TableHead className="text-right">Milestones</TableHead>
              <TableHead className="text-right">Submitted</TableHead>
              <TableHead className="text-right">Status</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((b) => {
              const job = jobs.find((j) => j.id === b.jobId)
              return (
                <TableRow key={b.id}>
                  <TableCell className="font-medium">
                    {job ? (
                      <Link
                        to="/jobs/$jobId"
                        params={{ jobId: job.id }}
                        className="hover:text-brand-orange hover:underline"
                      >
                        {job.title}
                      </Link>
                    ) : (
                      "—"
                    )}
                  </TableCell>
                  <TableCell>{b.clientName}</TableCell>
                  <TableCell className="text-right">{peso(b.amount)}</TableCell>
                  <TableCell className="text-right">{b.timelineDays}d</TableCell>
                  <TableCell className="text-right">{b.milestoneCount}</TableCell>
                  <TableCell className="text-right text-muted-foreground">{b.submittedDate}</TableCell>
                  <TableCell className="text-right">
                    <Badge variant={statusVariant[b.status]}>{b.status}</Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    {b.status === "pending" && (
                      <Button size="sm" variant="outline">
                        Withdraw
                      </Button>
                    )}
                    {b.status === "won" && (
                      <Button
                        size="sm"
                        variant="outline"
                        render={<Link to="/dashboard/contractor/projects" />}
                      >
                        View project
                      </Button>
                    )}
                    {(b.status === "lost" || b.status === "withdrawn") && (
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
