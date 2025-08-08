import { About } from "@/components/blocks/sections/About";
import { Blog } from "@/components/blocks/sections/Blog";
import { Contact } from "@/components/blocks/sections/ContactForm";
import { Footer } from "@/components/blocks/sections/Footer";
import { HeroSection } from "@/components/blocks/sections/HeroSection";
import HireMe from "@/components/blocks/sections/Hireme";
import { Navigation } from "@/components/blocks/sections/Navigation";
import { Projects } from "@/components/blocks/sections/Projects";
import { TechStack } from "@/components/blocks/sections/TechStack";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />
      <main>
        <HeroSection />
        <About />
        <Projects />
        <TechStack />
        <Blog />
        <Contact />
        <HireMe />
      </main>
      <Footer />
    </div>
  );
}
