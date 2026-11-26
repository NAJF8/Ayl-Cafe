"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { DeerMotif } from "@/components/motion/DeerMotif";
import { brand } from "@/data/brand";
import { socialLinks, heroMedia } from "@/data/settings";
import { useLanguage } from "@/lib/language-context";

export function Hero() {
  const { pick } = useLanguage();
  const reduceMotion = useReducedMotion();
  const playVideo = Boolean(heroMedia.video) && !reduceMotion;

  return (
    <section className="relative flex min-h-[92vh] flex-col items-center justify-center overflow-hidden px-5 text-center">
      {/* Real Ayl Cafe footage (from @aylcafe.iq): storefront at night into a cinematic pour-over
          shot — the hero is intentionally always dark/cinematic here, independent of the site's
          light/dark toggle. Falls back to a still poster frame when motion is reduced. */}
      {playVideo ? (
        <video
          className="absolute inset-0 -z-20 h-full w-full object-cover"
          src={heroMedia.video}
          poster={heroMedia.poster}
          preload="auto"
          autoPlay
          muted
          loop
          playsInline
        />
      ) : (
        <Image
          src={heroMedia.poster ?? "/assets/hero/video-poster.jpg"}
          alt=""
          fill
          priority
          sizes="100vw"
          className="-z-20 object-cover"
        />
      )}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-ink/75 via-ink/25 to-ink/80" />

      <motion.div
        className="h-28 w-28 text-primary md:h-40 md:w-40"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
      >
        <DeerMotif animate={false} />
      </motion.div>

      <motion.p
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        className="mt-6 text-xs uppercase tracking-[0.3em] text-cream/60"
      >
        {brand.shortNameEn}
      </motion.p>

      <motion.h1
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        className="font-display mt-4 text-5xl text-cream md:text-7xl"
      >
        {pick(brand.nameAr, brand.nameEn)}
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="mt-4 max-w-md text-base text-cream/70"
      >
        {pick(brand.taglineAr, brand.taglineEn)}
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="mt-10 flex flex-wrap items-center justify-center gap-3"
      >
        <Link
          href="/menu"
          className="inline-flex items-center gap-2 rounded-full bg-primary px-8 py-3 text-sm uppercase tracking-widest text-cream transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        >
          {pick("استكشف المنيو", "Explore the Menu")}
        </Link>
        {socialLinks.instagram && (
          <a
            href={socialLinks.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-cream/50 px-8 py-3 text-sm uppercase tracking-widest text-cream transition-colors hover:border-cream hover:bg-cream/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            {pick("اتصل بنا", "Contact Us")}
          </a>
        )}
      </motion.div>
    </section>
  );
}
