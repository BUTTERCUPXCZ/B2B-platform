import { useMemo, useState } from "react"
import { createFileRoute, Link } from "@tanstack/react-router"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  Tick02Icon,
  ConstructionIcon,
  AlertCircleIcon,
  Image01Icon,
  PlusSignIcon,
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
  projects,
  stageLabels,
  type Milestone,
  type MilestoneStatus,
} from "@/components/projects/projects-data"
import { peso } from "@/components/shared/price-tag"
import { cn } from "@/lib/utils"

const myProjects = projects.filter((p) => p.contractorId === "stormshield-roofing")

type FilterState = "all" | "active" | "awaiting_approval" | "disputed" | "completed"

const filterChips: { id: FilterState; label: string }[] = [
  { id: "all", label: "All" },
  { id: "active", label: "Active" },
  { id: "awaiting_approval", label: "Awaiting approval" },
  { id: "disputed", label: "Disputed" },
  { id: "completed", label: "Completed" },
]

const milestoneTone: Record<MilestoneStatus, string> = {
  pending: "border-border text-muted-foreground",
  "in-progress": "border-amber-200 bg-amber-50 text-amber-700",
  submitted: "border-brand-orange bg-brand-orange/10 text-brand-orange",
  approved: "border-emerald-200 bg-emerald-50 text-emerald-700",
  disputed: "border-destructive bg-destructive/10 text-destructive",
}

function projectFilter(p: (typeof projects)[number], state: FilterState) {
  if (state === "all") return true
  const submitted = p.milestones.some((m) => m.status === "submitted")
  const disputed = p.milestones.some((m) => m.status === "disputed")
  if (state === "awaiting_approval") return submitted
  if (state === "disputed") return disputed
  if (state === "completed") return p.stage >= 7
  if (state === "active") return p.stage >= 4 && p.stage <= 6
  return true
}

function activeMilestone(p: (typeof projects)[number]): Milestone | undefined {
  return (
    p.milestones.find((m) => m.status === "submitted") ??
    p.milestones.find((m) => m.status === "in-progress") ??
    p.milestones.find((m) => m.status === "disputed")
  )
}

export const Route = createFileRoute("/dashboard/contractor/projects")({
  component: ContractorProjectsRoute,
})

function ContractorProjectsRoute() {
  const [active, setActive] = useState<FilterState>("all")

  const filtered = useMemo(
    () => myProjects.filter((p) => projectFilter(p, active)),
    [active],
  )

  const totalHeld = myProjects.reduce((s, p) => s + p.escrow.held, 0)
  const totalReleased = myProjects.reduce((s, p) => s + p.escrow.released, 0)
  const totalContract = myProjects.reduce((s, p) => s + p.contractValue, 0)

  return (
    <ShadcnDashboardShell role="contractor" title="Active projects">
      <div className="grid grid-cols-2 gap-4 px-4 lg:grid-cols-4 lg:px-6">
        <Card>
          <CardHeader>
            <CardDescription>Active contracts</CardDescription>
            <CardTitle className="text-2xl font-semibold">{myProjects.length}</CardTitle>
            <p className="text-xs text-muted-foreground">All escrow protected</p>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <CardDescription>Contract value</CardDescription>
            <CardTitle className="text-2xl font-semibold">{peso(totalContract)}</CardTitle>
            <p className="text-xs text-muted-foreground">Total awarded</p>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <CardDescription>Held in escrow</CardDescription>
            <CardTitle className="text-2xl font-semibold">{peso(totalHeld)}</CardTitle>
            <p className="text-xs text-muted-foreground">Released per milestone approval</p>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <CardDescription>Released to date</CardDescription>
            <CardTitle className="text-2xl font-semibold">{peso(totalReleased)}</CardTitle>
            <p className="text-xs text-muted-foreground">Deposited to your bank</p>
          </CardHeader>
        </Card>
      </div>

      <SubPage
        title="Active contracts"
        description="Submit milestones for approval to unlock escrow releases."
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
            {filtered.length} of {myProjects.length}
          </span>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {filtered.map((p) => {
            const approved = p.milestones.filter((m) => m.status === "approved").length
            const total = p.milestones.length
            const am = activeMilestone(p)
            return (
              <article
                key={p.id}
                className="flex flex-col gap-4 rounded-xl border border-border bg-white p-5"
              >
                <header className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <Link
                      to="/projects/$projectId"
                      params={{ projectId: p.id }}
                      className="text-base font-semibold text-brand-black hover:text-brand-orange hover:underline"
                    >
                      {p.title}
                    </Link>
                    <p className="text-xs text-muted-foreground">
                      {p.clientName} · {p.location} · {peso(p.contractValue)}
                    </p>
                  </div>
                  <Badge variant="secondary">{stageLabels[p.stage]}</Badge>
                </header>

                <div className="flex items-center gap-1">
                  {p.milestones.map((m, idx) => (
                    <div key={m.id} className="flex flex-1 items-center gap-1">
                      <div
                        className={cn(
                          "flex size-7 shrink-0 items-center justify-center rounded-full border text-[10px] font-semibold",
                          milestoneTone[m.status],
                        )}
                        title={`${m.title} — ${m.status}`}
                      >
                        {m.status === "approved" ? (
                          <HugeiconsIcon icon={Tick02Icon} className="size-3.5" strokeWidth={2.5} />
                        ) : m.status === "disputed" ? (
                          <HugeiconsIcon icon={AlertCircleIcon} className="size-3.5" strokeWidth={2.5} />
                        ) : (
                          idx + 1
                        )}
                      </div>
                      {idx < p.milestones.length - 1 && (
                        <div className="h-px flex-1 bg-border" />
                      )}
                    </div>
                  ))}
                </div>
                <p className="text-xs text-muted-foreground">
                  Milestones {approved}/{total} approved · {peso(p.escrow.released)} released
                </p>

                {am && (
                  <div
                    className={cn(
                      "rounded-lg border p-4",
                      am.status === "submitted" && "border-brand-orange bg-brand-orange/5",
                      am.status === "in-progress" && "border-amber-200 bg-amber-50",
                      am.status === "disputed" && "border-destructive bg-destructive/5",
                    )}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-[10px] font-semibold tracking-widest text-muted-foreground uppercase">
                          Active milestone
                        </p>
                        <p className="mt-0.5 text-sm font-semibold text-brand-black">
                          {am.title}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {peso(am.amount)} · due {am.dueDate}
                        </p>
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        {am.status === "in-progress" && (
                          <Button size="sm">Mark complete</Button>
                        )}
                        {am.status === "submitted" && (
                          <Badge variant="outline">Awaiting client approval</Badge>
                        )}
                        {am.status === "disputed" && (
                          <Button size="sm" variant="outline">
                            Open case
                          </Button>
                        )}
                      </div>
                    </div>

                    <div className="mt-4">
                      <p className="text-[10px] font-semibold tracking-widest text-muted-foreground uppercase">
                        Progress photos
                      </p>
                      <div className="mt-2 flex gap-2">
                        {[1, 2, 3].map((i) => (
                          <div
                            key={i}
                            className="flex size-16 items-center justify-center rounded-md border border-dashed border-border bg-muted/40 text-muted-foreground"
                          >
                            <HugeiconsIcon icon={Image01Icon} className="size-5" strokeWidth={2} />
                          </div>
                        ))}
                        <button
                          type="button"
                          className="flex size-16 flex-col items-center justify-center gap-1 rounded-md border border-dashed border-brand-orange bg-brand-orange/5 text-[10px] font-semibold tracking-widest text-brand-orange uppercase hover:bg-brand-orange/10"
                        >
                          <HugeiconsIcon icon={PlusSignIcon} className="size-4" strokeWidth={2.5} />
                          Add
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {!am && p.stage >= 7 && (
                  <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-700">
                    <div className="flex items-center gap-2">
                      <HugeiconsIcon icon={ConstructionIcon} className="size-4" strokeWidth={2} />
                      <span className="font-semibold">Project completed</span>
                    </div>
                    <p className="text-xs">
                      Final milestone released · {peso(p.escrow.released)} deposited
                    </p>
                  </div>
                )}
              </article>
            )
          })}
        </div>
      </SubPage>
    </ShadcnDashboardShell>
  )
}
