import React from 'react';
import { MapPin, Search } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import AuthenticatedNavbar from '../components/authenticatedNavbar';

const CourierInterface = () => {
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
              <h2 className="text-2xl font-semibold mb-2">Courier</h2>
              <p className="text-gray-600 mb-6">
                Have a courier deliver something for you. Get packages delivered in the time it takes to drive there.
              </p>

              {/* Send/Receive Toggle */}
              <div className="flex gap-4 mb-6">
                <button className="px-8 py-2 border-2 border-black rounded-full font-medium">
                  Send
                </button>
                <button className="px-8 py-2 bg-gray-100 rounded-full text-gray-600">
                  Receive
                </button>
              </div>

              {/* Pickup Location Input */}
              <div className="mb-4">
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 text-gray-500" size={20} />
                  <input
                    type="text"
                    placeholder="Pickup location"
                    className="w-full pl-12 pr-4 py-3 rounded-lg bg-gray-100 border-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              {/* Dropoff Location Input */}
              <div className="mb-4">
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 text-gray-500" size={20} />
                  <input
                    type="text"
                    placeholder="Dropoff location"
                    className="w-full pl-12 pr-4 py-3 rounded-lg bg-gray-100 border-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              {/* Search Button */}
              <button className="w-full py-3 bg-gray-100 text-gray-400 rounded-lg mt-2 hover:bg-gray-200 transition-colors">
                Search
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

export default CourierInterface;