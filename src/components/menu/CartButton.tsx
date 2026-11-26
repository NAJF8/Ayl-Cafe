"use client";

import { useCart } from "@/lib/cart-context";
import { useCartDrawer } from "@/components/menu/CartDrawerContext";
import { useLanguage } from "@/lib/language-context";

export function CartButton() {
  const { count } = useCart();
  const { open } = useCartDrawer();
  const { pick } = useLanguage();

  return (
    <button
      type="button"
      onClick={open}
      aria-label={pick("فتح الطلب", "Open cart")}
      className="relative flex h-10 w-10 items-center justify-center rounded-full border border-border text-text transition-colors hover:border-primary"
    >
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
        <path
          d="M2 2H3.5L5 11.5H14L15.5 5H4.5"
          stroke="currentColor"
          strokeWidth="1.3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="6" cy="15" r="1.1" fill="currentColor" />
        <circle cx="13" cy="15" r="1.1" fill="currentColor" />
      </svg>
      {count > 0 && (
        <span className="absolute -end-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1 text-[11px] font-medium text-cream">
          {count}
        </span>
      )}
    </button>
  );
}
