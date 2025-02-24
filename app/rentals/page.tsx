"use client";
import React, { useState, useEffect } from "react";
import {
  Clock,
  MapPin,
  Navigation,
  Calendar,
  CircleDollarSign,
  ShieldCheck,
  Car,
  Info,
  Search,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import AuthenticatedNavbar from "../../components/authenticatedNavbar";
import DynamicMap from "../../components/DynamicMap";
import { useTheme } from "@/components/ThemeContext";
import PaymentButton from "@/components/PaymentButton";

interface Vehicle {
  id: string;
  name: string;
  seats: number;
  hourlyRate: number;
  dailyRate: number;
  src: string;
}

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

interface Coupon {
  code: string;
  discount: string;
}

type VehicleCategories = {
  [key: string]: Vehicle[];
};

const rentalVehicles: VehicleCategories = {
  economy: [
    {
      id: "e1",
      name: "Suzuki Swift",
      seats: 4,
      hourlyRate: 149,
      dailyRate: 1999,
      src: "/images/rentals.jpg",
    },
    {
      id: "e2",
      name: "Hyundai i20",
      seats: 4,
      hourlyRate: 169,
      dailyRate: 2199,
      src: "/images/rentals.jpg",
    },
  ],
  comfort: [
    {
      id: "c1",
      name: "Honda City",
      seats: 4,
      hourlyRate: 199,
      dailyRate: 2499,
      src: "/images/rentals.jpg",
    },
    {
      id: "c2",
      name: "Maruti Ciaz",
      seats: 4,
      hourlyRate: 209,
      dailyRate: 2699,
      src: "/images/rentals.jpg",
    },
  ],
  suv: [
    {
      id: "s1",
      name: "Toyota Innova",
      seats: 6,
      hourlyRate: 299,
      dailyRate: 3499,
      src: "/images/rentals.jpg",
    },
    {
      id: "s2",
      name: "Mahindra XUV700",
      seats: 6,
      hourlyRate: 319,
      dailyRate: 3699,
      src: "/images/rentals.jpg",
    },
  ],
  luxury: [
    {
      id: "l1",
      name: "Mercedes-Benz E-Class",
      seats: 4,
      hourlyRate: 599,
      dailyRate: 6999,
      src: "/images/rentals.jpg",
    },
    {
      id: "l2",
      name: "BMW 5 Series",
      seats: 4,
      hourlyRate: 649,
      dailyRate: 7499,
      src: "/images/rentals.jpg",
    },
  ],
};

const activeCoupons: Coupon[] = [
  { code: "FIRST50", discount: "₹50 off on first rental" },
  { code: "WEEKEND25", discount: "25% off on weekend bookings" },
  { code: "LONGTRIP", discount: "15% off on 8+ hour rentals" },
];

const RentalsInterface = () => {
  const { theme } = useTheme();
  const [rentalType, setRentalType] = useState<"fixed" | "hourly">("fixed");
  const [selectedCategory, setSelectedCategory] = useState<string>("economy");
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
  const [hours, setHours] = useState<number>(4);
  const [stops, setStops] = useState<Stop[]>([
    { id: "pickup", address: "", coordinates: null },
    { id: "dropoff", address: "", coordinates: null },
  ]);
  const [directions, setDirections] = useState<Direction[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showDirectionsDialog, setShowDirectionsDialog] = useState(false);
  const [selectedCoupon, setSelectedCoupon] = useState<string | null>(null);

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

  useEffect(() => {
    const bothAddressesFilled = stops.every(
      (stop) => stop.address.trim().length > 0
    );
    if (bothAddressesFilled && isSearching) {
      handleSearch();
    }
  }, [stops, isSearching]);

  return (
    <div
      className={`min-h-screen ${
        theme === "dark"
          ? "bg-gray-900 text-white"
          : "bg-gray-100 text-gray-800"
      }`}
    >
      <div className="fixed top-0 left-0 w-full z-50">
        <AuthenticatedNavbar />
      </div>

      <div className="container mx-auto px-4 pt-24 relative z-0">
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 lg:col-span-4 space-y-6">
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
                  Ride On Rentals
                </h2>

                <Select
                  value={rentalType}
                  onValueChange={(value: "fixed" | "hourly") =>
                    setRentalType(value)
                  }
                >
                  <SelectTrigger
                    className={`mb-6 ${
                      theme === "dark"
                        ? "bg-gray-700 border-gray-600 text-white"
                        : ""
                    }`}
                  >
                    <SelectValue placeholder="Select rental type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="fixed">Fixed Route</SelectItem>
                    <SelectItem value="hourly">Hourly Rental</SelectItem>
                  </SelectContent>
                </Select>

                {rentalType === "fixed" && (
                  <div className="space-y-4 mb-6">
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
                                  ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                                  : "bg-white border-gray-200 text-gray-900"
                              }`}
                              value={stop.address}
                              onChange={(e) =>
                                handleAddressChange(index, e.target.value)
                              }
                            />
                          </div>
                        </div>
                      </div>
                    ))}

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
                    )}
                  </div>
                )}

                <div className="mb-6">
                  <label
                    className={`block text-sm font-medium mb-2 ${
                      theme === "dark" ? "text-gray-200" : "text-gray-700"
                    }`}
                  >
                    Rental Duration:
                  </label>
                  <Select
                    value={hours.toString()}
                    onValueChange={(value) => setHours(parseInt(value))}
                  >
                    <SelectTrigger
                      className={
                        theme === "dark"
                          ? "bg-gray-700 border-gray-600 text-white"
                          : ""
                      }
                    >
                      <SelectValue placeholder="Select duration" />
                    </SelectTrigger>
                    <SelectContent>
                      {[2, 4, 6, 8, 10, 12, 24].map((h) => (
                        <SelectItem key={h} value={h.toString()}>
                          {h} hours
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="mb-6">
                  <Select
                    value={selectedCategory}
                    onValueChange={setSelectedCategory}
                  >
                    <SelectTrigger
                      className={
                        theme === "dark"
                          ? "bg-gray-700 border-gray-600 text-white"
                          : ""
                      }
                    >
                      <SelectValue placeholder="Select vehicle category" />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.keys(rentalVehicles).map((category) => (
                        <SelectItem key={category} value={category}>
                          {category.charAt(0).toUpperCase() + category.slice(1)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <div className="mt-4 space-y-4">
                    {rentalVehicles[selectedCategory].map((vehicle) => (
                      <Card
                        key={vehicle.id}
                        className={`cursor-pointer transition-all ${
                          selectedVehicle?.id === vehicle.id
                            ? "ring-2 ring-blue-500"
                            : ""
                        } ${
                          theme === "dark"
                            ? "bg-gray-700 border-gray-600"
                            : "bg-white"
                        }`}
                        onClick={() => setSelectedVehicle(vehicle)}
                      >
                        <CardContent className="p-4">
                          <div className="flex justify-between items-start">
                            <div>
                              <h3
                                className={`font-semibold ${
                                  theme === "dark" ? "text-white" : ""
                                }`}
                              >
                                {vehicle.name}
                              </h3>
                              <p
                                className={`text-sm ${
                                  theme === "dark"
                                    ? "text-gray-300"
                                    : "text-gray-600"
                                }`}
                              >
                                {vehicle.seats} Seater
                              </p>
                              <div className="mt-2">
                                <p
                                  className={`text-sm ${
                                    theme === "dark" ? "text-gray-300" : ""
                                  }`}
                                >
                                  ₹{vehicle.hourlyRate}/hour
                                </p>
                                <p
                                  className={`text-sm ${
                                    theme === "dark" ? "text-gray-300" : ""
                                  }`}
                                >
                                  ₹{vehicle.dailyRate}/day
                                </p>
                              </div>
                            </div>
                            <img
                              src={vehicle.src}
                              alt={vehicle.name}
                              className="w-24 h-16 object-cover rounded"
                            />
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>

                <div className="mb-6">
                  <h3
                    className={`text-lg font-semibold mb-3 ${
                      theme === "dark" ? "text-white" : ""
                    }`}
                  >
                    Available Offers
                  </h3>
                  {activeCoupons.map((coupon) => (
                    <div
                      key={coupon.code}
                      className={`p-3 mb-2 rounded-lg border cursor-pointer transition-all
        ${selectedCoupon === coupon.code ? "border-blue-500 bg-blue-50" : ""}
        ${
          theme === "dark"
            ? "bg-gray-700 border-gray-600"
            : "bg-white border-gray-200"
        }`}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <p
                            className={`font-medium ${
                              theme === "dark" ? "text-white" : "text-gray-800"
                            }`}
                          >
                            {coupon.code}
                          </p>
                          <p
                            className={`text-sm ${
                              theme === "dark"
                                ? "text-gray-300"
                                : "text-gray-600"
                            }`}
                          >
                            {coupon.discount}
                          </p>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setSelectedCoupon(
                              selectedCoupon === coupon.code
                                ? null
                                : coupon.code
                            );
                            alert(
                              `Coupon ${coupon.code} ${
                                selectedCoupon === coupon.code
                                  ? "removed"
                                  : "applied"
                              }!`
                            );
                          }}
                        >
                          {selectedCoupon === coupon.code ? "Remove" : "Apply"}
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="space-y-4">
                  <div
                    className={`p-4 rounded-lg ${
                      theme === "dark" ? "bg-gray-700" : "bg-gray-100"
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <span
                        className={`font-medium ${
                          theme === "dark" ? "text-gray-200" : "text-gray-700"
                        }`}
                      >
                        Total Amount:
                      </span>
                      <span className="text-xl font-bold">
                        ₹
                        {selectedVehicle
                          ? hours * selectedVehicle.hourlyRate
                          : 0}
                      </span>
                    </div>
                    {selectedCoupon && (
                      <div className="text-sm text-green-500 mt-2">
                        Coupon {selectedCoupon} applied!
                      </div>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <PaymentButton
                      ride={{
                        fare: selectedVehicle
                          ? hours * selectedVehicle.hourlyRate
                          : 0,
                        details: {
                          vehicle: selectedVehicle?.name,
                          duration: `${hours} hours`,
                          category: selectedCategory,
                          ...(selectedCoupon && { coupon: selectedCoupon }),
                        },
                      }}
                    />

                    <Button
                      variant="outline"
                      size="lg"
                      className={`${
                        theme === "dark" ? "border-gray-600 text-gray-200" : ""
                      }`}
                      onClick={() => {
                        alert(
                          "Your ride has been booked with pay at end option!"
                        );
                      }}
                    >
                      <div className="flex items-center gap-2">
                        <CircleDollarSign className="w-4 h-4" />
                        Pay at End
                      </div>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Rental Guidelines</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-sm">
                  <li className="flex items-center gap-2">
                    <ShieldCheck className="text-green-600" size={16} />{" "}
                    Security deposit required (refundable)
                  </li>
                  <li className="flex items-center gap-2">
                    <Clock className="text-blue-600" size={16} /> Minimum 2
                    hours rental duration
                  </li>
                  <li className="flex items-center gap-2">
                    <CircleDollarSign className="text-yellow-600" size={16} />{" "}
                    Fuel charges included in rate
                  </li>
                  <li className="flex items-center gap-2">
                    <Info className="text-red-600" size={16} /> Cancellation
                    charges apply within 1 hour of pickup
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <div className="col-span-12 lg:col-span-8">
            <div className="sticky top-24 h-[calc(100vh-6rem)]">
              <div className="w-full h-full rounded-lg overflow-hidden shadow-lg relative z-0">
                <DynamicMap
                  stops={stops}
                  setDirections={() => {}}
                  theme={theme}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RentalsInterface;
