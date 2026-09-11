import React from "react";
import Hero from "../components/Hero";
import QuickActionGrid from "../components/QuickActionGrid";
import ServicesShowcase from "../components/ServicesShowcase";
import TransformationShowcase from "../components/TransformationShowcase";
import PriceTableSection from "../components/PriceTableSection";
import PlansSection from "../components/PlansSection";
import ReviewsSection from "../components/ReviewsSection";
import LocationSection from "../components/LocationSection";
import FinalCtaSection from "../components/FinalCtaSection";

export default function HomeView() {
  return (
    <div className="w-full">
      <Hero />
      <QuickActionGrid />
      <ServicesShowcase />
      <TransformationShowcase />
      <PriceTableSection />
      <PlansSection />
      <ReviewsSection />
      <LocationSection />
      <FinalCtaSection />
    </div>
  );
}
