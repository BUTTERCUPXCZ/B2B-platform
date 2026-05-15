import { createFileRoute } from "@tanstack/react-router"
import { z } from "zod"

import { MessagesPage } from "@/components/messages/messages-page"

export const Route = createFileRoute("/messages")({
  validateSearch: z.object({ to: z.string().optional() }),
  component: MessagesRoute,
})

function MessagesRoute() {
  const { to } = Route.useSearch()
  return <MessagesPage to={to} />
}
