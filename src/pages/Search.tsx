import { useState, useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { 
  Search as SearchIcon, MapPin, Star, Filter, Grid, List,
  ChevronDown, X, Clock, Heart, Loader2
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
import { supabase } from "@/integrations/supabase/client";
import { AVAILABLE_CITIES } from "@/components/dashboard/ProfileManagement";

interface SaathiResult {
  id: string;
  name: string;
  location: string;
  rating: number;
  reviews: number;
  topics: string[];
  rate: number;
  bio: string;
  image: string;
  available: boolean;
  languages: string[];
}

const topics = ["All Topics", "Life Advice", "Career Guidance", "Relationship Talk", "Mental Wellness", "Elder Care", "Tech Help", "Travel Stories", "Cooking & Recipes", "Spirituality", "General Conversations"];
const cities = ["All Cities", ...AVAILABLE_CITIES];

const Search = () => {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [selectedTopic, setSelectedTopic] = useState("All Topics");
  const [selectedCity, setSelectedCity] = useState("All Cities");
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [showFilters, setShowFilters] = useState(false);
  const [saathis, setSaathis] = useState<SaathiResult[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchSaathis = async () => {
      setLoading(true);
      try {
        // Fetch all available saathis with their profile info
        const { data: saathiDetails, error } = await supabase
          .from("saathi_details")
          .select("*")
          .eq("is_available", true);

        if (error) {
          console.error("Error fetching saathis:", error);
          return;
        }

        if (!saathiDetails || saathiDetails.length === 0) {
          setSaathis([]);
          setLoading(false);
          return;
        }

        // Fetch profiles for all saathis
        const userIds = saathiDetails.map(s => s.user_id);
        const { data: profiles } = await supabase
          .from("profiles")
          .select("*")
          .in("user_id", userIds);

        // Combine data
        const results: SaathiResult[] = saathiDetails.map(saathi => {
          const profile = profiles?.find(p => p.user_id === saathi.user_id);
          return {
            id: saathi.id,
            name: profile?.full_name || "Saathi",
            location: profile?.city || "India",
            rating: 4.8,
            reviews: 0,
            topics: saathi.topics || [],
            rate: saathi.hourly_rate,
            bio: saathi.bio || profile?.bio || "Friendly companion ready for meaningful conversations.",
            image: profile?.avatar_url || `https://api.dicebear.com/7.x/avataaars/svg?seed=${saathi.id}`,
            available: saathi.is_available || true,
            languages: saathi.languages || ["Hindi", "English"],
          };
        });

        setSaathis(results);
      } catch (err) {
        console.error("Error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchSaathis();
  }, []);

  // Filter saathis based on selected filters
  const filteredSaathis = saathis.filter(saathi => {
    // City filter - case insensitive match
    if (selectedCity !== "All Cities") {
      const saathiCity = saathi.location.toLowerCase().trim();
      const filterCity = selectedCity.toLowerCase().trim();
      if (saathiCity !== filterCity && !saathiCity.includes(filterCity)) {
        return false;
      }
    }
    // Topic filter - case insensitive
    if (selectedTopic !== "All Topics") {
      const hasMatchingTopic = saathi.topics.some(t => 
        t.toLowerCase().trim() === selectedTopic.toLowerCase().trim() ||
        t.toLowerCase().includes(selectedTopic.toLowerCase())
      );
      if (!hasMatchingTopic) {
        return false;
      }
    }
    // Price filter
    if (saathi.rate < priceRange[0] || saathi.rate > priceRange[1]) {
      return false;
    }
    // Search query - case insensitive
    if (searchQuery) {
      const query = searchQuery.toLowerCase().trim();
      const matchesName = saathi.name.toLowerCase().includes(query);
      const matchesLocation = saathi.location.toLowerCase().includes(query);
      const matchesTopic = saathi.topics.some(t => t.toLowerCase().includes(query));
      if (!matchesName && !matchesLocation && !matchesTopic) {
        return false;
      }
    }
    return true;
  });

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
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
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
                  {loading ? "Loading..." : (
                    <>Showing <span className="font-semibold text-foreground">{filteredSaathis.length}</span> Saathis</>
                  )}
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
              {loading ? (
                <div className="col-span-full flex items-center justify-center py-20">
                  <Loader2 className="w-8 h-8 animate-spin text-primary" />
                </div>
              ) : filteredSaathis.length === 0 ? (
                <div className="col-span-full text-center py-20">
                  <p className="text-muted-foreground text-lg mb-2">No Saathis found</p>
                  <p className="text-sm text-muted-foreground">Try adjusting your filters or check back later</p>
                </div>
              ) : (
              <div className={`grid gap-6 ${viewMode === "grid" ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"}`}>
                {filteredSaathis.map((saathi, index) => (
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
              )}

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
