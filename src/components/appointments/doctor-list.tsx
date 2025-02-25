
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Stethoscope } from "lucide-react";

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
}

// Mock doctor data
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
  ],
  "2": [
    {
      id: "d3",
      name: "Dr. Emily Davis",
      specialization: "Neurologist",
      experience: 10,
      availability: ["Monday", "Tuesday", "Thursday"],
    },
  ],
  "3": [
    {
      id: "d4",
      name: "Dr. James Wilson",
      specialization: "General Surgeon",
      experience: 8,
      availability: ["Wednesday", "Friday"],
    },
  ],
};

const DoctorList: React.FC<DoctorListProps> = ({ hospitalId, onDoctorSelect }) => {
  const doctors = mockDoctors[hospitalId] || [];

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Available Doctors</h2>
      {doctors.map((doctor) => (
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
      ))}
    </div>
  );
};

export default DoctorList;
