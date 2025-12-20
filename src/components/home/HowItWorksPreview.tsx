import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Search, Calendar, Coffee, MessageCircle, ArrowRight } from "lucide-react";

const steps = [
  {
    icon: Search,
    step: "01",
    title: "Search Saathis",
    description: "Find verified companions in your city based on topics, availability & ratings.",
  },
  {
    icon: Calendar,
    step: "02",
    title: "Book a Slot",
    description: "Choose a convenient time from their availability calendar.",
  },
  {
    icon: Coffee,
    step: "03",
    title: "Meet in Public",
    description: "Meet at a cafe, park, or public space for chai and conversation.",
  },
  {
    icon: MessageCircle,
    step: "04",
    title: "Share Feedback",
    description: "Rate your experience and help build a trusted community.",
  },
];

const HowItWorksPreview = () => {
  return (
    <section className="py-20 bg-muted">
      <div className="container mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            Simple Process
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            How <span className="text-gradient">SaathiCircle</span> Works
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Finding a trusted companion for meaningful conversations is easy
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {steps.map((step, index) => (
            <div
              key={index}
              className="relative group"
            >
              {/* Connector line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-12 left-[60%] w-full h-0.5 bg-border" />
              )}
              
              <div className="bg-card rounded-2xl p-6 shadow-card hover:shadow-lg transition-all duration-300 relative z-10">
                {/* Step number */}
                <div className="absolute -top-3 -right-3 w-10 h-10 rounded-full bg-gradient-hero text-primary-foreground text-sm font-bold flex items-center justify-center shadow-md">
                  {step.step}
                </div>
                
                {/* Icon */}
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <step.icon className="w-7 h-7 text-primary" />
                </div>
                
                <h3 className="text-lg font-bold text-foreground mb-2">{step.title}</h3>
                <p className="text-sm text-muted-foreground">{step.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <Button variant="default" size="lg" asChild>
            <Link to="/how-it-works">
              Learn More
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksPreview;
