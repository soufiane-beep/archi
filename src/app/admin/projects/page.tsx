import Link from "next/link";
import { getProjects } from "@/lib/db";
import AdminSidebar from "@/components/admin/AdminSidebar";
import ProjectsTable from "./ProjectsTable";
import { PlusCircle } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function AdminProjectsPage() {
  const projects = await getProjects();

  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <main className="flex-1 px-10 py-10">
        <div className="flex items-center justify-between mb-10">
          <div>
            <p
              className="text-[10px] tracking-[0.4em] uppercase text-[#c8a97e] mb-2"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              Administration
            </p>
            <h1
              className="font-light text-[#f0ece4]"
              style={{ fontFamily: "var(--font-cormorant)", fontSize: "2.5rem" }}
            >
              Projets
            </h1>
          </div>
          <Link
            href="/admin/projects/new"
            className="flex items-center gap-2 px-6 py-3 bg-[#c8a97e] text-[#080808] text-[11px] tracking-[0.3em] uppercase hover:opacity-80 transition-opacity"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            <PlusCircle size={14} />
            Nouveau
          </Link>
        </div>

        <ProjectsTable initialProjects={projects} />
      </main>
    </div>
  );
}
