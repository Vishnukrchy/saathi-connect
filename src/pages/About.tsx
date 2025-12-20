import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { 
  Heart, Users, Shield, MapPin, MessageCircle, ArrowRight,
  Target, Eye, Sparkles
} from "lucide-react";
import { Helmet } from "react-helmet-async";

const stats = [
  { value: "5,000+", label: "Verified Saathis" },
  { value: "50+", label: "Cities in India" },
  { value: "25,000+", label: "Conversations" },
  { value: "4.8", label: "Average Rating" },
];

const values = [
  {
    icon: Heart,
    title: "Compassion",
    description: "We believe everyone deserves a compassionate ear and meaningful connection.",
  },
  {
    icon: Shield,
    title: "Safety",
    description: "Your safety is our priority. Every Saathi is verified and all meetups are in public.",
  },
  {
    icon: Users,
    title: "Community",
    description: "We're building a community where respect and kindness are the foundation.",
  },
  {
    icon: MessageCircle,
    title: "Authenticity",
    description: "Real conversations, real connections. No pretense, just genuine human interaction.",
  },
];

const About = () => {
  return (
    <>
      <Helmet>
        <title>About SaathiCircle - Our Mission to Combat Loneliness in India</title>
        <meta 
          name="description" 
          content="Learn about SaathiCircle's mission to reduce loneliness in India through safe, platonic companionship. Meet our team and discover our values." 
        />
      </Helmet>

      <div className="min-h-screen flex flex-col">
        <Navbar />
        
        <main className="flex-1 pt-16">
          {/* Hero */}
          <section className="py-20 bg-gradient-subtle relative overflow-hidden">
            <div className="absolute top-20 left-10 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
            <div className="absolute bottom-20 right-10 w-80 h-80 bg-secondary/10 rounded-full blur-3xl" />
            
            <div className="container mx-auto relative z-10">
              <div className="max-w-3xl mx-auto text-center">
                <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6 animate-fade-in">
                  Our Story
                </span>
                <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 animate-slide-up">
                  Bringing People Together, <br />
                  <span className="text-gradient">One Conversation at a Time</span>
                </h1>
                <p className="text-xl text-muted-foreground animate-slide-up" style={{ animationDelay: "0.1s" }}>
                  SaathiCircle was born from a simple observation: in our increasingly 
                  connected world, loneliness is reaching epidemic proportions. We're 
                  here to change that.
                </p>
              </div>
            </div>
          </section>

          {/* Stats */}
          <section className="py-12 bg-foreground">
            <div className="container mx-auto">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-4xl md:text-5xl font-bold text-primary mb-2">
                      {stat.value}
                    </div>
                    <div className="text-background/70 text-sm">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Mission & Vision */}
          <section className="py-20 bg-background">
            <div className="container mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                <div className="bg-primary/5 rounded-3xl p-10">
                  <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
                    <Target className="w-7 h-7 text-primary" />
                  </div>
                  <h2 className="text-2xl font-bold text-foreground mb-4">Our Mission</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    To combat loneliness in India by creating a safe platform where people 
                    can find verified companions for meaningful, platonic conversations. 
                    We believe that a simple chai session or evening walk with a caring 
                    companion can transform someone's day.
                  </p>
                </div>

                <div className="bg-secondary/5 rounded-3xl p-10">
                  <div className="w-14 h-14 rounded-2xl bg-secondary/10 flex items-center justify-center mb-6">
                    <Eye className="w-7 h-7 text-secondary" />
                  </div>
                  <h2 className="text-2xl font-bold text-foreground mb-4">Our Vision</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    A world where no one feels alone. We envision SaathiCircle in every 
                    city and town across India, connecting seniors with caring listeners, 
                    newcomers with friendly guides, and everyone with the human connection 
                    they deserve.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Values */}
          <section className="py-20 bg-muted">
            <div className="container mx-auto">
              <div className="text-center mb-16">
                <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                  <Sparkles className="w-4 h-4 inline mr-1" />
                  What We Stand For
                </span>
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                  Our Core <span className="text-gradient">Values</span>
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {values.map((value, index) => (
                  <div
                    key={index}
                    className="bg-card rounded-2xl p-8 shadow-card text-center hover:shadow-lg transition-shadow"
                  >
                    <div className="w-16 h-16 rounded-2xl bg-gradient-hero flex items-center justify-center mx-auto mb-6">
                      <value.icon className="w-8 h-8 text-primary-foreground" />
                    </div>
                    <h3 className="text-xl font-bold text-foreground mb-3">{value.title}</h3>
                    <p className="text-muted-foreground text-sm">{value.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Story */}
          <section className="py-20 bg-background">
            <div className="container mx-auto max-w-4xl">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                  How It All <span className="text-gradient">Started</span>
                </h2>
              </div>

              <div className="prose prose-lg mx-auto text-muted-foreground">
                <p>
                  SaathiCircle began with a personal story. Our founder noticed how her 
                  elderly neighbor, a retired professor, spent most days alone after 
                  his children moved abroad. Despite having a lifetime of wisdom and 
                  stories to share, he had no one to talk to.
                </p>
                <p>
                  What started as regular chai sessions between them turned into a 
                  realization: there are millions of people across India who just need 
                  someone to listen, someone to share a walk with, someone to have chai 
                  with. Not romance, not therapy – just genuine human connection.
                </p>
                <p>
                  That's how SaathiCircle was born. We've created a safe, verified 
                  platform where seekers can find trusted companions (Saathis) for 
                  meaningful conversations. Whether you're a senior citizen feeling 
                  lonely, a professional new to a city, or anyone who just needs 
                  someone to talk to – we're here for you.
                </p>
              </div>
            </div>
          </section>

          {/* CTA */}
          <section className="py-20 bg-gradient-hero">
            <div className="container mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
                Join Our Mission
              </h2>
              <p className="text-primary-foreground/80 text-lg mb-8 max-w-xl mx-auto">
                Whether you're looking for a companion or want to become one, 
                you're helping build a less lonely India.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button variant="hero-outline" size="xl" asChild>
                  <Link to="/search">
                    Find a Saathi
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                </Button>
                <Button 
                  size="xl" 
                  className="bg-white text-primary hover:bg-white/90 shadow-lg"
                  asChild
                >
                  <Link to="/signup?role=saathi">Become a Saathi</Link>
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

export default About;
