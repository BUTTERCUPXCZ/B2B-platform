import { type ReactNode } from "react"

import { cn } from "@/lib/utils"

export function DashboardShell({
  sidebar,
  header,
  children,
  className,
}: {
  sidebar: ReactNode
  header?: ReactNode
  children: ReactNode
  className?: string
}) {
  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <aside className="sticky top-0 hidden h-screen w-64 shrink-0 overflow-y-auto border-r border-border lg:block" aria-label="Sidebar navigation">
        <div className="p-6 pt-28">
          {sidebar}
        </div>
      </aside>
      <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
        <main className={cn("flex-1 overflow-y-auto px-4 pt-24 pb-12 sm:px-6 md:px-10", className)}>
          {header}
          {children}
        </main>
      </div>
    </div>
  )
}