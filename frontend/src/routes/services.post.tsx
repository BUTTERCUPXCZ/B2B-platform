import { createFileRoute } from "@tanstack/react-router"
import { z } from "zod"
import { Header } from "@/components/landing/header"
import { Footer } from "@/components/landing/footer"
import { PostServicePage } from "@/components/services/post-service-page"
import type { ServiceCategory } from "@/components/services/services-data"

const postServiceSearchSchema = z.object({
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

export const Route = createFileRoute("/services/post")({
  validateSearch: (search) => postServiceSearchSchema.parse(search),
  component: PostServiceRoute,
})

function PostServiceRoute() {
  const { category } = Route.useSearch()
  return (
    <>
      <Header />
      <PostServicePage initialCategory={category as ServiceCategory | undefined} />
      <Footer />
    </>
  )
}
