import { useMemo, useState } from "react"
import { createFileRoute } from "@tanstack/react-router"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  Calendar03Icon,
  CheckmarkCircle02Icon,
  TruckDeliveryIcon,
  AlertCircleIcon,
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
  companyBookings,
  type CompanyBookingStatus,
} from "@/components/dashboard/company-data"
import { cn } from "@/lib/utils"

const statusVariant: Record<CompanyBookingStatus, "outline" | "secondary" | "destructive"> = {
  pending: "secondary",
  confirmed: "outline",
  in_progress: "outline",
  completed: "outline",
  cancelled: "destructive",
}

const statusLabel: Record<CompanyBookingStatus, string> = {
  pending: "Pending",
  confirmed: "Confirmed",
  in_progress: "In progress",
  completed: "Completed",
  cancelled: "Cancelled",
}

const filterChips: { id: "all" | CompanyBookingStatus; label: string }[] = [
  { id: "all", label: "All" },
  { id: "pending", label: "Pending" },
  { id: "confirmed", label: "Confirmed" },
  { id: "in_progress", label: "In progress" },
  { id: "completed", label: "Completed" },
  { id: "cancelled", label: "Cancelled" },
]

export const Route = createFileRoute("/dashboard/company/bookings")({
  component: CompanyBookingsRoute,
})

function CompanyBookingsRoute() {
  const [active, setActive] = useState<"all" | CompanyBookingStatus>("all")

  const filtered = useMemo(
    () => (active === "all" ? companyBookings : companyBookings.filter((b) => b.status === active)),
    [active],
  )

  const pending = companyBookings.filter((b) => b.status === "pending").length
  const confirmed = companyBookings.filter((b) => b.status === "confirmed").length
  const inProgress = companyBookings.filter((b) => b.status === "in_progress").length
  const completed30d = companyBookings.filter((b) => b.status === "completed").length

  return (
    <ShadcnDashboardShell role="company" title="Bookings">
      <div className="grid grid-cols-2 gap-4 px-4 lg:grid-cols-4 lg:px-6">
        <Card>
          <CardHeader>
            <CardDescription>Pending</CardDescription>
            <CardTitle className="text-2xl font-semibold">{pending}</CardTitle>
            <p className="text-xs text-muted-foreground">Need accept/decline</p>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <CardDescription>Confirmed</CardDescription>
            <CardTitle className="text-2xl font-semibold">{confirmed}</CardTitle>
            <p className="text-xs text-muted-foreground">Scheduled, awaiting start</p>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <CardDescription>In progress</CardDescription>
            <CardTitle className="text-2xl font-semibold">{inProgress}</CardTitle>
            <p className="text-xs text-muted-foreground">Crew dispatched</p>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <CardDescription>Completed (30d)</CardDescription>
            <CardTitle className="text-2xl font-semibold">{completed30d}</CardTitle>
            <p className="text-xs text-muted-foreground">Net to bank deposited</p>
          </CardHeader>
        </Card>
      </div>

      <SubPage
        title="Booking requests"
        description="Customer payments deposit directly to your bank on completion."
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
            {filtered.length} of {companyBookings.length}
          </span>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Ref</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Service</TableHead>
              <TableHead>Scheduled</TableHead>
              <TableHead>Location</TableHead>
              <TableHead className="text-right">Total</TableHead>
              <TableHead className="text-right">Status</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((b) => (
              <TableRow key={b.id}>
                <TableCell className="font-mono text-xs font-semibold">{b.id}</TableCell>
                <TableCell>{b.customer}</TableCell>
                <TableCell>{b.serviceName}</TableCell>
                <TableCell>{b.scheduled}</TableCell>
                <TableCell>{b.location}</TableCell>
                <TableCell className="text-right">{peso(b.total)}</TableCell>
                <TableCell className="text-right">
                  <Badge variant={statusVariant[b.status]}>
                    {b.status === "pending" && (
                      <HugeiconsIcon icon={Calendar03Icon} strokeWidth={2} />
                    )}
                    {b.status === "in_progress" && (
                      <HugeiconsIcon icon={TruckDeliveryIcon} strokeWidth={2} />
                    )}
                    {b.status === "completed" && (
                      <HugeiconsIcon icon={CheckmarkCircle02Icon} strokeWidth={2} />
                    )}
                    {b.status === "cancelled" && (
                      <HugeiconsIcon icon={AlertCircleIcon} strokeWidth={2} />
                    )}
                    {statusLabel[b.status]}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  {b.status === "pending" && (
                    <div className="flex justify-end gap-1">
                      <Button size="sm">Accept</Button>
                      <Button size="sm" variant="ghost">
                        Decline
                      </Button>
                    </div>
                  )}
                  {b.status === "confirmed" && (
                    <Button size="sm" variant="outline">
                      Mark in progress
                    </Button>
                  )}
                  {b.status === "in_progress" && (
                    <Button size="sm">Mark complete</Button>
                  )}
                  {(b.status === "completed" || b.status === "cancelled") && (
                    <span className="text-xs text-muted-foreground">—</span>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </SubPage>
    </ShadcnDashboardShell>
  )
}
