import AdminSidebar from "@/components/admin/AdminSidebar";
import ProjectForm from "@/components/admin/ProjectForm";

export default function NewProjectPage() {
  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <main className="flex-1 px-10 py-10 max-w-5xl">
        <div className="mb-10">
          <p
            className="text-[10px] tracking-[0.4em] uppercase text-[#c8a97e] mb-2"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            Projets
          </p>
          <h1
            className="font-light text-[#f0ece4]"
            style={{ fontFamily: "var(--font-cormorant)", fontSize: "2.5rem" }}
          >
            Nouveau projet
          </h1>
        </div>
        <ProjectForm />
      </main>
    </div>
  );
}
