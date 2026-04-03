"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";

export default function AdminLogin() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    setLoading(false);

    if (res.ok) {
      router.push("/admin");
      router.refresh();
    } else {
      const data = await res.json();
      setError(data.error || "Erreur de connexion");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        {/* Logo area */}
        <div className="text-center mb-12">
          <p
            className="text-[10px] tracking-[0.5em] uppercase text-[#c8a97e] mb-3"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            Premier Art
          </p>
          <h1
            className="font-light text-[#f0ece4]"
            style={{ fontFamily: "var(--font-cormorant)", fontSize: "2.5rem" }}
          >
            Administration
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              className="block text-[10px] tracking-[0.3em] uppercase text-[#666055] mb-3"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              Identifiant
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              autoComplete="username"
              className="w-full bg-transparent border-b border-white/20 pb-3 text-[#f0ece4] text-sm outline-none focus:border-[#c8a97e] transition-colors duration-300 placeholder-[#3d3a36]"
              style={{ fontFamily: "var(--font-inter)" }}
              placeholder="admin"
            />
          </div>

          <div>
            <label
              className="block text-[10px] tracking-[0.3em] uppercase text-[#666055] mb-3"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              Mot de passe
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
                className="w-full bg-transparent border-b border-white/20 pb-3 text-[#f0ece4] text-sm outline-none focus:border-[#c8a97e] transition-colors duration-300 placeholder-[#3d3a36] pr-8"
                style={{ fontFamily: "var(--font-inter)" }}
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="absolute right-0 bottom-3 text-[#3d3a36] hover:text-[#c8a97e] transition-colors"
              >
                {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
              </button>
            </div>
          </div>

          {error && (
            <p className="text-red-400 text-xs" style={{ fontFamily: "var(--font-inter)" }}>
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 bg-[#c8a97e] text-[#080808] text-[11px] tracking-[0.4em] uppercase transition-opacity duration-300 hover:opacity-80 disabled:opacity-50 mt-4"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            {loading ? "Connexion…" : "Se connecter"}
          </button>
        </form>
      </div>
    </div>
  );
}
