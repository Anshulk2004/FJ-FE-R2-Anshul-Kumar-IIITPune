"use client"
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AuthenticatedNavbar() {
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const pathname = usePathname();

  const handleSettingsClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowSettings(!showSettings);
  };

  const handleClickOutside = () => {
    setShowProfileMenu(false);
    setShowSettings(false);
  };

  return (
    <>
      {(showProfileMenu || showSettings) && (
        <div 
          className="fixed inset-0 z-40"
          onClick={handleClickOutside}
        />
      )}

      <nav className="fixed top-1 left-1/2 transform -translate-x-1/2 z-50 w-[90%] md:w-[85%] lg:w-[80%] bg-black/50 backdrop-blur-md rounded-full flex items-center justify-between px-4 py-2 shadow-lg">
        <Link href="/" className="flex items-center gap-3">
          <Image src="/images/logo.png" alt="Logo" width={40} height={40} />
          <span className="text-white text-xl font-bold">RideOn</span>
        </Link>

        <div className="flex items-center gap-6">
      <Link href="/ride">
        <button className="text-white hover:text-yellow-400 transition-all font-semibold">
          Ride
        </button>
      </Link>
      <Link href="/drive">
        <button className="text-white hover:text-yellow-400 transition-all font-semibold">
          Drive
        </button>
      </Link>
      <Link href="/sharing">
        <button className="text-white hover:text-yellow-400 transition-all font-semibold">
          Sharing
        </button>
      </Link>
      <Link href="/rentals">
        <button className="text-white hover:text-yellow-400 transition-all font-semibold">
          Rentals
        </button>
      </Link>
      <Link href="/courier">
        <button className="text-white hover:text-yellow-400 transition-all font-semibold">
          Couriers
        </button>
      </Link>
    </div>

        <div className="flex items-center gap-5">
          <button className="text-white hover:text-gray-300 transition-all">
            🌙
          </button>
          <button className="text-white hover:text-gray-300 transition-all">
            🌍
          </button>
          <div className="relative">
            <button 
              className="text-black px-6 py-2 bg-yellow-400 rounded-full hover:bg-yellow-500 transition-all flex items-center gap-2"
              onClick={() => setShowProfileMenu(!showProfileMenu)}
            >
              <span className="text-xl">👤</span>
              Profile
            </button>

            {showProfileMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl py-2 z-50">
                <Link 
                  href="/account" 
                  className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                  onClick={() => setShowProfileMenu(false)}
                >
                  Account Info
                </Link>
                <Link 
                  href="/wallet" 
                  className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                  onClick={() => setShowProfileMenu(false)}
                >
                  Wallets
                </Link>
                <Link 
                  href="/bookings" 
                  className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                  onClick={() => setShowProfileMenu(false)}
                >
                  Bookings
                </Link>
                <Link 
                  href="/feedback" 
                  className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                  onClick={() => setShowProfileMenu(false)}
                >
                  Feedback
                </Link>
                <div className="relative">
                  <button 
                    className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center justify-between"
                    onClick={handleSettingsClick}
                  >
                    Settings
                    <span className="text-gray-500">▸</span>
                  </button>

                  {showSettings && (
                    <div className="absolute left-full top-0 w-48 bg-white rounded-lg shadow-xl py-2 -ml-1">
                      <Link 
                        href="/logout" 
                        className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-red-600"
                        onClick={() => {
                          setShowProfileMenu(false);
                          setShowSettings(false);
                        }}
                      >
                        Logout
                      </Link>
                      <button 
                        className="w-full text-left px-4 py-2 hover:bg-gray-100"
                        onClick={() => setShowSettings(false)}
                      >
                        Continue
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </nav>
    </>
  );
}