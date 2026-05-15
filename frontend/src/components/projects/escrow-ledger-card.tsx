import { HugeiconsIcon } from "@hugeicons/react"
import { Shield02Icon } from "@hugeicons/core-free-icons"

import { peso } from "@/components/shared/price-tag"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { type LedgerEntry, type Project } from "./projects-data"

const ledgerStyle: Record<LedgerEntry["type"], { label: string; tone: "verified" | "success" | "warning" | "danger" }> = {
  hold: { label: "Hold", tone: "verified" },
  release: { label: "Release", tone: "success" },
  refund: { label: "Refund", tone: "warning" },
  compensation: { label: "Compensation", tone: "danger" },
}

export function EscrowLedgerCard({ project }: { project: Project }) {
  const { escrow, ledger, contractValue } = project
  const releasedPct = (escrow.released / contractValue) * 100

  return (
    <div className="flex flex-col gap-4 rounded-none border border-border bg-white p-6">
      <header className="flex items-start justify-between gap-3">
        <div>
          <h2 className="text-lg font-bold tracking-tight text-brand-black">
            Escrow ledger
          </h2>
          <p className="text-xs text-muted-foreground">
            BSP-compliant escrow account
          </p>
        </div>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100 px-3 py-1 text-[10px] font-semibold tracking-widest text-emerald-700 uppercase">
          <HugeiconsIcon icon={Shield02Icon} className="size-3" />
          Protected
        </span>
      </header>

      <div className="grid grid-cols-2 gap-3">
        <Stat label="Held" value={peso(escrow.held)} />
        <Stat label="Released" value={peso(escrow.released)} />
        <Stat label="Pending" value={peso(escrow.pending)} />
        <Stat label="Refunded" value={peso(escrow.refunded)} />
      </div>

      <div>
        <div className="mb-1 flex items-center justify-between text-xs text-muted-foreground">
          <span>Released vs contract value</span>
          <span className="font-semibold text-brand-black">
            {Math.round(releasedPct)}%
          </span>
        </div>
        <Progress value={releasedPct} barClassName="bg-emerald-500" />
      </div>

      <div className="border-t border-border pt-4">
        <h3 className="mb-3 text-xs font-semibold tracking-widest text-brand-black/60 uppercase">
          Recent activity
        </h3>
        <ul className="flex flex-col gap-3">
          {ledger
            .slice()
            .reverse()
            .map((e, i) => {
              const cfg = ledgerStyle[e.type]
              return (
                <li key={i} className="flex items-start justify-between gap-3">
                  <div className="flex flex-col gap-1">
                    <Badge variant={cfg.tone} size="sm" className="self-start">
                      {cfg.label}
                    </Badge>
                    <p className="text-sm text-brand-black/80">{e.note}</p>
                    <p className="text-[10px] tracking-widest text-muted-foreground uppercase">
                      {e.date}
                    </p>
                  </div>
                  <span className="text-sm font-semibold tabular-nums text-brand-black">
                    {peso(e.amount)}
                  </span>
                </li>
              )
            })}
        </ul>
      </div>
    </div>
  )
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-none bg-muted/50 p-3">
      <p className="text-[10px] tracking-widest text-muted-foreground uppercase">
        {label}
      </p>
      <p className="text-base font-bold tabular-nums text-brand-black">{value}</p>
    </div>
  )
}
