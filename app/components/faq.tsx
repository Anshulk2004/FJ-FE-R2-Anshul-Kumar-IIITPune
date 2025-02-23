"use client"
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { useTheme } from './ThemeContext';

const faqs = [
  {
    question: "What services do we offer?",
    answer: "We provide top-notch travel planning, route optimization, and itinerary management using AI and data-driven insights."
  },
  {
    question: "How does the route optimization work?",
    answer: "Our system leverages clustering and KNN algorithms with Google Maps API to suggest the most efficient travel routes."
  },
  {
    question: "Is there a mobile app available?",
    answer: "Yes, we are working on a mobile-friendly version to enhance the trip planning experience on the go."
  },
  {
    question: "How can I contact support?",
    answer: "You can reach out to us via email or through the 'Message Us' section in the footer."
  }
];

export default function FAQ() {
  const { theme } = useTheme();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className={`max-w-5xl mx-auto p-6 md:p-12 
      ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-black'}`}>
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: false, margin: "-100px" }}
        className="text-2xl md:text-3xl font-bold text-center text-black mb-6"
      >
        Frequently Asked Questions
      </motion.h2>
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            key={index}
            className={`border-b ${
              theme === 'dark' ? 'border-gray-700 text-white' : 'border-gray-300 text-black'
            } py-4`}
          >
            <button
              className="flex justify-between items-center w-full text-left"
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
            >
              <span className="text-lg md:text-xl font-bold text-black">{faq.question}</span>
              <motion.span
                animate={{ rotate: openIndex === index ? 180 : 0 }}
                transition={{ duration: 0.3 }}
                className="text-black"
              >
                ⬇
              </motion.span>
            </button>
            <AnimatePresence>
              {openIndex === index && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <p className="text-base md:text-xl text-black pt-2">{faq.answer}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </section>
  );
}