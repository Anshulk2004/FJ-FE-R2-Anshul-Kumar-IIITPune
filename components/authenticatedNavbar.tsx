"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "./ThemeContext";
import { Menu, X, Bell } from "lucide-react";
import { signOut } from "next-auth/react";

export default function AuthenticatedNavbar() {
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { theme, toggleTheme } = useTheme();

  // Sample notifications
  const notifications = [
    {
      id: 1,
      title: "New discount!",
      message: "20% off on your next ride. Valid for 24 hours.",
      time: "10 minutes ago",
      isRead: false,
    },
    {
      id: 2,
      title: "Ride completed",
      message: "Your ride with John has been completed. Rate your experience!",
      time: "2 hours ago",
      isRead: false,
    },
    {
      id: 3,
      title: "Weekly summary",
      message: "Check out your riding stats for this week.",
      time: "1 day ago",
      isRead: true,
    },
  ];

  const unreadCount = notifications.filter(n => !n.isRead).length;

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
      href: "/account",
    },
    {
      label: "Bookings",
      icon: "📅",
      href: "/bookings",
    },
    {
      label: "Feedback",
      icon: "💭",
      href: "/feedback",
    },
    {
      label: "Wallet",
      icon: "💳",
      href: "/wallet",
    },
    {
      label: "Sign Out",
      icon: "🚪",
      action: handleSignOut,
      className: "text-red-600 border-t border-gray-100",
    },
  ];

  async function handleSignOut() {
    await signOut({ redirect: false });
    router.push("/");
    router.refresh();
  }

  return (
    <>
      <AnimatePresence>
        {(showProfileMenu || isMobileMenuOpen || showNotifications) && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9997]"
            onClick={() => {
              setShowProfileMenu(false);
              setIsMobileMenuOpen(false);
              setShowNotifications(false);
            }}
          />
        )}
      </AnimatePresence>

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
                width={60}
                height={60}
                className="rounded-full"
              />
              <span className="text-white text-xl font-bold">RideOn</span>
            </Link>
          </motion.div>
          
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

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-3"
          >
            {/* Notification Bell */}
            <div className="relative">
              <button
                onClick={() => {
                  setShowNotifications(!showNotifications);
                  setShowProfileMenu(false);
                }}
                className="text-white hover:text-yellow-400 transition-all p-2 relative"
              >
                <Bell className="w-6 h-6" />
                {unreadCount > 0 && (
                  <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {unreadCount}
                  </span>
                )}
              </button>

              <AnimatePresence>
                {showNotifications && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute right-0 mt-2 w-72 bg-white dark:bg-gray-800 rounded-lg shadow-xl py-2 z-[9999]"
                  >
                    <div className="px-4 py-2 border-b border-gray-100 dark:border-gray-700">
                      <h3 className="font-semibold text-gray-800 dark:text-white">Notifications</h3>
                    </div>
                    <div className="max-h-80 overflow-y-auto">
                      {notifications.map((notification) => (
                        <div 
                          key={notification.id}
                          className={`px-4 py-3 border-b border-gray-100 dark:border-gray-700 last:border-0 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all ${
                            !notification.isRead ? "bg-blue-50 dark:bg-blue-900/20" : ""
                          }`}
                        >
                          <div className="flex justify-between">
                            <h4 className="font-medium text-gray-800 dark:text-white">{notification.title}</h4>
                            <span className="text-xs text-gray-500 dark:text-gray-400">{notification.time}</span>
                          </div>
                          <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">{notification.message}</p>
                        </div>
                      ))}
                    </div>
                    <div className="px-4 py-2 border-t border-gray-100 dark:border-gray-700">
                      <button className="text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300 text-sm font-medium transition-all w-full text-center">
                        View all notifications
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="text-white hover:text-yellow-400 transition-all p-2"
            >
              {theme === "light" ? "🌙" : "☀️"}
            </button>
            
            <button
              className="md:hidden text-white p-2"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>

            <div className="relative hidden md:block">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="text-black px-6 py-2 bg-yellow-400 rounded-full hover:bg-yellow-500 transition-all flex items-center gap-2"
                onClick={() => {
                  setShowProfileMenu(!showProfileMenu);
                  setShowNotifications(false);
                }}
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
                    className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-xl py-2 z-[9999]"
                  >
                    {profileMenuItems.map((item, index) => (
                      item.action ? (
                        <button
                          key={index}
                          onClick={() => {
                            setShowProfileMenu(false);
                            item.action();
                          }}
                          className={`w-full text-left flex items-center gap-3 px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all ${
                            item.className || ""
                          }`}
                        >
                          <span>{item.icon}</span>
                          {item.label}
                        </button>
                      ) : (
                        <Link
                          key={index}
                          href={item.href || "#"}
                          className={`flex items-center gap-3 px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all ${
                            item.className || ""
                          }`}
                          onClick={() => setShowProfileMenu(false)}
                        >
                          <span>{item.icon}</span>
                          {item.label}
                        </Link>
                      )
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>

        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-gray-800/95 mt-2 rounded-2xl overflow-hidden"
            >
              <div className="px-4 py-2">
                {navLinks.map((link, index) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="block py-2 text-white hover:text-yellow-400 transition-all font-semibold"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}
                <div className="border-t border-gray-600 my-2" />
                {profileMenuItems.map((item, index) => (
                  item.action ? (
                    <button
                      key={index}
                      onClick={() => {
                        setIsMobileMenuOpen(false);
                        item.action();
                      }}
                      className={`w-full text-left flex items-center gap-3 py-2 text-white hover:text-yellow-400 transition-all ${
                        item.className ? "text-red-400 hover:text-red-300" : ""
                      }`}
                    >
                      <span>{item.icon}</span>
                      {item.label}
                    </button>
                  ) : (
                    <Link
                      key={index}
                      href={item.href || "#"}
                      className={`flex items-center gap-3 py-2 text-white hover:text-yellow-400 transition-all ${
                        item.className ? "text-red-400 hover:text-red-300" : ""
                      }`}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <span>{item.icon}</span>
                      {item.label}
                    </Link>
                  )
                ))}
                
                {/* Mobile Notifications */}
                <div className="border-t border-gray-600 my-2" />
                <button
                  className="w-full text-left flex items-center gap-3 py-2 text-white hover:text-yellow-400 transition-all"
                  onClick={() => router.push("/notifications")}
                >
                  <span>🔔</span>
                  Notifications
                  {unreadCount > 0 && (
                    <span className="ml-auto bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {unreadCount}
                    </span>
                  )}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </>
  );
}