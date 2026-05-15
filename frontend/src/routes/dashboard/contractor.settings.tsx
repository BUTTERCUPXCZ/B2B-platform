import * as React from "react"
import { useState } from "react"
import { createFileRoute } from "@tanstack/react-router"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  UserCircle02Icon,
  BankIcon,
  Plant02Icon,
  CheckmarkBadge01Icon,
  Notification03Icon,
  ShieldKeyIcon,
  Tick02Icon,
  AlertCircleIcon,
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
import { contractorSettings } from "@/components/dashboard/contractor-data"
import { cn } from "@/lib/utils"

const allRegions = [
  "Metro Manila",
  "Bulacan",
  "Rizal",
  "Cavite",
  "Laguna",
  "Calabarzon",
  "Central Luzon",
  "Visayas",
  "Mindanao",
]

export const Route = createFileRoute("/dashboard/contractor/settings")({
  component: ContractorSettingsRoute,
})

function ContractorSettingsRoute() {
  const [coverage, setCoverage] = useState<string[]>(contractorSettings.coverage)
  const [trades, setTrades] = useState<string[]>(contractorSettings.profile.trades)
  const [notifications, setNotifications] = useState(contractorSettings.notifications)

  function toggleCoverage(r: string) {
    setCoverage((prev) => (prev.includes(r) ? prev.filter((x) => x !== r) : [...prev, r]))
  }
  function toggleTrade(t: string) {
    setTrades((prev) => (prev.includes(t) ? prev.filter((x) => x !== t) : [...prev, t]))
  }
  function toggleNotif(key: keyof typeof notifications) {
    setNotifications((prev) => ({ ...prev, [key]: !prev[key] }))
  }

  const tradeOptions = [
    "Roofing",
    "Plumbing",
    "Electrical",
    "Painting",
    "Renovation",
    "Custom Home Build",
    "Landscaping",
    "Repairs & Handyman",
  ]

  const ladder: { key: keyof typeof contractorSettings.verification; label: string }[] = [
    { key: "identity", label: "Identity" },
    { key: "license", label: "License" },
    { key: "portfolio", label: "Portfolio" },
    { key: "topRated", label: "Top Rated" },
  ]

  return (
    <ShadcnDashboardShell role="contractor" title="Settings">
      <div className="grid grid-cols-1 gap-6 px-4 lg:grid-cols-2 lg:px-6">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <HugeiconsIcon icon={UserCircle02Icon} className="size-5 text-brand-orange" strokeWidth={2} />
              <CardTitle>Professional profile</CardTitle>
            </div>
            <CardDescription>How clients see you in search and on bids.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="flex items-center gap-4">
              <span className="size-16 shrink-0 overflow-hidden rounded-xl bg-muted">
                <img
                  src={contractorSettings.profile.headshotUrl}
                  alt=""
                  className="size-full object-cover"
                />
              </span>
              <Button size="sm" variant="outline">
                Replace headshot
              </Button>
            </div>
            <Field
              label="Display name"
              id="display-name"
              defaultValue={contractorSettings.profile.displayName}
            />
            <div>
              <Label>Trades</Label>
              <div className="mt-2 flex flex-wrap gap-2">
                {tradeOptions.map((t) => {
                  const on = trades.includes(t)
                  return (
                    <button
                      key={t}
                      type="button"
                      onClick={() => toggleTrade(t)}
                      className={cn(
                        "rounded-full border border-border px-3 py-1 text-xs font-medium transition-colors",
                        on
                          ? "border-brand-orange bg-brand-orange text-white"
                          : "bg-white text-brand-black/70 hover:bg-muted",
                      )}
                    >
                      {t}
                    </button>
                  )
                })}
              </div>
            </div>
            <Field
              label="License number"
              id="license-no"
              defaultValue={contractorSettings.profile.licenseNumber}
              hint="PCAB / DOLE / barangay permit number — verified"
            />
            <div>
              <Label htmlFor="bio">Bio</Label>
              <textarea
                id="bio"
                rows={3}
                defaultValue={contractorSettings.profile.bio}
                className="mt-1 w-full rounded-md border border-border bg-white px-3 py-2 text-sm focus-visible:border-brand-orange focus-visible:outline-none"
              />
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
            <CardDescription>Where each milestone release is deposited.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="flex items-start gap-3 rounded-lg border border-border bg-amber-50/40 p-3 text-xs text-brand-black/80">
              <HugeiconsIcon
                icon={InformationCircleIcon}
                className="mt-0.5 size-4 shrink-0 text-amber-600"
                strokeWidth={2}
              />
              <p>
                Funds are released here after each milestone approval — usually within 24h. STRUKTURA never holds your funds beyond the escrow window.
              </p>
            </div>
            <div>
              <Label htmlFor="bank-provider">Bank / wallet provider</Label>
              <select
                id="bank-provider"
                defaultValue={contractorSettings.bank.provider}
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
              id="bank-name"
              defaultValue={contractorSettings.bank.accountName}
            />
            <Field
              label="Account number"
              id="bank-number"
              defaultValue={`••••••${contractorSettings.bank.last4}`}
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
              <CardTitle>Coverage area</CardTitle>
            </div>
            <CardDescription>Regions you accept jobs in.</CardDescription>
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
              {coverage.length} regions selected · jobs outside these are filtered out of your feed.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <HugeiconsIcon icon={CheckmarkBadge01Icon} className="size-5 text-brand-orange" strokeWidth={2} />
              <CardTitle>Verification ladder</CardTitle>
            </div>
            <CardDescription>Each tier unlocks more visibility on the contractor list.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-2">
            {ladder.map((row) => {
              const v = contractorSettings.verification[row.key]
              return (
                <div
                  key={row.key}
                  className="flex items-center justify-between rounded-lg border border-border p-3"
                >
                  <p className="text-sm font-medium text-brand-black">{row.label}</p>
                  {v === "approved" ? (
                    <Badge variant="outline" className="gap-1 text-emerald-700">
                      <HugeiconsIcon icon={Tick02Icon} className="size-3" strokeWidth={2.5} />
                      Approved
                    </Badge>
                  ) : v === "pending" ? (
                    <Badge variant="secondary">In review</Badge>
                  ) : (
                    <Badge variant="destructive">
                      <HugeiconsIcon icon={AlertCircleIcon} strokeWidth={2.5} />
                      Missing
                    </Badge>
                  )}
                </div>
              )
            })}
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
                { key: "newJobMatch", label: "New job match", hint: "Job posted in your trade + region" },
                { key: "bidWon", label: "Bid won", hint: "Client awarded a project to you" },
                { key: "bidLost", label: "Bid lost", hint: "Client picked another contractor" },
                { key: "milestoneApproved", label: "Milestone approved", hint: "Escrow released to your bank" },
                { key: "disputeOpened", label: "Dispute opened", hint: "Client raised a concern on a milestone" },
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
              defaultValue={contractorSettings.security.email}
              readOnly
            />
            <div className="flex items-center justify-between rounded-lg border border-border p-3">
              <div>
                <p className="text-sm font-medium text-brand-black">Two-factor (TOTP)</p>
                <p className="text-xs text-muted-foreground">
                  {contractorSettings.security.mfa
                    ? "Enabled · authenticator required at sign-in"
                    : "Disabled — enable to protect your account"}
                </p>
              </div>
              {contractorSettings.security.mfa ? (
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
                    Last active {contractorSettings.security.lastLogin}
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
