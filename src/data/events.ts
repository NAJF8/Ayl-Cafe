export type Event = {
  id: string;
  titleAr: string;
  titleEn: string;
  descriptionAr?: string;
  descriptionEn?: string;
  badgeAr?: string;
  badgeEn?: string;
  ctaLabelAr?: string;
  ctaLabelEn?: string;
  ctaHref?: string;
  image?: string;
};

// Real Ayl Cafe campaign, seen in their own promotional footage (@aylcafe.iq) — no exact dates
// or offer terms are known, so none are invented here; the CTA sends guests to Instagram for
// the current details. Add more real events below as they're confirmed.
export const events: Event[] = [
  {
    id: "ayl-winter",
    titleAr: "شتوية أيل",
    titleEn: "Ayl Winter",
    descriptionAr: "تشكيلة أيل الموسمية لفصل الشتاء — تابعونا على إنستغرام للتفاصيل والعروض الحالية.",
    descriptionEn: "Ayl's seasonal winter lineup — follow our Instagram for current details and offers.",
    badgeAr: "موسمي",
    badgeEn: "Seasonal",
    ctaLabelAr: "التفاصيل على إنستغرام",
    ctaLabelEn: "Details on Instagram",
    ctaHref: "https://www.instagram.com/aylcafe.iq/",
    image: "/assets/menu/ayl-winter-card.jpg",
  },
];
