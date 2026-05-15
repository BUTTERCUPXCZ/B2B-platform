import { useMemo, useState } from "react"
import { createFileRoute } from "@tanstack/react-router"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  TruckDeliveryIcon,
  PackageIcon,
  CheckmarkCircle02Icon,
  AlertCircleIcon,
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
import { cn } from "@/lib/utils"

type OrderStatus =
  | "pending"
  | "paid"
  | "ready_to_ship"
  | "shipped"
  | "delivered"
  | "disputed"
  | "cancelled"

type Order = {
  id: string
  buyer: string
  date: string
  items: number
  total: number
  status: OrderStatus
  destination: string
  commissionRate: number
}

const orders: Order[] = [
  { id: "KSK-00012420", buyer: "Marlon R.", date: "2026-04-29", items: 7, total: 42_180, status: "pending", destination: "Quezon City", commissionRate: 0.10 },
  { id: "KSK-00012412", buyer: "Selena C.", date: "2026-04-28", items: 5, total: 27_900, status: "paid", destination: "Mandaluyong", commissionRate: 0.10 },
  { id: "KSK-00012398", buyer: "Elena M.", date: "2026-04-26", items: 2, total: 6_290, status: "ready_to_ship", destination: "Makati", commissionRate: 0.075 },
  { id: "KSK-00012386", buyer: "Daniel O.", date: "2026-04-25", items: 4, total: 18_540, status: "shipped", destination: "Pasig", commissionRate: 0.10 },
  { id: "KSK-00012345", buyer: "Renz B.", date: "2026-04-22", items: 4, total: 18_540, status: "delivered", destination: "Caloocan", commissionRate: 0.10 },
  { id: "KSK-00012301", buyer: "Aileen R.", date: "2026-04-19", items: 1, total: 3_499, status: "delivered", destination: "Mandaluyong", commissionRate: 0.05 },
  { id: "KSK-00012254", buyer: "Carlo D.", date: "2026-04-15", items: 12, total: 65_400, status: "delivered", destination: "Tagaytay", commissionRate: 0.125 },
  { id: "KSK-00012238", buyer: "Joaquin P.", date: "2026-04-13", items: 6, total: 31_200, status: "disputed", destination: "Las Piñas", commissionRate: 0.10 },
  { id: "KSK-00012211", buyer: "Maria S.", date: "2026-04-12", items: 3, total: 9_290, status: "cancelled", destination: "Quezon City", commissionRate: 0.075 },
]

const statusVariant: Record<OrderStatus, "outline" | "secondary" | "destructive"> = {
  pending: "secondary",
  paid: "outline",
  ready_to_ship: "secondary",
  shipped: "outline",
  delivered: "outline",
  disputed: "destructive",
  cancelled: "destructive",
}

const statusLabel: Record<OrderStatus, string> = {
  pending: "Pending",
  paid: "Paid",
  ready_to_ship: "Ready to ship",
  shipped: "Shipped",
  delivered: "Delivered",
  disputed: "Disputed",
  cancelled: "Cancelled",
}

const filterChips: { id: "all" | OrderStatus; label: string }[] = [
  { id: "all", label: "All" },
  { id: "pending", label: "Pending" },
  { id: "paid", label: "Paid" },
  { id: "ready_to_ship", label: "Ready" },
  { id: "shipped", label: "Shipped" },
  { id: "delivered", label: "Delivered" },
  { id: "disputed", label: "Disputed" },
]

export const Route = createFileRoute("/dashboard/seller/orders")({
  component: SellerOrdersRoute,
})

function paymentLabel(status: OrderStatus): { text: string; tone: "success" | "muted" | "danger" } {
  if (status === "paid" || status === "shipped" || status === "delivered") {
    return { text: "Direct to bank", tone: "success" }
  }
  if (status === "disputed") return { text: "Held — disputed", tone: "danger" }
  if (status === "cancelled") return { text: "Refunded", tone: "muted" }
  return { text: "Awaiting payment", tone: "muted" }
}

function SellerOrdersRoute() {
  const [active, setActive] = useState<"all" | OrderStatus>("all")

  const filtered = useMemo(
    () => (active === "all" ? orders : orders.filter((o) => o.status === active)),
    [active],
  )

  const pending = orders.filter((o) => o.status === "pending").length
  const ready = orders.filter((o) => o.status === "ready_to_ship").length
  const shipped = orders.filter((o) => o.status === "shipped").length
  const delivered = orders.filter((o) => o.status === "delivered").length
  const totalRevenue = orders
    .filter((o) => o.status !== "cancelled" && o.status !== "disputed")
    .reduce((s, o) => s + o.total * (1 - o.commissionRate), 0)

  return (
    <ShadcnDashboardShell role="seller" title="Orders">
      <div className="grid grid-cols-2 gap-4 px-4 lg:grid-cols-4 lg:px-6">
        <Card>
          <CardHeader>
            <CardDescription>Pending</CardDescription>
            <CardTitle className="text-2xl font-semibold">{pending}</CardTitle>
            <p className="text-xs text-muted-foreground">Need acknowledgement</p>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <CardDescription>Ready to ship</CardDescription>
            <CardTitle className="text-2xl font-semibold">{ready}</CardTitle>
            <p className="text-xs text-muted-foreground">Pickup awaiting courier</p>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <CardDescription>In transit</CardDescription>
            <CardTitle className="text-2xl font-semibold">{shipped}</CardTitle>
            <p className="text-xs text-muted-foreground">Out for delivery</p>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <CardDescription>Net to bank (30d)</CardDescription>
            <CardTitle className="text-2xl font-semibold">{peso(totalRevenue)}</CardTitle>
            <p className="text-xs text-muted-foreground">{delivered} delivered · after commission</p>
          </CardHeader>
        </Card>
      </div>

      <SubPage
        title="All orders"
        description="Acknowledge, pack, and dispatch buyer orders. Buyer payments deposit directly to your bank."
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
            {filtered.length} of {orders.length}
          </span>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order</TableHead>
              <TableHead>Buyer</TableHead>
              <TableHead>Destination</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="text-right">Items</TableHead>
              <TableHead className="text-right">Total</TableHead>
              <TableHead>Payment</TableHead>
              <TableHead className="text-right">Status</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((o) => {
              const fee = Math.round(o.total * o.commissionRate)
              const payment = paymentLabel(o.status)
              return (
                <TableRow key={o.id}>
                  <TableCell className="font-medium">{o.id}</TableCell>
                  <TableCell>{o.buyer}</TableCell>
                  <TableCell>{o.destination}</TableCell>
                  <TableCell>{o.date}</TableCell>
                  <TableCell className="text-right">{o.items}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex flex-col items-end leading-tight">
                      <span>{peso(o.total)}</span>
                      <span className="text-[10px] text-muted-foreground">
                        −{peso(fee)} fee · {(o.commissionRate * 100).toFixed(1)}%
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span
                      className={cn(
                        "inline-flex items-center gap-1 text-xs",
                        payment.tone === "success" && "text-emerald-600",
                        payment.tone === "danger" && "text-destructive",
                        payment.tone === "muted" && "text-muted-foreground",
                      )}
                    >
                      {payment.tone === "success" && (
                        <HugeiconsIcon icon={Tick02Icon} className="size-3.5" strokeWidth={2.5} />
                      )}
                      {payment.tone === "danger" && (
                        <HugeiconsIcon icon={AlertCircleIcon} className="size-3.5" strokeWidth={2.5} />
                      )}
                      {payment.text}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <Badge variant={statusVariant[o.status]}>
                      {o.status === "pending" && <HugeiconsIcon icon={PackageIcon} strokeWidth={2} />}
                      {o.status === "shipped" && <HugeiconsIcon icon={TruckDeliveryIcon} strokeWidth={2} />}
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
                    {o.status === "pending" && <Button size="sm">Acknowledge</Button>}
                    {o.status === "paid" && (
                      <Button size="sm" variant="outline">
                        Prepare ship
                      </Button>
                    )}
                    {o.status === "ready_to_ship" && (
                      <Button size="sm" variant="outline">
                        Mark shipped
                      </Button>
                    )}
                    {o.status === "shipped" && (
                      <Button size="sm" variant="outline">
                        Track
                      </Button>
                    )}
                    {o.status === "disputed" && (
                      <Button size="sm" variant="outline">
                        Open case
                      </Button>
                    )}
                    {(o.status === "delivered" || o.status === "cancelled") && (
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
