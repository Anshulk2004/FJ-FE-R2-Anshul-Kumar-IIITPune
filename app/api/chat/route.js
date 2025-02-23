import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { userMessage } = await req.json();

    if (!userMessage) {
      return NextResponse.json({ error: "Message is required" }, { status: 400 });
    }

    const API_KEY = process.env.GEMINI_API_KEY;
    const MODEL_NAME = "gemini-1.5-flash";
    const API_URL = `https://generativelanguage.googleapis.com/v1/models/${MODEL_NAME}:generateContent`;

    const response = await fetch(`${API_URL}?key=${API_KEY}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ role: "user", parts: [{ text: `This is a ride-sharing app chatbot. Answer user queries related to cab bookings. User: ${userMessage}` }] }],
        generationConfig: {
          temperature: 0.6,
          maxOutputTokens: 200,
        },
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`API error: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    const botMessage = data.candidates?.[0]?.content?.parts?.[0]?.text || "I'm sorry, I couldn't find an answer.";

    return NextResponse.json({ reply: botMessage });

  } catch (error) {
    console.error("Chatbot API Error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
