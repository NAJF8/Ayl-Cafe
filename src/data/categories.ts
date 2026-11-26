export type Category = {
  id: string;
  nameAr: string;
  nameEn: string;
};

// Replace with Ayl Cafe's real categories once the menu is confirmed.
export const categories: Category[] = [
  { id: "signature", nameAr: "توقيع أيل", nameEn: "Signature" },
  { id: "coffee", nameAr: "قهوة", nameEn: "Coffee" },
  { id: "hot", nameAr: "مشروبات ساخنة", nameEn: "Hot Drinks" },
  { id: "cold", nameAr: "مشروبات بارده", nameEn: "Cold Drinks" },
  { id: "desserts", nameAr: "حلويات", nameEn: "Desserts" },
];
