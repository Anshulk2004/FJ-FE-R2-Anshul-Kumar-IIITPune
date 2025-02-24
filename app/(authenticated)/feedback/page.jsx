"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "@/components/ThemeContext";
import {
  Star,
  Coins,
  MessageSquare,
  Check,
  Edit2,
  ArrowLeft,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

const FeedbackPage = () => {
  const { theme } = useTheme();
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

  const [feedback, setFeedback] = useState(
    pastRides.reduce(
      (acc, ride) => ({
        ...acc,
        [ride.id]: {
          rating: 0,
          tip: 0,
          comment: "",
          submitted: false,
          isEditing: false,
        },
      }),
      {}
    )
  );

  const handleRatingChange = (rideId, rating) => {
    setFeedback((prev) => ({
      ...prev,
      [rideId]: { ...prev[rideId], rating },
    }));
  };

  const handleTipSelect = (rideId, amount) => {
    setFeedback((prev) => ({
      ...prev,
      [rideId]: { ...prev[rideId], tip: amount },
    }));
  };

  const handleCommentChange = (rideId, e) => {
    const comment = e.target.value;
    setFeedback((prev) => ({
      ...prev,
      [rideId]: { ...prev[rideId], comment },
    }));
  };

  const handleSubmit = (rideId) => {
    setFeedback((prev) => ({
      ...prev,
      [rideId]: { ...prev[rideId], submitted: true, isEditing: false },
    }));
  };

  const handleEdit = (rideId) => {
    setFeedback((prev) => ({
      ...prev,
      [rideId]: { ...prev[rideId], isEditing: true },
    }));
  };

  const FeedbackCard = ({ ride }) => {
    const currentFeedback = feedback[ride.id];
    const tipOptions = [10, 20, 30];

    const FeedbackForm = () => (
      <motion.div
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: 1, height: "auto" }}
        exit={{ opacity: 0, height: 0 }}
        transition={{ duration: 0.3 }}
        className="space-y-4"
      >
        <motion.div
          className="flex items-center gap-2"
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
        >
          <MessageSquare className="w-5 h-5 text-gray-400 dark:text-gray-500" />
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <motion.button
                key={star}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => handleRatingChange(ride.id, star)}
                className={`focus:outline-none ${
                  star <= currentFeedback.rating
                    ? "text-yellow-400"
                    : "text-gray-300 dark:text-gray-600"
                }`}
              >
                <Star className="w-6 h-6 fill-current" />
              </motion.button>
            ))}
          </div>
        </motion.div>

        <motion.div
          className="flex items-center gap-2"
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          <Coins className="w-5 h-5 text-gray-400 dark:text-gray-500" />
          <div className="flex gap-2">
            {tipOptions.map((amount) => (
              <motion.button
                key={amount}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleTipSelect(ride.id, amount)}
                className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                  currentFeedback.tip === amount
                    ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
                }`}
              >
                ₹{amount}
              </motion.button>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <textarea
            placeholder="Write your feedback here..."
            value={currentFeedback.comment}
            onChange={(e) => handleCommentChange(ride.id, e)}
            className="w-full p-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200 dark:placeholder-gray-400"
            rows="3"
          />
        </motion.div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => handleSubmit(ride.id)}
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors dark:bg-blue-700 dark:hover:bg-blue-600"
        >
          {currentFeedback.submitted ? "Update Feedback" : "Submit Feedback"}
        </motion.button>
      </motion.div>
    );

    const SubmittedFeedback = () => (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="space-y-2 mt-4"
      >
        <div className="flex justify-between items-start">
          <div className="space-y-2">
            <motion.div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((star, index) => (
                <motion.div
                  key={star}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Star
                    className={`w-5 h-5 ${
                      star <= currentFeedback.rating
                        ? "text-yellow-400 fill-current"
                        : "text-gray-300 dark:text-gray-600"
                    }`}
                  />
                </motion.div>
              ))}
            </motion.div>
            {currentFeedback.tip > 0 && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-sm text-gray-600 dark:text-gray-400"
              >
                Tipped: ₹{currentFeedback.tip}
              </motion.p>
            )}
            {currentFeedback.comment && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-sm text-gray-600 dark:text-gray-400 italic"
              >
                "{currentFeedback.comment}"
              </motion.p>
            )}
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleEdit(ride.id)}
            className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 flex items-center gap-1 text-sm"
          >
            <Edit2 className="w-4 h-4" />
            Edit
          </motion.button>
        </div>
      </motion.div>
    );

    return (
      <motion.div variants={cardVariants} initial="hidden" animate="visible">
        <Card
          className={`mb-4 overflow-hidden ${
            theme === "dark" ? "bg-gray-800 text-white" : "bg-white"
          }`}
        >
          <CardContent className="p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-semibold">{ride.driver}</h3>
                <p
                  className={`text-sm ${
                    theme === "dark" ? "text-gray-400" : "text-gray-500"
                  }`}
                >
                  {ride.date} • {ride.time}
                </p>
                <p
                  className={`text-sm mt-1 ${
                    theme === "dark" ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  {ride.pickup} → {ride.dropoff}
                </p>
              </div>
              {currentFeedback.submitted && !currentFeedback.isEditing && (
                <motion.span
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1"
                >
                  <Check className="w-4 h-4" />
                  Review Done
                </motion.span>
              )}
            </div>

            <AnimatePresence mode="wait">
              {!currentFeedback.submitted || currentFeedback.isEditing ? (
                <FeedbackForm key="form" />
              ) : (
                <SubmittedFeedback key="submitted" />
              )}
            </AnimatePresence>
          </CardContent>
        </Card>
      </motion.div>
    );
  };

  return (
    <div
      className={`min-h-screen p-6 pt-20 ${
        theme === "dark" ? "bg-gray-900" : "bg-gray-50"
      }`}
    >
      <motion.div
        className="max-w-3xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="flex items-center gap-4 mb-8">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="text-gray-600 dark:text-gray-300"
          >
            <ArrowLeft className="w-6 h-6" />
          </motion.button>
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`text-4xl font-bold ${
              theme === "dark" ? "text-white" : "text-gray-900"
            }`}
          >
            Ride Feedback
          </motion.h1>
        </div>
        <div className="space-y-4">
          {pastRides.map((ride) => (
            <FeedbackCard key={ride.id} ride={ride} />
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default FeedbackPage;
