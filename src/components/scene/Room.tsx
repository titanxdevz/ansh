"use client";

import { useMemo, useRef } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { RoundedBox } from "@react-three/drei";
import { useSceneTheme } from "@/lib/theme";
import { roomPalettes } from "@/lib/palette";
import type { RoomPalette } from "@/lib/palette";

/**
 * The room shell: floor, back wall, side wall, window and rug.
 * Everything is built from primitives so the scene ships without any
 * external model or texture download.
 */
export function Room({ palette }: { palette: RoomPalette }) {
  const floorRef = useRef<THREE.Mesh>(null);

  // Subtle floor grain. Kept in greyscale so the material colour decides
  // the hue, and the map only adds texture on top.
  const floorTexture = useMemo(() => {
    const size = 256;
    const canvas = document.createElement("canvas");
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext("2d")!;

    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, size, size);

    // A seeded generator instead of Math.random, so the grain is identical on
    // every render and the texture build stays a pure function of the size.
    let seed = 0x9e3779b9;
    const random = () => {
      seed = (seed + 0x6d2b79f5) | 0;
      let t = seed;
      t = Math.imul(t ^ (t >>> 15), t | 1);
      t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };

    for (let i = 0; i < 2600; i += 1) {
      const x = random() * size;
      const y = random() * size;
      const shade = 0.86 + random() * 0.14;
      ctx.fillStyle = `rgba(${Math.round(shade * 255)},${Math.round(shade * 255)},${Math.round(
        shade * 255,
      )},1)`;
      ctx.fillRect(x, y, 1.5, 1.5);
    }

    // Plank seams.
    ctx.strokeStyle = "rgba(0,0,0,0.22)";
    ctx.lineWidth = 1.5;
    for (let i = 0; i < 8; i += 1) {
      const y = (i * size) / 8;
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(size, y);
      ctx.stroke();
    }

    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(4, 4);
    texture.colorSpace = THREE.SRGBColorSpace;
    return texture;
  }, []);

  useFrame(() => {
    if (floorRef.current) {
      const material = floorRef.current.material as THREE.MeshStandardMaterial;
      material.color.lerp(new THREE.Color(palette.floor), 0.08);
    }
  });

  return (
    <group>
      {/* Floor */}
      <mesh
        ref={floorRef}
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, -0.02, 0]}
        receiveShadow
      >
        <planeGeometry args={[16, 16]} />
        <meshStandardMaterial map={floorTexture} roughness={0.85} metalness={0.02} />
      </mesh>

      {/* Back wall */}
      <mesh position={[0, 2.4, -3.4]} receiveShadow>
        <planeGeometry args={[16, 5.4]} />
        <meshStandardMaterial color={palette.wall} roughness={0.95} />
      </mesh>

      {/* Left wall, built as four panels that frame a real window opening */}
      <group position={[-4.2, 0, 0]}>
        {/* Below the window */}
        <mesh position={[0, 0.75, 0]} rotation={[0, Math.PI / 2, 0]} receiveShadow>
          <planeGeometry args={[6.8, 1.5]} />
          <meshStandardMaterial color={palette.wall} roughness={0.95} />
        </mesh>
        {/* Above the window */}
        <mesh position={[0, 4.6, 0]} rotation={[0, Math.PI / 2, 0]} receiveShadow>
          <planeGeometry args={[6.8, 1.6]} />
          <meshStandardMaterial color={palette.wall} roughness={0.95} />
        </mesh>
        {/* Behind the window, towards the back of the room */}
        <mesh position={[0, 2.65, -2.55]} rotation={[0, Math.PI / 2, 0]} receiveShadow>
          <planeGeometry args={[1.7, 2.3]} />
          <meshStandardMaterial color={palette.wall} roughness={0.95} />
        </mesh>
        {/* Behind the window, towards the front of the room */}
        <mesh position={[0, 2.65, 2.55]} rotation={[0, Math.PI / 2, 0]} receiveShadow>
          <planeGeometry args={[1.7, 2.3]} />
          <meshStandardMaterial color={palette.wall} roughness={0.95} />
        </mesh>

        {/* The view outside, set back in the wall so the opening has depth */}
        <mesh position={[-0.14, 2.65, 0]} rotation={[0, Math.PI / 2, 0]}>
          <planeGeometry args={[3.4, 2.3]} />
          <meshStandardMaterial
            color={palette.window}
            emissive={palette.window}
            emissiveIntensity={0.28}
            roughness={0.15}
            metalness={0.05}
          />
        </mesh>

        {/* Window frame and mullions */}
        <group position={[-0.05, 2.65, 0]}>
          <mesh position={[0, 1.17, 0]}>
            <boxGeometry args={[0.1, 0.09, 3.5]} />
            <meshStandardMaterial color={palette.furniture} roughness={0.6} />
          </mesh>
          <mesh position={[0, -1.17, 0]}>
            <boxGeometry args={[0.1, 0.09, 3.5]} />
            <meshStandardMaterial color={palette.furniture} roughness={0.6} />
          </mesh>
          <mesh position={[0, 0, -1.74]}>
            <boxGeometry args={[0.1, 2.4, 0.09]} />
            <meshStandardMaterial color={palette.furniture} roughness={0.6} />
          </mesh>
          <mesh position={[0, 0, 1.74]}>
            <boxGeometry args={[0.1, 2.4, 0.09]} />
            <meshStandardMaterial color={palette.furniture} roughness={0.6} />
          </mesh>
          {/* Central vertical mullion and one cross bar */}
          <mesh>
            <boxGeometry args={[0.08, 2.3, 0.07]} />
            <meshStandardMaterial color={palette.furniture} roughness={0.6} />
          </mesh>
          <mesh position={[0, 0.2, 0]}>
            <boxGeometry args={[0.07, 0.06, 3.4]} />
            <meshStandardMaterial color={palette.furniture} roughness={0.6} />
          </mesh>
        </group>
      </group>

      {/* Rug, a soft anchor in the middle of the floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0.3, 0.001, 0.4]} receiveShadow>
        <circleGeometry args={[1.85, 48]} />
        <meshStandardMaterial color={palette.rug} roughness={1} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0.3, 0.004, 0.4]} receiveShadow>
        <ringGeometry args={[1.55, 1.72, 48]} />
        <meshStandardMaterial color={palette.rugTrim} roughness={1} />
      </mesh>
    </group>
  );
}

/** The desk, its lamp, monitor and the objects on it. */
export function Desk({ palette }: { palette: RoomPalette }) {
  const lampGlow = useRef<THREE.PointLight>(null);
  const lampShade = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (lampGlow.current) {
      // Barely-there flicker, like a filament warming up.
      const t = clock.elapsedTime;
      lampGlow.current.intensity =
        palette.lampIntensity * (0.96 + Math.sin(t * 7.3) * 0.02 + Math.sin(t * 2.1) * 0.02);
    }
    if (lampShade.current) {
      const material = lampShade.current.material as THREE.MeshStandardMaterial;
      material.emissiveIntensity = 1.6 + Math.sin(clock.elapsedTime * 7.3) * 0.12;
    }
  });

  return (
    <group position={[0, 0, -2.35]}>
      {/* Desktop */}
      <RoundedBox args={[3.5, 0.1, 1.35]} radius={0.03} smoothness={4} position={[0, 0.78, 0]} castShadow receiveShadow>
        <meshStandardMaterial color={palette.desk} roughness={0.68} metalness={0.05} />
      </RoundedBox>

      {/* Legs */}
      {[-1.55, 1.55].map((x) => (
        <mesh key={x} position={[x, 0.38, 0]} castShadow>
          <boxGeometry args={[0.12, 0.76, 1.1]} />
          <meshStandardMaterial color={palette.furniture} roughness={0.5} metalness={0.25} />
        </mesh>
      ))}

      {/* Monitor */}
      <group position={[-0.55, 1.12, -0.25]} rotation={[0, 0.14, 0]}>
        <mesh castShadow>
          <boxGeometry args={[0.42, 0.28, 0.03]} />
          <meshStandardMaterial color={palette.furniture} roughness={0.4} metalness={0.4} />
        </mesh>
        <mesh position={[0, 0.42, 0]} castShadow>
          <boxGeometry args={[0.07, 0.55, 0.07]} />
          <meshStandardMaterial color={palette.furniture} roughness={0.4} metalness={0.4} />
        </mesh>
        <mesh position={[0, 0.82, 0]}>
          <boxGeometry args={[1.32, 0.82, 0.05]} />
          <meshStandardMaterial color="#12141c" roughness={0.45} />
        </mesh>
        {/* Screen glow, tinted by the theme */}
        <mesh position={[0, 0.82, 0.028]}>
          <planeGeometry args={[1.24, 0.74]} />
          <meshStandardMaterial
            color={palette.screen}
            emissive={palette.screen}
            emissiveIntensity={0.55}
            roughness={0.2}
          />
        </mesh>
      </group>

      {/* Keyboard */}
      <group position={[-0.55, 0.84, 0.38]} rotation={[0, 0.14, 0]}>
        <RoundedBox args={[1.05, 0.035, 0.34]} radius={0.012} smoothness={3} castShadow>
          <meshStandardMaterial color="#1c1f2b" roughness={0.6} />
        </RoundedBox>
      </group>

      {/* Mouse */}
      <mesh position={[0.2, 0.855, 0.36]} rotation={[0, 0.1, 0]} castShadow>
        <sphereGeometry args={[0.07, 16, 12]} />
        <meshStandardMaterial color="#1c1f2b" roughness={0.55} />
      </mesh>

      {/* Desk lamp: the warm key light of the whole room.
          Built as a base, a lower arm and an upper arm, with the shade
          clamped to the end of the upper arm so nothing floats. */}
      <group position={[1.12, 0.83, -0.28]}>
        {/* Base */}
        <mesh castShadow>
          <cylinderGeometry args={[0.17, 0.19, 0.05, 24]} />
          <meshStandardMaterial color={palette.furniture} roughness={0.42} metalness={0.55} />
        </mesh>
        {/* Lower arm, leaning back towards the wall */}
        <group rotation={[0.26, 0, 0]}>
          <mesh position={[0, 0.26, 0]} castShadow>
            <cylinderGeometry args={[0.026, 0.026, 0.52, 12]} />
            <meshStandardMaterial color={palette.furniture} roughness={0.38} metalness={0.6} />
          </mesh>
          {/* Elbow */}
          <mesh position={[0, 0.52, 0]} castShadow>
            <sphereGeometry args={[0.045, 12, 10]} />
            <meshStandardMaterial color={palette.furniture} roughness={0.38} metalness={0.6} />
          </mesh>
          {/* Upper arm, reaching forward over the desk */}
          <group position={[0, 0.52, 0]} rotation={[-0.62, 0, 0]}>
            <mesh position={[0, 0.2, 0]} castShadow>
              <cylinderGeometry args={[0.024, 0.024, 0.42, 12]} />
              <meshStandardMaterial color={palette.furniture} roughness={0.38} metalness={0.6} />
            </mesh>
            {/* Shade hangs from the end of the upper arm */}
            <group position={[0, 0.42, 0]} rotation={[0.62, 0, 0]}>
              <mesh ref={lampShade} position={[0, -0.1, 0]} castShadow>
                <coneGeometry args={[0.2, 0.24, 24, 1, true]} />
                <meshStandardMaterial
                  color={palette.lamp}
                  emissive={palette.lamp}
                  emissiveIntensity={1.6}
                  roughness={0.5}
                  side={THREE.DoubleSide}
                />
              </mesh>
              {/* Bulb */}
              <mesh position={[0, -0.16, 0]}>
                <sphereGeometry args={[0.055, 12, 10]} />
                <meshStandardMaterial
                  color={palette.lamp}
                  emissive={palette.lamp}
                  emissiveIntensity={3.2}
                />
              </mesh>
              <pointLight
                ref={lampGlow}
                position={[0, -0.2, 0]}
                color={palette.lamp}
                intensity={palette.lampIntensity}
                distance={7.5}
                decay={2}
              />
            </group>
          </group>
        </group>
      </group>

      {/* Mug */}
      <group position={[0.72, 0.94, 0.3]}>
        <mesh castShadow>
          <cylinderGeometry args={[0.085, 0.075, 0.16, 20]} />
          <meshStandardMaterial color={palette.accent} roughness={0.42} />
        </mesh>
        <mesh position={[0.1, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.052, 0.014, 10, 20, Math.PI * 1.2]} />
          <meshStandardMaterial color={palette.accent} roughness={0.42} />
        </mesh>
      </group>

      {/* Small stack of books */}
      <group position={[1.42, 0.87, 0.22]} rotation={[0, 0.25, 0]}>
        <mesh position={[0, 0.04, 0]} castShadow>
          <boxGeometry args={[0.34, 0.07, 0.24]} />
          <meshStandardMaterial color="#6b4a6a" roughness={0.8} />
        </mesh>
        <mesh position={[0.02, 0.115, 0.01]} rotation={[0, 0.2, 0]} castShadow>
          <boxGeometry args={[0.32, 0.065, 0.23]} />
          <meshStandardMaterial color="#4a6b6b" roughness={0.8} />
        </mesh>
      </group>
    </group>
  );
}

/** A plant in the corner, so the room does not feel like a showroom. */
export function Plant({ palette }: { palette: RoomPalette }) {
  const leaves = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (leaves.current) {
      leaves.current.rotation.z = Math.sin(clock.elapsedTime * 0.6) * 0.02;
    }
  });

  return (
    <group position={[2.75, 0, -2.5]}>
      <mesh position={[0, 0.24, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.26, 0.19, 0.48, 20]} />
        <meshStandardMaterial color="#7a5340" roughness={0.9} />
      </mesh>
      <group ref={leaves} position={[0, 0.48, 0]}>
        {Array.from({ length: 7 }).map((_, i) => {
          const angle = (i / 7) * Math.PI * 2;
          return (
            <mesh
              key={i}
              position={[Math.cos(angle) * 0.14, 0.24 + (i % 3) * 0.11, Math.sin(angle) * 0.14]}
              rotation={[Math.sin(angle) * 0.5, angle, Math.cos(angle) * 0.5]}
              castShadow
            >
              <sphereGeometry args={[0.15, 12, 10]} />
              <meshStandardMaterial color={palette.foliage} roughness={0.85} />
            </mesh>
          );
        })}
      </group>
    </group>
  );
}

/** A server tower, which is what VexaNode actually runs on. */
export function ServerRack({ palette }: { palette: RoomPalette }) {
  const leds = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (leds.current) {
      const t = clock.elapsedTime;
      leds.current.children.forEach((child, i) => {
        const material = (child as THREE.Mesh).material as THREE.MeshStandardMaterial;
        const on = Math.sin(t * 3 + i * 1.7) > 0.35;
        material.emissiveIntensity = on ? 2.6 : 0.2;
      });
    }
  });

  return (
    <group position={[-2.75, 0, -2.75]}>
      <RoundedBox args={[0.62, 1.05, 0.5]} radius={0.02} smoothness={3} position={[0, 0.53, 0]} castShadow receiveShadow>
        <meshStandardMaterial color="#1a1d27" roughness={0.55} metalness={0.35} />
      </RoundedBox>
      <group ref={leds} position={[0, 0.53, 0.26]}>
        {Array.from({ length: 6 }).map((_, i) => (
          <mesh key={i} position={[-0.16 + (i % 3) * 0.16, 0.32 - Math.floor(i / 3) * 0.2, 0]}>
            <sphereGeometry args={[0.022, 8, 8]} />
            <meshStandardMaterial color={palette.accent} emissive={palette.accent} emissiveIntensity={2} />
          </mesh>
        ))}
      </group>
      {/* Vent slots */}
      {Array.from({ length: 3 }).map((_, i) => (
        <mesh key={i} position={[0, 0.22 + i * 0.2, 0.255]}>
          <boxGeometry args={[0.44, 0.035, 0.01]} />
          <meshStandardMaterial color="#0d0f16" roughness={0.9} />
        </mesh>
      ))}
    </group>
  );
}

/** Wall shelf with a few props, so the back wall is not blank. */
export function Shelf({ palette }: { palette: RoomPalette }) {
  return (
    <group position={[2.05, 2.05, -3.28]}>
      <mesh castShadow receiveShadow>
        <boxGeometry args={[2.3, 0.07, 0.34]} />
        <meshStandardMaterial color={palette.desk} roughness={0.7} />
      </mesh>
      {/* Books leaning on the shelf */}
      {[
        { x: -0.85, w: 0.07, h: 0.42, c: "#6b4a6a", r: 0.06 },
        { x: -0.77, w: 0.06, h: 0.36, c: "#4a6b6b", r: -0.04 },
        { x: -0.7, w: 0.08, h: 0.46, c: "#7a5340", r: 0.02 },
      ].map((b, i) => (
        <mesh key={i} position={[b.x, b.h / 2 + 0.035, 0]} rotation={[0, 0, b.r]} castShadow>
          <boxGeometry args={[b.w, b.h, 0.22]} />
          <meshStandardMaterial color={b.c} roughness={0.82} />
        </mesh>
      ))}
      {/* A small radio, the kind that sits on a desk for music */}
      <group position={[0.62, 0.24, 0]}>
        <RoundedBox args={[0.44, 0.28, 0.2]} radius={0.025} smoothness={3} castShadow>
          <meshStandardMaterial color={palette.furniture} roughness={0.55} />
        </RoundedBox>
        <mesh position={[-0.09, 0, 0.101]}>
          <circleGeometry args={[0.07, 20]} />
          <meshStandardMaterial color="#0f1119" roughness={0.7} />
        </mesh>
        <mesh position={[0.11, 0.03, 0.101]}>
          <circleGeometry args={[0.022, 12]} />
          <meshStandardMaterial
            color={palette.accent}
            emissive={palette.accent}
            emissiveIntensity={1.4}
          />
        </mesh>
      </group>
    </group>
  );
}

/** Lighting rig for the room. */
export function Lighting({ palette }: { palette: RoomPalette }) {
  const { theme } = useSceneTheme();
  const night = theme === "night";

  return (
    <>
      <ambientLight color={palette.ambient} intensity={palette.ambientIntensity} />
      {/* Cool light spilling in through the window */}
      <directionalLight
        position={[-6.5, 3.4, 0.8]}
        color={palette.window}
        intensity={palette.windowIntensity}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-left={-8}
        shadow-camera-right={8}
        shadow-camera-top={8}
        shadow-camera-bottom={-8}
        shadow-camera-near={0.5}
        shadow-camera-far={20}
        shadow-bias={-0.0005}
        shadow-normalBias={0.03}
      />
      {/* Soft bounce so the shadow side is never black */}
      <pointLight position={[2.6, 1.6, 2.4]} color={palette.ambient} intensity={night ? 4 : 7} distance={11} decay={2} />
    </>
  );
}
