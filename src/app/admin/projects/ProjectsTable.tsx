"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Pencil, Trash2, Star, Eye } from "lucide-react";
import type { Project } from "@/lib/types";
import ConfirmDialog from "@/components/admin/ConfirmDialog";

export default function ProjectsTable({ initialProjects }: { initialProjects: Project[] }) {
  const router = useRouter();
  const [projects, setProjects] = useState(initialProjects);
  const [toDelete, setToDelete] = useState<Project | null>(null);
  const [toggling, setToggling] = useState<string | null>(null);

  async function toggleFeatured(project: Project) {
    setToggling(project.id);
    const res = await fetch(`/api/projects/${project.id}/featured`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ featured: !project.featured }),
    });
    setToggling(null);
    if (res.ok) {
      setProjects((prev) =>
        prev.map((p) => (p.id === project.id ? { ...p, featured: !p.featured } : p))
      );
    }
  }

  async function confirmDelete() {
    if (!toDelete) return;
    const res = await fetch(`/api/projects/${toDelete.id}`, { method: "DELETE" });
    if (res.ok) {
      setProjects((prev) => prev.filter((p) => p.id !== toDelete.id));
    }
    setToDelete(null);
    router.refresh();
  }

  if (!projects.length) {
    return (
      <div className="border border-dashed border-white/10 py-20 text-center">
        <p className="text-[#3d3a36] text-sm" style={{ fontFamily: "var(--font-inter)" }}>
          Aucun projet pour l&apos;instant.{" "}
          <Link href="/admin/projects/new" className="text-[#c8a97e] hover:underline">
            Créez le premier.
          </Link>
        </p>
      </div>
    );
  }

  return (
    <>
      {toDelete && (
        <ConfirmDialog
          title="Supprimer ce projet ?"
          message={`"${toDelete.title}" sera définitivement supprimé du site.`}
          onConfirm={confirmDelete}
          onCancel={() => setToDelete(null)}
        />
      )}

      <div className="border border-white/5 overflow-hidden">
        {/* Header */}
        <div
          className="grid grid-cols-[60px_1fr_160px_100px_120px] gap-4 px-5 py-3 border-b border-white/5 bg-[#080808]"
          style={{ fontFamily: "var(--font-inter)" }}
        >
          {["", "Projet", "Catégorie", "Vedette", "Actions"].map((h) => (
            <span key={h} className="text-[9px] tracking-[0.3em] uppercase text-[#3d3a36]">
              {h}
            </span>
          ))}
        </div>

        {/* Rows */}
        {projects.map((project, i) => (
          <div
            key={project.id}
            className={`grid grid-cols-[60px_1fr_160px_100px_120px] gap-4 px-5 py-4 items-center border-b border-white/5 last:border-0 hover:bg-white/2 transition-colors ${
              i % 2 === 0 ? "" : "bg-[#111]/30"
            }`}
          >
            {/* Thumbnail */}
            <div className="relative w-12 h-9 overflow-hidden">
              {project.image ? (
                <Image src={project.image} alt={project.title} fill className="object-cover" sizes="48px" />
              ) : (
                <div className="w-full h-full bg-white/5" />
              )}
            </div>

            {/* Title + location */}
            <div className="min-w-0">
              <p
                className="text-[#f0ece4] font-light truncate"
                style={{ fontFamily: "var(--font-cormorant)", fontSize: "1.1rem" }}
              >
                {project.title}
              </p>
              <p
                className="text-[10px] text-[#3d3a36] truncate"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                {project.location} · {project.year}
              </p>
            </div>

            {/* Category */}
            <p
              className="text-[10px] tracking-[0.15em] text-[#666055] truncate"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              {project.category}
            </p>

            {/* Featured toggle */}
            <button
              onClick={() => toggleFeatured(project)}
              disabled={toggling === project.id}
              className={`flex items-center gap-1.5 text-[10px] tracking-[0.15em] uppercase transition-colors disabled:opacity-50 ${
                project.featured ? "text-[#c8a97e]" : "text-[#3d3a36] hover:text-[#666055]"
              }`}
              style={{ fontFamily: "var(--font-inter)" }}
            >
              <Star size={12} fill={project.featured ? "currentColor" : "none"} />
              {project.featured ? "Oui" : "Non"}
            </button>

            {/* Actions */}
            <div className="flex items-center gap-3">
              <Link
                href={`/projects/${project.id}`}
                target="_blank"
                className="text-[#3d3a36] hover:text-[#c8c2b8] transition-colors"
                title="Voir"
              >
                <Eye size={14} />
              </Link>
              <Link
                href={`/admin/projects/${project.id}/edit`}
                className="text-[#3d3a36] hover:text-[#c8a97e] transition-colors"
                title="Modifier"
              >
                <Pencil size={14} />
              </Link>
              <button
                onClick={() => setToDelete(project)}
                className="text-[#3d3a36] hover:text-red-400 transition-colors"
                title="Supprimer"
              >
                <Trash2 size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
