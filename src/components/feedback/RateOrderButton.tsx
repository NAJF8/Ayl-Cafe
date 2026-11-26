"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { socialLinks } from "@/data/settings";
import { buildFeedbackWhatsAppUrl } from "@/lib/feedback";
import { useLanguage } from "@/lib/language-context";

export function RateOrderButton() {
  const { pick } = useLanguage();
  const [open, setOpen] = useState(false);
  const [stars, setStars] = useState(5);
  const [note, setNote] = useState("");

  if (!socialLinks.whatsapp) return null;

  function close() {
    setOpen(false);
    setStars(5);
    setNote("");
  }

  const href = buildFeedbackWhatsAppUrl(socialLinks.whatsapp, stars, note);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="fixed bottom-5 start-5 z-40 flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-2.5 text-sm text-text shadow-lg transition-colors hover:border-primary"
      >
        <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true" className="text-primary">
          <path d="M8 .8l2.1 4.5 4.9.6-3.6 3.4.9 5-4.3-2.4-4.3 2.4.9-5L1 5.9l4.9-.6L8 .8z" />
        </svg>
        {pick("قيّم تجربتك", "Rate your visit")}
      </button>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              className="fixed inset-0 z-[90] bg-black/60"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={close}
            />
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label={pick("قيّم تجربتك", "Rate your visit")}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="fixed inset-x-5 bottom-5 z-[95] mx-auto max-w-sm rounded-2xl border border-border bg-surface p-6 sm:inset-x-auto sm:start-1/2 sm:-translate-x-1/2"
            >
              <h2 className="font-display text-xl text-text">{pick("قيّم تجربتك", "Rate your visit")}</h2>
              <p className="mt-1 text-sm text-text-muted">
                {pick("رأيك يوصلنا مباشرة عبر واتساب", "Your feedback goes straight to us on WhatsApp")}
              </p>

              <div className="mt-5 flex items-center justify-center gap-2">
                {[1, 2, 3, 4, 5].map((value) => (
                  <button
                    key={value}
                    type="button"
                    onClick={() => setStars(value)}
                    aria-label={pick(`${value} نجوم`, `${value} stars`)}
                    className="p-1"
                  >
                    <svg
                      width="28"
                      height="28"
                      viewBox="0 0 16 16"
                      fill={value <= stars ? "currentColor" : "none"}
                      stroke="currentColor"
                      strokeWidth="1"
                      className={value <= stars ? "text-primary" : "text-border"}
                      aria-hidden="true"
                    >
                      <path d="M8 .8l2.1 4.5 4.9.6-3.6 3.4.9 5-4.3-2.4-4.3 2.4.9-5L1 5.9l4.9-.6L8 .8z" />
                    </svg>
                  </button>
                ))}
              </div>

              <textarea
                value={note}
                onChange={(e) => setNote(e.target.value.slice(0, 300))}
                rows={3}
                maxLength={300}
                placeholder={pick("أي ملاحظات إضافية؟ (اختياري)", "Any extra notes? (optional)")}
                className="mt-4 w-full rounded-lg border border-border bg-background p-3 text-sm text-text placeholder:text-text-muted/60 focus:border-primary focus:outline-none"
              />

              <div className="mt-5 flex gap-3">
                <button
                  type="button"
                  onClick={close}
                  className="flex-1 rounded-full border border-border py-2.5 text-sm text-text-muted transition-colors hover:text-text"
                >
                  {pick("إلغاء", "Cancel")}
                </button>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={close}
                  className="flex-1 rounded-full bg-primary py-2.5 text-center text-sm font-medium text-cream transition-opacity hover:opacity-90"
                >
                  {pick("إرسال", "Send")}
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
