"use client"
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from './ThemeContext';

export default function AuthenticatedNavbar() {
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();

  const navLinks = [
    { href: "/ride", label: "Ride" },
    { href: "/drive", label: "Drive" },
    { href: "/sharing", label: "Sharing" },
    { href: "/rentals", label: "Rentals" },
    { href: "/courier", label: "Couriers" },
  ];

  return (
    <>
      <AnimatePresence>
        {(showProfileMenu || showSettings) && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm"
            onClick={() => {
              setShowProfileMenu(false);
              setShowSettings(false);
            }}
          />
        )}
      </AnimatePresence>

      <nav className={`fixed top-1 left-1/2 transform -translate-x-1/2 z-50 w-[95%] md:w-[85%] lg:w-[80%] 
      ${theme === 'dark' ? 'bg-gray-900/50' : 'bg-black/50'} backdrop-blur-md rounded-full`}>
        <div className="flex items-center justify-between px-4 py-2">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link href="/" className="flex items-center gap-3">
              <Image src="/images/profile.jpg" alt="Logo" width={40} height={40} className="rounded-full" />
              <span className="text-white text-xl font-bold">RideOn</span>
            </Link>
          </motion.div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? "✕" : "☰"}
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link, index) => (
              <motion.div
                key={link.href}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link href={link.href}>
                  <button className="text-white hover:text-yellow-400 transition-all font-semibold">
                    {link.label}
                  </button>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Mobile Navigation */}
          <AnimatePresence>
            {isMobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="absolute top-full left-0 right-0 bg-black/90 rounded-b-2xl mt-2 md:hidden"
              >
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="block px-4 py-2 text-white hover:bg-white/10"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Profile Section */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-5"
          >
           <button 
        onClick={toggleTheme}
        className="text-white hover:text-yellow-400 transition-all p-2"
      >
        {theme === 'light' ? '🌙' : '☀️'}
      </button>
            <button className="text-white hover:text-gray-300 transition-all">
              🌍
            </button>
            <div className="relative">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="text-black px-6 py-2 bg-yellow-400 rounded-full hover:bg-yellow-500 transition-all flex items-center gap-2"
                onClick={() => setShowProfileMenu(!showProfileMenu)}
              >
                <span className="text-xl">👤</span>
                Profile
              </motion.button>

              <AnimatePresence>
                {showProfileMenu && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl py-2"
                  >
                    {/* Profile menu items... */}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </nav>
    </>
  );
}