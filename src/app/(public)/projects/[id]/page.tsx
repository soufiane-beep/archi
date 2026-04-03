import { notFound } from "next/navigation";
import { getProjectById, getProjects } from "@/lib/db";
import ProjectDetail from "./ProjectDetail";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const project = await getProjectById(id);
  if (!project) return {};
  return {
    title: `${project.title} — Premier Art Architecture`,
    description: project.description,
  };
}

export default async function ProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const [project, allProjects] = await Promise.all([getProjectById(id), getProjects()]);
  if (!project) notFound();

  const relatedProjects = allProjects.filter((p) => p.id !== id).slice(0, 3);

  return <ProjectDetail project={project} relatedProjects={relatedProjects} />;
}
