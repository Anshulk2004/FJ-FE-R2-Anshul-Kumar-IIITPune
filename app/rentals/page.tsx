"use client"
import React, { useState } from 'react';
import { Clock, MapPin, Navigation, Calendar, CircleDollarSign, ShieldCheck, Car, Info } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import AuthenticatedNavbar from '../components/authenticatedNavbar';
import DynamicMap from '../components/DynamicMap';

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

interface Coupon {
  code: string;
  discount: string;
}

type VehicleCategories = {
  [key: string]: Vehicle[];
};

const rentalVehicles: VehicleCategories = {
  economy: [
    { id: 'e1', name: 'Suzuki Swift', seats: 4, hourlyRate: 149, dailyRate: 1999, src: '/images/rentals.jpg' },
    { id: 'e2', name: 'Hyundai i20', seats: 4, hourlyRate: 169, dailyRate: 2199, src: '/images/rentals.jpg' }
  ],
  comfort: [
    { id: 'c1', name: 'Honda City', seats: 4, hourlyRate: 199, dailyRate: 2499, src: '/images/rentals.jpg' },
    { id: 'c2', name: 'Maruti Ciaz', seats: 4, hourlyRate: 209, dailyRate: 2699, src: '/images/rentals.jpg' }
  ],
  suv: [
    { id: 's1', name: 'Toyota Innova', seats: 6, hourlyRate: 299, dailyRate: 3499, src: '/images/rentals.jpg' },
    { id: 's2', name: 'Mahindra XUV700', seats: 6, hourlyRate: 319, dailyRate: 3699, src: '/images/rentals.jpg' }
  ],
  luxury: [
    { id: 'l1', name: 'Mercedes-Benz E-Class', seats: 4, hourlyRate: 599, dailyRate: 6999, src: '/images/rentals.jpg' },
    { id: 'l2', name: 'BMW 5 Series', seats: 4, hourlyRate: 649, dailyRate: 7499,src: '/images/rentals.jpg' }
  ]
};

const activeCoupons: Coupon[] = [
  { code: 'FIRST50', discount: '₹50 off on first rental' },
  { code: 'WEEKEND25', discount: '25% off on weekend bookings' },
  { code: 'LONGTRIP', discount: '15% off on 8+ hour rentals' }
];

const RentalsInterface = () => {
  const [rentalType, setRentalType] = useState<'fixed' | 'hourly'>('fixed');
  const [selectedCategory, setSelectedCategory] = useState<string>('economy');
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
  const [hours, setHours] = useState<number>(4);
  const [stops, setStops] = useState<Stop[]>([
    { id: "pickup", address: "", coordinates: null },
    { id: "dropoff", address: "", coordinates: null }
  ]);

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="fixed top-0 left-0 w-full z-50">
        <AuthenticatedNavbar />
      </div>

      <div className="container mx-auto px-4 pt-24">
        <div className="grid grid-cols-2 gap-6">
          {/* Left Column - Rental Interface */}
          <div className="space-y-6">
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle>Ride On Rentals</CardTitle>
              </CardHeader>
              <CardContent>
                {/* Rental Type Selector */}
                <Select
                  value={rentalType}
                  onValueChange={(value: 'fixed' | 'hourly') => setRentalType(value)}
                >
                  <SelectTrigger className="mb-6">
                    <SelectValue placeholder="Select rental type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="fixed">Fixed Route</SelectItem>
                    <SelectItem value="hourly">Hourly Rental</SelectItem>
                  </SelectContent>
                </Select>

                {/* Location Inputs for Fixed Route */}
                {rentalType === 'fixed' && (
                  <div className="space-y-4 mb-6">
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
                              className="pl-10"
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
                  </div>
                )}

                {/* Hours Selector */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Rental Duration:
                  </label>
                  <Select
                    value={hours.toString()}
                    onValueChange={(value) => setHours(parseInt(value))}
                  >
                    <SelectTrigger>
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

                {/* Vehicle Category Selector */}
                <div className="mb-6">
                  <Select
                    value={selectedCategory}
                    onValueChange={setSelectedCategory}
                  >
                    <SelectTrigger>
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

                  {/* Vehicle List for Selected Category */}
                  <div className="mt-4 space-y-4">
                    {rentalVehicles[selectedCategory].map((vehicle) => (
                      <Card 
                        key={vehicle.id}
                        className={`cursor-pointer transition-all ${
                          selectedVehicle?.id === vehicle.id ? 'ring-2 ring-blue-500' : ''
                        }`}
                        onClick={() => setSelectedVehicle(vehicle)}
                      >
                        <CardContent className="p-4">
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="font-semibold">{vehicle.name}</h3>
                              <p className="text-sm text-gray-600">{vehicle.seats} Seater</p>
                              <div className="mt-2">
                                <p className="text-sm">₹{vehicle.hourlyRate}/hour</p>
                                <p className="text-sm">₹{vehicle.dailyRate}/day</p>
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

                {/* Active Coupons */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-3">Available Offers</h3>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a coupon" />
                    </SelectTrigger>
                    <SelectContent>
                      {activeCoupons.map((coupon) => (
                        <SelectItem key={coupon.code} value={coupon.code}>
                          {coupon.discount} (Code: {coupon.code})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Action Buttons */}
                <div className="space-y-3">
                  <Button className="w-full" size="lg">
                    Pay Now
                  </Button>
                  <Button variant="outline" className="w-full" size="lg">
                    Pay at End
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Rental Guidelines */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Rental Guidelines</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <ShieldCheck className="text-green-600" size={16} />
                    Security deposit required (refundable)
                  </li>
                  <li className="flex items-center gap-2">
                    <Clock className="text-blue-600" size={16} />
                    Minimum 2 hours rental duration
                  </li>
                  <li className="flex items-center gap-2">
                    <CircleDollarSign className="text-yellow-600" size={16} />
                    Fuel charges included in rate
                  </li>
                  <li className="flex items-center gap-2">
                    <Info className="text-red-600" size={16} />
                    Cancellation charges apply within 1 hour of pickup
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Map */}
          <div className="h-[800px] rounded-lg overflow-hidden shadow-lg">
            <DynamicMap
              stops={stops}
              setDirections={() => {}}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RentalsInterface;