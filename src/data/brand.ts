// Single source of truth for brand identity.
// Replace these values once real Ayl Cafe assets (logo, exact colors, confirmed copy) are available —
// nothing elsewhere in the app should hardcode brand text or colors outside this file + globals.css.

export const brand = {
  nameAr: "أيل كافيه",
  nameEn: "Ayl Cafe",
  shortNameAr: "أيل",
  shortNameEn: "AYL",
  taglineAr: "حيث يلتقي الهدوء بالقهوة",
  taglineEn: "Where stillness meets coffee",
  descriptionAr:
    "أيل كافيه تجربة قهوة راقية، مستوحاة من رشاقة الغزال وهدوء الليل — نكهة مركّزة، وأجواء هادئة.",
  descriptionEn:
    "Ayl Cafe is a refined coffee experience, inspired by the quiet grace of the deer — concentrated flavor, calm atmosphere.",
  logo: {
    mark: "/assets/brand/logo-mark.svg",
    wordmark: "/assets/brand/logo-wordmark.svg",
  },
} as const;

export type Brand = typeof brand;
