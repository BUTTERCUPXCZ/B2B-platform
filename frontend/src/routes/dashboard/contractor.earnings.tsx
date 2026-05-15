import { Fragment, useMemo, useState } from "react"
import { createFileRoute, Link } from "@tanstack/react-router"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  ArrowDown01Icon,
  ArrowRight01Icon,
  BankIcon,
  Wallet01Icon,
  InformationCircleIcon,
  Tick02Icon,
  AlertCircleIcon,
} from "@hugeicons/core-free-icons"

import { ShadcnDashboardShell } from "@/components/dashboard/shadcn-dashboard"
import { SubPage } from "@/components/dashboard/sub-page"
import { Badge } from "@/components/ui/badge"
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
  contractorEarnings,
  type EarningEntryStatus,
} from "@/components/dashboard/contractor-data"
import { cn } from "@/lib/utils"

const statusVariant: Record<EarningEntryStatus, "outline" | "secondary" | "destructive"> = {
  released: "outline",
  held: "secondary",
  disputed: "destructive",
}

const statusLabel: Record<EarningEntryStatus, string> = {
  released: "Released",
  held: "Held in escrow",
  disputed: "Disputed",
}

const filterChips: { id: "all" | EarningEntryStatus; label: string }[] = [
  { id: "all", label: "All" },
  { id: "held", label: "Held" },
  { id: "released", label: "Released" },
  { id: "disputed", label: "Disputed" },
]

export const Route = createFileRoute("/dashboard/contractor/earnings")({
  component: ContractorEarningsRoute,
})

function ContractorEarningsRoute() {
  const [active, setActive] = useState<"all" | EarningEntryStatus>("all")
  const [open, setOpen] = useState<string | null>(null)

  const filtered = useMemo(
    () => (active === "all" ? contractorEarnings : contractorEarnings.filter((e) => e.status === active)),
    [active],
  )

  const heldNow = contractorEarnings
    .filter((e) => e.status === "held")
    .reduce((s, e) => s + e.amount, 0)
  const releasedLifetime = contractorEarnings
    .filter((e) => e.status === "released")
    .reduce((s, e) => s + e.amount, 0)
  const released30d = contractorEarnings
    .filter((e) => e.status === "released" && e.releasedAt && e.releasedAt >= "2026-04-08")
    .reduce((s, e) => s + e.amount, 0)
  const bankMasked = contractorEarnings[0]?.bankMasked ?? "—"

  return (
    <ShadcnDashboardShell role="contractor" title="Earnings">
      <div className="grid grid-cols-2 gap-4 px-4 lg:grid-cols-4 lg:px-6">
        <Card>
          <CardHeader>
            <CardDescription>Released (lifetime)</CardDescription>
            <CardTitle className="flex items-center gap-2 text-2xl font-semibold">
              <HugeiconsIcon icon={Wallet01Icon} className="size-5 text-brand-orange" strokeWidth={2} />
              {peso(releasedLifetime)}
            </CardTitle>
            <p className="text-xs text-muted-foreground">Across all projects</p>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <CardDescription>Held in escrow now</CardDescription>
            <CardTitle className="text-2xl font-semibold">{peso(heldNow)}</CardTitle>
            <p className="text-xs text-muted-foreground">Pending client approval</p>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <CardDescription>Releases (30d)</CardDescription>
            <CardTitle className="text-2xl font-semibold">{peso(released30d)}</CardTitle>
            <p className="text-xs text-muted-foreground">Deposited to your bank</p>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <CardDescription>Deposit account</CardDescription>
            <CardTitle className="flex items-center gap-2 text-xl font-semibold">
              <HugeiconsIcon icon={BankIcon} className="size-5 text-muted-foreground" strokeWidth={2} />
              {bankMasked}
            </CardTitle>
            <p className="text-xs text-muted-foreground">All escrow releases land here</p>
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
              Funds are held in escrow until each milestone is approved.
            </p>
            <p className="mt-0.5 text-muted-foreground">
              STRUKTURA releases approved milestones to your bank — usually within 24h. The held
              balance below is what's still locked pending client approval.
            </p>
          </div>
        </div>
      </div>

      <SubPage
        title="Earnings ledger"
        description="One row per milestone payment. Expand to see milestone notes."
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
            {filtered.length} of {contractorEarnings.length}
          </span>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-8" />
              <TableHead>Reference</TableHead>
              <TableHead>Project</TableHead>
              <TableHead>Milestone</TableHead>
              <TableHead className="text-right">Amount</TableHead>
              <TableHead>Submitted</TableHead>
              <TableHead>Released</TableHead>
              <TableHead className="text-right">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((e) => {
              const isOpen = open === e.id
              return (
                <Fragment key={e.id}>
                  <TableRow
                    onClick={() => setOpen(isOpen ? null : e.id)}
                    className="cursor-pointer"
                  >
                    <TableCell>
                      <HugeiconsIcon
                        icon={isOpen ? ArrowDown01Icon : ArrowRight01Icon}
                        className="size-4 text-muted-foreground"
                        strokeWidth={2}
                      />
                    </TableCell>
                    <TableCell className="font-mono text-xs font-semibold">{e.id}</TableCell>
                    <TableCell>
                      <Link
                        to="/projects/$projectId"
                        params={{ projectId: e.projectId }}
                        className="hover:text-brand-orange hover:underline"
                      >
                        {e.projectTitle}
                      </Link>
                    </TableCell>
                    <TableCell>{e.milestoneTitle}</TableCell>
                    <TableCell className="text-right font-semibold">{peso(e.amount)}</TableCell>
                    <TableCell className="text-xs text-muted-foreground">
                      {e.submittedAt ?? "—"}
                    </TableCell>
                    <TableCell className="text-xs text-muted-foreground">
                      {e.releasedAt ?? "—"}
                    </TableCell>
                    <TableCell className="text-right">
                      <Badge variant={statusVariant[e.status]}>
                        {e.status === "released" && (
                          <HugeiconsIcon icon={Tick02Icon} strokeWidth={2.5} />
                        )}
                        {e.status === "disputed" && (
                          <HugeiconsIcon icon={AlertCircleIcon} strokeWidth={2.5} />
                        )}
                        {statusLabel[e.status]}
                      </Badge>
                    </TableCell>
                  </TableRow>
                  {isOpen && (
                    <TableRow className="bg-muted/40 hover:bg-muted/40">
                      <TableCell />
                      <TableCell colSpan={7}>
                        <div className="grid grid-cols-1 gap-2 py-2 text-xs md:grid-cols-3">
                          <div>
                            <p className="text-[10px] font-semibold tracking-widest text-muted-foreground uppercase">
                              Deposit account
                            </p>
                            <p className="font-medium">{e.bankMasked}</p>
                          </div>
                          <div>
                            <p className="text-[10px] font-semibold tracking-widest text-muted-foreground uppercase">
                              Project
                            </p>
                            <p className="font-medium">{e.projectId}</p>
                          </div>
                          <div>
                            <p className="text-[10px] font-semibold tracking-widest text-muted-foreground uppercase">
                              Note
                            </p>
                            <p className="font-medium">{e.note ?? "—"}</p>
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
