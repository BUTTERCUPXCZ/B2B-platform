import { Link } from "@tanstack/react-router"
import {
  Calendar03Icon,
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
import { sampleBookings } from "./dashboard-data"
import { servicePros } from "@/components/services/services-data"

export function CompanyDashboard() {
  const myServices = servicePros.slice(0, 4)

  return (
    <>
      <Header />
      <DashboardShell sidebar={<SidebarNav role="company" />}>
        <div>
          <header className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-brand-black">
                Studio Manille
              </h1>
              <p className="text-sm text-muted-foreground">
                Services, bookings, and team utilization.
              </p>
            </div>
            <Link
              to="/services/post"
              className="inline-flex h-10 items-center justify-center rounded-none bg-brand-orange px-5 text-xs font-semibold tracking-widest text-white uppercase hover:bg-brand-orange-soft"
            >
              + Post service
            </Link>
          </header>

          <section className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <StatTile icon={ConstructionIcon} label="Live services" value={String(myServices.length)} hint="Across 4 trades" />
            <StatTile icon={Calendar03Icon} label="Upcoming bookings" value={String(sampleBookings.filter(b => b.status !== "completed").length)} hint="Next 14 days" />
            <StatTile icon={Wallet01Icon} label="Revenue (90d)" value={peso(2_140_000)} trend={{ value: "16%", up: true }} />
            <StatTile icon={StarIcon} label="Rating" value="4.8" hint="316 reviews" />
          </section>

          <section className="mt-10">
            <h2 className="mb-4 text-lg font-bold tracking-tight text-brand-black">Services</h2>
            <DataTable
              rows={myServices}
              columns={[
                {
                  header: "Service",
                  accessor: (s) => (
                    <Link
                      to="/services/$serviceId"
                      params={{ serviceId: s.id }}
                      className="font-semibold text-brand-black hover:text-brand-orange"
                    >
                      {s.name}
                    </Link>
                  ),
                },
                { header: "Category", accessor: (s) => s.category },
                { header: "Starts at", accessor: (s) => s.startingFrom, align: "right" },
                { header: "Jobs", accessor: (s) => s.jobsCompleted, align: "right" },
                {
                  header: "Status",
                  align: "right",
                  accessor: () => <Badge size="sm" variant="success">Live</Badge>,
                },
              ]}
            />
          </section>

          <section className="mt-10">
            <h2 className="mb-4 text-lg font-bold tracking-tight text-brand-black">Bookings</h2>
            <DataTable
              rows={sampleBookings}
              columns={[
                { header: "Ref", accessor: (b) => b.id },
                { header: "Customer", accessor: (b) => b.customer },
                { header: "Service", accessor: (b) => b.service },
                { header: "Date", accessor: (b) => b.date, align: "right" },
                {
                  header: "Status",
                  align: "right",
                  accessor: (b) => (
                    <Badge
                      size="sm"
                      variant={
                        b.status === "completed" ? "success" : b.status === "confirmed" ? "verified" : "warning"
                      }
                    >
                      {b.status}
                    </Badge>
                  ),
                },
              ]}
            />
          </section>
        </div>
      </DashboardShell>
    </>
  )
}
