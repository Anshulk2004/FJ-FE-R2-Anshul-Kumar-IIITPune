"use client"
import { useState } from "react";

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
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="max-w-5xl mx-auto p-12">
      <h2 className="text-3xl font-bold text-center text-black mb-6">Frequently Asked Questions</h2>
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div key={index} className="border-b border-gray-200 dark:border-gray-700 py-4 flex items-start">
            <div className="flex-grow">
              <button
                className="flex justify-between items-center w-full text-left"
                onClick={() => toggleFAQ(index)}
              >
                <span className="text-xl font-bold text-black">{faq.question}</span>
                <span className={`transform transition-transform duration-300 ease-in-out ${openIndex === index ? 'rotate-180' : ''} text-black`}>⬇⬇</span>
              </button>
              <div className={`mt-2 transition-all duration-300 ease-in-out ${openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'} overflow-hidden`}>
                <p className="text-xl text-black">{faq.answer}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}