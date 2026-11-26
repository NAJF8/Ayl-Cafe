"use client";

import { location } from "@/data/settings";
import { useLanguage } from "@/lib/language-context";

export function LocationSection() {
  const { pick } = useLanguage();

  return (
    <section id="location" className="border-t border-border bg-surface px-5 py-20">
      <div className="mx-auto max-w-3xl text-center">
        <p className="text-xs uppercase tracking-[0.3em] text-text-muted">
          {pick("الموقع", "Location")}
        </p>
        <h2 className="font-display mt-3 text-3xl text-text md:text-4xl">
          {pick(location.cityAr, location.cityEn)}
        </h2>

        {location.addressAr ? (
          <p className="mt-4 text-text-muted">{pick(location.addressAr, location.addressEn)}</p>
        ) : (
          <p className="mt-4 text-text-muted/70">{pick("تفاصيل العنوان قريبًا", "Address coming soon")}</p>
        )}

        {location.hours.length > 0 && (
          <ul className="mt-4 flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-sm text-text-muted">
            {location.hours.map((slot) => (
              <li key={slot.dayAr}>
                {pick(slot.dayAr, slot.dayEn)}: {slot.open} – {slot.close}
              </li>
            ))}
          </ul>
        )}

        {location.mapsUrl && (
          <a
            href={location.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center gap-2 rounded-full border border-primary px-6 py-2.5 text-sm text-primary transition-colors hover:bg-primary hover:text-cream"
          >
            {pick("فتح في خرائط Google", "Open in Google Maps")}
          </a>
        )}
      </div>
    </section>
  );
}
