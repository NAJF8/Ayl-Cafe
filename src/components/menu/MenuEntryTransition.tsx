"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { DeerMotif } from "@/components/motion/DeerMotif";
import { brand } from "@/data/brand";

const SESSION_KEY = "ayl-menu-entry-seen";

function computeShouldShow() {
  if (typeof window === "undefined") return false;
  try {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const alreadySeen = window.sessionStorage.getItem(SESSION_KEY);
    return !reduced && !alreadySeen;
  } catch {
    return false;
  }
}

/** A brief Ayl motif flash shown the first time the menu is opened each session. */
export function MenuEntryTransition() {
  const [visible, setVisible] = useState(false);
  // Lazy-initialized once and never recomputed, so it stays stable across React's
  // development-mode double effect invocation below.
  const [shouldShow] = useState(computeShouldShow);

  useEffect(() => {
    if (!shouldShow) return;
    try {
      window.sessionStorage.setItem(SESSION_KEY, "1");
    } catch {
      // ignore
    }
    // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time per-session reveal, decided above
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
