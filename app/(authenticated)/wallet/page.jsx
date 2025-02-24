"use client";
import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Car, Plus, CreditCard, Smartphone } from "lucide-react";
import { useTheme } from "@/app/components/ThemeContext";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

const WalletPage = () => {
  const { theme } = useTheme();
  const savedCards = [
    {
      bank: "HDFC Bank",
      number: "****-****-****-4521",
      type: "Credit Card",
      expiry: "12/25",
    },
    {
      bank: "ICICI Bank",
      number: "****-****-****-8742",
      type: "Debit Card",
      expiry: "09/24",
    },
  ];

  const savedUPI = [
    { id: "user@ybl", name: "PhonePe" },
    { id: "user@oksbi", name: "SBI" },
  ];

  const offers = [
    {
      code: "RIDE50",
      discount: "50% OFF",
      description: "Get 50% off on your first ride",
      maxDiscount: "Up to ₹100",
      validTill: "28 Feb 2025",
    },
    {
      code: "WEEKEND25",
      discount: "25% OFF",
      description: "Weekend special discount on all rides",
      maxDiscount: "Up to ₹75",
      validTill: "1 Mar 2025",
    },
    {
      code: "MONSOON30",
      discount: "30% OFF",
      description: "Special monsoon season offer",
      maxDiscount: "Up to ₹150",
      validTill: "5 Mar 2025",
    },
  ];

  return (
    <div
      className={`min-h-screen p-6 pt-20 ${
        theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-50"
      }`}
    >
      <motion.div
        className="max-w-6xl mx-auto space-y-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div
          className="flex items-center gap-3 mb-8"
          variants={itemVariants}
        >
          <Car className="w-8 h-8 text-blue-600 dark:text-blue-400" />
          <h1 className="text-3xl font-bold">RIDE ON Wallet</h1>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Card className="overflow-hidden">
            <CardContent className="p-8 bg-gradient-to-r from-blue-600 to-blue-700 dark:from-blue-800 dark:to-blue-900 rounded-lg text-white">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                <div>
                  <p className="text-blue-100">Available Balance</p>
                  <motion.p
                    className="text-5xl font-bold mb-2"
                    initial={{ scale: 0.9 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    ₹250.00
                  </motion.p>
                  <p className="text-sm text-blue-100">
                    Your RIDE ON digital wallet
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-3">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-white text-blue-600 px-6 py-2 rounded-lg hover:bg-blue-50 transition-colors font-medium"
                  >
                    Add Money
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-400 transition-colors font-medium"
                  >
                    Send Money
                  </motion.button>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-4"
          variants={itemVariants}
        >
          {["Pay for Rides", "Add Bank", "Link Cards", "Manage UPI"].map(
            (action, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Card
                  className={`hover:shadow-md transition-all cursor-pointer ${
                    theme === "dark"
                      ? "bg-gray-800 hover:bg-gray-700"
                      : "bg-white hover:bg-gray-50"
                  }`}
                >
                  <CardContent className="p-4 text-center">
                    <p className="font-medium">{action}</p>
                  </CardContent>
                </Card>
              </motion.div>
            )
          )}
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          <motion.div variants={itemVariants}>
            <Card className={theme === "dark" ? "bg-gray-800" : "bg-white"}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="w-5 h-5" />
                  Saved Cards
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {savedCards.map((card, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className={`p-4 rounded-lg ${
                        theme === "dark" ? "bg-gray-700" : "bg-gray-50"
                      }`}
                    >
                      <p className="font-medium">{card.bank}</p>
                      <p
                        className={`text-sm ${
                          theme === "dark" ? "text-gray-300" : "text-gray-600"
                        }`}
                      >
                        {card.number}
                      </p>
                      <p
                        className={`text-xs ${
                          theme === "dark" ? "text-gray-400" : "text-gray-500"
                        }`}
                      >
                        Expires: {card.expiry}
                      </p>
                    </motion.div>
                  ))}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`w-full mt-4 border-2 border-dashed p-3 rounded-lg transition-colors flex items-center justify-center gap-2 ${
                      theme === "dark"
                        ? "border-gray-600 text-gray-400 hover:border-blue-500 hover:text-blue-400"
                        : "border-gray-300 text-gray-600 hover:border-blue-500 hover:text-blue-500"
                    }`}
                  >
                    <Plus className="w-4 h-4" />
                    Add New Card
                  </motion.button>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Card className={theme === "dark" ? "bg-gray-800" : "bg-white"}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Smartphone className="w-5 h-5" />
                  UPI & Bank Accounts
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {savedUPI.map((upi, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className={`p-4 rounded-lg ${
                        theme === "dark" ? "bg-gray-700" : "bg-gray-50"
                      }`}
                    >
                      <p className="font-medium">{upi.name}</p>
                      <p
                        className={`text-sm ${
                          theme === "dark" ? "text-gray-300" : "text-gray-600"
                        }`}
                      >
                        {upi.id}
                      </p>
                    </motion.div>
                  ))}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`w-full mt-4 border-2 border-dashed p-3 rounded-lg transition-colors flex items-center justify-center gap-2 ${
                      theme === "dark"
                        ? "border-gray-600 text-gray-400 hover:border-blue-500 hover:text-blue-400"
                        : "border-gray-300 text-gray-600 hover:border-blue-500 hover:text-blue-500"
                    }`}
                  >
                    <Plus className="w-4 h-4" />
                    Add UPI ID or Bank Account
                  </motion.button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        <motion.div variants={itemVariants}>
          <Card className={theme === "dark" ? "bg-gray-800" : "bg-white"}>
            <CardHeader>
              <CardTitle>RIDE ON Offers</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {offers.map((offer, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.02 }}
                    className={`border-2 border-dashed rounded-lg p-4 transition-all ${
                      theme === "dark"
                        ? "border-gray-700 hover:border-blue-500"
                        : "border-gray-200 hover:border-blue-500"
                    }`}
                  >
                    <div
                      className={`${
                        theme === "dark"
                          ? "bg-blue-900 text-blue-200"
                          : "bg-blue-50 text-blue-600"
                      } inline-block px-2 py-1 rounded text-sm font-medium mb-2`}
                    >
                      {offer.discount}
                    </div>
                    <p className="font-medium mb-2">{offer.description}</p>
                    <div className="flex justify-between items-end">
                      <div>
                        <p
                          className={`text-xs ${
                            theme === "dark" ? "text-gray-400" : "text-gray-500"
                          }`}
                        >
                          {offer.maxDiscount}
                        </p>
                        <p
                          className={`text-xs ${
                            theme === "dark" ? "text-gray-400" : "text-gray-500"
                          }`}
                        >
                          Valid till {offer.validTill}
                        </p>
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className={`text-sm px-3 py-1 rounded-lg ${
                          theme === "dark"
                            ? "bg-blue-900 text-blue-200 hover:bg-blue-800"
                            : "bg-blue-100 text-blue-600 hover:bg-blue-200"
                        }`}
                      >
                        {offer.code}
                      </motion.button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default WalletPage;
