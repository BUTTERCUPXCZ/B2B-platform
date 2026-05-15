import { createFileRoute, notFound } from "@tanstack/react-router"

import { ProjectDetailPage } from "@/components/projects/project-detail-page"
import { findProject } from "@/components/projects/projects-data"

export const Route = createFileRoute("/projects/$projectId")({
  loader: ({ params }) => {
    const project = findProject(params.projectId)
    if (!project) throw notFound()
    return { project }
  },
  component: ProjectDetailRoute,
})

function ProjectDetailRoute() {
  const { project } = Route.useLoaderData()
  return <ProjectDetailPage project={project} />
}
