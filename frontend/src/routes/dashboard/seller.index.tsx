import { createFileRoute } from "@tanstack/react-router"

import { ShadcnDashboard } from "@/components/dashboard/shadcn-dashboard"

export const Route = createFileRoute("/dashboard/seller/")({
  component: () => <ShadcnDashboard role="seller" />,
})
