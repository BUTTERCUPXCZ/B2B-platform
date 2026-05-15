import { Link } from "@tanstack/react-router"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  Location01Icon,
  Calendar03Icon,
  Mail01Icon,
  AlertCircleIcon,
  WalletAdd01Icon,
} from "@hugeicons/core-free-icons"

import { Header } from "@/components/landing/header"
import { Footer } from "@/components/landing/footer"
import { Breadcrumbs } from "@/components/shared/breadcrumbs"
import { peso } from "@/components/shared/price-tag"
import { UserAvatar as Avatar } from "@/components/shared/user-avatar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { type Project, stageLabels } from "./projects-data"
import { MilestoneTimeline } from "./milestone-timeline"
import { EscrowLedgerCard } from "./escrow-ledger-card"
import { GracePeriodAlert } from "./grace-period-alert"

export function ProjectDetailPage({ project }: { project: Project }) {
  const approvedPct = project.milestones
    .filter((m) => m.status === "approved")
    .reduce((s, m) => s + m.pct, 0)
  const inProgressPct = project.milestones
    .filter((m) => m.status === "in-progress" || m.status === "submitted")
    .reduce((s, m) => s + m.pct, 0)

  return (
    <div className="bg-background">
      <Header />
      <main className="pt-32 pb-20">
        <div className="mx-auto max-w-[1280px] px-6 sm:px-10 lg:px-16">
          <Breadcrumbs
            className="mb-6"
            items={[
              { label: "Projects", to: "/dashboard/client" },
              { label: project.title },
            ]}
          />

          <header className="grid gap-6 lg:grid-cols-[1fr_360px]">
            <div className="space-y-4">
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="muted">{project.category}</Badge>
                <Badge variant="accent">
                  Stage {project.stage} · {stageLabels[project.stage]}
                </Badge>
                <Badge variant="outline">{project.id}</Badge>
              </div>
              <h1 className="text-3xl font-bold tracking-tight text-brand-black sm:text-4xl">
                {project.title}
              </h1>
              <div className="flex flex-wrap gap-4 text-sm text-brand-black/70">
                <span className="inline-flex items-center gap-1.5">
                  <HugeiconsIcon icon={Location01Icon} className="size-4" />
                  {project.location}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <HugeiconsIcon icon={Calendar03Icon} className="size-4" />
                  {project.startDate} → {project.endDate}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <HugeiconsIcon icon={WalletAdd01Icon} className="size-4" />
                  Contract value {peso(project.contractValue)}
                </span>
              </div>

              <div className="rounded-none border border-border bg-white p-5">
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-xs font-semibold tracking-widest text-brand-black/60 uppercase">
                    Project progress
                  </span>
                  <span className="text-sm font-bold text-brand-black">{approvedPct}%</span>
                </div>
                <div className="relative h-3 overflow-hidden rounded-none bg-muted">
                  <div
                    className="absolute inset-y-0 left-0 bg-emerald-500"
                    style={{ width: `${approvedPct}%` }}
                  />
                  <div
                    className="absolute inset-y-0 bg-amber-400"
                    style={{
                      left: `${approvedPct}%`,
                      width: `${inProgressPct}%`,
                    }}
                  />
                </div>
                <p className="mt-2 text-xs text-muted-foreground">
                  {approvedPct}% approved · {inProgressPct}% pending review
                </p>
              </div>

              <GracePeriodAlert
                daysRemaining={project.daysRemaining}
                graceDays={project.graceDays}
              />
            </div>

            <aside className="lg:sticky lg:top-28 lg:self-start">
              <div className="flex flex-col gap-3 rounded-none border border-border bg-white p-6">
                <p className="text-xs tracking-widest text-muted-foreground uppercase">
                  Contractor
                </p>
                <div className="flex items-center gap-3">
                  <Avatar src={project.contractorAvatar} alt={project.contractorName} size="lg" />
                  <div>
                    <Link
                      to="/contractors/$contractorId"
                      params={{ contractorId: project.contractorId }}
                      className="font-bold text-brand-black hover:text-brand-orange"
                    >
                      {project.contractorName}
                    </Link>
                    <p className="text-xs text-muted-foreground">Awarded contractor</p>
                  </div>
                </div>

                <div className="mt-2 rounded-none bg-muted p-4 text-sm">
                  <p className="text-xs tracking-widest text-muted-foreground uppercase">
                    Client
                  </p>
                  <p className="mt-1 font-semibold text-brand-black">{project.clientName}</p>
                </div>

                <Link
                  to="/messages"
                  search={{ to: project.contractorId }}
                  className="inline-flex h-11 items-center justify-center gap-2 rounded-none bg-brand-orange text-xs font-semibold tracking-widest text-white uppercase transition-colors hover:bg-brand-orange-soft"
                >
                  <HugeiconsIcon icon={Mail01Icon} className="size-4" />
                  Open project chat
                </Link>
                <button
                  type="button"
                  className="inline-flex h-11 items-center justify-center gap-2 rounded-none border border-red-200 bg-red-50 text-xs font-semibold tracking-widest text-red-600 uppercase transition-colors hover:bg-red-100"
                >
                  <HugeiconsIcon icon={AlertCircleIcon} className="size-4" />
                  Open dispute
                </button>
              </div>
            </aside>
          </header>

          <section className="mt-12">
            <Tabs defaultValue="milestones">
              <TabsList>
                <TabsTrigger value="milestones">Milestones</TabsTrigger>
                <TabsTrigger value="escrow">Escrow</TabsTrigger>
                <TabsTrigger value="contract">Contract</TabsTrigger>
              </TabsList>

              <TabsContent value="milestones" className="mt-6">
                <MilestoneTimeline
                  milestones={project.milestones}
                  role="client"
                  onApprove={(id) => alert(`Approved milestone ${id} (mock).`)}
                />
              </TabsContent>

              <TabsContent value="escrow" className="mt-6">
                <div className="grid gap-4 lg:grid-cols-[1fr_1fr]">
                  <EscrowLedgerCard project={project} />
                  <div className="flex flex-col gap-4 rounded-none border border-border bg-white p-6">
                    <h3 className="text-lg font-bold tracking-tight text-brand-black">
                      Payout schedule
                    </h3>
                    {project.milestones.map((m) => (
                      <div key={m.id} className="flex items-center justify-between gap-3 text-sm">
                        <div>
                          <p className="font-medium text-brand-black">{m.title}</p>
                          <p className="text-xs text-muted-foreground">Due {m.dueDate}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold tabular-nums text-brand-black">
                            {peso(m.amount)}
                          </p>
                          <p className="text-[10px] tracking-widest text-muted-foreground uppercase">
                            {m.pct}%
                          </p>
                        </div>
                      </div>
                    ))}
                    <Progress value={(project.escrow.released / project.contractValue) * 100} barClassName="bg-emerald-500" />
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="contract" className="mt-6">
                <div className="rounded-none border border-border bg-white p-8">
                  <h3 className="text-lg font-bold tracking-tight text-brand-black">
                    Contract summary
                  </h3>
                  <dl className="mt-5 grid gap-4 sm:grid-cols-2">
                    <Item label="Reference" value={project.id} />
                    <Item label="Contract value" value={peso(project.contractValue)} />
                    <Item label="Start date" value={project.startDate} />
                    <Item label="End date" value={project.endDate} />
                    <Item label="Grace period" value={`${project.graceDays} days`} />
                    <Item label="Stage" value={stageLabels[project.stage]} />
                  </dl>
                  <p className="mt-6 text-sm text-muted-foreground">
                    Both parties have digitally confirmed milestone breakdown,
                    escrow terms, and dispute escalation policy. Full agreement
                    available on request.
                  </p>
                </div>
              </TabsContent>
            </Tabs>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  )
}

function Item({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-xs tracking-widest text-muted-foreground uppercase">{label}</dt>
      <dd className="mt-0.5 text-sm font-semibold text-brand-black">{value}</dd>
    </div>
  )
}
