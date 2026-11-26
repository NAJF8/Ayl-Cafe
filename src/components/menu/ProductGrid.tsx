"use client";

import { products, type Product } from "@/data/products";
import { ProductCard } from "@/components/menu/ProductCard";

type ProductGridProps = {
  categoryId: string;
  onSelect: (product: Product) => void;
};

export function ProductGrid({ categoryId, onSelect }: ProductGridProps) {
  const items = products.filter((p) => p.categoryId === categoryId);

  if (items.length === 0) {
    return <p className="py-16 text-center text-text-muted">لا توجد منتجات في هذا التصنيف حاليًا.</p>;
  }

  return (
    <div className="grid grid-cols-2 gap-4 py-6 sm:grid-cols-3 md:grid-cols-4">
      {items.map((product) => (
        <ProductCard key={product.id} product={product} onSelect={onSelect} />
      ))}
    </div>
  );
}
