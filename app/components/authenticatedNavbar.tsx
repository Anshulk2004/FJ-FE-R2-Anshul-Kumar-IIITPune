"use client"
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from './ThemeContext';

export default function AuthenticatedNavbar() {
  const [showProfileMenu, setShowProfileMenu] = useState(false);
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

  const profileMenuItems = [
    { 
      label: "Account",
      icon: "👤",
      href: "/account"
    },
    {
      label: "Bookings",
      icon: "📅",
      href: "/bookings"
    },
    {
      label: "Feedback",
      icon: "💭",
      href: "/feedback"
    },
    {
      label: "Wallet",
      icon: "💳",
      href: "/wallet"
    },
    {
      label: "Sign Out",
      icon: "🚪",
      href: "/logout",
      className: "text-red-600 border-t border-gray-100"
    }
  ];

  return (
    <>
      <AnimatePresence>
        {showProfileMenu && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm dark:bg-white/10"
            onClick={() => setShowProfileMenu(false)}
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
                    className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-xl py-2 z-50"
                  >
                    {profileMenuItems.map((item, index) => (
                      <Link
                        key={index}
                        href={item.href}
                        className={`flex items-center gap-3 px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all ${item.className || ''}`}
                        onClick={() => setShowProfileMenu(false)}
                      >
                        <span>{item.icon}</span>
                        {item.label}
                      </Link>
                    ))}
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