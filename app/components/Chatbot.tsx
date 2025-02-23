"use client";

import { useState } from "react";
import { Send, MessageCircle } from "lucide-react"; // Icons
import { motion } from "framer-motion"; // Smooth animations

export default function Chatbot() {
  const [messages, setMessages] = useState<{ role: string; content: string }[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false); // Toggle chat window

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
      setMessages((prevMessages) => [...prevMessages, { role: "bot", content: "Sorry, something went wrong!" }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 flex flex-col items-end">
      {/* Floating Chat Button */}
      {!open && (
        <motion.button
          onClick={() => setOpen(true)}
          className="p-4 bg-blue-500 text-white rounded-full shadow-lg hover:bg-blue-600 transition"
          whileHover={{ scale: 1.1 }}
        >
          <MessageCircle size={24} />
        </motion.button>
      )}

      {/* Chat Window */}
      {open && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          className="w-80 bg-white shadow-lg rounded-lg overflow-hidden"
        >
          {/* Header */}
          <div className="flex items-center justify-between bg-blue-600 text-white p-3">
            <h3 className="text-lg font-semibold">RideShare Chatbot</h3>
            <button onClick={() => setOpen(false)} className="text-gray-200 hover:text-white">✕</button>
          </div>

          {/* Chat Messages */}
          <div className="h-64 overflow-y-auto p-3 space-y-2">
            {messages.map((msg, index) => (
              <div key={index} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`p-2 rounded-lg max-w-xs ${msg.role === "user" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"}`}>
                  <strong>{msg.role === "user" ? "You: " : "Bot: "}</strong> {msg.content}
                </div>
              </div>
            ))}
            {loading && <p className="text-gray-400 text-sm animate-pulse">Bot is typing...</p>}
          </div>

          {/* Input Field */}
          <div className="flex border-t p-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              className="flex-1 p-2 border rounded-l focus:outline-none"
              placeholder="Ask about cab bookings..."
            />
            <button onClick={sendMessage} className="bg-blue-500 text-white px-4 py-2 rounded-r hover:bg-blue-600 transition">
              <Send size={18} />
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
}
