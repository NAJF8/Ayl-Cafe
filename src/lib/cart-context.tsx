"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { products, type Product } from "@/data/products";

export type CartLineSelection = Record<string, string>; // optionGroupId -> optionId

export type CartLine = {
  lineId: string;
  productId: string;
  quantity: number;
  selections: CartLineSelection;
  note?: string;
};

type CartContextValue = {
  lines: CartLine[];
  addLine: (productId: string, selections: CartLineSelection, quantity: number, note?: string) => void;
  removeLine: (lineId: string) => void;
  setQuantity: (lineId: string, quantity: number) => void;
  clear: () => void;
  count: number;
  total: number;
  lineDetails: (line: CartLine) => { product: Product; unitPrice: number } | null;
};

const CartContext = createContext<CartContextValue | null>(null);
const STORAGE_KEY = "ayl-cafe-cart";

function unitPriceFor(product: Product, selections: CartLineSelection) {
  let price = product.price;
  for (const group of product.optionGroups ?? []) {
    const chosenId = selections[group.id];
    const option = group.options.find((o) => o.id === chosenId);
    if (option?.priceDelta) price += option.priceDelta;
  }
  return price;
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time hydration from localStorage, unavailable during SSR
      if (raw) setLines(JSON.parse(raw));
    } catch {
      // ignore corrupted storage
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
    } catch {
      // storage unavailable (private mode, quota) — cart still works in-memory
    }
  }, [lines, hydrated]);

  const addLine = useCallback<CartContextValue["addLine"]>((productId, selections, quantity, note) => {
    setLines((prev) => [
      ...prev,
      {
        lineId: `${productId}-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
        productId,
        quantity: Math.max(1, quantity),
        selections,
        note: note?.slice(0, 200),
      },
    ]);
  }, []);

  const removeLine = useCallback((lineId: string) => {
    setLines((prev) => prev.filter((l) => l.lineId !== lineId));
  }, []);

  const setQuantity = useCallback((lineId: string, quantity: number) => {
    setLines((prev) =>
      prev.map((l) => (l.lineId === lineId ? { ...l, quantity: Math.max(1, quantity) } : l))
    );
  }, []);

  const clear = useCallback(() => setLines([]), []);

  const lineDetails = useCallback((line: CartLine) => {
    const product = products.find((p) => p.id === line.productId);
    if (!product) return null;
    return { product, unitPrice: unitPriceFor(product, line.selections) };
  }, []);

  const { count, total } = useMemo(() => {
    let count = 0;
    let total = 0;
    for (const line of lines) {
      const details = lineDetails(line);
      if (!details) continue;
      count += line.quantity;
      total += details.unitPrice * line.quantity;
    }
    return { count, total };
  }, [lines, lineDetails]);

  const value: CartContextValue = {
    lines,
    addLine,
    removeLine,
    setQuantity,
    clear,
    count,
    total,
    lineDetails,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
