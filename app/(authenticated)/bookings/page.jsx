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
  Moon,
  Sun,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "@/app/components/ThemeContext";
import Link from "next/link";
import StripePayment from "@/components/StripePayment";
import PaymentButton from "@/components/PaymentButton";

export default function BookingsPage() {
  const [showAllPastRides, setShowAllPastRides] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const { theme, toggleTheme } = useTheme();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 },
    },
  };

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
    <motion.div
      variants={itemVariants}
      className={`${
        theme === "dark"
          ? "bg-gray-800 border-gray-700"
          : "bg-white border-gray-200"
      } rounded-xl shadow-sm border p-6 transition-all hover:shadow-md`}
    >
      <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
        <div className="flex-grow">
          <div className="flex flex-wrap items-center gap-3 mb-1">
            <h4
              className={`text-xl font-semibold ${
                theme === "dark" ? "text-white" : "text-gray-900"
              }`}
            >
              {ride.driver}
            </h4>
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
          <p
            className={`text-sm ${
              theme === "dark" ? "text-gray-400" : "text-gray-500"
            } mb-4`}
          >
            Booking ID: {ride.id}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 mb-6">
            <div className="flex items-center gap-3">
              <Clock
                className={`w-5 h-5 ${
                  theme === "dark" ? "text-gray-400" : "text-gray-500"
                }`}
              />
              <div>
                <p
                  className={`text-sm font-medium ${
                    theme === "dark" ? "text-gray-200" : "text-gray-900"
                  }`}
                >
                  {ride.date}
                </p>
                <p
                  className={`text-sm ${
                    theme === "dark" ? "text-gray-400" : "text-gray-500"
                  }`}
                >
                  {ride.time}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Users
                className={`w-5 h-5 ${
                  theme === "dark" ? "text-gray-400" : "text-gray-500"
                }`}
              />
              <div>
                <p
                  className={`text-sm font-medium ${
                    theme === "dark" ? "text-gray-200" : "text-gray-900"
                  }`}
                >
                  {ride.passengers} passengers
                </p>
              </div>
            </div>
            <div className="col-span-1 sm:col-span-2">
              <div className="flex items-center gap-3">
                <Car
                  className={`w-5 h-5 ${
                    theme === "dark" ? "text-gray-400" : "text-gray-500"
                  }`}
                />
                <div>
                  <p
                    className={`text-sm font-medium ${
                      theme === "dark" ? "text-gray-200" : "text-gray-900"
                    }`}
                  >
                    {ride.pickup}
                  </p>
                  <p
                    className={`text-sm ${
                      theme === "dark" ? "text-gray-400" : "text-gray-500"
                    }`}
                  >
                    →
                  </p>
                  <p
                    className={`text-sm font-medium ${
                      theme === "dark" ? "text-gray-200" : "text-gray-900"
                    }`}
                  >
                    {ride.dropoff}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            {type === "current" && <PaymentButton ride={ride} />}
            {type === "past" && (
              <>
                <button
                  className={`flex items-center gap-2 px-4 py-2 ${
                    theme === "dark"
                      ? "bg-gray-700 text-gray-200 hover:bg-gray-600"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  } rounded-lg transition-colors`}
                >
                  <FileText className="w-4 h-4" />
                  View Transcript
                </button>
                <Link href="/feedback">
                  <button
                    className={`flex items-center gap-2 px-4 py-2 ${
                      theme === "dark"
                        ? "bg-gray-700 text-gray-200 hover:bg-gray-600"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    } rounded-lg transition-colors`}
                  >
                    <MessageSquare className="w-4 h-4" />
                    Give Feedback
                  </button>
                </Link>
              </>
            )}
          </div>
        </div>

        <div className="ml-0 md:ml-5 flex flex-col items-start md:items-end">
          <img
            src="/images/rentals.jpg"
            alt={`${ride.service} Vehicle`}
            className="rounded-lg mb-3 object-cover w-full md:w-25 h-20"
          />
          <div
            className={`text-2xl font-bold ${
              theme === "dark" ? "text-white" : "text-gray-900"
            }`}
          >
            ${ride.fare.toFixed(2)}
          </div>
        </div>
      </div>
    </motion.div>
  );

  return (
    <div
      className={`min-h-screen ${
        theme === "dark" ? "bg-gray-900" : "bg-gray-50"
      } p-4 md:p-6 pt-20 transition-colors duration-300`}
    >
      <motion.button
        className={`fixed top-24 right-4 p-2 rounded-full ${
          theme === "dark" ? "bg-gray-800" : "bg-white"
        } shadow-lg z-50`}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={toggleTheme}
      >
        {theme === "dark" ? (
          <Sun className="w-6 h-6 text-white" />
        ) : (
          <Moon className="w-6 h-6" />
        )}
      </motion.button>

      <motion.div
        className="max-w-6xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h1
          variants={itemVariants}
          className={`text-4xl font-bold mb-8 ${
            theme === "dark" ? "text-white" : ""
          }`}
        >
          My Bookings
        </motion.h1>

        <div className="space-y-12">
          <motion.section
            variants={itemVariants}
            className={`${
              theme === "dark"
                ? "bg-gray-800 border-gray-700"
                : "bg-white border-gray-200"
            } rounded-2xl p-4 md:p-8 shadow-sm border transition-colors duration-300`}
          >
            <h2
              className={`text-2xl font-semibold mb-6 ${
                theme === "dark" ? "text-white" : ""
              }`}
            >
              Current Ride
            </h2>
            <div
              className={`${
                theme === "dark" ? "bg-gray-700/50" : "bg-blue-50/50"
              } rounded-xl p-1`}
            >
              {currentRide ? (
                <RideCard ride={currentRide} type="current" />
              ) : (
                <p
                  className={`text-gray-600 p-6 ${
                    theme === "dark" ? "text-gray-400" : ""
                  }`}
                >
                  No current rides in progress.
                </p>
              )}
            </div>
          </motion.section>

          <motion.section
            variants={itemVariants}
            className={`${
              theme === "dark"
                ? "bg-gray-800 border-gray-700"
                : "bg-white border-gray-200"
            } rounded-2xl p-4 md:p-8 shadow-sm border transition-colors duration-300`}
          >
            <h2
              className={`text-2xl font-semibold mb-6 ${
                theme === "dark" ? "text-white" : ""
              }`}
            >
              Upcoming Rides
            </h2>
            <div
              className={`${
                theme === "dark" ? "bg-gray-700/50" : "bg-green-50/50"
              } rounded-xl p-1`}
            >
              {upcomingRide ? (
                <RideCard ride={upcomingRide} type="upcoming" />
              ) : (
                <p
                  className={`text-gray-600 p-6 ${
                    theme === "dark" ? "text-gray-400" : ""
                  }`}
                >
                  No upcoming rides scheduled.
                </p>
              )}
            </div>
          </motion.section>

          <motion.section
            variants={itemVariants}
            className={`${
              theme === "dark"
                ? "bg-gray-800 border-gray-700"
                : "bg-white border-gray-200"
            } rounded-2xl p-4 md:p-8 shadow-sm border transition-colors duration-300`}
          >
            <h2
              className={`text-2xl font-semibold mb-6 ${
                theme === "dark" ? "text-white" : ""
              }`}
            >
              Past Rides
            </h2>
            <div className="space-y-4">
              <AnimatePresence>
                {pastRides
                  .slice(0, showAllPastRides ? undefined : 2)
                  .map((ride) => (
                    <RideCard key={ride.id} ride={ride} type="past" />
                  ))}
              </AnimatePresence>

              {pastRides.length > 2 && (
                <motion.button
                  variants={itemVariants}
                  onClick={() => setShowAllPastRides(!showAllPastRides)}
                  className={`flex items-center gap-2 ${
                    theme === "dark"
                      ? "text-blue-400 hover:text-blue-300"
                      : "text-blue-600 hover:text-blue-800"
                  } transition-colors mt-6 font-medium`}
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
                </motion.button>
              )}
            </div>
          </motion.section>
        </div>
      </motion.div>
    </div>
  );
}
