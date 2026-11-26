import { NavBar } from "@/components/layout/NavBar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/home/Hero";
import { BrandStory } from "@/components/home/BrandStory";
import { EventsSection } from "@/components/home/EventsSection";
import { LocationSection } from "@/components/home/LocationSection";
import { OpeningExperience } from "@/components/opening/OpeningExperience";
import { ChatWidget } from "@/components/chat/ChatWidget";

export default function HomePage() {
  return (
    <>
      <OpeningExperience />
      <NavBar />
      <main>
        <Hero />
        <BrandStory />
        <EventsSection />
        <LocationSection />
      </main>
      <Footer />
      <ChatWidget />
    </>
  );
}
