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
  descriptionAr: string;
  descriptionEn: string;
  price: number;
  image: string;
  badgeAr?: string;
  badgeEn?: string;
  optionGroups?: ProductOptionGroup[];
};

// Placeholder menu. Replace with Ayl Cafe's real products, prices and photography.
export const products: Product[] = [
  {
    id: "ayl-signature-latte",
    categoryId: "signature",
    nameAr: "لاتيه أيل",
    nameEn: "Ayl Signature Latte",
    descriptionAr: "مزيج خاص من حبوب مختارة بعناية مع لمسة من الكراميل الداكن.",
    descriptionEn: "A house blend of carefully selected beans with a note of dark caramel.",
    price: 5000,
    image: "/assets/menu/placeholder-cup.svg",
    badgeAr: "الأكثر طلبًا",
    badgeEn: "Best Seller",
    optionGroups: [
      {
        id: "size",
        labelAr: "الحجم",
        labelEn: "Size",
        options: [
          { id: "regular", nameAr: "عادي", nameEn: "Regular" },
          { id: "large", nameAr: "كبير", nameEn: "Large", priceDelta: 1000 },
        ],
      },
      {
        id: "milk",
        labelAr: "نوع الحليب",
        labelEn: "Milk",
        options: [
          { id: "full", nameAr: "حليب كامل", nameEn: "Whole Milk" },
          { id: "oat", nameAr: "حليب الشوفان", nameEn: "Oat Milk", priceDelta: 750 },
        ],
      },
    ],
  },
  {
    id: "espresso",
    categoryId: "coffee",
    nameAr: "إسبريسو",
    nameEn: "Espresso",
    descriptionAr: "جرعة مركزة من أجود حبوب البن المحمصة بعناية.",
    descriptionEn: "A concentrated shot from carefully roasted beans.",
    price: 3000,
    image: "/assets/menu/placeholder-cup.svg",
  },
  {
    id: "cappuccino",
    categoryId: "coffee",
    nameAr: "كابتشينو",
    nameEn: "Cappuccino",
    descriptionAr: "توازن مثالي بين الإسبريسو والحليب المبخر والرغوة الكثيفة.",
    descriptionEn: "A perfect balance of espresso, steamed milk and dense foam.",
    price: 4000,
    image: "/assets/menu/placeholder-cup.svg",
  },
  {
    id: "spanish-latte",
    categoryId: "hot",
    nameAr: "سبانش لاتيه",
    nameEn: "Spanish Latte",
    descriptionAr: "لاتيه غني بالحليب المكثف المحلى.",
    descriptionEn: "A rich latte sweetened with condensed milk.",
    price: 4500,
    image: "/assets/menu/placeholder-cup.svg",
  },
  {
    id: "iced-americano",
    categoryId: "cold",
    nameAr: "أمريكانو مثلج",
    nameEn: "Iced Americano",
    descriptionAr: "إسبريسو منعش مع الثلج والماء البارد.",
    descriptionEn: "Refreshing espresso over ice and cold water.",
    price: 4000,
    image: "/assets/menu/placeholder-cup.svg",
  },
  {
    id: "iced-caramel-macchiato",
    categoryId: "cold",
    nameAr: "كراميل ماكياتو مثلج",
    nameEn: "Iced Caramel Macchiato",
    descriptionAr: "حليب بارد مع طبقات من الإسبريسو وصوص الكراميل.",
    descriptionEn: "Cold milk layered with espresso and caramel sauce.",
    price: 5500,
    image: "/assets/menu/placeholder-cup.svg",
  },
  {
    id: "tiramisu",
    categoryId: "desserts",
    nameAr: "تيراميسو",
    nameEn: "Tiramisu",
    descriptionAr: "طبقات ناعمة من الماسكاربوني والقهوة والكاكاو.",
    descriptionEn: "Soft layers of mascarpone, coffee and cocoa.",
    price: 6000,
    image: "/assets/menu/placeholder-dessert.svg",
  },
];
