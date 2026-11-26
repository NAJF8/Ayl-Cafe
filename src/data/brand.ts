// Single source of truth for brand identity.
// Sourced from the real Ayl Cafe Instagram (@aylcafe.iq) and website (aylcafe.iq) on 2026-11-26 —
// nothing elsewhere in the app should hardcode brand text or colors outside this file + globals.css.

export const brand = {
  nameAr: "أيل كافيه",
  nameEn: "Ayl Cafe",
  shortNameAr: "أيل",
  shortNameEn: "AYL",
  taglineAr: "أيل رفيقة اليوم وصانعة المزاج",
  taglineEn: "Your everyday companion, your mood maker",
  descriptionAr: "كافيه · محمصة · بيكري — أيل رفيقة اليوم وصانعة المزاج.",
  descriptionEn: "Café · Roastery · Bakery — Ayl, your everyday companion and mood maker.",
  logo: {
    mark: "/assets/brand/logo-mark.svg",
    wordmark: "/assets/brand/logo-wordmark.svg",
  },
} as const;

export type Brand = typeof brand;
