import { useMemo, useState } from "react"
import { createFileRoute } from "@tanstack/react-router"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  TruckDeliveryIcon,
  PackageIcon,
  CheckmarkCircle02Icon,
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
  clientOrders,
  type ClientOrderStatus,
} from "@/components/dashboard/client-data"
import { cn } from "@/lib/utils"

const statusVariant: Record<ClientOrderStatus, "outline" | "secondary" | "destructive"> = {
  awaiting_payment: "secondary",
  paid: "outline",
  shipped: "outline",
  delivered: "outline",
  disputed: "destructive",
}

const statusLabel: Record<ClientOrderStatus, string> = {
  awaiting_payment: "Awaiting payment",
  paid: "Paid",
  shipped: "Shipped",
  delivered: "Delivered",
  disputed: "Disputed",
}

const filterChips: { id: "all" | ClientOrderStatus; label: string }[] = [
  { id: "all", label: "All" },
  { id: "awaiting_payment", label: "Awaiting payment" },
  { id: "shipped", label: "Shipped" },
  { id: "delivered", label: "Delivered" },
  { id: "disputed", label: "Disputed" },
]

export const Route = createFileRoute("/dashboard/client/orders")({
  component: ClientOrdersRoute,
})

function ClientOrdersRoute() {
  const [active, setActive] = useState<"all" | ClientOrderStatus>("all")

  const filtered = useMemo(
    () => (active === "all" ? clientOrders : clientOrders.filter((o) => o.status === active)),
    [active],
  )

  const open = clientOrders.filter((o) => o.status === "awaiting_payment" || o.status === "paid").length
  const inTransit = clientOrders.filter((o) => o.status === "shipped").length
  const delivered30d = clientOrders.filter((o) => o.status === "delivered").length
  const spend30d = clientOrders
    .filter((o) => o.status === "delivered" || o.status === "shipped" || o.status === "paid")
    .reduce((s, o) => s + o.total, 0)

  return (
    <ShadcnDashboardShell role="client" title="Material orders">
      <div className="grid grid-cols-2 gap-4 px-4 lg:grid-cols-4 lg:px-6">
        <Card>
          <CardHeader>
            <CardDescription>Open</CardDescription>
            <CardTitle className="text-2xl font-semibold">{open}</CardTitle>
            <p className="text-xs text-muted-foreground">Awaiting payment or fulfillment</p>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <CardDescription>In transit</CardDescription>
            <CardTitle className="text-2xl font-semibold">{inTransit}</CardTitle>
            <p className="text-xs text-muted-foreground">Shipped, not yet delivered</p>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <CardDescription>Delivered (30d)</CardDescription>
            <CardTitle className="text-2xl font-semibold">{delivered30d}</CardTitle>
            <p className="text-xs text-muted-foreground">Confirm to release seller</p>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <CardDescription>Spend (30d)</CardDescription>
            <CardTitle className="text-2xl font-semibold">{peso(spend30d)}</CardTitle>
            <p className="text-xs text-muted-foreground">Across {clientOrders.length} orders</p>
          </CardHeader>
        </Card>
      </div>

      <SubPage title="My material orders" description="Recent purchases from suppliers.">
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
            {filtered.length} of {clientOrders.length}
          </span>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order</TableHead>
              <TableHead>Seller</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Destination</TableHead>
              <TableHead className="text-right">Items</TableHead>
              <TableHead className="text-right">Total</TableHead>
              <TableHead className="text-right">Status</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((o) => (
              <TableRow key={o.id}>
                <TableCell className="font-medium">{o.id}</TableCell>
                <TableCell>{o.seller}</TableCell>
                <TableCell>{o.date}</TableCell>
                <TableCell>{o.destination}</TableCell>
                <TableCell className="text-right">{o.items}</TableCell>
                <TableCell className="text-right">{peso(o.total)}</TableCell>
                <TableCell className="text-right">
                  <Badge variant={statusVariant[o.status]}>
                    {o.status === "awaiting_payment" && (
                      <HugeiconsIcon icon={PackageIcon} strokeWidth={2} />
                    )}
                    {o.status === "shipped" && (
                      <HugeiconsIcon icon={TruckDeliveryIcon} strokeWidth={2} />
                    )}
                    {o.status === "delivered" && (
                      <HugeiconsIcon icon={CheckmarkCircle02Icon} strokeWidth={2} />
                    )}
                    {o.status === "disputed" && (
                      <HugeiconsIcon icon={AlertCircleIcon} strokeWidth={2} />
                    )}
                    {statusLabel[o.status]}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  {o.status === "awaiting_payment" && <Button size="sm">Pay now</Button>}
                  {o.status === "shipped" && (
                    <Button size="sm" variant="outline">
                      Track
                    </Button>
                  )}
                  {o.status === "delivered" && !o.confirmed && (
                    <Button size="sm">Confirm delivery</Button>
                  )}
                  {o.status === "delivered" && o.confirmed && (
                    <Button size="sm" variant="outline">
                      Reorder
                    </Button>
                  )}
                  {o.status === "disputed" && (
                    <Button size="sm" variant="outline">
                      View case
                    </Button>
                  )}
                  {o.status === "paid" && (
                    <span className="text-xs text-muted-foreground">Awaiting ship</span>
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
