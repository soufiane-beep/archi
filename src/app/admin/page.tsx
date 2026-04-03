import Link from "next/link";
import { getProjects } from "@/lib/db";
import AdminSidebar from "@/components/admin/AdminSidebar";
import { FolderOpen, Star, PlusCircle } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  const projects = await getProjects();
  const featuredCount = projects.filter((p) => p.featured).length;

  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <main className="flex-1 px-10 py-10">
        <div className="mb-10">
          <p
            className="text-[10px] tracking-[0.4em] uppercase text-[#c8a97e] mb-2"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            Tableau de bord
          </p>
          <h1
            className="font-light text-[#f0ece4]"
            style={{ fontFamily: "var(--font-cormorant)", fontSize: "2.5rem" }}
          >
            Bienvenue
          </h1>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
          <div className="border border-white/5 bg-[#111] p-6 flex items-center gap-5">
            <div className="w-12 h-12 bg-[#c8a97e]/10 flex items-center justify-center">
              <FolderOpen size={20} className="text-[#c8a97e]" />
            </div>
            <div>
              <p className="text-3xl font-light text-[#f0ece4]" style={{ fontFamily: "var(--font-cormorant)" }}>
                {projects.length}
              </p>
              <p className="text-[10px] tracking-[0.25em] uppercase text-[#666055]" style={{ fontFamily: "var(--font-inter)" }}>
                Projets au total
              </p>
            </div>
          </div>
          <div className="border border-white/5 bg-[#111] p-6 flex items-center gap-5">
            <div className="w-12 h-12 bg-[#c8a97e]/10 flex items-center justify-center">
              <Star size={20} className="text-[#c8a97e]" />
            </div>
            <div>
              <p className="text-3xl font-light text-[#f0ece4]" style={{ fontFamily: "var(--font-cormorant)" }}>
                {featuredCount}
              </p>
              <p className="text-[10px] tracking-[0.25em] uppercase text-[#666055]" style={{ fontFamily: "var(--font-inter)" }}>
                En vedette (homepage)
              </p>
            </div>
          </div>
        </div>

        {/* Quick links */}
        <div className="flex flex-wrap gap-4">
          <Link
            href="/admin/projects/new"
            className="flex items-center gap-2 px-6 py-3 bg-[#c8a97e] text-[#080808] text-[11px] tracking-[0.3em] uppercase hover:opacity-80 transition-opacity"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            <PlusCircle size={14} />
            Nouveau projet
          </Link>
          <Link
            href="/admin/projects"
            className="flex items-center gap-2 px-6 py-3 border border-white/10 text-[#c8c2b8] text-[11px] tracking-[0.3em] uppercase hover:border-white/25 transition-colors"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            <FolderOpen size={14} />
            Gérer les projets
          </Link>
          <Link
            href="/"
            target="_blank"
            className="flex items-center gap-2 px-6 py-3 border border-white/10 text-[#666055] text-[11px] tracking-[0.3em] uppercase hover:border-white/25 hover:text-[#c8c2b8] transition-all"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            Voir le site →
          </Link>
        </div>
      </main>
    </div>
  );
}
