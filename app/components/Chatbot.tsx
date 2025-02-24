"use client";

import { useState } from "react";
import { Send, MessageCircle, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Chatbot() {
  const [messages, setMessages] = useState<{ role: string; content: string }[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    setMessages((prevMessages) => [...prevMessages, { role: "user", content: input }]);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userMessage: input }),
      });

      if (!response.ok) throw new Error(`Failed to fetch response: ${response.statusText}`);

      const data = await response.json();
      setMessages((prevMessages) => [...prevMessages, { role: "bot", content: data.reply }]);
    } catch (error) {
      setMessages((prevMessages) => [...prevMessages, { role: "bot", content: "Oops! Something went wrong." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[9999] flex flex-col items-end">
      {/* Floating Chat Button */}
      {!open && (
        <motion.button
          onClick={() => setOpen(true)}
          className="p-4 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-all flex items-center justify-center"
          whileHover={{ scale: 1.1 }}
        >
          <MessageCircle size={28} />
        </motion.button>
      )}

      {/* Chat Window */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="w-[350px] sm:w-[400px] bg-white shadow-xl rounded-lg overflow-hidden border border-gray-200"
          >
            {/* Header */}
            <div className="flex items-center justify-between bg-blue-600 text-white px-4 py-3">
              <h3 className="text-lg font-semibold">RideShare Chatbot</h3>
              <button
                onClick={() => setOpen(false)}
                className="text-gray-200 hover:text-white transition"
              >
                <X size={22} />
              </button>
            </div>

            {/* Chat Messages */}
            <div className="h-72 overflow-y-auto p-3 space-y-3 bg-gray-50">
              {messages.map((msg, index) => (
                <div key={index} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`p-3 rounded-lg text-sm max-w-xs ${
                      msg.role === "user"
                        ? "bg-blue-500 text-white self-end"
                        : "bg-gray-200 text-gray-700 self-start"
                    }`}
                  >
                    <strong>{msg.role === "user" ? "You: " : "Bot: "}</strong> {msg.content}
                  </div>
                </div>
              ))}
              {loading && <p className="text-gray-400 text-sm animate-pulse">Bot is typing...</p>}
            </div>

            {/* Input Field */}
            <div className="flex border-t bg-white p-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                className="flex-1 p-2 border rounded-l text-black focus:outline-none focus:ring-2 focus:ring-blue-400"

                placeholder="Ask me anything..."
              />
              <button
                onClick={sendMessage}
                className="bg-blue-600 text-white px-4 py-2 rounded-r hover:bg-blue-700 transition-all flex items-center"
              >
                <Send size={20} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
