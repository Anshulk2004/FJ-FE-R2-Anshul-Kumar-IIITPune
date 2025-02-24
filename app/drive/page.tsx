"use client";
import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useTheme } from "@/components/ThemeContext";
import AuthenticatedNavbar from "../../components/authenticatedNavbar";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface FormData {
  fullName: string;
  phoneNumber: string;
  email: string;
  carType: string;
  workType: string;
  preferredShift?: string;
  termsAccepted: boolean;
}

export default function DrivePage() {
  const { theme } = useTheme();
  const [isPartTime, setIsPartTime] = useState(false);
  const [hours, setHours] = useState(0);
  const [rides, setRides] = useState(0);
  const [showSuccess, setShowSuccess] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    phoneNumber: "",
    email: "",
    carType: "",
    workType: "",
    preferredShift: "",
    termsAccepted: false,
  });

  const isFormValid = () => {
    return (
      formData.fullName.trim() !== "" &&
      formData.phoneNumber.trim() !== "" &&
      formData.email.trim() !== "" &&
      formData.carType !== "" &&
      formData.workType !== "" &&
      (!isPartTime || (isPartTime && formData.preferredShift !== "")) &&
      formData.termsAccepted
    );
  };

  const handleSubmit = () => {
    if (isFormValid()) {
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 5000);

      setFormData({
        fullName: "",
        phoneNumber: "",
        email: "",
        carType: "",
        workType: "",
        preferredShift: "",
        termsAccepted: false,
      });
      setIsPartTime(false);
    }
  };

  const estimatedEarnings = rides * 50 + hours * 30;

  return (
    <div
      className={`min-h-screen ${
        theme === "dark"
          ? "bg-gray-900 text-white"
          : "bg-gray-100 text-gray-800"
      }`}
    >
      <div className="fixed top-0 left-0 w-full z-50">
        <AuthenticatedNavbar />
      </div>

      <div className="container mx-auto px-4 pt-24 pb-12">
        {showSuccess && (
          <Alert className="mb-6 bg-green-100 border-green-400 text-green-700">
            <AlertDescription>
              Application submitted successfully! We'll contact you soon.
            </AlertDescription>
          </Alert>
        )}
        <section className="text-center space-y-4 mb-12">
          <h1
            className={`text-4xl md:text-5xl font-bold ${
              theme === "dark" ? "text-white" : "text-gray-900"
            }`}
          >
            Become a Driver with Us
          </h1>
          <p
            className={`text-lg ${
              theme === "dark" ? "text-gray-300" : "text-gray-600"
            } max-w-2xl mx-auto`}
          >
            Drive on your schedule and earn based on your rides and hours.
            Flexible shifts, competitive pay, and great support.
          </p>
        </section>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-8">
            <Card
              className={theme === "dark" ? "bg-gray-800 border-gray-700" : ""}
            >
              <CardHeader>
                <CardTitle className={theme === "dark" ? "text-white" : ""}>
                  Driver Registration
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Input
                  placeholder="Full Name"
                  value={formData.fullName}
                  onChange={(e) =>
                    setFormData({ ...formData, fullName: e.target.value })
                  }
                  className={
                    theme === "dark"
                      ? "bg-gray-700 border-gray-600 text-white"
                      : ""
                  }
                />
                <Input
                  placeholder="Phone Number"
                  type="tel"
                  value={formData.phoneNumber}
                  onChange={(e) =>
                    setFormData({ ...formData, phoneNumber: e.target.value })
                  }
                  className={
                    theme === "dark"
                      ? "bg-gray-700 border-gray-600 text-white"
                      : ""
                  }
                />
                <Input
                  placeholder="Email Address"
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className={
                    theme === "dark"
                      ? "bg-gray-700 border-gray-600 text-white"
                      : ""
                  }
                />

                <Select
                  value={formData.carType}
                  onValueChange={(val) =>
                    setFormData({ ...formData, carType: val })
                  }
                >
                  <SelectTrigger
                    className={
                      theme === "dark"
                        ? "bg-gray-700 border-gray-600 text-white"
                        : ""
                    }
                  >
                    <SelectValue placeholder="Select Car Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="hatchback">Hatchback</SelectItem>
                    <SelectItem value="sedan">Sedan</SelectItem>
                    <SelectItem value="suv">SUV</SelectItem>
                  </SelectContent>
                </Select>

                <Select
                  value={formData.workType}
                  onValueChange={(val) => {
                    setIsPartTime(val === "part-time");
                    setFormData({ ...formData, workType: val });
                  }}
                >
                  <SelectTrigger
                    className={
                      theme === "dark"
                        ? "bg-gray-700 border-gray-600 text-white"
                        : ""
                    }
                  >
                    <SelectValue placeholder="Work Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="full-time">Full-Time</SelectItem>
                    <SelectItem value="part-time">Part-Time</SelectItem>
                  </SelectContent>
                </Select>

                {isPartTime && (
                  <Select
                    value={formData.preferredShift}
                    onValueChange={(val) =>
                      setFormData({ ...formData, preferredShift: val })
                    }
                  >
                    <SelectTrigger
                      className={
                        theme === "dark"
                          ? "bg-gray-700 border-gray-600 text-white"
                          : ""
                      }
                    >
                      <SelectValue placeholder="Preferred Shift" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="morning">
                        Morning (6 AM - 12 PM)
                      </SelectItem>
                      <SelectItem value="afternoon">
                        Afternoon (12 PM - 6 PM)
                      </SelectItem>
                      <SelectItem value="night">
                        Night (6 PM - 12 AM)
                      </SelectItem>
                    </SelectContent>
                  </Select>
                )}

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="terms"
                    checked={formData.termsAccepted}
                    onCheckedChange={(checked) =>
                      setFormData({
                        ...formData,
                        termsAccepted: checked as boolean,
                      })
                    }
                  />
                  <label
                    htmlFor="terms"
                    className={`text-sm ${
                      theme === "dark" ? "text-gray-300" : "text-gray-600"
                    } cursor-pointer`}
                  >
                    I agree to the terms and conditions
                  </label>
                </div>

                <Button
                  className="w-full"
                  onClick={handleSubmit}
                  disabled={!isFormValid()}
                >
                  Submit Application
                </Button>
              </CardContent>
            </Card>

            <Card
              className={theme === "dark" ? "bg-gray-800 border-gray-700" : ""}
            >
              <CardHeader>
                <CardTitle className={theme === "dark" ? "text-white" : ""}>
                  Estimate Your Earnings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Input
                  type="number"
                  placeholder="Rides per day"
                  onChange={(e) => setRides(Number(e.target.value))}
                  className={
                    theme === "dark"
                      ? "bg-gray-700 border-gray-600 text-white"
                      : ""
                  }
                />
                <Input
                  type="number"
                  placeholder="Hours per day"
                  onChange={(e) => setHours(Number(e.target.value))}
                  className={
                    theme === "dark"
                      ? "bg-gray-700 border-gray-600 text-white"
                      : ""
                  }
                />
                <div
                  className={`text-xl font-semibold ${
                    theme === "dark" ? "text-white" : ""
                  }`}
                >
                  Estimated Earnings: ₹{estimatedEarnings}/day
                </div>
              </CardContent>
            </Card>
          </div>
          <Card
            className={`h-fit ${
              theme === "dark" ? "bg-gray-800 border-gray-700" : ""
            }`}
          >
            <CardHeader>
              <CardTitle className={theme === "dark" ? "text-white" : ""}>
                Driver Guidelines
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul
                className={`space-y-4 ${
                  theme === "dark" ? "text-gray-300" : "text-gray-600"
                }`}
              >
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>
                    Maintain a valid driver's license and vehicle documents
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>
                    Ensure your vehicle is clean and in good condition
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Be polite and respectful to passengers</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Follow all traffic laws and safety regulations</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>
                    Payouts are made weekly based on total rides and working
                    hours
                  </span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
