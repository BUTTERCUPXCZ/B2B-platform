import { useMemo, useState } from "react"
import { createFileRoute, Link } from "@tanstack/react-router"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  CheckmarkCircle02Icon,
  AlertCircleIcon,
  ConstructionIcon,
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
import { projects, stageLabels } from "@/components/projects/projects-data"
import { peso } from "@/components/shared/price-tag"
import { cn } from "@/lib/utils"

type FilterState = "all" | "active" | "awaiting_approval" | "completed" | "disputed"

const filterChips: { id: FilterState; label: string }[] = [
  { id: "all", label: "All" },
  { id: "active", label: "Active" },
  { id: "awaiting_approval", label: "Awaiting approval" },
  { id: "completed", label: "Completed" },
  { id: "disputed", label: "Disputed" },
]

function projectFilter(project: (typeof projects)[number], state: FilterState) {
  if (state === "all") return true
  const hasSubmitted = project.milestones.some((m) => m.status === "submitted")
  const hasDisputed = project.milestones.some((m) => m.status === "disputed")
  if (state === "awaiting_approval") return hasSubmitted
  if (state === "disputed") return hasDisputed
  if (state === "completed") return project.stage >= 7
  if (state === "active") return project.stage >= 4 && project.stage <= 6
  return true
}

function nextActionFor(p: (typeof projects)[number]) {
  const submitted = p.milestones.find((m) => m.status === "submitted")
  if (submitted) return { text: `Approve milestone — ${submitted.title}`, tone: "primary" as const }
  const disputed = p.milestones.find((m) => m.status === "disputed")
  if (disputed) return { text: `Resolve dispute — ${disputed.title}`, tone: "danger" as const }
  const inProgress = p.milestones.find((m) => m.status === "in-progress")
  if (inProgress) return { text: `Awaiting upload — ${inProgress.title}`, tone: "muted" as const }
  if (p.stage >= 7) return { text: "Project completed", tone: "success" as const }
  return { text: "Awaiting next milestone", tone: "muted" as const }
}

export const Route = createFileRoute("/dashboard/client/projects")({
  component: ClientProjectsRoute,
})

function ClientProjectsRoute() {
  const [active, setActive] = useState<FilterState>("all")

  const filtered = useMemo(
    () => projects.filter((p) => projectFilter(p, active)),
    [active],
  )

  const totalHeld = projects.reduce((s, p) => s + p.escrow.held, 0)
  const totalReleased = projects.reduce((s, p) => s + p.escrow.released, 0)
  const awaitingApproval = projects.filter((p) =>
    p.milestones.some((m) => m.status === "submitted"),
  ).length
  const activeProjects = projects.filter((p) => p.stage >= 4 && p.stage <= 6).length

  return (
    <ShadcnDashboardShell role="client" title="Active projects">
      <div className="grid grid-cols-2 gap-4 px-4 lg:grid-cols-4 lg:px-6">
        <Card>
          <CardHeader>
            <CardDescription>Active projects</CardDescription>
            <CardTitle className="text-2xl font-semibold">{activeProjects}</CardTitle>
            <p className="text-xs text-muted-foreground">In escrow-protected build</p>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <CardDescription>Awaiting approval</CardDescription>
            <CardTitle className="text-2xl font-semibold">{awaitingApproval}</CardTitle>
            <p className="text-xs text-muted-foreground">Milestone submitted by contractor</p>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <CardDescription>Held in escrow</CardDescription>
            <CardTitle className="text-2xl font-semibold">{peso(totalHeld)}</CardTitle>
            <p className="text-xs text-muted-foreground">BSP-compliant ledger</p>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <CardDescription>Released to date</CardDescription>
            <CardTitle className="text-2xl font-semibold">{peso(totalReleased)}</CardTitle>
            <p className="text-xs text-muted-foreground">Per milestone approval</p>
          </CardHeader>
        </Card>
      </div>

      <SubPage
        title="My projects"
        description="Hired contractors with escrow-protected milestones."
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
            {filtered.length} of {projects.length}
          </span>
        </div>

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          {filtered.map((p) => {
            const approved = p.milestones.filter((m) => m.status === "approved").length
            const total = p.milestones.length
            const pct = total ? (approved / total) * 100 : 0
            const next = nextActionFor(p)
            return (
              <article
                key={p.id}
                className="flex flex-col gap-3 rounded-xl border border-border bg-white p-4"
              >
                <header className="flex items-start gap-3">
                  <span className="size-12 shrink-0 overflow-hidden rounded-lg bg-muted">
                    <img
                      src={p.contractorAvatar}
                      alt=""
                      className="size-full object-cover"
                    />
                  </span>
                  <div className="flex-1">
                    <Link
                      to="/projects/$projectId"
                      params={{ projectId: p.id }}
                      className="text-sm font-semibold text-brand-black hover:text-brand-orange hover:underline"
                    >
                      {p.title}
                    </Link>
                    <p className="text-xs text-muted-foreground">
                      {p.contractorName} · {p.location}
                    </p>
                  </div>
                  <Badge variant="secondary">{stageLabels[p.stage]}</Badge>
                </header>

                <div className="flex items-center gap-2 text-xs">
                  <span className="text-muted-foreground">
                    Milestones {approved}/{total}
                  </span>
                  <span className="relative h-1.5 flex-1 overflow-hidden rounded-full bg-muted">
                    <span
                      className="absolute inset-y-0 left-0 bg-brand-orange"
                      style={{ width: `${pct}%` }}
                    />
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-2 rounded-lg border border-border p-3 text-xs">
                  <div>
                    <p className="text-[10px] tracking-widest text-muted-foreground uppercase">
                      Held
                    </p>
                    <p className="font-semibold">{peso(p.escrow.held)}</p>
                  </div>
                  <div>
                    <p className="text-[10px] tracking-widest text-muted-foreground uppercase">
                      Released
                    </p>
                    <p className="font-semibold">{peso(p.escrow.released)}</p>
                  </div>
                  <div>
                    <p className="text-[10px] tracking-widest text-muted-foreground uppercase">
                      Pending
                    </p>
                    <p className="font-semibold">{peso(p.escrow.pending)}</p>
                  </div>
                </div>

                <div
                  className={cn(
                    "flex items-center gap-2 rounded-lg border px-3 py-2 text-xs",
                    next.tone === "primary" && "border-brand-orange bg-brand-orange/10 text-brand-orange",
                    next.tone === "danger" && "border-destructive bg-destructive/10 text-destructive",
                    next.tone === "muted" && "border-border text-muted-foreground",
                    next.tone === "success" && "border-emerald-200 bg-emerald-50 text-emerald-700",
                  )}
                >
                  {next.tone === "primary" && (
                    <HugeiconsIcon icon={ConstructionIcon} className="size-4" strokeWidth={2} />
                  )}
                  {next.tone === "danger" && (
                    <HugeiconsIcon icon={AlertCircleIcon} className="size-4" strokeWidth={2} />
                  )}
                  {next.tone === "success" && (
                    <HugeiconsIcon icon={CheckmarkCircle02Icon} className="size-4" strokeWidth={2} />
                  )}
                  {next.tone === "muted" && (
                    <HugeiconsIcon icon={Tick02Icon} className="size-4" strokeWidth={2} />
                  )}
                  <span className="font-medium">{next.text}</span>
                </div>

                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">
                    Contract {peso(p.contractValue)}
                  </span>
                  <Button
                    size="sm"
                    variant="outline"
                    render={<Link to="/projects/$projectId" params={{ projectId: p.id }} />}
                  >
                    Open project
                  </Button>
                </div>
              </article>
            )
          })}
        </div>
      </SubPage>
    </ShadcnDashboardShell>
  )
}
