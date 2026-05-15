import { Link } from "@tanstack/react-router"
import {
  Briefcase01Icon,
  ConstructionIcon,
  Wallet01Icon,
  StarIcon,
} from "@hugeicons/core-free-icons"

import { Header } from "@/components/landing/header"
import { DashboardShell } from "@/components/shared/dashboard-shell"
import { peso } from "@/components/shared/price-tag"
import { Badge } from "@/components/ui/badge"
import { SidebarNav } from "./sidebar-nav"
import { StatTile } from "./stat-tile"
import { DataTable } from "./data-table"
import { contractorPayouts } from "./dashboard-data"
import { bids } from "@/components/jobs/bids-data"
import { projects } from "@/components/projects/projects-data"
import { jobs } from "@/components/jobs/jobs-data"

export function ContractorDashboard() {
  const myBids = bids.filter((b) => b.contractorId === "stormshield-roofing")
  const myProjects = projects.filter((p) => p.contractorId === "stormshield-roofing")

  return (
    <>
      <Header />
      <DashboardShell sidebar={<SidebarNav role="contractor" />}>
        <div>
          <header className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-brand-black">
                Stormshield Roofing
              </h1>
              <p className="text-sm text-muted-foreground">
                Bids in flight, active projects, and earnings.
              </p>
            </div>
            <Link
              to="/jobs"
              className="inline-flex h-10 items-center justify-center rounded-none bg-brand-orange px-5 text-xs font-semibold tracking-widest text-white uppercase hover:bg-brand-orange-soft"
            >
              Find new jobs
            </Link>
          </header>

          <section className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <StatTile icon={Briefcase01Icon} label="Bids in flight" value={String(myBids.length)} hint="awaiting client" />
            <StatTile icon={ConstructionIcon} label="Active projects" value={String(myProjects.length)} hint="Escrow protected" />
            <StatTile icon={Wallet01Icon} label="Earnings (90d)" value={peso(485_000)} trend={{ value: "8%", up: true }} />
            <StatTile icon={StarIcon} label="Rating" value="4.7" hint="412 reviews" />
          </section>

          <section className="mt-10">
            <h2 className="mb-4 text-lg font-bold tracking-tight text-brand-black">My bids</h2>
            <DataTable
              rows={myBids}
              columns={[
                {
                  header: "Project",
                  accessor: (b) => {
                    const job = jobs.find((j) => j.id === b.jobId)
                    return job ? (
                      <Link
                        to="/jobs/$jobId"
                        params={{ jobId: job.id }}
                        className="font-semibold text-brand-black hover:text-brand-orange"
                      >
                        {job.title}
                      </Link>
                    ) : (
                      "—"
                    )
                  },
                },
                { header: "Bid", accessor: (b) => peso(b.amount), align: "right" },
                { header: "Timeline", accessor: (b) => `${b.timelineDays}d`, align: "right" },
                {
                  header: "Submitted",
                  align: "right",
                  accessor: (b) => <span className="text-xs text-muted-foreground">{b.submittedAgo}</span>,
                },
              ]}
              empty="You have no active bids. Browse jobs to find new work."
            />
          </section>

          <section className="mt-10 grid gap-6 lg:grid-cols-2">
            <div className="rounded-none border border-border bg-white p-6">
              <h3 className="mb-4 text-base font-bold tracking-tight text-brand-black">
                Active projects
              </h3>
              {myProjects.length === 0 ? (
                <p className="rounded-none border border-dashed border-border p-6 text-center text-sm text-muted-foreground">
                  No active projects.
                </p>
              ) : (
                <ul className="flex flex-col gap-3">
                  {myProjects.map((p) => (
                    <li key={p.id} className="flex items-center justify-between gap-3 rounded-none border border-border bg-white p-4">
                      <div>
                        <Link
                          to="/projects/$projectId"
                          params={{ projectId: p.id }}
                          className="text-sm font-semibold text-brand-black hover:text-brand-orange"
                        >
                          {p.title}
                        </Link>
                        <p className="text-xs text-muted-foreground">
                          Stage {p.stage} · {peso(p.contractValue)} · {p.daysRemaining}d remaining
                        </p>
                      </div>
                      <Badge variant="verified" size="sm">
                        Escrow
                      </Badge>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="rounded-none border border-border bg-white p-6">
              <h3 className="mb-4 text-base font-bold tracking-tight text-brand-black">Earnings</h3>
              <DataTable
                rows={contractorPayouts}
                columns={[
                  { header: "Ref", accessor: (p) => p.id },
                  { header: "Source", accessor: (p) => p.source },
                  { header: "Amount", accessor: (p) => peso(p.amount), align: "right" },
                  {
                    header: "Status",
                    align: "right",
                    accessor: (p) => (
                      <Badge size="sm" variant={p.status === "paid" ? "success" : "warning"}>
                        {p.status}
                      </Badge>
                    ),
                  },
                ]}
              />
            </div>
          </section>
        </div>
      </DashboardShell>
    </>
  )
}
