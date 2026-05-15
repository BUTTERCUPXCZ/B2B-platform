import * as React from "react"
import { useState } from "react"
import { createFileRoute } from "@tanstack/react-router"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  BankIcon,
  Building01Icon,
  TruckDeliveryIcon,
  Notification03Icon,
  ShieldKeyIcon,
  Image01Icon,
  Tick02Icon,
  PackageIcon,
  InformationCircleIcon,
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
import { sellerSettings } from "@/components/dashboard/dashboard-data"
import { productCategories } from "@/components/shop/shop-data"
import { cn } from "@/lib/utils"

export const Route = createFileRoute("/dashboard/seller/settings")({
  component: SellerSettingsRoute,
})

function SellerSettingsRoute() {
  const [categories, setCategories] = useState<string[]>(sellerSettings.categories)
  const [notifications, setNotifications] = useState(sellerSettings.notifications)

  function toggleCategory(name: string) {
    setCategories((prev) =>
      prev.includes(name) ? prev.filter((c) => c !== name) : [...prev, name],
    )
  }

  function toggleNotif(key: keyof typeof notifications) {
    setNotifications((prev) => ({ ...prev, [key]: !prev[key] }))
  }

  return (
    <ShadcnDashboardShell role="seller" title="Settings">
      <div className="grid grid-cols-1 gap-6 px-4 lg:grid-cols-2 lg:px-6">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <HugeiconsIcon icon={Building01Icon} className="size-5 text-brand-orange" strokeWidth={2} />
              <CardTitle>Store profile</CardTitle>
            </div>
            <CardDescription>How buyers see your business on STRUKTURA.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="flex items-center gap-4">
              <span className="flex size-16 shrink-0 items-center justify-center rounded-xl border border-dashed border-border bg-muted text-muted-foreground">
                <HugeiconsIcon icon={Image01Icon} className="size-6" strokeWidth={2} />
              </span>
              <Button size="sm" variant="outline">
                Upload logo
              </Button>
            </div>
            <Field label="Store name" id="store-name" defaultValue={sellerSettings.store.name} />
            <Field
              label="Store URL slug"
              id="store-slug"
              defaultValue={sellerSettings.store.slug}
              hint="struktura.ph/seller/<slug>"
            />
            <Field label="Tagline" id="store-tagline" defaultValue={sellerSettings.store.tagline} />
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <Field label="Support email" id="support-email" type="email" defaultValue={sellerSettings.store.supportEmail} />
              <Field label="Support phone" id="support-phone" defaultValue={sellerSettings.store.supportPhone} />
            </div>
            <div className="flex justify-end">
              <Button size="sm">Save profile</Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <HugeiconsIcon icon={BankIcon} className="size-5 text-brand-orange" strokeWidth={2} />
              <CardTitle>Bank account</CardTitle>
            </div>
            <CardDescription>Where buyer payments deposit.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="flex items-start gap-3 rounded-lg border border-border bg-amber-50/40 p-3 text-xs text-brand-black/80">
              <HugeiconsIcon
                icon={InformationCircleIcon}
                className="mt-0.5 size-4 shrink-0 text-amber-600"
                strokeWidth={2}
              />
              <p>
                Buyer payments arrive here directly. STRUKTURA does not hold
                your funds — platform commission is deducted at checkout.
              </p>
            </div>
            <div>
              <Label htmlFor="bank-provider">Bank / wallet provider</Label>
              <select
                id="bank-provider"
                defaultValue={sellerSettings.bank.provider}
                className="mt-1 h-10 w-full rounded-md border border-input bg-white px-3 text-sm focus-visible:border-brand-orange focus-visible:outline-none"
              >
                {["BPI", "BDO", "Metrobank", "GCash", "Maya"].map((p) => (
                  <option key={p} value={p}>
                    {p}
                  </option>
                ))}
              </select>
            </div>
            <Field
              label="Account name"
              id="bank-account-name"
              defaultValue={sellerSettings.bank.accountName}
            />
            <Field
              label="Account number"
              id="bank-account-number"
              defaultValue={`••••••${sellerSettings.bank.last4}`}
              hint="Last 4 digits visible — full number stored securely."
            />
            <div className="flex justify-end">
              <Button size="sm">Update bank</Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <HugeiconsIcon icon={TruckDeliveryIcon} className="size-5 text-brand-orange" strokeWidth={2} />
              <CardTitle>Shipping & pickup</CardTitle>
            </div>
            <CardDescription>Where couriers collect orders and your default lead time.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <Field
              label="Pickup address"
              id="pickup-address"
              defaultValue={sellerSettings.shipping.pickupAddress}
            />
            <Field
              label="Default lead time (days)"
              id="lead-time"
              type="number"
              defaultValue={String(sellerSettings.shipping.leadTimeDays)}
            />
            <div>
              <Label>Couriers enabled</Label>
              <div className="mt-2 flex flex-wrap gap-2">
                {["J&T Express", "LBC", "NinjaVan", "Grab Express", "Lalamove"].map((c) => {
                  const enabled = sellerSettings.shipping.couriers.includes(c)
                  return (
                    <Badge key={c} variant={enabled ? "outline" : "secondary"} className="px-3 py-1">
                      {enabled && (
                        <HugeiconsIcon
                          icon={Tick02Icon}
                          className="size-3 text-emerald-600"
                          strokeWidth={2.5}
                        />
                      )}
                      {c}
                    </Badge>
                  )
                })}
              </div>
            </div>
            <div className="flex justify-end">
              <Button size="sm">Save shipping</Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <HugeiconsIcon icon={PackageIcon} className="size-5 text-brand-orange" strokeWidth={2} />
              <CardTitle>Categories I sell</CardTitle>
            </div>
            <CardDescription>Buyers filter the marketplace by these.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {productCategories.map((cat) => {
                const active = categories.includes(cat.name)
                return (
                  <button
                    key={cat.name}
                    type="button"
                    onClick={() => toggleCategory(cat.name)}
                    className={cn(
                      "rounded-full border border-border px-3 py-1.5 text-xs font-medium transition-colors",
                      active
                        ? "border-brand-orange bg-brand-orange text-white"
                        : "bg-white text-brand-black/70 hover:bg-muted",
                    )}
                  >
                    {cat.name}
                  </button>
                )
              })}
            </div>
            <p className="mt-3 text-xs text-muted-foreground">
              {categories.length} categories selected · pick the ones where you list SKUs.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <HugeiconsIcon icon={Notification03Icon} className="size-5 text-brand-orange" strokeWidth={2} />
              <CardTitle>Notifications</CardTitle>
            </div>
            <CardDescription>Email + in-app alerts.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-3">
            {(
              [
                { key: "newOrder", label: "New order placed", hint: "Acknowledge within 24h to keep ranking" },
                { key: "dispute", label: "Dispute opened", hint: "Respond within 3 business days" },
                { key: "review", label: "Review received", hint: "Reply quickly to lift visible score" },
                { key: "deposit", label: "Deposit confirmed", hint: "Bank deposit lands in your account" },
                { key: "lowStock", label: "Low stock alert", hint: "When SKU drops below 100 units" },
              ] as const
            ).map((row) => (
              <label
                key={row.key}
                className="flex items-start justify-between gap-4 rounded-lg border border-border p-3"
              >
                <div>
                  <p className="text-sm font-medium text-brand-black">{row.label}</p>
                  <p className="text-xs text-muted-foreground">{row.hint}</p>
                </div>
                <input
                  type="checkbox"
                  checked={notifications[row.key]}
                  onChange={() => toggleNotif(row.key)}
                  className="mt-1 size-4 accent-brand-orange"
                />
              </label>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <HugeiconsIcon icon={ShieldKeyIcon} className="size-5 text-brand-orange" strokeWidth={2} />
              <CardTitle>Account & security</CardTitle>
            </div>
            <CardDescription>Login email, two-factor, and active sessions.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <Field
              label="Login email"
              id="login-email"
              defaultValue={sellerSettings.security.email}
              readOnly
            />
            <div className="flex items-center justify-between rounded-lg border border-border p-3">
              <div>
                <p className="text-sm font-medium text-brand-black">Two-factor (TOTP)</p>
                <p className="text-xs text-muted-foreground">
                  {sellerSettings.security.mfa
                    ? "Enabled · authenticator app required at sign-in"
                    : "Disabled — turn on to protect your account"}
                </p>
              </div>
              {sellerSettings.security.mfa ? (
                <Badge variant="outline" className="gap-1 text-emerald-700">
                  <HugeiconsIcon icon={Tick02Icon} className="size-3" strokeWidth={2.5} />
                  Enabled
                </Badge>
              ) : (
                <Button size="sm" variant="outline">
                  Enable
                </Button>
              )}
            </div>
            <div className="rounded-lg border border-border">
              <div className="border-b border-border bg-muted/40 px-3 py-2 text-[10px] font-semibold tracking-widest text-muted-foreground uppercase">
                Active sessions
              </div>
              <div className="flex items-center justify-between px-3 py-2 text-sm">
                <div>
                  <p className="font-medium text-brand-black">This device</p>
                  <p className="text-xs text-muted-foreground">
                    Chrome on macOS · Manila · Last active {sellerSettings.security.lastLogin}
                  </p>
                </div>
                <Badge variant="outline">Current</Badge>
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button size="sm" variant="outline">
                Change password
              </Button>
              <Button size="sm" variant="destructive">
                Sign out everywhere
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </ShadcnDashboardShell>
  )
}

function Field({
  label,
  id,
  hint,
  ...props
}: React.ComponentProps<typeof Input> & { label: string; id: string; hint?: string }) {
  return (
    <div>
      <Label htmlFor={id}>{label}</Label>
      <Input id={id} className="mt-1" {...props} />
      {hint && <p className="mt-1 text-xs text-muted-foreground">{hint}</p>}
    </div>
  )
}
