import { Fragment, useMemo, useState } from "react"
import { createFileRoute } from "@tanstack/react-router"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  ArrowDown01Icon,
  ArrowRight01Icon,
  AlertCircleIcon,
  AlarmClockIcon,
  Tick02Icon,
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
  adminDisputes,
  type AdminDisputeStatus,
} from "@/components/dashboard/admin-data"
import { cn } from "@/lib/utils"

const TODAY = "2026-05-08"

function daysFromToday(iso: string) {
  const a = new Date(iso).getTime()
  const b = new Date(TODAY).getTime()
  return Math.round((a - b) / 86_400_000)
}

const statusVariant: Record<AdminDisputeStatus, "outline" | "secondary" | "destructive"> = {
  open: "destructive",
  awaiting_evidence: "secondary",
  ruled_refund: "outline",
  ruled_release: "outline",
  ruled_split: "outline",
  closed: "outline",
}

const statusLabel: Record<AdminDisputeStatus, string> = {
  open: "Open",
  awaiting_evidence: "Awaiting evidence",
  ruled_refund: "Ruled — refund",
  ruled_release: "Ruled — release",
  ruled_split: "Ruled — split",
  closed: "Closed",
}

type FilterState = "all" | "open" | "awaiting_evidence" | "resolved"

const filterChips: { id: FilterState; label: string }[] = [
  { id: "all", label: "All" },
  { id: "open", label: "Open" },
  { id: "awaiting_evidence", label: "Awaiting evidence" },
  { id: "resolved", label: "Resolved" },
]

export const Route = createFileRoute("/dashboard/admin/disputes")({
  component: AdminDisputesRoute,
})

function AdminDisputesRoute() {
  const [active, setActive] = useState<FilterState>("all")
  const [open, setOpen] = useState<string | null>(null)

  const filtered = useMemo(() => {
    if (active === "all") return adminDisputes
    if (active === "open") return adminDisputes.filter((d) => d.status === "open")
    if (active === "awaiting_evidence")
      return adminDisputes.filter((d) => d.status === "awaiting_evidence")
    return adminDisputes.filter((d) => d.status.startsWith("ruled_") || d.status === "closed")
  }, [active])

  const openCount = adminDisputes.filter((d) => d.status === "open" || d.status === "awaiting_evidence").length
  const sloBreaches = adminDisputes.filter(
    (d) => (d.status === "open" || d.status === "awaiting_evidence") && daysFromToday(d.sloDeadline) < 0,
  ).length
  const refunded30d = adminDisputes
    .filter((d) => d.status === "ruled_refund" || d.status === "ruled_split")
    .reduce((s, d) => s + d.amount, 0)

  return (
    <ShadcnDashboardShell role="admin" title="Disputes">
      <div className="grid grid-cols-2 gap-4 px-4 lg:grid-cols-4 lg:px-6">
        <Card>
          <CardHeader>
            <CardDescription>Open</CardDescription>
            <CardTitle className="text-2xl font-semibold">{openCount}</CardTitle>
            <p className="text-xs text-muted-foreground">Awaiting reviewer action</p>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <CardDescription>Avg resolution</CardDescription>
            <CardTitle className="text-2xl font-semibold">2.4d</CardTitle>
            <p className="text-xs text-muted-foreground">Within 3-day SLO target</p>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <CardDescription>3-day SLO breaches</CardDescription>
            <CardTitle className="text-2xl font-semibold">{sloBreaches}</CardTitle>
            <p className="text-xs text-muted-foreground">Past deadline</p>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <CardDescription>Refunded volume (30d)</CardDescription>
            <CardTitle className="text-2xl font-semibold">{peso(refunded30d)}</CardTitle>
            <p className="text-xs text-muted-foreground">Across split + refund rulings</p>
          </CardHeader>
        </Card>
      </div>

      <SubPage
        title="Dispute queue"
        description="Reviewer must rule within 3 business days of opening (per platform SLO)."
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
          <span className="ml-auto text-xs text-muted-foreground">
            {filtered.length} of {adminDisputes.length}
          </span>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-8" />
              <TableHead>Ref</TableHead>
              <TableHead>Subject</TableHead>
              <TableHead>Buyer</TableHead>
              <TableHead>Other party</TableHead>
              <TableHead className="text-right">Amount</TableHead>
              <TableHead>Opened</TableHead>
              <TableHead>SLO</TableHead>
              <TableHead className="text-right">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((d) => {
              const isOpen = open === d.id
              const sloDelta = daysFromToday(d.sloDeadline)
              const isLive = d.status === "open" || d.status === "awaiting_evidence"
              return (
                <Fragment key={d.id}>
                  <TableRow
                    onClick={() => setOpen(isOpen ? null : d.id)}
                    className="cursor-pointer"
                  >
                    <TableCell>
                      <HugeiconsIcon
                        icon={isOpen ? ArrowDown01Icon : ArrowRight01Icon}
                        className="size-4 text-muted-foreground"
                        strokeWidth={2}
                      />
                    </TableCell>
                    <TableCell className="font-mono text-xs font-semibold">{d.id}</TableCell>
                    <TableCell>{d.ref}</TableCell>
                    <TableCell>{d.buyer}</TableCell>
                    <TableCell>{d.otherParty}</TableCell>
                    <TableCell className="text-right">{peso(d.amount)}</TableCell>
                    <TableCell className="text-xs text-muted-foreground">{d.openedOn}</TableCell>
                    <TableCell>
                      {isLive ? (
                        <span
                          className={cn(
                            "inline-flex items-center gap-1 text-xs",
                            sloDelta < 0
                              ? "text-destructive"
                              : sloDelta <= 1
                                ? "text-amber-600"
                                : "text-muted-foreground",
                          )}
                        >
                          <HugeiconsIcon icon={AlarmClockIcon} className="size-3.5" strokeWidth={2.5} />
                          {sloDelta < 0
                            ? `${Math.abs(sloDelta)}d past`
                            : sloDelta === 0
                              ? "Today"
                              : `${sloDelta}d left`}
                        </span>
                      ) : (
                        <span className="text-xs text-muted-foreground">—</span>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      <Badge variant={statusVariant[d.status]}>
                        {d.status === "open" && (
                          <HugeiconsIcon icon={AlertCircleIcon} strokeWidth={2.5} />
                        )}
                        {d.status.startsWith("ruled_") && (
                          <HugeiconsIcon icon={Tick02Icon} strokeWidth={2.5} />
                        )}
                        {statusLabel[d.status]}
                      </Badge>
                    </TableCell>
                  </TableRow>
                  {isOpen && (
                    <TableRow className="bg-muted/40 hover:bg-muted/40">
                      <TableCell />
                      <TableCell colSpan={8}>
                        <div className="grid grid-cols-1 gap-4 py-3 lg:grid-cols-3">
                          <div className="lg:col-span-2">
                            <p className="text-[10px] font-semibold tracking-widest text-muted-foreground uppercase">
                              Summary
                            </p>
                            <p className="mt-0.5 text-sm">{d.summary}</p>

                            <p className="mt-3 text-[10px] font-semibold tracking-widest text-muted-foreground uppercase">
                              Timeline
                            </p>
                            <ul className="mt-1 space-y-1 text-sm">
                              {d.timeline.map((ev, idx) => (
                                <li key={idx} className="flex items-start gap-3 border-l-2 border-border pl-3">
                                  <div>
                                    <p className="text-xs text-muted-foreground">{ev.date}</p>
                                    <p>
                                      <span className="font-semibold">{ev.actor}</span>: {ev.text}
                                    </p>
                                  </div>
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div className="flex flex-col gap-2">
                            <p className="text-[10px] font-semibold tracking-widest text-muted-foreground uppercase">
                              Decision
                            </p>
                            {isLive ? (
                              <>
                                <Button size="sm">Refund buyer</Button>
                                <Button size="sm" variant="outline">
                                  Release escrow
                                </Button>
                                <Button size="sm" variant="ghost">
                                  Split 50/50
                                </Button>
                                <Button size="sm" variant="ghost">
                                  Request more info
                                </Button>
                              </>
                            ) : (
                              <p className="text-xs text-muted-foreground">
                                Closed · {statusLabel[d.status]}
                              </p>
                            )}
                          </div>
                        </div>
                      </TableCell>
                    </TableRow>
                  )}
                </Fragment>
              )
            })}
          </TableBody>
        </Table>
      </SubPage>
    </ShadcnDashboardShell>
  )
}
