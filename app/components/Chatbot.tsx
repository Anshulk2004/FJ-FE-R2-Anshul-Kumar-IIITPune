"use client"; // Ensure it's a client component

import { useState } from "react";

export default function Chatbot() {
  const [messages, setMessages] = useState<{ role: string; content: string }[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false); // For UI feedback

  const sendMessage = async () => {
    if (!input.trim()) return;

    // Add user message to chat
    setMessages((prevMessages) => [...prevMessages, { role: "user", content: input }]);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userMessage: input }),
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch response: ${response.statusText}`);
      }

      const data = await response.json();
      console.log("Bot Response:", data); // Debugging log
      setMessages((prevMessages) => [...prevMessages, { role: "bot", content: data.reply }]);
    } catch (error) {
      console.error("Chatbot error:", error);
      setMessages((prevMessages) => [...prevMessages, { role: "bot", content: "Sorry, something went wrong!" }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 w-80 bg-white p-4 border shadow-lg rounded-lg">
      {/* Chat Messages Window */}
      <div className="h-60 overflow-y-auto border-b pb-2">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`p-2 my-1 ${msg.role === "user" ? "text-right text-blue-500" : "text-left text-gray-700"}`}

          >
            <strong>{msg.role === "user" ? "You: " : "Bot: "}</strong>
            {msg.content}
          </div>
        ))}
        {loading && <p className="text-center text-gray-400">Bot is typing...</p>}
      </div>

      {/* Input & Send Button */}
      <div className="mt-2 flex">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()} // Send on Enter key
          className="flex-1 p-2 border rounded-l"
          placeholder="Type a message..."
        />
        <button
          onClick={sendMessage}
          className="bg-blue-500 text-white px-4 py-2 rounded-r hover:bg-blue-600"
          disabled={loading}
        >
          {loading ? "..." : "Send"}
        </button>
      </div>
    </div>
  );
}
