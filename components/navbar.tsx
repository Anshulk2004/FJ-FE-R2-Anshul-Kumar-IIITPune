"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn, signOut, useSession } from "next-auth/react";
import { motion } from "framer-motion";
import { useTheme } from "./ThemeContext";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const { data: session } = useSession();
  const router = useRouter();
  const { theme, toggleTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <>
      <nav
        className={`fixed top-1 left-1/2 transform -translate-x-1/2 z-[9998] w-[95%] md:w-[85%] lg:w-[80%] 
        ${theme === "dark" ? "bg-gray-900/50" : "bg-black/50"} 
        backdrop-blur-md rounded-full`}
      >
        <div className="flex items-center justify-between px-4 py-2">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link href="/" className="flex items-center gap-3">
              <Image
                src="/images/logoo.png"
                alt="Logo"
                width={40}
                height={40}
                className="rounded-full md:w-12 md:h-12"
              />
              <span className="text-white text-lg md:text-xl font-bold">RideOn</span>
            </Link>
          </motion.div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
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
            <Link href="/about">
              <button className="text-white hover:text-yellow-400 transition-all font-semibold">
                About
              </button>
            </Link>
          </div>

          <div className="flex items-center gap-2 md:gap-3">
            <button
              onClick={toggleTheme}
              className="text-white hover:text-yellow-400 transition-all p-1 md:p-2"
            >
              {theme === "light" ? "🌙" : "☀️"}
            </button>
            
            <button className="text-white hover:text-yellow-400 transition-all p-1 md:p-2">
              🌍
            </button>

            {/* Desktop Authentication */}
            <div className="hidden md:block">
              {session ? (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => signOut({ callbackUrl: "/" })}
                  className="text-black px-4 py-1.5 bg-yellow-400 rounded-full hover:bg-yellow-500 transition-all"
                >
                  Sign Out
                </motion.button>
              ) : (
                <div className="flex items-center gap-3">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => router.push("/login")}
                    className="text-white px-4 py-1.5 border border-yellow-400 rounded-full hover:bg-yellow-400 hover:text-black transition-all"
                  >
                    Login
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => router.push("/signup")}
                    className="text-black px-4 py-1.5 bg-yellow-400 rounded-full hover:bg-yellow-500 transition-all"
                  >
                    Sign Up
                  </motion.button>
                </div>
              )}
            </div>

            {/* Mobile Menu Toggle */}
            <button 
              className="md:hidden text-white p-1"
              onClick={toggleMobileMenu}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className={`fixed top-16 left-1/2 transform -translate-x-1/2 z-[9997] w-[90%] 
          ${theme === "dark" ? "bg-gray-900" : "bg-black"} 
          rounded-lg shadow-lg p-4`}
        >
          <div className="flex flex-col space-y-4">
            <Link href="/ride" onClick={() => setMobileMenuOpen(false)}>
              <button className="text-white hover:text-yellow-400 transition-all font-semibold w-full text-left py-2 border-b border-gray-700">
                Ride
              </button>
            </Link>
            <Link href="/drive" onClick={() => setMobileMenuOpen(false)}>
              <button className="text-white hover:text-yellow-400 transition-all font-semibold w-full text-left py-2 border-b border-gray-700">
                Drive
              </button>
            </Link>
            <Link href="/about" onClick={() => setMobileMenuOpen(false)}>
              <button className="text-white hover:text-yellow-400 transition-all font-semibold w-full text-left py-2 border-b border-gray-700">
                About
              </button>
            </Link>

            {/* Mobile Authentication */}
            <div className="pt-2">
              {session ? (
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    signOut({ callbackUrl: "/" });
                    setMobileMenuOpen(false);
                  }}
                  className="w-full text-black py-2 bg-yellow-400 rounded-full hover:bg-yellow-500 transition-all"
                >
                  Sign Out
                </motion.button>
              ) : (
                <div className="flex flex-col space-y-3">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      router.push("/login");
                      setMobileMenuOpen(false);
                    }}
                    className="w-full text-white py-2 border border-yellow-400 rounded-full hover:bg-yellow-400 hover:text-black transition-all"
                  >
                    Login
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      router.push("/signup");
                      setMobileMenuOpen(false);
                    }}
                    className="w-full text-black py-2 bg-yellow-400 rounded-full hover:bg-yellow-500 transition-all"
                  >
                    Sign Up
                  </motion.button>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </>
  );
}