import { HugeiconsIcon } from "@hugeicons/react"
import {
  CheckmarkCircle02Icon,
  Clock01Icon,
  AlertCircleIcon,
} from "@hugeicons/core-free-icons"

import { cn } from "@/lib/utils"
import { peso } from "@/components/shared/price-tag"
import { Badge } from "@/components/ui/badge"
import { type Milestone, type MilestoneStatus } from "./projects-data"

const statusConfig: Record<
  MilestoneStatus,
  {
    label: string
    icon: typeof CheckmarkCircle02Icon
    badge: "success" | "verified" | "warning" | "danger" | "muted"
    dot: string
  }
> = {
  approved: {
    label: "Approved",
    icon: CheckmarkCircle02Icon,
    badge: "success",
    dot: "bg-emerald-500",
  },
  submitted: {
    label: "Awaiting client review",
    icon: Clock01Icon,
    badge: "verified",
    dot: "bg-sky-500",
  },
  "in-progress": {
    label: "In progress",
    icon: Clock01Icon,
    badge: "warning",
    dot: "bg-amber-500",
  },
  pending: {
    label: "Pending",
    icon: Clock01Icon,
    badge: "muted",
    dot: "bg-zinc-300",
  },
  disputed: {
    label: "Disputed",
    icon: AlertCircleIcon,
    badge: "danger",
    dot: "bg-red-500",
  },
}

export function MilestoneTimeline({
  milestones,
  role = "client",
  onApprove,
}: {
  milestones: Milestone[]
  role?: "client" | "contractor"
  onApprove?: (id: string) => void
}) {
  return (
    <ol className="relative flex flex-col gap-4 border-l-2 border-border pl-6">
      {milestones.map((m, i) => {
        const cfg = statusConfig[m.status]
        return (
          <li key={m.id} className="relative">
            <span
              className={cn(
                "absolute -left-[33px] top-2 flex size-4 items-center justify-center rounded-full border-2 border-white shadow",
                cfg.dot
              )}
            />
            <div className="flex flex-col gap-3 rounded-none border border-border bg-white p-5">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="text-[10px] tracking-widest text-muted-foreground uppercase">
                    Milestone {i + 1} · {m.pct}% of contract
                  </p>
                  <p className="text-base font-bold text-brand-black">{m.title}</p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Due {m.dueDate}
                    {m.approvedDate && ` · Approved ${m.approvedDate}`}
                  </p>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <Badge variant={cfg.badge} size="sm">
                    <HugeiconsIcon icon={cfg.icon} />
                    {cfg.label}
                  </Badge>
                  <span className="text-base font-bold tabular-nums text-brand-black">
                    {peso(m.amount)}
                  </span>
                </div>
              </div>

              {m.status === "submitted" && role === "client" && (
                <div className="flex flex-wrap gap-2 border-t border-border pt-3">
                  <button
                    type="button"
                    onClick={() => onApprove?.(m.id)}
                    className="inline-flex h-9 items-center justify-center rounded-none bg-emerald-600 px-4 text-xs font-semibold tracking-wide text-white uppercase hover:bg-emerald-700"
                  >
                    Approve & release {peso(m.amount)}
                  </button>
                  <button
                    type="button"
                    className="inline-flex h-9 items-center justify-center rounded-none border border-border bg-white px-4 text-xs font-semibold tracking-wide text-brand-black uppercase hover:bg-muted"
                  >
                    Request changes
                  </button>
                  <button
                    type="button"
                    className="inline-flex h-9 items-center justify-center rounded-none border border-red-200 bg-red-50 px-4 text-xs font-semibold tracking-wide text-red-600 uppercase hover:bg-red-100"
                  >
                    Open dispute
                  </button>
                </div>
              )}
            </div>
          </li>
        )
      })}
    </ol>
  )
}
