import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Users, ArrowRight } from "lucide-react";

const CTASection = () => {
  return (
    <section className="py-20 bg-gradient-hero relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-white/10 rounded-full blur-3xl" />

      <div className="container mx-auto relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm mb-6">
            <Users className="w-8 h-8 text-primary-foreground" />
          </div>

          <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
            Ready to Find Your Saathi?
          </h2>
          <p className="text-primary-foreground/80 text-lg mb-8 max-w-xl mx-auto">
            Join thousands of Indians finding meaningful platonic connections 
            for chai, walks, and heartfelt conversations.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button variant="hero-outline" size="xl" asChild>
              <Link to="/auth?mode=signup&role=seeker">
                Join as Seeker
                <ArrowRight className="w-5 h-5" />
              </Link>
            </Button>
            <Button 
              size="xl" 
              className="bg-white text-primary hover:bg-white/90 shadow-lg"
              asChild
            >
              <Link to="/auth?mode=signup&role=saathi">
                Become a Saathi
              </Link>
            </Button>
          </div>

          <p className="text-primary-foreground/60 text-sm mt-6">
            Free to join • ID verification required • 100% safe & platonic
          </p>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
