"use client";

import { motion } from "framer-motion";
import { products, type Product } from "@/data/products";
import { ALL_CATEGORY_ID } from "@/data/categories";
import { ProductCard } from "@/components/menu/ProductCard";
import { useLanguage } from "@/lib/language-context";

type ProductGridProps = {
  categoryId: string;
  onSelect: (product: Product) => void;
};

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.05 } },
};

const item = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] as const } },
};

export function ProductGrid({ categoryId, onSelect }: ProductGridProps) {
  const { pick } = useLanguage();
  const items = categoryId === ALL_CATEGORY_ID ? products : products.filter((p) => p.categoryId === categoryId);

  if (items.length === 0) {
    return (
      <p className="py-16 text-center text-text-muted">
        {pick("لا توجد منتجات في هذا التصنيف حاليًا.", "No items in this category yet.")}
      </p>
    );
  }

  return (
    <motion.div
      key={categoryId}
      variants={container}
      initial="hidden"
      animate="show"
      className="grid grid-cols-2 gap-4 py-6 sm:grid-cols-3 md:grid-cols-4"
    >
      {items.map((product) => (
        <motion.div key={product.id} variants={item}>
          <ProductCard product={product} onSelect={onSelect} />
        </motion.div>
      ))}
    </motion.div>
  );
}
