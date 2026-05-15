import { createFileRoute, notFound } from "@tanstack/react-router"

import { ContractorProfilePage } from "@/components/contractors/contractor-profile-page"
import { findContractor } from "@/components/contractors/contractors-data"

export const Route = createFileRoute("/contractors/$contractorId")({
  loader: ({ params }) => {
    const contractor = findContractor(params.contractorId)
    if (!contractor) throw notFound()
    return { contractor }
  },
  component: ContractorProfileRoute,
})

function ContractorProfileRoute() {
  const { contractor } = Route.useLoaderData()
  return <ContractorProfilePage contractor={contractor} />
}
