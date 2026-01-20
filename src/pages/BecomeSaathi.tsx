import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Heart, Users, Calendar, Shield, ArrowRight } from "lucide-react";

const topics = [
  "Temple Visits",
  "Hospital Visits",
  "Shopping",
  "Walking",
  "Conversation",
  "Technology Help",
  "Government Offices",
  "Bank Visits",
  "Travel Companion",
  "Event Companion",
];

const BecomeSaathi = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    bio: "",
    location: "",
    hourlyRate: "",
    selectedTopics: [] as string[],
    experience: "",
    languages: "",
  });

  const handleTopicToggle = (topic: string) => {
    setFormData(prev => ({
      ...prev,
      selectedTopics: prev.selectedTopics.includes(topic)
        ? prev.selectedTopics.filter(t => t !== topic)
        : [...prev.selectedTopics, topic],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast({
        title: "Please login first",
        description: "You need to be logged in to become a Saathi",
        variant: "destructive",
      });
      navigate("/auth");
      return;
    }

    if (formData.selectedTopics.length === 0) {
      toast({
        title: "Select at least one topic",
        description: "Please select the services you can offer",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      // Check if already a saathi
      const { data: existing } = await supabase
        .from("saathi_details")
        .select("id")
        .eq("user_id", user.id)
        .maybeSingle();

      if (existing) {
        toast({
          title: "Already registered",
          description: "You are already registered as a Saathi",
        });
        navigate("/dashboard");
        return;
      }

      // Create saathi profile
      const { error } = await supabase.from("saathi_details").insert({
        user_id: user.id,
        bio: formData.bio,
        location: formData.location,
        hourly_rate: parseFloat(formData.hourlyRate) || 200,
        topics: formData.selectedTopics,
        languages: formData.languages.split(",").map(l => l.trim()).filter(Boolean),
        is_available: true,
        is_verified: false,
        rating: 0,
        total_reviews: 0,
      });

      if (error) throw error;

      toast({
        title: "Welcome to Saathi!",
        description: "Your profile has been created. Complete your profile in the dashboard.",
      });
      navigate("/dashboard");
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to create Saathi profile",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Become a Saathi | Join Our Community</title>
        <meta name="description" content="Join Saathi as a companion and help seniors with their daily activities." />
      </Helmet>
      
      <div className="min-h-screen flex flex-col bg-background">
        <Navbar />
        
        <main className="flex-grow">
          {/* Hero Section */}
          <section className="bg-gradient-to-br from-primary/10 via-background to-secondary/10 py-16">
            <div className="container mx-auto px-4 text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                Become a Saathi
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Make a difference in seniors' lives while earning. Join our community of caring companions.
              </p>
            </div>
          </section>

          {/* Benefits Section */}
          <section className="py-12 bg-muted/30">
            <div className="container mx-auto px-4">
              <div className="grid md:grid-cols-4 gap-6">
                <div className="flex flex-col items-center text-center p-6">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <Heart className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">Meaningful Work</h3>
                  <p className="text-sm text-muted-foreground">Make a real impact in seniors' lives</p>
                </div>
                <div className="flex flex-col items-center text-center p-6">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <Calendar className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">Flexible Schedule</h3>
                  <p className="text-sm text-muted-foreground">Work when it suits you</p>
                </div>
                <div className="flex flex-col items-center text-center p-6">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <Users className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">Growing Community</h3>
                  <p className="text-sm text-muted-foreground">Join hundreds of Saathis</p>
                </div>
                <div className="flex flex-col items-center text-center p-6">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <Shield className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">Safe Platform</h3>
                  <p className="text-sm text-muted-foreground">Verified users & secure payments</p>
                </div>
              </div>
            </div>
          </section>

          {/* Registration Form */}
          <section className="py-12">
            <div className="container mx-auto px-4 max-w-2xl">
              <Card>
                <CardHeader>
                  <CardTitle>Register as a Saathi</CardTitle>
                  <CardDescription>
                    Fill in your details to start helping seniors in your community
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="bio">About You</Label>
                      <Textarea
                        id="bio"
                        placeholder="Tell us about yourself and why you want to become a Saathi..."
                        value={formData.bio}
                        onChange={(e) => setFormData(prev => ({ ...prev, bio: e.target.value }))}
                        required
                        rows={4}
                      />
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="location">Your City</Label>
                        <Input
                          id="location"
                          placeholder="e.g., Mumbai, Delhi"
                          value={formData.location}
                          onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="hourlyRate">Hourly Rate (₹)</Label>
                        <Input
                          id="hourlyRate"
                          type="number"
                          placeholder="e.g., 200"
                          value={formData.hourlyRate}
                          onChange={(e) => setFormData(prev => ({ ...prev, hourlyRate: e.target.value }))}
                          required
                          min="100"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="languages">Languages (comma separated)</Label>
                      <Input
                        id="languages"
                        placeholder="e.g., Hindi, English, Marathi"
                        value={formData.languages}
                        onChange={(e) => setFormData(prev => ({ ...prev, languages: e.target.value }))}
                        required
                      />
                    </div>

                    <div className="space-y-3">
                      <Label>Services You Can Offer</Label>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                        {topics.map((topic) => (
                          <div
                            key={topic}
                            className="flex items-center space-x-2"
                          >
                            <Checkbox
                              id={topic}
                              checked={formData.selectedTopics.includes(topic)}
                              onCheckedChange={() => handleTopicToggle(topic)}
                            />
                            <label
                              htmlFor={topic}
                              className="text-sm cursor-pointer"
                            >
                              {topic}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>

                    <Button type="submit" className="w-full" disabled={loading}>
                      {loading ? "Creating Profile..." : "Become a Saathi"}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default BecomeSaathi;
