"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import ImageUploader from "./ImageUploader";
import GalleryManager from "./GalleryManager";
import type { Project } from "@/lib/types";

const CATEGORIES = [
  "Villa Contemporaine",
  "Rénovation & Extension",
  "Rénovation Urbaine",
  "Architecture Médicale",
  "Immeuble Résidentiel",
  "Maison Individuelle",
  "Extension Verticale",
];

type FormData = {
  title: string;
  category: string;
  location: string;
  year: string;
  description: string;
  fullDescription: string;
  image: string;
  gallery: string[];
  specSurface: string;
  specDuration: string;
  specBudget: string;
  specTeam: string;
  featured: boolean;
  color: string;
  displayOrder: number;
};

function projectToForm(p: Project): FormData {
  return {
    title: p.title,
    category: p.category,
    location: p.location,
    year: p.year,
    description: p.description,
    fullDescription: p.fullDescription,
    image: p.image,
    gallery: p.gallery,
    specSurface: p.specs.surface,
    specDuration: p.specs.duration,
    specBudget: p.specs.budget,
    specTeam: p.specs.team,
    featured: p.featured,
    color: p.color,
    displayOrder: p.displayOrder,
  };
}

const defaultForm: FormData = {
  title: "",
  category: CATEGORIES[0],
  location: "",
  year: new Date().getFullYear().toString(),
  description: "",
  fullDescription: "",
  image: "",
  gallery: [],
  specSurface: "N/C",
  specDuration: "N/C",
  specBudget: "Confidentiel",
  specTeam: "Premier Art SRL",
  featured: false,
  color: "#2d3a2e",
  displayOrder: 0,
};

interface Props {
  project?: Project;
}

export default function ProjectForm({ project }: Props) {
  const router = useRouter();
  const [form, setForm] = useState<FormData>(project ? projectToForm(project) : defaultForm);
  const [customCategory, setCustomCategory] = useState(!CATEGORIES.includes(project?.category ?? ""));
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  function set<K extends keyof FormData>(key: K, value: FormData[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError("");

    const payload = {
      ...form,
      specs: {
        surface: form.specSurface,
        duration: form.specDuration,
        budget: form.specBudget,
        team: form.specTeam,
      },
    };

    const url = project ? `/api/projects/${project.id}` : "/api/projects";
    const method = project ? "PUT" : "POST";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    setSaving(false);

    if (res.ok) {
      router.push("/admin/projects");
      router.refresh();
    } else {
      const data = await res.json();
      setError(data.error || "Une erreur est survenue");
    }
  }

  const inputClass =
    "w-full bg-transparent border-b border-white/15 pb-2.5 text-[#f0ece4] text-sm outline-none focus:border-[#c8a97e] transition-colors duration-300 placeholder-[#3d3a36]";
  const labelClass = "block text-[10px] tracking-[0.3em] uppercase text-[#666055] mb-2";

  return (
    <form onSubmit={handleSubmit} className="space-y-10">
      {/* Title & basic info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <label className={labelClass} style={{ fontFamily: "var(--font-inter)" }}>Titre *</label>
          <input
            type="text"
            required
            value={form.title}
            onChange={(e) => set("title", e.target.value)}
            className={inputClass}
            style={{ fontFamily: "var(--font-inter)" }}
            placeholder="Projet HF6"
          />
        </div>
        <div>
          <label className={labelClass} style={{ fontFamily: "var(--font-inter)" }}>Année *</label>
          <input
            type="text"
            required
            value={form.year}
            onChange={(e) => set("year", e.target.value)}
            className={inputClass}
            style={{ fontFamily: "var(--font-inter)" }}
            placeholder="2024"
          />
        </div>
        <div>
          <label className={labelClass} style={{ fontFamily: "var(--font-inter)" }}>Localisation *</label>
          <input
            type="text"
            required
            value={form.location}
            onChange={(e) => set("location", e.target.value)}
            className={inputClass}
            style={{ fontFamily: "var(--font-inter)" }}
            placeholder="Bruxelles"
          />
        </div>
        <div>
          <label className={labelClass} style={{ fontFamily: "var(--font-inter)" }}>Couleur accent</label>
          <div className="flex items-center gap-3 border-b border-white/15 pb-2.5">
            <input
              type="color"
              value={form.color}
              onChange={(e) => set("color", e.target.value)}
              className="w-8 h-8 bg-transparent border-none cursor-pointer"
            />
            <span className="text-sm text-[#666055]" style={{ fontFamily: "var(--font-inter)" }}>
              {form.color}
            </span>
          </div>
        </div>
      </div>

      {/* Category */}
      <div>
        <label className={labelClass} style={{ fontFamily: "var(--font-inter)" }}>Catégorie *</label>
        <div className="flex flex-wrap gap-2 mb-4">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => { set("category", cat); setCustomCategory(false); }}
              className={`text-[10px] tracking-[0.2em] uppercase px-4 py-2 transition-all duration-200 ${
                form.category === cat && !customCategory
                  ? "bg-[#c8a97e] text-[#080808]"
                  : "border border-white/10 text-[#666055] hover:border-white/25 hover:text-[#c8c2b8]"
              }`}
              style={{ fontFamily: "var(--font-inter)" }}
            >
              {cat}
            </button>
          ))}
          <button
            type="button"
            onClick={() => setCustomCategory(true)}
            className={`text-[10px] tracking-[0.2em] uppercase px-4 py-2 transition-all duration-200 ${
              customCategory
                ? "bg-[#c8a97e] text-[#080808]"
                : "border border-white/10 text-[#666055] hover:border-white/25"
            }`}
            style={{ fontFamily: "var(--font-inter)" }}
          >
            Autre…
          </button>
        </div>
        {customCategory && (
          <input
            type="text"
            required
            value={form.category}
            onChange={(e) => set("category", e.target.value)}
            className={inputClass}
            style={{ fontFamily: "var(--font-inter)" }}
            placeholder="Catégorie personnalisée"
          />
        )}
      </div>

      {/* Descriptions */}
      <div className="space-y-8">
        <div>
          <label className={labelClass} style={{ fontFamily: "var(--font-inter)" }}>Description courte *</label>
          <textarea
            required
            value={form.description}
            onChange={(e) => set("description", e.target.value)}
            rows={3}
            className="w-full bg-transparent border border-white/15 p-4 text-[#f0ece4] text-sm outline-none focus:border-[#c8a97e] transition-colors duration-300 placeholder-[#3d3a36] resize-none"
            style={{ fontFamily: "var(--font-inter)" }}
            placeholder="Description courte affichée dans la grille..."
          />
        </div>
        <div>
          <label className={labelClass} style={{ fontFamily: "var(--font-inter)" }}>Description complète</label>
          <textarea
            value={form.fullDescription}
            onChange={(e) => set("fullDescription", e.target.value)}
            rows={5}
            className="w-full bg-transparent border border-white/15 p-4 text-[#f0ece4] text-sm outline-none focus:border-[#c8a97e] transition-colors duration-300 placeholder-[#3d3a36] resize-none"
            style={{ fontFamily: "var(--font-inter)" }}
            placeholder="Description longue affichée sur la page projet..."
          />
        </div>
      </div>

      {/* Specs */}
      <div>
        <p className={labelClass} style={{ fontFamily: "var(--font-inter)" }}>Données du projet</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 border border-white/5 p-6">
          {[
            { key: "specSurface" as const, label: "Surface" },
            { key: "specDuration" as const, label: "Durée" },
            { key: "specBudget" as const, label: "Budget" },
            { key: "specTeam" as const, label: "Équipe" },
          ].map(({ key, label }) => (
            <div key={key}>
              <label className="block text-[9px] tracking-[0.25em] uppercase text-[#3d3a36] mb-2" style={{ fontFamily: "var(--font-inter)" }}>
                {label}
              </label>
              <input
                type="text"
                value={form[key]}
                onChange={(e) => set(key, e.target.value)}
                className="w-full bg-transparent border-b border-white/10 pb-2 text-[#f0ece4] text-sm outline-none focus:border-[#c8a97e] transition-colors"
                style={{ fontFamily: "var(--font-inter)" }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Images */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <ImageUploader
          value={form.image}
          onChange={(url) => set("image", url)}
          label="Image principale *"
        />
        <GalleryManager images={form.gallery} onChange={(imgs) => set("gallery", imgs)} />
      </div>

      {/* Options */}
      <div className="flex flex-wrap items-center gap-8">
        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={form.featured}
            onChange={(e) => set("featured", e.target.checked)}
            className="w-4 h-4 accent-[#c8a97e]"
          />
          <span className="text-sm text-[#c8c2b8]" style={{ fontFamily: "var(--font-inter)" }}>
            Afficher en vedette (homepage)
          </span>
        </label>
        <div className="flex items-center gap-3">
          <label className="text-[10px] tracking-[0.2em] uppercase text-[#666055]" style={{ fontFamily: "var(--font-inter)" }}>
            Ordre
          </label>
          <input
            type="number"
            value={form.displayOrder}
            onChange={(e) => set("displayOrder", parseInt(e.target.value) || 0)}
            className="w-16 bg-transparent border-b border-white/15 pb-1 text-[#f0ece4] text-sm outline-none focus:border-[#c8a97e] transition-colors text-center"
            style={{ fontFamily: "var(--font-inter)" }}
          />
        </div>
      </div>

      {error && (
        <p className="text-red-400 text-sm" style={{ fontFamily: "var(--font-inter)" }}>
          {error}
        </p>
      )}

      {/* Actions */}
      <div className="flex gap-4 pt-4 border-t border-white/5">
        <button
          type="submit"
          disabled={saving}
          className="px-8 py-3.5 bg-[#c8a97e] text-[#080808] text-[11px] tracking-[0.4em] uppercase hover:opacity-80 transition-opacity disabled:opacity-50"
          style={{ fontFamily: "var(--font-inter)" }}
        >
          {saving ? "Enregistrement…" : project ? "Mettre à jour" : "Créer le projet"}
        </button>
        <button
          type="button"
          onClick={() => router.back()}
          className="px-6 py-3.5 border border-white/10 text-[#666055] text-[11px] tracking-[0.3em] uppercase hover:border-white/25 hover:text-[#c8c2b8] transition-all"
          style={{ fontFamily: "var(--font-inter)" }}
        >
          Annuler
        </button>
      </div>
    </form>
  );
}
