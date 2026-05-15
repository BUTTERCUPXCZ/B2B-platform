import { createFileRoute, notFound } from "@tanstack/react-router"

import { JobDetailPage } from "@/components/jobs/job-detail-page"
import { jobs } from "@/components/jobs/jobs-data"

export const Route = createFileRoute("/jobs/$jobId")({
  loader: ({ params }) => {
    const job = jobs.find((j) => j.id === params.jobId)
    if (!job) throw notFound()
    return { job }
  },
  component: JobDetailRoute,
})

function JobDetailRoute() {
  const { job } = Route.useLoaderData()
  return <JobDetailPage job={job} />
}
