"use client"
import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";

export default function DrivePage() {
  const [isPartTime, setIsPartTime] = useState(false);
  const [hours, setHours] = useState(0);
  const [rides, setRides] = useState(0);

  // Salary Calculation
  const estimatedEarnings = (rides * 50) + (hours * 30); // Example: ₹50 per ride, ₹30 per hour

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-10">
      {/* Hero Section */}
      <section className="text-center space-y-4">
        <h1 className="text-4xl font-bold">Become a Driver with Us</h1>
        <p className="text-gray-600">Drive on your schedule and earn based on your rides and hours. Flexible shifts, competitive pay, and great support.</p>
        <Button className="mt-4 px-6 py-3">Start Registration</Button>
      </section>

      {/* Registration Form */}
      <Card>
        <CardHeader>
          <CardTitle>Driver Registration</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input placeholder="Full Name" />
          <Input placeholder="Phone Number" type="tel" />
          <Input placeholder="Email Address" type="email" />
          
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select Car Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="hatchback">Hatchback</SelectItem>
              <SelectItem value="sedan">Sedan</SelectItem>
              <SelectItem value="suv">SUV</SelectItem>
            </SelectContent>
          </Select>

          <Select onValueChange={(val) => setIsPartTime(val === "part-time")}>
            <SelectTrigger>
              <SelectValue placeholder="Work Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="full-time">Full-Time</SelectItem>
              <SelectItem value="part-time">Part-Time</SelectItem>
            </SelectContent>
          </Select>

          {isPartTime && (
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Preferred Shift" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="morning">Morning (6 AM - 12 PM)</SelectItem>
                <SelectItem value="afternoon">Afternoon (12 PM - 6 PM)</SelectItem>
                <SelectItem value="night">Night (6 PM - 12 AM)</SelectItem>
              </SelectContent>
            </Select>
          )}

<div className="flex items-center space-x-2">
  <Checkbox id="terms" />
  <label htmlFor="terms" className="text-sm text-gray-600 cursor-pointer">
    I agree to the terms and conditions
  </label>
</div>
          <Button className="w-full">Submit Application</Button>
        </CardContent>
      </Card>

      {/* Salary Estimator */}
      <Card>
        <CardHeader>
          <CardTitle>Estimate Your Earnings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input type="number" placeholder="Rides per day" onChange={(e) => setRides(Number(e.target.value))} />
          <Input type="number" placeholder="Hours per day" onChange={(e) => setHours(Number(e.target.value))} />
          <div className="text-xl font-semibold">Estimated Earnings: ₹{estimatedEarnings}/day</div>
        </CardContent>
      </Card>

      {/* Rules & Guidelines */}
      <Card>
        <CardHeader>
          <CardTitle>Driver Guidelines</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="list-disc pl-6 space-y-2 text-gray-600">
            <li>Maintain a valid driver's license and vehicle documents.</li>
            <li>Ensure your vehicle is clean and in good condition.</li>
            <li>Be polite and respectful to passengers.</li>
            <li>Follow all traffic laws and safety regulations.</li>
            <li>Payouts are made weekly based on total rides and working hours.</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
