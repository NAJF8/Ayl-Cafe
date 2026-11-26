export type ProductOption = {
  id: string;
  nameAr: string;
  nameEn: string;
  priceDelta?: number;
};

export type ProductOptionGroup = {
  id: string;
  labelAr: string;
  labelEn: string;
  options: ProductOption[];
};

export type Product = {
  id: string;
  categoryId: string;
  nameAr: string;
  nameEn: string;
  descriptionAr?: string;
  descriptionEn?: string;
  price: number;
  image: string;
  badgeAr?: string;
  badgeEn?: string;
  optionGroups?: ProductOptionGroup[];
};

// Real Ayl Cafe photography (from @aylcafe.iq), used as category-representative images since no
// individual per-item product photography exists yet. Not a 1:1 photo per drink — see README.
const PHOTO_HOT_COFFEE = "/assets/menu/pour-over.jpg"; // pour-over coffee, real Ayl shot
const PHOTO_SPECIALTY = "/assets/menu/roastery-beans.jpg"; // espresso grinder + beans, real Ayl shot
const PHOTO_COLD = "/assets/menu/iced-signature.jpg"; // iced drink in a branded Ayl cup, real shot

const hotColdOption: ProductOptionGroup = {
  id: "temperature",
  labelAr: "حار / بارد",
  labelEn: "Hot / Cold",
  options: [
    { id: "hot", nameAr: "حار", nameEn: "Hot" },
    { id: "cold", nameAr: "بارد", nameEn: "Cold" },
  ],
};

// Real Ayl Cafe menu, transcribed from the official e-menu PDF (aylcafe.iq/ar/e-menu), 2026-11-26.
// Prices are in IQD. No items, descriptions, or prices are invented.
export const products: Product[] = [
  // Hot Coffee
  { id: "single-espresso", categoryId: "hot-coffee", nameAr: "إسبريسو سنقل", nameEn: "Single Espresso", price: 3000, image: PHOTO_HOT_COFFEE },
  { id: "double-espresso", categoryId: "hot-coffee", nameAr: "إسبريسو دبل", nameEn: "Double Espresso", price: 4000, image: PHOTO_HOT_COFFEE },
  { id: "classic-latte-hot", categoryId: "hot-coffee", nameAr: "كلاسيك لاتيه", nameEn: "Classic Latte", price: 5000, image: PHOTO_HOT_COFFEE },
  { id: "cappuccino", categoryId: "hot-coffee", nameAr: "كابتشينو", nameEn: "Cappuccino", price: 5000, image: PHOTO_HOT_COFFEE },
  { id: "flat-white", categoryId: "hot-coffee", nameAr: "فلات وايت", nameEn: "Flat White", price: 5000, image: PHOTO_HOT_COFFEE },
  { id: "cortado", categoryId: "hot-coffee", nameAr: "كورتادو", nameEn: "Cortado", price: 5000, image: PHOTO_HOT_COFFEE },
  { id: "piccolo", categoryId: "hot-coffee", nameAr: "بيكولو", nameEn: "Piccolo", price: 5000, image: PHOTO_HOT_COFFEE },
  { id: "spanish-latte-hot", categoryId: "hot-coffee", nameAr: "سبانش لاتيه", nameEn: "Spanish Latte", price: 5000, image: PHOTO_HOT_COFFEE },
  { id: "dark-mocha-hot", categoryId: "hot-coffee", nameAr: "دارك موكا", nameEn: "Dark Mocha", price: 5000, image: PHOTO_HOT_COFFEE },
  { id: "americano-hot", categoryId: "hot-coffee", nameAr: "أمريكانو", nameEn: "Americano", price: 5000, image: PHOTO_HOT_COFFEE },
  { id: "turkish-coffee", categoryId: "hot-coffee", nameAr: "قهوة تركية", nameEn: "Turkish Coffee", price: 3000, image: PHOTO_HOT_COFFEE },

  // Ayl Latte — served hot or cold
  { id: "roasted-hazelnut", categoryId: "ayl-latte", nameAr: "بندق محمص", nameEn: "Roasted Hazelnut", price: 6000, image: PHOTO_SPECIALTY, optionGroups: [hotColdOption] },
  { id: "peanut", categoryId: "ayl-latte", nameAr: "فول سوداني", nameEn: "Peanut", price: 6000, image: PHOTO_SPECIALTY, optionGroups: [hotColdOption] },
  { id: "almond", categoryId: "ayl-latte", nameAr: "ألموند", nameEn: "Almond", price: 6000, image: PHOTO_SPECIALTY, optionGroups: [hotColdOption] },
  { id: "cashew-nut", categoryId: "ayl-latte", nameAr: "كاجو نت", nameEn: "Cashew Nut", price: 6000, image: PHOTO_SPECIALTY, optionGroups: [hotColdOption] },
  { id: "cinnamon", categoryId: "ayl-latte", nameAr: "سينامون", nameEn: "Cinnamon", price: 6000, image: PHOTO_SPECIALTY, optionGroups: [hotColdOption] },
  { id: "marshmallow", categoryId: "ayl-latte", nameAr: "مارشميلو", nameEn: "Marshmallow", price: 6000, image: PHOTO_SPECIALTY, optionGroups: [hotColdOption] },
  { id: "orange-latte", categoryId: "ayl-latte", nameAr: "اورانج", nameEn: "Orange", price: 6000, image: PHOTO_SPECIALTY, optionGroups: [hotColdOption] },
  { id: "tahini-halva", categoryId: "ayl-latte", nameAr: "رهش", nameEn: "Tahini Halva", price: 6000, image: PHOTO_SPECIALTY, optionGroups: [hotColdOption] },
  { id: "chocolate-mousse", categoryId: "ayl-latte", nameAr: "موس جوكليت", nameEn: "Chocolate Mousse", price: 6000, image: PHOTO_SPECIALTY, optionGroups: [hotColdOption] },
  { id: "mascarpone", categoryId: "ayl-latte", nameAr: "جيز كاربوني", nameEn: "Mascarpone", price: 6000, image: PHOTO_SPECIALTY, optionGroups: [hotColdOption] },

  // Ice Coffee
  { id: "classic-latte-ice", categoryId: "ice-coffee", nameAr: "كلاسيك لاتيه", nameEn: "Classic Latte", price: 5000, image: PHOTO_COLD },
  { id: "spanish-latte-ice", categoryId: "ice-coffee", nameAr: "سبانش لاتيه", nameEn: "Spanish Latte", price: 5000, image: PHOTO_COLD },
  { id: "salted-caramel", categoryId: "ice-coffee", nameAr: "كرامل مملح", nameEn: "Salted Caramel", price: 5000, image: PHOTO_COLD },
  { id: "saffron", categoryId: "ice-coffee", nameAr: "زعفران", nameEn: "Saffron", price: 5000, image: PHOTO_COLD },
  { id: "shaken", categoryId: "ice-coffee", nameAr: "شيكن", nameEn: "Shaken", price: 5000, image: PHOTO_COLD },
  { id: "dark-mocha-ice", categoryId: "ice-coffee", nameAr: "دارك موكا", nameEn: "Dark Mocha", price: 5000, image: PHOTO_COLD },
  { id: "dulce-de-leche-ice", categoryId: "ice-coffee", nameAr: "دولتشي دي ليتشي", nameEn: "Dulce de Leche", price: 5000, image: PHOTO_COLD },
  { id: "caramel", categoryId: "ice-coffee", nameAr: "كراميل", nameEn: "Caramel", price: 5000, image: PHOTO_COLD },
  { id: "pistachio-ice", categoryId: "ice-coffee", nameAr: "بستاشيو", nameEn: "Pistachio", price: 5000, image: PHOTO_COLD },
  { id: "americano-ice", categoryId: "ice-coffee", nameAr: "أمريكانو", nameEn: "Americano", price: 5000, image: PHOTO_COLD },

  // Frappé
  { id: "classic-frappe", categoryId: "frappe", nameAr: "بيسك", nameEn: "Classic Frappé", price: 6000, image: PHOTO_COLD },
  { id: "dulce-de-leche-frappe", categoryId: "frappe", nameAr: "دولتشي دي ليتشي", nameEn: "Dulce de Leche", price: 6000, image: PHOTO_COLD },
  { id: "chocolate-frappe", categoryId: "frappe", nameAr: "جوكلت", nameEn: "Chocolate", price: 6000, image: PHOTO_COLD },
  { id: "cookies-frappe", categoryId: "frappe", nameAr: "كوكيز", nameEn: "Cookies", price: 6000, image: PHOTO_COLD },

  // Milkshake
  { id: "pistachio-shake", categoryId: "milkshake", nameAr: "بيستاشيو", nameEn: "Pistachio", price: 5500, image: PHOTO_COLD },
  { id: "nutella-shake", categoryId: "milkshake", nameAr: "نوتيلا", nameEn: "Nutella", price: 5500, image: PHOTO_COLD },
  { id: "lotus-shake", categoryId: "milkshake", nameAr: "لوتس", nameEn: "Lotus", price: 5500, image: PHOTO_COLD },
  { id: "oreo-shake", categoryId: "milkshake", nameAr: "أوريو", nameEn: "Oreo", price: 5500, image: PHOTO_COLD },

  // Mojito
  { id: "strawberry-mojito", categoryId: "mojito", nameAr: "فراولة", nameEn: "Strawberry", price: 5000, image: PHOTO_COLD },
  { id: "blueberry-mojito", categoryId: "mojito", nameAr: "بلوبيري", nameEn: "Blueberry", price: 5000, image: PHOTO_COLD },
  { id: "peach-mojito", categoryId: "mojito", nameAr: "خوخ", nameEn: "Peach", price: 5000, image: PHOTO_COLD },
  { id: "green-apple-mojito", categoryId: "mojito", nameAr: "تفاح أخضر", nameEn: "Green Apple", price: 5000, image: PHOTO_COLD },
  { id: "passion-fruit-mojito", categoryId: "mojito", nameAr: "باشن فروت", nameEn: "Passion Fruit", price: 5000, image: PHOTO_COLD },

  // Smoothies
  { id: "dragon-fruit-smoothie", categoryId: "smoothies", nameAr: "دراغون فروت", nameEn: "Dragon Fruit", price: 5500, image: PHOTO_COLD },
  { id: "mixed-berries-smoothie", categoryId: "smoothies", nameAr: "مكس بيريز", nameEn: "Mixed Berries", price: 5500, image: PHOTO_COLD },
  { id: "watermelon-smoothie", categoryId: "smoothies", nameAr: "واترميلون", nameEn: "Watermelon", price: 5500, image: PHOTO_COLD },
  { id: "papaya-smoothie", categoryId: "smoothies", nameAr: "بابايا فروت", nameEn: "Papaya Fruit", price: 5500, image: PHOTO_COLD },
  { id: "sunrise-smoothie", categoryId: "smoothies", nameAr: "سان رايز", nameEn: "Sunrise", price: 5500, image: PHOTO_COLD },
];
