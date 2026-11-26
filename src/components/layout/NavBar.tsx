"use client";

import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { brand } from "@/data/brand";
import { socialLinks } from "@/data/settings";
import { useLanguage } from "@/lib/language-context";
import { CartButton } from "@/components/menu/CartButton";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { LanguageToggle } from "@/components/layout/LanguageToggle";

export function NavBar() {
  const [open, setOpen] = useState(false);
  const { pick } = useLanguage();

  const links = [
    { href: "/", label: pick("الرئيسية", "Home") },
    { href: "/menu", label: pick("القائمة", "Menu") },
    ...(socialLinks.instagram
      ? [{ href: socialLinks.instagram, label: pick("اتصل بنا", "Contact"), external: true }]
      : []),
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
        <Link href="/" className="font-display text-xl tracking-wide text-primary">
          {brand.shortNameAr}
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {links.map((link) =>
            link.external ? (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-text-muted transition-colors hover:text-text"
              >
                {link.label}
              </a>
            ) : (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-text-muted transition-colors hover:text-text"
              >
                {link.label}
              </Link>
            )
          )}
        </nav>

        <div className="flex items-center gap-2">
          <LanguageToggle className="hidden sm:flex" />
          <ThemeToggle className="hidden sm:flex" />
          <CartButton />
          <button
            type="button"
            aria-label={pick("فتح القائمة", "Open menu")}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-text md:hidden"
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
              <path d="M1 4H17M1 9H17M1 14H17" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
            </svg>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-t border-border md:hidden"
          >
            <div className="flex flex-col gap-1 px-5 py-4">
              {links.map((link) =>
                link.external ? (
                  <a
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setOpen(false)}
                    className="rounded-md px-2 py-3 text-base text-text transition-colors hover:bg-surface-raised"
                  >
                    {link.label}
                  </a>
                ) : (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="rounded-md px-2 py-3 text-base text-text transition-colors hover:bg-surface-raised"
                  >
                    {link.label}
                  </Link>
                )
              )}
              <div className="mt-2 flex items-center gap-2 px-2">
                <LanguageToggle />
                <ThemeToggle />
              </div>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
