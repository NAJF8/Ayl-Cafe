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
};

// No current events/offers were confirmed, so this starts empty — EventsSection renders
// nothing until real ones are added here. Example shape (uncomment and edit with real info):
// { id: "ramadan-nights", titleAr: "ليالي رمضان", titleEn: "Ramadan Nights",
//   descriptionAr: "...", descriptionEn: "...", ctaLabelAr: "التفاصيل", ctaHref: "https://instagram.com/..." }
export const events: Event[] = [];
