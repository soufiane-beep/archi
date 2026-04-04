import { getProjects } from "@/lib/db";
import ProjectsGrid from "./ProjectsGrid";

export const dynamic = "force-dynamic";

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <div className="pt-32 pb-20 min-h-screen">
      <div className="max-w-[1400px] mx-auto px-8 mb-8">
        <div className="flex items-center gap-4 mb-6">
          <span className="block w-8 h-px bg-[#2c4a3e]" />
          <span
            className="text-[10px] tracking-[0.4em] uppercase text-[#2c4a3e]"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            Portfolio
          </span>
        </div>
        <h1
          className="font-light mb-6"
          style={{
            fontFamily: "var(--font-cormorant)",
            fontSize: "clamp(3rem, 7vw, 6rem)",
            color: "#1a1a1a",
            lineHeight: 1,
          }}
        >
          Nos Réalisations
        </h1>
        <p
          className="max-w-xl text-[#7a7a72]"
          style={{ fontFamily: "var(--font-inter)", fontSize: "0.9375rem", lineHeight: 1.7 }}
        >
          Vingt années de créations architecturales en Belgique et au-delà. Chaque projet est une histoire unique, une réponse précise à un lieu et à ses habitants.
        </p>

        <ProjectsGrid projects={projects} />
      </div>
    </div>
  );
}
