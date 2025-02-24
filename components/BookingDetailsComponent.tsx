"use client";
import React, { useState } from "react";
import {
  Phone,
  MessageCircle,
  CreditCard,
  AlertTriangle,
  ChevronDown,
  Star,
  Flag,
  Copy,
  Coffee,
  Moon,
  Sun,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import DynamicMap from "../components/DynamicMap";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { Suspense } from 'react'
import PaymentButton from "@/components/PaymentButton";
import Link from "next/link";
import { useTheme } from "@/components/ThemeContext";
import AuthenticatedNavbar from "../components/authenticatedNavbar";

const BookingDetailsPage = () => {
  const searchParams = useSearchParams();
  const [showChatBox, setShowChatBox] = useState(false);
  const [showReportDialog, setShowReportDialog] = useState(false);
  const { theme, toggleTheme } = useTheme();

  const vehicleName = searchParams.get("vehicle");
  const fare = searchParams.get("fare");
  // const capacity = searchParams.get("capacity");
  // const eta = searchParams.get("eta");

  const bookingDetails = {
    vehicle: {
      name: vehicleName || "Premium Sedan",
      number: "MH12 AB 1234",
      image: "/images/rentals.jpg",
    },
    driver: {
      name: "John Doe",
      rating: 4.8,
      phone: "+91 98765 43210",
      image: "/images/profile.jpg",
    },
    booking: {
      otp: "1234",
      fare: parseInt(fare || "350"),
      paymentStatus: "pending",
    },
  };

  const guidelines = [
    {
      title: "Do's",
      items: [
        "Wear your seatbelt at all times",
        "Keep the vehicle clean",
        "Be ready at pickup point",
        "Maintain appropriate behavior",
      ],
    },
    {
      title: "Don'ts",
      items: [
        "No smoking inside the vehicle",
        "Don't eat or drink without permission",
        "Avoid unnecessary stops",
        "Don't bring pets without prior approval",
      ],
    },
  ];

  const handleCopyOTP = () => {
    navigator.clipboard.writeText(bookingDetails.booking.otp);
  };

  return (
    <div
    
      className={`min-h-screen py-6 transition-colors duration-200 ${
        theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-100"
      }`}
    >
      <div className="fixed top-0 left-0 w-full z-100">
              <AuthenticatedNavbar />
            </div>
      <div className="container mx-auto px-4">
        <div className="flex justify-end mb-6">
          <Button
            variant="outline"
            size="icon"
            onClick={toggleTheme}
            className={`rounded-full ${
              theme === "dark"
                ? "bg-gray-800 text-yellow-400"
                : "bg-white text-gray-800"
            }`}
          >
            {theme === "dark" ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </Button>
        </div>

        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 lg:col-span-4 space-y-6">
            <Card
              className={`${
                theme === "dark" ? "bg-gray-800 border-gray-700" : ""
              }`}
            >
              <CardContent className="p-6">
                <div className="space-y-6">
                  <div>
                    <h2
                      className={`text-2xl font-bold mb-4 ${
                        theme === "dark" ? "text-white" : ""
                      }`}
                    >
                      Your Ride
                    </h2>
                    <div className="flex items-center gap-4">
                      <div className="w-24 h-24 relative rounded-lg overflow-hidden">
                        <Image
                          src={bookingDetails.vehicle.image}
                          alt={bookingDetails.vehicle.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <h3 className="font-semibold">
                          {bookingDetails.vehicle.name}
                        </h3>
                        <p
                          className={`${
                            theme === "dark" ? "text-gray-400" : "text-gray-600"
                          }`}
                        >
                          {bookingDetails.vehicle.number}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div
                    className={`pt-4 border-t ${
                      theme === "dark" ? "border-gray-700" : ""
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 relative rounded-full overflow-hidden">
                        <Image
                          src={bookingDetails.driver.image}
                          alt={bookingDetails.driver.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <h3 className="font-semibold">
                          {bookingDetails.driver.name}
                        </h3>
                        <div className="flex items-center">
                          <Star className="w-4 h-4 text-yellow-400 fill-current" />
                          <span className="ml-1">
                            {bookingDetails.driver.rating}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div
                    className={`p-4 rounded-lg ${
                      theme === "dark" ? "bg-gray-700" : "bg-gray-50"
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <p
                          className={`text-sm ${
                            theme === "dark" ? "text-gray-300" : "text-gray-600"
                          }`}
                        >
                          Share OTP with driver
                        </p>
                        <p className="text-2xl font-bold">
                          {bookingDetails.booking.otp}
                        </p>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={handleCopyOTP}
                        className={theme === "dark" ? "hover:bg-gray-600" : ""}
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Button
                      className="flex-1"
                      variant={theme === "dark" ? "secondary" : "outline"}
                      onClick={() =>
                        (window.location.href = `tel:${bookingDetails.driver.phone}`)
                      }
                    >
                      <Phone className="w-4 h-4 mr-2" />
                      Call Driver
                    </Button>
                    <Button
                      className="flex-1"
                      variant={theme === "dark" ? "secondary" : "outline"}
                      onClick={() => setShowChatBox(true)}
                    >
                      <MessageCircle className="w-4 h-4 mr-2" />
                      Chat
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card
              className={`${
                theme === "dark" ? "bg-gray-800 border-gray-700" : ""
              }`}
            >
              <CardContent className="p-6">
                <Accordion type="single" collapsible>
                  <AccordionItem
                    value="guidelines"
                    className={theme === "dark" ? "border-gray-700" : ""}
                  >
                    <AccordionTrigger className="hover:no-underline">
                      <div className="flex items-center">
                        <Coffee className="w-4 h-4 mr-2" />
                        Ride Guidelines
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      {guidelines.map((section, index) => (
                        <div key={index} className="mb-4">
                          <h4 className="font-semibold mb-2">
                            {section.title}
                          </h4>
                          <ul className="list-disc pl-5 space-y-2">
                            {section.items.map((item, i) => (
                              <li
                                key={i}
                                className={`text-sm ${
                                  theme === "dark"
                                    ? "text-gray-300"
                                    : "text-gray-600"
                                }`}
                              >
                                {item}
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>

            <Card
              className={`${
                theme === "dark" ? "bg-gray-800 border-gray-700" : ""
              }`}
            >
              <CardContent className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-semibold">Payment</h3>
                  <span className="text-xl font-bold">
                    ₹{bookingDetails.booking.fare}
                  </span>
                </div>
                <PaymentButton ride={bookingDetails} />
              </CardContent>
            </Card>

            <div className="flex gap-4">
              <Link href="/" className="flex-1">
                <Button
                  variant={theme === "dark" ? "secondary" : "outline"}
                  className="w-full"
                >
                  <Star className="w-4 h-4 mr-2" />
                  Give Feedback
                </Button>
              </Link>
              <Button
                variant={theme === "dark" ? "secondary" : "outline"}
                className="flex-1"
                onClick={() => setShowReportDialog(true)}
              >
                <Flag className="w-4 h-4 mr-2" />
                Report Issue
              </Button>
            </div>
          </div>

          <div className="col-span-12 lg:col-span-8">
            <Card
              className={`h-[700px] overflow-hidden ${
                theme === "dark" ? "bg-gray-800 border-gray-700" : ""
              }`}
            >
              <DynamicMap
                stops={[]}
                showVehicle={true}
                setDirections={undefined}
                theme={theme}
              />
            </Card>
          </div>
        </div>
      </div>

      <Dialog open={showChatBox} onOpenChange={setShowChatBox}>
        <DialogContent
          className={`sm:max-w-[500px] z-[9999] ${
            theme === "dark" ? "bg-gray-800 text-white" : ""
          }`}
        >
          <DialogHeader>
            <DialogTitle>Chat with Driver</DialogTitle>
          </DialogHeader>
          <div
            className={`h-[400px] rounded-lg p-4 ${
              theme === "dark" ? "bg-gray-700" : "bg-gray-50"
            }`}
          >
            <p
              className={`text-center ${
                theme === "dark" ? "text-gray-300" : "text-gray-500"
              }`}
            >
              Chat functionality coming soon...
            </p>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={showReportDialog} onOpenChange={setShowReportDialog}>
        <DialogContent
          className={`sm:max-w-[500px] ${
            theme === "dark" ? "bg-gray-800 text-white" : ""
          }`}
        >
          <DialogHeader>
            <DialogTitle>Report an Issue</DialogTitle>
          </DialogHeader>
          <div className="p-4">
            <p>Please describe the issue you're experiencing:</p>
            <textarea
              className={`w-full mt-2 p-2 border rounded-md ${
                theme === "dark" ? "bg-gray-700 border-gray-600 text-white" : ""
              }`}
              rows={4}
              placeholder="Type your concern here..."
            />
            <Button className="w-full mt-4">Submit Report</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default BookingDetailsPage;
