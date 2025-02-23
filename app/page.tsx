"use client"
import { motion } from "framer-motion";
import Image from "next/image";
import Chatbot from "./components/Chatbot";
import Suggestions from "./components/suggestions";
import Features from "./components/features";
import FAQ from "./components/faq";
import Footer from "./components/footer";
import AuthenticatedNavbar from "./components/authenticatedNavbar";
import { useTheme } from './components/ThemeContext';

export default function Home() {
  const { theme } = useTheme();
  return (
    <>
      {/* Hero Section with Background */}
      <div className="relative h-screen">
        <AuthenticatedNavbar />

        <div className="absolute inset-0 z-0">
          <Image
            src="/images/bg_design1.jpg"
            alt="Background"
            fill
            priority
            className="object-cover"
          />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="relative z-10 flex flex-col items-center justify-center h-full p-4"
        >
          <div className="text-center mb-4">
            <motion.h1
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="text-4xl md:text-6xl font-extrabold text-white mb-4 tracking-wider drop-shadow-lg"
            >
              RIDE <span className="text-yellow-400">ON</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="text-xl md:text-2xl font-semibold text-white tracking-wide"
            >
              <span className="font-bold text-yellow-400">TAP</span>
              <span className="mx-2">•</span>
              <span className="font-bold">RIDE</span>
              <span className="mx-2">•</span>
              <span className="font-bold text-yellow-400">ARRIVE</span>
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.8 }}
            className="relative w-full max-w-5xl h-60 md:h-[36rem] lg:h-[32rem]"
          >
            <Image
              src="/images/try.png"
              alt="Ride Service"
              fill
              className="object-contain"
            />
          </motion.div>
        </motion.div>
      </div>

      {/* Rest of the content with white background */}
      <div className={`relative z-10 min-h-screen ${theme === 'dark' ? 'bg-gray-900' : 'bg-white'}`}>
        {/* "Come Ride With Us" Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: false, margin: "-100px" }}
          className="py-20 flex flex-col items-center justify-center"
        >
          <motion.h2
            initial={{ y: 50 }}
            whileInView={{ y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: false, margin: "-100px" }}
            className={`text-4xl md:text-6xl font-extrabold drop-shadow-xl mb-6 ${
              theme === 'dark' 
                ? 'text-yellow-400'
                : 'text-gray-900' 
            }`}
          >
            {theme === 'dark' ? (
              
              'COME RIDE WITH US'
            ) : (
              
              <>
                COME <span className="text-yellow-400">RIDE</span> WITH US
              </>
            )}
          </motion.h2>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="text-white text-xl font-semibold px-8 py-3 bg-yellow-400 rounded-full shadow-lg hover:bg-yellow-500 transition-all"
          >
            Get Started
          </motion.button>
        </motion.div>

        <Chatbot />
        <Suggestions />
        <Features />
        <FAQ />
        <Footer />
      </div>
    </>
  );
}