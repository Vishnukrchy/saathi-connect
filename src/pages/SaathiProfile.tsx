import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { 
  MapPin, Star, Clock, Shield, MessageCircle, Calendar,
  Heart, Share2, ChevronLeft, Check, Languages
} from "lucide-react";
import { Helmet } from "react-helmet-async";

// Mock data - in real app this would come from API
const saathiData = {
  id: 1,
  name: "Priya Sharma",
  location: "Mumbai, Maharashtra",
  rating: 4.9,
  reviewCount: 127,
  topics: ["Life Talks", "Career", "Family"],
  rate: 299,
  bio: "Former HR manager with 15+ years of corporate experience. I left the corporate world to pursue my passion for meaningful conversations and helping others navigate life's challenges.\n\nWhether you want to discuss career transitions, work-life balance, or just need someone to listen without judgment, I'm here for you. I believe everyone deserves a compassionate ear and a cup of warm chai.",
  image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800&h=800&fit=crop&crop=face",
  verified: true,
  memberSince: "March 2023",
  languages: ["Hindi", "English", "Marathi"],
  availability: {
    monday: ["10:00 AM - 12:00 PM", "4:00 PM - 7:00 PM"],
    tuesday: ["10:00 AM - 12:00 PM", "4:00 PM - 7:00 PM"],
    wednesday: ["4:00 PM - 7:00 PM"],
    thursday: ["10:00 AM - 12:00 PM", "4:00 PM - 7:00 PM"],
    friday: ["10:00 AM - 12:00 PM"],
    saturday: ["10:00 AM - 2:00 PM"],
    sunday: [],
  },
  reviews: [
    {
      id: 1,
      name: "Meera K.",
      rating: 5,
      date: "2 days ago",
      content: "Priya is an amazing listener. We met for chai at a local cafe and I felt so comfortable sharing my thoughts. Highly recommend!",
    },
    {
      id: 2,
      name: "Arjun M.",
      rating: 5,
      date: "1 week ago",
      content: "Had a great conversation about career changes. Priya gave me practical advice and helped me see things from a new perspective.",
    },
    {
      id: 3,
      name: "Sunita D.",
      rating: 4,
      date: "2 weeks ago",
      content: "Very warm and welcoming. We went for an evening walk and talked about family matters. She's genuinely caring.",
    },
  ],
};

const SaathiProfile = () => {
  const { id } = useParams();
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);

  // In real app, fetch saathi data based on id
  const saathi = saathiData;

  return (
    <>
      <Helmet>
        <title>{saathi.name} - Saathi Profile | SaathiCircle</title>
        <meta 
          name="description" 
          content={`Book a session with ${saathi.name} in ${saathi.location}. ${saathi.bio.substring(0, 150)}...`} 
        />
      </Helmet>

      <div className="min-h-screen flex flex-col">
        <Navbar />
        
        <main className="flex-1 pt-16 bg-muted">
          {/* Back Button */}
          <div className="container mx-auto py-4">
            <Button variant="ghost" size="sm" asChild>
              <Link to="/search">
                <ChevronLeft className="w-4 h-4" />
                Back to Search
              </Link>
            </Button>
          </div>

          {/* Profile Header */}
          <section className="bg-background border-b border-border">
            <div className="container mx-auto py-8">
              <div className="flex flex-col lg:flex-row gap-8">
                {/* Image */}
                <div className="lg:w-80 shrink-0">
                  <div className="relative">
                    <img
                      src={saathi.image}
                      alt={saathi.name}
                      className="w-full aspect-square object-cover rounded-2xl shadow-card"
                    />
                    {saathi.verified && (
                      <div className="absolute bottom-4 left-4 flex items-center gap-2 bg-secondary text-secondary-foreground px-3 py-1.5 rounded-full text-sm font-medium">
                        <Shield className="w-4 h-4" />
                        Verified
                      </div>
                    )}
                  </div>
                </div>

                {/* Info */}
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h1 className="text-3xl font-bold text-foreground mb-2">{saathi.name}</h1>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <MapPin className="w-5 h-5" />
                        <span>{saathi.location}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="icon" className="rounded-full">
                        <Heart className="w-5 h-5" />
                      </Button>
                      <Button variant="outline" size="icon" className="rounded-full">
                        <Share2 className="w-5 h-5" />
                      </Button>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="flex flex-wrap gap-6 mb-6">
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1 bg-accent/10 px-3 py-1.5 rounded-full">
                        <Star className="w-5 h-5 text-accent fill-accent" />
                        <span className="font-bold text-foreground">{saathi.rating}</span>
                      </div>
                      <span className="text-muted-foreground">({saathi.reviews.length} reviews)</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Clock className="w-5 h-5" />
                      <span>Member since {saathi.memberSince}</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Languages className="w-5 h-5" />
                      <span>{saathi.languages.join(", ")}</span>
                    </div>
                  </div>

                  {/* Topics */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {saathi.topics.map((topic) => (
                      <span
                        key={topic}
                        className="px-4 py-2 text-sm font-medium bg-primary/10 text-primary rounded-full"
                      >
                        {topic}
                      </span>
                    ))}
                  </div>

                  {/* Price & CTA */}
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-6 bg-muted rounded-2xl">
                    <div className="flex-1">
                      <div className="text-3xl font-bold text-foreground">
                        ₹{saathi.rate}
                        <span className="text-lg font-normal text-muted-foreground">/hour</span>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        Secure payment • Cancel anytime
                      </p>
                    </div>
                    <Button variant="hero" size="xl">
                      <Calendar className="w-5 h-5" />
                      Book Now
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Content */}
          <section className="py-12">
            <div className="container mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-8">
                  {/* About */}
                  <div className="bg-card rounded-2xl p-8 shadow-card">
                    <h2 className="text-xl font-bold text-foreground mb-4">About Me</h2>
                    <p className="text-muted-foreground whitespace-pre-line leading-relaxed">
                      {saathi.bio}
                    </p>
                  </div>

                  {/* Reviews */}
                  <div className="bg-card rounded-2xl p-8 shadow-card">
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-xl font-bold text-foreground">Reviews</h2>
                      <div className="flex items-center gap-2">
                        <Star className="w-5 h-5 text-accent fill-accent" />
                        <span className="font-bold text-foreground">{saathi.rating}</span>
                        <span className="text-muted-foreground">({saathi.reviews.length} reviews)</span>
                      </div>
                    </div>

                    <div className="space-y-6">
                      {saathi.reviews.map((review) => (
                        <div key={review.id} className="pb-6 border-b border-border last:border-0 last:pb-0">
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                                {review.name.charAt(0)}
                              </div>
                              <div>
                                <p className="font-semibold text-foreground">{review.name}</p>
                                <p className="text-sm text-muted-foreground">{review.date}</p>
                              </div>
                            </div>
                            <div className="flex gap-1">
                              {[...Array(review.rating)].map((_, i) => (
                                <Star key={i} className="w-4 h-4 text-accent fill-accent" />
                              ))}
                            </div>
                          </div>
                          <p className="text-muted-foreground">{review.content}</p>
                        </div>
                      ))}
                    </div>

                    <Button variant="outline" className="w-full mt-6">
                      View All Reviews
                    </Button>
                  </div>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                  {/* Availability */}
                  <div className="bg-card rounded-2xl p-6 shadow-card sticky top-24">
                    <h3 className="text-lg font-bold text-foreground mb-4">Availability</h3>
                    
                    <div className="space-y-3">
                      {Object.entries(saathi.availability).map(([day, slots]) => (
                        <div key={day} className="flex items-start gap-3">
                          <span className="w-24 text-sm font-medium text-foreground capitalize">
                            {day}
                          </span>
                          <div className="flex-1">
                            {slots.length > 0 ? (
                              <div className="flex flex-wrap gap-2">
                                {slots.map((slot, i) => (
                                  <span
                                    key={i}
                                    className="px-2 py-1 text-xs bg-secondary/10 text-secondary rounded-full"
                                  >
                                    {slot}
                                  </span>
                                ))}
                              </div>
                            ) : (
                              <span className="text-sm text-muted-foreground">Not available</span>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>

                    <Button variant="hero" className="w-full mt-6">
                      <Calendar className="w-5 h-5" />
                      Book a Slot
                    </Button>
                  </div>

                  {/* Safety Tips */}
                  <div className="bg-secondary/10 rounded-2xl p-6">
                    <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                      <Shield className="w-5 h-5 text-secondary" />
                      Safety Tips
                    </h3>
                    <ul className="space-y-3 text-sm text-muted-foreground">
                      <li className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-secondary mt-0.5" />
                        Always meet in public places
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-secondary mt-0.5" />
                        Share your location with a friend
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-secondary mt-0.5" />
                        Trust your instincts
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-secondary mt-0.5" />
                        Report any concerns immediately
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default SaathiProfile;
