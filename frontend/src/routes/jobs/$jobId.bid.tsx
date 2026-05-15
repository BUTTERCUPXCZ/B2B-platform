import { createFileRoute, notFound } from "@tanstack/react-router"

import { BidForm } from "@/components/jobs/bid-form"
import { jobs } from "@/components/jobs/jobs-data"

export const Route = createFileRoute("/jobs/$jobId/bid")({
  loader: ({ params }) => {
    const job = jobs.find((j) => j.id === params.jobId)
    if (!job) throw notFound()
    return { job }
  },
  component: BidRoute,
})

function BidRoute() {
  const { job } = Route.useLoaderData()
  return <BidForm job={job} />
}
