"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { DeerMotif } from "@/components/motion/DeerMotif";
import { brand } from "@/data/brand";

function prefersReducedMotion() {
  if (typeof window === "undefined") return true;
  try {
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  } catch {
    return true;
  }
}

/** A brief Ayl motif flash shown every time the menu page mounts. */
export function MenuEntryTransition() {
  const [visible, setVisible] = useState(false);
  const [shouldShow] = useState(() => !prefersReducedMotion());

  useEffect(() => {
    if (!shouldShow) return;
    // eslint-disable-next-line react-hooks/set-state-in-effect -- plays once per mount of this route, decided above
    setVisible(true);
    const t = setTimeout(() => setVisible(false), 900);
    return () => clearTimeout(t);
  }, [shouldShow]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-ink"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.div
            className="h-20 w-20 text-primary"
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <DeerMotif animate={false} />
          </motion.div>
          <span className="sr-only">{brand.nameAr}</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
