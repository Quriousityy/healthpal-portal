
import React, { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Loader2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";

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

interface Hospital {
  id: string;
  name: string;
  lat: number;
  lng: number;
  specialties: string[];
  distance?: number; // Optional distance from user
}

const NetworkMap: React.FC<NetworkMapProps> = ({ onHospitalSelect, searchQuery }) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const markers = useRef<mapboxgl.Marker[]>([]);
  const [filteredHospitals, setFilteredHospitals] = useState<Hospital[]>(mockHospitals);
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [isLocating, setIsLocating] = useState(false);

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
    
    // Sort filtered hospitals by distance if user location is available
    if (userLocation) {
      const hospitalsWithDistance = filtered.map(hospital => {
        const distance = calculateDistance(
          userLocation.lat, 
          userLocation.lng, 
          hospital.lat, 
          hospital.lng
        );
        return { ...hospital, distance };
      });

      hospitalsWithDistance.sort((a, b) => (a.distance || Infinity) - (b.distance || Infinity));
      setFilteredHospitals(hospitalsWithDistance);
    } else {
      setFilteredHospitals(filtered);
    }
  }, [searchQuery, userLocation]);

  // Calculate distance between two points using Haversine formula
  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
    const R = 6371; // Radius of the earth in km
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
      Math.sin(dLon/2) * Math.sin(dLon/2); 
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    const distance = R * c; // Distance in km
    return distance;
  };

  const deg2rad = (deg: number): number => {
    return deg * (Math.PI/180);
  };

  // Get user location
  const getUserLocation = () => {
    setIsLocating(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userPos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          setUserLocation(userPos);
          setIsLocating(false);
          
          // If map is already loaded, fly to user location
          if (map.current) {
            map.current.flyTo({
              center: [userPos.lng, userPos.lat],
              zoom: 9,
              essential: true
            });
            
            // Add user marker
            new mapboxgl.Marker({ color: '#4F46E5' })
              .setLngLat([userPos.lng, userPos.lat])
              .setPopup(new mapboxgl.Popup().setHTML('<h3>Your Location</h3>'))
              .addTo(map.current);
          }
          
          toast({
            title: "Location Found",
            description: "Showing hospitals near your location."
          });
        },
        (error) => {
          setIsLocating(false);
          console.error("Error getting location:", error);
          toast({
            title: "Location Error",
            description: "Could not get your location. " + error.message,
            variant: "destructive"
          });
        }
      );
    } else {
      setIsLocating(false);
      toast({
        title: "Geolocation Not Supported",
        description: "Your browser does not support geolocation",
        variant: "destructive"
      });
    }
  };

  // Initialize map
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

    // Add navigation controls
    map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');

    // If user location exists, center the map there on initialization
    if (userLocation) {
      map.current.setCenter([userLocation.lng, userLocation.lat]);
      map.current.setZoom(9);
    }

    // Cleanup function for the map
    return () => {
      map.current?.remove();
    };
  }, []);

  // Update markers based on filtered hospitals and user location
  useEffect(() => {
    if (!map.current) return;

    // Function to add hospital markers
    const addHospitalMarkers = () => {
      // Clear existing markers
      markers.current.forEach(marker => marker.remove());
      markers.current = [];

      // Add new markers for filtered hospitals
      filteredHospitals.forEach((hospital) => {
        const marker = new mapboxgl.Marker({ color: '#10B981' })
          .setLngLat([hospital.lng, hospital.lat])
          .setPopup(
            new mapboxgl.Popup().setHTML(`
              <h3 class="font-semibold">${hospital.name}</h3>
              <p class="text-sm text-gray-600">Specialties: ${hospital.specialties.join(', ')}</p>
              ${hospital.distance !== undefined ? `<p class="text-sm text-gray-600">Distance: ${hospital.distance.toFixed(1)} km</p>` : ''}
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

      // If there are hospitals and user location, fit bounds to include all points
      if (filteredHospitals.length > 0 && userLocation) {
        const bounds = new mapboxgl.LngLatBounds();
        
        // Add user location to bounds
        bounds.extend([userLocation.lng, userLocation.lat]);
        
        // Add all hospital locations to bounds
        filteredHospitals.forEach(hospital => {
          bounds.extend([hospital.lng, hospital.lat]);
        });
        
        map.current?.fitBounds(bounds, {
          padding: 100,
          maxZoom: 10
        });
      }
    };

    if (map.current.loaded()) {
      addHospitalMarkers();
    } else {
      map.current.once('load', addHospitalMarkers);
    }
  }, [filteredHospitals, userLocation]);

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
      <Card className="w-full h-[400px] overflow-hidden relative">
        <div ref={mapContainer} className="w-full h-full" />
        <div className="absolute top-3 left-3 z-10">
          <Button 
            onClick={getUserLocation} 
            className="flex items-center gap-2 bg-white text-black hover:bg-gray-100 shadow-md"
            disabled={isLocating}
          >
            {isLocating ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Locating...</span>
              </>
            ) : (
              <>
                <MapPin className="h-4 w-4" />
                <span>Find Near Me</span>
              </>
            )}
          </Button>
        </div>
      </Card>
      {filteredHospitals.length > 0 ? (
        <div className="mt-4">
          <h2 className="text-xl font-semibold mb-3">Available Hospitals</h2>
          <div className="space-y-3">
            {filteredHospitals.map((hospital) => (
              <Card key={hospital.id} className="p-4 cursor-pointer hover:bg-gray-50" onClick={() => onHospitalSelect(hospital.id)}>
                <h3 className="font-semibold">{hospital.name}</h3>
                <p className="text-sm text-gray-600">Specialties: {hospital.specialties.join(', ')}</p>
                {hospital.distance !== undefined && (
                  <p className="text-sm text-gray-600 mt-1">
                    <MapPin className="h-3 w-3 inline-block mr-1" />
                    {hospital.distance.toFixed(1)} km away
                  </p>
                )}
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
