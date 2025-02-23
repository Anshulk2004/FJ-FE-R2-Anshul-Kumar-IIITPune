import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Receipt } from "lucide-react";

const CourierReceipt = ({
  pickup,
  dropoff,
  senderDetails,
  receiverDetails,
  packageDetails,
  selectedService,
  estimatedPrice,
}) => {
  if (!selectedService) return null;

  return (
    <Card className="shadow-lg p-6 bg-white rounded-lg">
      <CardHeader>
        <CardTitle className="text-xl font-bold text-gray-800 flex items-center">
          <Receipt className="mr-2 text-blue-500" size={24} /> Courier Invoice
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4 text-gray-700">
          {/* Service Details */}
          <div>
            <h3 className="font-semibold text-lg text-blue-600">Service Details</h3>
            <p className="text-gray-600">{selectedService.name} - {selectedService.description}</p>
            <p className="text-gray-600">Estimated Time: {selectedService.estimatedTime}</p>
          </div>
          <Separator />
          
          {/* Locations */}
          <div>
            <h3 className="font-semibold text-lg text-blue-600">Pickup & Drop-off</h3>
            <p><span className="font-semibold">Pickup:</span> {pickup.fullAddress || pickup.address}</p>
            <p><span className="font-semibold">Drop-off:</span> {dropoff.fullAddress || dropoff.address}</p>
          </div>
          <Separator />
          
          {/* Sender & Receiver Details */}
          <div>
            <h3 className="font-semibold text-lg text-blue-600">Sender & Receiver</h3>
            <p><span className="font-semibold">Sender:</span> {senderDetails.name} ({senderDetails.phone})</p>
            <p><span className="font-semibold">Receiver:</span> {receiverDetails.name} ({receiverDetails.phone})</p>
          </div>
          <Separator />
          
          {/* Package Details */}
          <div>
            <h3 className="font-semibold text-lg text-blue-600">Package Details</h3>
            <p><span className="font-semibold">Weight:</span> {packageDetails.weight} kg</p>
            <p><span className="font-semibold">Description:</span> {packageDetails.description}</p>
          </div>
          <Separator />
          
          {/* Pricing */}
          <div className="bg-blue-100 p-4 rounded-md">
            <h3 className="font-semibold text-lg text-blue-600">Price Summary</h3>
            <p className="text-gray-700 font-semibold text-xl">Total: ₹{estimatedPrice}</p>
          </div>
        </div>
        
        <div className="mt-6 flex justify-end">
          <Button variant="outline" onClick={() => window.print()}>Print Invoice</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default CourierReceipt;
