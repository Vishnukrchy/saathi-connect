import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, MapPin, User, MessageSquare } from "lucide-react";
import { format } from "date-fns";

interface Booking {
  id: string;
  booking_date: string;
  start_time: string;
  end_time: string;
  duration_hours: number;
  total_amount: number;
  status: string;
  payment_status: string;
  meeting_location: string | null;
  notes: string | null;
  created_at: string;
  saathi_id: string;
  seeker_id: string;
  saathi_name?: string;
  seeker_name?: string;
}
interface BookingHistoryProps {
  userRole: "seeker" | "saathi" | "admin" | null;
  userId: string;
}

const statusColors: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
  confirmed: "bg-blue-100 text-blue-800 border-blue-200",
  completed: "bg-green-100 text-green-800 border-green-200",
  cancelled: "bg-red-100 text-red-800 border-red-200",
};

const paymentStatusColors: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
  paid: "bg-green-100 text-green-800 border-green-200",
  refunded: "bg-purple-100 text-purple-800 border-purple-200",
  failed: "bg-red-100 text-red-800 border-red-200",
};

const BookingHistory = ({ userRole, userId }: BookingHistoryProps) => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      setLoading(true);
      
      try {
        // Fetch bookings based on role
        const { data: bookingsData, error } = await supabase
          .from("bookings")
          .select("*")
          .order("booking_date", { ascending: false });

        if (error) {
          console.error("Error fetching bookings:", error);
          return;
        }

        if (!bookingsData) {
          setBookings([]);
          return;
        }

        // Fetch profile names for each booking
        const bookingsWithNames = await Promise.all(
          bookingsData.map(async (booking) => {
            // Get saathi profile
            const { data: saathiDetails } = await supabase
              .from("saathi_details")
              .select("user_id")
              .eq("id", booking.saathi_id)
              .maybeSingle();

            let saathiName = "Unknown Saathi";
            if (saathiDetails?.user_id) {
              const { data: saathiProfile } = await supabase
                .from("profiles")
                .select("full_name")
                .eq("user_id", saathiDetails.user_id)
                .maybeSingle();
              saathiName = saathiProfile?.full_name || "Unknown Saathi";
            }

            // Get seeker profile
            const { data: seekerProfile } = await supabase
              .from("profiles")
              .select("full_name")
              .eq("user_id", booking.seeker_id)
              .maybeSingle();

            return {
              ...booking,
              saathi_name: saathiName,
              seeker_name: seekerProfile?.full_name || "Unknown Seeker",
            };
          })
        );

        setBookings(bookingsWithNames);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [userId, userRole]);

  const formatTime = (time: string) => {
    const [hours, minutes] = time.split(":");
    const date = new Date();
    date.setHours(parseInt(hours), parseInt(minutes));
    return format(date, "h:mm a");
  };

  if (loading) {
    return (
      <Card>
        <CardContent className="p-8">
          <div className="animate-pulse space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-24 bg-muted rounded-lg"></div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (bookings.length === 0) {
    return (
      <Card>
        <CardContent className="p-8 text-center">
          <Calendar className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-foreground mb-2">No bookings yet</h3>
          <p className="text-muted-foreground mb-4">
            {userRole === "seeker" 
              ? "Start by finding a Saathi to connect with!" 
              : "Bookings will appear here once seekers book your time."
            }
          </p>
          {userRole === "seeker" && (
            <Button asChild>
              <a href="/search">Find a Saathi</a>
            </Button>
          )}
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-primary" />
            Your Bookings
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y divide-border">
            {bookings.map((booking) => (
              <div key={booking.id} className="p-4 hover:bg-muted/50 transition-colors">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <User className="w-4 h-4 text-muted-foreground" />
                      <span className="font-medium text-foreground">
                        {userRole === "seeker" 
                          ? `Saathi: ${booking.saathi_name}` 
                          : `Seeker: ${booking.seeker_name}`
                        }
                      </span>
                    </div>
                    
                    <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {format(new Date(booking.booking_date), "MMM d, yyyy")}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {formatTime(booking.start_time)} - {formatTime(booking.end_time)}
                      </div>
                      {booking.meeting_location && (
                        <div className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          {booking.meeting_location}
                        </div>
                      )}
                    </div>

                    {booking.notes && (
                      <div className="flex items-start gap-1 mt-2 text-sm text-muted-foreground">
                        <MessageSquare className="w-4 h-4 mt-0.5" />
                        <span className="line-clamp-1">{booking.notes}</span>
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col sm:items-end gap-2">
                    <div className="flex items-center gap-2">
                      <Badge className={statusColors[booking.status]}>
                        {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                      </Badge>
                      <Badge className={paymentStatusColors[booking.payment_status]}>
                        {booking.payment_status === "paid" ? "Paid" : booking.payment_status}
                      </Badge>
                    </div>
                    <span className="text-lg font-semibold text-foreground">
                      ₹{booking.total_amount}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BookingHistory;
