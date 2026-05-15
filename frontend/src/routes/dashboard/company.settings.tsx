import * as React from "react"
import { useState } from "react"
import { createFileRoute } from "@tanstack/react-router"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  Building01Icon,
  BankIcon,
  Plant02Icon,
  UserGroup03Icon,
  Notification03Icon,
  ShieldKeyIcon,
  Tick02Icon,
  Image01Icon,
  PlusSignIcon,
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
import { companySettings } from "@/components/dashboard/company-data"
import { cn } from "@/lib/utils"

const allRegions = [
  "NCR",
  "Cavite",
  "Laguna",
  "Bulacan",
  "Rizal",
  "Calabarzon",
  "Central Luzon",
  "Visayas",
  "Mindanao",
]

export const Route = createFileRoute("/dashboard/company/settings")({
  component: CompanySettingsRoute,
})

function CompanySettingsRoute() {
  const [coverage, setCoverage] = useState<string[]>(companySettings.coverage)
  const [notifications, setNotifications] = useState(companySettings.notifications)

  function toggleCoverage(r: string) {
    setCoverage((prev) => (prev.includes(r) ? prev.filter((x) => x !== r) : [...prev, r]))
  }
  function toggleNotif(key: keyof typeof notifications) {
    setNotifications((prev) => ({ ...prev, [key]: !prev[key] }))
  }

  return (
    <ShadcnDashboardShell role="company" title="Settings">
      <div className="grid grid-cols-1 gap-6 px-4 lg:grid-cols-2 lg:px-6">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <HugeiconsIcon icon={Building01Icon} className="size-5 text-brand-orange" strokeWidth={2} />
              <CardTitle>Company profile</CardTitle>
            </div>
            <CardDescription>Public-facing company details.</CardDescription>
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
            <Field label="Company name" id="company-name" defaultValue={companySettings.company.name} />
            <Field label="Slug" id="company-slug" defaultValue={companySettings.company.slug} hint="struktura.ph/company/<slug>" />
            <div>
              <Label htmlFor="company-description">Description</Label>
              <textarea
                id="company-description"
                rows={3}
                defaultValue={companySettings.company.description}
                className="mt-1 w-full rounded-md border border-border bg-white px-3 py-2 text-sm focus-visible:border-brand-orange focus-visible:outline-none"
              />
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <Field label="Website" id="company-website" defaultValue={companySettings.company.website} />
              <Field label="Support phone" id="company-phone" defaultValue={companySettings.company.supportPhone} />
            </div>
            <Field label="Support email" id="company-email" type="email" defaultValue={companySettings.company.supportEmail} />
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
            <CardDescription>Where customer payments deposit.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="flex items-start gap-3 rounded-lg border border-border bg-amber-50/40 p-3 text-xs text-brand-black/80">
              <HugeiconsIcon
                icon={InformationCircleIcon}
                className="mt-0.5 size-4 shrink-0 text-amber-600"
                strokeWidth={2}
              />
              <p>
                Customer payments arrive here directly. STRUKTURA does not hold
                your funds — platform commission is deducted at checkout.
              </p>
            </div>
            <div>
              <Label htmlFor="bank-provider">Bank / wallet provider</Label>
              <select
                id="bank-provider"
                defaultValue={companySettings.bank.provider}
                className="mt-1 h-10 w-full rounded-md border border-input bg-white px-3 text-sm focus-visible:border-brand-orange focus-visible:outline-none"
              >
                {["BPI", "BDO", "Metrobank", "GCash", "Maya"].map((p) => (
                  <option key={p} value={p}>
                    {p}
                  </option>
                ))}
              </select>
            </div>
            <Field label="Account name" id="bank-account-name" defaultValue={companySettings.bank.accountName} />
            <Field
              label="Account number"
              id="bank-account-number"
              defaultValue={`••••••${companySettings.bank.last4}`}
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
              <HugeiconsIcon icon={Plant02Icon} className="size-5 text-brand-orange" strokeWidth={2} />
              <CardTitle>Service coverage</CardTitle>
            </div>
            <CardDescription>Regions where you offer services.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {allRegions.map((r) => {
                const on = coverage.includes(r)
                return (
                  <button
                    key={r}
                    type="button"
                    onClick={() => toggleCoverage(r)}
                    className={cn(
                      "rounded-full border border-border px-3 py-1.5 text-xs font-medium transition-colors",
                      on
                        ? "border-brand-orange bg-brand-orange text-white"
                        : "bg-white text-brand-black/70 hover:bg-muted",
                    )}
                  >
                    {r}
                  </button>
                )
              })}
            </div>
            <p className="mt-3 text-xs text-muted-foreground">
              {coverage.length} regions selected.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <HugeiconsIcon icon={UserGroup03Icon} className="size-5 text-brand-orange" strokeWidth={2} />
              <CardTitle>Team members</CardTitle>
            </div>
            <CardDescription>People who can manage bookings and settings.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-3">
            {companySettings.team.map((m) => (
              <div
                key={m.id}
                className="flex items-center justify-between rounded-lg border border-border p-3"
              >
                <div>
                  <p className="text-sm font-medium text-brand-black">{m.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {m.role} · {m.email}
                  </p>
                </div>
                <Button size="sm" variant="ghost">
                  Manage
                </Button>
              </div>
            ))}
            <Button size="sm" variant="outline">
              <HugeiconsIcon icon={PlusSignIcon} strokeWidth={2} />
              Add team member
            </Button>
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
                { key: "newBooking", label: "New booking", hint: "Customer books one of your services" },
                { key: "bookingCancelled", label: "Booking cancelled", hint: "Customer cancels a confirmed booking" },
                { key: "review", label: "Review received", hint: "Customer leaves a review after a completed booking" },
                { key: "deposit", label: "Deposit confirmed", hint: "Bank deposit reaches your account" },
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
            <CardDescription>Login, two-factor, and active sessions.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <Field
              label="Login email"
              id="login-email"
              defaultValue={companySettings.security.email}
              readOnly
            />
            <div className="flex items-center justify-between rounded-lg border border-border p-3">
              <div>
                <p className="text-sm font-medium text-brand-black">Two-factor (TOTP)</p>
                <p className="text-xs text-muted-foreground">
                  {companySettings.security.mfa
                    ? "Enabled · authenticator required at sign-in"
                    : "Disabled — enable to protect your account"}
                </p>
              </div>
              {companySettings.security.mfa ? (
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
