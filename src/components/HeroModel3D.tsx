"use client";

import { Suspense, useRef, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, Center, OrbitControls } from "@react-three/drei";
import * as THREE from "three";

function WireframeModel({ url }: { url: string }) {
  const { scene } = useGLTF(url);
  const groupRef = useRef<THREE.Group>(null);

  // Clone scene and apply wireframe material
  const wireframeScene = scene.clone(true);
  wireframeScene.traverse((child) => {
    if ((child as THREE.Mesh).isMesh) {
      const mesh = child as THREE.Mesh;
      mesh.material = new THREE.MeshBasicMaterial({
        color: new THREE.Color("#c8a97e"),
        wireframe: true,
        transparent: true,
        opacity: 0.45,
      });
    }
  });

  // Solid version (faint, for depth)
  const solidScene = scene.clone(true);
  solidScene.traverse((child) => {
    if ((child as THREE.Mesh).isMesh) {
      const mesh = child as THREE.Mesh;
      mesh.material = new THREE.MeshBasicMaterial({
        color: new THREE.Color("#1a1612"),
        transparent: true,
        opacity: 0.6,
        side: THREE.FrontSide,
      });
    }
  });

  // Slow auto-rotate
  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.08;
    }
  });

  return (
    <Center>
      <group ref={groupRef}>
        <primitive object={solidScene} />
        <primitive object={wireframeScene} />
      </group>
    </Center>
  );
}

export default function HeroModel3D({ url }: { url: string }) {
  return (
    <Canvas
      camera={{ position: [14, 10, 14], fov: 35 }}
      gl={{ antialias: true, alpha: true }}
      style={{ background: "transparent" }}
    >
      <ambientLight intensity={0.3} />
      <Suspense fallback={null}>
        <WireframeModel url={url} />
      </Suspense>
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        enableRotate
        autoRotate={false}
        minPolarAngle={Math.PI / 4}
        maxPolarAngle={Math.PI / 1.8}
      />
    </Canvas>
  );
}
