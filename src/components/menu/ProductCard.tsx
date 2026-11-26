"use client";

import { motion } from "framer-motion";
import type { Product } from "@/data/products";
import { formatPrice } from "@/lib/format";
import { useLanguage } from "@/lib/language-context";

type ProductCardProps = {
  product: Product;
  onSelect: (product: Product) => void;
};

export function ProductCard({ product, onSelect }: ProductCardProps) {
  const { pick, lang } = useLanguage();
  const name = pick(product.nameAr, product.nameEn);
  const description = pick(product.descriptionAr, product.descriptionEn);
  const badge = pick(product.badgeAr, product.badgeEn);

  return (
    <motion.button
      type="button"
      onClick={() => onSelect(product)}
      layoutId={`product-${product.id}`}
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
      className="group flex flex-col overflow-hidden rounded-xl border border-border bg-surface text-start shadow-sm transition-shadow hover:border-primary/60 hover:shadow-lg"
    >
      <div className="relative aspect-square overflow-hidden bg-surface-raised">
        <img
          src={product.image}
          alt={name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
        />
        {badge && (
          <span className="absolute start-2 top-2 rounded-full bg-primary px-2.5 py-1 text-[11px] text-cream">
            {badge}
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-1 p-4">
        <h3 className="font-display text-base text-text" dir={lang === "ar" ? "rtl" : "ltr"}>
          {name}
        </h3>
        {description && <p className="line-clamp-2 text-sm text-text-muted">{description}</p>}
        <p className="mt-auto pt-2 text-sm font-semibold text-primary">{formatPrice(product.price, lang)}</p>
      </div>
    </motion.button>
  );
}
