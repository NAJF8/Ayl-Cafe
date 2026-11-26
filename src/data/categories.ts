export type Category = {
  id: string;
  nameAr: string;
  nameEn: string;
};

// "all" is a special category handled directly in ProductGrid (shows every product unfiltered) —
// it isn't a real menu section, so it doesn't appear in src/data/products.ts categoryId values.
export const ALL_CATEGORY_ID = "all";

// Real Ayl Cafe menu sections, from the official e-menu (aylcafe.iq/ar/e-menu), 2026-11-26.
export const categories: Category[] = [
  { id: ALL_CATEGORY_ID, nameAr: "كل المنتجات", nameEn: "All Products" },
  { id: "hot-coffee", nameAr: "القهوة الساخنة", nameEn: "Hot Coffee" },
  { id: "ayl-latte", nameAr: "أيل لاتيه", nameEn: "Ayl Latte" },
  { id: "ice-coffee", nameAr: "القهوة الباردة", nameEn: "Ice Coffee" },
  { id: "frappe", nameAr: "فرابيه", nameEn: "Frappé" },
  { id: "milkshake", nameAr: "ميلك شيك", nameEn: "Milkshake" },
  { id: "mojito", nameAr: "موهيتو", nameEn: "Mojito" },
  { id: "smoothies", nameAr: "سموذي", nameEn: "Smoothies" },
];
