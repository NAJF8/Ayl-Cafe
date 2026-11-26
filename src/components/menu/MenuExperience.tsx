"use client";

import { useState } from "react";
import { NavBar } from "@/components/layout/NavBar";
import { Footer } from "@/components/layout/Footer";
import { CategoryNav } from "@/components/menu/CategoryNav";
import { ProductGrid } from "@/components/menu/ProductGrid";
import { ProductDetailDrawer } from "@/components/menu/ProductDetailDrawer";
import { MenuEntryTransition } from "@/components/menu/MenuEntryTransition";
import { categories } from "@/data/categories";
import type { Product } from "@/data/products";
import { useLanguage } from "@/lib/language-context";

export function MenuExperience() {
  const [activeCategory, setActiveCategory] = useState(categories[0]?.id ?? "");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const { pick } = useLanguage();

  return (
    <>
      <MenuEntryTransition />
      <NavBar />
      <main className="mx-auto max-w-6xl px-5 pb-20">
        <div className="ambient-glow pt-8 text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-text-muted">
            {pick("المنيو", "Menu")}
          </p>
          <h1 className="font-display mt-2 text-3xl text-text md:text-4xl">
            {pick("المنيو", "Menu")}
          </h1>
        </div>

        <CategoryNav active={activeCategory} onChange={setActiveCategory} />
        <ProductGrid categoryId={activeCategory} onSelect={setSelectedProduct} />
      </main>
      <Footer />

      <ProductDetailDrawer product={selectedProduct} onClose={() => setSelectedProduct(null)} />
    </>
  );
}
