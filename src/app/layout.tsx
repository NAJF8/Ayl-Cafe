import type { Metadata } from "next";
import { Amiri, Tajawal, Fraunces, Inter } from "next/font/google";
import { brand } from "@/data/brand";
import { CartProvider } from "@/lib/cart-context";
import { CartDrawerProvider } from "@/components/menu/CartDrawerContext";
import { CartDrawer } from "@/components/menu/CartDrawer";
import "./globals.css";

const amiri = Amiri({ subsets: ["arabic"], weight: ["400", "700"], variable: "--font-amiri" });
const tajawal = Tajawal({ subsets: ["arabic"], weight: ["300", "400", "500", "700"], variable: "--font-tajawal" });
const fraunces = Fraunces({ subsets: ["latin"], weight: ["400", "500", "600"], variable: "--font-fraunces" });
const inter = Inter({ subsets: ["latin"], weight: ["400", "500", "600"], variable: "--font-inter" });

const siteUrl = "https://ayl-cafe.example";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${brand.nameAr} | ${brand.nameEn}`,
    template: `%s | ${brand.nameAr}`,
  },
  description: brand.descriptionAr,
  openGraph: {
    title: `${brand.nameAr} | ${brand.nameEn}`,
    description: brand.descriptionAr,
    type: "website",
    locale: "ar_IQ",
    siteName: brand.nameAr,
  },
  twitter: {
    card: "summary_large_image",
    title: `${brand.nameAr} | ${brand.nameEn}`,
    description: brand.descriptionAr,
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl" className={`${amiri.variable} ${tajawal.variable} ${fraunces.variable} ${inter.variable}`}>
      <body className="min-h-screen bg-background text-text antialiased">
        <CartDrawerProvider>
          <CartProvider>
            {children}
            <CartDrawer />
          </CartProvider>
        </CartDrawerProvider>
      </body>
    </html>
  );
}
