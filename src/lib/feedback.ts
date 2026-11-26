export function buildFeedbackWhatsAppUrl(phone: string, stars: number, note: string) {
  const starsText = "⭐".repeat(stars) + "☆".repeat(5 - stars);
  const lines = [`تقييم تجربة في أيل كافيه`, "", `التقييم: ${starsText} (${stars}/5)`];
  if (note.trim()) lines.push("", `ملاحظات: ${note.trim().slice(0, 300)}`);
  const sanitizedPhone = phone.replace(/[^0-9]/g, "");
  return `https://wa.me/${sanitizedPhone}?text=${encodeURIComponent(lines.join("\n"))}`;
}
