export type FeedbackRatings = {
  ambiance: number;
  service: number;
  quality: number;
};

export type FeedbackPayload = {
  productId?: string;
  productLabel?: string;
  ratings: FeedbackRatings;
  note: string;
  phone: string;
  visitDate: string;
};

const RATING_LABELS_AR = ["ضعيف", "مقبول", "جيد", "جيد جدًا", "ممتاز"];

export function averageRating(ratings: FeedbackRatings) {
  return (ratings.ambiance + ratings.service + ratings.quality) / 3;
}

export function buildFeedbackWhatsAppUrl(phone: string, payload: FeedbackPayload) {
  const avg = averageRating(payload.ratings);
  const lines = [
    "تقييم تجربة في أيل كافيه",
    "",
    payload.productLabel ? `الطلب: ${payload.productLabel}` : null,
    `الأجواء العامة للمكان: ${RATING_LABELS_AR[payload.ratings.ambiance - 1]} (${payload.ratings.ambiance}/5)`,
    `أداء فريق العمل: ${RATING_LABELS_AR[payload.ratings.service - 1]} (${payload.ratings.service}/5)`,
    `جودة المنتجات: ${RATING_LABELS_AR[payload.ratings.quality - 1]} (${payload.ratings.quality}/5)`,
    `التقييم العام: ⭐ ${avg.toFixed(1)}/5`,
    payload.note.trim() ? `\nملاحظات: ${payload.note.trim().slice(0, 300)}` : null,
    payload.phone.trim() ? `رقم الهاتف: ${payload.phone.trim().slice(0, 30)}` : null,
    payload.visitDate ? `تاريخ الزيارة: ${payload.visitDate}` : null,
  ].filter((l): l is string => l !== null);

  const sanitizedPhone = phone.replace(/[^0-9]/g, "");
  return `https://wa.me/${sanitizedPhone}?text=${encodeURIComponent(lines.join("\n"))}`;
}
