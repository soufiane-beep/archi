import { prisma } from "./prisma";
import type { Project } from "./types";

function mapProject(p: {
  id: string;
  title: string;
  category: string;
  location: string;
  year: string;
  description: string;
  fullDescription: string;
  image: string;
  gallery: string;
  specSurface: string;
  specDuration: string;
  specBudget: string;
  specTeam: string;
  featured: boolean;
  color: string;
  displayOrder: number;
  model3d: string | null;
}): Project {
  return {
    id: p.id,
    title: p.title,
    category: p.category,
    location: p.location,
    year: p.year,
    description: p.description,
    fullDescription: p.fullDescription,
    image: p.image,
    gallery: JSON.parse(p.gallery) as string[],
    specs: {
      surface: p.specSurface,
      duration: p.specDuration,
      budget: p.specBudget,
      team: p.specTeam,
    },
    featured: p.featured,
    color: p.color,
    displayOrder: p.displayOrder,
    model3d: p.model3d,
  };
}

export async function getProjects(): Promise<Project[]> {
  const rows = await prisma.project.findMany({
    orderBy: { displayOrder: "asc" },
  });
  return rows.map(mapProject);
}

export async function getProjectById(id: string): Promise<Project | null> {
  const row = await prisma.project.findUnique({ where: { id } });
  if (!row) return null;
  return mapProject(row);
}

export async function getFeaturedProjects(): Promise<Project[]> {
  const rows = await prisma.project.findMany({
    where: { featured: true },
    orderBy: { displayOrder: "asc" },
  });
  return rows.map(mapProject);
}
