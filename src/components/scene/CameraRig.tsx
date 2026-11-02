"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { useScrollProgress } from "@/lib/scroll-progress";

/**
 * A camera station: where the camera sits and what it looks at.
 */
type Station = {
  position: [number, number, number];
  target: [number, number, number];
  fov: number;
};

/**
 * The tour. Each station lines up with a chapter of the page, marked in the
 * DOM by `data-scene-chapter`. The camera eases between them as the reader
 * moves through the story.
 */
const STATIONS: Station[] = [
  // Hero: wide establishing shot of the whole corner.
  { position: [3.4, 2.5, 4.6], target: [-0.4, 1.1, -1.6], fov: 42 },
  // About: move in towards the desk and the lamp.
  { position: [1.35, 1.55, 1.5], target: [-0.5, 1.0, -2.2], fov: 38 },
  // Work: sweep left across the shelf.
  { position: [-0.4, 2.0, 0.9], target: [1.9, 1.85, -3.1], fov: 40 },
  // Architecture: focus down into server tower & bus lines.
  { position: [-1.8, 1.3, 1.4], target: [-2.4, 0.75, -2.5], fov: 42 },
  // Archive: pan across the library shelf.
  { position: [0.2, 1.8, 1.8], target: [1.2, 1.5, -2.8], fov: 40 },
  // Stack: drop down towards the server tower LEDs.
  { position: [-1.5, 1.1, 1.1], target: [-2.6, 0.65, -2.7], fov: 44 },
  // Services: pull back around the mug and the plant.
  { position: [2.3, 1.45, 1.2], target: [1.4, 0.7, -2.4], fov: 39 },
  // Contact: settle on the lamp glow, closest and warmest.
  { position: [0.55, 1.28, 0.35], target: [1.05, 1.05, -2.5], fov: 36 },
];

const tmpPosition = new THREE.Vector3();
const tmpTarget = new THREE.Vector3();
const tmpLook = new THREE.Vector3();

/**
 * Drives the camera along the tour, and adds a gentle parallax response to
 * the pointer so the room feels alive when the reader stops scrolling.
 */
export function CameraRig({ reducedMotion }: { reducedMotion: boolean }) {
  const scrollProgress = useScrollProgress();

  const [chapters, setChapters] = useState<{ top: number; height: number }[]>([]);
  const smoothed = useRef(0);
  const currentPosition = useRef(new THREE.Vector3(...STATIONS[0].position));
  const currentTarget = useRef(new THREE.Vector3(...STATIONS[0].target));
  const currentFov = useRef(STATIONS[0].fov);

  /**
   * Measure where each chapter sits in the document. Recomputed on resize and
   * after fonts settle, so the camera stays in sync with the content.
   */
  useEffect(() => {
    const measure = () => {
      const elements = Array.from(
        document.querySelectorAll<HTMLElement>("[data-scene-chapter]"),
      );
      setChapters(
        elements.map((el) => {
          const rect = el.getBoundingClientRect();
          return {
            top: rect.top + window.scrollY,
            height: Math.max(rect.height, 1),
          };
        }),
      );
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(document.body);
    window.addEventListener("resize", measure);
    const timer = window.setTimeout(measure, 400);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", measure);
      window.clearTimeout(timer);
    };
  }, []);

  // The colour the clear render should sit against, matched to the page theme.
  const clearColor = useMemo(() => new THREE.Color("#0d0f16"), []);

  // Read the camera and pointer off the frame state: they belong to the
  // renderer, not to this render, so they are only touched while a frame runs.
  useFrame(({ camera, pointer }) => {
    const progress = scrollProgress.get();

    // Ease the raw progress so chapter edges do not feel like snapping.
    const target = reducedMotion ? progress : smoothed.current + (progress - smoothed.current) * 0.09;
    if (!reducedMotion) smoothed.current = target;

    // Work out which chapter we are in and how far through it.
    let index = 0;
    let local = 0;

    if (chapters.length > 1) {
      const scrollY = window.scrollY;
      let found = false;
      for (let i = 0; i < chapters.length; i += 1) {
        const chapter = chapters[i];
        if (scrollY + window.innerHeight * 0.5 >= chapter.top) {
          const next = chapters[i + 1];
          const end = next ? next.top : chapter.top + chapter.height;
          index = i;
          local = Math.min(Math.max((scrollY - chapter.top) / Math.max(end - chapter.top, 1), 0), 1);
          found = true;
        }
      }
      if (!found) {
        index = 0;
        local = 0;
      }
    }

    // Blend between the current station and the next one.
    const from = STATIONS[Math.min(index, STATIONS.length - 1)];
    const to = STATIONS[Math.min(index + 1, STATIONS.length - 1)];
    const blend = reducedMotion ? 0 : local;

    tmpPosition.set(...from.position).lerp(tmpTarget.set(...to.position), blend);
    tmpTarget.set(...from.target).lerp(tmpLook.set(...to.target), blend);

    // A touch of pointer parallax, damped so it never feels twitchy.
    const parallaxX = reducedMotion ? 0 : pointer.x * 0.16;
    const parallaxY = reducedMotion ? 0 : pointer.y * 0.1;

    currentPosition.current.lerp(tmpPosition, 0.045);
    currentTarget.current.lerp(tmpTarget, 0.045);
    currentFov.current += (from.fov + (to.fov - from.fov) * blend - currentFov.current) * 0.045;

    camera.position.set(
      currentPosition.current.x + parallaxX,
      currentPosition.current.y + parallaxY,
      currentPosition.current.z,
    );
    camera.lookAt(currentTarget.current);

    if (camera instanceof THREE.PerspectiveCamera) {
      camera.fov = currentFov.current;
      camera.updateProjectionMatrix();
    }
  });

  return null;
}
