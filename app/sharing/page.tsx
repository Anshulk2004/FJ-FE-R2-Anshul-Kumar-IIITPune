"use client"
import React, { useState } from "react";
import { MapPin, Navigation, Plus, Clock, Users, Car } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Slider } from "@/components/ui/slider";
import { 
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { 
  Alert,
  AlertTitle,
  AlertDescription 
} from "@/components/ui/alert";
import AuthenticatedNavbar from "../components/authenticatedNavbar";
import DynamicMap from "../components/DynamicMap";
import RideOptions from "../components/RideOptions";
import { useRouter } from "next/navigation";

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
  const [stops, setStops] = useState<Stop[]>([
    { id: "pickup", address: "", coordinates: null },
    { id: "dropoff", address: "", coordinates: null }
  ]);
  const [showDirectionsDialog, setShowDirectionsDialog] = useState(false);
  const [scheduleType, setScheduleType] = useState<"now" | "later" | "tomorrow">("now");
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [showCalendar, setShowCalendar] = useState(false);
  const [showRideOptions, setShowRideOptions] = useState(false);
  const [passengerCount, setPassengerCount] = useState(2);
  const [showNearbyRides, setShowNearbyRides] = useState(false);
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
      departureTime: "15:30"
    },
    {
      id: "2",
      driver: "Sarah M.",
      vehicle: "Honda City",
      from: "Central Station",
      to: "Business District",
      availableSeats: 2,
      price: 120,
      departureTime: "16:00"
    }
  ];

  const calculateSharedPrice = (basePrice: number) => {
    const pricePerPerson = basePrice / passengerCount;
    return {
      perPerson: Math.ceil(pricePerPerson),
      total: basePrice
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
      isShared: "true"
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
      existingRide: "true"
    }).toString();
    
    router.push(`/booking?${queryParams}`);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="fixed top-0 left-0 w-full z-50">
        <AuthenticatedNavbar />
      </div>

      <div className="container mx-auto px-4 pt-24">
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 md:col-span-4 space-y-6">
            <Card className="shadow-lg">
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold mb-6 text-gray-800">Share a ride</h2>

                {/* Passenger Count Selector */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Share ride with (including you):
                  </label>
                  <div className="flex items-center space-x-4">
                    <Users className="text-gray-400" size={20} />
                    <Slider
                      value={[passengerCount]}
                      onValueChange={(value) => setPassengerCount(value[0])}
                      max={5}
                      min={2}
                      step={1}
                      className="flex-1"
                    />
                    <span className="text-lg font-semibold text-gray-700">{passengerCount}</span>
                  </div>
                </div>

                {/* Location Inputs */}
                <div className="space-y-4">
                  {stops.map((stop, index) => (
                    <div key={stop.id} className="relative">
                      <div className="flex items-center space-x-2">
                        <div className="relative flex-1">
                          <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                            {index === 0 ? (
                              <MapPin className="text-gray-400" size={20} />
                            ) : (
                              <Navigation className="text-gray-400" size={20} />
                            )}
                          </div>
                          <Input
                            type="text"
                            placeholder={index === 0 ? "Enter pickup location" : "Enter destination"}
                            className="pl-10 h-12 border-2 border-gray-200 rounded-lg focus:border-blue-500"
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

                  {/* Schedule Picker */}
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button 
                        variant="outline" 
                        className="w-full h-12 justify-start text-left font-normal"
                      >
                        <Clock className="mr-2 h-4 w-4" />
                        {scheduleType === "now" ? "Pickup now" :
                         scheduleType === "tomorrow" ? "Pickup tomorrow" :
                         selectedDate ? `Pickup on ${format(selectedDate, 'PPP')}` :
                         "Schedule for later"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-80">
                      <div className="space-y-2">
                        <Button
                          variant={scheduleType === "now" ? "default" : "ghost"}
                          className="w-full justify-start"
                          onClick={() => setScheduleType("now")}
                        >
                          Pickup now
                        </Button>
                        <Button
                          variant={scheduleType === "tomorrow" ? "default" : "ghost"}
                          className="w-full justify-start"
                          onClick={() => setScheduleType("tomorrow")}
                        >
                          Pickup tomorrow
                        </Button>
                        <Calendar
                          mode="single"
                          selected={selectedDate}
                          onSelect={setSelectedDate}
                          disabled={(date) => date < new Date()}
                          className="rounded-md border"
                        />
                      </div>
                    </PopoverContent>
                  </Popover>

                  {/* Action Buttons */}
                  <div className="space-y-3">
                    <Button 
                      className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg"
                      onClick={() => setShowRideOptions(true)}
                    >
                      Find Shared Rides
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full h-12 border-blue-600 text-blue-600 hover:bg-blue-50 font-semibold rounded-lg"
                      onClick={() => setShowNearbyRides(true)}
                    >
                      View Nearby Shared Rides
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Savings Alert */}
            <Alert className="bg-green-50 border-green-200">
              <Car className="h-4 w-4 text-green-600" />
              <AlertTitle className="text-green-800">Save more by sharing!</AlertTitle>
              <AlertDescription className="text-green-700">
                Share your ride with {passengerCount - 1} others and save up to {((passengerCount - 1) / passengerCount * 100).toFixed()}% on your fare.
              </AlertDescription>
            </Alert>
          </div>

          <div className="col-span-12 md:col-span-8 h-[700px] rounded-lg overflow-hidden shadow-lg">
            <DynamicMap
              stops={stops}
              setDirections={() => {}}
            />
          </div>
        </div>
      </div>

      {/* Nearby Rides Dialog */}
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
                    <p className="text-sm text-gray-600">Driver: {ride.driver}</p>
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

      {/* Ride Options Dialog */}
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