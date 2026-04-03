"use client";

import { Suspense, useRef } from "react";
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
  return (
    <div className="relative w-full h-full bg-[#080808]">
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
            enableZoom
            enableRotate
            minDistance={1}
            maxDistance={30}
            autoRotate={false}
          />
          <Environment preset="city" />
        </Canvas>
      </Suspense>

      {/* Controls hint */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-6 pointer-events-none">
        {[
          { icon: "↻", label: "Glisser pour tourner" },
          { icon: "⇔", label: "Clic droit pour déplacer" },
          { icon: "⊕", label: "Molette pour zoomer" },
        ].map((hint) => (
          <div key={hint.label} className="flex items-center gap-2 opacity-50">
            <span className="text-[#c8a97e] text-sm">{hint.icon}</span>
            <span className="text-[10px] tracking-[0.15em] text-[#666055]" style={{ fontFamily: "var(--font-inter)" }}>
              {hint.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
