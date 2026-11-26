"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { DeerMotif } from "@/components/motion/DeerMotif";
import { brand } from "@/data/brand";

export function Hero() {
  return (
    <section className="relative flex min-h-[90vh] flex-col items-center justify-center overflow-hidden px-5 text-center">
      <motion.div
        className="absolute inset-0 -z-10 opacity-[0.07]"
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
      >
        <DeerMotif className="h-full w-full text-primary" animate={false} />
      </motion.div>

      <motion.p
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="text-xs uppercase tracking-[0.3em] text-text-muted"
      >
        {brand.shortNameEn}
      </motion.p>

      <motion.h1
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        className="font-display mt-4 text-5xl text-text md:text-7xl"
      >
        {brand.nameAr}
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        className="mt-4 max-w-md text-base text-text-muted"
      >
        {brand.taglineAr}
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
      >
        <Link
          href="/menu"
          className="mt-10 inline-flex items-center gap-2 rounded-full border border-primary px-8 py-3 text-sm uppercase tracking-widest text-primary transition-colors hover:bg-primary hover:text-background focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        >
          استكشف المنيو
        </Link>
      </motion.div>
    </section>
  );
}
