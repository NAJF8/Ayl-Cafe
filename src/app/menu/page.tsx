import type { Metadata } from "next";
import { MenuExperience } from "@/components/menu/MenuExperience";

export const metadata: Metadata = {
  title: "المنيو",
  description: "منيو أيل كافيه الكامل — قهوة، مشروبات ساخنة وبارده، وحلويات.",
};

export default function MenuPage() {
  return <MenuExperience />;
}
