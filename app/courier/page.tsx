"use client"
import React, { useState, useEffect } from 'react';
import { MapPin, Navigation, Package, Clock, Receipt, User, Phone } from 'lucide-react';
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
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import AuthenticatedNavbar from '../components/authenticatedNavbar';
import DynamicMap from '../components/DynamicMap';
import CourierReceipt from '../components/CourierReceipt';



interface Location {
  address: string;
  fullAddress: string;
  coordinates: [number, number] | null;
}

interface CourierService {
  id: string;
  name: string;
  description: string;
  basePrice: number;
  pricePerKm: number;
  estimatedTime: string;
}

const courierServices: CourierService[] = [
  {
    id: 'express',
    name: 'Express Delivery',
    description: 'Delivery within 2-3 hours',
    basePrice: 149,
    pricePerKm: 15,
    estimatedTime: '2-3 hours'
  },
  {
    id: 'standard',
    name: 'Standard Delivery',
    description: 'Same day delivery',
    basePrice: 99,
    pricePerKm: 10,
    estimatedTime: '6-8 hours'
  },
  {
    id: 'economy',
    name: 'Economy Delivery',
    description: 'Next day delivery',
    basePrice: 49,
    pricePerKm: 5,
    estimatedTime: '24 hours'
  }
];

const CourierInterface = () => {
  const [mode, setMode] = useState<'send' | 'receive'>('send');
  const [selectedService, setSelectedService] = useState<string>('');
  const [pickup, setPickup] = useState<Location>({
    address: '',
    fullAddress: '',
    coordinates: null
  });
  const [dropoff, setDropoff] = useState<Location>({
    address: '',
    fullAddress: '',
    coordinates: null
  });
  const [senderDetails, setSenderDetails] = useState({
    name: '',
    phone: '',
  });
  const [receiverDetails, setReceiverDetails] = useState({
    name: '',
    phone: '',
  });
  const [packageDetails, setPackageDetails] = useState({
    weight: '',
    description: ''
  });
  const [estimatedPrice, setEstimatedPrice] = useState<number>(0);
  const [showReceipt, setShowReceipt] = useState(false);

  // Mock function to calculate distance between coordinates
  const calculateDistance = (coord1: [number, number] | null, coord2: [number, number] | null): number => {
    if (!coord1 || !coord2) return 0;
    // This is a simplified calculation - in real app, use proper distance calculation
    return Math.sqrt(Math.pow(coord2[0] - coord1[0], 2) + Math.pow(coord2[1] - coord1[1], 2)) * 111; // Rough conversion to km
  };

  // Calculate price when locations or service changes
  useEffect(() => {
    if (selectedService && pickup.coordinates && dropoff.coordinates) {
      const service = courierServices.find(s => s.id === selectedService);
      if (service) {
        const distance = calculateDistance(pickup.coordinates, dropoff.coordinates);
        const price = service.basePrice + (distance * service.pricePerKm);
        setEstimatedPrice(Math.ceil(price));
      }
    }
  }, [selectedService, pickup.coordinates, dropoff.coordinates]);

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="fixed top-0 left-0 w-full z-50">
        <AuthenticatedNavbar />
      </div>

      <div className="container mx-auto px-4 pt-24">
        <div className="grid grid-cols-2 gap-6">
          {/* Left Column - Courier Interface */}
          <div className="space-y-6">
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle>RideOn Courier Service</CardTitle>
              </CardHeader>
              <CardContent>
                {/* Send/Receive Toggle */}
                <div className="flex gap-4 mb-6">
                  <Button 
                    variant={mode === 'send' ? 'default' : 'outline'}
                    onClick={() => setMode('send')}
                    className="flex-1"
                  >
                    Send Package
                  </Button>
                  <Button 
                    variant={mode === 'receive' ? 'default' : 'outline'}
                    onClick={() => setMode('receive')}
                    className="flex-1"
                  >
                    Track Package
                  </Button>
                </div>

                {mode === 'send' && (
                  <>
                    {/* Location Inputs */}
                    <div className="space-y-4 mb-6">
                      <div>
                        <Label>Pickup Location</Label>
                        <div className="space-y-2">
                          <div className="relative">
                            <MapPin className="absolute left-3 top-3 text-gray-500" size={20} />
                            <Input
                              placeholder="Search pickup location"
                              className="pl-10"
                              value={pickup.address}
                              onChange={(e) => setPickup({ ...pickup, address: e.target.value })}
                            />
                          </div>
                          <Input
                            placeholder="Detailed pickup address"
                            value={pickup.fullAddress}
                            onChange={(e) => setPickup({ ...pickup, fullAddress: e.target.value })}
                          />
                        </div>
                      </div>

                      <div>
                        <Label>Dropoff Location</Label>
                        <div className="space-y-2">
                          <div className="relative">
                            <Navigation className="absolute left-3 top-3 text-gray-500" size={20} />
                            <Input
                              placeholder="Search dropoff location"
                              className="pl-10"
                              value={dropoff.address}
                              onChange={(e) => setDropoff({ ...dropoff, address: e.target.value })}
                            />
                          </div>
                          <Input
                            placeholder="Detailed dropoff address"
                            value={dropoff.fullAddress}
                            onChange={(e) => setDropoff({ ...dropoff, fullAddress: e.target.value })}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Sender Details */}
                    <div className="space-y-4 mb-6">
                      <h3 className="font-semibold">Sender Details</h3>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="relative">
                          <User className="absolute left-3 top-3 text-gray-500" size={20} />
                          <Input
                            placeholder="Sender's name"
                            className="pl-10"
                            value={senderDetails.name}
                            onChange={(e) => setSenderDetails({ ...senderDetails, name: e.target.value })}
                          />
                        </div>
                        <div className="relative">
                          <Phone className="absolute left-3 top-3 text-gray-500" size={20} />
                          <Input
                            placeholder="Sender's phone"
                            className="pl-10"
                            value={senderDetails.phone}
                            onChange={(e) => setSenderDetails({ ...senderDetails, phone: e.target.value })}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Receiver Details */}
                    <div className="space-y-4 mb-6">
                      <h3 className="font-semibold">Receiver Details</h3>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="relative">
                          <User className="absolute left-3 top-3 text-gray-500" size={20} />
                          <Input
                            placeholder="Receiver's name"
                            className="pl-10"
                            value={receiverDetails.name}
                            onChange={(e) => setReceiverDetails({ ...receiverDetails, name: e.target.value })}
                          />
                        </div>
                        <div className="relative">
                          <Phone className="absolute left-3 top-3 text-gray-500" size={20} />
                          <Input
                            placeholder="Receiver's phone"
                            className="pl-10"
                            value={receiverDetails.phone}
                            onChange={(e) => setReceiverDetails({ ...receiverDetails, phone: e.target.value })}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Package Details */}
                    <div className="space-y-4 mb-6">
                      <h3 className="font-semibold">Package Details</h3>
                      <div className="grid grid-cols-2 gap-4">
                        <Input
                          type="number"
                          placeholder="Weight (kg)"
                          value={packageDetails.weight}
                          onChange={(e) => setPackageDetails({ ...packageDetails, weight: e.target.value })}
                        />
                        <Input
                          placeholder="Package description"
                          value={packageDetails.description}
                          onChange={(e) => setPackageDetails({ ...packageDetails, description: e.target.value })}
                        />
                      </div>
                    </div>

                    {/* Delivery Service Selection */}
                    <div className="space-y-4 mb-6">
                      <h3 className="font-semibold">Select Delivery Service</h3>
                      <div className="grid grid-cols-1 gap-4">
                        {courierServices.map((service) => (
                          <Card 
                            key={service.id}
                            className={`cursor-pointer transition-all ${
                              selectedService === service.id ? 'ring-2 ring-blue-500' : ''
                            }`}
                            onClick={() => setSelectedService(service.id)}
                          >
                            <CardContent className="p-4">
                              <div className="flex justify-between items-center">
                                <div>
                                  <h4 className="font-semibold">{service.name}</h4>
                                  <p className="text-sm text-gray-600">{service.description}</p>
                                  <p className="text-sm text-gray-600">Estimated time: {service.estimatedTime}</p>
                                </div>
                                <div className="text-right">
                                  <p className="font-semibold">From ₹{service.basePrice}</p>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </div>

                    {estimatedPrice > 0 && (
                      <div className="mb-6 p-4 bg-blue-50 rounded-lg">
                        <p className="text-lg font-semibold">Estimated Price: ₹{estimatedPrice}</p>
                      </div>
                    )}

                    {/* Action Buttons */}
                    <div className="space-y-3">
                      <Button className="w-full" size="lg">
                        Book Courier
                      </Button>
                      <Dialog open={showReceipt} onOpenChange={setShowReceipt}>
  <DialogTrigger asChild>
    <Button variant="outline" className="w-full" size="lg">
      <Receipt className="mr-2" size={20} />
      View Receipt
    </Button>
  </DialogTrigger>
  <DialogContent className="sm:max-w-[600px]">
    <DialogHeader>
      <DialogTitle>Courier Receipt</DialogTitle>
    </DialogHeader>
    <CourierReceipt
      pickup={pickup}
      dropoff={dropoff}
      senderDetails={senderDetails}
      receiverDetails={receiverDetails}
      packageDetails={packageDetails}
      selectedService={courierServices.find(s => s.id === selectedService)}
      estimatedPrice={estimatedPrice}
    />
  </DialogContent>
</Dialog>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Map */}
          <div className="h-[800px] rounded-lg overflow-hidden shadow-lg">
            <DynamicMap
              stops={[
                { id: 'pickup', address: pickup.address, coordinates: pickup.coordinates },
                { id: 'dropoff', address: dropoff.address, coordinates: dropoff.coordinates }
              ]}
              setDirections={() => {}}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourierInterface;