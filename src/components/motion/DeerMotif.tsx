"use client";

import { motion, useReducedMotion } from "framer-motion";

type DeerMotifProps = {
  className?: string;
  animate?: boolean;
};

/**
 * Abstract, elegant deer motif built from line geometry — antlers, a silhouette
 * line and a single eye point. Intentionally not a literal/cartoon deer.
 */
export function DeerMotif({ className, animate = true }: DeerMotifProps) {
  const prefersReducedMotion = useReducedMotion();
  const shouldAnimate = animate && !prefersReducedMotion;

  const pathTransition = { duration: 1.6, ease: [0.22, 1, 0.36, 1] as const };

  return (
    <svg
      viewBox="0 0 400 400"
      className={className}
      role="img"
      aria-label="Ayl deer motif"
    >
      <motion.path
        d="M200 320 L200 210 C170 210 150 185 140 150 C135 130 140 110 150 95
           M150 95 C142 80 142 65 150 50
           M140 150 C120 148 105 160 92 178
           M92 178 C80 182 70 192 65 206"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={shouldAnimate ? { pathLength: 0, opacity: 0 } : { pathLength: 1, opacity: 1 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={pathTransition}
      />
      <motion.path
        d="M200 210 C230 210 250 185 260 150 C265 130 260 110 250 95
           M250 95 C258 80 258 65 250 50
           M260 150 C280 148 295 160 308 178
           M308 178 C320 182 330 192 335 206"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={shouldAnimate ? { pathLength: 0, opacity: 0 } : { pathLength: 1, opacity: 1 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ ...pathTransition, delay: shouldAnimate ? 0.15 : 0 }}
      />
      <motion.circle
        cx="200"
        cy="232"
        r="2.4"
        fill="currentColor"
        initial={shouldAnimate ? { opacity: 0 } : { opacity: 1 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: shouldAnimate ? 1.4 : 0 }}
      />
    </svg>
  );
}
