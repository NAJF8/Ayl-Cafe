// A lightweight, fully client-side FAQ assistant grounded only in this project's real data
// (src/data/*). It does not call any external AI API — no key is available or stored in the
// client, which this project's security rules forbid — so it answers via keyword/intent
// matching instead of a language model. It understands Iraqi/colloquial Arabic, Modern
// Standard Arabic, and English keywords for the common things a cafe guest asks.

import { brand } from "@/data/brand";
import { categories } from "@/data/categories";
import { products } from "@/data/products";
import { events } from "@/data/events";
import { location, socialLinks } from "@/data/settings";
import { formatPrice } from "@/lib/format";
import type { Lang } from "@/lib/language-context";

type Reply = { text: string; quickReplies?: string[] };

function pickRandom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function normalize(s: string) {
  return s
    .toLowerCase()
    .replace(/[أإآ]/g, "ا")
    .replace(/ى/g, "ي")
    .replace(/ة/g, "ه")
    .replace(/[^\p{L}\p{N}\s]/gu, "")
    .trim();
}

const GREETING_WORDS = ["مرحبا", "هلا", "هلو", "السلام", "صباح", "مساء", "هاي", "hi", "hello", "hey", "سلام"];
const HOURS_WORDS = ["ساعات", "دوام", "وكت", "وقت", "متى تفتح", "متى تفتحون", "سكر", "يفتح", "يسكر", "hours", "open", "close", "time"];
const LOCATION_WORDS = ["عنوان", "موقع", "وين", "فين", "مكان", "خارطه", "خريطه", "location", "address", "where", "map"];
const CONTACT_WORDS = ["واتس", "واتساب", "رقم", "تلفون", "موبايل", "اتصال", "whatsapp", "phone", "contact", "number"];
const INSTAGRAM_WORDS = ["انستغرام", "انستا", "ستوري", "instagram", "insta"];
const MENU_WORDS = ["منيو", "قائمه", "اقسام", "تصنيف", "شنو عدكم", "شنو موجود", "menu", "categories"];
const EVENTS_WORDS = ["فعاليه", "فعاليات", "نشاط", "انشطه", "مناسبه", "event", "events", "activity"];
const PRICE_WORDS = ["سعر", "كم", "بيكم", "اسعار", "تكلفه", "price", "cost", "how much"];
const THANKS_WORDS = ["شكرا", "تسلم", "مشكور", "thanks", "thank you"];

function matchesAny(normalized: string, words: string[]) {
  return words.some((w) => normalized.includes(normalize(w)));
}

function findProductMatch(normalized: string) {
  return products.find((p) => {
    const nameAr = normalize(p.nameAr);
    const nameEn = normalize(p.nameEn);
    return (
      (nameAr.length > 1 && normalized.includes(nameAr)) || (nameEn.length > 1 && normalized.includes(nameEn.toLowerCase()))
    );
  });
}

export function answerQuestion(rawMessage: string, lang: Lang): Reply {
  const normalized = normalize(rawMessage);
  const isAr = lang === "ar";

  if (!normalized) {
    return { text: isAr ? "تفضل، شلون أقدر أساعدك؟" : "Go ahead — how can I help?" };
  }

  if (matchesAny(normalized, THANKS_WORDS)) {
    return { text: pickRandom(isAr ? ["العفو! بالخدمة دايمًا 🦌", "تدلل، نورتنا"] : ["You're welcome!", "Anytime — enjoy!"]) };
  }

  if (matchesAny(normalized, GREETING_WORDS)) {
    return {
      text: pickRandom(
        isAr
          ? [`هلا بيك بـ${brand.nameAr}! تكدر تسألني عن المنيو، الأسعار، الموقع، أو ساعات الدوام.`, "أهلين! شلون أقدر أساعدك اليوم؟"]
          : [`Welcome to ${brand.nameEn}! Ask me about the menu, prices, location, or hours.`, "Hey there! How can I help?"]
      ),
      quickReplies: isAr ? ["المنيو", "ساعات الدوام", "الموقع", "واتساب"] : ["Menu", "Hours", "Location", "WhatsApp"],
    };
  }

  const productMatch = findProductMatch(normalized);
  if (productMatch) {
    const category = categories.find((c) => c.id === productMatch.categoryId);
    const name = isAr ? productMatch.nameAr : productMatch.nameEn;
    const catName = category ? (isAr ? category.nameAr : category.nameEn) : "";
    return {
      text: isAr
        ? `${name} موجود بقسم "${catName}" وسعره ${formatPrice(productMatch.price, "ar")}. تكدر تضيفه مباشرة من صفحة المنيو.`
        : `${name} is in the "${catName}" section, priced at ${formatPrice(productMatch.price, "en")}. You can add it directly from the menu page.`,
      quickReplies: isAr ? ["افتح المنيو"] : ["Open menu"],
    };
  }

  if (matchesAny(normalized, PRICE_WORDS)) {
    const cheapest = [...products].sort((a, b) => a.price - b.price)[0];
    const priciest = [...products].sort((a, b) => b.price - a.price)[0];
    return {
      text: isAr
        ? `الأسعار تتراوح من ${formatPrice(cheapest.price, "ar")} (${cheapest.nameAr}) إلى ${formatPrice(priciest.price, "ar")} (${priciest.nameAr}). اسألني عن منتج محدد وأعطيك سعره بالضبط.`
        : `Prices range from ${formatPrice(cheapest.price, "en")} (${cheapest.nameEn}) to ${formatPrice(priciest.price, "en")} (${priciest.nameEn}). Ask about a specific item for its exact price.`,
    };
  }

  if (matchesAny(normalized, HOURS_WORDS)) {
    const slot = location.hours[0];
    return {
      text: slot
        ? isAr
          ? `دوامنا ${slot.dayAr} من ${slot.open} إلى ${slot.close}.`
          : `We're open ${slot.dayEn} from ${slot.open} to ${slot.close}.`
        : isAr
          ? "ساعات الدوام راح تتحدث قريبًا، تابعنا على إنستغرام بالتفاصيل."
          : "Hours will be posted soon — check our Instagram for updates.",
    };
  }

  if (matchesAny(normalized, LOCATION_WORDS)) {
    return {
      text: isAr
        ? `نحنه بـ${location.addressAr}.${location.mapsUrl ? " تكدر تفتح الموقع على كوكل ماب من رابط صفحة الموقع." : ""}`
        : `We're at ${location.addressEn}.${location.mapsUrl ? " You can open it on Google Maps from the location section." : ""}`,
    };
  }

  if (matchesAny(normalized, CONTACT_WORDS)) {
    return {
      text: isAr
        ? `تكدر تتواصل وياني عبر واتساب مباشرة من زر "إرسال الطلب" بالسلة، أو من رابط واتساب بالفوتر.`
        : `You can reach us directly on WhatsApp via the order button in the cart, or the WhatsApp link in the footer.`,
    };
  }

  if (matchesAny(normalized, INSTAGRAM_WORDS)) {
    return {
      text: isAr ? `حسابنا على إنستغرام: ${socialLinks.instagram}` : `Our Instagram: ${socialLinks.instagram}`,
    };
  }

  if (matchesAny(normalized, EVENTS_WORDS)) {
    return {
      text:
        events.length > 0
          ? isAr
            ? "عدنا فعاليات حاليًا، شوفهم بقسم الفعاليات بالصفحة الرئيسية."
            : "We have current events — check the Events section on the homepage."
          : isAr
            ? "ما عدنا فعاليات معلنة حاليًا، تابعنا على إنستغرام أول بأول."
            : "No events are announced right now — follow our Instagram for updates.",
    };
  }

  if (matchesAny(normalized, MENU_WORDS)) {
    const list = categories.map((c) => (isAr ? c.nameAr : c.nameEn)).join("، ");
    return {
      text: isAr ? `أقسام المنيو عدنا: ${list}.` : `Our menu sections: ${list}.`,
      quickReplies: isAr ? ["افتح المنيو"] : ["Open menu"],
    };
  }

  return {
    text: isAr
      ? "ما فهمت قصدك بالضبط 🙏 تكدر تسألني عن المنيو، سعر منتج معين، ساعات الدوام، الموقع، أو طريقة التواصل."
      : "I didn't quite catch that 🙏 Ask me about the menu, a specific item's price, hours, location, or how to reach us.",
  };
}
