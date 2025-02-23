import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Car, Navigation2 } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from 'next/image';

const vehicleOptions = {
  economy: [
    {
      id: 'auto',
      name: 'Auto Rickshaw',
      capacity: 3,
      fare: 120,
      image: '/images/rentals.jpg',
      eta: '3 mins'
    },
    {
      id: 'sedan',
      name: '4 Seater Sedan',
      capacity: 4,
      fare: 200,
      image: '/images/rentals.jpg',
      eta: '5 mins'
    },
    {
      id: 'ertiga',
      name: 'Ertiga 6XL',
      capacity: 6,
      fare: 300,
      image: '/images/rentals.jpg',
      eta: '7 mins'
    }
  ],
  premium: [
    {
      id: 'premium-sedan',
      name: 'Premium Sedan',
      capacity: 4,
      fare: 350,
      image: '/images/rentals.jpg',
      eta: '8 mins'
    },
    {
      id: 'suv',
      name: 'Premium SUV',
      capacity: 6,
      fare: 450,
      image: '/images/rentals.jpg',
      eta: '10 mins'
    }
  ]
};

const VehicleCard = ({ vehicle, onSelect, isSelected, sharedRide, passengers }) => (
  <div 
    className={`p-4 border rounded-lg mb-3 cursor-pointer transition-all ${
      isSelected ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-blue-300'
    }`}
    onClick={() => onSelect(vehicle)}
  >
    <div className="flex items-center gap-4">
      <div className="w-20 h-20 relative rounded-lg overflow-hidden bg-gray-200">
        <Car className="absolute inset-0 m-auto text-gray-400" size={32} />
        <Image
          src={vehicle.image}
          alt={vehicle.name}
          fill
          className="object-cover"
          onError={(e) => e.target.style.display = 'none'}
        />
      </div>
      
      <div className="flex-1">
        <h3 className="font-semibold text-gray-800">{vehicle.name}</h3>
        <div className="flex items-center text-sm text-gray-600 mt-1">
          <Navigation2 size={16} className="mr-1" />
          <span>{vehicle.eta}</span>
        </div>
        <div className="flex items-center justify-between mt-2">
          <span className="text-sm text-gray-600">
            Up to {vehicle.capacity} people
          </span>
          <span className="font-semibold text-lg">
            ₹{sharedRide ? Math.ceil(vehicle.fare / passengers) : vehicle.fare}
          </span>
        </div>
      </div>
    </div>
  </div>
);

VehicleCard.propTypes = {
  vehicle: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    capacity: PropTypes.number.isRequired,
    fare: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    eta: PropTypes.string.isRequired
  }).isRequired,
  onSelect: PropTypes.func.isRequired,
  isSelected: PropTypes.bool.isRequired,
  sharedRide: PropTypes.bool,
  passengers: PropTypes.number
};

VehicleCard.defaultProps = {
  sharedRide: false,
  passengers: 1
};

const RideOptions = ({ onBookRide, isShared = false, passengerCount = 1 }) => {
  const [selectedTab, setSelectedTab] = useState('economy');
  const [selectedVehicle, setSelectedVehicle] = useState(null);

  const handleVehicleSelect = (vehicle) => {
    setSelectedVehicle(vehicle);
  };

  const handleBooking = () => {
    if (selectedVehicle) {
      onBookRide(selectedVehicle);
    }
  };

  return (
    <Card className="shadow-lg">
      <CardContent className="p-6">
        <Tabs defaultValue="economy" className="w-full" onValueChange={setSelectedTab}>
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="economy">Economy</TabsTrigger>
            <TabsTrigger value="premium">Premium</TabsTrigger>
          </TabsList>
          
          <TabsContent value="economy" className="mt-0">
            {vehicleOptions.economy.map((vehicle) => (
              <VehicleCard
                key={vehicle.id}
                vehicle={vehicle}
                onSelect={handleVehicleSelect}
                isSelected={selectedVehicle?.id === vehicle.id}
                sharedRide={isShared}
                passengers={passengerCount}
              />
            ))}
          </TabsContent>
          
          <TabsContent value="premium" className="mt-0">
            {vehicleOptions.premium.map((vehicle) => (
              <VehicleCard
                key={vehicle.id}
                vehicle={vehicle}
                onSelect={handleVehicleSelect}
                isSelected={selectedVehicle?.id === vehicle.id}
                sharedRide={isShared}
                passengers={passengerCount}
              />
            ))}
          </TabsContent>
        </Tabs>

        <Button 
          className="w-full h-12 mt-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg"
          onClick={handleBooking}
          disabled={!selectedVehicle}
        >
          Book {selectedVehicle ? selectedVehicle.name : 'Ride'} - ₹{
            selectedVehicle 
              ? (isShared 
                ? Math.ceil(selectedVehicle.fare / passengerCount) 
                : selectedVehicle.fare) 
              : '--'
          }
        </Button>
      </CardContent>
    </Card>
  );
};

RideOptions.propTypes = {
  onBookRide: PropTypes.func.isRequired,
  isShared: PropTypes.bool,
  passengerCount: PropTypes.number
};

RideOptions.defaultProps = {
  isShared: false,
  passengerCount: 1
};

export default RideOptions;