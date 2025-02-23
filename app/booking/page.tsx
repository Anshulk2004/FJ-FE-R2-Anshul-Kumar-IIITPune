"use client"
import React, { useState } from 'react';
import { 
  Phone, 
  MessageCircle, 
  CreditCard, 
  AlertTriangle, 
  ChevronDown, 
  Star, 
  Flag,
  Copy,
  Coffee
} from 'lucide-react';
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
import DynamicMap from '../components/DynamicMap';
import Image from 'next/image';
import { useSearchParams } from "next/navigation";
import PaymentButton from '@/components/PaymentButton';
import router from 'next/router';
import Link from 'next/link';

const BookingDetailsPage = () => {
  const searchParams = useSearchParams();
  const [showChatBox, setShowChatBox] = useState(false);
  const [showFeedbackDialog, setShowFeedbackDialog] = useState(false);
  const [showReportDialog, setShowReportDialog] = useState(false);

  const vehicleName = searchParams.get('vehicle');
  const fare = searchParams.get('fare');
  const capacity = searchParams.get('capacity');
  const eta = searchParams.get('eta');

  // Mock booking details - replace with actual data from your backend
  const bookingDetails = {
    vehicle: {
        name: vehicleName || "Premium Sedan",
        number: "MH12 AB 1234",
        image: "/images/rentals.jpg"
      },
    driver: {
      name: "John Doe",
      rating: 4.8,
      phone: "+91 98765 43210",
      image: "/images/profile.jpg"
    },
    booking: {
        otp: "1234",
        fare: parseInt(fare || "350"),
        paymentStatus: "pending"
      },
  };

  const guidelines = [
    {
      title: "Do's",
      items: [
        "Wear your seatbelt at all times",
        "Keep the vehicle clean",
        "Be ready at pickup point",
        "Maintain appropriate behavior"
      ]
    },
    {
      title: "Don'ts",
      items: [
        "No smoking inside the vehicle",
        "Don't eat or drink without permission",
        "Avoid unnecessary stops",
        "Don't bring pets without prior approval"
      ]
    }
  ];

  const handleCopyOTP = () => {
    navigator.clipboard.writeText(bookingDetails.booking.otp);
    // You can add a toast notification here
  };

  return (
    <div className="min-h-screen bg-gray-100 py-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-12 gap-6">
          {/* Left Column - Booking Details */}
          <div className="col-span-12 md:col-span-4 space-y-6">
            {/* Vehicle and Driver Details Card */}
            <Card>
              <CardContent className="p-6">
                <div className="space-y-6">
                  {/* Vehicle Details */}
                  <div>
                    <h2 className="text-2xl font-bold mb-4">Your Ride</h2>
                    <div className="flex items-center gap-4">
                      <div className="w-20 h-20 relative rounded-lg overflow-hidden">
                        <Image
                          src={bookingDetails.vehicle.image}
                          alt={bookingDetails.vehicle.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <h3 className="font-semibold">{bookingDetails.vehicle.name}</h3>
                        <p className="text-gray-600">{bookingDetails.vehicle.number}</p>
                      </div>
                    </div>
                  </div>

                  {/* Driver Details */}
                  <div className="pt-4 border-t">
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
                        <h3 className="font-semibold">{bookingDetails.driver.name}</h3>
                        <div className="flex items-center">
                          <Star className="w-4 h-4 text-yellow-400 fill-current" />
                          <span className="ml-1">{bookingDetails.driver.rating}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* OTP Section */}
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-sm text-gray-600">Share OTP with driver</p>
                        <p className="text-2xl font-bold">{bookingDetails.booking.otp}</p>
                      </div>
                      <Button variant="ghost" size="icon" onClick={handleCopyOTP}>
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    <Button 
                      className="flex-1"
                      variant="outline"
                      onClick={() => window.location.href = `tel:${bookingDetails.driver.phone}`}
                    >
                      <Phone className="w-4 h-4 mr-2" />
                      Call Driver
                    </Button>
                    <Button 
                      className="flex-1"
                      variant="outline"
                      onClick={() => setShowChatBox(true)}
                    >
                      <MessageCircle className="w-4 h-4 mr-2" />
                      Chat
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Guidelines Accordion */}
            <Card>
              <CardContent className="p-6">
                <Accordion type="single" collapsible>
                  <AccordionItem value="guidelines">
                    <AccordionTrigger>
                      <div className="flex items-center">
                        <Coffee className="w-4 h-4 mr-2" />
                        Ride Guidelines
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      {guidelines.map((section, index) => (
                        <div key={index} className="mb-4">
                          <h4 className="font-semibold mb-2">{section.title}</h4>
                          <ul className="list-disc pl-5 space-y-1">
                            {section.items.map((item, i) => (
                              <li key={i} className="text-sm text-gray-600">{item}</li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>

            {/* Payment Section */}
            <Card>
              <CardContent className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-semibold">Payment</h3>
                  <span className="text-xl font-bold">₹{bookingDetails.booking.fare}</span>
                </div>
                <PaymentButton
                //  amount ={350}
                 ride={bookingDetails} />
              </CardContent>
            </Card>

            {/* Feedback and Report Buttons */}
            <div className="flex gap-4">
              <Link href="/" className="flex-1">
                <Button 
                  variant="outline" 
                  className="w-full"
                >
                  <Star className="w-4 h-4 mr-2" />
                  Give Feedback
                </Button>
              </Link>
              <Button 
                variant="outline" 
                className="flex-1"
                onClick={() => setShowReportDialog(true)}
              >
                <Flag className="w-4 h-4 mr-2" />
                Report Issue
              </Button>
            </div>
          </div>

          {/* Right Column - Map */}
          <div className="col-span-12 md:col-span-8 h-[700px] rounded-lg overflow-hidden shadow-lg">
            <DynamicMap
                          stops={stop}
                          showVehicle={true} // Add this prop to your DynamicMap component
                          setDirections={undefined}            />
          </div>
        </div>
      </div>

      

      {/* Chat Dialog */}
      <Dialog open={showChatBox} onOpenChange={setShowChatBox}>
        <DialogContent className="sm:max-w-[500px] z-[9999]">
          <DialogHeader>
            <DialogTitle>Chat with Driver</DialogTitle>
          </DialogHeader>
          <div className="h-[400px] bg-gray-50 rounded-lg p-4">
            <p className="text-center text-gray-500">Chat functionality coming soon...</p>
          </div>
        </DialogContent>
      </Dialog>
      

      {/* Report Dialog */}
      <Dialog open={showReportDialog} onOpenChange={setShowReportDialog}>
        <DialogContent className="sm:max-w-[500px] z-[9999]">
          <DialogHeader>
            <DialogTitle>Report an Issue</DialogTitle>
          </DialogHeader>
          <div className="p-4">
            <p>Please describe the issue you're experiencing:</p>
            <textarea 
              className="w-full mt-2 p-2 border rounded-md" 
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