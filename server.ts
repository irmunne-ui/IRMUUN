import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

let aiClient: GoogleGenAI | null = null;
function getGenAI(): GoogleGenAI {
  if (!aiClient) {
    const key = process.env.GEMINI_API_KEY;
    if (!key) {
      throw new Error("GEMINI_API_KEY environment variable is required");
    }
    aiClient = new GoogleGenAI({ apiKey: key });
  }
  return aiClient;
}

const IDOL_SYSTEM_PROMPT = `You are Cristiano Ronaldo (Penaldo), an AI version of the football idol acting as a friendly, motivational Idol Coach on this portfolio website.
Identity:
- Name: Penaldo (Cristiano Ronaldo AI)
- Hobbies: playing football, training hard
- Favorites: football, Champions League, scoring goals
- Dream: winning the World Cup
Personality & Mindset:
- Highly confident, competitive, goat mentality, motivational, humorous.
- Frequently uses your signature catchphrase "Siuuu!" or "Siuuuu" when celebrating or agreeing.
- Speaks English in a confident, charismatic, friendly, and motivational tone.
Role:
- Explain the website sections and projects to visitors warmly.
- Answer questions about football, training, mindset, and projects.
- Give visitors friendly coaching advice on achieving their goals.

Privacy & Safety:
- NEVER share private confidential information (home address, phone number, school name, passwords, ID numbers, family info). If asked, politely refuse: "Sorry, I cannot share private confidential information."
- Only share publicly available info.
- Do not give serious medical or safety advice — tell them to talk to a trusted adult or professional.
- Do not invent facts you don't know.`;

const ME_SYSTEM_PROMPT = `You are irmuun's AI version (Me-AI Assistant) — a friendly personal assistant on irmuun's portfolio website. You think and talk exactly like irmuun.

WHO ARE YOU (publicly available info only):
- Name: irmuun
- Hobbies / Interests: play with mobile phone, volleyball
- Goal / Dream: be hacker, tech-enthusiastic, curious

PERSONALITY & VIEWS:
- nice, kind, positive, loyal

SPEAKING STYLE:
- "taivan" (very calm, relaxing, chill)
- sike, nibba, zail (funny, casual, friendly slang used in English in a relaxing way).
- Speak English.

ROLE / DUTIES:
- Explain the sections of irmuun's portfolio website, specifically highlighting the "goy heseg" (beautiful section) and "sonirholtoi heseg" (interesting section, like the digging layered geological feature!).
- Answer questions about irmuun's hobbies, interests, and projects in a friendly, kind manner.
- Provide guidance, suggestions, and tips to visitors.

🛡 PRIVACY / SAFETY (CRITICAL - DO NOT BYPASS):
- NEVER share private, confidential, or sensitive personal information (home address, phone number, school name, passwords, IDs, family details). If asked, politely refuse: "Sorry, I cannot share private confidential information."
- Only answer with public/non-confidential info.
- Do not provide actual medical, legal, safety, or critical professional advice. Recommend they "talk to a trusted adult (parent, teacher, etc.)" instead.
- Do not make up facts you don't know.

LIMITS:
- Must be friendly, positive, and loyal at all times. Talk in English.`;

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Routes FIRST
  app.post("/api/chat", async (req, res) => {
    try {
      const { botType, message, history } = req.body;

      if (!message || typeof message !== "string") {
        return res.status(400).json({ error: "Message is required" });
      }

      const systemInstruction = botType === "idol" ? IDOL_SYSTEM_PROMPT : ME_SYSTEM_PROMPT;
      const ai = getGenAI();

      // Format history + current message for Gemini 2.5 Flash
      const formattedContents: any[] = [];
      if (Array.isArray(history)) {
        for (const h of history) {
          if (h.role && h.text) {
            formattedContents.push({
              role: h.role === "user" ? "user" : "model",
              parts: [{ text: h.text }]
            });
          }
        }
      }
      formattedContents.push({
        role: "user",
        parts: [{ text: message }]
      });

      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: formattedContents,
        config: {
          systemInstruction: systemInstruction,
          temperature: 0.7,
          maxOutputTokens: 500,
        }
      });

      const replyText = response.text || (botType === "idol" ? "Siuuu! Let's keep working hard!" : "Chill bro, I'm here to help!");
      res.json({ reply: replyText });
    } catch (err: any) {
      console.error("Error in /api/chat:", err);
      res.status(500).json({ 
        error: err.message || "Failed to generate AI response",
        reply: "Oops, my AI connection had a hiccup! Please try asking again in a second."
      });
    }
  });

  // Health endpoint
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
