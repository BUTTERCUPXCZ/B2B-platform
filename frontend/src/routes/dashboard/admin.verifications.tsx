import { Fragment, useMemo, useState } from "react"
import { createFileRoute } from "@tanstack/react-router"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  ArrowDown01Icon,
  ArrowRight01Icon,
  CheckmarkBadge01Icon,
  Tick02Icon,
  AlertCircleIcon,
  Image01Icon,
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
import {
  adminVerifications,
  type AdminVerificationItem,
} from "@/components/dashboard/admin-data"
import { cn } from "@/lib/utils"

const statusVariant: Record<AdminVerificationItem["status"], "outline" | "secondary" | "destructive"> = {
  pending: "secondary",
  approved: "outline",
  rejected: "destructive",
  needs_info: "secondary",
}

const statusLabel: Record<AdminVerificationItem["status"], string> = {
  pending: "Pending",
  approved: "Approved",
  rejected: "Rejected",
  needs_info: "Needs info",
}

type FilterState = "all" | AdminVerificationItem["status"]

const filterChips: { id: FilterState; label: string }[] = [
  { id: "all", label: "All" },
  { id: "pending", label: "Pending" },
  { id: "needs_info", label: "Needs info" },
  { id: "approved", label: "Approved" },
  { id: "rejected", label: "Rejected" },
]

export const Route = createFileRoute("/dashboard/admin/verifications")({
  component: AdminVerificationsRoute,
})

function AdminVerificationsRoute() {
  const [active, setActive] = useState<FilterState>("all")
  const [open, setOpen] = useState<string | null>(null)

  const filtered = useMemo(
    () => (active === "all" ? adminVerifications : adminVerifications.filter((v) => v.status === active)),
    [active],
  )

  const pending = adminVerifications.filter((v) => v.status === "pending").length
  const approved30d = adminVerifications.filter((v) => v.status === "approved").length
  const rejected30d = adminVerifications.filter((v) => v.status === "rejected").length

  return (
    <ShadcnDashboardShell role="admin" title="Verifications">
      <div className="grid grid-cols-2 gap-4 px-4 lg:grid-cols-4 lg:px-6">
        <Card>
          <CardHeader>
            <CardDescription>Pending</CardDescription>
            <CardTitle className="text-2xl font-semibold">{pending}</CardTitle>
            <p className="text-xs text-muted-foreground">Awaiting reviewer decision</p>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <CardDescription>Approved (30d)</CardDescription>
            <CardTitle className="text-2xl font-semibold">{approved30d}</CardTitle>
            <p className="text-xs text-muted-foreground">Across all tiers</p>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <CardDescription>Rejected (30d)</CardDescription>
            <CardTitle className="text-2xl font-semibold">{rejected30d}</CardTitle>
            <p className="text-xs text-muted-foreground">With reviewer notes</p>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <CardDescription>Avg review time</CardDescription>
            <CardTitle className="text-2xl font-semibold">14h</CardTitle>
            <p className="text-xs text-muted-foreground">Submission to ruling</p>
          </CardHeader>
        </Card>
      </div>

      <SubPage
        title="Verification queue"
        description="Review KYC documents. Expand a row to see uploads and rule on the application."
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
            {filtered.length} of {adminVerifications.length}
          </span>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-8" />
              <TableHead>Submitted</TableHead>
              <TableHead>Applicant</TableHead>
              <TableHead>Kind</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Reviewer</TableHead>
              <TableHead className="text-right">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((v) => {
              const isOpen = open === v.id
              return (
                <Fragment key={v.id}>
                  <TableRow
                    onClick={() => setOpen(isOpen ? null : v.id)}
                    className="cursor-pointer"
                  >
                    <TableCell>
                      <HugeiconsIcon
                        icon={isOpen ? ArrowDown01Icon : ArrowRight01Icon}
                        className="size-4 text-muted-foreground"
                        strokeWidth={2}
                      />
                    </TableCell>
                    <TableCell className="text-xs text-muted-foreground">{v.submittedOn}</TableCell>
                    <TableCell className="font-medium">{v.applicant}</TableCell>
                    <TableCell>
                      <Badge variant="secondary">{v.applicantKind}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">
                        <HugeiconsIcon icon={CheckmarkBadge01Icon} strokeWidth={2} />
                        {v.type}
                      </Badge>
                    </TableCell>
                    <TableCell>{v.reviewer}</TableCell>
                    <TableCell className="text-right">
                      <Badge variant={statusVariant[v.status]}>
                        {v.status === "approved" && (
                          <HugeiconsIcon icon={Tick02Icon} strokeWidth={2.5} />
                        )}
                        {v.status === "rejected" && (
                          <HugeiconsIcon icon={AlertCircleIcon} strokeWidth={2.5} />
                        )}
                        {statusLabel[v.status]}
                      </Badge>
                    </TableCell>
                  </TableRow>
                  {isOpen && (
                    <TableRow className="bg-muted/40 hover:bg-muted/40">
                      <TableCell />
                      <TableCell colSpan={6}>
                        <div className="grid grid-cols-1 gap-4 py-3 lg:grid-cols-3">
                          <div className="lg:col-span-2">
                            <p className="text-[10px] font-semibold tracking-widest text-muted-foreground uppercase">
                              Documents
                            </p>
                            <div className="mt-2 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                              {v.documents.map((d) => (
                                <div
                                  key={d.id}
                                  className="overflow-hidden rounded-lg border border-border bg-white"
                                >
                                  <div className="aspect-video w-full bg-muted">
                                    <img
                                      src={d.thumb}
                                      alt={d.label}
                                      className="size-full object-cover opacity-90"
                                    />
                                  </div>
                                  <div className="flex items-center justify-between gap-2 p-2">
                                    <div className="flex min-w-0 items-center gap-1.5">
                                      <HugeiconsIcon
                                        icon={Image01Icon}
                                        className="size-3 shrink-0 text-muted-foreground"
                                        strokeWidth={2}
                                      />
                                      <span className="truncate text-xs font-medium">{d.label}</span>
                                    </div>
                                    <Button size="sm" variant="ghost">
                                      Open
                                    </Button>
                                  </div>
                                </div>
                              ))}
                            </div>
                            <div className="mt-3">
                              <p className="text-[10px] font-semibold tracking-widest text-muted-foreground uppercase">
                                Reviewer notes
                              </p>
                              <textarea
                                rows={2}
                                placeholder="Add note before ruling…"
                                className="mt-1 w-full rounded-md border border-border bg-white px-3 py-2 text-sm focus-visible:border-brand-orange focus-visible:outline-none"
                              />
                            </div>
                          </div>
                          <div className="flex flex-col gap-2">
                            <p className="text-[10px] font-semibold tracking-widest text-muted-foreground uppercase">
                              Decision
                            </p>
                            {v.status === "pending" || v.status === "needs_info" ? (
                              <>
                                <Button size="sm">Approve</Button>
                                <Button size="sm" variant="outline">
                                  Reject (with reason)
                                </Button>
                                <Button size="sm" variant="ghost">
                                  Request more info
                                </Button>
                              </>
                            ) : (
                              <p className="text-xs text-muted-foreground">
                                Already ruled — {statusLabel[v.status]}
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
