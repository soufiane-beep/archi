import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const denied = await requireAdmin();
  if (denied) return denied;

  const { id } = await params;
  const { featured } = await req.json();

  const project = await prisma.project.update({
    where: { id },
    data: { featured: !!featured },
  });

  return NextResponse.json({ id: project.id, featured: project.featured });
}
