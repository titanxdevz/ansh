"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { CameraRig } from "./CameraRig";
import { Desk, Lighting, Plant, Room, ServerRack, Shelf } from "./Room";
import { useSceneTheme } from "@/lib/theme";
import { roomPalettes } from "@/lib/palette";

/**
 * Keeps the scene background and fog in step with the page theme.
 * Runs inside the Canvas so it can reach the scene directly.
 */
function SceneBackground({ color }: { color: string }) {
  const { scene } = useThree();
  const target = useRef(new THREE.Color(color));

  useEffect(() => {
    target.current.set(color);
  }, [color]);

  useFrame(() => {
    if (scene.background instanceof THREE.Color) {
      scene.background.lerp(target.current, 0.05);
    }
    if (scene.fog instanceof THREE.Fog) {
      scene.fog.color.lerp(target.current, 0.05);
    }
  });

  return null;
}

/**
 * The fixed 3D layer behind the page.
 *
 * It sits behind all content at `pointer-events: none`, so the room is
 * atmosphere rather than something that intercepts clicks or text selection.
 */
export function SceneLayer() {
  const { theme } = useSceneTheme();
  const palette = roomPalettes[theme];
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-0" aria-hidden="true">
      <Canvas
        shadows
        dpr={[1, 1.75]}
        gl={{ antialias: true, powerPreference: "high-performance" }}
        camera={{ position: [3.4, 2.5, 4.6], fov: 42, near: 0.1, far: 60 }}
        onCreated={({ gl, scene }) => {
          gl.toneMapping = THREE.ACESFilmicToneMapping;
          gl.toneMappingExposure = 1.05;
          scene.background = new THREE.Color(palette.background);
          scene.fog = new THREE.Fog(palette.background, 14, 34);
        }}
      >
        <Suspense fallback={null}>
          <SceneBackground color={palette.background} />
          <CameraRig reducedMotion={reducedMotion} />
          <Lighting palette={palette} />
          <Room palette={palette} />
          <Desk palette={palette} />
          <Shelf palette={palette} />
          <Plant palette={palette} />
          <ServerRack palette={palette} />
        </Suspense>      </Canvas>
    </div>
  );
}
