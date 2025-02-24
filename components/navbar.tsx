"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn, signOut, useSession } from "next-auth/react";
import { motion } from "framer-motion";
import { useTheme } from "./ThemeContext";

export default function Navbar() {
  const { data: session } = useSession();
  const router = useRouter();
  const { theme, toggleTheme } = useTheme();
  
  // const toggleTheme = () => {
  //   setTheme(theme === "dark" ? "light" : "dark");
  //   // Implement your theme toggle logic here
  //   // This could be connected to a theme context or localStorage
  // };

  return (
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

        <div className="flex items-center gap-3">
        <button
              onClick={toggleTheme}
              className="text-white hover:text-yellow-400 transition-all p-2"
            >
              {theme === "light" ? "🌙" : "☀️"}
            </button>
          
          <button className="text-white hover:text-yellow-400 transition-all p-2">
            🌍
          </button>

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
      </div>
    </nav>
  );
}