import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";
import { getProjects } from "@/lib/db";

export async function GET() {
  const projects = await getProjects();
  return NextResponse.json(projects);
}

export async function POST(req: NextRequest) {
  const denied = await requireAdmin();
  if (denied) return denied;

  const body = await req.json();
  const {
    id, title, category, location, year, description, fullDescription,
    image, gallery, specs, featured, color, displayOrder,
  } = body;

  const project = await prisma.project.create({
    data: {
      id: id || crypto.randomUUID(),
      title,
      category,
      location,
      year,
      description,
      fullDescription,
      image,
      gallery: JSON.stringify(Array.isArray(gallery) ? gallery : []),
      specSurface: specs?.surface ?? "N/C",
      specDuration: specs?.duration ?? "N/C",
      specBudget: specs?.budget ?? "Confidentiel",
      specTeam: specs?.team ?? "Premier Art SRL",
      featured: !!featured,
      color: color ?? "#2d3a2e",
      displayOrder: displayOrder ?? 0,
    },
  });

  return NextResponse.json(project, { status: 201 });
}
