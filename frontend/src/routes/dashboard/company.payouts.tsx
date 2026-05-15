import { Fragment, useState } from "react"
import { createFileRoute } from "@tanstack/react-router"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  ArrowDown01Icon,
  ArrowRight01Icon,
  BankIcon,
  ChartLineData01Icon,
  Coins01Icon,
  InformationCircleIcon,
} from "@hugeicons/core-free-icons"

import { ShadcnDashboardShell } from "@/components/dashboard/shadcn-dashboard"
import { SubPage } from "@/components/dashboard/sub-page"
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
import { companySalesPeriods } from "@/components/dashboard/company-data"
import { cn } from "@/lib/utils"

export const Route = createFileRoute("/dashboard/company/payouts")({
  component: CompanySalesRoute,
})

function formatWindow(start: string, end: string) {
  const fmt = (iso: string) =>
    new Date(iso).toLocaleDateString("en-PH", { month: "short", day: "numeric" })
  return `${fmt(start)} – ${fmt(end)}`
}

function CompanySalesRoute() {
  const [open, setOpen] = useState<string | null>(companySalesPeriods[0]?.id ?? null)

  const sales30d = companySalesPeriods.slice(0, 2).reduce((s, p) => s + p.netToBank, 0)
  const lifetimeGross = companySalesPeriods.reduce((s, p) => s + p.gross, 0)
  const lifetimeCommission = companySalesPeriods.reduce((s, p) => s + p.commission, 0)
  const bankMasked = companySalesPeriods[0]?.bankMasked ?? "—"

  return (
    <ShadcnDashboardShell role="company" title="Sales">
      <div className="grid grid-cols-2 gap-4 px-4 lg:grid-cols-4 lg:px-6">
        <Card>
          <CardHeader>
            <CardDescription>Net to bank (30d)</CardDescription>
            <CardTitle className="flex items-center gap-2 text-2xl font-semibold">
              <HugeiconsIcon icon={ChartLineData01Icon} className="size-5 text-brand-orange" strokeWidth={2} />
              {peso(sales30d)}
            </CardTitle>
            <p className="text-xs text-muted-foreground">Across last 2 fortnightly periods</p>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <CardDescription>Gross sales (lifetime)</CardDescription>
            <CardTitle className="text-2xl font-semibold">{peso(lifetimeGross)}</CardTitle>
            <p className="text-xs text-muted-foreground">Before platform commission</p>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <CardDescription>Commission paid (lifetime)</CardDescription>
            <CardTitle className="flex items-center gap-2 text-2xl font-semibold">
              <HugeiconsIcon icon={Coins01Icon} className="size-5 text-muted-foreground" strokeWidth={2} />
              {peso(lifetimeCommission)}
            </CardTitle>
            <p className="text-xs text-muted-foreground">Deducted at checkout</p>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <CardDescription>Deposit account</CardDescription>
            <CardTitle className="flex items-center gap-2 text-xl font-semibold">
              <HugeiconsIcon icon={BankIcon} className="size-5 text-muted-foreground" strokeWidth={2} />
              {bankMasked}
            </CardTitle>
            <p className="text-xs text-muted-foreground">All customer payments deposit here</p>
          </CardHeader>
        </Card>
      </div>

      <div className="px-4 lg:px-6">
        <div className="flex items-start gap-3 rounded-xl border border-border bg-amber-50/40 p-4">
          <HugeiconsIcon
            icon={InformationCircleIcon}
            className="mt-0.5 size-5 shrink-0 text-amber-600"
            strokeWidth={2}
          />
          <div className="text-sm text-brand-black/80">
            <p className="font-semibold text-brand-black">
              Customer payments deposit directly to your bank.
            </p>
            <p className="mt-0.5 text-muted-foreground">
              STRUKTURA deducts platform commission at checkout. The amounts in
              this report are what reached your bank account — there is no
              waiting period and no platform-held balance.
            </p>
          </div>
        </div>
      </div>

      <SubPage
        title="Sales history"
        description="Each row is a fortnightly settlement summary. Expand to see per-booking detail."
      >
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-8" />
              <TableHead>Period</TableHead>
              <TableHead className="text-right">Bookings</TableHead>
              <TableHead className="text-right">Gross</TableHead>
              <TableHead className="text-right">Commission</TableHead>
              <TableHead className="text-right">Net to bank</TableHead>
              <TableHead>Account</TableHead>
              <TableHead>Reference</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {companySalesPeriods.map((period) => {
              const isOpen = open === period.id
              return (
                <Fragment key={period.id}>
                  <TableRow
                    onClick={() => setOpen(isOpen ? null : period.id)}
                    className="cursor-pointer"
                  >
                    <TableCell>
                      <HugeiconsIcon
                        icon={isOpen ? ArrowDown01Icon : ArrowRight01Icon}
                        className="size-4 text-muted-foreground"
                        strokeWidth={2}
                      />
                    </TableCell>
                    <TableCell className="font-medium">
                      {formatWindow(period.windowStart, period.windowEnd)}
                    </TableCell>
                    <TableCell className="text-right">{period.bookings}</TableCell>
                    <TableCell className="text-right">{peso(period.gross)}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex flex-col items-end leading-tight">
                        <span>−{peso(period.commission)}</span>
                        <span className="text-[10px] text-muted-foreground">
                          avg {(period.commissionAvgRate * 100).toFixed(1)}%
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right font-semibold">
                      {peso(period.netToBank)}
                    </TableCell>
                    <TableCell className="text-xs text-muted-foreground">
                      {period.bankMasked}
                    </TableCell>
                    <TableCell className="font-mono text-xs text-muted-foreground">
                      {period.id}
                    </TableCell>
                  </TableRow>
                  {isOpen && (
                    <TableRow className="bg-muted/40 hover:bg-muted/40">
                      <TableCell />
                      <TableCell colSpan={7}>
                        <div className="py-2">
                          <p className="text-[10px] font-semibold tracking-widest text-muted-foreground uppercase">
                            Sample bookings in this period
                          </p>
                          <div
                            className={cn(
                              "mt-2 grid gap-2",
                              "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
                            )}
                          >
                            {period.lineItems.map((li) => (
                              <div
                                key={li.bookingId}
                                className="rounded-lg border border-border bg-white p-3"
                              >
                                <p className="font-mono text-xs font-semibold text-brand-black">
                                  {li.bookingId}
                                </p>
                                <p className="text-xs text-muted-foreground">{li.customer}</p>
                                <div className="mt-2 grid grid-cols-3 gap-1 text-xs">
                                  <div>
                                    <p className="text-[10px] text-muted-foreground">Gross</p>
                                    <p className="font-medium">{peso(li.gross)}</p>
                                  </div>
                                  <div>
                                    <p className="text-[10px] text-muted-foreground">Fee</p>
                                    <p className="font-medium">
                                      {(li.commissionRate * 100).toFixed(1)}%
                                    </p>
                                  </div>
                                  <div>
                                    <p className="text-[10px] text-muted-foreground">Net</p>
                                    <p className="font-semibold text-emerald-700">{peso(li.net)}</p>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                          <div className="mt-3 flex justify-end">
                            <Button size="sm" variant="outline">
                              Download statement
                            </Button>
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
