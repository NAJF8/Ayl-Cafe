"use client";

import { useState } from "react";
import Image from "next/image";
import { useReducedMotion } from "framer-motion";
import { NavBar } from "@/components/layout/NavBar";
import { Footer } from "@/components/layout/Footer";
import { CategoryNav } from "@/components/menu/CategoryNav";
import { ProductGrid } from "@/components/menu/ProductGrid";
import { ProductDetailDrawer } from "@/components/menu/ProductDetailDrawer";
import { MenuEntryTransition } from "@/components/menu/MenuEntryTransition";
import { RateOrderButton } from "@/components/feedback/RateOrderButton";
import { ChatWidget } from "@/components/chat/ChatWidget";
import { EventsSection } from "@/components/home/EventsSection";
import { categories } from "@/data/categories";
import { menuBackgroundMedia } from "@/data/settings";
import type { Product } from "@/data/products";
import { useLanguage } from "@/lib/language-context";

export function MenuExperience() {
  const [activeCategory, setActiveCategory] = useState(categories[0]?.id ?? "");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const { pick } = useLanguage();
  const reduceMotion = useReducedMotion();
  const playVideo = Boolean(menuBackgroundMedia.video) && !reduceMotion;

  return (
    <>
      <MenuEntryTransition />
      <NavBar />
      <main className="mx-auto max-w-6xl px-5 pb-20">
        <div className="relative mt-6 flex h-64 items-center justify-center overflow-hidden rounded-2xl sm:h-80 md:h-96">
          {playVideo ? (
            <video
              className="absolute inset-0 h-full w-full object-cover"
              src={menuBackgroundMedia.video}
              poster={menuBackgroundMedia.posterImage}
              autoPlay
              muted
              loop
              playsInline
            />
          ) : menuBackgroundMedia.posterImage ? (
            <Image src={menuBackgroundMedia.posterImage} alt="" fill sizes="100vw" className="object-cover" />
          ) : null}
          <div className="absolute inset-0 bg-ink/60" />
          <div className="relative text-center">
            <p className="text-xs uppercase tracking-[0.3em] text-cream/70">
              {pick("المنيو", "Menu")}
            </p>
            <h1 className="font-display mt-2 text-4xl text-cream md:text-6xl">
              {pick("المنيو", "Menu")}
            </h1>
          </div>
        </div>

        <CategoryNav active={activeCategory} onChange={setActiveCategory} />
        <ProductGrid categoryId={activeCategory} onSelect={setSelectedProduct} />
      </main>

      <EventsSection />
      <Footer />

      <ProductDetailDrawer product={selectedProduct} onClose={() => setSelectedProduct(null)} />
      <RateOrderButton />
      <ChatWidget />
    </>
  );
}
