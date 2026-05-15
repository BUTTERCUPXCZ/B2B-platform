import * as React from "react"
import { useState } from "react"
import { createFileRoute, Link } from "@tanstack/react-router"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  ArrowLeft01Icon,
  PackageIcon,
  Image01Icon,
  PlusSignIcon,
  Tick02Icon,
  Delete02Icon,
  InformationCircleIcon,
  Coins01Icon,
} from "@hugeicons/core-free-icons"

import { ShadcnDashboardShell } from "@/components/dashboard/shadcn-dashboard"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { productCategories } from "@/components/shop/shop-data"
import { peso } from "@/components/shared/price-tag"
import { cn } from "@/lib/utils"

type Variant = {
  id: string
  attribute: string
  value: string
  priceDelta: number
  stock: number
}

const unitOptions = [
  "per bag",
  "per piece",
  "per box",
  "per gallon",
  "per sheet",
  "per length",
  "per roll",
  "per bundle",
  "per set",
  "per unit",
]

export const Route = createFileRoute("/dashboard/seller/catalog/new")({
  component: SellerCatalogNewRoute,
})

function SellerCatalogNewRoute() {
  const [name, setName] = useState("")
  const [category, setCategory] = useState(productCategories[0]?.name ?? "")
  const [sku, setSku] = useState("")
  const [unit, setUnit] = useState(unitOptions[0])
  const [price, setPrice] = useState<number | "">("")
  const [oldPrice, setOldPrice] = useState<number | "">("")
  const [stock, setStock] = useState<number | "">("")
  const [description, setDescription] = useState("")
  const [status, setStatus] = useState<"live" | "draft">("draft")
  const [bulkDiscount, setBulkDiscount] = useState(false)
  const [variants, setVariants] = useState<Variant[]>([])
  const [imageCount] = useState(0)

  const priceNum = typeof price === "number" ? price : 0
  const commissionRate = 0.10
  const fee = Math.round(priceNum * commissionRate)
  const net = priceNum - fee

  function addVariant() {
    setVariants((prev) => [
      ...prev,
      {
        id: `var-${Date.now()}`,
        attribute: "Size",
        value: "",
        priceDelta: 0,
        stock: 0,
      },
    ])
  }

  function updateVariant<K extends keyof Variant>(id: string, key: K, value: Variant[K]) {
    setVariants((prev) => prev.map((v) => (v.id === id ? { ...v, [key]: value } : v)))
  }

  function removeVariant(id: string) {
    setVariants((prev) => prev.filter((v) => v.id !== id))
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    // Prototype only — no backend wiring.
  }

  return (
    <ShadcnDashboardShell role="seller" title="Add product">
      <div className="px-4 lg:px-6">
        <Link
          to="/dashboard/seller/catalog"
          className="inline-flex items-center gap-1.5 text-xs font-semibold tracking-widest text-muted-foreground uppercase hover:text-brand-orange"
        >
          <HugeiconsIcon icon={ArrowLeft01Icon} className="size-3.5" strokeWidth={2.5} />
          Back to catalog
        </Link>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6 px-4 lg:grid-cols-3 lg:px-6">
        <div className="space-y-6 lg:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <HugeiconsIcon icon={PackageIcon} className="size-5 text-brand-orange" strokeWidth={2} />
                <CardTitle>Product details</CardTitle>
              </div>
              <CardDescription>Buyers see this on the shop and product detail page.</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div>
                <Label htmlFor="name">Product name</Label>
                <Input
                  id="name"
                  className="mt-1"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Portland Cement (40kg) — Type I"
                />
              </div>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <Label htmlFor="category">Category</Label>
                  <select
                    id="category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="mt-1 h-10 w-full rounded-md border border-input bg-white px-3 text-sm focus-visible:border-brand-orange focus-visible:outline-none"
                  >
                    {productCategories.map((c) => (
                      <option key={c.name} value={c.name}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <Label htmlFor="sku">SKU</Label>
                  <Input
                    id="sku"
                    className="mt-1"
                    value={sku}
                    onChange={(e) => setSku(e.target.value)}
                    placeholder="e.g. CEM-PT-40"
                  />
                  <p className="mt-1 text-xs text-muted-foreground">
                    Auto-generated if left blank.
                  </p>
                </div>
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <textarea
                  id="description"
                  rows={4}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Material specs, certifications, packaging notes…"
                  className="mt-1 w-full rounded-md border border-border bg-white px-3 py-2 text-sm focus-visible:border-brand-orange focus-visible:outline-none"
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <HugeiconsIcon icon={Image01Icon} className="size-5 text-brand-orange" strokeWidth={2} />
                <CardTitle>Photos</CardTitle>
              </div>
              <CardDescription>
                First image is the cover. PNG / JPG, up to 5MB each.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                {[0, 1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className={cn(
                      "flex aspect-square items-center justify-center rounded-lg border border-dashed",
                      i === 0 ? "border-brand-orange bg-brand-orange/5" : "border-border bg-muted/30",
                    )}
                  >
                    <div className="flex flex-col items-center gap-1 text-muted-foreground">
                      <HugeiconsIcon icon={Image01Icon} className="size-6" strokeWidth={2} />
                      <span className="text-[10px] tracking-widest uppercase">
                        {i === 0 ? "Cover" : `Slot ${i + 1}`}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              <Button type="button" size="sm" variant="outline" className="mt-4">
                <HugeiconsIcon icon={PlusSignIcon} strokeWidth={2} />
                Upload photo{imageCount === 0 ? "" : ` (${imageCount})`}
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <HugeiconsIcon icon={PackageIcon} className="size-5 text-brand-orange" strokeWidth={2} />
                <CardTitle>Variants</CardTitle>
              </div>
              <CardDescription>
                Size, color, finish, or pack count. Each variant has its own price delta and stock.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-3">
              {variants.length === 0 && (
                <p className="rounded-lg border border-dashed border-border bg-muted/30 px-4 py-6 text-center text-sm text-muted-foreground">
                  No variants yet. Add one if this product comes in multiple sizes or styles.
                </p>
              )}
              {variants.map((v) => (
                <div
                  key={v.id}
                  className="grid grid-cols-1 gap-3 rounded-lg border border-border p-3 sm:grid-cols-[1fr_1.5fr_1fr_1fr_auto]"
                >
                  <div>
                    <Label className="text-[10px]">Attribute</Label>
                    <select
                      value={v.attribute}
                      onChange={(e) => updateVariant(v.id, "attribute", e.target.value)}
                      className="mt-1 h-9 w-full rounded-md border border-input bg-white px-2 text-xs focus-visible:border-brand-orange focus-visible:outline-none"
                    >
                      {["Size", "Color", "Finish", "Pack count", "Grade"].map((a) => (
                        <option key={a} value={a}>
                          {a}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <Label className="text-[10px]">Value</Label>
                    <Input
                      className="mt-1 h-9"
                      value={v.value}
                      onChange={(e) => updateVariant(v.id, "value", e.target.value)}
                      placeholder="e.g. 40kg / Matte Grey / 12pc"
                    />
                  </div>
                  <div>
                    <Label className="text-[10px]">Price delta (₱)</Label>
                    <Input
                      type="number"
                      className="mt-1 h-9"
                      value={v.priceDelta}
                      onChange={(e) =>
                        updateVariant(v.id, "priceDelta", Number(e.target.value) || 0)
                      }
                      placeholder="0"
                    />
                  </div>
                  <div>
                    <Label className="text-[10px]">Stock</Label>
                    <Input
                      type="number"
                      className="mt-1 h-9"
                      value={v.stock}
                      onChange={(e) => updateVariant(v.id, "stock", Number(e.target.value) || 0)}
                    />
                  </div>
                  <div className="flex items-end">
                    <Button
                      type="button"
                      size="icon-sm"
                      variant="ghost"
                      onClick={() => removeVariant(v.id)}
                      aria-label="Remove variant"
                    >
                      <HugeiconsIcon icon={Delete02Icon} className="size-4" strokeWidth={2} />
                    </Button>
                  </div>
                </div>
              ))}
              <Button type="button" size="sm" variant="outline" onClick={addVariant}>
                <HugeiconsIcon icon={PlusSignIcon} strokeWidth={2} />
                Add variant
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Pricing & stock</CardTitle>
              <CardDescription>Base pricing — variants override per row.</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div>
                <Label htmlFor="price">Base price (₱)</Label>
                <Input
                  id="price"
                  type="number"
                  required
                  className="mt-1"
                  value={price}
                  onChange={(e) => setPrice(e.target.value === "" ? "" : Number(e.target.value))}
                  placeholder="265"
                />
              </div>
              <div>
                <Label htmlFor="old-price">Compare-at price (₱)</Label>
                <Input
                  id="old-price"
                  type="number"
                  className="mt-1"
                  value={oldPrice}
                  onChange={(e) =>
                    setOldPrice(e.target.value === "" ? "" : Number(e.target.value))
                  }
                  placeholder="350"
                />
                <p className="mt-1 text-xs text-muted-foreground">
                  Strikethrough on the shop card if higher than base price.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label htmlFor="stock">Stock</Label>
                  <Input
                    id="stock"
                    type="number"
                    className="mt-1"
                    value={stock}
                    onChange={(e) => setStock(e.target.value === "" ? "" : Number(e.target.value))}
                    placeholder="0"
                  />
                </div>
                <div>
                  <Label htmlFor="unit">Unit</Label>
                  <select
                    id="unit"
                    value={unit}
                    onChange={(e) => setUnit(e.target.value)}
                    className="mt-1 h-10 w-full rounded-md border border-input bg-white px-3 text-sm focus-visible:border-brand-orange focus-visible:outline-none"
                  >
                    {unitOptions.map((u) => (
                      <option key={u} value={u}>
                        {u}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <label className="flex items-start gap-2 rounded-lg border border-border p-3">
                <input
                  type="checkbox"
                  checked={bulkDiscount}
                  onChange={(e) => setBulkDiscount(e.target.checked)}
                  className="mt-0.5 size-4 accent-brand-orange"
                />
                <div>
                  <p className="text-sm font-medium text-brand-black">
                    Show "Bulk Discount" badge
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Tier pricing kicks in at higher quantities.
                  </p>
                </div>
              </label>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <HugeiconsIcon icon={Coins01Icon} className="size-5 text-brand-orange" strokeWidth={2} />
                <CardTitle className="text-base">Commission preview</CardTitle>
              </div>
              <CardDescription>Atomic deduction at checkout.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <div className="flex items-start gap-2 rounded-lg border border-border bg-amber-50/40 p-3 text-xs">
                <HugeiconsIcon
                  icon={InformationCircleIcon}
                  className="mt-0.5 size-3.5 shrink-0 text-amber-600"
                  strokeWidth={2}
                />
                <p className="text-brand-black/80">
                  STRUKTURA deducts 5–15% per sale, depending on category. Buyer payment lands in
                  your bank — no platform balance.
                </p>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Buyer pays</span>
                <span className="font-medium">{peso(priceNum)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">
                  Platform fee ({(commissionRate * 100).toFixed(0)}%)
                </span>
                <span className="text-muted-foreground">−{peso(fee)}</span>
              </div>
              <div className="flex justify-between border-t border-border pt-2 font-semibold">
                <span>You receive</span>
                <span className="text-emerald-700">{peso(net)}</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Visibility</CardTitle>
              <CardDescription>Save as draft to keep editing privately.</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-2">
              <label
                className={cn(
                  "flex cursor-pointer items-center gap-3 rounded-lg border p-3 text-sm",
                  status === "draft"
                    ? "border-brand-orange bg-brand-orange/5"
                    : "border-border",
                )}
              >
                <input
                  type="radio"
                  name="status"
                  value="draft"
                  checked={status === "draft"}
                  onChange={() => setStatus("draft")}
                  className="size-4 accent-brand-orange"
                />
                <div>
                  <p className="font-medium">Save as draft</p>
                  <p className="text-xs text-muted-foreground">
                    Not visible to buyers. Can publish later.
                  </p>
                </div>
              </label>
              <label
                className={cn(
                  "flex cursor-pointer items-center gap-3 rounded-lg border p-3 text-sm",
                  status === "live"
                    ? "border-brand-orange bg-brand-orange/5"
                    : "border-border",
                )}
              >
                <input
                  type="radio"
                  name="status"
                  value="live"
                  checked={status === "live"}
                  onChange={() => setStatus("live")}
                  className="size-4 accent-brand-orange"
                />
                <div>
                  <p className="font-medium">Publish to shop</p>
                  <p className="text-xs text-muted-foreground">
                    Buyers can find this product immediately.
                  </p>
                </div>
              </label>
            </CardContent>
          </Card>

          <div className="flex flex-col gap-2">
            <Button type="submit" size="default">
              {status === "live" ? (
                <>
                  <HugeiconsIcon icon={Tick02Icon} strokeWidth={2.5} />
                  Publish product
                </>
              ) : (
                <>
                  <HugeiconsIcon icon={Tick02Icon} strokeWidth={2.5} />
                  Save draft
                </>
              )}
            </Button>
            <Button
              type="button"
              size="default"
              variant="ghost"
              render={<Link to="/dashboard/seller/catalog" />}
            >
              Cancel
            </Button>
            <p className="text-center text-[10px] tracking-widest text-muted-foreground uppercase">
              Prototype — submission is a no-op{" "}
              <Badge variant="secondary" className="ml-1">
                {category}
              </Badge>
            </p>
          </div>
        </div>
      </form>
    </ShadcnDashboardShell>
  )
}
