import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Shield, CheckCircle, AlertTriangle, Phone, Users, Eye } from "lucide-react";
import { Helmet } from "react-helmet-async";

const Safety = () => {
  const safetyFeatures = [
    {
      icon: CheckCircle,
      title: "100% ID Verification",
      description: "Every Saathi undergoes government ID verification before being approved on our platform."
    },
    {
      icon: Users,
      title: "Background Checks",
      description: "We conduct thorough background checks to ensure the safety of our community members."
    },
    {
      icon: Eye,
      title: "Public Meeting Spaces",
      description: "All meetings happen in public spaces like cafes, parks, or community centers for everyone's safety."
    },
    {
      icon: Phone,
      title: "24/7 Emergency Support",
      description: "Our support team is available round the clock for any safety concerns or emergencies."
    },
    {
      icon: Shield,
      title: "Rating & Review System",
      description: "Transparent ratings and reviews help you choose trusted companions with confidence."
    },
    {
      icon: AlertTriangle,
      title: "Report & Block",
      description: "Easy-to-use reporting system to flag inappropriate behavior. We take swift action on all reports."
    }
  ];

  const guidelines = [
    "Always meet in public places during daylight hours for first meetings",
    "Share your meeting details with a trusted friend or family member",
    "Trust your instincts - if something feels wrong, leave immediately",
    "Never share personal financial information or send money",
    "Keep initial conversations on our platform before meeting",
    "Report any suspicious behavior to our safety team immediately"
  ];

  return (
    <>
      <Helmet>
        <title>Safety Guidelines - SaathiCircle</title>
        <meta 
          name="description" 
          content="Learn about SaathiCircle's comprehensive safety measures and guidelines to ensure secure, platonic companionship experiences." 
        />
      </Helmet>
      
      <div className="min-h-screen flex flex-col">
        <Navbar />
        
        <main className="flex-1 pt-16">
          {/* Hero */}
          <section className="py-20 bg-gradient-subtle">
            <div className="container mx-auto text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 mb-6">
                <Shield className="w-8 h-8 text-primary" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                Your Safety is Our <span className="text-gradient">Priority</span>
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                We've built comprehensive safety measures to ensure every interaction on SaathiCircle is secure, respectful, and strictly platonic.
              </p>
            </div>
          </section>

          {/* Safety Features */}
          <section className="py-20 bg-background">
            <div className="container mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12">Our Safety Measures</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {safetyFeatures.map((feature, index) => (
                  <div key={index} className="bg-card p-6 rounded-2xl shadow-card">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                      <feature.icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Guidelines */}
          <section className="py-20 bg-muted/30">
            <div className="container mx-auto">
              <div className="max-w-3xl mx-auto">
                <h2 className="text-3xl font-bold text-center mb-12">Safety Guidelines for Users</h2>
                <div className="bg-card p-8 rounded-2xl shadow-card">
                  <ul className="space-y-4">
                    {guidelines.map((guideline, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-secondary mt-0.5 flex-shrink-0" />
                        <span className="text-foreground">{guideline}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Emergency Contact */}
          <section className="py-20 bg-destructive/5">
            <div className="container mx-auto text-center">
              <AlertTriangle className="w-12 h-12 text-destructive mx-auto mb-4" />
              <h2 className="text-2xl font-bold mb-4">Need Immediate Help?</h2>
              <p className="text-muted-foreground mb-6">
                If you're in an emergency situation, please contact local authorities immediately.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a href="tel:100" className="px-6 py-3 bg-destructive text-destructive-foreground rounded-xl font-medium">
                  Police: 100
                </a>
                <a href="tel:1091" className="px-6 py-3 bg-destructive text-destructive-foreground rounded-xl font-medium">
                  Women Helpline: 1091
                </a>
                <a href="mailto:safety@saathicircle.in" className="px-6 py-3 bg-primary text-primary-foreground rounded-xl font-medium">
                  Email Safety Team
                </a>
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default Safety;
