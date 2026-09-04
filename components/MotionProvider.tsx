"use client";

import type { ReactNode } from "react";
import { MotionConfig } from "framer-motion";

/**
 * Site-wide Framer Motion config.
 *
 * `reducedMotion="never"` is deliberate: recent framer-motion versions, when the
 * OS "reduce motion" flag is set, skip scroll/entrance animations entirely —
 * which leaves elements stuck at their `initial` (`opacity: 0`) state and makes
 * content invisible. Forcing animations to run keeps every page readable for
 * those viewers; the brief opacity fade is far preferable to blank sections.
 * CSS-level motion (hover transitions, the ambient gradient mesh) is still
 * quietened for them by the `prefers-reduced-motion` block in `globals.css`.
 */
export default function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="never">{children}</MotionConfig>;
}
