import { createFileRoute } from "@tanstack/react-router"

import { DashboardIndex } from "@/components/dashboard/dashboard-index"

export const Route = createFileRoute("/dashboard/")({
  component: DashboardIndex,
})
