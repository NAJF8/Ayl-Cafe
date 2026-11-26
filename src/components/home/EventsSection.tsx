"use client";

import { motion } from "framer-motion";
import { events } from "@/data/events";
import { useLanguage } from "@/lib/language-context";

export function EventsSection() {
  const { pick } = useLanguage();

  if (events.length === 0) return null;

  return (
    <section className="border-t border-border px-5 py-20">
      <div className="mx-auto max-w-5xl">
        <div className="text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-text-muted">
            {pick("فعاليات", "Events")}
          </p>
          <h2 className="font-display mt-2 text-3xl text-text md:text-4xl">
            {pick("فعاليات وأنشطة أيل", "Ayl Events")}
          </h2>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2">
          {events.map((event, i) => {
            const title = pick(event.titleAr, event.titleEn);
            const description = pick(event.descriptionAr, event.descriptionEn);
            const badge = pick(event.badgeAr, event.badgeEn);
            const ctaLabel = pick(event.ctaLabelAr, event.ctaLabelEn);

            return (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
                className="rounded-xl border border-border bg-surface p-6"
              >
                {badge && (
                  <span className="mb-3 inline-block rounded-full bg-primary px-3 py-1 text-xs text-cream">
                    {badge}
                  </span>
                )}
                <h3 className="font-display text-lg text-text">{title}</h3>
                {description && <p className="mt-2 text-sm text-text-muted">{description}</p>}
                {event.ctaHref && ctaLabel && (
                  <a
                    href={event.ctaHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
                  >
                    {ctaLabel}
                  </a>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
