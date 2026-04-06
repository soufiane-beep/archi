"use client";

import { Suspense, useRef, useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF, Environment, Center } from "@react-three/drei";

function Model({ url }: { url: string }) {
  const { scene } = useGLTF(url);
  return (
    <Center>
      <primitive object={scene} />
    </Center>
  );
}

function Loader() {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="text-center">
        <div className="w-8 h-8 border border-[#c8a97e] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-[11px] tracking-[0.3em] uppercase text-[#666055]" style={{ fontFamily: "var(--font-inter)" }}>
          Chargement du modèle
        </p>
      </div>
    </div>
  );
}

export default function ModelViewer({ url }: { url: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [focused, setFocused] = useState(false);

  // Clic en dehors → désactiver
  useEffect(() => {
    if (!focused) return;
    const handler = (e: MouseEvent) => {
      if (!containerRef.current?.contains(e.target as Node)) {
        setFocused(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [focused]);

  // Echap → désactiver
  useEffect(() => {
    if (!focused) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setFocused(false);
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [focused]);

  return (
    <div ref={containerRef} className="relative w-full h-full bg-[#080808]">
      <Suspense fallback={<Loader />}>
        <Canvas
          camera={{ position: [6, 6, 6], fov: 45 }}
          gl={{ antialias: true }}
          shadows
        >
          <ambientLight intensity={1.2} />
          <directionalLight position={[5, 10, 5]} intensity={1.5} castShadow />
          <directionalLight position={[-5, 5, -5]} intensity={0.5} />
          <Model url={url} />
          <OrbitControls
            enablePan
            enableZoom={focused}
            enableRotate={focused}
            minDistance={1}
            maxDistance={30}
          />
          <Environment preset="city" />
        </Canvas>
      </Suspense>

      {/* Overlay inactif — capte le clic d'activation */}
      {!focused && (
        <div
          className="absolute inset-0 flex items-end justify-center pb-10 cursor-pointer group"
          onClick={() => setFocused(true)}
        >
          {/* Gradient de bas pour attirer l'œil vers le bouton */}
          <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/50 to-transparent pointer-events-none" />

          <button className="relative flex items-center gap-4 bg-[#c8a97e] px-8 py-4 transition-all duration-300 group-hover:bg-[#d4b88e] group-hover:scale-105 group-hover:shadow-[0_8px_32px_rgba(200,169,126,0.35)]">
            {/* Icône curseur */}
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-[#1a1a1a] flex-shrink-0">
              <path d="M9 3L9 15L12.5 11.5L14.5 16.5L16.5 15.5L14.5 10.5L19 10.5L9 3Z" fill="currentColor" />
            </svg>
            <span
              className="text-[11px] tracking-[0.35em] uppercase text-[#1a1a1a] font-medium"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              Explorer le plan 3D
            </span>
            {/* Ligne décorative droite */}
            <span className="block w-6 h-px bg-[#1a1a1a]/40" />
          </button>
        </div>
      )}

      {/* Hints quand actif */}
      {focused && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-6 pointer-events-none">
          {[
            { icon: "↻", label: "Glisser pour tourner" },
            { icon: "⇔", label: "Clic droit pour déplacer" },
            { icon: "⊕", label: "Molette pour zoomer" },
            { icon: "Esc", label: "Quitter" },
          ].map((hint) => (
            <div key={hint.label} className="flex items-center gap-2 opacity-50">
              <span className="text-[#c8a97e] text-sm">{hint.icon}</span>
              <span className="text-[10px] tracking-[0.15em] text-[#666055]" style={{ fontFamily: "var(--font-inter)" }}>
                {hint.label}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
