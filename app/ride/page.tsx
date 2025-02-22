"use client"
import React, { useState } from "react";
import { MapPin, Navigation } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import AuthenticatedNavbar from "../components/authenticatedNavbar";
import DynamicMap from "../components/DynamicMap";

// Define types
type LocationCoords = [number, number] | null;

interface Direction {
  id: number;
  text: string;
  distance: number;
}

type LocationType = "pickup" | "dropoff";

const RideBookingInterface = () => {
  const [pickupLocation, setPickupLocation] = useState<LocationCoords>(null);
  const [dropoffLocation, setDropoffLocation] = useState<LocationCoords>(null);
  const [pickupInput, setPickupInput] = useState("");
  const [dropoffInput, setDropoffInput] = useState("");
  const [showDirectionsDialog, setShowDirectionsDialog] = useState(false);
  const [directions, setDirections] = useState<Direction[]>([]);

  const fetchCoordinates = async (address: string, type: LocationType) => {
    if (!address.trim()) return;

    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`
      );
      const data = await response.json();

      if (data.length > 0) {
        const { lat, lon } = data[0];
        const coords: [number, number] = [parseFloat(lat), parseFloat(lon)];

        if (type === "pickup") {
          setPickupLocation(coords);
        } else {
          setDropoffLocation(coords);
        }
      } else {
        alert("Location not found.");
      }
    } catch (error) {
      console.error("Error fetching coordinates:", error);
      alert("Error finding location. Please try again.");
    }
  };

  const handleSearch = () => {
    if (pickupInput) fetchCoordinates(pickupInput, "pickup");
    if (dropoffInput) fetchCoordinates(dropoffInput, "dropoff");
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="fixed top-0 left-0 w-full z-50">
        <AuthenticatedNavbar />
      </div>

      <div className="container mx-auto px-4 pt-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-6">
            <Card className="shadow-lg">
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold mb-6 text-gray-800">Get a ride</h2>

                <div className="space-y-4">
                  <div className="relative">
                    <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                      <MapPin className="text-gray-400" size={20} />
                    </div>
                    <Input
                      type="text"
                      placeholder="Enter pickup location"
                      className="pl-10 h-12 border-2 border-gray-200 rounded-lg focus:border-blue-500"
                      value={pickupInput}
                      onChange={(e) => setPickupInput(e.target.value)}
                    />
                  </div>

                  <div className="relative">
                    <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                      <Navigation className="text-gray-400" size={20} />
                    </div>
                    <Input
                      type="text"
                      placeholder="Enter destination"
                      className="pl-10 h-12 border-2 border-gray-200 rounded-lg focus:border-blue-500"
                      value={dropoffInput}
                      onChange={(e) => setDropoffInput(e.target.value)}
                    />
                  </div>

                  <Button 
                    className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg"
                    onClick={handleSearch}
                  >
                    Search Route
                  </Button>

                  {pickupLocation && dropoffLocation && (
                    <Button
                      className="w-full h-12 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg"
                      onClick={() => setShowDirectionsDialog(true)}
                    >
                      Show Directions
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="h-[600px] rounded-lg overflow-hidden shadow-lg">
            <DynamicMap
              pickupLocation={pickupLocation}
              dropoffLocation={dropoffLocation}
              onLocationSelect={setPickupLocation}
              setDirections={setDirections}
            />
          </div>
        </div>
      </div>

      <Dialog open={showDirectionsDialog} onOpenChange={setShowDirectionsDialog}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Route Directions</DialogTitle>
          </DialogHeader>
          <div className="max-h-[60vh] overflow-y-auto">
            <ol className="list-decimal list-inside space-y-2 px-4">
              {directions.map((step) => (
                <li key={step.id} className="text-gray-700">
                  {step.text}
                  <span className="text-sm text-gray-500 ml-2">({Math.round(step.distance)}m)</span>
                </li>
              ))}
            </ol>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default RideBookingInterface;