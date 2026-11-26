import type { Metadata } from "next";
import { Amiri, Tajawal, Fraunces, Inter } from "next/font/google";
import { brand } from "@/data/brand";
import { socialLinks, location } from "@/data/settings";
import { CartProvider } from "@/lib/cart-context";
import { ThemeProvider } from "@/lib/theme-context";
import { LanguageProvider } from "@/lib/language-context";
import { CartDrawerProvider } from "@/components/menu/CartDrawerContext";
import { CartDrawer } from "@/components/menu/CartDrawer";
import "./globals.css";

const amiri = Amiri({ subsets: ["arabic"], weight: ["400", "700"], variable: "--font-amiri" });
const tajawal = Tajawal({ subsets: ["arabic"], weight: ["300", "400", "500", "700"], variable: "--font-tajawal" });
const fraunces = Fraunces({ subsets: ["latin"], weight: ["400", "500", "600"], variable: "--font-fraunces" });
const inter = Inter({ subsets: ["latin"], weight: ["400", "500", "600"], variable: "--font-inter" });

// Update once a custom domain is connected — this is the current Vercel deployment.
const siteUrl = "https://ayl-cafe-nine.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${brand.nameAr} | ${brand.nameEn}`,
    template: `%s | ${brand.nameAr}`,
  },
  description: brand.descriptionAr,
  alternates: { canonical: "/" },
  openGraph: {
    title: `${brand.nameAr} | ${brand.nameEn}`,
    description: brand.descriptionAr,
    type: "website",
    locale: "ar_IQ",
    siteName: brand.nameAr,
    images: ["/assets/hero/video-poster.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: `${brand.nameAr} | ${brand.nameEn}`,
    description: brand.descriptionAr,
    images: ["/assets/hero/video-poster.jpg"],
  },
  icons: {
    icon: "/favicon.ico",
  },
};

// LocalBusiness structured data — only confirmed real details (no invented price range, menu
// data duplication, or review ratings).
const structuredData = {
  "@context": "https://schema.org",
  "@type": "CafeOrCoffeeShop",
  name: brand.nameEn,
  alternateName: brand.nameAr,
  description: brand.descriptionEn,
  url: siteUrl,
  image: `${siteUrl}/assets/hero/video-poster.jpg`,
  telephone: "+9647811122849",
  address: {
    "@type": "PostalAddress",
    streetAddress: location.addressEn,
    addressLocality: location.cityEn,
    addressCountry: "IQ",
  },
  // Hours are confirmed as "7:00 am – 2:00 am" daily (from @aylcafe.iq's bio) — converted to the
  // 24h format schema.org requires; not re-parsed from the display strings in settings.ts.
  openingHoursSpecification:
    location.hours.length > 0
      ? [
          {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: [
              "Monday",
              "Tuesday",
              "Wednesday",
              "Thursday",
              "Friday",
              "Saturday",
              "Sunday",
            ],
            opens: "07:00",
            closes: "02:00",
          },
        ]
      : undefined,
  sameAs: [socialLinks.instagram, socialLinks.website].filter(Boolean),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl" className={`${amiri.variable} ${tajawal.variable} ${fraunces.variable} ${inter.variable}`}>
      <body className="min-h-screen bg-background text-text antialiased">
        {/* Static, server-controlled structured data only — no user input is ever interpolated here. */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <ThemeProvider>
          <LanguageProvider>
            <CartDrawerProvider>
              <CartProvider>
                {children}
                <CartDrawer />
              </CartProvider>
            </CartDrawerProvider>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
