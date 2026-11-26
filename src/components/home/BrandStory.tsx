"use client";

import { motion } from "framer-motion";
import { brand } from "@/data/brand";
import { useLanguage } from "@/lib/language-context";

const beats = [
  { labelAr: "أيل", labelEn: "Ayl" },
  { labelAr: "قهوة", labelEn: "Coffee" },
  { labelAr: "أجواء", labelEn: "Atmosphere" },
  { labelAr: "تجربة", labelEn: "Experience" },
];

export function BrandStory() {
  const { pick } = useLanguage();

  return (
    <section id="about" className="mx-auto max-w-3xl px-5 py-24 text-center">
      <motion.p
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="text-lg leading-relaxed text-text-muted"
      >
        {pick(brand.descriptionAr, brand.descriptionEn)}
      </motion.p>

      <div className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
        {beats.map((beat, i) => (
          <motion.span
            key={beat.labelEn}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            className="font-display text-sm uppercase tracking-[0.25em] text-primary"
          >
            {pick(beat.labelAr, beat.labelEn)}
          </motion.span>
        ))}
      </div>
    </section>
  );
}
