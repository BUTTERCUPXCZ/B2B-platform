import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"

const sizeMap = {
  sm: "size-6 text-xs",
  md: "size-9 text-sm",
  lg: "size-11 text-sm",
  xl: "size-16 text-lg",
} as const

type Size = keyof typeof sizeMap

export function UserAvatar({
  src,
  alt,
  fallback,
  size = "md",
  className,
}: {
  src?: string
  alt?: string
  fallback?: string
  size?: Size
  className?: string
}) {
  const [imgError, setImgError] = useState(false)
  const initials = (fallback ?? alt ?? "?").slice(0, 2).toUpperCase()

  return (
    <Avatar className={cn(sizeMap[size], className)}>
      {src && !imgError && (
        <AvatarImage
          src={src}
          alt={alt ?? ""}
          onError={() => setImgError(true)}
        />
      )}
      <AvatarFallback className="font-semibold">{initials}</AvatarFallback>
    </Avatar>
  )
}