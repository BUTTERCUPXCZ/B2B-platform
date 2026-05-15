import { createFileRoute, notFound } from "@tanstack/react-router"

import { ServiceDetailPage } from "@/components/services/service-detail-page"
import { servicePros } from "@/components/services/services-data"

export const Route = createFileRoute("/services/$serviceId")({
  loader: ({ params }) => {
    const pro = servicePros.find((p) => p.id === params.serviceId)
    if (!pro) throw notFound()
    return { pro }
  },
  component: ServiceDetailRoute,
})

function ServiceDetailRoute() {
  const { pro } = Route.useLoaderData()
  return <ServiceDetailPage pro={pro} />
}
