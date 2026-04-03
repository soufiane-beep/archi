"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { Plus, X, GripVertical } from "lucide-react";

interface Props {
  images: string[];
  onChange: (images: string[]) => void;
}

export default function GalleryManager({ images, onChange }: Props) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  async function handleFile(file: File) {
    setError("");
    setUploading(true);
    const form = new FormData();
    form.append("file", file);
    const res = await fetch("/api/upload", { method: "POST", body: form });
    setUploading(false);
    if (res.ok) {
      const { url } = await res.json();
      onChange([...images, url]);
    } else {
      const data = await res.json();
      setError(data.error || "Erreur upload");
    }
  }

  function remove(index: number) {
    onChange(images.filter((_, i) => i !== index));
  }

  return (
    <div>
      <label
        className="block text-[10px] tracking-[0.3em] uppercase text-[#666055] mb-3"
        style={{ fontFamily: "var(--font-inter)" }}
      >
        Galerie ({images.length} photo{images.length !== 1 ? "s" : ""})
      </label>

      <div className="grid grid-cols-3 gap-3 mb-3">
        {images.map((img, i) => (
          <div key={i} className="relative group aspect-video overflow-hidden border border-white/10">
            <Image src={img} alt={`Galerie ${i + 1}`} fill className="object-cover" sizes="200px" />
            <button
              type="button"
              onClick={() => remove(i)}
              className="absolute top-1 right-1 w-6 h-6 bg-[#080808]/80 flex items-center justify-center text-red-400 opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <X size={10} />
            </button>
          </div>
        ))}

        {/* Add button */}
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={uploading}
          className="aspect-video border border-dashed border-white/15 flex items-center justify-center text-[#3d3a36] hover:border-[#c8a97e]/50 hover:text-[#c8a97e] transition-all duration-300 disabled:opacity-50"
        >
          {uploading ? (
            <span className="text-[9px]" style={{ fontFamily: "var(--font-inter)" }}>…</span>
          ) : (
            <Plus size={16} />
          )}
        </button>
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/jpg,image/png,image/webp"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleFile(file);
        }}
      />

      {error && (
        <p className="text-xs text-red-400" style={{ fontFamily: "var(--font-inter)" }}>
          {error}
        </p>
      )}
    </div>
  );
}
