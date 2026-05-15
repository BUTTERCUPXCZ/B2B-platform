import { createFileRoute, redirect } from "@tanstack/react-router"

export const Route = createFileRoute("/estimate/success")({
  beforeLoad: () => {
    throw redirect({ to: "/estimate" })
  },
  component: () => null,
})
