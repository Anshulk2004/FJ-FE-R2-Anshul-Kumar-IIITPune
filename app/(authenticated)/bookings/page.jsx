"use client";
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Receipt, Sun, Moon, ChevronDown, ChevronUp } from "lucide-react";
import { useTheme } from "@/components/ThemeContext";
import { motion, AnimatePresence } from 'framer-motion';

const RideCard = ({ ride, showReceiptButton = false, setShowReceipt, setSelectedRide }) => {
  return (
    <motion.div 
      className="bg-white dark:bg-gray-800 p-6 rounded-lg mb-4 shadow-lg"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      <div className="flex justify-between items-start">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <h3 className="text-gray-900 dark:text-white text-lg font-semibold">{ride.name}</h3>
            <span className={`px-2 py-1 rounded text-sm text-white ${
              ride.status === 'In Progress' ? 'bg-blue-500' :
              ride.status === 'Scheduled' ? 'bg-green-500' :
              'bg-gray-500'
            }`}>
              {ride.status}
            </span>
            <span className={`px-2 py-1 rounded text-sm text-white ${
              ride.type === 'Premium' ? 'bg-purple-500' : 'bg-orange-500'
            }`}>
              {ride.type}
            </span>
          </div>
          <p className="text-gray-600 dark:text-gray-400">Booking ID: {ride.id}</p>
        </div>
        <div className="text-right">
          <p className="text-gray-900 dark:text-white text-xl font-bold">₹{ride.price}</p>
        </div>
      </div>

      <div className="mt-4 space-y-2">
        <div className="flex items-center text-gray-700 dark:text-gray-300">
          <span className="w-32">Date & Time:</span>
          <span>{ride.date} {ride.time}</span>
        </div>
        <div className="flex items-center text-gray-700 dark:text-gray-300">
          <span className="w-32">Pickup:</span>
          <span>{ride.pickup}</span>
        </div>
        <div className="flex items-center text-gray-700 dark:text-gray-300">
          <span className="w-32">Drop-off:</span>
          <span>{ride.dropoff}</span>
        </div>
        <div className="flex items-center text-gray-700 dark:text-gray-300">
          <span className="w-32">Passengers:</span>
          <span>{ride.passengers}</span>
        </div>
      </div>

      <div className="mt-4 flex justify-between items-center">
        {!ride.completed && (
          <Button variant="primary" className="bg-blue-500 text-white hover:bg-blue-600">
            Pay ₹{ride.price}
          </Button>
        )}
        {showReceiptButton && ride.completed && (
          <Button 
            variant="outline" 
            className="border-blue-500 text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900"
            onClick={() => {
              setSelectedRide(ride);
              setShowReceipt(true);
            }}
          >
            View Receipt
          </Button>
        )}
      </div>
    </motion.div>
  );
};

const BookingsPage = () => {
  const { theme, toggleTheme } = useTheme();
  const [showReceipt, setShowReceipt] = React.useState(false);
  const [selectedRide, setSelectedRide] = React.useState(null);
  const [showAllPastRides, setShowAllPastRides] = React.useState(false);

  const currentRide = {
    id: 'CR001',
    name: 'Rajesh Sharma',
    status: 'In Progress',
    type: 'Premium',
    date: 'Feb 22, 2025',
    time: '14:30',
    pickup: 'FC Road, Pune',
    dropoff: 'Koregaon Park, Pune',
    passengers: 2,
    price: 850.00,
    completed: false
  };

  const upcomingRides = [
    {
      id: 'UR001',
      name: 'Priya Patel',
      status: 'Scheduled',
      type: 'Economy',
      date: 'Feb 25, 2025',
      time: '10:00',
      pickup: 'Aundh, Pune',
      dropoff: 'Viman Nagar, Pune',
      passengers: 1,
      price: 450.00,
      completed: false
    }
  ];

  const pastRides = [
    {
      id: 'PR001',
      name: 'Ankit Mehta',
      status: 'Completed',
      type: 'Premium',
      date: 'Feb 20, 2025',
      time: '16:45',
      pickup: 'Shivaji Nagar, Pune',
      dropoff: 'Hadapsar, Pune',
      passengers: 3,
      price: 950.00,
      completed: true
    },
    {
      id: 'PR002',
      name: 'Neha Gupta',
      status: 'Completed',
      type: 'Economy',
      date: 'Feb 18, 2025',
      time: '09:30',
      pickup: 'Baner, Pune',
      dropoff: 'Hinjewadi, Pune',
      passengers: 1,
      price: 550.00,
      completed: true
    },
    {
      id: 'PR003',
      name: 'Vikram Singh',
      status: 'Completed',
      type: 'Premium',
      date: 'Feb 15, 2025',
      time: '14:15',
      pickup: 'Kothrud, Pune',
      dropoff: 'Magarpatta, Pune',
      passengers: 2,
      price: 750.00,
      completed: true
    },
    {
      id: 'PR004',
      name: 'Meera Desai',
      status: 'Completed',
      type: 'Economy',
      date: 'Feb 12, 2025',
      time: '11:00',
      pickup: 'Kalyani Nagar, Pune',
      dropoff: 'Wakad, Pune',
      passengers: 1,
      price: 600.00,
      completed: true
    }
  ];

  const Receipt = ({ ride, onClose }) => {
    // Add a guard clause to prevent rendering if ride is undefined
    if (!ride) return null;
  
    return (
      <Card className="bg-white dark:bg-gray-800 shadow-lg">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-gray-900 dark:text-white flex items-center">
            <Receipt className="mr-2 text-blue-500" size={24} /> Ride Receipt
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-lg text-blue-600 dark:text-blue-400">Ride Details</h3>
              <p className="text-gray-700 dark:text-gray-300">
                {ride?.type} Ride - {ride?.id}
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                Date & Time: {ride?.date} {ride?.time}
              </p>
            </div>
            <Separator className="dark:bg-gray-600" />
  
            <div>
              <h3 className="font-semibold text-lg text-blue-600 dark:text-blue-400">
                Pickup & Drop-off
              </h3>
              <p className="text-gray-700 dark:text-gray-300">
                <span className="font-semibold">Pickup:</span> {ride?.pickup}
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                <span className="font-semibold">Drop-off:</span> {ride?.dropoff}
              </p>
            </div>
            <Separator className="dark:bg-gray-600" />
  
            <div>
              <h3 className="font-semibold text-lg text-blue-600 dark:text-blue-400">
                Passenger Details
              </h3>
              <p className="text-gray-700 dark:text-gray-300">
                <span className="font-semibold">Name:</span> {ride?.name}
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                <span className="font-semibold">Passengers:</span> {ride?.passengers}
              </p>
            </div>
            <Separator className="dark:bg-gray-600" />
  
            <div className="bg-blue-50 dark:bg-blue-900 p-4 rounded-md">
              <h3 className="font-semibold text-lg text-blue-600 dark:text-blue-400">
                Price Summary
              </h3>
              <p className="text-gray-900 dark:text-white font-semibold text-xl">
                Total: ₹{ride?.price}
              </p>
            </div>
          </div>
  
          <div className="mt-6 flex justify-end gap-2">
            <Button 
              variant="outline" 
              className="dark:text-white dark:hover:bg-gray-700"
              onClick={() => window.print()}
            >
              Print Receipt
            </Button>
            <Button 
              variant="outline" 
              className="dark:text-white dark:hover:bg-gray-700"
              onClick={onClose}
            >
              Close
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white pt-16">
      <div className="max-w-4xl mx-auto px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-between items-center mb-12 mt-8"
        >
          <h1 className="text-3xl font-bold">My Bookings</h1>
          <Button
            variant="outline"
            className="p-2 rounded-full"
            onClick={toggleTheme}
          >
            {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>
        </motion.div>
        
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          {currentRide && (
            <>
              <h2 className="text-2xl font-semibold mb-4">Current Ride</h2>
              <RideCard 
                ride={currentRide} 
                setShowReceipt={setShowReceipt}
                setSelectedRide={setSelectedRide}
              />
            </>
          )}
        </motion.section>

        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          {upcomingRides.length > 0 && (
            <>
              <h2 className="text-2xl font-semibold mb-4">Upcoming Rides</h2>
              {upcomingRides.map(ride => (
                <RideCard 
                  key={ride.id} 
                  ride={ride} 
                  showReceiptButton={false}
                  setShowReceipt={setShowReceipt}
                  setSelectedRide={setSelectedRide}
                />
              ))}
            </>
          )}
        </motion.section>

        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h2 className="text-2xl font-semibold mb-4">Past Rides</h2>
          <AnimatePresence>
            {pastRides.slice(0, showAllPastRides ? undefined : 2).map((ride, index) => (
              <RideCard 
                key={ride.id} 
                ride={ride} 
                showReceiptButton={true}
                setShowReceipt={setShowReceipt}
                setSelectedRide={setSelectedRide}
              />
            ))}
          </AnimatePresence>
          
          {pastRides.length > 2 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="flex justify-center mt-4"
            >
              <Button
                variant="outline"
                className="flex items-center gap-2"
                onClick={() => setShowAllPastRides(!showAllPastRides)}
              >
                {showAllPastRides ? (
                  <>Show Less <ChevronUp className="h-4 w-4" /></>
                ) : (
                  <>Show More <ChevronDown className="h-4 w-4" /></>
                )}
              </Button>
            </motion.div>
          )}
        </motion.section>

        <AnimatePresence>
          {showReceipt && selectedRide && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
            >
              <motion.div 
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="max-w-2xl w-full"
              >
                <Receipt 
                  ride={selectedRide} 
                  onClose={() => {
                    setShowReceipt(false);
                    setSelectedRide(null);
                  }}
                />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default BookingsPage;