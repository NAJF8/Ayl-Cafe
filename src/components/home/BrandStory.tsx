"use client";

import Image from "next/image";
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
    <section id="about" className="mx-auto max-w-5xl px-5 py-24">
      <div className="grid items-center gap-10 md:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, scale: 1.03 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="relative aspect-[4/5] overflow-hidden rounded-2xl"
        >
          {/* Real Ayl Cafe interior moment, from @aylcafe.iq */}
          <Image
            src="/assets/brand/interior.jpg"
            alt={pick("أجواء أيل كافيه", "Inside Ayl Cafe")}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
          />
        </motion.div>

        <div className="text-center md:text-start">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="text-lg leading-relaxed text-text-muted"
          >
            {pick(brand.descriptionAr, brand.descriptionEn)}
          </motion.p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 md:justify-start">
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
        </div>
      </div>
    </section>
  );
}
