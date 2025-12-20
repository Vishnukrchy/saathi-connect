import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Search, MapPin, Clock, Shield } from "lucide-react";
import { useState } from "react";

const HeroSection = () => {
  const [location, setLocation] = useState("");
  const [topic, setTopic] = useState("");

  return (
    <section className="relative min-h-[90vh] flex items-center bg-gradient-subtle overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-80 h-80 bg-accent/10 rounded-full blur-3xl" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-secondary/5 rounded-full blur-3xl" />

      <div className="container mx-auto relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/10 text-secondary mb-8 animate-fade-in">
            <Shield className="w-4 h-4" />
            <span className="text-sm font-medium">100% Safe & Verified Companions</span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-6 animate-slide-up">
            Find a Trusted <span className="text-gradient">Saathi</span> Near You
            <br />
            <span className="text-muted-foreground">For Chai, Walks & Conversations</span>
          </h1>

          {/* Subheadline */}
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 animate-slide-up" style={{ animationDelay: "0.1s" }}>
            Connect with verified companions for meaningful conversations, evening walks, 
            or just a cup of chai. Strictly platonic, always safe.
          </p>

          {/* Search Box */}
          <div className="bg-card rounded-2xl shadow-card p-4 md:p-6 max-w-3xl mx-auto mb-8 animate-scale-in" style={{ animationDelay: "0.2s" }}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="relative">
                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Enter city or area"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full h-12 pl-12 pr-4 rounded-xl bg-muted border-0 text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary focus:outline-none transition-all"
                />
              </div>
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <select
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  className="w-full h-12 pl-12 pr-4 rounded-xl bg-muted border-0 text-foreground focus:ring-2 focus:ring-primary focus:outline-none transition-all appearance-none cursor-pointer"
                >
                  <option value="">Select topic</option>
                  <option value="life-talks">Life Talks</option>
                  <option value="career">Career Advice</option>
                  <option value="family">Family Stories</option>
                  <option value="travel">Travel Stories</option>
                  <option value="hobbies">Hobbies & Interests</option>
                </select>
              </div>
              <Button variant="hero" size="lg" className="h-12" asChild>
                <Link to="/search">
                  <Search className="w-5 h-5" />
                  Find Saathis
                </Link>
              </Button>
            </div>
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in" style={{ animationDelay: "0.3s" }}>
            <Button variant="default" size="lg" asChild>
              <Link to="/signup?role=seeker">Join as Seeker</Link>
            </Button>
            <Button variant="teal" size="lg" asChild>
              <Link to="/signup?role=saathi">Become a Saathi</Link>
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-wrap items-center justify-center gap-8 mt-12 text-muted-foreground animate-fade-in" style={{ animationDelay: "0.4s" }}>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-secondary" />
              <span className="text-sm">5,000+ Verified Saathis</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-secondary" />
              <span className="text-sm">50+ Cities in India</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-secondary" />
              <span className="text-sm">100% ID Verified</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
