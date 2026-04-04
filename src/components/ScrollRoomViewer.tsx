"use client";

import { Suspense, useRef, useState, useEffect, useCallback } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, Environment, Center } from "@react-three/drei";
import { motion, AnimatePresence } from "framer-motion";
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

// ─── Inner R3F components ──────────────────────────────────────────────────

function Model({ url }: { url: string }) {
  const { scene } = useGLTF(url);
  return (
    <Center>
      <primitive object={scene} />
    </Center>
  );
}

function CameraController({
  targetPositionRef,
  targetLookAtRef,
  onComplete,
}: {
  targetPositionRef: React.RefObject<THREE.Vector3>;
  targetLookAtRef: React.RefObject<THREE.Vector3>;
  onComplete: () => void;
}) {
  const currentLookAt = useRef(new THREE.Vector3(...ROOMS[0].target));
  const isActiveRef = useRef(false);
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  useFrame(({ camera }, delta) => {
    if (!targetPositionRef.current || !targetLookAtRef.current) return;

    const dist = camera.position.distanceTo(targetPositionRef.current);

    if (dist > 0.02) {
      isActiveRef.current = true;
      const t = Math.min(delta * 4, 1);
      camera.position.lerp(targetPositionRef.current, t);
      currentLookAt.current.lerp(targetLookAtRef.current, t);
      camera.lookAt(currentLookAt.current);
    } else if (isActiveRef.current) {
      camera.position.copy(targetPositionRef.current);
      currentLookAt.current.copy(targetLookAtRef.current);
      camera.lookAt(currentLookAt.current);
      isActiveRef.current = false;
      onCompleteRef.current();
    }
  });

  return null;
}

// ─── Loader ────────────────────────────────────────────────────────────────

function Loader() {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-[#080808]">
      <div className="text-center">
        <div className="w-8 h-8 border border-[#c8a97e] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p
          className="text-[11px] tracking-[0.3em] uppercase text-[#666055]"
          style={{ fontFamily: "var(--font-inter)" }}
        >
          Chargement du modèle
        </p>
      </div>
    </div>
  );
}

// ─── Main export ───────────────────────────────────────────────────────────

export default function ScrollRoomViewer({ url }: { url: string }) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [currentRoom, setCurrentRoom] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isInView, setIsInView] = useState(false);

  // Use refs for wheel handler to avoid stale closures
  const currentRoomRef = useRef(0);
  const isAnimatingRef = useRef(false);
  const isInViewRef = useRef(false);

  const targetPositionRef = useRef(new THREE.Vector3(...ROOMS[0].position));
  const targetLookAtRef = useRef(new THREE.Vector3(...ROOMS[0].target));

  // Keep refs in sync with state
  useEffect(() => { currentRoomRef.current = currentRoom; }, [currentRoom]);
  useEffect(() => { isAnimatingRef.current = isAnimating; }, [isAnimating]);
  useEffect(() => { isInViewRef.current = isInView; }, [isInView]);

  // IntersectionObserver
  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setIsInView(entry.intersectionRatio >= 0.5),
      { threshold: [0.4, 0.5, 0.6] }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Navigate to a specific room
  const goToRoom = useCallback((index: number) => {
    if (isAnimatingRef.current) return;
    setCurrentRoom(index);
    currentRoomRef.current = index;
    targetPositionRef.current.set(...ROOMS[index].position);
    targetLookAtRef.current.set(...ROOMS[index].target);
    setIsAnimating(true);
    isAnimatingRef.current = true;
  }, []);

  // Wheel event handler
  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;

    const handleWheel = (e: WheelEvent) => {
      if (!isInViewRef.current) return;

      const goingDown = e.deltaY > 0;
      const room = currentRoomRef.current;
      const atStart = room === 0 && !goingDown;
      const atEnd = room === ROOMS.length - 1 && goingDown;

      if (atStart || atEnd) return; // release to page scroll

      e.preventDefault();
      if (isAnimatingRef.current) return; // debounce during animation

      goToRoom(goingDown ? room + 1 : room - 1);
    };

    el.addEventListener("wheel", handleWheel, { passive: false });
    return () => el.removeEventListener("wheel", handleWheel);
  }, [goToRoom]);

  const hint =
    currentRoom === 0
      ? "↑ Défiler pour remonter"
      : currentRoom === ROOMS.length - 1
      ? "↓ Défiler pour continuer"
      : "↕ Défiler pour explorer";

  return (
    <div
      ref={wrapperRef}
      className="relative w-full h-full bg-[#080808]"
      style={{ touchAction: "none" }}
    >
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
          <CameraController
            targetPositionRef={targetPositionRef}
            targetLookAtRef={targetLookAtRef}
            onComplete={() => {
              setIsAnimating(false);
              isAnimatingRef.current = false;
            }}
          />
          <Environment preset="city" />
        </Canvas>
      </Suspense>

      {/* Room name — left */}
      <div className="absolute left-8 top-1/2 -translate-y-1/2 pointer-events-none">
        <span className="block w-6 h-px bg-[#c8a97e] opacity-40 mb-3" />
        <AnimatePresence mode="wait">
          <motion.div
            key={currentRoom}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            <p
              className="font-light text-[#c8a97e] text-2xl leading-tight"
              style={{ fontFamily: "var(--font-cormorant)" }}
            >
              {ROOMS[currentRoom].name}
            </p>
            <p
              className="text-[10px] tracking-[0.4em] uppercase text-[#666055] mt-1"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              {String(currentRoom + 1).padStart(2, "0")} / {String(ROOMS.length).padStart(2, "0")}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Progress dots — right */}
      <div className="absolute right-8 top-1/2 -translate-y-1/2 flex flex-col gap-3">
        {ROOMS.map((room, i) => (
          <button
            key={i}
            onClick={() => goToRoom(i)}
            className="w-1.5 h-1.5 rounded-full transition-all duration-300 cursor-pointer"
            style={{
              backgroundColor: i === currentRoom ? "#c8a97e" : "#666055",
              opacity: i === currentRoom ? 1 : 0.5,
              transform: i === currentRoom ? "scale(1.5)" : "scale(1)",
            }}
            aria-label={`Aller à ${room.name}`}
          />
        ))}
      </div>

      {/* Scroll hint — bottom */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 pointer-events-none">
        <AnimatePresence mode="wait">
          <motion.p
            key={hint}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="text-[10px] tracking-[0.25em] uppercase text-[#666055]"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            {hint}
          </motion.p>
        </AnimatePresence>
      </div>
    </div>
  );
}
