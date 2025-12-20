import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { 
  Search as SearchIcon, MapPin, Star, Filter, Grid, List,
  ChevronDown, X, Clock, Heart
} from "lucide-react";
import { Helmet } from "react-helmet-async";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";

const saathis = [
  {
    id: 1,
    name: "Priya Sharma",
    location: "Mumbai, Maharashtra",
    distance: "2.5 km",
    rating: 4.9,
    reviews: 127,
    topics: ["Life Talks", "Career"],
    rate: 299,
    bio: "Former HR manager who loves chai and meaningful conversations about life & career. Available for morning walks and evening chai sessions.",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop&crop=face",
    available: true,
    languages: ["Hindi", "English"],
  },
  {
    id: 2,
    name: "Rajesh Kumar",
    location: "Delhi, NCR",
    distance: "3.2 km",
    rating: 4.8,
    reviews: 89,
    topics: ["Travel Stories", "Hobbies"],
    rate: 349,
    bio: "Retired teacher with 30 years of stories. Love evening walks and sharing travel tales. Great listener who enjoys deep conversations.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
    available: true,
    languages: ["Hindi", "English", "Punjabi"],
  },
  {
    id: 3,
    name: "Ananya Patel",
    location: "Bangalore, Karnataka",
    distance: "1.8 km",
    rating: 4.9,
    reviews: 156,
    topics: ["Family", "Life Talks"],
    rate: 399,
    bio: "Life coach and mother of two. Here to listen without judgment. Specializing in family matters and life transitions.",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face",
    available: false,
    languages: ["English", "Kannada", "Hindi"],
  },
  {
    id: 4,
    name: "Vikram Singh",
    location: "Jaipur, Rajasthan",
    distance: "5.1 km",
    rating: 4.7,
    reviews: 64,
    topics: ["Career", "Hobbies"],
    rate: 249,
    bio: "Entrepreneur and chai enthusiast. Love discussing startups, business ideas, and life lessons over a cup of masala chai.",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
    available: true,
    languages: ["Hindi", "English", "Marwari"],
  },
  {
    id: 5,
    name: "Sunita Devi",
    location: "Kolkata, West Bengal",
    distance: "4.3 km",
    rating: 4.8,
    reviews: 92,
    topics: ["Family", "Life Talks"],
    rate: 279,
    bio: "Retired school principal with decades of wisdom. Love sharing stories and listening to your life experiences over adda sessions.",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop&crop=face",
    available: true,
    languages: ["Bengali", "Hindi", "English"],
  },
  {
    id: 6,
    name: "Mohammed Ali",
    location: "Hyderabad, Telangana",
    distance: "2.9 km",
    rating: 4.6,
    reviews: 45,
    topics: ["Travel Stories", "Career"],
    rate: 299,
    bio: "World traveler who has visited 30+ countries. Love sharing travel stories and giving career advice to young professionals.",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face",
    available: true,
    languages: ["Telugu", "Urdu", "Hindi", "English"],
  },
];

const topics = ["All Topics", "Life Talks", "Career", "Family", "Travel Stories", "Hobbies"];
const cities = ["All Cities", "Mumbai", "Delhi", "Bangalore", "Jaipur", "Kolkata", "Hyderabad"];

const Search = () => {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [selectedTopic, setSelectedTopic] = useState("All Topics");
  const [selectedCity, setSelectedCity] = useState("All Cities");
  const [priceRange, setPriceRange] = useState([0, 500]);
  const [showFilters, setShowFilters] = useState(false);

  return (
    <>
      <Helmet>
        <title>Find Saathis - SaathiCircle | Browse Verified Companions</title>
        <meta 
          name="description" 
          content="Browse verified Saathis near you. Filter by topics, location, rating, and availability. Find the perfect companion for chai and conversation." 
        />
      </Helmet>

      <div className="min-h-screen flex flex-col bg-muted">
        <Navbar />
        
        <main className="flex-1 pt-16">
          {/* Search Header */}
          <section className="bg-background border-b border-border sticky top-16 z-40">
            <div className="container mx-auto py-4">
              <div className="flex flex-col md:flex-row gap-4 items-center">
                {/* Search Input */}
                <div className="relative flex-1 w-full">
                  <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Search by name, location, or topic..."
                    className="w-full h-12 pl-12 pr-4 rounded-xl bg-muted border-0 text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary focus:outline-none transition-all"
                  />
                </div>

                {/* Filters */}
                <div className="flex items-center gap-3 w-full md:w-auto">
                  <Select value={selectedCity} onValueChange={setSelectedCity}>
                    <SelectTrigger className="w-full md:w-40 h-12 rounded-xl bg-muted border-0">
                      <MapPin className="w-4 h-4 mr-2 text-muted-foreground" />
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {cities.map((city) => (
                        <SelectItem key={city} value={city}>{city}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Select value={selectedTopic} onValueChange={setSelectedTopic}>
                    <SelectTrigger className="w-full md:w-40 h-12 rounded-xl bg-muted border-0">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {topics.map((topic) => (
                        <SelectItem key={topic} value={topic}>{topic}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Button
                    variant={showFilters ? "default" : "outline"}
                    size="icon"
                    className="h-12 w-12 rounded-xl"
                    onClick={() => setShowFilters(!showFilters)}
                  >
                    <Filter className="w-5 h-5" />
                  </Button>

                  <div className="hidden md:flex items-center gap-1 border border-border rounded-xl p-1">
                    <Button
                      variant={viewMode === "grid" ? "default" : "ghost"}
                      size="icon"
                      className="h-10 w-10 rounded-lg"
                      onClick={() => setViewMode("grid")}
                    >
                      <Grid className="w-4 h-4" />
                    </Button>
                    <Button
                      variant={viewMode === "list" ? "default" : "ghost"}
                      size="icon"
                      className="h-10 w-10 rounded-lg"
                      onClick={() => setViewMode("list")}
                    >
                      <List className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>

              {/* Extended Filters */}
              {showFilters && (
                <div className="mt-4 pt-4 border-t border-border animate-fade-in">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <label className="text-sm font-medium text-foreground mb-2 block">
                        Price Range (₹/hr)
                      </label>
                      <div className="px-2">
                        <Slider
                          value={priceRange}
                          onValueChange={setPriceRange}
                          max={1000}
                          step={50}
                          className="w-full"
                        />
                        <div className="flex justify-between mt-2 text-sm text-muted-foreground">
                          <span>₹{priceRange[0]}</span>
                          <span>₹{priceRange[1]}</span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground mb-2 block">
                        Minimum Rating
                      </label>
                      <Select defaultValue="4">
                        <SelectTrigger className="h-12 rounded-xl bg-muted border-0">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">Any Rating</SelectItem>
                          <SelectItem value="4.5">4.5+ Stars</SelectItem>
                          <SelectItem value="4">4+ Stars</SelectItem>
                          <SelectItem value="3.5">3.5+ Stars</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground mb-2 block">
                        Availability
                      </label>
                      <Select defaultValue="all">
                        <SelectTrigger className="h-12 rounded-xl bg-muted border-0">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All</SelectItem>
                          <SelectItem value="available">Available Now</SelectItem>
                          <SelectItem value="today">Available Today</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </section>

          {/* Results */}
          <section className="py-8">
            <div className="container mx-auto">
              {/* Results Header */}
              <div className="flex items-center justify-between mb-6">
                <p className="text-muted-foreground">
                  Showing <span className="font-semibold text-foreground">{saathis.length}</span> Saathis
                </p>
                <Select defaultValue="relevance">
                  <SelectTrigger className="w-44 h-10 rounded-lg bg-card border-border">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="relevance">Most Relevant</SelectItem>
                    <SelectItem value="rating">Highest Rated</SelectItem>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                    <SelectItem value="distance">Nearest First</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Grid */}
              <div className={`grid gap-6 ${viewMode === "grid" ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"}`}>
                {saathis.map((saathi, index) => (
                  <div
                    key={saathi.id}
                    className={`bg-card rounded-2xl overflow-hidden shadow-card hover:shadow-lg transition-all duration-300 animate-fade-in ${
                      viewMode === "list" ? "flex" : ""
                    }`}
                    style={{ animationDelay: `${index * 0.05}s` }}
                  >
                    {/* Image */}
                    <div className={`relative ${viewMode === "list" ? "w-48 shrink-0" : "h-48"}`}>
                      <img
                        src={saathi.image}
                        alt={saathi.name}
                        className="w-full h-full object-cover"
                      />
                      {saathi.available ? (
                        <div className="absolute top-3 left-3 flex items-center gap-1 bg-secondary text-secondary-foreground px-2 py-1 rounded-full text-xs font-medium">
                          <div className="w-2 h-2 rounded-full bg-secondary-foreground animate-pulse" />
                          Available
                        </div>
                      ) : (
                        <div className="absolute top-3 left-3 flex items-center gap-1 bg-muted text-muted-foreground px-2 py-1 rounded-full text-xs font-medium">
                          Busy
                        </div>
                      )}
                      <button className="absolute top-3 right-3 w-8 h-8 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center hover:bg-background transition-colors">
                        <Heart className="w-4 h-4 text-muted-foreground hover:text-primary" />
                      </button>
                    </div>

                    {/* Content */}
                    <div className="p-5 flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="text-lg font-bold text-foreground">{saathi.name}</h3>
                          <div className="flex items-center gap-2 text-muted-foreground text-sm">
                            <MapPin className="w-4 h-4" />
                            {saathi.location}
                            <span className="text-primary font-medium">• {saathi.distance}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-1 bg-accent/10 px-2 py-1 rounded-full">
                          <Star className="w-4 h-4 text-accent fill-accent" />
                          <span className="text-sm font-semibold">{saathi.rating}</span>
                          <span className="text-xs text-muted-foreground">({saathi.reviews})</span>
                        </div>
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
                        {saathi.languages.slice(0, 2).map((lang) => (
                          <span
                            key={lang}
                            className="px-2 py-1 text-xs font-medium bg-muted text-muted-foreground rounded-full"
                          >
                            {lang}
                          </span>
                        ))}
                      </div>

                      {/* Footer */}
                      <div className="flex items-center justify-between pt-4 border-t border-border">
                        <div>
                          <span className="text-xl font-bold text-foreground">₹{saathi.rate}</span>
                          <span className="text-sm text-muted-foreground">/hr</span>
                        </div>
                        <Button variant="default" size="sm" asChild>
                          <Link to={`/saathi/${saathi.id}`}>
                            View Profile
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Load More */}
              <div className="text-center mt-12">
                <Button variant="outline" size="lg">
                  Load More Saathis
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

export default Search;
