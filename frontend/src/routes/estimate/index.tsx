import { createFileRoute } from "@tanstack/react-router"

import { EstimateIntakePage } from "@/components/estimate/estimate-intake-page"

export const Route = createFileRoute("/estimate/")({
  component: EstimateIntakePage,
})
