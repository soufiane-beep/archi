"use client";

interface Props {
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function ConfirmDialog({ title, message, onConfirm, onCancel }: Props) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#080808]/80 backdrop-blur-sm px-4">
      <div className="bg-[#111] border border-white/10 p-8 max-w-sm w-full">
        <h2
          className="font-light text-[#f0ece4] text-2xl mb-3"
          style={{ fontFamily: "var(--font-cormorant)" }}
        >
          {title}
        </h2>
        <p
          className="text-sm text-[#666055] mb-8 leading-relaxed"
          style={{ fontFamily: "var(--font-inter)" }}
        >
          {message}
        </p>
        <div className="flex gap-3">
          <button
            onClick={onConfirm}
            className="flex-1 py-3 bg-red-500/80 text-white text-[11px] tracking-[0.3em] uppercase hover:bg-red-500 transition-colors"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            Supprimer
          </button>
          <button
            onClick={onCancel}
            className="flex-1 py-3 border border-white/10 text-[#c8c2b8] text-[11px] tracking-[0.3em] uppercase hover:border-white/25 transition-colors"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            Annuler
          </button>
        </div>
      </div>
    </div>
  );
}
