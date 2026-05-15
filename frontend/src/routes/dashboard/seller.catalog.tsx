import { createFileRoute, Outlet } from "@tanstack/react-router"

export const Route = createFileRoute("/dashboard/seller/catalog")({
  component: () => <Outlet />,
})
