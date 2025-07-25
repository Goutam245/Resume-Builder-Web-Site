import { Suspense, lazy } from "react";
import HeroSection from "@/components/home/HeroSection";
import FeaturesSection from "@/components/home/FeaturesSection";
import LoadingState from "@/components/ui/loading-state";

// Lazy load less critical components for better performance
const TestimonialsSection = lazy(() => import("@/components/home/TestimonialsSection"));
const CallToActionSection = lazy(() => import("@/components/home/CallToActionSection"));

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <HeroSection />
      <FeaturesSection />
      
      <Suspense fallback={<LoadingState variant="card" count={3} className="container mx-auto px-4 py-16" />}>
        <TestimonialsSection />
      </Suspense>
      
      <Suspense fallback={<LoadingState variant="text" count={2} className="container mx-auto px-4 py-8" />}>
        <CallToActionSection />
      </Suspense>
    </div>
  );
};


export default Index;
