"use client";

import { Suspense, useRef, useState, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, useGLTF, Center } from "@react-three/drei";
import * as THREE from "three";
import { Maximize2, X } from "lucide-react";

// Force le clear color avant chaque frame — infaillible en prod
function ClearColor({ color }: { color: string }) {
  const { gl } = useThree();
  useFrame(() => gl.setClearColor(color, 1), -1);
  return null;
}

// ─── Modèle 3D ───────────────────────────────────────────────────────────────

function Model({ url, autoRotate = false }: { url: string; autoRotate?: boolean }) {
  const { scene } = useGLTF(url);
  const groupRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (autoRotate && groupRef.current) {
      groupRef.current.rotation.y += delta * 0.06;
    }
  });

  return (
    <Center>
      <group ref={groupRef}>
        <primitive object={scene} />
      </group>
    </Center>
  );
}

// ─── Viewer plein écran (portal) ─────────────────────────────────────────────

function FullscreenViewer({ url, onClose }: { url: string; onClose: () => void }) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return createPortal(
    <div className="fixed inset-0 z-[9999] bg-[#0a0f0d] flex flex-col">
      <div className="absolute top-0 left-0 right-0 z-10 flex items-center justify-between px-8 py-5 bg-gradient-to-b from-black/60 to-transparent pointer-events-none">
        <span
          className="text-[10px] tracking-[0.4em] uppercase text-[#8aaf9f]/70"
          style={{ fontFamily: "var(--font-inter)" }}
        >
          Plan 3D Interactif
        </span>
        <button
          onClick={onClose}
          className="pointer-events-auto w-10 h-10 border border-white/20 flex items-center justify-center text-white/70 hover:text-white hover:border-white/50 transition-all duration-300"
          aria-label="Fermer"
        >
          <X size={16} />
        </button>
      </div>

      <div className="flex-1">
        <Canvas
          camera={{ position: [8, 6, 8], fov: 45 }}
          gl={{ antialias: true }}
          shadows
        >
          <ClearColor color="#0a0f0d" />
          <ambientLight intensity={1.4} />
          <directionalLight position={[5, 10, 5]} intensity={1.5} castShadow />
          <directionalLight position={[-5, 5, -5]} intensity={0.4} />
          <Suspense fallback={null}>
            <Model url={url} autoRotate={false} />
          </Suspense>
          <OrbitControls
            enablePan
            enableZoom
            enableRotate
            zoomSpeed={1.2}
            rotateSpeed={0.8}
            panSpeed={0.8}
            minDistance={1}
            maxDistance={40}
            mouseButtons={{
              LEFT: THREE.MOUSE.ROTATE,
              MIDDLE: THREE.MOUSE.DOLLY,
              RIGHT: THREE.MOUSE.PAN,
            }}
            touches={{
              ONE: THREE.TOUCH.ROTATE,
              TWO: THREE.TOUCH.DOLLY_PAN,
            }}
          />
        </Canvas>
      </div>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-8 pointer-events-none">
        {[
          { icon: "↕", label: "Défiler pour zoomer" },
          { icon: "⟳", label: "Glisser pour pivoter" },
          { icon: "Esc", label: "Fermer" },
        ].map((h) => (
          <div key={h.label} className="flex items-center gap-2 opacity-40">
            <span className="text-[#8aaf9f] text-sm">{h.icon}</span>
            <span className="text-[10px] tracking-[0.15em] text-white/70" style={{ fontFamily: "var(--font-inter)" }}>
              {h.label}
            </span>
          </div>
        ))}
      </div>
    </div>,
    document.body
  );
}

// ─── Composant principal ─────────────────────────────────────────────────────

export default function ModelViewer({ url }: { url: string }) {
  const [fullscreen, setFullscreen] = useState(false);
  const open = useCallback(() => setFullscreen(true), []);
  const close = useCallback(() => setFullscreen(false), []);

  return (
    <>
      <div className="relative w-full h-full bg-[#f1ede6] group cursor-pointer" onClick={open}>
        <Canvas
          camera={{ position: [8, 6, 8], fov: 45 }}
          gl={{ antialias: true }}
          style={{ pointerEvents: "none" }}
        >
          <ClearColor color="#f1ede6" />
          <ambientLight intensity={1.4} />
          <directionalLight position={[5, 10, 5]} intensity={1.5} />
          <directionalLight position={[-5, 5, -5]} intensity={0.4} />
          <Suspense fallback={null}>
            <Model url={url} autoRotate />
          </Suspense>
        </Canvas>

        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/10">
          <button
            className="flex items-center gap-3 bg-[#1e3530] text-[#f9f7f4] text-[11px] tracking-[0.3em] uppercase px-6 py-3.5 hover:bg-[#253d32] transition-colors duration-300"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            <Maximize2 size={14} />
            Plein écran
          </button>
        </div>

        <div className="absolute top-4 right-4 opacity-30 group-hover:opacity-0 transition-opacity duration-300">
          <Maximize2 size={16} className="text-[#253d32]" />
        </div>
      </div>

      {fullscreen && <FullscreenViewer url={url} onClose={close} />}
    </>
  );
}
