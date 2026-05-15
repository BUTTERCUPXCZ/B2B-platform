import { createFileRoute, notFound } from "@tanstack/react-router"

import { EstimateReportPage } from "@/components/estimate/estimate-report-page"
import { findEstimate, estimates } from "@/components/estimate/estimates-data"

export const Route = createFileRoute("/estimate/report/$estimateId")({
  loader: ({ params }) => {
    const found = findEstimate(params.estimateId)
    if (found) return { estimate: found }
    if (estimates.length > 0) return { estimate: estimates[0] }
    throw notFound()
  },
  component: EstimateReportRoute,
})

function EstimateReportRoute() {
  const { estimate } = Route.useLoaderData()
  return <EstimateReportPage estimate={estimate} />
}
