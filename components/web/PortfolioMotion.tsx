"use client";
import { useEffect } from "react";
import { gsap } from "gsap";
// Content is visible before JavaScript; motion never gates access to work or CTAs.
export default function PortfolioMotion() {
  useEffect(() => {
    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.from("[data-hero-reveal]", {
        y: 20,
        opacity: 0,
        duration: 0.65,
        stagger: 0.09,
        ease: "power2.out",
        clearProps: "all",
      });
      const observer = new IntersectionObserver(
        (entries) =>
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              gsap.fromTo(
                entry.target,
                { y: 22 },
                {
                  y: 0,
                  duration: 0.65,
                  ease: "power2.out",
                  clearProps: "transform",
                },
              );
              observer.unobserve(entry.target);
            }
          }),
        { threshold: 0.12 },
      );
      document
        .querySelectorAll("[data-reveal]")
        .forEach((el) => observer.observe(el));
      return () => {
        observer.disconnect();
        gsap.killTweensOf("[data-reveal]");
      };
    });
    return () => media.revert();
  }, []);
  return null;
}
