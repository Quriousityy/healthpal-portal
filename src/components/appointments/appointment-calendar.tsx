
import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/components/ui/use-toast";

interface AppointmentCalendarProps {
  doctorId: string;
  onClose: () => void;
}

const timeSlots = [
  "09:00 AM",
  "10:00 AM",
  "11:00 AM",
  "02:00 PM",
  "03:00 PM",
  "04:00 PM",
];

const AppointmentCalendar: React.FC<AppointmentCalendarProps> = ({
  doctorId,
  onClose,
}) => {
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [timeSlot, setTimeSlot] = useState<string>("");

  const handleBooking = () => {
    if (!date || !timeSlot) {
      toast({
        title: "Please select both date and time",
        variant: "destructive",
      });
      return;
    }

    // Mock booking API call
    console.log("Booking appointment:", {
      doctorId,
      date,
      timeSlot,
    });

    toast({
      title: "Appointment Booked!",
      description: `Your appointment has been scheduled for ${date.toLocaleDateString()} at ${timeSlot}`,
    });

    onClose();
  };

  return (
    <Card className="p-4">
      <h2 className="text-xl font-semibold mb-4">Schedule Appointment</h2>
      
      <div className="space-y-4">
        <div>
          <h3 className="text-sm font-medium mb-2">Select Date</h3>
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            className="rounded-md border"
            disabled={(date) => date < new Date() || date.getDay() === 0}
          />
        </div>

        {date && (
          <div>
            <h3 className="text-sm font-medium mb-2">Select Time</h3>
            <Select onValueChange={setTimeSlot} value={timeSlot}>
              <SelectTrigger>
                <SelectValue placeholder="Select time slot" />
              </SelectTrigger>
              <SelectContent>
                {timeSlots.map((slot) => (
                  <SelectItem key={slot} value={slot}>
                    {slot}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}

        <div className="flex justify-end space-x-2 pt-4">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleBooking} disabled={!date || !timeSlot}>
            Book Appointment
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default AppointmentCalendar;
