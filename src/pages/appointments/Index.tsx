
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { MapPin, Search, Calendar, Stethoscope } from "lucide-react";
import NetworkMap from "@/components/appointments/network-map";
import DoctorList from "@/components/appointments/doctor-list";
import AppointmentCalendar from "@/components/appointments/appointment-calendar";

const AppointmentsPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedHospital, setSelectedHospital] = useState<string | null>(null);
  const [selectedDoctor, setSelectedDoctor] = useState<string | null>(null);
  const [showCalendar, setShowCalendar] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock search functionality
    console.log("Searching for:", searchQuery);
  };

  return (
    <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-semibold mb-6">Book an Appointment</h1>

      <div className="grid gap-6 md:grid-cols-[1fr,300px]">
        <Card className="p-4">
          <form onSubmit={handleSearch} className="mb-6">
            <div className="flex gap-2">
              <Input
                placeholder="Search by treatment, hospital, or doctor"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1"
              />
              <Button type="submit">
                <Search className="mr-2 h-4 w-4" />
                Search
              </Button>
            </div>
          </form>

          <NetworkMap onHospitalSelect={setSelectedHospital} />
        </Card>

        <div className="space-y-4">
          {selectedHospital && !selectedDoctor && (
            <DoctorList
              hospitalId={selectedHospital}
              onDoctorSelect={(doctorId) => {
                setSelectedDoctor(doctorId);
                setShowCalendar(true);
              }}
            />
          )}

          {showCalendar && selectedDoctor && (
            <AppointmentCalendar
              doctorId={selectedDoctor}
              onClose={() => {
                setShowCalendar(false);
                setSelectedDoctor(null);
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default AppointmentsPage;
