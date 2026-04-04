import Hero from "@/components/sections/Hero";
import Manifesto from "@/components/sections/Manifesto";
import FeaturedProjects from "@/components/sections/FeaturedProjects";
import AboutTeaser from "@/components/sections/AboutTeaser";
import ServicesSection from "@/components/sections/ServicesSection";
import Testimonials from "@/components/sections/Testimonials";
import ContactCTA from "@/components/sections/ContactCTA";
import MarqueeBand from "@/components/ui/MarqueeBand";
import { getFeaturedProjects } from "@/lib/db";

export const dynamic = "force-dynamic";

export default async function Home() {
  const featured = await getFeaturedProjects();

  return (
    <>
      <Hero />
      <MarqueeBand dark />
      <Manifesto />
      <FeaturedProjects featured={featured} />
      <MarqueeBand dark={false} slow />
      <AboutTeaser />
      <ServicesSection />
      <Testimonials />
      <ContactCTA />
    </>
  );
}
