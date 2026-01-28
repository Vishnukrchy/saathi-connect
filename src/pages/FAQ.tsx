import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { HelpCircle } from "lucide-react";
import { Helmet } from "react-helmet-async";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQ = () => {
  const faqs = [
    {
      category: "General",
      questions: [
        {
          q: "What is SaathiCircle?",
          a: "SaathiCircle is a platform that connects you with verified companions (Saathis) for meaningful platonic interactions like chai conversations, evening walks, or friendly chats. We're focused on combating loneliness through genuine human connection."
        },
        {
          q: "Is SaathiCircle a dating app?",
          a: "No, absolutely not. SaathiCircle is strictly for platonic companionship. We have zero tolerance for romantic or inappropriate advances. All our Saathis are trained to maintain professional, friendly boundaries."
        },
        {
          q: "Which cities is SaathiCircle available in?",
          a: "We're currently available in 50+ cities across India including Mumbai, Delhi, Bangalore, Hyderabad, Chennai, Kolkata, Pune, Jaipur, and many more. Check our search page to find Saathis in your city."
        }
      ]
    },
    {
      category: "For Seekers",
      questions: [
        {
          q: "How do I book a Saathi?",
          a: "Simply search for Saathis in your city, view their profiles, select a date and time that works for you, choose a meeting location, and complete the booking. You'll receive confirmation once the Saathi accepts."
        },
        {
          q: "What activities can I do with a Saathi?",
          a: "You can enjoy chai at a cafe, go for a walk in a park, have conversations about life, career, family, or hobbies, play board games, or simply spend time together in a public setting."
        },
        {
          q: "How much does it cost?",
          a: "Saathis set their own hourly rates, typically ranging from ₹249 to ₹499 per hour. You can see the exact rate on each Saathi's profile before booking."
        },
        {
          q: "Can I cancel a booking?",
          a: "Yes, you can cancel a booking up to 24 hours before the scheduled time for a full refund. Cancellations within 24 hours may be subject to a partial charge."
        }
      ]
    },
    {
      category: "For Saathis",
      questions: [
        {
          q: "How do I become a Saathi?",
          a: "Sign up on our platform, complete your profile, submit your government ID for verification, and set your availability and hourly rate. Once verified, you'll start appearing in search results."
        },
        {
          q: "How much can I earn as a Saathi?",
          a: "Earnings depend on your hourly rate and availability. Active Saathis typically earn ₹15,000-₹40,000 per month. You keep 85% of your booking fees."
        },
        {
          q: "Do I need any qualifications?",
          a: "No formal qualifications are required. We look for empathetic individuals who are good listeners and can maintain respectful, platonic interactions. Being a good conversationalist helps!"
        }
      ]
    },
    {
      category: "Safety & Privacy",
      questions: [
        {
          q: "How are Saathis verified?",
          a: "All Saathis undergo government ID verification, background checks, and an onboarding process where they agree to our community guidelines and code of conduct."
        },
        {
          q: "Where do meetings take place?",
          a: "All meetings must happen in public places like cafes, parks, restaurants, or community centers. We strictly prohibit private meetings for everyone's safety."
        },
        {
          q: "What if I feel unsafe during a meeting?",
          a: "Your safety is our priority. You can end the meeting at any time, report the incident through our app, and contact our 24/7 safety team. We take all reports seriously."
        }
      ]
    },
    {
      category: "Payments",
      questions: [
        {
          q: "What payment methods are accepted?",
          a: "We accept all major credit/debit cards, UPI, and net banking. Payments are processed securely through our payment partner."
        },
        {
          q: "When is the Saathi paid?",
          a: "Saathis receive their payment within 24-48 hours after the booking is completed. This ensures both parties have a positive experience."
        },
        {
          q: "Is my payment information secure?",
          a: "Yes, we use industry-standard encryption and never store your complete card details. All transactions are processed through secure payment gateways."
        }
      ]
    }
  ];

  return (
    <>
      <Helmet>
        <title>FAQs - SaathiCircle</title>
        <meta 
          name="description" 
          content="Find answers to frequently asked questions about SaathiCircle - booking Saathis, becoming a companion, safety measures, and payments." 
        />
      </Helmet>
      
      <div className="min-h-screen flex flex-col">
        <Navbar />
        
        <main className="flex-1 pt-16">
          {/* Hero */}
          <section className="py-20 bg-gradient-subtle">
            <div className="container mx-auto text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 mb-6">
                <HelpCircle className="w-8 h-8 text-primary" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                Frequently Asked <span className="text-gradient">Questions</span>
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Everything you need to know about SaathiCircle. Can't find your answer? Contact our support team.
              </p>
            </div>
          </section>

          {/* FAQ Sections */}
          <section className="py-20 bg-background">
            <div className="container mx-auto max-w-4xl">
              {faqs.map((section, sectionIndex) => (
                <div key={sectionIndex} className="mb-12">
                  <h2 className="text-2xl font-bold mb-6 text-primary">{section.category}</h2>
                  <Accordion type="single" collapsible className="space-y-4">
                    {section.questions.map((faq, faqIndex) => (
                      <AccordionItem 
                        key={faqIndex} 
                        value={`${sectionIndex}-${faqIndex}`}
                        className="bg-card rounded-xl px-6 border-none shadow-card"
                      >
                        <AccordionTrigger className="text-left font-medium hover:no-underline">
                          {faq.q}
                        </AccordionTrigger>
                        <AccordionContent className="text-muted-foreground">
                          {faq.a}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>
              ))}
            </div>
          </section>

          {/* Still have questions */}
          <section className="py-20 bg-muted/30">
            <div className="container mx-auto text-center">
              <h2 className="text-2xl font-bold mb-4">Still have questions?</h2>
              <p className="text-muted-foreground mb-6">
                Our support team is here to help you with any queries.
              </p>
              <a 
                href="/contact" 
                className="inline-flex px-6 py-3 bg-primary text-primary-foreground rounded-xl font-medium hover:bg-primary/90 transition-colors"
              >
                Contact Support
              </a>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default FAQ;
