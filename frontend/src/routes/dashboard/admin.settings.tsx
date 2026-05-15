import * as React from "react"
import { useState } from "react"
import { createFileRoute } from "@tanstack/react-router"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  UserCircle02Icon,
  Notification03Icon,
  ShieldKeyIcon,
  File02Icon,
  Tick02Icon,
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
import { adminSettings } from "@/components/dashboard/admin-data"

export const Route = createFileRoute("/dashboard/admin/settings")({
  component: AdminSettingsRoute,
})

function AdminSettingsRoute() {
  const [notifications, setNotifications] = useState(adminSettings.notifications)

  function toggle(key: keyof typeof notifications) {
    setNotifications((prev) => ({ ...prev, [key]: !prev[key] }))
  }

  return (
    <ShadcnDashboardShell role="admin" title="Settings">
      <div className="grid grid-cols-1 gap-6 px-4 lg:grid-cols-2 lg:px-6">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <HugeiconsIcon icon={UserCircle02Icon} className="size-5 text-brand-orange" strokeWidth={2} />
              <CardTitle>Admin profile</CardTitle>
            </div>
            <CardDescription>Your platform admin identity.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <Field label="Full name" id="admin-name" defaultValue={adminSettings.profile.name} />
            <div>
              <Label htmlFor="admin-role">Role</Label>
              <Input
                id="admin-role"
                className="mt-1"
                defaultValue={adminSettings.profile.role}
                readOnly
              />
              <p className="mt-1 text-xs text-muted-foreground">
                Role changes require contact with platform owner.
              </p>
            </div>
            <Field label="Login email" id="admin-email" defaultValue={adminSettings.profile.email} readOnly />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <HugeiconsIcon icon={File02Icon} className="size-5 text-brand-orange" strokeWidth={2} />
              <CardTitle>Audit log access</CardTitle>
            </div>
            <CardDescription>Read-only stream of admin + reviewer actions.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-3">
            <div className="rounded-lg border border-border bg-muted/40 p-3 text-sm">
              <p className="font-medium text-brand-black">Audit logs are read-only.</p>
              <p className="mt-0.5 text-xs text-muted-foreground">
                View the full event stream in the security console — every admin
                action, KYC decision, and dispute ruling is recorded.
              </p>
            </div>
            <Button size="sm" variant="outline">
              Open security console
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <HugeiconsIcon icon={Notification03Icon} className="size-5 text-brand-orange" strokeWidth={2} />
              <CardTitle>Notifications</CardTitle>
            </div>
            <CardDescription>System events you want to be alerted on.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-3">
            {(
              [
                { key: "disputeOpened", label: "Dispute opened", hint: "Any new buyer-vs-seller / buyer-vs-contractor case" },
                { key: "kycSubmitted", label: "KYC submitted", hint: "New verification application enters the queue" },
                { key: "payoutProcessed", label: "Payout processed", hint: "Reviewer triggers a manual escrow release" },
                { key: "systemAlert", label: "System alert", hint: "Infrastructure or security alert from the platform" },
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
                  onChange={() => toggle(row.key)}
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
              <CardTitle>Security</CardTitle>
            </div>
            <CardDescription>Two-factor and active sessions.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="flex items-center justify-between rounded-lg border border-border p-3">
              <div>
                <p className="text-sm font-medium text-brand-black">Two-factor (TOTP)</p>
                <p className="text-xs text-muted-foreground">
                  MFA is required for all platform admins — cannot be disabled.
                </p>
              </div>
              <Badge variant="outline" className="gap-1 text-emerald-700">
                <HugeiconsIcon icon={Tick02Icon} className="size-3" strokeWidth={2.5} />
                Required
              </Badge>
            </div>
            <div className="rounded-lg border border-border">
              <div className="border-b border-border bg-muted/40 px-3 py-2 text-[10px] font-semibold tracking-widest text-muted-foreground uppercase">
                Active sessions
              </div>
              <div className="flex items-center justify-between px-3 py-2 text-sm">
                <div>
                  <p className="font-medium text-brand-black">This device</p>
                  <p className="text-xs text-muted-foreground">
                    Last active {adminSettings.security.lastLogin}
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
