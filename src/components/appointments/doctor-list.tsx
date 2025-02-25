
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Stethoscope } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";

interface Doctor {
  id: string;
  name: string;
  specialization: string;
  experience: number;
  availability: string[];
}

interface DoctorListProps {
  hospitalId: string;
  onDoctorSelect: (doctorId: string) => void;
  initialSearchQuery?: string;
}

// Mock doctor data with expanded specializations
const mockDoctors: Record<string, Doctor[]> = {
  "1": [
    {
      id: "d1",
      name: "Dr. Sarah Johnson",
      specialization: "Orthopedic Surgeon",
      experience: 12,
      availability: ["Monday", "Wednesday", "Friday"],
    },
    {
      id: "d2",
      name: "Dr. Michael Chen",
      specialization: "Cardiologist",
      experience: 15,
      availability: ["Tuesday", "Thursday"],
    },
    {
      id: "d3",
      name: "Dr. Robert Williams",
      specialization: "Nephrologist",
      experience: 10,
      availability: ["Monday", "Wednesday", "Friday"],
    },
  ],
  "2": [
    {
      id: "d4",
      name: "Dr. Emily Davis",
      specialization: "Neurologist",
      experience: 10,
      availability: ["Monday", "Tuesday", "Thursday"],
    },
    {
      id: "d5",
      name: "Dr. David Rodriguez",
      specialization: "Cardiovascular Surgeon",
      experience: 18,
      availability: ["Wednesday", "Friday"],
    },
    {
      id: "d6",
      name: "Dr. Amanda Thompson",
      specialization: "Oncologist",
      experience: 12,
      availability: ["Tuesday", "Thursday"],
    },
  ],
  "3": [
    {
      id: "d7",
      name: "Dr. James Wilson",
      specialization: "General Surgeon",
      experience: 8,
      availability: ["Wednesday", "Friday"],
    },
    {
      id: "d8",
      name: "Dr. Patricia Lee",
      specialization: "Nephrologist",
      experience: 14,
      availability: ["Monday", "Tuesday", "Thursday"],
    },
    {
      id: "d9",
      name: "Dr. Thomas Harris",
      specialization: "Cardiovascular Specialist",
      experience: 16,
      availability: ["Tuesday", "Thursday", "Friday"],
    },
  ],
};

const DoctorList: React.FC<DoctorListProps> = ({ hospitalId, onDoctorSelect, initialSearchQuery = "" }) => {
  const [searchQuery, setSearchQuery] = useState(initialSearchQuery);
  const [filteredDoctors, setFilteredDoctors] = useState<Doctor[]>([]);
  
  // Get all doctors for the selected hospital
  const hospitalDoctors = mockDoctors[hospitalId] || [];

  // Filter doctors based on search query
  useEffect(() => {
    if (!searchQuery) {
      setFilteredDoctors(hospitalDoctors);
      return;
    }

    const filtered = hospitalDoctors.filter((doctor) => {
      const query = searchQuery.toLowerCase();
      
      // Search in doctor name
      if (doctor.name.toLowerCase().includes(query)) {
        return true;
      }
      
      // Search in specialization
      return doctor.specialization.toLowerCase().includes(query);
    });
    
    setFilteredDoctors(filtered);
  }, [searchQuery, hospitalId, hospitalDoctors]);

  // Initialize with the initial search query
  useEffect(() => {
    setSearchQuery(initialSearchQuery);
  }, [initialSearchQuery]);

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Available Doctors</h2>
      
      <div>
        <Input 
          placeholder="Search by doctor name or specialization"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="mb-4"
        />
      </div>
      
      {filteredDoctors.length > 0 ? (
        filteredDoctors.map((doctor) => (
          <Card key={doctor.id} className="p-4">
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-3">
                <div className="mt-1">
                  <Stethoscope className="h-5 w-5 text-sage-600" />
                </div>
                <div>
                  <h3 className="font-semibold">{doctor.name}</h3>
                  <p className="text-sm text-gray-600">{doctor.specialization}</p>
                  <p className="text-sm text-gray-600">
                    {doctor.experience} years experience
                  </p>
                  <div className="mt-2">
                    <p className="text-sm text-gray-600">Available on:</p>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {doctor.availability.map((day) => (
                        <span
                          key={day}
                          className="px-2 py-1 text-xs bg-sage-100 text-sage-800 rounded"
                        >
                          {day}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <Button
                onClick={() => onDoctorSelect(doctor.id)}
                className="ml-4"
              >
                Book
              </Button>
            </div>
          </Card>
        ))
      ) : (
        <p className="text-center text-gray-500 py-4">No doctors found matching your criteria.</p>
      )}
    </div>
  );
};

export default DoctorList;
