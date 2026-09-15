"use client";

/** Adapted from Kokonut UI's background-paths registry component. */
import { motion, useReducedMotion } from "motion/react";

const paths = [
  "M-80 95 C210 20 370 190 690 96 S1120 44 1530 118",
  "M-120 205 C170 126 405 286 720 188 S1170 128 1540 238",
  "M-90 335 C245 246 430 407 755 315 S1180 234 1560 350",
  "M-120 470 C185 374 500 531 805 442 S1190 360 1570 488",
];

export function BackgroundPaths() {
  const reduced = useReducedMotion();
  return (
    <div className="blueprint-paths" aria-hidden="true">
      <svg viewBox="0 0 1440 560" preserveAspectRatio="xMidYMid slice">
        <defs>
          <linearGradient id="blueprint-line" x1="0" x2="1">
            <stop offset="0" stopColor="#1F5B4B" stopOpacity="0" />
            <stop offset="0.5" stopColor="#2457D6" stopOpacity="0.18" />
            <stop offset="1" stopColor="#1F5B4B" stopOpacity="0" />
          </linearGradient>
          <pattern id="blueprint-grid" width="32" height="32" patternUnits="userSpaceOnUse">
            <path d="M32 0H0V32" fill="none" stroke="#101817" strokeOpacity="0.035" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#blueprint-grid)" />
        {paths.map((path, index) => (
          <motion.path key={path} d={path} fill="none" stroke="url(#blueprint-line)" strokeWidth={index === 1 ? 1.5 : 1}
            initial={reduced ? false : { pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 1.2, delay: 0.08 * index, ease: [0.22, 1, 0.36, 1] }} />
        ))}
      </svg>
    </div>
  );
}
