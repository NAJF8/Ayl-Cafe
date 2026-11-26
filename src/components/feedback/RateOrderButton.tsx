"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import clsx from "clsx";
import { socialLinks } from "@/data/settings";
import { products } from "@/data/products";
import { buildFeedbackWhatsAppUrl, averageRating, type FeedbackRatings } from "@/lib/feedback";
import { useLanguage } from "@/lib/language-context";

const RATING_LEVELS = [
  { value: 5, labelAr: "ممتاز", labelEn: "Excellent" },
  { value: 4, labelAr: "جيد جدًا", labelEn: "Very good" },
  { value: 3, labelAr: "جيد", labelEn: "Good" },
  { value: 2, labelAr: "مقبول", labelEn: "Fair" },
  { value: 1, labelAr: "ضعيف", labelEn: "Poor" },
];

const CATEGORIES: { key: keyof FeedbackRatings; labelAr: string; labelEn: string }[] = [
  {
    key: "ambiance",
    labelAr: "كيف تقيّم الأجواء العامة للمكان (التصميم، النظافة، الراحة، الإضاءة)؟",
    labelEn: "How do you rate the overall atmosphere (design, cleanliness, comfort, lighting)?",
  },
  {
    key: "service",
    labelAr: "كيف تقيّم أداء فريق العمل (اللباقة، سرعة الخدمة، الاحترافية)؟",
    labelEn: "How do you rate the team's performance (friendliness, speed, professionalism)?",
  },
  {
    key: "quality",
    labelAr: "كيف تقيّم جودة المنتجات المقدمة (الطعام، القهوة، التقديم)؟",
    labelEn: "How do you rate the quality of what was served (food, coffee, presentation)?",
  },
];

const DEFAULT_RATINGS: FeedbackRatings = { ambiance: 5, service: 5, quality: 5 };

export function RateOrderButton() {
  const { pick } = useLanguage();
  const [open, setOpen] = useState(false);
  const [productId, setProductId] = useState("");
  const [ratings, setRatings] = useState<FeedbackRatings>(DEFAULT_RATINGS);
  const [note, setNote] = useState("");
  const [phone, setPhone] = useState("");
  const [visitDate, setVisitDate] = useState("");

  if (!socialLinks.whatsapp) return null;

  function close() {
    setOpen(false);
    setProductId("");
    setRatings(DEFAULT_RATINGS);
    setNote("");
    setPhone("");
    setVisitDate("");
  }

  const product = products.find((p) => p.id === productId);
  const href = buildFeedbackWhatsAppUrl(socialLinks.whatsapp, {
    productId: product?.id,
    productLabel: product ? pick(product.nameAr, product.nameEn) : undefined,
    ratings,
    note,
    phone,
    visitDate,
  });
  const avg = averageRating(ratings);

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
              className="fixed inset-x-4 bottom-5 top-5 z-[95] mx-auto flex max-w-lg flex-col overflow-hidden rounded-2xl border border-border bg-surface sm:inset-x-0 sm:top-1/2 sm:h-auto sm:max-h-[85vh] sm:w-full sm:-translate-y-1/2"
            >
              <div className="flex items-center justify-between border-b border-border px-6 py-4">
                <div>
                  <h2 className="font-display text-xl text-text">{pick("قيّم تجربتك", "Rate your visit")}</h2>
                  <p className="mt-0.5 text-xs text-text-muted">
                    {pick(
                      "نقدّر وقتكم في تقييم تجربتكم معنا",
                      "We appreciate you taking the time to share your experience"
                    )}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={close}
                  aria-label={pick("إغلاق", "Close")}
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-border text-text-muted hover:text-text"
                >
                  ✕
                </button>
              </div>

              <div className="flex-1 space-y-6 overflow-y-auto px-6 py-5">
                <div>
                  <label htmlFor="feedback-product" className="mb-2 block text-sm font-medium text-text">
                    {pick("الطلب (اختياري)", "Your order (optional)")}
                  </label>
                  <select
                    id="feedback-product"
                    value={productId}
                    onChange={(e) => setProductId(e.target.value)}
                    className="w-full rounded-lg border border-border bg-background p-3 text-sm text-text focus:border-primary focus:outline-none"
                  >
                    <option value="">{pick("-- اختر الطلب من المنيو --", "-- Select your order --")}</option>
                    {products.map((p) => (
                      <option key={p.id} value={p.id}>
                        {pick(p.nameAr, p.nameEn)}
                      </option>
                    ))}
                  </select>
                </div>

                {CATEGORIES.map((category) => (
                  <div key={category.key}>
                    <p className="mb-2 text-sm font-medium text-text">{pick(category.labelAr, category.labelEn)}</p>
                    <div className="flex flex-wrap gap-2">
                      {RATING_LEVELS.map((level) => (
                        <button
                          key={level.value}
                          type="button"
                          onClick={() => setRatings((r) => ({ ...r, [category.key]: level.value }))}
                          className={clsx(
                            "rounded-full border px-3 py-1.5 text-xs transition-colors",
                            ratings[category.key] === level.value
                              ? "border-primary bg-primary text-cream"
                              : "border-border text-text-muted hover:text-text"
                          )}
                        >
                          {pick(level.labelAr, level.labelEn)}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}

                <div className="flex items-center justify-center gap-1.5 rounded-xl bg-surface-raised py-3">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" className="text-primary" aria-hidden="true">
                    <path d="M8 .8l2.1 4.5 4.9.6-3.6 3.4.9 5-4.3-2.4-4.3 2.4.9-5L1 5.9l4.9-.6L8 .8z" />
                  </svg>
                  <span className="text-sm font-medium text-text">{avg.toFixed(1)}/5</span>
                </div>

                <div>
                  <label htmlFor="feedback-note" className="mb-2 block text-sm font-medium text-text">
                    {pick("ملاحظات إضافية", "Additional notes")}
                  </label>
                  <textarea
                    id="feedback-note"
                    value={note}
                    onChange={(e) => setNote(e.target.value.slice(0, 300))}
                    rows={3}
                    maxLength={300}
                    placeholder={pick("اكتب ملاحظاتك أو اقتراحاتك هنا...", "Write your feedback or suggestions...")}
                    className="w-full rounded-lg border border-border bg-background p-3 text-sm text-text placeholder:text-text-muted/60 focus:border-primary focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label htmlFor="feedback-phone" className="mb-2 block text-sm font-medium text-text">
                      {pick("رقم الهاتف (اختياري)", "Phone (optional)")}
                    </label>
                    <input
                      id="feedback-phone"
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value.slice(0, 30))}
                      placeholder="07XXXXXXXXX"
                      className="w-full rounded-lg border border-border bg-background p-3 text-sm text-text placeholder:text-text-muted/60 focus:border-primary focus:outline-none"
                      dir="ltr"
                    />
                  </div>
                  <div>
                    <label htmlFor="feedback-date" className="mb-2 block text-sm font-medium text-text">
                      {pick("تاريخ الزيارة", "Visit date")}
                    </label>
                    <input
                      id="feedback-date"
                      type="date"
                      value={visitDate}
                      onChange={(e) => setVisitDate(e.target.value)}
                      className="w-full rounded-lg border border-border bg-background p-3 text-sm text-text focus:border-primary focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              <div className="flex gap-3 border-t border-border px-6 py-4">
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
                  {pick("إرسال التقييم", "Send rating")}
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
