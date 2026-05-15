import { createFileRoute } from "@tanstack/react-router"
import { z } from "zod"
import { Header } from "@/components/landing/header"
import { Footer } from "@/components/landing/footer"
import { PostJobPage } from "@/components/jobs/post-job-page"
import type { ServiceCategory } from "@/components/services/services-data"

const postJobSearchSchema = z.object({
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

export const Route = createFileRoute("/jobs/post")({
  validateSearch: (search) => postJobSearchSchema.parse(search),
  component: PostJobRoute,
})

function PostJobRoute() {
  const { category } = Route.useSearch()
  return (
    <>
      <Header />
      <PostJobPage initialCategory={category as ServiceCategory | undefined} />
      <Footer />
    </>
  )
}
