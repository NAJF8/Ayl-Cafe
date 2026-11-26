import { location } from "@/data/settings";

export function LocationSection() {
  return (
    <section id="location" className="border-t border-border bg-surface px-5 py-20">
      <div className="mx-auto max-w-3xl text-center">
        <p className="text-xs uppercase tracking-[0.3em] text-text-muted">Location</p>
        <h2 className="font-display mt-3 text-3xl text-text md:text-4xl">{location.cityAr}</h2>

        {location.addressAr ? (
          <p className="mt-4 text-text-muted">{location.addressAr}</p>
        ) : (
          <p className="mt-4 text-text-muted/70">تفاصيل العنوان قريبًا</p>
        )}

        {location.mapsUrl && (
          <a
            href={location.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center gap-2 rounded-full border border-primary px-6 py-2.5 text-sm text-primary transition-colors hover:bg-primary hover:text-background"
          >
            فتح في خرائط Google
          </a>
        )}
      </div>
    </section>
  );
}
