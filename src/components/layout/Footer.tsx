import { brand } from "@/data/brand";
import { socialLinks, location } from "@/data/settings";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-surface">
      <div className="mx-auto max-w-6xl px-5 py-10">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <p className="font-display text-lg text-primary">{brand.shortNameAr}</p>
            <p className="mt-2 max-w-xs text-sm text-text-muted">{brand.descriptionAr}</p>
          </div>

          <div className="text-sm text-text-muted">
            <p className="mb-2 font-medium text-text">التواصل</p>
            {socialLinks.instagram ? (
              <a
                href={socialLinks.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="block transition-colors hover:text-text"
              >
                إنستغرام
              </a>
            ) : (
              <p className="text-text-muted/70">قريبًا</p>
            )}
          </div>

          <div className="text-sm text-text-muted">
            <p className="mb-2 font-medium text-text">الموقع</p>
            <p>{location.cityAr}</p>
            {location.mapsUrl && (
              <a
                href={location.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-1 block transition-colors hover:text-text"
              >
                فتح في خرائط Google
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
