import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Star, MapPin, MessageCircle, ArrowRight } from "lucide-react";

const saathis = [
  {
    id: 1,
    name: "Priya Sharma",
    location: "Mumbai, Maharashtra",
    rating: 4.9,
    reviews: 127,
    topics: ["Life Talks", "Career"],
    rate: 299,
    bio: "Former HR manager who loves chai and meaningful conversations about life & career.",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop&crop=face",
  },
  {
    id: 2,
    name: "Rajesh Kumar",
    location: "Delhi, NCR",
    rating: 4.8,
    reviews: 89,
    topics: ["Travel Stories", "Hobbies"],
    rate: 349,
    bio: "Retired teacher with 30 years of stories. Love evening walks and sharing travel tales.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
  },
  {
    id: 3,
    name: "Ananya Patel",
    location: "Bangalore, Karnataka",
    rating: 4.9,
    reviews: 156,
    topics: ["Family", "Life Talks"],
    rate: 399,
    bio: "Life coach and mother of two. Here to listen without judgment.",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face",
  },
  {
    id: 4,
    name: "Vikram Singh",
    location: "Jaipur, Rajasthan",
    rating: 4.7,
    reviews: 64,
    topics: ["Career", "Hobbies"],
    rate: 249,
    bio: "Entrepreneur and chai enthusiast. Love discussing startups and life lessons.",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
  },
];

const FeaturedSaathis = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Meet Our <span className="text-gradient">Top Saathis</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Verified companions ready for chai, walks, and meaningful conversations
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {saathis.map((saathi, index) => (
            <div
              key={saathi.id}
              className="group bg-card rounded-2xl overflow-hidden shadow-card hover:shadow-lg transition-all duration-300 hover:-translate-y-1 animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={saathi.image}
                  alt={saathi.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 right-3 flex items-center gap-1 bg-background/90 backdrop-blur-sm px-2 py-1 rounded-full">
                  <Star className="w-4 h-4 text-accent fill-accent" />
                  <span className="text-sm font-semibold">{saathi.rating}</span>
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                <h3 className="text-lg font-bold text-foreground mb-1">{saathi.name}</h3>
                <div className="flex items-center gap-1 text-muted-foreground text-sm mb-3">
                  <MapPin className="w-4 h-4" />
                  {saathi.location}
                </div>

                <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                  {saathi.bio}
                </p>

                {/* Topics */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {saathi.topics.map((topic) => (
                    <span
                      key={topic}
                      className="px-2 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full"
                    >
                      {topic}
                    </span>
                  ))}
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between pt-4 border-t border-border">
                  <div>
                    <span className="text-xl font-bold text-foreground">₹{saathi.rate}</span>
                    <span className="text-sm text-muted-foreground">/hr</span>
                  </div>
                  <Button variant="soft" size="sm" asChild>
                    <Link to={`/saathi/${saathi.id}`}>
                      View Profile
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <Button variant="outline" size="lg" asChild>
            <Link to="/search">
              View All Saathis
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedSaathis;
