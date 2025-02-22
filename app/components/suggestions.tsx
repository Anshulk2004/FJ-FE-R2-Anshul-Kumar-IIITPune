"use client"
import Image from "next/image";

export default function Suggestions() {
  const suggestions = [
    {
      image: "/images/rentals.jpg",
      title: "Rentals",
      description: "Request a trip for a block of time and make multiple stops.",
    },
    {
      image: "/images/reserve.jpg",
      title: "Reserve",
      description: "Reserve your ride in advance so you can relax on the day of your trip.",
    },
    {
      image: "/images/ride.jpg",
      title: "Ride",
      description: "Go anywhere with Uber. Request a ride, hop in, and go.",
    },
  ];

  return (
    <div className="bg-gray-100 py-10 px-6">
      <h2 className="text-4xl font-bold text-gray-900 text-center mb-10">
        Suggestions
      </h2>
      <div className="flex justify-center gap-6 flex-wrap">
        {suggestions.map((item, index) => (
          <div key={index} className="bg-white p-6 rounded-xl shadow-md w-80 flex flex-col items-center text-center">
            <Image
              src={item.image}
              alt={item.title}
              width={180}
              height={180}
            />
            <h3 className="text-xl font-semibold mt-4">{item.title}</h3>
            <p className="text-gray-600 mt-2">{item.description}</p>
            <button className="mt-4 bg-black text-white px-6 py-2 rounded-full hover:bg-gray-800 transition-all">
              Details
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}