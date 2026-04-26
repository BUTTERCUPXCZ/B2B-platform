import { useEffect } from "react"
import {
  Outlet,
  createRootRoute,
  useRouterState,
} from "@tanstack/react-router"
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools"

export const Route = createRootRoute({
  component: RootLayout,
})

function RootLayout() {
  const { location } = useRouterState()

  useEffect(() => {
    if (location.hash) return
    window.scrollTo({ top: 0, behavior: "instant" })
  }, [location.pathname, location.hash])

  return (
    <>
      <Outlet />
      {import.meta.env.DEV && <TanStackRouterDevtools position="bottom-right" />}
    </>
  )
}
