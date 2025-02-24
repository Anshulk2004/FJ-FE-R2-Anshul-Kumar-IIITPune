"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { useTheme } from "@/components/ThemeContext";
import Image from "next/image";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const { theme, toggleTheme } = useTheme();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError(
          result.error === "CredentialsSignin"
            ? "Invalid email or password"
            : result.error
        );
        setIsLoading(false);
      } else {
        router.push("/");
        router.refresh();
      }
    } catch (error) {
      setError("An error occurred during login");
      setIsLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center p-4 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/bg_design1.jpg"
          alt="Background"
          fill
          style={{ objectFit: "cover" }}
          priority
        />
        <div
          className={`absolute inset-0 ${
            theme === "dark" ? "bg-black/70" : "bg-white/30"
          } backdrop-blur-sm`}
        ></div>
      </div>

      <button
        onClick={toggleTheme}
        className={`absolute top-4 right-4 z-10 p-3 rounded-full 
        ${
          theme === "dark"
            ? "bg-gray-800 text-yellow-400"
            : "bg-white text-gray-800"
        } 
        shadow-lg transition-all duration-300`}
      >
        {theme === "light" ? "🌙" : "☀️"}
      </button>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className={`relative z-10 w-full max-w-md rounded-xl shadow-2xl overflow-hidden`}
      >
        <div
          className={`py-8 flex flex-col items-center ${
            theme === "dark" ? "bg-gray-800" : "bg-white"
          }`}
        >
          <div className="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center mb-4">
            <span className="text-2xl">🚗</span>
          </div>
          <h2
            className={`text-2xl font-bold ${
              theme === "dark" ? "text-white" : "text-gray-800"
            }`}
          >
            Welcome Back
          </h2>
          <p
            className={`${
              theme === "dark" ? "text-gray-300" : "text-gray-600"
            }`}
          >
            Sign in to continue to RideOn
          </p>
        </div>

        <div
          className={`p-8 ${theme === "dark" ? "bg-gray-900" : "bg-gray-50"}`}
        >
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-4 p-3 rounded-lg bg-red-100 border border-red-200 text-red-600"
            >
              {error}
            </motion.div>
          )}

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label
                className={`block text-sm font-medium mb-2 ${
                  theme === "dark" ? "text-gray-300" : "text-gray-700"
                }`}
              >
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="email@example.com"
                disabled={isLoading}
                className={`w-full p-3 rounded-lg border ${
                  theme === "dark"
                    ? "bg-gray-800 text-white border-gray-700 focus:ring-yellow-400"
                    : "bg-white text-gray-900 border-gray-300 focus:ring-blue-500"
                } 
                focus:outline-none focus:ring-2 transition-all`}
                required
              />
            </div>

            <div>
              <label
                className={`block text-sm font-medium mb-2 ${
                  theme === "dark" ? "text-gray-300" : "text-gray-700"
                }`}
              >
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                disabled={isLoading}
                className={`w-full p-3 rounded-lg border ${
                  theme === "dark"
                    ? "bg-gray-800 text-white border-gray-700 focus:ring-yellow-400"
                    : "bg-white text-gray-900 border-gray-300 focus:ring-blue-500"
                } 
                focus:outline-none focus:ring-2 transition-all`}
                required
              />
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={isLoading}
              className={`w-full py-3 px-4 rounded-lg font-medium text-white ${
                theme === "dark"
                  ? "bg-yellow-500 hover:bg-yellow-600"
                  : "bg-blue-600 hover:bg-blue-700"
              } 
              transition-all shadow-lg disabled:opacity-70 disabled:cursor-not-allowed`}
            >
              {isLoading ? "Signing in..." : "Sign in"}
            </motion.button>
          </form>

          <div className="mt-6 text-center">
            <p
              className={`text-sm ${
                theme === "dark" ? "text-gray-400" : "text-gray-600"
              }`}
            >
              Don't have an account?{" "}
              <Link
                href="/signup"
                className={`font-medium ${
                  theme === "dark"
                    ? "text-yellow-400 hover:text-yellow-300"
                    : "text-blue-600 hover:text-blue-500"
                }`}
              >
                Create an account
              </Link>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
