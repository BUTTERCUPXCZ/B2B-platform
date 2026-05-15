import { HugeiconsIcon } from "@hugeicons/react"
import {
  ShieldUserIcon,
  CheckmarkBadge02Icon,
  LicenseIcon,
  StarIcon,
  AlertCircleIcon,
} from "@hugeicons/core-free-icons"

import { Badge } from "@/components/ui/badge"

export type BadgeLevel =
  | "unverified"
  | "identity"
  | "license"
  | "portfolio"
  | "top-rated"

const config: Record<
  BadgeLevel,
  {
    label: string
    icon: typeof ShieldUserIcon
    variant: "muted" | "verified" | "success" | "topRated"
  }
> = {
  unverified: { label: "Unverified", icon: AlertCircleIcon, variant: "muted" },
  identity: { label: "ID Verified", icon: ShieldUserIcon, variant: "verified" },
  license: { label: "License Verified", icon: LicenseIcon, variant: "verified" },
  portfolio: { label: "Portfolio Verified", icon: CheckmarkBadge02Icon, variant: "success" },
  "top-rated": { label: "Top Rated", icon: StarIcon, variant: "topRated" },
}

export function VerifiedBadge({
  level,
  size,
  className,
}: {
  level: BadgeLevel
  size?: "sm" | "default" | "lg"
  className?: string
}) {
  const c = config[level]
  return (
    <Badge variant={c.variant} size={size} className={className}>
      <HugeiconsIcon icon={c.icon} />
      {c.label}
    </Badge>
  )
}
