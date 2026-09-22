import type { Metadata } from "next";
import Hero from "@/components/web/Hero";
import Services from "./Services";
import { Process } from "./Process";
import { FinalCTA } from "./FinalCTA";
import ProjectSection from "./projectSection";
import About from "@/components/web/About";
import PortfolioMotion from "@/components/web/PortfolioMotion";
export const metadata: Metadata = { alternates: { canonical: "/" } };
export default function Home() {
  return (
    <>
      <Hero />
      <ProjectSection />
      <Services />
      <Process />
      <About />
      <FinalCTA />
      <PortfolioMotion />
    </>
  );
}
