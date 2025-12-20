import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/home/HeroSection";
import SafetyBanner from "@/components/home/SafetyBanner";
import FeaturedSaathis from "@/components/home/FeaturedSaathis";
import HowItWorksPreview from "@/components/home/HowItWorksPreview";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import CTASection from "@/components/home/CTASection";
import { Helmet } from "react-helmet-async";

const Index = () => {
  return (
    <>
      <Helmet>
        <title>SaathiCircle - Find Trusted Companions for Chai, Walks & Conversations</title>
        <meta 
          name="description" 
          content="Connect with verified companions in India for meaningful conversations, evening walks, or a cup of chai. Strictly platonic, always safe. Join 5,000+ Saathis across 50+ cities." 
        />
        <meta name="keywords" content="platonic companionship, chai companion, walking partner, India, loneliness, friendship, conversation partner" />
      </Helmet>
      
      <div className="min-h-screen flex flex-col">
        <Navbar />
        
        <main className="flex-1 pt-16">
          <HeroSection />
          <SafetyBanner />
          <FeaturedSaathis />
          <HowItWorksPreview />
          <TestimonialsSection />
          <CTASection />
        </main>

        <Footer />
      </div>
    </>
  );
};

export default Index;
