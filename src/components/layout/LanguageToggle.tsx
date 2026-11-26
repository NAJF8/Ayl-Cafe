"use client";

import clsx from "clsx";
import { useLanguage } from "@/lib/language-context";

export function LanguageToggle({ className }: { className?: string }) {
  const { lang, toggle } = useLanguage();

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={lang === "ar" ? "Switch to English" : "التحويل إلى العربية"}
      className={clsx(
        "flex h-10 items-center justify-center rounded-full border border-border px-3 text-xs font-medium uppercase tracking-wide text-text transition-colors hover:border-primary",
        className
      )}
    >
      {lang === "ar" ? "EN" : "عربي"}
    </button>
  );
}
