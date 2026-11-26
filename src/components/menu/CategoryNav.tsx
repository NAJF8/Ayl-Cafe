"use client";

import clsx from "clsx";
import { categories } from "@/data/categories";
import { useLanguage } from "@/lib/language-context";

type CategoryNavProps = {
  active: string;
  onChange: (id: string) => void;
};

export function CategoryNav({ active, onChange }: CategoryNavProps) {
  const { pick } = useLanguage();

  return (
    <div className="sticky top-[65px] z-30 -mx-5 border-b border-border bg-background/95 px-5 py-3 backdrop-blur-md">
      <div className="scrollbar-none flex gap-2 overflow-x-auto">
        {categories.map((category) => (
          <button
            key={category.id}
            type="button"
            onClick={() => onChange(category.id)}
            className={clsx(
              "shrink-0 rounded-full border px-4 py-2 text-sm transition-colors",
              active === category.id
                ? "border-primary bg-primary text-cream"
                : "border-border text-text-muted hover:text-text"
            )}
          >
            {pick(category.nameAr, category.nameEn)}
          </button>
        ))}
      </div>
    </div>
  );
}
