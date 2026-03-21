"use client";

import dynamic from "next/dynamic";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HeroSection from "@/components/sections/HeroSection";
import AboutSection from "@/components/sections/AboutSection";
import SkillsSection from "@/components/sections/SkillsSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import ExperienceSection from "@/components/sections/ExperienceSection";
import ContactSection from "@/components/sections/ContactSection";
import ResumeSection from "@/components/sections/ResumeSection";
import ServicesSection from "@/components/sections/ServicesSection";
import CustomCursor from "@/components/CustomCursor";

// Dynamically import heavy client-side components
const StarfieldBackground = dynamic(
  () => import("@/components/StarfieldBackground"),
  { ssr: false }
);

import gsap from "gsap";
gsap.config({ force3D: true });
const LoadingScreen = dynamic(() => import("@/components/LoadingScreen"), {
  ssr: false,
});

export default function Home() {
  return (
    <>
      <CustomCursor />
      <LoadingScreen />
      <StarfieldBackground />
      <Navbar />

      <main className="relative z-10">
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ServicesSection />
        <ProjectsSection />
        <ExperienceSection />
        <ResumeSection />
        <ContactSection />
      </main>

      <Footer />
    </>
  );
}
