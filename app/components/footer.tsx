"use client"
import { motion } from "framer-motion";

export default function Footer() {
  const socialIcons = [
    { icon: "📘", label: "Facebook" },
    { icon: "🐦", label: "Twitter" },
    { icon: "📸", label: "Instagram" },
    { icon: "💼", label: "LinkedIn" }
  ];

  const quickLinks = [
    { label: "Careers", href: "#" },
    { label: "About Us", href: "#" },
    { label: "Organization", href: "#" }
  ];

  return (
    <footer className="bg-black text-white py-10 px-4 md:px-16">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Footer sections with adjusted animation durations */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: false, margin: "-100px" }}
        >
          <h3 className="text-2xl font-semibold mb-4">Connect with Us</h3>
          <div className="flex gap-4">
            {socialIcons.map((social, index) => (
              <motion.a
                key={social.label}
                href="#"
                whileHover={{ scale: 1.2, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="text-gray-300 hover:text-yellow-400 text-2xl"
                aria-label={social.label}
              >
                {social.icon}
              </motion.a>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <h3 className="text-2xl font-semibold mb-4">Message Us</h3>
          <form className="flex flex-col gap-3">
            <motion.input
              whileFocus={{ scale: 1.02 }}
              type="text"
              placeholder="Your Message..."
              className="w-full px-4 py-2 rounded bg-gray-800 text-white border border-gray-600 focus:outline-none focus:border-yellow-400"
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="bg-yellow-400 text-black px-6 py-2 rounded hover:bg-yellow-500 transition-all"
            >
              Send
            </motion.button>
          </form>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          <h3 className="text-2xl font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2">
            {quickLinks.map((link, index) => (
              <motion.li
                key={link.label}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <motion.a
                  href={link.href}
                  whileHover={{ x: 10, color: "#FCD34D" }}
                  className="text-gray-300 hover:text-yellow-400 transition-all inline-block"
                >
                  {link.label}
                </motion.a>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="text-center text-gray-500 mt-10 border-t border-gray-700 pt-4"
      >
        &copy; 2025 RideOn. All rights reserved.
      </motion.div>
    </footer>
  );
}