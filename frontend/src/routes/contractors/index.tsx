import { createFileRoute } from "@tanstack/react-router"

import { ContractorsListPage } from "@/components/contractors/contractors-list-page"

export const Route = createFileRoute("/contractors/")({
  component: ContractorsListPage,
})
