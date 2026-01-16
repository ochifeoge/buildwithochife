import Hero from "@/components/web/Hero";
import Services from "./Services";
import { WhoIWorkWith } from "./WhoIWorkWith";
import { Process } from "./Process";
import { FinalCTA } from "./FinalCTA";
import ProjectSection from "./projectSection";
import BlogSection from "./Blogsection";

export default function Home() {
  return (
    <>
      <Hero />

      <Services />
      <WhoIWorkWith />

      {/* Projects section (keeps same position) */}
      <ProjectSection />

      {/* Blog preview section: show up to 3 latest posts */}
      <BlogSection />
      <Process />
      <FinalCTA />
    </>
  );
}
