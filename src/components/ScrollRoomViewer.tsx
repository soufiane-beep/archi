"use client";

import { Suspense, useRef, useEffect, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useGLTF, Environment, Center } from "@react-three/drei";
import { motion, useScroll, AnimatePresence } from "framer-motion";
import * as THREE from "three";

type RoomViewpoint = {
  name: string;
  position: [number, number, number];
  target: [number, number, number];
};

const ROOMS: RoomViewpoint[] = [
  { name: "Vue d'ensemble",      position: [0, 8, 6],       target: [0, 0, 0] },
  { name: "Séjour",              position: [-3, 4, 4],       target: [-3, 0, 0] },
  { name: "Cuisine",             position: [3, 3.5, 3.5],    target: [3, 0, 0.5] },
  { name: "Chambre principale",  position: [-2.5, 4, -3],    target: [-2.5, 0, -3] },
  { name: "Salle de bain",       position: [2, 3.5, -3],     target: [2, 0, -2.5] },
];

// ─── R3F: Camera driven by scroll progress ────────────────────────────────

function ScrollCamera({ progressRef }: { progressRef: React.RefObject<number> }) {
  const { camera } = useThree();

  // Pre-allocated vectors — no GC pressure per frame
  const targetPos  = useRef(new THREE.Vector3(...ROOMS[0].position));
  const targetLook = useRef(new THREE.Vector3(...ROOMS[0].target));
  const currentLook = useRef(new THREE.Vector3(...ROOMS[0].target));
  const fromPos  = useRef(new THREE.Vector3());
  const toPos    = useRef(new THREE.Vector3());
  const fromLook = useRef(new THREE.Vector3());
  const toLook   = useRef(new THREE.Vector3());

  useFrame((_, delta) => {
    const t = progressRef.current ?? 0;
    const count = ROOMS.length;
    const raw = t * (count - 1);
    const fromIdx = Math.max(0, Math.min(Math.floor(raw), count - 2));
    const toIdx   = fromIdx + 1;
    const alpha   = raw - fromIdx;

    fromPos.current.set(...ROOMS[fromIdx].position);
    toPos.current.set(...ROOMS[toIdx].position);
    fromLook.current.set(...ROOMS[fromIdx].target);
    toLook.current.set(...ROOMS[toIdx].target);

    targetPos.current.lerpVectors(fromPos.current, toPos.current, alpha);
    targetLook.current.lerpVectors(fromLook.current, toLook.current, alpha);

    // Smooth camera follow
    const speed = Math.min(delta * 5, 1);
    camera.position.lerp(targetPos.current, speed);
    currentLook.current.lerp(targetLook.current, speed);
    camera.lookAt(currentLook.current);
  });

  return null;
}

function Model({ url }: { url: string }) {
  const { scene } = useGLTF(url);
  return <Center><primitive object={scene} /></Center>;
}

function Loader() {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-[#080808]">
      <div className="text-center">
        <div className="w-8 h-8 border border-[#c8a97e] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-[11px] tracking-[0.3em] uppercase text-[#666055]" style={{ fontFamily: "var(--font-inter)" }}>
          Chargement du modèle
        </p>
      </div>
    </div>
  );
}

// ─── Main export ───────────────────────────────────────────────────────────

export default function ScrollRoomViewer({ url }: { url: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const progressRef  = useRef(0);
  const [activeRoom, setActiveRoom] = useState(0);

  // Track scroll progress of the tall container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Keep progressRef in sync and derive active room for UI
  useEffect(() => {
    return scrollYProgress.on("change", (v) => {
      progressRef.current = v;
      const idx = Math.min(
        Math.round(v * (ROOMS.length - 1)),
        ROOMS.length - 1
      );
      setActiveRoom(idx);
    });
  }, [scrollYProgress]);

  return (
    // Tall scroll container — ROOMS.length screens tall
    <div
      ref={containerRef}
      style={{ height: `${ROOMS.length * 100}vh` }}
      className="relative w-full"
    >
      {/* Sticky full-viewport canvas */}
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-[#080808]">

        {/* Section label — top left */}
        <div className="absolute top-10 left-8 z-10 pointer-events-none">
          <div className="flex items-center gap-4">
            <span className="block w-8 h-px bg-[#c8a97e] opacity-50" />
            <span
              className="text-[10px] tracking-[0.4em] uppercase text-[#c8a97e] opacity-60"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              Plan 3D Interactif
            </span>
          </div>
        </div>

        {/* Three.js canvas */}
        <Suspense fallback={<Loader />}>
          <Canvas
            camera={{ position: ROOMS[0].position, fov: 45 }}
            gl={{ antialias: true }}
            shadows
          >
            <ambientLight intensity={1.2} />
            <directionalLight position={[5, 10, 5]} intensity={1.5} castShadow />
            <directionalLight position={[-5, 5, -5]} intensity={0.5} />
            <Model url={url} />
            <ScrollCamera progressRef={progressRef} />
            <Environment preset="city" />
          </Canvas>
        </Suspense>

        {/* Room name — bottom left */}
        <div className="absolute left-8 bottom-16 pointer-events-none z-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeRoom}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="block w-6 h-px bg-[#c8a97e] opacity-40 mb-3" />
              <p
                className="font-light text-[#c8a97e] leading-tight"
                style={{ fontFamily: "var(--font-cormorant)", fontSize: "clamp(1.8rem, 4vw, 3rem)" }}
              >
                {ROOMS[activeRoom].name}
              </p>
              <p
                className="text-[10px] tracking-[0.4em] uppercase text-[#666055] mt-2"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                {String(activeRoom + 1).padStart(2, "0")} / {String(ROOMS.length).padStart(2, "0")}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Progress dots — right */}
        <div className="absolute right-8 top-1/2 -translate-y-1/2 flex flex-col gap-4 z-10">
          {ROOMS.map((room, i) => (
            <div
              key={i}
              className="rounded-full transition-all duration-400"
              style={{
                width:           i === activeRoom ? "6px" : "4px",
                height:          i === activeRoom ? "6px" : "4px",
                backgroundColor: i === activeRoom ? "#c8a97e" : "#666055",
                opacity:         i === activeRoom ? 1 : 0.4,
                transform:       i === activeRoom ? "scale(1.4)" : "scale(1)",
              }}
              aria-label={room.name}
            />
          ))}
        </div>

        {/* Scroll hint — bottom center */}
        <AnimatePresence>
          {activeRoom < ROOMS.length - 1 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute bottom-6 left-1/2 -translate-x-1/2 pointer-events-none z-10"
            >
              <p
                className="text-[10px] tracking-[0.3em] uppercase text-[#666055]"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                ↓ Défiler pour explorer
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
