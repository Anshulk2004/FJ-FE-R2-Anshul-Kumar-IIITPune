"use client";
import React, { useState, useEffect } from "react";
import { MapPin, Navigation, Plus, Clock, Users, Car } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Slider } from "@/components/ui/slider";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import AuthenticatedNavbar from "../components/authenticatedNavbar";
import DynamicMap from "../components/DynamicMap";
import RideOptions from "../components/RideOptions";
import { useRouter } from "next/navigation";
import { useTheme } from "@/app/components/ThemeContext";

interface Stop {
  id: string;
  address: string;
  coordinates: [number, number] | null;
}

interface NearbyRide {
  id: string;
  driver: string;
  vehicle: string;
  from: string;
  to: string;
  availableSeats: number;
  price: number;
  departureTime: string;
}

const RideSharingInterface = () => {
  const { theme } = useTheme();
  const [stops, setStops] = useState<Stop[]>([
    { id: "pickup", address: "", coordinates: null },
    { id: "dropoff", address: "", coordinates: null },
  ]);
  const [showDirectionsDialog, setShowDirectionsDialog] = useState(false);
  const [directions, setDirections] = useState<any[]>([]);
  const [scheduleType, setScheduleType] = useState<
    "now" | "later" | "tomorrow"
  >("now");
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [showCalendar, setShowCalendar] = useState(false);
  const [showRideOptions, setShowRideOptions] = useState(false);
  const [passengerCount, setPassengerCount] = useState(2);
  const [showNearbyRides, setShowNearbyRides] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const router = useRouter();

  // Mock nearby rides data
  const nearbyRides: NearbyRide[] = [
    {
      id: "1",
      driver: "John D.",
      vehicle: "Toyota Innova",
      from: "Downtown Mall",
      to: "Airport Terminal 1",
      availableSeats: 3,
      price: 150,
      departureTime: "15:30",
    },
    {
      id: "2",
      driver: "Sarah M.",
      vehicle: "Honda City",
      from: "Central Station",
      to: "Business District",
      availableSeats: 2,
      price: 120,
      departureTime: "16:00",
    },
  ];

  useEffect(() => {
    const bothAddressesFilled = stops.every(
      (stop) => stop.address.trim().length > 0
    );
    if (bothAddressesFilled && isSearching) {
      handleSearch();
    }
  }, [stops, isSearching]);

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

  const calculateSharedPrice = (basePrice: number) => {
    const pricePerPerson = basePrice / passengerCount;
    return {
      perPerson: Math.ceil(pricePerPerson),
      total: basePrice,
    };
  };

  const handleBookRide = (vehicleDetails: any) => {
    const sharedPrice = calculateSharedPrice(vehicleDetails.fare);
    const queryParams = new URLSearchParams({
      vehicle: vehicleDetails.name,
      fare: sharedPrice.perPerson.toString(),
      totalFare: sharedPrice.total.toString(),
      capacity: vehicleDetails.capacity.toString(),
      eta: vehicleDetails.eta,
      passengers: passengerCount.toString(),
      isShared: "true",
    }).toString();

    router.push(`/booking?${queryParams}`);
  };

  const handleJoinNearbyRide = (ride: NearbyRide) => {
    const queryParams = new URLSearchParams({
      vehicle: ride.vehicle,
      fare: (ride.price / ride.availableSeats).toString(),
      totalFare: ride.price.toString(),
      capacity: ride.availableSeats.toString(),
      eta: ride.departureTime,
      passengers: "1",
      isShared: "true",
      existingRide: "true",
    }).toString();

    router.push(`/booking?${queryParams}`);
  };

  return (
    <div
      className={`min-h-screen ${
        theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-100"
      }`}
    >
      <div className="fixed top-0 left-0 w-full z-50">
        <AuthenticatedNavbar />
      </div>

      <div className="container mx-auto px-4 pt-24 relative z-0">
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 md:col-span-4 space-y-6">
            <Card
              className={`shadow-lg ${
                theme === "dark" ? "bg-gray-800 border-gray-700" : ""
              }`}
            >
              <CardContent className="p-6">
                <h2
                  className={`text-2xl font-bold mb-6 ${
                    theme === "dark" ? "text-white" : "text-gray-800"
                  }`}
                >
                  Share a ride
                </h2>

                <div className="mb-6">
                  <label
                    className={`block text-sm font-medium mb-2 ${
                      theme === "dark" ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    Share ride with (including you):
                  </label>
                  <div className="flex items-center space-x-4">
                    <Users
                      className={
                        theme === "dark" ? "text-gray-400" : "text-gray-500"
                      }
                      size={20}
                    />
                    <Slider
                      value={[passengerCount]}
                      onValueChange={(value) => setPassengerCount(value[0])}
                      max={5}
                      min={2}
                      step={1}
                      className="flex-1"
                    />
                    <span
                      className={`text-lg font-semibold ${
                        theme === "dark" ? "text-gray-300" : "text-gray-700"
                      }`}
                    >
                      {passengerCount}
                    </span>
                  </div>
                </div>

                <div className="space-y-4">
                  {stops.map((stop, index) => (
                    <div key={stop.id} className="relative">
                      <div className="flex items-center space-x-2">
                        <div className="relative flex-1">
                          <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                            {index === 0 ? (
                              <MapPin
                                className={
                                  theme === "dark"
                                    ? "text-gray-400"
                                    : "text-gray-500"
                                }
                                size={20}
                              />
                            ) : (
                              <Navigation
                                className={
                                  theme === "dark"
                                    ? "text-gray-400"
                                    : "text-gray-500"
                                }
                                size={20}
                              />
                            )}
                          </div>
                          <Input
                            type="text"
                            placeholder={
                              index === 0
                                ? "Enter pickup location"
                                : "Enter destination"
                            }
                            className={`pl-10 h-12 ${
                              theme === "dark"
                                ? "bg-gray-700 border-gray-600 text-white"
                                : "border-2 border-gray-200"
                            } rounded-lg focus:border-blue-500`}
                            value={stop.address}
                            onChange={(e) => {
                              const newStops = [...stops];
                              newStops[index].address = e.target.value;
                              setStops(newStops);
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  ))}

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
                    <PopoverContent
                      className={`w-80 ${
                        theme === "dark" ? "bg-gray-800 border-gray-700" : ""
                      }`}
                    >
                      <div className="space-y-2">
                        <Button
                          variant={scheduleType === "now" ? "default" : "ghost"}
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
                        {(showCalendar || scheduleType === "later") && (
                          <Calendar
                            mode="single"
                            selected={selectedDate}
                            onSelect={(date) => {
                              setSelectedDate(date);
                              setShowCalendar(false);
                              if (date) setScheduleType("later");
                            }}
                            disabled={(date) => date < new Date()}
                            className={`rounded-md border ${
                              theme === "dark"
                                ? "bg-gray-800 border-gray-700"
                                : ""
                            }`}
                          />
                        )}
                      </div>
                    </PopoverContent>
                  </Popover>

                  <div className="space-y-3">
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

                    {directions.length > 0 && (
                      <Button
                        className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg"
                        onClick={() => setShowRideOptions(true)}
                      >
                        Find Shared Rides
                      </Button>
                    )}

                    <Button
                      variant="outline"
                      className={`w-full h-12 font-semibold rounded-lg ${
                        theme === "dark"
                          ? "border-blue-500 text-blue-400 hover:bg-blue-900/20"
                          : "border-blue-600 text-blue-600 hover:bg-blue-50"
                      }`}
                      onClick={() => setShowNearbyRides(true)}
                    >
                      View Nearby Shared Rides
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Alert
              className={
                theme === "dark"
                  ? "bg-green-900/20 border-green-800"
                  : "bg-green-50 border-green-200"
              }
            >
              <Car
                className={
                  theme === "dark"
                    ? "h-4 w-4 text-green-400"
                    : "h-4 w-4 text-green-600"
                }
              />
              <AlertTitle
                className={
                  theme === "dark" ? "text-green-400" : "text-green-800"
                }
              >
                Save more by sharing!
              </AlertTitle>
              <AlertDescription
                className={
                  theme === "dark" ? "text-green-300" : "text-green-700"
                }
              >
                Share your ride with {passengerCount - 1} others and save up to{" "}
                {(((passengerCount - 1) / passengerCount) * 100).toFixed()}% on
                your fare.
              </AlertDescription>
            </Alert>
          </div>

          <div className="col-span-12 md:col-span-8 h-[700px] rounded-lg overflow-hidden shadow-lg relative z-0">
            <DynamicMap stops={stops} setDirections={() => {}} theme={theme} />
          </div>
        </div>
      </div>

      <Dialog open={showNearbyRides} onOpenChange={setShowNearbyRides}>
        <DialogContent className="sm:max-w-[600px] z-[9999]">
          <DialogHeader>
            <DialogTitle>Nearby Shared Rides</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            {nearbyRides.map((ride) => (
              <Card key={ride.id} className="p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-lg">{ride.vehicle}</h3>
                    <p className="text-sm text-gray-600">
                      Driver: {ride.driver}
                    </p>
                    <div className="mt-2">
                      <p className="text-sm">From: {ride.from}</p>
                      <p className="text-sm">To: {ride.to}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-green-600">
                      ₹{(ride.price / ride.availableSeats).toFixed()} / person
                    </p>
                    <p className="text-sm text-gray-600">
                      {ride.availableSeats} seats available
                    </p>
                    <p className="text-sm text-gray-600">
                      Departure: {ride.departureTime}
                    </p>
                  </div>
                </div>
                <Button
                  className="w-full mt-4 bg-green-600 hover:bg-green-700"
                  onClick={() => handleJoinNearbyRide(ride)}
                >
                  Join this ride
                </Button>
              </Card>
            ))}
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={showRideOptions} onOpenChange={setShowRideOptions}>
        <DialogContent className="sm:max-w-[500px] z-[9999]">
          <DialogHeader>
            <DialogTitle>Choose your shared ride</DialogTitle>
          </DialogHeader>
          <RideOptions
            onBookRide={handleBookRide}
            isShared={true}
            passengerCount={passengerCount}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default RideSharingInterface;
