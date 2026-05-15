import { cva } from "class-variance-authority"

export const badgeVariants = cva(
  "inline-flex items-center gap-1 border px-2.5 py-0.5 text-[10px] font-semibold tracking-widest uppercase whitespace-nowrap [&_svg]:size-3 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "border-transparent bg-brand-black text-white",
        outline: "border-border bg-transparent text-brand-black",
        muted: "border-transparent bg-muted text-muted-foreground",
        success: "border-transparent bg-emerald-100 text-emerald-700",
        warning: "border-transparent bg-amber-100 text-amber-800",
        danger: "border-transparent bg-red-100 text-red-700",
        verified: "border-transparent bg-sky-100 text-sky-700",
        topRated: "border-transparent bg-brand-orange/15 text-brand-orange",
        accent: "border-transparent bg-brand-orange text-white",
      },
      size: {
        default: "h-5",
        sm: "h-4 px-2 text-[9px]",
        lg: "h-6 px-3 text-xs",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)
