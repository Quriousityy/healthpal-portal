
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { MapPin, Search, Calendar, Stethoscope } from "lucide-react";
import NetworkMap from "@/components/appointments/network-map";
import DoctorList from "@/components/appointments/doctor-list";
import AppointmentCalendar from "@/components/appointments/appointment-calendar";
import { toast } from "@/hooks/use-toast";

const AppointmentsPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedHospital, setSelectedHospital] = useState<string | null>(null);
  const [selectedDoctor, setSelectedDoctor] = useState<string | null>(null);
  const [showCalendar, setShowCalendar] = useState(false);
  const [submittedQuery, setSubmittedQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmittedQuery(searchQuery);
    
    // Reset selections if we're doing a new search
    if (selectedHospital || selectedDoctor) {
      setSelectedHospital(null);
      setSelectedDoctor(null);
      setShowCalendar(false);
      
      toast({
        title: "Search Updated",
        description: `Searching for "${searchQuery}"`,
      });
    }
  };

  // Reset submitted query when hospital is deselected
  useEffect(() => {
    if (!selectedHospital) {
      setSubmittedQuery(searchQuery);
    }
  }, [selectedHospital, searchQuery]);

  const handleHospitalSelect = (hospitalId: string) => {
    setSelectedHospital(hospitalId);
    toast({
      title: "Hospital Selected",
      description: "Now you can choose a doctor.",
    });
  };

  const handleBackToHospitals = () => {
    setSelectedHospital(null);
    setSelectedDoctor(null);
    setShowCalendar(false);
  };

  return (
    <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-semibold mb-6">Book an Appointment</h1>

      <div className="grid gap-6 md:grid-cols-[1fr,300px]">
        <Card className="p-4">
          <form onSubmit={handleSearch} className="mb-6">
            <div className="flex gap-2">
              <Input
                placeholder="Search by treatment, specialty, or hospital name"
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

          {selectedHospital ? (
            <div>
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-xl font-semibold">Select a Doctor</h2>
                <Button 
                  variant="outline" 
                  onClick={handleBackToHospitals}
                  size="sm"
                >
                  Back to Hospitals
                </Button>
              </div>
              <DoctorList
                hospitalId={selectedHospital}
                initialSearchQuery={submittedQuery}
                onDoctorSelect={(doctorId) => {
                  setSelectedDoctor(doctorId);
                  setShowCalendar(true);
                  toast({
                    title: "Doctor Selected",
                    description: "You can now book an appointment.",
                  });
                }}
              />
            </div>
          ) : (
            <NetworkMap 
              onHospitalSelect={handleHospitalSelect} 
              searchQuery={submittedQuery} 
            />
          )}
        </Card>

        <div className="space-y-4">
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
