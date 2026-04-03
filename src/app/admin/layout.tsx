import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin — Premier Art",
  robots: "noindex, nofollow",
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="min-h-screen"
      style={{ background: "#0d0d0d", color: "#f0ece4", fontFamily: "var(--font-inter)" }}
    >
      {children}
    </div>
  );
}
