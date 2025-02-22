import React from 'react';
import { Clock, Briefcase, Car } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import AuthenticatedNavbar from '../components/authenticatedNavbar';

const RentalsInterface = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <div className="fixed top-0 left-0 w-full z-50">
        <AuthenticatedNavbar />
      </div>

      {/* Content Wrapper with Padding to Avoid Overlap */}
      <div className="container mx-auto px-4 mb-20 pt-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="p-4 bg-white rounded-lg shadow-sm">
            <CardContent>
              {/* Illustration */}
              <div className="mb-6">
                <img
                  src="/api/placeholder/400/200"
                  alt="Car rental illustration"
                  className="w-full h-40 object-cover rounded-lg bg-blue-50"
                />
              </div>

              <h2 className="text-2xl font-semibold mb-2">Uber Rentals</h2>
              
              {/* Features List */}
              <div className="space-y-4 mb-6">
                <div className="flex items-center gap-3">
                  <Clock className="text-gray-500" size={20} />
                  <p>Keep a car and driver for up to 12 hours</p>
                </div>
                <div className="flex items-center gap-3">
                  <Briefcase className="text-gray-500" size={20} />
                  <p>Ideal for business meetings, tourist travel and multiple stop trips</p>
                </div>
                <div className="flex items-center gap-3">
                  <Car className="text-gray-500" size={20} />
                  <p>Book for now or reserve for later</p>
                </div>
              </div>

              {/* Get Started Button */}
              <button className="w-full py-3 bg-black text-white rounded-lg mt-4 hover:bg-gray-900 transition-colors">
                Get started
              </button>
            </CardContent>
          </Card>

          {/* Map Section */}
          <div className="hidden md:block bg-gray-200 rounded-lg min-h-[500px]">
            <div className="h-full flex items-center justify-center text-gray-500">
              Map will be integrated here
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RentalsInterface;