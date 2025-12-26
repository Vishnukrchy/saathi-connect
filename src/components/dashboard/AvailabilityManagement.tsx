import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { Clock, Plus, Trash2, Loader2, Calendar } from "lucide-react";

interface AvailabilitySlot {
  id: string;
  saathi_id: string;
  day_of_week: number;
  start_time: string;
  end_time: string;
}

interface AvailabilityManagementProps {
  saathiId: string;
}

const DAYS_OF_WEEK = [
  { value: 0, label: "Sunday" },
  { value: 1, label: "Monday" },
  { value: 2, label: "Tuesday" },
  { value: 3, label: "Wednesday" },
  { value: 4, label: "Thursday" },
  { value: 5, label: "Friday" },
  { value: 6, label: "Saturday" },
];

const TIME_SLOTS = Array.from({ length: 24 }, (_, i) => {
  const hour = i.toString().padStart(2, "0");
  return { value: `${hour}:00:00`, label: `${hour}:00` };
});

const AvailabilityManagement = ({ saathiId }: AvailabilityManagementProps) => {
  const [slots, setSlots] = useState<AvailabilitySlot[]>([]);
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const [newDay, setNewDay] = useState<number>(1);
  const [newStartTime, setNewStartTime] = useState("09:00:00");
  const [newEndTime, setNewEndTime] = useState("17:00:00");

  useEffect(() => {
    fetchSlots();
  }, [saathiId]);

  const fetchSlots = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("availability_slots")
      .select("*")
      .eq("saathi_id", saathiId)
      .order("day_of_week", { ascending: true })
      .order("start_time", { ascending: true });

    if (error) {
      console.error("Error fetching slots:", error);
      toast.error("Failed to load availability slots");
    } else {
      setSlots(data || []);
    }
    setLoading(false);
  };

  const handleAddSlot = async () => {
    if (newStartTime >= newEndTime) {
      toast.error("End time must be after start time");
      return;
    }

    // Check for overlapping slots
    const overlapping = slots.some(
      (slot) =>
        slot.day_of_week === newDay &&
        ((newStartTime >= slot.start_time && newStartTime < slot.end_time) ||
          (newEndTime > slot.start_time && newEndTime <= slot.end_time) ||
          (newStartTime <= slot.start_time && newEndTime >= slot.end_time))
    );

    if (overlapping) {
      toast.error("This slot overlaps with an existing slot");
      return;
    }

    setAdding(true);
    const { error } = await supabase.from("availability_slots").insert({
      saathi_id: saathiId,
      day_of_week: newDay,
      start_time: newStartTime,
      end_time: newEndTime,
    });

    if (error) {
      console.error("Error adding slot:", error);
      toast.error("Failed to add slot");
    } else {
      toast.success("Availability slot added");
      fetchSlots();
    }
    setAdding(false);
  };

  const handleDeleteSlot = async (slotId: string) => {
    setDeletingId(slotId);
    const { error } = await supabase
      .from("availability_slots")
      .delete()
      .eq("id", slotId);

    if (error) {
      console.error("Error deleting slot:", error);
      toast.error("Failed to delete slot");
    } else {
      toast.success("Slot removed");
      setSlots(slots.filter((s) => s.id !== slotId));
    }
    setDeletingId(null);
  };

  const formatTime = (time: string) => {
    return time.slice(0, 5);
  };

  const getDayLabel = (dayOfWeek: number) => {
    return DAYS_OF_WEEK.find((d) => d.value === dayOfWeek)?.label || "";
  };

  const groupedSlots = DAYS_OF_WEEK.map((day) => ({
    ...day,
    slots: slots.filter((s) => s.day_of_week === day.value),
  })).filter((day) => day.slots.length > 0);

  if (loading) {
    return (
      <Card>
        <CardContent className="p-8">
          <div className="flex items-center justify-center gap-2">
            <Loader2 className="w-5 h-5 animate-spin text-primary" />
            <span className="text-muted-foreground">Loading availability...</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="w-5 h-5 text-primary" />
          Availability Schedule
        </CardTitle>
        <CardDescription>
          Set your weekly availability for bookings. Seekers can only book during these time slots.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Add New Slot Form */}
        <div className="p-4 bg-muted/50 rounded-lg border border-border">
          <h4 className="font-medium text-foreground mb-4 flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Add New Time Slot
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <Select
              value={newDay.toString()}
              onValueChange={(v) => setNewDay(parseInt(v))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Day" />
              </SelectTrigger>
              <SelectContent>
                {DAYS_OF_WEEK.map((day) => (
                  <SelectItem key={day.value} value={day.value.toString()}>
                    {day.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={newStartTime} onValueChange={setNewStartTime}>
              <SelectTrigger>
                <SelectValue placeholder="Start Time" />
              </SelectTrigger>
              <SelectContent>
                {TIME_SLOTS.map((time) => (
                  <SelectItem key={time.value} value={time.value}>
                    {time.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={newEndTime} onValueChange={setNewEndTime}>
              <SelectTrigger>
                <SelectValue placeholder="End Time" />
              </SelectTrigger>
              <SelectContent>
                {TIME_SLOTS.map((time) => (
                  <SelectItem key={time.value} value={time.value}>
                    {time.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Button onClick={handleAddSlot} disabled={adding} className="w-full">
              {adding ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <>
                  <Plus className="w-4 h-4" />
                  Add Slot
                </>
              )}
            </Button>
          </div>
        </div>

        {/* Current Slots */}
        <div className="space-y-4">
          <h4 className="font-medium text-foreground flex items-center gap-2">
            <Clock className="w-4 h-4 text-muted-foreground" />
            Your Weekly Schedule
          </h4>

          {groupedSlots.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <Calendar className="w-12 h-12 mx-auto mb-3 opacity-50" />
              <p>No availability slots set yet.</p>
              <p className="text-sm">Add your first time slot above to start receiving bookings.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {groupedSlots.map((day) => (
                <div
                  key={day.value}
                  className="flex flex-wrap items-center gap-2 p-3 bg-background border border-border rounded-lg"
                >
                  <Badge variant="outline" className="font-semibold min-w-[100px] justify-center">
                    {day.label}
                  </Badge>
                  <div className="flex flex-wrap gap-2">
                    {day.slots.map((slot) => (
                      <div
                        key={slot.id}
                        className="flex items-center gap-2 px-3 py-1.5 bg-primary/10 text-primary rounded-full text-sm"
                      >
                        <Clock className="w-3 h-3" />
                        <span>
                          {formatTime(slot.start_time)} - {formatTime(slot.end_time)}
                        </span>
                        <button
                          onClick={() => handleDeleteSlot(slot.id)}
                          disabled={deletingId === slot.id}
                          className="ml-1 text-destructive hover:text-destructive/80 transition-colors"
                        >
                          {deletingId === slot.id ? (
                            <Loader2 className="w-3 h-3 animate-spin" />
                          ) : (
                            <Trash2 className="w-3 h-3" />
                          )}
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default AvailabilityManagement;
