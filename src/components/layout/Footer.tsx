"use client";

import { brand } from "@/data/brand";
import { socialLinks, location } from "@/data/settings";
import { useLanguage } from "@/lib/language-context";

export function Footer() {
  const year = new Date().getFullYear();
  const { pick } = useLanguage();

  return (
    <footer className="border-t border-border bg-surface">
      <div className="mx-auto max-w-6xl px-5 py-10">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <p className="font-display text-lg text-primary">{brand.shortNameAr}</p>
            <p className="mt-2 max-w-xs text-sm text-text-muted">
              {pick(brand.descriptionAr, brand.descriptionEn)}
            </p>
          </div>

          <div className="text-sm text-text-muted">
            <p className="mb-2 font-medium text-text">{pick("التواصل", "Contact")}</p>
            {socialLinks.instagram ? (
              <a
                href={socialLinks.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="block transition-colors hover:text-text"
              >
                {pick("إنستغرام", "Instagram")}
              </a>
            ) : (
              <p className="text-text-muted/70">{pick("قريبًا", "Coming soon")}</p>
            )}
            {location.hours.length > 0 && (
              <p className="mt-2">
                {pick(location.hours[0].dayAr, location.hours[0].dayEn)}: {location.hours[0].open} –{" "}
                {location.hours[0].close}
              </p>
            )}
          </div>

          <div className="text-sm text-text-muted">
            <p className="mb-2 font-medium text-text">{pick("الموقع", "Location")}</p>
            <p>{pick(location.cityAr, location.cityEn)}</p>
            {location.mapsUrl && (
              <a
                href={location.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-1 block transition-colors hover:text-text"
              >
                {pick("فتح في خرائط Google", "Open in Google Maps")}
              </a>
            )}
          </div>
        </div>

        <p className="mt-10 text-xs text-text-muted/70">
          © {year} {brand.nameAr} — {brand.nameEn}
        </p>
      </div>
    </footer>
  );
}
