"use client";

import { motion } from "framer-motion";
import type { Product } from "@/data/products";
import { formatPrice } from "@/lib/format";

type ProductCardProps = {
  product: Product;
  onSelect: (product: Product) => void;
};

export function ProductCard({ product, onSelect }: ProductCardProps) {
  return (
    <motion.button
      type="button"
      onClick={() => onSelect(product)}
      layoutId={`product-${product.id}`}
      whileTap={{ scale: 0.98 }}
      className="group flex flex-col overflow-hidden rounded-lg border border-border bg-surface text-start transition-colors hover:border-primary/60"
    >
      <div className="relative aspect-square overflow-hidden bg-surface-raised">
        <img
          src={product.image}
          alt={product.nameAr}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
        />
        {product.badgeAr && (
          <span className="absolute start-2 top-2 rounded-full bg-primary px-2.5 py-1 text-[11px] text-background">
            {product.badgeAr}
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-1 p-4">
        <h3 className="font-display text-base text-text">{product.nameAr}</h3>
        <p className="line-clamp-2 text-sm text-text-muted">{product.descriptionAr}</p>
        <p className="mt-auto pt-2 text-sm font-medium text-primary">{formatPrice(product.price)}</p>
      </div>
    </motion.button>
  );
}
