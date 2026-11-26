// Non-product configuration: opening media, social links, location, hours.
// Update openingMedia once real hero/opening video or photography is available in /public/assets/hero/.

export type OpeningMedia = {
  desktopVideo?: string;
  mobileVideo?: string;
  desktopImage?: string;
  mobileImage?: string;
  posterImage?: string;
};

export const openingMedia: OpeningMedia = {
  // Leave all fields empty/undefined to use the built-in Ayl 3D/CSS deer opening.
  // desktopVideo: "/assets/hero/opening-desktop.mp4",
  // mobileVideo: "/assets/hero/opening-mobile.mp4",
  // desktopImage: "/assets/hero/opening-desktop.jpg",
  // mobileImage: "/assets/hero/opening-mobile.jpg",
};

export const socialLinks = {
  instagram: "", // e.g. "https://instagram.com/aylcafe" — fill in once confirmed
  whatsapp: "", // e.g. "9647xxxxxxxxx" (no plus, no spaces)
} as const;

export const location = {
  cityAr: "النجف",
  cityEn: "Najaf",
  addressAr: "", // fill in once confirmed — do not invent an address
  addressEn: "",
  mapsUrl: "", // Google Maps share link
  hours: [] as { dayAr: string; dayEn: string; open: string; close: string }[],
} as const;
