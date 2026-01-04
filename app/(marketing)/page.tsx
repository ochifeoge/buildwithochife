import Hero from "@/components/web/Hero";
import Services from "./Services";
import { WhoIWorkWith } from "./WhoIWorkWith";
import { Process } from "./Process";
import { FinalCTA } from "./FinalCTA";
import ProjectSection from "./projectSection";

export default async function Home() {
  return (
    <>
      <Hero />
      <Services />
      <WhoIWorkWith />
      <ProjectSection />
      <Process />
      <FinalCTA />
    </>
  );
}
