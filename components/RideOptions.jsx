import React, { useState } from "react";
import PropTypes from "prop-types";
import { Car, Navigation2, Users, Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useTheme } from "./ThemeContext";
import Image from "next/image";

const vehicleOptions = {
  economy: [
    {
      id: "auto",
      name: "Auto Rickshaw",
      capacity: 3,
      fare: 120,
      image: "/images/rentals.jpg",
      eta: "3 mins",
    },
    {
      id: "sedan",
      name: "4 Seater Sedan",
      capacity: 4,
      fare: 200,
      image: "/images/rentals.jpg",
      eta: "5 mins",
    },
    {
      id: "ertiga",
      name: "Ertiga 6XL",
      capacity: 6,
      fare: 300,
      image: "/images/rentals.jpg",
      eta: "7 mins",
    },
  ],
  premium: [
    {
      id: "premium-sedan",
      name: "Premium Sedan",
      capacity: 4,
      fare: 350,
      image: "/images/rentals.jpg",
      eta: "8 mins",
    },
    {
      id: "suv",
      name: "Premium SUV",
      capacity: 6,
      fare: 450,
      image: "/images/rentals.jpg",
      eta: "10 mins",
    },
  ],
};

const VehicleCard = ({
  vehicle,
  onSelect,
  isSelected,
  sharedRide,
  passengers,
}) => {
  const { theme } = useTheme();

  return (
    <div
      className={`
        p-4 rounded-lg mb-3 cursor-pointer transition-all
        ${
          isSelected
            ? theme === "dark"
              ? "border-blue-500 bg-blue-900/20"
              : "border-blue-500 bg-blue-50"
            : theme === "dark"
            ? "border-gray-700 hover:border-blue-700 bg-gray-800"
            : "border-gray-200 hover:border-blue-300 bg-white"
        }
        border-2
        transform hover:scale-[1.02] transition-transform
      `}
      onClick={() => onSelect(vehicle)}
    >
      <div className="flex flex-col sm:flex-row items-center gap-4">
        <div className="w-full sm:w-20 h-20 relative rounded-lg overflow-hidden bg-gray-200">
          <Car
            className={`absolute inset-0 m-auto ${
              theme === "dark" ? "text-gray-600" : "text-gray-400"
            }`}
            size={32}
          />
          <Image
            src={vehicle.image}
            alt={vehicle.name}
            fill
            className="object-cover"
            onError={(e) => (e.target.style.display = "none")}
          />
        </div>

        <div className="flex-1 w-full sm:w-auto">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <h3
              className={`font-semibold ${
                theme === "dark" ? "text-white" : "text-gray-800"
              }`}
            >
              {vehicle.name}
            </h3>
            <span
              className={`font-semibold text-lg ${
                theme === "dark" ? "text-white" : "text-gray-800"
              }`}
            >
              ₹
              {sharedRide ? Math.ceil(vehicle.fare / passengers) : vehicle.fare}
            </span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mt-2">
            <div
              className={`flex items-center text-sm ${
                theme === "dark" ? "text-gray-300" : "text-gray-600"
              }`}
            >
              <Clock size={16} className="mr-1" />
              <span>{vehicle.eta}</span>
            </div>
            <div
              className={`flex items-center text-sm ${
                theme === "dark" ? "text-gray-300" : "text-gray-600"
              }`}
            >
              <Users size={16} className="mr-1" />
              <span>Up to {vehicle.capacity} people</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const RideOptions = ({ onBookRide, isShared = false, passengerCount = 1 }) => {
  const [selectedTab, setSelectedTab] = useState("economy");
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const { theme } = useTheme();

  return (
    <Card
      className={`shadow-lg ${
        theme === "dark" ? "bg-gray-900 border-gray-700" : "bg-white"
      }`}
    >
      <CardContent className="p-4 sm:p-6">
        <Tabs
          defaultValue="economy"
          className="w-full"
          onValueChange={setSelectedTab}
        >
          <TabsList
            className={`
            grid w-full grid-cols-2 mb-6
            ${theme === "dark" ? "bg-gray-800" : ""}
          `}
          >
            <TabsTrigger
              value="economy"
              className={
                theme === "dark" ? "data-[state=active]:bg-gray-700" : ""
              }
            >
              Economy
            </TabsTrigger>
            <TabsTrigger
              value="premium"
              className={
                theme === "dark" ? "data-[state=active]:bg-gray-700" : ""
              }
            >
              Premium
            </TabsTrigger>
          </TabsList>

          <div className="max-h-[60vh] overflow-y-auto pr-2 -mr-2">
            <TabsContent value="economy" className="mt-0">
              {vehicleOptions.economy.map((vehicle) => (
                <VehicleCard
                  key={vehicle.id}
                  vehicle={vehicle}
                  onSelect={setSelectedVehicle}
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
                  onSelect={setSelectedVehicle}
                  isSelected={selectedVehicle?.id === vehicle.id}
                  sharedRide={isShared}
                  passengers={passengerCount}
                />
              ))}
            </TabsContent>
          </div>
        </Tabs>

        <Button
          className={`
            w-full h-12 mt-4 font-semibold rounded-lg
            ${
              theme === "dark"
                ? "bg-blue-600 hover:bg-blue-700"
                : "bg-blue-600 hover:bg-blue-700"
            } text-white
          `}
          onClick={() => selectedVehicle && onBookRide(selectedVehicle)}
          disabled={!selectedVehicle}
        >
          {selectedVehicle
            ? `Book ${selectedVehicle.name} - ₹${
                isShared
                  ? Math.ceil(selectedVehicle.fare / passengerCount)
                  : selectedVehicle.fare
              }`
            : "Select a vehicle"}
        </Button>
      </CardContent>
    </Card>
  );
};

RideOptions.propTypes = {
  onBookRide: PropTypes.func.isRequired,
  isShared: PropTypes.bool,
  passengerCount: PropTypes.number,
};

RideOptions.defaultProps = {
  isShared: false,
  passengerCount: 1,
};

VehicleCard.propTypes = {
  vehicle: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    capacity: PropTypes.number.isRequired,
    fare: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    eta: PropTypes.string.isRequired,
  }).isRequired,
  onSelect: PropTypes.func.isRequired,
  isSelected: PropTypes.bool.isRequired,
  sharedRide: PropTypes.bool,
  passengers: PropTypes.number,
};

VehicleCard.defaultProps = {
  sharedRide: false,
  passengers: 1,
};

export default RideOptions;
