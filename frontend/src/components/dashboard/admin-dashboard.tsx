import { Link } from "@tanstack/react-router"
import {
  ShieldUserIcon,
  UserGroup03Icon,
  ConstructionIcon,
  Wallet01Icon,
} from "@hugeicons/core-free-icons"

import { Header } from "@/components/landing/header"
import { DashboardShell } from "@/components/shared/dashboard-shell"
import { peso } from "@/components/shared/price-tag"
import { Badge } from "@/components/ui/badge"
import { SidebarNav } from "./sidebar-nav"
import { StatTile } from "./stat-tile"
import { DataTable } from "./data-table"
import { verificationQueue } from "./dashboard-data"
import { contractors } from "@/components/contractors/contractors-data"
import { projects } from "@/components/projects/projects-data"

export function AdminDashboard() {
  const escrowHeld = projects.reduce((s, p) => s + p.escrow.held + p.escrow.pending, 0)
  const pendingVerification = verificationQueue.filter((v) => v.status === "pending")

  return (
    <>
      <Header />
      <DashboardShell sidebar={<SidebarNav role="admin" />}>
        <div>
          <header className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-brand-black">
                Platform admin
              </h1>
              <p className="text-sm text-muted-foreground">
                Verification queue, escrow snapshot, and platform health.
              </p>
            </div>
          </header>

          <section className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <StatTile
              icon={UserGroup03Icon}
              label="Total contractors"
              value={String(contractors.length * 142)}
              hint="Listed on platform"
            />
            <StatTile
              icon={ShieldUserIcon}
              label="Pending verifications"
              value={String(pendingVerification.length)}
              hint="Across all types"
            />
            <StatTile
              icon={ConstructionIcon}
              label="Active projects"
              value={String(projects.filter((p) => p.stage < 8).length * 38)}
              hint="In escrow"
            />
            <StatTile
              icon={Wallet01Icon}
              label="Escrow held"
              value={peso(escrowHeld * 80)}
              hint="All projects"
            />
          </section>

          <section className="mt-10">
            <h2 className="mb-4 text-lg font-bold tracking-tight text-brand-black">
              Verification queue
            </h2>
            <DataTable
              rows={verificationQueue}
              columns={[
                { header: "Ref", accessor: (v) => v.id },
                {
                  header: "Contractor",
                  accessor: (v) => (
                    <span className="font-semibold text-brand-black">{v.contractorName}</span>
                  ),
                },
                {
                  header: "Type",
                  accessor: (v) => <Badge variant="muted" size="sm">{v.type}</Badge>,
                },
                { header: "Submitted", accessor: (v) => v.submittedAgo },
                {
                  header: "Status",
                  align: "right",
                  accessor: (v) => (
                    <Badge
                      size="sm"
                      variant={v.status === "approved" ? "success" : v.status === "rejected" ? "danger" : "warning"}
                    >
                      {v.status}
                    </Badge>
                  ),
                },
                {
                  header: "Action",
                  align: "right",
                  accessor: (v) =>
                    v.status === "pending" ? (
                      <button
                        type="button"
                        className="inline-flex h-8 items-center justify-center rounded-none bg-brand-orange px-3 text-[10px] font-semibold tracking-widest text-white uppercase hover:bg-brand-orange-soft"
                      >
                        Review
                      </button>
                    ) : (
                      <span className="text-xs text-muted-foreground">—</span>
                    ),
                },
              ]}
            />
          </section>

          <section className="mt-10 grid gap-6 lg:grid-cols-2">
            <div className="rounded-none border border-border bg-white p-6">
              <h3 className="mb-4 text-base font-bold tracking-tight text-brand-black">
                Disputes (last 30d)
              </h3>
              <div className="rounded-none border border-dashed border-border p-8 text-center text-sm text-muted-foreground">
                <span className="inline-flex size-12 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                  ✓
                </span>
                <p className="mt-3">No active disputes. 4 resolved this month.</p>
              </div>
            </div>

            <div className="rounded-none border border-border bg-white p-6">
              <h3 className="mb-4 text-base font-bold tracking-tight text-brand-black">
                Recent project activity
              </h3>
              <ul className="flex flex-col gap-3">
                {projects.map((p) => (
                  <li key={p.id} className="flex items-center justify-between gap-3 text-sm">
                    <div>
                      <Link
                        to="/projects/$projectId"
                        params={{ projectId: p.id }}
                        className="font-semibold text-brand-black hover:text-brand-orange"
                      >
                        {p.title}
                      </Link>
                      <p className="text-xs text-muted-foreground">
                        Stage {p.stage} · {peso(p.contractValue)}
                      </p>
                    </div>
                    {p.daysRemaining < 0 && p.daysRemaining > -90 ? (
                      <Badge variant="danger" size="sm">Past due</Badge>
                    ) : (
                      <Badge variant="muted" size="sm">Healthy</Badge>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </section>
        </div>
      </DashboardShell>
    </>
  )
}
