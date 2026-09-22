import type { Metadata } from "next";
import About from "@/components/web/About";
import { FinalCTA } from "../FinalCTA";
export const metadata: Metadata = {
  title: "About Ochife",
  description:
    "Meet Ogechukwu Ochife, an independent full-stack developer building business websites and web applications.",
  alternates: { canonical: "/about" },
};
export default function AboutPage() {
  return (
    <>
      <About standalone />
      <FinalCTA />
    </>
  );
}
