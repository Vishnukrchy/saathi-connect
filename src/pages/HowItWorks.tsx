import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { 
  Search, Calendar, Coffee, MessageCircle, ArrowRight, 
  Shield, UserCheck, MapPin, Clock, CreditCard, Star,
  HelpCircle
} from "lucide-react";
import { Helmet } from "react-helmet-async";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const steps = [
  {
    icon: Search,
    title: "Search for Saathis",
    description: "Browse verified companions in your city. Filter by topics like life talks, career advice, travel stories, or hobbies. Check ratings and reviews from other seekers.",
    details: ["Location-based search", "Topic filters", "Rating & reviews", "Availability check"],
  },
  {
    icon: Calendar,
    title: "Book a Time Slot",
    description: "Choose a convenient time from their availability calendar. Select duration - 1 hour for a quick chai or 2-3 hours for a longer walk and conversation.",
    details: ["Flexible scheduling", "Multiple duration options", "Instant booking confirmation", "Easy rescheduling"],
  },
  {
    icon: Coffee,
    title: "Meet in Public",
    description: "Meet your Saathi at a public place - a cafe, park, or any safe public space. Enjoy chai, a walk, or just meaningful conversation.",
    details: ["Public venues only", "Safety guidelines", "Real-time location sharing", "Emergency contacts"],
  },
  {
    icon: MessageCircle,
    title: "Share Feedback",
    description: "After your meetup, rate your experience and share feedback. Help build a trusted community where everyone feels safe and valued.",
    details: ["Star ratings", "Written reviews", "Report concerns", "Build reputation"],
  },
];

const safetyFeatures = [
  {
    icon: UserCheck,
    title: "ID Verification",
    description: "All Saathis must upload government-issued ID (Aadhaar, PAN, or Driving License) for verification.",
  },
  {
    icon: MapPin,
    title: "Public Meetups Only",
    description: "Meetups are strictly in public places - cafes, parks, malls. No private locations allowed.",
  },
  {
    icon: Shield,
    title: "Safety Guidelines",
    description: "Comprehensive safety guidelines and 24/7 support for any concerns.",
  },
  {
    icon: Star,
    title: "Community Ratings",
    description: "Transparent ratings and reviews help you choose trusted companions.",
  },
];

const faqs = [
  {
    question: "Is SaathiCircle a dating platform?",
    answer: "No, absolutely not. SaathiCircle is strictly for platonic companionship. We have zero tolerance for any romantic or inappropriate behavior. Our platform is designed for meaningful conversations, chai sessions, and walks - nothing more.",
  },
  {
    question: "How are Saathis verified?",
    answer: "All Saathis must upload a government-issued ID (Aadhaar, PAN, or Driving License) during registration. Our team verifies each document before activating their profile. We also verify phone numbers and email addresses.",
  },
  {
    question: "Is it safe to meet strangers?",
    answer: "Safety is our top priority. All meetups must be in public places. We provide real-time location sharing, emergency contacts, and 24/7 support. All users are ID verified, and our community rating system helps identify trusted companions.",
  },
  {
    question: "What can I talk about with a Saathi?",
    answer: "Anything you'd discuss with a friend - life experiences, career advice, family stories, travel tales, hobbies, or just everyday conversations. Many people use SaathiCircle to combat loneliness or to have someone to talk to in a new city.",
  },
  {
    question: "How much does it cost?",
    answer: "Joining SaathiCircle is free. Each Saathi sets their own hourly rate (typically ₹200-500/hour). You pay only for the time you book. Payment is secure through our platform.",
  },
  {
    question: "Can I become a Saathi?",
    answer: "Yes! If you're a good listener, enjoy conversations, and want to help others combat loneliness, you can become a Saathi. You'll need to verify your ID and complete our onboarding process.",
  },
];

const HowItWorks = () => {
  return (
    <>
      <Helmet>
        <title>How It Works - SaathiCircle | Find Platonic Companions in India</title>
        <meta 
          name="description" 
          content="Learn how SaathiCircle works - search verified companions, book a slot, meet in public places, and share feedback. Safe, platonic companionship in India." 
        />
      </Helmet>

      <div className="min-h-screen flex flex-col">
        <Navbar />
        
        <main className="flex-1 pt-16">
          {/* Hero */}
          <section className="py-20 bg-gradient-subtle">
            <div className="container mx-auto text-center">
              <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4 animate-fade-in">
                Simple & Safe Process
              </span>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 animate-slide-up">
                How <span className="text-gradient">SaathiCircle</span> Works
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto animate-slide-up" style={{ animationDelay: "0.1s" }}>
                Finding a trusted companion for meaningful conversations is easy and safe
              </p>
            </div>
          </section>

          {/* Steps */}
          <section className="py-20 bg-background">
            <div className="container mx-auto">
              <div className="space-y-16">
                {steps.map((step, index) => (
                  <div 
                    key={index}
                    className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-12`}
                  >
                    {/* Content */}
                    <div className="flex-1 space-y-6">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-gradient-hero flex items-center justify-center text-primary-foreground font-bold text-lg shadow-md">
                          {index + 1}
                        </div>
                        <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                          {step.title}
                        </h2>
                      </div>
                      <p className="text-lg text-muted-foreground">
                        {step.description}
                      </p>
                      <ul className="grid grid-cols-2 gap-3">
                        {step.details.map((detail, i) => (
                          <li key={i} className="flex items-center gap-2 text-foreground">
                            <div className="w-2 h-2 rounded-full bg-primary" />
                            {detail}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Visual */}
                    <div className="flex-1">
                      <div className="bg-muted rounded-3xl p-8 flex items-center justify-center aspect-square max-w-md mx-auto">
                        <step.icon className="w-32 h-32 text-primary/40" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Safety */}
          <section className="py-20 bg-secondary/10">
            <div className="container mx-auto">
              <div className="text-center mb-12">
                <span className="inline-block px-4 py-1.5 rounded-full bg-secondary/20 text-secondary text-sm font-medium mb-4">
                  Your Safety First
                </span>
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                  Built with <span className="text-secondary">Safety</span> in Mind
                </h2>
                <p className="text-muted-foreground max-w-xl mx-auto">
                  We take multiple measures to ensure every interaction is safe and respectful
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {safetyFeatures.map((feature, index) => (
                  <div 
                    key={index}
                    className="bg-card rounded-2xl p-6 shadow-card text-center"
                  >
                    <div className="w-14 h-14 rounded-xl bg-secondary/10 flex items-center justify-center mx-auto mb-4">
                      <feature.icon className="w-7 h-7 text-secondary" />
                    </div>
                    <h3 className="text-lg font-bold text-foreground mb-2">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* FAQs */}
          <section className="py-20 bg-background">
            <div className="container mx-auto max-w-3xl">
              <div className="text-center mb-12">
                <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                  <HelpCircle className="w-4 h-4 inline mr-1" />
                  FAQs
                </span>
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                  Frequently Asked Questions
                </h2>
              </div>

              <Accordion type="single" collapsible className="space-y-4">
                {faqs.map((faq, index) => (
                  <AccordionItem 
                    key={index} 
                    value={`item-${index}`}
                    className="bg-card rounded-xl px-6 shadow-card border-none"
                  >
                    <AccordionTrigger className="text-left font-semibold text-foreground hover:no-underline py-5">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground pb-5">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </section>

          {/* CTA */}
          <section className="py-20 bg-gradient-hero">
            <div className="container mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
                Ready to Get Started?
              </h2>
              <p className="text-primary-foreground/80 text-lg mb-8 max-w-xl mx-auto">
                Join thousands of Indians finding meaningful platonic connections
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button variant="hero-outline" size="xl" asChild>
                  <Link to="/search">
                    Find Saathis
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                </Button>
                <Button 
                  size="xl" 
                  className="bg-white text-primary hover:bg-white/90 shadow-lg"
                  asChild
                >
                  <Link to="/signup">Get Started</Link>
                </Button>
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default HowItWorks;
