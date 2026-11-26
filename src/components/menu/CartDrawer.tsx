"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useCart } from "@/lib/cart-context";
import { useCartDrawer } from "@/components/menu/CartDrawerContext";
import { formatPrice } from "@/lib/format";
import { buildWhatsAppOrderUrl } from "@/lib/whatsapp";
import { socialLinks } from "@/data/settings";

export function CartDrawer() {
  const { isOpen, close } = useCartDrawer();
  const { lines, lineDetails, removeLine, setQuantity, total } = useCart();

  const whatsappReady = Boolean(socialLinks.whatsapp);
  const orderUrl = whatsappReady ? buildWhatsAppOrderUrl(socialLinks.whatsapp, lines) : null;

  return (
    <AnimatePresence>
      {isOpen && (
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
            aria-label="سلة الطلب"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-y-0 end-0 z-[95] flex w-full max-w-sm flex-col border-s border-border bg-surface p-6"
          >
            <div className="flex items-center justify-between">
              <h2 className="font-display text-xl text-text">طلبك</h2>
              <button
                type="button"
                onClick={close}
                aria-label="إغلاق السلة"
                className="flex h-8 w-8 items-center justify-center rounded-full border border-border text-text-muted hover:text-text"
              >
                ✕
              </button>
            </div>

            {lines.length === 0 ? (
              <p className="mt-10 text-center text-text-muted">السلة فارغة حاليًا.</p>
            ) : (
              <div className="mt-6 flex-1 space-y-4 overflow-y-auto">
                {lines.map((line) => {
                  const details = lineDetails(line);
                  if (!details) return null;
                  return (
                    <div key={line.lineId} className="flex gap-3 border-b border-border pb-4">
                      <img
                        src={details.product.image}
                        alt={details.product.nameAr}
                        className="h-16 w-16 rounded-lg object-cover"
                      />
                      <div className="flex-1">
                        <p className="text-sm font-medium text-text">{details.product.nameAr}</p>
                        <p className="mt-1 text-xs text-text-muted">
                          {formatPrice(details.unitPrice)} × {line.quantity}
                        </p>
                        <div className="mt-2 flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => setQuantity(line.lineId, line.quantity - 1)}
                            className="flex h-6 w-6 items-center justify-center rounded-full border border-border text-xs text-text-muted"
                          >
                            −
                          </button>
                          <span className="text-xs text-text">{line.quantity}</span>
                          <button
                            type="button"
                            onClick={() => setQuantity(line.lineId, line.quantity + 1)}
                            className="flex h-6 w-6 items-center justify-center rounded-full border border-border text-xs text-text-muted"
                          >
                            +
                          </button>
                          <button
                            type="button"
                            onClick={() => removeLine(line.lineId)}
                            className="ms-2 text-xs text-accent hover:underline"
                          >
                            إزالة
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {lines.length > 0 && (
              <div className="mt-4 border-t border-border pt-4">
                <div className="flex items-center justify-between text-text">
                  <span>الإجمالي</span>
                  <span className="font-medium text-primary">{formatPrice(total)}</span>
                </div>

                {whatsappReady ? (
                  <a
                    href={orderUrl!}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 block w-full rounded-full bg-primary py-3 text-center text-sm font-medium text-background transition-opacity hover:opacity-90"
                  >
                    إرسال الطلب عبر واتساب
                  </a>
                ) : (
                  <p className="mt-4 text-center text-xs text-text-muted">
                    رقم الطلب عبر واتساب غير مُفعّل بعد.
                  </p>
                )}
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
