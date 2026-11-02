"use client";

import { createContext, useContext, type ReactNode } from "react";
import { useScroll, type MotionValue } from "motion/react";

/**
 * A single MotionValue carrying scroll progress across the whole document.
 *
 * The DOM side reads it for section reveals. The 3D side reads it inside
 * `useFrame` to fly the camera between rooms. Keeping it as one MotionValue
 * means neither side re-renders React on scroll.
 */
const ScrollProgressContext = createContext<MotionValue<number> | null>(null);

export function ScrollProgressProvider({ children }: { children: ReactNode }) {
  const { scrollYProgress } = useScroll();

  return (
    <ScrollProgressContext.Provider value={scrollYProgress}>
      {children}
    </ScrollProgressContext.Provider>
  );
}

export function useScrollProgress(): MotionValue<number> {
  const value = useContext(ScrollProgressContext);
  if (!value) {
    throw new Error("useScrollProgress must be used inside ScrollProgressProvider");
  }
  return value;
}
