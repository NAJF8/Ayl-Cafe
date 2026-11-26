export type Category = {
  id: string;
  nameAr: string;
  nameEn: string;
};

// Real Ayl Cafe menu sections, from the official e-menu (aylcafe.iq/ar/e-menu), 2026-11-26.
export const categories: Category[] = [
  { id: "hot-coffee", nameAr: "القهوة الساخنة", nameEn: "Hot Coffee" },
  { id: "ayl-latte", nameAr: "أيل لاتيه", nameEn: "Ayl Latte" },
  { id: "ice-coffee", nameAr: "القهوة الباردة", nameEn: "Ice Coffee" },
  { id: "frappe", nameAr: "فرابيه", nameEn: "Frappé" },
  { id: "milkshake", nameAr: "ميلك شيك", nameEn: "Milkshake" },
  { id: "mojito", nameAr: "موهيتو", nameEn: "Mojito" },
  { id: "smoothies", nameAr: "سموذي", nameEn: "Smoothies" },
];
