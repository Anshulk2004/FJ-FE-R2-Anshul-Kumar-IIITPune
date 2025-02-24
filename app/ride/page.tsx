"use client";
import React, { useState, useEffect } from "react";
import { MapPin, Navigation, Plus, Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { useTheme } from "@/components/ThemeContext";
import AuthenticatedNavbar from "../../components/authenticatedNavbar";
import DynamicMap from "../../components/DynamicMap";
import RideOptions from "../../components/RideOptions";
import { useRouter } from "next/navigation";

interface Stop {
  id: string;
  address: string;
  coordinates: [number, number] | null;
}

interface Direction {
  id: number;
  text: string;
  distance: number;
}

interface RouteSegment {
  from: string;
  to: string;
  directions: Direction[];
}

const RideBookingInterface = () => {
  const { theme } = useTheme();
  const [stops, setStops] = useState<Stop[]>([
    { id: "pickup", address: "", coordinates: null },
    { id: "dropoff", address: "", coordinates: null },
  ]);
  const [showDirectionsDialog, setShowDirectionsDialog] = useState(false);
  const [directions, setDirections] = useState<Direction[]>([]);
  const [scheduleType, setScheduleType] = useState<
    "now" | "later" | "tomorrow"
  >("now");
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [showCalendar, setShowCalendar] = useState(false);
  const [showRideOptions, setShowRideOptions] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const router = useRouter();

  const getStopName = (index: number, total: number) => {
    if (index === 0) return "Pickup";
    if (index === total - 1) return "Destination";
    return `Stop ${index}`;
  };

  useEffect(() => {
    const bothAddressesFilled = stops.every(
      (stop) => stop.address.trim().length > 0
    );
    if (bothAddressesFilled && isSearching) {
      handleSearch();
    }
  }, [stops, isSearching]);

  const handleBookRide = (vehicleDetails: {
    name: any;
    fare: { toString: () => any };
    capacity: { toString: () => any };
    eta: any;
  }) => {
    const queryParams = new URLSearchParams({
      vehicle: vehicleDetails.name,
      fare: vehicleDetails.fare.toString(),
      capacity: vehicleDetails.capacity.toString(),
      eta: vehicleDetails.eta,
    }).toString();
    router.push(`/booking?${queryParams}`);
  };

  const getRouteSegments = (): RouteSegment[] => {
    const validStops = stops.filter((stop) => stop.coordinates);
    if (validStops.length < 2) return [];
    const segmentSize = Math.floor(directions.length / (validStops.length - 1));
    return validStops.slice(0, -1).map((stop, index) => {
      const fromIndex = index * segmentSize;
      const toIndex =
        index === validStops.length - 2
          ? directions.length
          : (index + 1) * segmentSize;

      return {
        from: getStopName(index, validStops.length),
        to: getStopName(index + 1, validStops.length),
        directions: directions.slice(fromIndex, toIndex),
      };
    });
  };

  const handleAddressChange = (index: number, newAddress: string) => {
    const newStops = [...stops];
    newStops[index] = {
      ...newStops[index],
      address: newAddress,
      coordinates: null,
    };
    setStops(newStops);
  };

  const fetchCoordinates = async (address: string, stopId: string) => {
    if (!address.trim()) return;
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
          address
        )}`
      );
      const data = await response.json();
      if (data.length > 0) {
        const { lat, lon } = data[0];
        setStops(
          stops.map((stop) =>
            stop.id === stopId
              ? {
                  ...stop,
                  coordinates: [parseFloat(lat), parseFloat(lon)],
                  address,
                }
              : stop
          )
        );
      } else {
        alert("Location not found.");
      }
    } catch (error) {
      console.error("Error fetching coordinates:", error);
      alert("Error finding location. Please try again.");
    }
  };

  const handleAddStop = (index: number) => {
    const newStops = [...stops];
    newStops.splice(index + 1, 0, {
      id: `stop-${Date.now()}`,
      address: "",
      coordinates: null,
    });
    setStops(newStops);
  };

  const handleSearch = async () => {
    setIsSearching(true);
    setDirections([]);

    try {
      const searchPromises = stops
        .filter((stop) => stop.address && !stop.coordinates)
        .map((stop) => fetchCoordinates(stop.address, stop.id));

      await Promise.all(searchPromises);
    } catch (error) {
      console.error("Error during search:", error);
    } finally {
      setIsSearching(false);
    }
  };

  const handleScheduleSelect = (type: "now" | "later" | "tomorrow") => {
    setScheduleType(type);
    if (type === "tomorrow") {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      setSelectedDate(tomorrow);
    } else if (type === "now") {
      setSelectedDate(undefined);
    }
  };

  return (
    <div
      className={`min-h-screen ${
        theme === "dark"
          ? "bg-gray-900 text-white"
          : "bg-gray-100 text-gray-800"
      }`}
    >
      <div className="fixed top-0 left-0 w-full z-[9998]">
        <AuthenticatedNavbar />
      </div>
      <div className="container mx-auto px-4 pt-24 relative z-0">
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 md:col-span-4 space-y-6">
            <Card
              className={`shadow-lg ${
                theme === "dark" ? "bg-gray-800 border-gray-700" : "bg-white"
              }`}
            >
              <CardContent className="p-4 md:p-6">
                <h2
                  className={`text-xl md:text-2xl font-bold mb-6 ${
                    theme === "dark" ? "text-white" : "text-gray-800"
                  }`}
                >
                  Get a ride
                </h2>

                <div className="space-y-4">
                  {stops.map((stop, index) => (
                    <div key={stop.id} className="relative">
                      <div className="flex items-center space-x-2">
                        <div className="relative flex-1">
                          <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                            {index === 0 ? (
                              <MapPin
                                className={`${
                                  theme === "dark"
                                    ? "text-gray-400"
                                    : "text-gray-500"
                                }`}
                                size={20}
                              />
                            ) : index === stops.length - 1 ? (
                              <Navigation
                                className={`${
                                  theme === "dark"
                                    ? "text-gray-400"
                                    : "text-gray-500"
                                }`}
                                size={20}
                              />
                            ) : (
                              <span
                                className={`w-5 h-5 flex items-center justify-center ${
                                  theme === "dark"
                                    ? "text-gray-400"
                                    : "text-gray-500"
                                }`}
                              >
                                {index}
                              </span>
                            )}
                          </div>
                          <Input
                            type="text"
                            placeholder={
                              index === 0
                                ? "Enter pickup location"
                                : index === stops.length - 1
                                ? "Enter destination"
                                : "Enter stop location"
                            }
                            className={`pl-10 h-12 ${
                              theme === "dark"
                                ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                                : "bg-white border-gray-200 text-gray-900"
                            }`}
                            value={stop.address}
                            onChange={(e) =>
                              handleAddressChange(index, e.target.value)
                            }
                          />
                        </div>
                        {index !== 0 && index !== stops.length - 1 && (
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() =>
                              setStops(stops.filter((s) => s.id !== stop.id))
                            }
                            className="h-12 w-12"
                          >
                            <Plus className="h-5 w-5 rotate-45" />
                          </Button>
                        )}

                        {index < stops.length - 1 && (
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleAddStop(index)}
                            className="h-12 w-12"
                          >
                            <Plus className="h-5 w-5" />
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}

                  <div className="space-y-4">
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={`w-full h-12 justify-start text-left font-normal ${
                            theme === "dark"
                              ? "bg-gray-700 border-gray-600 text-white"
                              : ""
                          }`}
                        >
                          <Clock className="mr-2 h-4 w-4" />
                          {scheduleType === "now"
                            ? "Pickup now"
                            : scheduleType === "tomorrow"
                            ? "Pickup tomorrow"
                            : selectedDate
                            ? `Pickup on ${format(selectedDate, "PPP")}`
                            : "Schedule for later"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-80">
                        <div className="space-y-2">
                          <Button
                            variant={
                              scheduleType === "now" ? "default" : "ghost"
                            }
                            className="w-full justify-start"
                            onClick={() => handleScheduleSelect("now")}
                          >
                            Pickup now
                          </Button>
                          <Button
                            variant={
                              scheduleType === "tomorrow" ? "default" : "ghost"
                            }
                            className="w-full justify-start"
                            onClick={() => handleScheduleSelect("tomorrow")}
                          >
                            Pickup tomorrow
                          </Button>
                          <Button
                            variant={
                              scheduleType === "later" ? "default" : "ghost"
                            }
                            className="w-full justify-start"
                            onClick={() => {
                              setScheduleType("later");
                              setShowCalendar(true);
                            }}
                          >
                            Schedule for later
                          </Button>

                          {showCalendar && (
                            <Calendar
                              mode="single"
                              selected={selectedDate}
                              onSelect={(date) => {
                                setSelectedDate(date);
                                setShowCalendar(false);
                              }}
                              disabled={(date) => date < new Date()}
                              className="rounded-md border"
                            />
                          )}
                        </div>
                      </PopoverContent>
                    </Popover>

                    <Button
                      className={`w-full h-12 font-semibold rounded-lg ${
                        isSearching ? "opacity-50 cursor-not-allowed" : ""
                      } ${
                        theme === "dark"
                          ? "bg-blue-600 hover:bg-blue-700"
                          : "bg-blue-600 hover:bg-blue-700"
                      } text-white`}
                      onClick={handleSearch}
                      disabled={isSearching}
                    >
                      {isSearching ? "Searching..." : "Search Route"}
                    </Button>

                    {directions.length > 0 && (
                      <>
                        <Button
                          className={`w-full h-12 font-semibold rounded-lg ${
                            theme === "dark"
                              ? "bg-green-600 hover:bg-green-700"
                              : "bg-green-600 hover:bg-green-700"
                          } text-white`}
                          onClick={() => setShowDirectionsDialog(true)}
                        >
                          Show Directions
                        </Button>
                        <Button
                          className={`w-full h-12 font-semibold rounded-lg ${
                            theme === "dark"
                              ? "bg-blue-600 hover:bg-blue-700"
                              : "bg-blue-600 hover:bg-blue-700"
                          } text-white`}
                          onClick={() => setShowRideOptions(true)}
                        >
                          Book Ride
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="md:col-span-8 h-[400px] md:h-[700px] rounded-lg overflow-hidden shadow-lg relative z-0">
            <DynamicMap
              stops={stops}
              setDirections={setDirections}
              theme={theme}
            />
          </div>
        </div>
      </div>

      <Dialog
        open={showDirectionsDialog}
        onOpenChange={setShowDirectionsDialog}
      >
        <DialogContent
          className={`sm:max-w-[500px] z-[9999] ${
            theme === "dark" ? "bg-gray-800 text-white" : "bg-white"
          }`}
        >
          <DialogHeader>
            <DialogTitle>Route Directions</DialogTitle>
          </DialogHeader>
          <div className="max-h-[60vh] overflow-y-auto">
            {getRouteSegments().map((segment, index) => (
              <div key={index} className="mb-6">
                <h3 className="text-lg font-semibold mb-3 text-blue-600">
                  {segment.from} → {segment.to}
                </h3>
                <ol className="list-decimal list-inside space-y-2 px-4">
                  {segment.directions.map((step) => (
                    <li key={step.id} className="text-gray-700">
                      {step.text}
                      <span className="text-sm text-gray-500 ml-2">
                        ({Math.round(step.distance)}m)
                      </span>
                    </li>
                  ))}
                </ol>
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>
      <Dialog open={showRideOptions} onOpenChange={setShowRideOptions}>
        <DialogContent
          className={`sm:max-w-[500px] z-[9999] ${
            theme === "dark" ? "bg-gray-800 text-white" : "bg-white"
          }`}
        >
          <DialogHeader>
            <DialogTitle>Choose your ride</DialogTitle>
          </DialogHeader>
          <RideOptions
            onBookRide={(vehicle: {
              name: any;
              fare: { toString: () => any };
              capacity: { toString: () => any };
              eta: any;
            }) => {
              handleBookRide(vehicle);
              setShowRideOptions(false);
            }}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default RideBookingInterface;
