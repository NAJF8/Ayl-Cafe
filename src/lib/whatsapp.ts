import { brand } from "@/data/brand";
import { formatPrice } from "@/lib/format";
import type { CartLine } from "@/lib/cart-context";
import { products } from "@/data/products";

function unitPriceFor(productPrice: number, optionGroups: typeof products[number]["optionGroups"], selections: CartLine["selections"]) {
  let price = productPrice;
  for (const group of optionGroups ?? []) {
    const option = group.options.find((o) => o.id === selections[group.id]);
    if (option?.priceDelta) price += option.priceDelta;
  }
  return price;
}

export function buildWhatsAppOrderUrl(phone: string, lines: CartLine[]) {
  const rows: string[] = [`طلب جديد من ${brand.nameAr} / New order from ${brand.nameEn}`, ""];
  let total = 0;

  for (const line of lines) {
    const product = products.find((p) => p.id === line.productId);
    if (!product) continue;
    const unitPrice = unitPriceFor(product.price, product.optionGroups, line.selections);
    const lineTotal = unitPrice * line.quantity;
    total += lineTotal;

    const optionText = (product.optionGroups ?? [])
      .map((group) => {
        const option = group.options.find((o) => o.id === line.selections[group.id]);
        return option ? `${group.labelAr}: ${option.nameAr}` : null;
      })
      .filter(Boolean)
      .join("، ");

    rows.push(
      `• ${product.nameAr} x${line.quantity}${optionText ? ` (${optionText})` : ""} — ${formatPrice(lineTotal, "ar")}`
    );
    if (line.note) rows.push(`  ملاحظة: ${line.note}`);
  }

  rows.push("", `الإجمالي: ${formatPrice(total, "ar")}`);

  const message = rows.join("\n");
  const sanitizedPhone = phone.replace(/[^0-9]/g, "");
  return `https://wa.me/${sanitizedPhone}?text=${encodeURIComponent(message)}`;
}
