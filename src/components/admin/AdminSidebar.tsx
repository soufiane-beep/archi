"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LayoutDashboard, FolderOpen, LogOut, ExternalLink } from "lucide-react";

const navItems = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { href: "/admin/projects", label: "Projets", icon: FolderOpen, exact: false },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <aside
      className="w-64 min-h-screen flex flex-col border-r border-white/5"
      style={{ background: "#080808" }}
    >
      {/* Logo */}
      <div className="px-8 py-8 border-b border-white/5">
        <p
          className="text-[10px] tracking-[0.5em] uppercase text-[#c8a97e] mb-1"
          style={{ fontFamily: "var(--font-inter)" }}
        >
          Premier Art
        </p>
        <p
          className="text-xs text-[#3d3a36]"
          style={{ fontFamily: "var(--font-inter)" }}
        >
          Administration
        </p>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-4 py-6 space-y-1">
        {navItems.map(({ href, label, icon: Icon, exact }) => {
          const active = exact ? pathname === href : pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 px-4 py-3 text-[11px] tracking-[0.2em] uppercase transition-all duration-200 ${
                active
                  ? "bg-[#c8a97e]/10 text-[#c8a97e] border-l-2 border-[#c8a97e]"
                  : "text-[#666055] hover:text-[#c8c2b8] hover:bg-white/3"
              }`}
              style={{ fontFamily: "var(--font-inter)" }}
            >
              <Icon size={14} />
              {label}
            </Link>
          );
        })}
      </nav>

      {/* Bottom actions */}
      <div className="px-4 py-6 border-t border-white/5 space-y-1">
        <Link
          href="/"
          target="_blank"
          className="flex items-center gap-3 px-4 py-3 w-full text-[11px] tracking-[0.2em] uppercase text-[#c8a97e] border border-[#c8a97e]/20 hover:bg-[#c8a97e]/10 transition-all duration-200"
          style={{ fontFamily: "var(--font-inter)" }}
        >
          <ExternalLink size={14} />
          Voir le site
        </Link>
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-3 w-full text-[11px] tracking-[0.2em] uppercase text-[#666055] hover:text-red-400 transition-colors duration-200"
          style={{ fontFamily: "var(--font-inter)" }}
        >
          <LogOut size={14} />
          Déconnexion
        </button>
      </div>
    </aside>
  );
}
