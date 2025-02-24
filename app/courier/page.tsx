"use client"
import React, { useState, useEffect } from 'react';
import { MapPin, Navigation, Package, Clock, Receipt, User, Phone } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
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
import { useTheme } from '@/app/components/ThemeContext';

interface Location {
  address: string;
  fullAddress: string;
  coordinates: [number, number] | null;
}

interface Direction {
  id: number;
  text: string;
  distance: number;
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
  const { theme } = useTheme();
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
  const [directions, setDirections] = useState<Direction[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showDirectionsDialog, setShowDirectionsDialog] = useState(false);

  const fetchCoordinates = async (address: string, type: 'pickup' | 'dropoff') => {
    if (!address.trim()) return;
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`
      );
      const data = await response.json();
      if (data.length > 0) {
        const { lat, lon } = data[0];
        if (type === 'pickup') {
          setPickup(prev => ({
            ...prev,
            coordinates: [parseFloat(lat), parseFloat(lon)]
          }));
        } else {
          setDropoff(prev => ({
            ...prev,
            coordinates: [parseFloat(lat), parseFloat(lon)]
          }));
        }
      }
    } catch (error) {
      console.error("Error fetching coordinates:", error);
    }
  };

  const handleSearch = async () => {
    setIsSearching(true);
    try {
      if (pickup.address) await fetchCoordinates(pickup.address, 'pickup');
      if (dropoff.address) await fetchCoordinates(dropoff.address, 'dropoff');
    } catch (error) {
      console.error("Error during search:", error);
    } finally {
      setIsSearching(false);
    }
  };

  
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

  const calculateDistance = (coord1: [number, number] | null, coord2: [number, number] | null): number => {
    if (!coord1 || !coord2) return 0;
    return Math.sqrt(Math.pow(coord2[0] - coord1[0], 2) + Math.pow(coord2[1] - coord1[1], 2)) * 111;
  };

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-100'}`}>
      <div className="fixed top-0 left-0 w-full z-50">
        <AuthenticatedNavbar />
      </div>

      <div className="container mx-auto px-4 pt-24 flex flex-col md:flex-row gap-6">
        {/* Left Column - Courier Interface (1/3) */}
        <div className="w-full md:w-1/3 space-y-6">
          <Card className={`shadow-lg ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white'}`}>
            <CardHeader>
              <CardTitle className={theme === 'dark' ? 'text-white' : ''}>RideOn Courier Service</CardTitle>
            </CardHeader>
            <CardContent>
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
                <div className="space-y-6">
                  {/* Location Inputs */}
                  <div className="space-y-4">
                    <div>
                      <Label className={theme === 'dark' ? 'text-white' : ''}>Pickup Location</Label>
                      <div className="space-y-2">
                        <div className="relative">
                          <MapPin className="absolute left-3 top-3 text-gray-500" size={20} />
                          <Input
                            placeholder="Search pickup location"
                            className={`pl-10 ${theme === 'dark' ? 'bg-gray-700 border-gray-600 text-white' : ''}`}
                            value={pickup.address}
                            onChange={(e) => setPickup({ ...pickup, address: e.target.value })}
                          />
                        </div>
                        <Input
                          placeholder="Detailed pickup address"
                          className={theme === 'dark' ? 'bg-gray-700 border-gray-600 text-white' : ''}
                          value={pickup.fullAddress}
                          onChange={(e) => setPickup({ ...pickup, fullAddress: e.target.value })}
                        />
                      </div>
                    </div>

                    <div>
                      <Label className={theme === 'dark' ? 'text-white' : ''}>Dropoff Location</Label>
                      <div className="space-y-2">
                        <div className="relative">
                          <Navigation className="absolute left-3 top-3 text-gray-500" size={20} />
                          <Input
                            placeholder="Search dropoff location"
                            className={`pl-10 ${theme === 'dark' ? 'bg-gray-700 border-gray-600 text-white' : ''}`}
                            value={dropoff.address}
                            onChange={(e) => setDropoff({ ...dropoff, address: e.target.value })}
                          />
                        </div>
                        <Input
                          placeholder="Detailed dropoff address"
                          className={theme === 'dark' ? 'bg-gray-700 border-gray-600 text-white' : ''}
                          value={dropoff.fullAddress}
                          onChange={(e) => setDropoff({ ...dropoff, fullAddress: e.target.value })}
                        />
                      </div>
                    </div>

                    <Button
                      className={`w-full ${isSearching ? 'opacity-50 cursor-not-allowed' : ''} ${
                        theme === 'dark' ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-600 hover:bg-blue-700'
                      } text-white`}
                      onClick={handleSearch}
                      disabled={isSearching}
                    >
                      {isSearching ? 'Searching...' : 'Search Route'}
                    </Button>

                    {directions.length > 0 && (
                      <Button
                        className={`w-full ${
                          theme === 'dark' ? 'bg-green-600 hover:bg-green-700' : 'bg-green-600 hover:bg-green-700'
                        } text-white`}
                        onClick={() => setShowDirectionsDialog(true)}
                      >
                        Show Directions
                      </Button>
                    )}
                  </div>

                 
                  <div className="space-y-4">
                    <h3 className={`font-semibold ${theme === 'dark' ? 'text-white' : ''}`}>Package Details</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <Input
                        type="number"
                        placeholder="Weight (kg)"
                        className={theme === 'dark' ? 'bg-gray-700 border-gray-600 text-white' : ''}
                        value={packageDetails.weight}
                        onChange={(e) => setPackageDetails({ ...packageDetails, weight: e.target.value })}
                      />
                      <Input
                        placeholder="Package description"
                        className={theme === 'dark' ? 'bg-gray-700 border-gray-600 text-white' : ''}
                        value={packageDetails.description}
                        onChange={(e) => setPackageDetails({ ...packageDetails, description: e.target.value })}
                      />
                    </div>
                  </div>

                  
                  <div className="space-y-4">
                    <h3 className={`font-semibold ${theme === 'dark' ? 'text-white' : ''}`}>Sender Details</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="relative">
                        <User className="absolute left-3 top-3 text-gray-500" size={20} />
                        <Input
                          placeholder="Sender's name"
                          className={`pl-10 ${theme === 'dark' ? 'bg-gray-700 border-gray-600 text-white' : ''}`}
                          value={senderDetails.name}
                          onChange={(e) => setSenderDetails({ ...senderDetails, name: e.target.value })}
                        />
                      </div>
                      <div className="relative">
                        <Phone className="absolute left-3 top-3 text-gray-500" size={20} />
                        <Input
                          placeholder="Sender's phone"
                          className={`pl-10 ${theme === 'dark' ? 'bg-gray-700 border-gray-600 text-white' : ''}`}
                          value={senderDetails.phone}
                          onChange={(e) => setSenderDetails({ ...senderDetails, phone: e.target.value })}
                        />
                      </div>
                    </div>
                  </div>
                 
                  <div className="space-y-4">
                    <h3 className={`font-semibold ${theme === 'dark' ? 'text-white' : ''}`}>Receiver Details</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="relative">
                        <User className="absolute left-3 top-3 text-gray-500" size={20} />
                        <Input
                          placeholder="Receiver's name"
                          className={`pl-10 ${theme === 'dark' ? 'bg-gray-700 border-gray-600 text-white' : ''}`}
                          value={receiverDetails.name}
                          onChange={(e) => setReceiverDetails({ ...receiverDetails, name: e.target.value })}
                        />
                      </div>
                      <div className="relative">
                        <Phone className="absolute left-3 top-3 text-gray-500" size={20} />
                        <Input
                          placeholder="Receiver's phone"
                          className={`pl-10 ${theme === 'dark' ? 'bg-gray-700 border-gray-600 text-white' : ''}`}
                          value={receiverDetails.phone}
                          onChange={(e) => setReceiverDetails({ ...receiverDetails, phone: e.target.value })}
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className={`font-semibold ${theme === 'dark' ? 'text-white' : ''}`}>Select Delivery Service</h3>
                    <div className="grid grid-cols-1 gap-4">
                      {courierServices.map((service) => (
                        <Card 
                          key={service.id}
                          className={`cursor-pointer transition-all ${
                            selectedService === service.id ? 'ring-2 ring-blue-500' : ''
                          } ${theme === 'dark' ? 'bg-gray-700 border-gray-600' : ''}`}
                          onClick={() => setSelectedService(service.id)}
                        >
                          <CardContent className="p-4">
                            <div className="flex justify-between items-center">
                              <div>
                                <h4 className={`font-semibold ${theme === 'dark' ? 'text-white' : ''}`}>{service.name}</h4>
                                <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>{service.description}</p>
                                <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>Estimated time: {service.estimatedTime}</p>
                              </div>
                              <div className="text-right">
                                <p className={`font-semibold ${theme === 'dark' ? 'text-white' : ''}`}>From ₹{service.basePrice}</p>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>

                  {estimatedPrice > 0 && (
                    <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-blue-900' : 'bg-blue-50'}`}>
                      <p className={`text-lg font-semibold ${theme === 'dark' ? 'text-white' : ''}`}>
                        Estimated Price: ₹{estimatedPrice}
                      </p>
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
                      <DialogContent className={`sm:max-w-[600px] ${theme === 'dark' ? 'bg-gray-800 text-white' : ''}`}>
                        <DialogHeader>
                          <DialogTitle className={theme === 'dark' ? 'text-white' : ''}>Courier Receipt</DialogTitle>
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
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        
        <div className="w-full md:w-2/3 h-[calc(100vh-6rem)] sticky top-24">
          <div className="h-full rounded-lg overflow-hidden shadow-lg">
            <DynamicMap
              stops={[
                { id: 'pickup', address: pickup.address, coordinates: pickup.coordinates },
                { id: 'dropoff', address: dropoff.address, coordinates: dropoff.coordinates }
              ]}
              setDirections={setDirections}
              theme={theme}
            />
          </div>
        </div>
      </div>
      
      <Dialog open={showDirectionsDialog} onOpenChange={setShowDirectionsDialog}>
        <DialogContent className={`sm:max-w-[500px] ${theme === 'dark' ? 'bg-gray-800 text-white' : ''}`}>
          <DialogHeader>
            <DialogTitle className={theme === 'dark' ? 'text-white' : ''}>Route Directions</DialogTitle>
          </DialogHeader>
          <div className="max-h-[60vh] overflow-y-auto">
            <div className="space-y-4">
              {directions.map((direction, index) => (
                <div key={direction.id} className={`p-2 rounded ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'}`}>
                  <p className={theme === 'dark' ? 'text-white' : ''}>
                    {index + 1}. {direction.text}
                    <span className={`text-sm ml-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-500'}`}>
                      ({Math.round(direction.distance)}m)
                    </span>
                  </p>
                </div>
              ))}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CourierInterface;