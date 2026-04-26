import { createFileRoute } from "@tanstack/react-router"
import { z } from "zod"
import { Header } from "@/components/landing/header"
import { Footer } from "@/components/landing/footer"
import { SellPage, type SellRole } from "@/components/sell/sell-page"

const sellSearchSchema = z.object({
  role: z.enum(["seller", "contractor"]).optional(),
})

export const Route = createFileRoute("/sell")({
  validateSearch: (search) => sellSearchSchema.parse(search),
  component: SellRoute,
})

function SellRoute() {
  const { role } = Route.useSearch()
  return (
    <>
      <Header />
      <SellPage initialRole={(role as SellRole | undefined) ?? "seller"} />
      <Footer />
    </>
  )
}
