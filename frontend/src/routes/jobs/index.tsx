import { createFileRoute } from "@tanstack/react-router"
import { z } from "zod"
import { Header } from "@/components/landing/header"
import { Footer } from "@/components/landing/footer"
import { JobsListPage } from "@/components/jobs/jobs-list-page"
import type { ServiceCategory } from "@/components/services/services-data"

const jobsSearchSchema = z.object({
  category: z
    .enum([
      "Custom Home Build",
      "Renovation",
      "Roofing",
      "Plumbing",
      "Electrical",
      "Painting",
      "Landscaping",
      "Repairs & Handyman",
    ])
    .optional(),
})

export const Route = createFileRoute("/jobs/")({
  validateSearch: (search) => jobsSearchSchema.parse(search),
  component: JobsRoute,
})

function JobsRoute() {
  const { category } = Route.useSearch()
  return (
    <>
      <Header />
      <JobsListPage
        initialCategory={(category as ServiceCategory | undefined) ?? null}
      />
      <Footer />
    </>
  )
}
