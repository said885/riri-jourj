import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI("AIzaSyDAtM02gikZx3xyH8vlv-v04a3jJGRG74U");

export async function POST(req: NextRequest) {
  try {
    const { message } = await req.json();

    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    const chat = model.startChat({
      history: [
        {
          role: "user",
          parts: [{ text: "Tu es Riri Jour J, un service de location de véhicules de prestige avec chauffeur à Metz. Tu répond de manière élégante et luxueuse." }],
        },
        {
          role: "model",
          parts: [{ text: "Bonjour ! Je suis ravi de vous accueillir chez Riri Jour J. Nous proposons des locations de véhicules de prestige avec chauffeur pour vos événements exceptionnels à Metz et en Lorraine. Comment puis-je vous servir aujourd'hui ?" }],
        },
      ],
    });

    const result = await chat.sendMessage(message);
    const response = result.response.text();

    return NextResponse.json({ response });
  } catch (error) {
    console.error("Gemini error:", error);
    return NextResponse.json({ error: "Erreur lors de la génération" }, { status: 500 });
  }
}