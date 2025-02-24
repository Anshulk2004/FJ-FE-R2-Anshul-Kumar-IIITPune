"use client";

import { motion } from "framer-motion";
import { useTheme } from "./ThemeContext";

export default function Features() {
  const { theme } = useTheme();
  const features = [
    {
      title: "Book Your Cab Now",
      description:
        "Need a ride? Book your cab instantly with just a few clicks. Enjoy safe, reliable, and affordable transportation at your convenience.",
      image: "/images/booking.jpg",
      reverse: false,
    },
    {
      title: "Ride Sharing",
      description:
        "Share your ride and split the fare! Our ride-sharing service connects you with fellow travelers heading in the same direction, making your journey cost-effective and eco-friendly.",
      image: "/images/dates.jpg",
      reverse: true,
    },
    {
      title: "Rent a Car for Yourself",
      description:
        "Need a car for a day or a weekend getaway? Rent a vehicle of your choice at competitive rates and drive at your own pace, hassle-free.",
      image: "/images/man_driving.jpg",
      reverse: false,
    },
    {
      title: "Start Your Journey with Us",
      description:
        "Become a driver and earn on your own terms! Whether you're looking for a full-time job or a part-time gig, join our platform and get paid per ride with flexible working hours.",
      image: "/images/ride_sharing.jpg",
      reverse: true,
    },
  ];

  return (
    <div
      className={`max-w-screen-lg mx-auto px-4 md:px-6 mt-12 
      ${theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-black"}`}
    >
      <div className="grid grid-cols-1 gap-10">
        {features.map((feature, index) => (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: false, margin: "-100px" }}
            key={index}
            className={`flex flex-col ${
              feature.reverse ? "md:flex-row-reverse" : "md:flex-row"
            } items-start md:items-center gap-6`}
          >
            <motion.div
              initial={{ opacity: 0, x: feature.reverse ? 20 : -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex-1"
            >
              <h2 className="text-xl md:text-2xl font-bold">{feature.title}</h2>
              <p className="text-gray-600 mt-2">{feature.description}</p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="mt-4 px-4 py-2 bg-black text-white rounded"
              >
                Log in to your account
              </motion.button>
              <p className="text-sm mt-2">
                Don't have an account?{" "}
                <a href="#" className="text-blue-500 hover:underline">
                  Sign up
                </a>
              </p>
            </motion.div>
            <motion.img
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              src={feature.image}
              alt={feature.title}
              className="rounded-lg w-full md:w-1/3"
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
}
