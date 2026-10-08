import Hero from "@/components/Hero";
import Problem from "@/components/Problem";
import HowItWorks from "@/components/HowItWorks";
import Features from "@/components/Features";
import RestaurantSection from "@/components/RestaurantSection";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "opdine - The Restaurant Operating System | QR Ordering, Tables, Kitchen & Billing",
  description: "opdine is the complete restaurant operating system for modern dine-in. QR ordering, digital menu, table management, kitchen orders, payments and insights — all connected in one place.",
};

export default function Home() {
  return (
    <>
      <Hero />
      <Problem />
      <HowItWorks />
      <Features />
      <RestaurantSection />
      <CTA />
      <Footer />
    </>
  );
}
