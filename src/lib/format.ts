export function formatPrice(amount: number, locale: "ar" | "en" = "ar") {
  const formatted = new Intl.NumberFormat(locale === "ar" ? "ar-IQ" : "en-IQ").format(amount);
  return locale === "ar" ? `${formatted} د.ع` : `IQD ${formatted}`;
}
