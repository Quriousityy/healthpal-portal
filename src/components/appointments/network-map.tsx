
import React, { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { Card } from "@/components/ui/card";

interface NetworkMapProps {
  onHospitalSelect: (hospitalId: string) => void;
  searchQuery?: string;
}

// Mock hospital data with treatment specialties
const mockHospitals = [
  { 
    id: "1", 
    name: "City General Hospital", 
    lat: 40.7128, 
    lng: -74.006,
    specialties: ["Cardiology", "Nephrology", "Orthopedics"] 
  },
  { 
    id: "2", 
    name: "Memorial Medical Center", 
    lat: 34.0522, 
    lng: -118.2437,
    specialties: ["Neurology", "Oncology", "Cardiovascular"] 
  },
  { 
    id: "3", 
    name: "Central Care Hospital", 
    lat: 41.8781, 
    lng: -87.6298,
    specialties: ["Nephrology", "Gastroenterology", "Cardiovascular"] 
  },
];

const NetworkMap: React.FC<NetworkMapProps> = ({ onHospitalSelect, searchQuery }) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const markers = useRef<mapboxgl.Marker[]>([]);
  const [filteredHospitals, setFilteredHospitals] = useState(mockHospitals);

  // Filter hospitals based on search query
  useEffect(() => {
    if (!searchQuery) {
      setFilteredHospitals(mockHospitals);
      return;
    }

    const filtered = mockHospitals.filter((hospital) => {
      // Case insensitive search
      const query = searchQuery.toLowerCase();
      
      // Search in hospital name
      if (hospital.name.toLowerCase().includes(query)) {
        return true;
      }
      
      // Search in specialties
      return hospital.specialties.some(specialty => 
        specialty.toLowerCase().includes(query)
      );
    });
    
    setFilteredHospitals(filtered);
  }, [searchQuery]);

  useEffect(() => {
    if (!mapContainer.current) return;

    // For demo purposes, you would normally use an environment variable
    mapboxgl.accessToken = "pk.eyJ1IjoiZGVtb3VzZXIiLCJhIjoiY2wxeWN6dHZwMDJ3eTNqbzFxZ3h4a2x0ZiJ9.LPF70xAZ0-xxkToUL6Kezg";

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/light-v11",
      center: [-98.5795, 39.8283], // Center of USA
      zoom: 3,
    });

    // Cleanup function for the map
    return () => {
      map.current?.remove();
    };
  }, []);

  // Add markers when filteredHospitals or map changes
  useEffect(() => {
    if (!map.current) return;

    // Clear existing markers
    markers.current.forEach(marker => marker.remove());
    markers.current = [];

    // Add new markers for filtered hospitals
    map.current.once('load', () => {
      filteredHospitals.forEach((hospital) => {
        const marker = new mapboxgl.Marker()
          .setLngLat([hospital.lng, hospital.lat])
          .setPopup(
            new mapboxgl.Popup().setHTML(`
              <h3 class="font-semibold">${hospital.name}</h3>
              <p class="text-sm text-gray-600">Specialties: ${hospital.specialties.join(', ')}</p>
              <button
                class="mt-2 px-3 py-1 bg-sage-600 text-white rounded-md text-sm"
                onclick="window.selectHospital('${hospital.id}')"
              >
                Select
              </button>
            `)
          )
          .addTo(map.current!);
        
        markers.current.push(marker);
      });
    });

    if (map.current.loaded()) {
      filteredHospitals.forEach((hospital) => {
        const marker = new mapboxgl.Marker()
          .setLngLat([hospital.lng, hospital.lat])
          .setPopup(
            new mapboxgl.Popup().setHTML(`
              <h3 class="font-semibold">${hospital.name}</h3>
              <p class="text-sm text-gray-600">Specialties: ${hospital.specialties.join(', ')}</p>
              <button
                class="mt-2 px-3 py-1 bg-sage-600 text-white rounded-md text-sm"
                onclick="window.selectHospital('${hospital.id}')"
              >
                Select
              </button>
            `)
          )
          .addTo(map.current!);
        
        markers.current.push(marker);
      });
    }
  }, [filteredHospitals]);

  // Add global function for the popup button
  useEffect(() => {
    (window as any).selectHospital = (hospitalId: string) => {
      onHospitalSelect(hospitalId);
    };

    return () => {
      delete (window as any).selectHospital;
    };
  }, [onHospitalSelect]);

  return (
    <div>
      <Card className="w-full h-[400px] overflow-hidden">
        <div ref={mapContainer} className="w-full h-full" />
      </Card>
      {filteredHospitals.length > 0 ? (
        <div className="mt-4">
          <h2 className="text-xl font-semibold mb-3">Available Hospitals</h2>
          <div className="space-y-3">
            {filteredHospitals.map((hospital) => (
              <Card key={hospital.id} className="p-4 cursor-pointer hover:bg-gray-50" onClick={() => onHospitalSelect(hospital.id)}>
                <h3 className="font-semibold">{hospital.name}</h3>
                <p className="text-sm text-gray-600">Specialties: {hospital.specialties.join(', ')}</p>
              </Card>
            ))}
          </div>
        </div>
      ) : (
        <p className="mt-4 text-center text-gray-500">No hospitals found matching your search criteria.</p>
      )}
    </div>
  );
};

export default NetworkMap;
