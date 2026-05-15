import { Link } from "@tanstack/react-router"
import {
  PackageIcon,
  ChartIcon,
  Wallet01Icon,
  ShoppingCart01Icon,
} from "@hugeicons/core-free-icons"

import { Header } from "@/components/landing/header"
import { DashboardShell } from "@/components/shared/dashboard-shell"
import { peso } from "@/components/shared/price-tag"
import { Badge } from "@/components/ui/badge"
import { SidebarNav } from "./sidebar-nav"
import { StatTile } from "./stat-tile"
import { DataTable } from "./data-table"
import { sellerPayouts, sampleOrders } from "./dashboard-data"
import { products } from "@/components/shop/shop-data"

export function SellerDashboard() {
  const myProducts = products.slice(0, 6)
  const incoming = sampleOrders

  return (
    <>
      <Header />
      <DashboardShell sidebar={<SidebarNav role="seller" />}>
        <div>
          <header className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-brand-black">
                Eagle Materials seller hub
              </h1>
              <p className="text-sm text-muted-foreground">
                Catalog, orders, and payout cycle.
              </p>
            </div>
            <Link
              to="/sell"
              className="inline-flex h-10 items-center justify-center rounded-none bg-brand-orange px-5 text-xs font-semibold tracking-widest text-white uppercase hover:bg-brand-orange-soft"
            >
              + List product
            </Link>
          </header>

          <section className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <StatTile icon={PackageIcon} label="Active SKUs" value={String(myProducts.length)} hint="Across 4 categories" />
            <StatTile icon={ShoppingCart01Icon} label="Open orders" value="3" hint="2 ready to ship" />
            <StatTile icon={ChartIcon} label="GMV (30d)" value={peso(842_400)} trend={{ value: "12%", up: true }} hint="vs prior 30d" />
            <StatTile icon={Wallet01Icon} label="Pending payout" value={peso(102_640)} hint="Releases 2026-05-13" />
          </section>

          <section className="mt-10">
            <h2 className="mb-4 text-lg font-bold tracking-tight text-brand-black">Catalog</h2>
            <DataTable
              rows={myProducts}
              columns={[
                {
                  header: "Product",
                  accessor: (p) => (
                    <div className="flex items-center gap-3">
                      <span className="size-10 shrink-0 overflow-hidden rounded-lg bg-muted">
                        <img src={p.image} alt="" className="size-full object-cover" />
                      </span>
                      <div>
                        <p className="font-semibold text-brand-black">{p.name}</p>
                        <p className="text-xs text-muted-foreground">{p.category}</p>
                      </div>
                    </div>
                  ),
                },
                { header: "Price", accessor: (p) => peso(p.price), align: "right" },
                { header: "Rating", accessor: (p) => `${p.rating} (${p.reviews})`, align: "right" },
                {
                  header: "Status",
                  align: "right",
                  accessor: () => <Badge variant="success" size="sm">Live</Badge>,
                },
              ]}
            />
          </section>

          <section className="mt-10 grid gap-6 lg:grid-cols-2">
            <div className="rounded-none border border-border bg-white p-6">
              <h3 className="mb-4 text-base font-bold tracking-tight text-brand-black">
                Incoming orders
              </h3>
              <DataTable
                rows={incoming}
                columns={[
                  { header: "Order", accessor: (o) => o.id },
                  { header: "Date", accessor: (o) => o.date },
                  { header: "Total", accessor: (o) => peso(o.total), align: "right" },
                  {
                    header: "Status",
                    align: "right",
                    accessor: (o) => (
                      <Badge
                        size="sm"
                        variant={
                          o.status === "shipped" ? "verified" : o.status === "pending" ? "warning" : "muted"
                        }
                      >
                        {o.status}
                      </Badge>
                    ),
                  },
                ]}
              />
            </div>
            <div className="rounded-none border border-border bg-white p-6">
              <h3 className="mb-4 text-base font-bold tracking-tight text-brand-black">
                Payouts (bi-weekly cycle)
              </h3>
              <DataTable
                rows={sellerPayouts}
                columns={[
                  { header: "Ref", accessor: (p) => p.id },
                  { header: "Date", accessor: (p) => p.date },
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
