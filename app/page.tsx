import Image from "next/image";
import Navbar from "./components/navbar";
import AuthenticatedNavbar from "./components/authenticatedNavbar";
import Footer from "./components/footer";
import Suggestions from "./components/suggestions";
import Features from "./components/features";
import FAQ from "./components/faq";
import Chatbot from "./components/Chatbot";

export default function Home() {
  return (
    <div className="relative h-screen w-full">
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

      <div className="relative z-10 flex flex-col items-center justify-center h-full p-4">
        <div className="text-center mb-4">
          <h1 className="text-6xl font-extrabold text-white mb-4 tracking-wider drop-shadow-lg">
            RIDE <span className="text-yellow-400">ON</span>
          </h1>
          <p className="text-2xl font-semibold text-white tracking-wide">
            <span className="font-bold text-yellow-400">TAP</span>
            <span className="mx-2">•</span>
            <span className="font-bold">RIDE</span>
            <span className="mx-2">•</span>
            <span className="font-bold text-yellow-400">ARRIVE</span>
          </p>
        </div>

        <div className="relative w-full max-w-5xl h-90 md:h-[36rem] lg:h-[32rem]">
          <Image
            src="/images/try.png"
            alt="Ride Service"
            fill
            className="object-contain"
          />
        </div>
      </div>

      <div className="bg-white py-20 flex flex-col items-center justify-center">
        <h2 className="text-6xl font-extrabold text-gray-900 drop-shadow-xl mb-6 animate-bounce">
          COME <span className="text-yellow-400">RIDE</span> WITH US
        </h2>
        <button className="text-white text-xl font-semibold px-8 py-3 bg-yellow-400 rounded-full shadow-lg hover:bg-yellow-500 hover:scale-105 transition-all">
          Get Started
        </button>
      </div>
      <Chatbot />

      <Suggestions />
      <Features />
      <FAQ />
      <Footer />
    </div>
  );
}