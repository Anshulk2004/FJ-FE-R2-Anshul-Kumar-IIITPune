"use client";
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChevronDown,
  ChevronUp,
  Clock,
  Users,
  Car,
  DollarSign,
  FileText,
  CreditCard,
  MessageSquare,
} from "lucide-react";
import Link from "next/link";
import StripePayment from "@/components/StripePayment";
import PaymentButton from "@/components/PaymentButton";

export default function BookingsPage() {
  const [showAllPastRides, setShowAllPastRides] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const currentRide = {
    id: "CR001",
    driver: "Michael Chen",
    date: "Feb 22, 2025",
    time: "14:30",
    pickup: "123 Main St",
    dropoff: "456 Park Ave",
    passengers: 2,
    fare: 25.5,
    status: "In Progress",
    service: "Premium",
  };

  const upcomingRide = {
    id: "UR001",
    driver: "Sarah Johnson",
    date: "Feb 23, 2025",
    time: "09:15",
    pickup: "789 Oak Rd",
    dropoff: "Airport Terminal 2",
    passengers: 3,
    fare: 45.0,
    status: "Scheduled",
    service: "Economy",
  };

  const pastRides = [
    {
      id: "PR001",
      driver: "James Wilson",
      date: "Feb 20, 2025",
      time: "11:20",
      pickup: "Central Station",
      dropoff: "Shopping Mall",
      passengers: 1,
      fare: 18.75,
      status: "Completed",
      service: "Economy",
    },
    {
      id: "PR002",
      driver: "Emily Davis",
      date: "Feb 18, 2025",
      time: "16:45",
      pickup: "Library",
      dropoff: "City Center",
      passengers: 2,
      fare: 22.5,
      status: "Completed",
      service: "Premium",
    },
    {
      id: "PR003",
      driver: "Robert Brown",
      date: "Feb 15, 2025",
      time: "13:30",
      pickup: "Gym",
      dropoff: "Restaurant Row",
      passengers: 4,
      fare: 35.0,
      status: "Completed",
      service: "Premium",
    },
    {
      id: "PR004",
      driver: "Lisa Martinez",
      date: "Feb 12, 2025",
      time: "19:15",
      pickup: "Concert Hall",
      dropoff: "Residential Area",
      passengers: 2,
      fare: 28.5,
      status: "Completed",
      service: "Economy",
    },
  ];

  const RideCard = ({ ride, type }) => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 transition-all hover:shadow-md">
      <div className="flex justify-between items-start">
        <div className="flex-grow">
          <div className="flex items-center gap-3 mb-1">
            <h4 className="text-xl font-semibold">{ride.driver}</h4>
            <span
              className={`px-3 py-1 rounded-full text-sm font-medium ${
                type === "current"
                  ? "bg-blue-100 text-blue-800"
                  : type === "upcoming"
                  ? "bg-green-100 text-green-800"
                  : "bg-gray-100 text-gray-800"
              }`}
            >
              {ride.status}
            </span>
            <span
              className={`px-3 py-1 rounded-full text-sm font-medium ${
                ride.service === "Premium"
                  ? "bg-purple-100 text-purple-800"
                  : "bg-orange-100 text-orange-800"
              }`}
            >
              {ride.service}
            </span>
          </div>
          <p className="text-sm text-gray-500 mb-4">Booking ID: {ride.id}</p>

          <div className="grid grid-cols-2 gap-y-4 mb-6">
            <div className="flex items-center gap-3">
              <Clock className="w-5 h-5 text-gray-500" />
              <div>
                <p className="text-sm font-medium text-gray-900">{ride.date}</p>
                <p className="text-sm text-gray-500">{ride.time}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Users className="w-5 h-5 text-gray-500" />
              <div>
                <p className="text-sm font-medium text-gray-900">
                  {ride.passengers} passengers
                </p>
              </div>
            </div>
            <div className="col-span-2">
              <div className="flex items-center gap-3">
                <Car className="w-5 h-5 text-gray-500" />
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    {ride.pickup}
                  </p>
                  <p className="text-sm text-gray-500">→</p>
                  <p className="text-sm font-medium text-gray-900">
                    {ride.dropoff}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex gap-3">
          {type === "current" && (
  <PaymentButton ride={ride} />
)}
  
  

          
            {type === "past" && (
              <>
                <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
                  <FileText className="w-4 h-4" />
                  View Transcript
                </button>
                <Link href="/feedback">
                  <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
                    <MessageSquare className="w-4 h-4" />
                    Give Feedback
                  </button>
                </Link>
              </>
            )}
          </div>
        </div>

        <div className="ml-5 flex flex-col items-end">
          <img
            src="/images/rentals.jpg"
            alt={`${ride.service} Vehicle`}
            className="rounded-lg mb-3 object-cover w-25 h-20"
          />
          <div className="text-2xl font-bold text-gray-900">
            ${ride.fare.toFixed(2)}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 p-6 pt-20">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">My Bookings</h1>

        <div className="space-y-12">
          {/* Current Ride Section */}
          <section className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200">
            <h2 className="text-2xl font-semibold mb-6">Current Ride</h2>
            <div className="bg-blue-50/50 rounded-xl p-1">
              {currentRide ? (
                <RideCard ride={currentRide} type="current" />
              ) : (
                <p className="text-gray-600 p-6">
                  No current rides in progress.
                </p>
              )}
            </div>
          </section>

          {/* Upcoming Rides Section */}
          <section className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200">
            <h2 className="text-2xl font-semibold mb-6">Upcoming Rides</h2>
            <div className="bg-green-50/50 rounded-xl p-1">
              {upcomingRide ? (
                <RideCard ride={upcomingRide} type="upcoming" />
              ) : (
                <p className="text-gray-600 p-6">
                  No upcoming rides scheduled.
                </p>
              )}
            </div>
          </section>

          {/* Past Rides Section */}
          <section className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200">
            <h2 className="text-2xl font-semibold mb-6">Past Rides</h2>
            <div className="space-y-4">
              {pastRides
                .slice(0, showAllPastRides ? undefined : 2)
                .map((ride) => (
                  <RideCard key={ride.id} ride={ride} type="past" />
                ))}

              {pastRides.length > 2 && (
                <button
                  onClick={() => setShowAllPastRides(!showAllPastRides)}
                  className="flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors mt-6 font-medium"
                >
                  {showAllPastRides ? (
                    <>
                      Show Less <ChevronUp className="w-5 h-5" />
                    </>
                  ) : (
                    <>
                      Show More <ChevronDown className="w-5 h-5" />
                    </>
                  )}
                </button>
              )}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
