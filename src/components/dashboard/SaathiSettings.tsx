import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { 
  Settings, IndianRupee, Globe2, Tag, Save, Loader2, 
  CheckCircle2, XCircle
} from "lucide-react";
import AvailabilityManagement from "./AvailabilityManagement";
interface SaathiDetails {
  id: string;
  user_id: string;
  hourly_rate: number;
  bio: string | null;
  languages: string[];
  topics: string[];
  is_available: boolean;
  is_verified: boolean;
}

interface SaathiSettingsProps {
  userId: string;
}

const AVAILABLE_LANGUAGES = ["Hindi", "English", "Marathi", "Bengali", "Tamil", "Telugu", "Kannada", "Gujarati", "Punjabi", "Malayalam"];
const AVAILABLE_TOPICS = ["Life Advice", "Career Guidance", "Relationship Talk", "Mental Wellness", "Elder Care", "Tech Help", "Travel Stories", "Cooking & Recipes", "Spirituality", "General Conversations"];

const SaathiSettings = ({ userId }: SaathiSettingsProps) => {
  const [details, setDetails] = useState<SaathiDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [hourlyRate, setHourlyRate] = useState(299);
  const [bio, setBio] = useState("");
  const [languages, setLanguages] = useState<string[]>([]);
  const [topics, setTopics] = useState<string[]>([]);
  const [isAvailable, setIsAvailable] = useState(true);

  useEffect(() => {
    const fetchDetails = async () => {
      setLoading(true);
      
      const { data, error } = await supabase
        .from("saathi_details")
        .select("*")
        .eq("user_id", userId)
        .maybeSingle();

      if (error) {
        console.error("Error fetching saathi details:", error);
        toast.error("Failed to load settings");
      } else if (data) {
        setDetails(data);
        setHourlyRate(data.hourly_rate);
        setBio(data.bio || "");
        setLanguages(data.languages || []);
        setTopics(data.topics || []);
        setIsAvailable(data.is_available || true);
      }

      setLoading(false);
    };

    fetchDetails();
  }, [userId]);

  const handleSave = async () => {
    setSaving(true);

    try {
      const { error } = await supabase
        .from("saathi_details")
        .update({
          hourly_rate: hourlyRate,
          bio,
          languages,
          topics,
          is_available: isAvailable,
          updated_at: new Date().toISOString(),
        })
        .eq("user_id", userId);

      if (error) {
        console.error("Error updating saathi details:", error);
        toast.error("Failed to update settings");
      } else {
        toast.success("Settings updated successfully!");
      }
    } finally {
      setSaving(false);
    }
  };

  const toggleLanguage = (lang: string) => {
    setLanguages(prev => 
      prev.includes(lang) 
        ? prev.filter(l => l !== lang)
        : [...prev, lang]
    );
  };

  const toggleTopic = (topic: string) => {
    setTopics(prev => 
      prev.includes(topic) 
        ? prev.filter(t => t !== topic)
        : [...prev, topic]
    );
  };

  if (loading) {
    return (
      <Card>
        <CardContent className="p-8">
          <div className="animate-pulse space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-16 bg-muted rounded"></div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!details) {
    return (
      <Card>
        <CardContent className="p-8 text-center">
          <Settings className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-foreground mb-2">Saathi Profile Not Set Up</h3>
          <p className="text-muted-foreground">
            Your Saathi profile is being set up. Please refresh the page.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Verification Status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            {details.is_verified ? (
              <CheckCircle2 className="w-5 h-5 text-green-500" />
            ) : (
              <XCircle className="w-5 h-5 text-yellow-500" />
            )}
            Verification Status
          </CardTitle>
        </CardHeader>
        <CardContent>
          {details.is_verified ? (
            <div className="flex items-center gap-2">
              <Badge className="bg-green-100 text-green-800 border-green-200">Verified</Badge>
              <span className="text-sm text-muted-foreground">Your profile is verified and visible to seekers</span>
            </div>
          ) : (
            <div className="space-y-2">
              <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">Pending Verification</Badge>
              <p className="text-sm text-muted-foreground">
                Complete your profile and upload your government ID to get verified
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Availability Schedule */}
      <AvailabilityManagement saathiId={details.id} />

      {/* Availability & Pricing */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="w-5 h-5 text-primary" />
            Availability & Pricing
          </CardTitle>
          <CardDescription>
            Set your hourly rate and availability status
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <Label className="text-base">Available for Bookings</Label>
              <p className="text-sm text-muted-foreground">
                Toggle off if you're temporarily unavailable
              </p>
            </div>
            <Switch
              checked={isAvailable}
              onCheckedChange={setIsAvailable}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="hourlyRate" className="flex items-center gap-2">
              <IndianRupee className="w-4 h-4 text-muted-foreground" />
              Hourly Rate (₹)
            </Label>
            <Input
              id="hourlyRate"
              type="number"
              value={hourlyRate}
              onChange={(e) => setHourlyRate(parseInt(e.target.value) || 0)}
              min={99}
              max={9999}
            />
            <p className="text-xs text-muted-foreground">
              Minimum ₹99, Maximum ₹9999
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Bio */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe2 className="w-5 h-5 text-primary" />
            About You
          </CardTitle>
          <CardDescription>
            Tell seekers about yourself, your experience, and what conversations you enjoy
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            placeholder="I'm a retired teacher who loves sharing life experiences over chai..."
            rows={4}
          />
        </CardContent>
      </Card>

      {/* Languages */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe2 className="w-5 h-5 text-primary" />
            Languages
          </CardTitle>
          <CardDescription>
            Select the languages you're comfortable conversing in
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {AVAILABLE_LANGUAGES.map((lang) => (
              <Badge
                key={lang}
                variant={languages.includes(lang) ? "default" : "outline"}
                className={`cursor-pointer transition-all ${
                  languages.includes(lang) 
                    ? "bg-primary hover:bg-primary/90" 
                    : "hover:bg-primary/10"
                }`}
                onClick={() => toggleLanguage(lang)}
              >
                {languages.includes(lang) && <CheckCircle2 className="w-3 h-3 mr-1" />}
                {lang}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Topics */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Tag className="w-5 h-5 text-primary" />
            Conversation Topics
          </CardTitle>
          <CardDescription>
            Choose topics you enjoy discussing
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {AVAILABLE_TOPICS.map((topic) => (
              <Badge
                key={topic}
                variant={topics.includes(topic) ? "default" : "outline"}
                className={`cursor-pointer transition-all ${
                  topics.includes(topic) 
                    ? "bg-secondary text-secondary-foreground hover:bg-secondary/90" 
                    : "hover:bg-secondary/10"
                }`}
                onClick={() => toggleTopic(topic)}
              >
                {topics.includes(topic) && <CheckCircle2 className="w-3 h-3 mr-1" />}
                {topic}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button onClick={handleSave} disabled={saving} size="lg">
          {saving ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Saving...
            </>
          ) : (
            <>
              <Save className="w-4 h-4" />
              Save All Settings
            </>
          )}
        </Button>
      </div>
    </div>
  );
};

export default SaathiSettings;
