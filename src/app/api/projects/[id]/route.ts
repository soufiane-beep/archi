import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";
import { getProjectById } from "@/lib/db";

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const project = await getProjectById(id);
  if (!project) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(project);
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const denied = await requireAdmin();
  if (denied) return denied;

  const { id } = await params;
  const body = await req.json();
  const {
    title, category, location, year, description, fullDescription,
    image, gallery, specs, featured, color, displayOrder,
  } = body;

  const project = await prisma.project.update({
    where: { id },
    data: {
      title,
      category,
      location,
      year,
      description,
      fullDescription,
      image,
      gallery: JSON.stringify(Array.isArray(gallery) ? gallery : []),
      specSurface: specs?.surface,
      specDuration: specs?.duration,
      specBudget: specs?.budget,
      specTeam: specs?.team,
      featured: !!featured,
      color,
      displayOrder,
    },
  });

  return NextResponse.json(project);
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const denied = await requireAdmin();
  if (denied) return denied;

  const { id } = await params;
  await prisma.project.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
