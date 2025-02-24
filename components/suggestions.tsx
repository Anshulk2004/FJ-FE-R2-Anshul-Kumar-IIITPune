"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { useTheme } from "./ThemeContext";

export default function Suggestions() {
  const { theme } = useTheme();
  const suggestions = [
    {
      image: "/images/rentals.jpg",
      title: "Rentals",
      description:
        "Request a trip for a block of time and make multiple stops.",
    },
    {
      image: "/images/reserve.jpg",
      title: "Reserve",
      description:
        "Reserve your ride in advance so you can relax on the day of your trip.",
    },
    {
      image: "/images/ride.jpg",
      title: "Ride",
      description: "Go anywhere with Uber. Request a ride, hop in, and go.",
    },
  ];

  return (
    <div
      className={`py-10 px-4 md:px-6 
      ${theme === "dark" ? "bg-gray-900" : "bg-gray-100"}`}
    >
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: false, margin: "-100px" }}
        className={`text-3xl md:text-4xl font-bold text-center mb-10 
          ${theme === "dark" ? "text-white" : "text-gray-900"}`}
      >
        Suggestions
      </motion.h2>

      <div className="flex justify-center gap-6 flex-wrap">
        {suggestions.map((item, index) => (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: index * 0.2 }}
            viewport={{ once: false, margin: "-100px" }}
            key={index}
            className="bg-white p-6 rounded-xl shadow-md w-full sm:w-80 flex flex-col items-center text-center"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <Image
                src={item.image}
                alt={item.title}
                width={180}
                height={180}
                className="rounded-lg"
              />
            </motion.div>
            <motion.h3
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-xl font-semibold mt-4"
            >
              {item.title}
            </motion.h3>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-gray-600 mt-2"
            >
              {item.description}
            </motion.p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="mt-4 bg-black text-white px-6 py-2 rounded-full hover:bg-gray-800 transition-all"
            >
              Details
            </motion.button>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
