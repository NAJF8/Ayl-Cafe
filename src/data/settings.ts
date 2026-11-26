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

export type HeroMedia = {
  video?: string;
  poster?: string;
};

export const heroMedia: HeroMedia = {
  // Real Ayl Cafe footage (trimmed from the client-supplied video.mp4): storefront at night
  // into the illuminated entrance — a clean, people-free, brand-only ~4s loop. The raw upload
  // is a longer seasonal winter-campaign reel that also features staff and a child; that part
  // was left out of the loop rather than looping a promo clip with people year-round.
  video: "/assets/hero/hero-loop.mp4",
  poster: "/assets/hero/video-poster.jpg",
};

export type MenuBackgroundMedia = {
  video?: string;
  posterImage?: string;
};

export const menuBackgroundMedia: MenuBackgroundMedia = {
  // A face-free crop of the same client video: just the hands, kettle and pour-over dripper
  // from its cinematic coffee-brewing shot (the full frame also shows the barista's face, so
  // only the coffee-only third of that composition is used here).
  video: "/assets/hero/menu-bg.mp4",
  posterImage: "/assets/hero/menu-bg-poster.jpg",
};

export const socialLinks = {
  instagram: "https://www.instagram.com/aylcafe.iq/",
  website: "https://aylcafe.iq",
  // The cafe's public contact number on Instagram (0781 112 2849).
  whatsapp: "9647811122849",
} as const;

export const location = {
  cityAr: "النجف",
  cityEn: "Najaf",
  addressAr: "حي الأمير، النجف الأشرف، العراق",
  addressEn: "Al-Amir, Najaf Al-Ashraf, Iraq",
  mapsUrl: "", // Google Maps share link — not published by the cafe yet, don't invent one
  hours: [{ dayAr: "يوميًا", dayEn: "Daily", open: "7:00 ص", close: "2:00 ص" }],
} as const;
