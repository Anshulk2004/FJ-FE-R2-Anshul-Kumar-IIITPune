"use client"
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Car } from 'lucide-react';

const WalletPage = () => {
  // Mock data
  const savedCards = [
    {
      bank: "HDFC Bank",
      number: "****-****-****-4521",
      type: "Credit Card",
      expiry: "12/25"
    },
    {
      bank: "ICICI Bank",
      number: "****-****-****-8742",
      type: "Debit Card",
      expiry: "09/24"
    }
  ];

  const savedUPI = [
    { id: "user@ybl", name: "PhonePe" },
    { id: "user@oksbi", name: "SBI" }
  ];

  const offers = [
    {
      code: "RIDE50",
      discount: "50% OFF",
      description: "Get 50% off on your first ride",
      maxDiscount: "Up to ₹100",
      validTill: "28 Feb 2025"
    },
    {
      code: "WEEKEND25",
      discount: "25% OFF",
      description: "Weekend special discount on all rides",
      maxDiscount: "Up to ₹75",
      validTill: "1 Mar 2025"
    },
    {
      code: "MONSOON30",
      discount: "30% OFF",
      description: "Special monsoon season offer",
      maxDiscount: "Up to ₹150",
      validTill: "5 Mar 2025"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6 pt-20">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Branding Header */}
        <div className="flex items-center gap-3 mb-8">
          <Car className="w-8 h-8 text-blue-600" />
          <h1 className="text-3xl font-bold">RIDE ON Wallet</h1>
        </div>

        {/* Balance Card */}
        <Card>
          <CardContent className="p-8 bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg text-white">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div>
                <p className="text-blue-100 mb-2">Available Balance</p>
                <p className="text-5xl font-bold mb-2">₹250.00</p>
                <p className="text-sm text-blue-100">Your RIDE ON digital wallet</p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <button className="bg-white text-blue-600 px-6 py-2 rounded-lg hover:bg-blue-50 transition-colors font-medium">
                  Add Money
                </button>
                <button className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-400 transition-colors font-medium">
                  Send Money
                </button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {['Pay for Rides', 'Add Bank', 'Link Cards', 'Manage UPI'].map((action, index) => (
            <Card key={index} className="hover:shadow-md transition-all cursor-pointer">
              <CardContent className="p-4 text-center">
                <p className="font-medium">{action}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Payment Methods */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Cards Section */}
          <Card>
            <CardHeader>
              <CardTitle>Saved Cards</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {savedCards.map((card, index) => (
                  <div key={index} className="p-4 bg-gray-50 rounded-lg">
                    <p className="font-medium">{card.bank}</p>
                    <p className="text-sm text-gray-600">{card.number}</p>
                    <p className="text-xs text-gray-500">Expires: {card.expiry}</p>
                  </div>
                ))}
                <button className="w-full mt-4 border-2 border-dashed border-gray-300 p-3 rounded-lg text-gray-600 hover:border-blue-500 hover:text-blue-500 transition-colors">
                  + Add New Card
                </button>
              </div>
            </CardContent>
          </Card>

          {/* UPI Section */}
          <Card>
            <CardHeader>
              <CardTitle>UPI & Bank Accounts</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {savedUPI.map((upi, index) => (
                  <div key={index} className="p-4 bg-gray-50 rounded-lg">
                    <p className="font-medium">{upi.name}</p>
                    <p className="text-sm text-gray-600">{upi.id}</p>
                  </div>
                ))}
                <button className="w-full mt-4 border-2 border-dashed border-gray-300 p-3 rounded-lg text-gray-600 hover:border-blue-500 hover:text-blue-500 transition-colors">
                  + Add UPI ID or Bank Account
                </button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Offers Section */}
        <Card>
          <CardHeader>
            <CardTitle>RIDE ON Offers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {offers.map((offer, index) => (
                <div key={index} className="border-2 border-dashed border-gray-200 rounded-lg p-4 hover:border-blue-500 transition-all">
                  <div className="bg-blue-50 text-blue-600 inline-block px-2 py-1 rounded text-sm font-medium mb-2">
                    {offer.discount}
                  </div>
                  <p className="font-medium mb-2">{offer.description}</p>
                  <div className="flex justify-between items-end">
                    <div>
                      <p className="text-xs text-gray-500">{offer.maxDiscount}</p>
                      <p className="text-xs text-gray-500">Valid till {offer.validTill}</p>
                    </div>
                    <button className="text-sm bg-blue-100 text-blue-600 px-3 py-1 rounded-lg hover:bg-blue-200">
                      {offer.code}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default WalletPage;