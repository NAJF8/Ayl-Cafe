"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import clsx from "clsx";
import type { Product } from "@/data/products";
import { formatPrice } from "@/lib/format";
import { useCart } from "@/lib/cart-context";
import { useCartDrawer } from "@/components/menu/CartDrawerContext";
import { useLanguage } from "@/lib/language-context";

type ProductDetailDrawerProps = {
  product: Product | null;
  onClose: () => void;
};

export function ProductDetailDrawer({ product, onClose }: ProductDetailDrawerProps) {
  const { addLine } = useCart();
  const { open: openCart } = useCartDrawer();
  const { pick, lang } = useLanguage();
  const [selections, setSelections] = useState<Record<string, string>>({});
  const [quantity, setQuantity] = useState(1);
  const [note, setNote] = useState("");
  const [loadedProductId, setLoadedProductId] = useState<string | null>(null);

  // Reset the form when a different product opens — adjusted during render
  // (not an effect) so there's no extra commit before the new defaults show.
  if (product && product.id !== loadedProductId) {
    const defaults: Record<string, string> = {};
    for (const group of product.optionGroups ?? []) {
      defaults[group.id] = group.options[0]?.id;
    }
    setLoadedProductId(product.id);
    setSelections(defaults);
    setQuantity(1);
    setNote("");
  }

  const unitPrice = useMemo(() => {
    if (!product) return 0;
    let price = product.price;
    for (const group of product.optionGroups ?? []) {
      const option = group.options.find((o) => o.id === selections[group.id]);
      if (option?.priceDelta) price += option.priceDelta;
    }
    return price;
  }, [product, selections]);

  function handleAdd() {
    if (!product) return;
    addLine(product.id, selections, quantity, note.trim() || undefined);
    onClose();
    openCart();
  }

  const name = product ? pick(product.nameAr, product.nameEn) : "";
  const description = product ? pick(product.descriptionAr, product.descriptionEn) : "";

  return (
    <AnimatePresence>
      {product && (
        <>
          <motion.div
            className="fixed inset-0 z-[90] bg-black/60"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={name}
            layoutId={`product-${product.id}`}
            className="fixed inset-x-0 bottom-0 z-[95] max-h-[88vh] overflow-y-auto rounded-t-2xl border-t border-border bg-surface p-6 md:inset-x-auto md:end-6 md:top-1/2 md:w-[420px] md:-translate-y-1/2 md:rounded-2xl md:border"
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <button
              type="button"
              onClick={onClose}
              aria-label={pick("إغلاق", "Close")}
              className="absolute end-5 top-5 flex h-8 w-8 items-center justify-center rounded-full border border-border text-text-muted hover:text-text"
            >
              ✕
            </button>

            <div className="aspect-[4/3] overflow-hidden rounded-lg bg-surface-raised">
              <img src={product.image} alt={name} className="h-full w-full object-cover" />
            </div>

            <h2 className="font-display mt-5 text-2xl text-text" dir={lang === "ar" ? "rtl" : "ltr"}>
              {name}
            </h2>
            {description && <p className="mt-2 text-sm text-text-muted">{description}</p>}
            <p className="mt-3 text-lg font-medium text-primary">{formatPrice(unitPrice, lang)}</p>

            {(product.optionGroups ?? []).map((group) => (
              <div key={group.id} className="mt-5">
                <p className="mb-2 text-sm font-medium text-text">{pick(group.labelAr, group.labelEn)}</p>
                <div className="flex flex-wrap gap-2">
                  {group.options.map((option) => (
                    <button
                      key={option.id}
                      type="button"
                      onClick={() => setSelections((s) => ({ ...s, [group.id]: option.id }))}
                      className={clsx(
                        "rounded-full border px-4 py-2 text-sm transition-colors",
                        selections[group.id] === option.id
                          ? "border-primary bg-primary text-cream"
                          : "border-border text-text-muted hover:text-text"
                      )}
                    >
                      {pick(option.nameAr, option.nameEn)}
                      {option.priceDelta ? ` (+${formatPrice(option.priceDelta, lang)})` : ""}
                    </button>
                  ))}
                </div>
              </div>
            ))}

            <div className="mt-5">
              <label htmlFor="product-note" className="mb-2 block text-sm font-medium text-text">
                {pick("ملاحظات (اختياري)", "Notes (optional)")}
              </label>
              <textarea
                id="product-note"
                value={note}
                onChange={(e) => setNote(e.target.value.slice(0, 200))}
                rows={2}
                maxLength={200}
                className="w-full rounded-lg border border-border bg-background p-3 text-sm text-text placeholder:text-text-muted/60 focus:border-primary focus:outline-none"
                placeholder={pick("مثال: بدون سكر", "e.g. no sugar")}
              />
            </div>

            <div className="mt-6 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3 rounded-full border border-border px-3 py-2">
                <button
                  type="button"
                  aria-label={pick("تقليل الكمية", "Decrease quantity")}
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="flex h-7 w-7 items-center justify-center text-text-muted hover:text-text"
                >
                  −
                </button>
                <span className="w-5 text-center text-text">{quantity}</span>
                <button
                  type="button"
                  aria-label={pick("زيادة الكمية", "Increase quantity")}
                  onClick={() => setQuantity((q) => Math.min(20, q + 1))}
                  className="flex h-7 w-7 items-center justify-center text-text-muted hover:text-text"
                >
                  +
                </button>
              </div>

              <button
                type="button"
                onClick={handleAdd}
                className="flex-1 rounded-full bg-primary px-6 py-3 text-sm font-medium text-cream transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              >
                {pick("إضافة إلى الطلب", "Add to order")} — {formatPrice(unitPrice * quantity, lang)}
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
