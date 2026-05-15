import * as React from "react"
import { useState } from "react"
import { createFileRoute } from "@tanstack/react-router"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  UserCircle02Icon,
  CreditCardIcon,
  Notification03Icon,
  ShieldKeyIcon,
  Tick02Icon,
  PlusSignIcon,
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
import { clientSettings } from "@/components/dashboard/client-data"

export const Route = createFileRoute("/dashboard/client/settings")({
  component: ClientSettingsRoute,
})

function ClientSettingsRoute() {
  const [notifications, setNotifications] = useState(clientSettings.notifications)
  const [methods] = useState(clientSettings.paymentMethods)

  function toggle(key: keyof typeof notifications) {
    setNotifications((prev) => ({ ...prev, [key]: !prev[key] }))
  }

  return (
    <ShadcnDashboardShell role="client" title="Settings">
      <div className="grid grid-cols-1 gap-6 px-4 lg:grid-cols-2 lg:px-6">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <HugeiconsIcon icon={UserCircle02Icon} className="size-5 text-brand-orange" strokeWidth={2} />
              <CardTitle>Profile</CardTitle>
            </div>
            <CardDescription>Personal info and default delivery details.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <Field label="Full name" id="profile-name" defaultValue={clientSettings.profile.name} />
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <Field label="Email" id="profile-email" type="email" defaultValue={clientSettings.profile.email} />
              <Field label="Phone" id="profile-phone" defaultValue={clientSettings.profile.phone} />
            </div>
            <Field
              label="Default delivery address"
              id="profile-address"
              defaultValue={clientSettings.profile.deliveryAddress}
            />
            <div className="flex justify-end">
              <Button size="sm">Save profile</Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <HugeiconsIcon icon={CreditCardIcon} className="size-5 text-brand-orange" strokeWidth={2} />
              <CardTitle>Billing & payment methods</CardTitle>
            </div>
            <CardDescription>Used for material orders and project escrow funding.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-3">
            {methods.map((m) => (
              <div
                key={`${m.provider}-${m.last4}`}
                className="flex items-center justify-between rounded-lg border border-border p-3"
              >
                <div>
                  <p className="text-sm font-medium text-brand-black">
                    {m.label} <span className="text-muted-foreground">••••{m.last4}</span>
                  </p>
                  <p className="text-xs text-muted-foreground">{m.provider}</p>
                </div>
                {m.isDefault ? (
                  <Badge variant="outline" className="gap-1 text-emerald-700">
                    <HugeiconsIcon icon={Tick02Icon} className="size-3" strokeWidth={2.5} />
                    Default
                  </Badge>
                ) : (
                  <Button size="sm" variant="ghost">
                    Set default
                  </Button>
                )}
              </div>
            ))}
            <Button size="sm" variant="outline">
              <HugeiconsIcon icon={PlusSignIcon} strokeWidth={2} />
              Add payment method
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
                { key: "bidReceived", label: "New bid received", hint: "Contractor submits a bid on a posted job" },
                { key: "milestoneApproved", label: "Milestone approved", hint: "Escrow released to your contractor" },
                { key: "orderShipped", label: "Order shipped", hint: "Carrier picked up your material order" },
                { key: "estimateReady", label: "Estimate ready", hint: "Cost report PDF available" },
                { key: "disputeUpdate", label: "Dispute update", hint: "Reviewer comments or rules on your case" },
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
              <CardTitle>Privacy & security</CardTitle>
            </div>
            <CardDescription>Login, two-factor, and active sessions.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <Field
              label="Login email"
              id="login-email"
              defaultValue={clientSettings.security.email}
              readOnly
            />
            <div className="flex items-center justify-between rounded-lg border border-border p-3">
              <div>
                <p className="text-sm font-medium text-brand-black">Two-factor (TOTP)</p>
                <p className="text-xs text-muted-foreground">
                  {clientSettings.security.mfa
                    ? "Enabled · authenticator required at sign-in"
                    : "Disabled — enable to protect your account"}
                </p>
              </div>
              {clientSettings.security.mfa ? (
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
                    Last active {clientSettings.security.lastLogin}
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
