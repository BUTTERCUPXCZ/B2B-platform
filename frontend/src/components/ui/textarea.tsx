import { type TextareaHTMLAttributes, forwardRef } from "react"

import { cn } from "@/lib/utils"

export const Textarea = forwardRef<
  HTMLTextAreaElement,
  TextareaHTMLAttributes<HTMLTextAreaElement>
>(({ className, ...props }, ref) => (
  <textarea
    ref={ref}
    data-slot="textarea"
    className={cn(
      "flex min-h-28 w-full border border-border bg-white px-4 py-3 text-sm text-brand-black placeholder:text-muted-foreground/70",
      "transition-colors focus-visible:border-brand-orange focus-visible:ring-2 focus-visible:ring-brand-orange/20 focus-visible:outline-none",
      "disabled:pointer-events-none disabled:opacity-50",
      className
    )}
    {...props}
  />
))
Textarea.displayName = "Textarea"
