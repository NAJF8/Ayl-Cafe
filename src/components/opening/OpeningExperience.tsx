"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { DeerMotif } from "@/components/motion/DeerMotif";
import { brand } from "@/data/brand";
import { openingMedia } from "@/data/settings";

const SESSION_KEY = "ayl-opening-seen";

export function OpeningExperience() {
  const prefersReducedMotion = useReducedMotion();
  const [visible, setVisible] = useState(false);
  const [stage, setStage] = useState<"deer" | "wordmark" | "done">("deer");

  useEffect(() => {
    try {
      if (window.sessionStorage.getItem(SESSION_KEY)) return;
    } catch {
      // storage unavailable — show the opening anyway
    }
    // eslint-disable-next-line react-hooks/set-state-in-effect -- reveal only after mount, sessionStorage isn't available during SSR
    setVisible(true);

    if (prefersReducedMotion) {
      const t = setTimeout(() => finish(), 500);
      return () => clearTimeout(t);
    }

    const toWordmark = setTimeout(() => setStage("wordmark"), 1800);
    const toDone = setTimeout(() => finish(), 3400);
    return () => {
      clearTimeout(toWordmark);
      clearTimeout(toDone);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function finish() {
    setStage("done");
    setVisible(false);
    try {
      window.sessionStorage.setItem(SESSION_KEY, "1");
    } catch {
      // ignore
    }
  }

  const hasCustomMedia = Boolean(openingMedia.desktopVideo || openingMedia.desktopImage);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-ink text-cream"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          {hasCustomMedia ? (
            <>
              {openingMedia.desktopVideo && (
                <video
                  className="absolute inset-0 h-full w-full object-cover opacity-70"
                  src={openingMedia.desktopVideo}
                  poster={openingMedia.posterImage}
                  autoPlay
                  muted
                  playsInline
                />
              )}
              <div className="absolute inset-0 bg-ink/60" />
            </>
          ) : (
            <motion.div
              className="h-40 w-40 text-primary md:h-56 md:w-56"
              animate={stage === "wordmark" ? { scale: 0.75, y: -24, opacity: 0.6 } : {}}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <DeerMotif />
            </motion.div>
          )}

          <AnimatePresence>
            {stage === "wordmark" && (
              <motion.div
                className="relative z-10 mt-8 text-center"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              >
                <p className="font-display text-3xl tracking-wide text-primary md:text-4xl">
                  {brand.shortNameAr}
                </p>
                <p className="mt-1 text-sm text-cream/70">{brand.nameAr}</p>
              </motion.div>
            )}
          </AnimatePresence>

          <button
            type="button"
            onClick={finish}
            className="absolute bottom-8 end-8 text-xs uppercase tracking-widest text-cream/60 transition-colors hover:text-cream focus-visible:outline-2 focus-visible:outline-primary"
          >
            تخطي · Skip
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
