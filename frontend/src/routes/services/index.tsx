import { createFileRoute } from "@tanstack/react-router"
import { z } from "zod"
import { Header } from "@/components/landing/header"
import { Footer } from "@/components/landing/footer"
import { ServicesPage } from "@/components/services/services-page"
import type { ServiceCategory } from "@/components/services/services-data"

const serviceCategoryEnum = z.enum([
  "Custom Home Build",
  "Renovation",
  "Roofing",
  "Plumbing",
  "Electrical",
  "Painting",
  "Landscaping",
  "Repairs & Handyman",
])

const servicesSearchSchema = z.object({
  q: z.string().optional(),
  category: serviceCategoryEnum.optional(),
})

export const Route = createFileRoute("/services/")({
  validateSearch: (search) => servicesSearchSchema.parse(search),
  component: ServicesRoute,
})

function ServicesRoute() {
  const { q, category } = Route.useSearch()
  return (
    <>
      <Header />
      <ServicesPage
        initialQuery={q ?? ""}
        initialCategory={(category as ServiceCategory | undefined) ?? null}
      />
      <Footer />
    </>
  )
}
