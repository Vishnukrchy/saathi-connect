import { useState } from "react";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import { CreditCard, MapPin, Clock, User, Shield, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface BookingCheckoutProps {
  saathiId: string;
  saathiName: string;
  saathiImage: string;
  date: Date;
  slot: string;
  duration: number;
  hourlyRate: number;
  onBack: () => void;
}

const BookingCheckout = ({
  saathiId,
  saathiName,
  saathiImage,
  date,
  slot,
  duration,
  hourlyRate,
  onBack,
}: BookingCheckoutProps) => {
  const [meetingLocation, setMeetingLocation] = useState("");
  const [notes, setNotes] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const totalAmount = hourlyRate * duration;
  const platformFee = Math.round(totalAmount * 0.1); // 10% platform fee
  const grandTotal = totalAmount + platformFee;

  // Parse slot time to get start and end times
  const parseSlotTime = (slot: string): { startTime: string; endTime: string } => {
    // Slot format: "10:00 AM - 12:00 PM"
    const parts = slot.split(" - ");
    const startTime = parts[0] || "10:00 AM";
    
    // Convert to 24-hour format for database
    const convert12to24 = (time12: string): string => {
      const [time, modifier] = time12.split(" ");
      let [hours, minutes] = time.split(":");
      let hoursNum = parseInt(hours, 10);
      
      if (modifier === "PM" && hoursNum !== 12) {
        hoursNum += 12;
      } else if (modifier === "AM" && hoursNum === 12) {
        hoursNum = 0;
      }
      
      return `${hoursNum.toString().padStart(2, "0")}:${minutes}:00`;
    };

    const startTime24 = convert12to24(startTime);
    
    // Calculate end time based on duration
    const startHours = parseInt(startTime24.split(":")[0], 10);
    const endHours = startHours + duration;
    const endTime24 = `${endHours.toString().padStart(2, "0")}:00:00`;

    return { startTime: startTime24, endTime: endTime24 };
  };

  const handlePayment = async () => {
    if (!meetingLocation.trim()) {
      toast({
        title: "Meeting location required",
        description: "Please enter a meeting location",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);

    try {
      // Get current user
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        toast({
          title: "Please log in",
          description: "You need to be logged in to make a booking",
          variant: "destructive",
        });
        navigate("/auth");
        return;
      }

      const { startTime, endTime } = parseSlotTime(slot);

      // Mock payment processing (simulating a successful payment)
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Create booking in database
      const { error } = await supabase.from("bookings").insert({
        saathi_id: saathiId,
        seeker_id: user.id,
        booking_date: format(date, "yyyy-MM-dd"),
        start_time: startTime,
        end_time: endTime,
        duration_hours: duration,
        total_amount: grandTotal,
        meeting_location: meetingLocation,
        notes: notes || null,
        status: "confirmed",
        payment_status: "paid",
        stripe_payment_intent_id: `mock_pi_${Date.now()}`, // Mock payment intent
      });

      if (error) throw error;

      toast({
        title: "Booking Confirmed! 🎉",
        description: `Your session with ${saathiName} is confirmed for ${format(date, "MMMM d, yyyy")}`,
      });

      navigate("/dashboard");
    } catch (error: any) {
      console.error("Booking error:", error);
      toast({
        title: "Booking failed",
        description: error.message || "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Booking Summary */}
      <div className="bg-muted rounded-xl p-4">
        <div className="flex items-start gap-4">
          <img
            src={saathiImage}
            alt={saathiName}
            className="w-16 h-16 rounded-xl object-cover"
          />
          <div className="flex-1">
            <h4 className="font-semibold text-foreground">{saathiName}</h4>
            <p className="text-sm text-muted-foreground">
              {format(date, "EEEE, MMMM d, yyyy")}
            </p>
            <p className="text-sm text-muted-foreground flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {slot} • {duration} hour{duration > 1 ? "s" : ""}
            </p>
          </div>
        </div>
      </div>

      {/* Meeting Location */}
      <div className="space-y-2">
        <Label htmlFor="location" className="flex items-center gap-2">
          <MapPin className="w-4 h-4" />
          Meeting Location
        </Label>
        <Input
          id="location"
          placeholder="e.g., Cafe Coffee Day, Linking Road, Bandra"
          value={meetingLocation}
          onChange={(e) => setMeetingLocation(e.target.value)}
        />
        <p className="text-xs text-muted-foreground">
          Choose a public place like a cafe, park, or restaurant
        </p>
      </div>

      {/* Notes */}
      <div className="space-y-2">
        <Label htmlFor="notes" className="flex items-center gap-2">
          <User className="w-4 h-4" />
          Notes for Saathi (Optional)
        </Label>
        <Textarea
          id="notes"
          placeholder="Any specific topics you'd like to discuss or things the Saathi should know..."
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          rows={3}
        />
      </div>

      {/* Price Breakdown */}
      <div className="bg-muted rounded-xl p-4 space-y-3">
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">
            ₹{hourlyRate} × {duration} hour{duration > 1 ? "s" : ""}
          </span>
          <span className="text-foreground">₹{totalAmount}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Platform fee</span>
          <span className="text-foreground">₹{platformFee}</span>
        </div>
        <div className="border-t border-border pt-3 flex justify-between">
          <span className="font-semibold text-foreground">Total</span>
          <span className="font-bold text-foreground text-xl">₹{grandTotal}</span>
        </div>
      </div>

      {/* Security Notice */}
      <div className="flex items-start gap-3 p-4 bg-secondary/10 rounded-xl">
        <Shield className="w-5 h-5 text-secondary mt-0.5" />
        <div className="text-sm">
          <p className="font-medium text-foreground">Secure Payment</p>
          <p className="text-muted-foreground">
            Your payment is protected. Full refund if the Saathi cancels.
          </p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3">
        <Button variant="outline" className="flex-1" onClick={onBack} disabled={isProcessing}>
          Back
        </Button>
        <Button variant="hero" className="flex-1" onClick={handlePayment} disabled={isProcessing}>
          {isProcessing ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Processing...
            </>
          ) : (
            <>
              <CreditCard className="w-4 h-4" />
              Pay ₹{grandTotal}
            </>
          )}
        </Button>
      </div>

      {/* Test Mode Notice */}
      <p className="text-xs text-center text-muted-foreground">
        🧪 Test Mode: No real payment will be processed
      </p>
    </div>
  );
};

export default BookingCheckout;
