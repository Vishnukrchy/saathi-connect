import { useState } from "react";
import { format, addDays, isSameDay } from "date-fns";
import { Calendar, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface TimeSlotPickerProps {
  availability: Record<string, string[]>;
  hourlyRate: number;
  onSlotSelect: (date: Date, slot: string, duration: number) => void;
}

const dayNames = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];

const TimeSlotPicker = ({ availability, hourlyRate, onSlotSelect }: TimeSlotPickerProps) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [duration, setDuration] = useState<number>(1);

  // Generate next 7 days
  const dates = Array.from({ length: 7 }, (_, i) => addDays(new Date(), i));

  const getAvailableSlotsForDate = (date: Date): string[] => {
    const dayName = dayNames[date.getDay()];
    return availability[dayName] || [];
  };

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
    setSelectedSlot(null);
  };

  const handleSlotSelect = (slot: string) => {
    setSelectedSlot(slot);
  };

  const handleContinue = () => {
    if (selectedDate && selectedSlot) {
      onSlotSelect(selectedDate, selectedSlot, duration);
    }
  };

  const totalAmount = hourlyRate * duration;

  return (
    <div className="space-y-6">
      {/* Date Selection */}
      <div>
        <h3 className="text-sm font-medium text-foreground mb-3 flex items-center gap-2">
          <Calendar className="w-4 h-4" />
          Select Date
        </h3>
        <div className="grid grid-cols-7 gap-2">
          {dates.map((date) => {
            const slots = getAvailableSlotsForDate(date);
            const isAvailable = slots.length > 0;
            const isSelected = selectedDate && isSameDay(date, selectedDate);

            return (
              <button
                key={date.toISOString()}
                onClick={() => isAvailable && handleDateSelect(date)}
                disabled={!isAvailable}
                className={cn(
                  "flex flex-col items-center p-3 rounded-xl transition-all",
                  isAvailable
                    ? isSelected
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted hover:bg-muted/80 text-foreground"
                    : "bg-muted/50 text-muted-foreground cursor-not-allowed opacity-50"
                )}
              >
                <span className="text-xs uppercase">{format(date, "EEE")}</span>
                <span className="text-lg font-bold">{format(date, "d")}</span>
                <span className="text-xs">{format(date, "MMM")}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Time Slot Selection */}
      {selectedDate && (
        <div className="animate-in fade-in slide-in-from-top-2">
          <h3 className="text-sm font-medium text-foreground mb-3 flex items-center gap-2">
            <Clock className="w-4 h-4" />
            Select Time Slot
          </h3>
          <div className="grid grid-cols-2 gap-2">
            {getAvailableSlotsForDate(selectedDate).map((slot) => (
              <button
                key={slot}
                onClick={() => handleSlotSelect(slot)}
                className={cn(
                  "px-4 py-3 rounded-xl text-sm font-medium transition-all",
                  selectedSlot === slot
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted hover:bg-muted/80 text-foreground"
                )}
              >
                {slot}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Duration Selection */}
      {selectedSlot && (
        <div className="animate-in fade-in slide-in-from-top-2">
          <h3 className="text-sm font-medium text-foreground mb-3">Session Duration</h3>
          <div className="grid grid-cols-3 gap-2">
            {[1, 2, 3].map((hrs) => (
              <button
                key={hrs}
                onClick={() => setDuration(hrs)}
                className={cn(
                  "px-4 py-3 rounded-xl text-sm font-medium transition-all",
                  duration === hrs
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted hover:bg-muted/80 text-foreground"
                )}
              >
                {hrs} hour{hrs > 1 ? "s" : ""}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Summary & Continue */}
      {selectedSlot && (
        <div className="animate-in fade-in slide-in-from-top-2 pt-4 border-t border-border">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-sm text-muted-foreground">Total Amount</p>
              <p className="text-2xl font-bold text-foreground">₹{totalAmount}</p>
            </div>
            <div className="text-right text-sm text-muted-foreground">
              <p>{format(selectedDate!, "EEEE, MMMM d")}</p>
              <p>{selectedSlot}</p>
              <p>{duration} hour{duration > 1 ? "s" : ""}</p>
            </div>
          </div>
          <Button variant="hero" className="w-full" onClick={handleContinue}>
            Continue to Checkout
          </Button>
        </div>
      )}
    </div>
  );
};

export default TimeSlotPicker;
