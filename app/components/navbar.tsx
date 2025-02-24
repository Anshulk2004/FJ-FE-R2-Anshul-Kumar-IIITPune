"use client";
import Image from "next/image";

export default function Navbar() {
  return (
    <nav className="fixed top-1 left-1/2 transform -translate-x-1/2 z-50 w-[90%] md:w-[85%] lg:w-[80%] bg-black/50 backdrop-blur-md rounded-full flex items-center justify-between px-6 py-3 shadow-lg">
      <div className="flex items-center gap-3">
        <Image src="/images/logo.png" alt="Logo" width={40} height={40} />
        <span className="text-white text-xl font-bold">RideOn</span>
      </div>

      <div className="flex items-center gap-6">
        <button className="text-white hover:text-yellow-400 transition-all font-semibold">
          Ride
        </button>
        <button className="text-white hover:text-yellow-400 transition-all font-semibold">
          Drive
        </button>
        <button className="text-white hover:text-yellow-400 transition-all font-semibold">
          About
        </button>
      </div>

      <div className="flex items-center gap-5">
        <button className="text-white hover:text-gray-300 transition-all">
          🌙
        </button>
        <button className="text-white hover:text-gray-300 transition-all">
          🌍
        </button>
        <button className="text-white px-4 py-1 border border-yellow-400 rounded-full hover:bg-yellow-400 hover:text-black transition-all">
          Login
        </button>
        <button className="text-black px-4 py-1 bg-yellow-400 rounded-full hover:bg-yellow-500 transition-all">
          Sign Up
        </button>
      </div>
    </nav>
  );
}
