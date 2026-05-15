import { useMemo, useState } from "react"
import { createFileRoute, Link } from "@tanstack/react-router"
import { HugeiconsIcon } from "@hugeicons/react"
import { PlusSignIcon, PackageIcon } from "@hugeicons/core-free-icons"

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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { products } from "@/components/shop/shop-data"
import { peso } from "@/components/shared/price-tag"
import { cn } from "@/lib/utils"

const stockByCategory: Record<string, number> = {
  "Cement & Concrete": 1240,
  "Tiles & Flooring": 480,
  "Paint & Finishes": 320,
  "Steel & Rebar": 90,
  "Tools & Equipment": 215,
  "Lumber & Wood": 78,
  Plumbing: 410,
  Electrical: 162,
  Roofing: 56,
  "Doors & Windows": 24,
  Hardware: 1100,
  Landscaping: 380,
}

type Status = "live" | "low" | "draft"

const productMeta: Record<
  string,
  { variants: number; updated: string; status: Status }
> = {
  "cement-portland-40kg": { variants: 3, updated: "2d ago", status: "live" },
  "tiles-porcelain-60x60": { variants: 4, updated: "5d ago", status: "live" },
  "paint-latex-4l-eggshell": { variants: 6, updated: "1d ago", status: "live" },
  "rebar-grade60-12mm": { variants: 2, updated: "1w ago", status: "low" },
  "drill-cordless-18v": { variants: 1, updated: "3d ago", status: "live" },
  "plywood-marine-18mm": { variants: 2, updated: "2w ago", status: "low" },
  "pvc-pipe-3in": { variants: 4, updated: "4d ago", status: "live" },
  "wire-thhn-12awg": { variants: 3, updated: "6d ago", status: "live" },
  "roofing-corrugated": { variants: 2, updated: "3w ago", status: "low" },
  "door-solid-mahogany": { variants: 1, updated: "1d ago", status: "draft" },
  "screwdriver-set": { variants: 1, updated: "1w ago", status: "live" },
  "soil-topsoil-50l": { variants: 2, updated: "2d ago", status: "live" },
}

const filterChips: { id: "all" | Status; label: string }[] = [
  { id: "all", label: "All" },
  { id: "live", label: "Live" },
  { id: "low", label: "Low stock" },
  { id: "draft", label: "Draft" },
]

export const Route = createFileRoute("/dashboard/seller/catalog/")({
  component: SellerCatalogRoute,
})

function statusBadge(status: Status) {
  if (status === "low") {
    return (
      <Badge variant="secondary">
        <HugeiconsIcon icon={PackageIcon} strokeWidth={2} />
        Low stock
      </Badge>
    )
  }
  if (status === "draft") return <Badge variant="secondary">Draft</Badge>
  return <Badge variant="outline">Live</Badge>
}

function SellerCatalogRoute() {
  const [active, setActive] = useState<"all" | Status>("all")

  const totalSkus = products.length
  const lowStock = products.filter(
    (p) => productMeta[p.id]?.status === "low",
  ).length
  const drafts = products.filter(
    (p) => productMeta[p.id]?.status === "draft",
  ).length

  const filtered = useMemo(() => {
    if (active === "all") return products
    return products.filter((p) => productMeta[p.id]?.status === active)
  }, [active])

  return (
    <ShadcnDashboardShell role="seller" title="Catalog">
      <div className="grid grid-cols-1 gap-4 px-4 sm:grid-cols-3 lg:px-6">
        <Card>
          <CardHeader>
            <CardDescription>Total SKUs</CardDescription>
            <CardTitle className="text-2xl font-semibold tabular-nums">
              {totalSkus}
            </CardTitle>
            <p className="text-xs text-muted-foreground">
              Live across {Object.keys(stockByCategory).length} categories
            </p>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <CardDescription>Low stock</CardDescription>
            <CardTitle className="text-2xl font-semibold tabular-nums">
              {lowStock}
            </CardTitle>
            <p className="text-xs text-muted-foreground">SKUs flagged below reorder line</p>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <CardDescription>Drafts</CardDescription>
            <CardTitle className="text-2xl font-semibold tabular-nums">{drafts}</CardTitle>
            <p className="text-xs text-muted-foreground">Not yet published to shop</p>
          </CardHeader>
        </Card>
      </div>

      <SubPage
        title="Catalog"
        description="All SKUs you list on STRUKTURA — manage pricing, stock, variants, and visibility."
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
          <div className="ml-auto flex items-center gap-3">
            <p className="text-xs text-muted-foreground">
              {filtered.length} of {totalSkus} products
            </p>
            <Button size="sm" render={<Link to="/dashboard/seller/catalog/new" />}>
              <HugeiconsIcon icon={PlusSignIcon} strokeWidth={2} />
              Add product
            </Button>
          </div>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Product</TableHead>
              <TableHead>Category</TableHead>
              <TableHead className="text-right">Price</TableHead>
              <TableHead className="text-right">Variants</TableHead>
              <TableHead className="text-right">Stock</TableHead>
              <TableHead className="text-right">Rating</TableHead>
              <TableHead className="text-right">Updated</TableHead>
              <TableHead className="text-right">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((p) => {
              const stock = stockByCategory[p.category] ?? 0
              const meta = productMeta[p.id] ?? {
                variants: 1,
                updated: "—",
                status: "live" as Status,
              }
              return (
                <TableRow key={p.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <span className="size-9 shrink-0 overflow-hidden bg-muted">
                        <img src={p.image} alt="" className="size-full object-cover" />
                      </span>
                      <Link
                        to="/shop/$productId"
                        params={{ productId: p.id }}
                        className="font-medium hover:text-brand-orange hover:underline"
                      >
                        {p.name}
                      </Link>
                    </div>
                  </TableCell>
                  <TableCell>{p.category}</TableCell>
                  <TableCell className="text-right">{peso(p.price)}</TableCell>
                  <TableCell className="text-right">
                    <Badge variant="outline">{meta.variants}</Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <span className={meta.status === "low" ? "text-amber-600" : ""}>
                      {stock}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    {p.rating} ({p.reviews})
                  </TableCell>
                  <TableCell className="text-right text-xs text-muted-foreground">
                    {meta.updated}
                  </TableCell>
                  <TableCell className="text-right">{statusBadge(meta.status)}</TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </SubPage>
    </ShadcnDashboardShell>
  )
}
