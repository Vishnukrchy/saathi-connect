import { useState } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import TimeSlotPicker from "./TimeSlotPicker";
import BookingCheckout from "./BookingCheckout";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  saathiId: string;
  saathiName: string;
  saathiImage: string;
  hourlyRate: number;
  availability: Record<string, string[]>;
}

type BookingStep = "select-slot" | "checkout";

interface SelectedSlot {
  date: Date;
  slot: string;
  duration: number;
}

const BookingModal = ({
  isOpen,
  onClose,
  saathiId,
  saathiName,
  saathiImage,
  hourlyRate,
  availability,
}: BookingModalProps) => {
  const [step, setStep] = useState<BookingStep>("select-slot");
  const [selectedSlot, setSelectedSlot] = useState<SelectedSlot | null>(null);

  if (!isOpen) return null;

  const handleSlotSelect = (date: Date, slot: string, duration: number) => {
    setSelectedSlot({ date, slot, duration });
    setStep("checkout");
  };

  const handleBack = () => {
    setStep("select-slot");
  };

  const handleClose = () => {
    setStep("select-slot");
    setSelectedSlot(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-background/80 backdrop-blur-sm"
        onClick={handleClose}
      />
      
      {/* Modal */}
      <div className="relative bg-card rounded-2xl shadow-xl w-full max-w-md mx-4 max-h-[90vh] overflow-hidden animate-in fade-in zoom-in-95">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div>
            <h2 className="text-xl font-bold text-foreground">
              {step === "select-slot" ? "Book a Session" : "Checkout"}
            </h2>
            <p className="text-sm text-muted-foreground">
              {step === "select-slot" ? `with ${saathiName}` : "Complete your booking"}
            </p>
          </div>
          <Button variant="ghost" size="icon" onClick={handleClose}>
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-100px)]">
          {step === "select-slot" ? (
            <TimeSlotPicker
              availability={availability}
              hourlyRate={hourlyRate}
              onSlotSelect={handleSlotSelect}
            />
          ) : selectedSlot ? (
            <BookingCheckout
              saathiId={saathiId}
              saathiName={saathiName}
              saathiImage={saathiImage}
              date={selectedSlot.date}
              slot={selectedSlot.slot}
              duration={selectedSlot.duration}
              hourlyRate={hourlyRate}
              onBack={handleBack}
            />
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default BookingModal;
