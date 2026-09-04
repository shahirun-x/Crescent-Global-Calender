"use client";

import { useEffect, useState } from "react";

export const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * Animation delay multiplier — 0.7 on phones so entrances feel ~30% snappier,
 * 1 elsewhere. Starts at 1 on the server and first client render so hydration
 * is stable; the value only feeds `transition` delays, never rendered markup.
 * Reduced-motion is handled by the page-level `<MotionConfig reducedMotion="user">`.
 */
export function useMobileSpeed() {
  const [d, setD] = useState(1);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const sync = () => setD(mq.matches ? 0.7 : 1);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);
  return d;
}
