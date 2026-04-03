"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { Upload, X } from "lucide-react";

interface Props {
  value: string;
  onChange: (url: string) => void;
  label?: string;
}

export default function ImageUploader({ value, onChange, label = "Image principale" }: Props) {
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
      onChange(url);
    } else {
      const data = await res.json();
      setError(data.error || "Erreur upload");
    }
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  }

  return (
    <div>
      <label
        className="block text-[10px] tracking-[0.3em] uppercase text-[#666055] mb-3"
        style={{ fontFamily: "var(--font-inter)" }}
      >
        {label}
      </label>

      {value ? (
        <div className="relative group">
          <div className="relative w-full h-48 overflow-hidden border border-white/10">
            <Image src={value} alt="Preview" fill className="object-cover" sizes="400px" />
          </div>
          <button
            type="button"
            onClick={() => onChange("")}
            className="absolute top-2 right-2 w-7 h-7 bg-[#080808]/80 flex items-center justify-center text-red-400 hover:text-red-300 transition-colors"
          >
            <X size={12} />
          </button>
          <p className="mt-2 text-[10px] text-[#666055] truncate" style={{ fontFamily: "var(--font-inter)" }}>
            {value}
          </p>
        </div>
      ) : (
        <div
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
          onClick={() => inputRef.current?.click()}
          className="w-full h-36 border border-dashed border-white/15 flex flex-col items-center justify-center gap-2 cursor-pointer hover:border-[#c8a97e]/50 transition-colors duration-300"
        >
          {uploading ? (
            <p className="text-xs text-[#666055]" style={{ fontFamily: "var(--font-inter)" }}>
              Upload en cours…
            </p>
          ) : (
            <>
              <Upload size={18} className="text-[#3d3a36]" />
              <p className="text-xs text-[#3d3a36]" style={{ fontFamily: "var(--font-inter)" }}>
                Glisser-déposer ou cliquer
              </p>
              <p className="text-[10px] text-[#2a2825]" style={{ fontFamily: "var(--font-inter)" }}>
                JPG, PNG, WebP — max 10 Mo
              </p>
            </>
          )}
        </div>
      )}

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
        <p className="mt-2 text-xs text-red-400" style={{ fontFamily: "var(--font-inter)" }}>
          {error}
        </p>
      )}
    </div>
  );
}
