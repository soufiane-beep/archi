import Hero from "@/components/sections/Hero";
import Manifesto from "@/components/sections/Manifesto";
import FeaturedProjects from "@/components/sections/FeaturedProjects";
import AboutTeaser from "@/components/sections/AboutTeaser";
import ServicesSection from "@/components/sections/ServicesSection";
import Testimonials from "@/components/sections/Testimonials";
import ContactCTA from "@/components/sections/ContactCTA";
import { getFeaturedProjects } from "@/lib/db";

export const dynamic = "force-dynamic";

export default async function Home() {
  const featured = await getFeaturedProjects();

  return (
    <>
      <Hero />
      <Manifesto />
      <FeaturedProjects featured={featured} />
      <AboutTeaser />
      <ServicesSection />
      <Testimonials />
      <ContactCTA />
    </>
  );
}
