"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import type { Product } from "@/data/products";
import { formatPrice } from "@/lib/format";
import { useLanguage } from "@/lib/language-context";
import { useCart } from "@/lib/cart-context";
import { useCartDrawer } from "@/components/menu/CartDrawerContext";

type ProductCardProps = {
  product: Product;
  onSelect: (product: Product) => void;
};

export function ProductCard({ product, onSelect }: ProductCardProps) {
  const { pick, lang } = useLanguage();
  const { addLine } = useCart();
  const { open: openCart } = useCartDrawer();
  const name = pick(product.nameAr, product.nameEn);
  const description = pick(product.descriptionAr, product.descriptionEn);
  const badge = pick(product.badgeAr, product.badgeEn);

  function quickAdd(e: React.MouseEvent) {
    e.stopPropagation();
    const defaults: Record<string, string> = {};
    for (const group of product.optionGroups ?? []) {
      defaults[group.id] = group.options[0]?.id;
    }
    addLine(product.id, defaults, 1);
    openCart();
  }

  return (
    <motion.div
      layoutId={`product-${product.id}`}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
      className="group flex flex-col overflow-hidden rounded-xl border border-border bg-surface shadow-sm transition-shadow hover:border-primary/60 hover:shadow-lg"
    >
      {/* No overflow-hidden on the outer wrapper — lets the quick-add button hang below the image edge. */}
      <div className="relative">
        <div
          role="button"
          tabIndex={0}
          onClick={() => onSelect(product)}
          onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && onSelect(product)}
          className="relative aspect-square overflow-hidden bg-surface-raised"
        >
          <Image
            src={product.image}
            alt={name}
            fill
            loading="lazy"
            sizes="(max-width: 768px) 50vw, 25vw"
            className="object-cover transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
          />
          {badge && (
            <span className="absolute end-2 top-2 rounded-full bg-primary px-2.5 py-1 text-[11px] text-cream">
              {badge}
            </span>
          )}
        </div>
        <button
          type="button"
          onClick={quickAdd}
          aria-label={pick(`إضافة ${name}`, `Add ${name}`)}
          className="absolute bottom-0 start-3 flex h-10 w-10 translate-y-1/2 items-center justify-center rounded-full bg-primary text-cream shadow-md transition-transform hover:scale-105 active:scale-95"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M8 2V14M2 8H14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
        </button>
      </div>

      <button type="button" onClick={() => onSelect(product)} className="flex flex-1 flex-col gap-1 p-4 pt-6 text-start">
        <h3 className="font-display text-base text-text" dir={lang === "ar" ? "rtl" : "ltr"}>
          {name}
        </h3>
        {description && <p className="line-clamp-2 text-sm text-text-muted">{description}</p>}
        <p className="mt-auto pt-2 text-sm font-semibold text-primary">{formatPrice(product.price, lang)}</p>
      </button>
    </motion.div>
  );
}
