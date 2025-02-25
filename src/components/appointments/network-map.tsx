
import React, { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { Card } from "@/components/ui/card";

interface NetworkMapProps {
  onHospitalSelect: (hospitalId: string) => void;
}

// Mock hospital data
const mockHospitals = [
  { id: "1", name: "City General Hospital", lat: 40.7128, lng: -74.006 },
  { id: "2", name: "Memorial Medical Center", lat: 34.0522, lng: -118.2437 },
  { id: "3", name: "Central Care Hospital", lat: 41.8781, lng: -87.6298 },
];

const NetworkMap: React.FC<NetworkMapProps> = ({ onHospitalSelect }) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);

  useEffect(() => {
    if (!mapContainer.current) return;

    // For demo purposes, you would normally use an environment variable
    mapboxgl.accessToken = "YOUR_MAPBOX_TOKEN";

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/light-v11",
      center: [-98.5795, 39.8283], // Center of USA
      zoom: 3,
    });

    // Add markers for mock hospitals
    mockHospitals.forEach((hospital) => {
      const marker = new mapboxgl.Marker()
        .setLngLat([hospital.lng, hospital.lat])
        .setPopup(
          new mapboxgl.Popup().setHTML(`
            <h3 class="font-semibold">${hospital.name}</h3>
            <button
              class="mt-2 px-3 py-1 bg-sage-600 text-white rounded-md text-sm"
              onclick="window.selectHospital('${hospital.id}')"
            >
              Select
            </button>
          `)
        )
        .addTo(map.current!);
    });

    // Cleanup
    return () => {
      map.current?.remove();
    };
  }, []);

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
    <Card className="w-full h-[400px] overflow-hidden">
      <div ref={mapContainer} className="w-full h-full" />
    </Card>
  );
};

export default NetworkMap;
