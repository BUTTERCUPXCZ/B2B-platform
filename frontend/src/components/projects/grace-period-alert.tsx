import { HugeiconsIcon } from "@hugeicons/react"
import {
  AlertCircleIcon,
  CheckmarkCircle02Icon,
  Alert02Icon,
} from "@hugeicons/core-free-icons"

import { cn } from "@/lib/utils"

export function GracePeriodAlert({
  daysRemaining,
  graceDays,
}: {
  daysRemaining: number
  graceDays: number
}) {
  if (daysRemaining > 14) {
    return (
      <Box
        tone="success"
        icon={CheckmarkCircle02Icon}
        title={`On schedule — ${daysRemaining} days remaining`}
        body="Project is comfortably within the agreed timeline."
      />
    )
  }
  if (daysRemaining > 0) {
    return (
      <Box
        tone="warning"
        icon={Alert02Icon}
        title={`Approaching deadline — ${daysRemaining} days left`}
        body="14-day window. Make sure remaining milestones are on track."
      />
    )
  }
  if (daysRemaining > -graceDays) {
    return (
      <Box
        tone="orange"
        icon={Alert02Icon}
        title={`In grace period — ${Math.abs(daysRemaining)} days past due`}
        body={`Project is using the ${graceDays}-day grace period. Delay compensation may apply on completion.`}
      />
    )
  }
  return (
    <Box
      tone="danger"
      icon={AlertCircleIcon}
      title="Grace period expired"
      body="Auto-calculated delay compensation will be deducted from escrow payout."
    />
  )
}

function Box({
  tone,
  icon,
  title,
  body,
}: {
  tone: "success" | "warning" | "orange" | "danger"
  icon: typeof AlertCircleIcon
  title: string
  body: string
}) {
  const styles: Record<typeof tone, string> = {
    success: "border-emerald-200 bg-emerald-50 text-emerald-900",
    warning: "border-amber-200 bg-amber-50 text-amber-900",
    orange: "border-orange-200 bg-orange-50 text-orange-900",
    danger: "border-red-200 bg-red-50 text-red-900",
  }
  return (
    <div className={cn("flex items-start gap-3 rounded-none border p-5", styles[tone])}>
      <HugeiconsIcon icon={icon} className="mt-0.5 size-5 shrink-0" />
      <div>
        <p className="text-sm font-bold">{title}</p>
        <p className="mt-0.5 text-sm">{body}</p>
      </div>
    </div>
  )
}
