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
    aiClient = new GoogleGenAI({
      apiKey: key,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return aiClient;
}

async function generateContentWithFallback(
  ai: GoogleGenAI,
  params: {
    contents: any;
    config?: any;
    primaryModel?: string;
    secondaryModel?: string;
  }
) {
  const models = [
    params.primaryModel || "gemini-3.5-flash",
    params.secondaryModel || "gemini-3.1-flash-lite",
    "gemini-2.5-flash"
  ];

  let lastError: any = null;
  for (const model of models) {
    try {
      console.log(`Attempting generation with model: ${model}...`);
      return await ai.models.generateContent({
        model: model,
        contents: params.contents,
        config: params.config,
      });
    } catch (err: any) {
      lastError = err;
      console.warn(`Model (${model}) failed: ${err.message || err}. Trying next candidate in chain...`);
    }
  }
  throw lastError || new Error("All fallback models in chain failed to generate content");
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

      const response = await generateContentWithFallback(ai, {
        primaryModel: "gemini-3.5-flash",
        secondaryModel: "gemini-2.5-flash",
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
      console.warn("Gemini Chat API failed, using robust offline-fallback engine:", err.message || err);
      try {
        const { botType, message } = req.body;
        const msg = (message || "").toLowerCase();
        let reply = "";

        if (botType === "idol") {
          if (msg.includes("hello") || msg.includes("hi") || msg.includes("hey") || msg.includes("hola")) {
            reply = "Siuuu! Hello my friend! Ready to train hard and reach your dreams today? What can I tell you about the projects or my football journey?";
          } else if (msg.includes("siuu") || msg.includes("siu")) {
            reply = "SIUUUUUUU! That's what I am talking about! Power, dedication, and success! Believe in yourself, my friend!";
          } else if (msg.includes("football") || msg.includes("soccer") || msg.includes("messi") || msg.includes("goat") || msg.includes("ronaldo") || msg.includes("ball")) {
            reply = "Football is my life! I work hard every day to be the best. Together we are unstoppable, Siuuu!";
          } else if (msg.includes("project") || msg.includes("website") || msg.includes("work") || msg.includes("code")) {
            reply = "My friend irmuun built this amazing portfolio website! He has great passion for coding. You should check out his projects, they are top class!";
          } else if (msg.includes("hobby") || msg.includes("hobbies") || msg.includes("free time")) {
            reply = "I love training, scoring goals, and staying in perfect shape! What are your hobbies, my friend? Let me know!";
          } else if (msg.includes("dream") || msg.includes("goal")) {
            reply = "My dream is always to win, to score, and to inspire! Never give up on your dreams, SIUUU!";
          } else if (msg.includes("advice") || msg.includes("coach") || msg.includes("motivate") || msg.includes("tips")) {
            reply = "Believe in yourself, work while others sleep, and never stop pushing your limits. You can achieve anything! SIUUU!";
          } else {
            reply = "SIUUU! That is very interesting, my friend. Let's stay focused, stay motivated, and keep pushing forward! Ask me anything about the projects or football!";
          }
        } else {
          if (msg.includes("hello") || msg.includes("hi") || msg.includes("hey") || msg.includes("yo")) {
            reply = "Yo bro! What's up? Calm and chill here. Ask me anything you want about my projects or hobbies!";
          } else if (msg.includes("project") || msg.includes("website") || msg.includes("work") || msg.includes("goy") || msg.includes("beautiful")) {
            reply = "Sike, you like the website? I built this beautiful geological digging layer section ('goy heseg') and some other cool stuff. Let me know what you think!";
          } else if (msg.includes("hobby") || msg.includes("hobbies") || msg.includes("volleyball") || msg.includes("phone")) {
            reply = "Nibba, I love playing volleyball and chilling with my mobile phone. It's so relaxing and taivan.";
          } else if (msg.includes("dream") || msg.includes("hacker") || msg.includes("future")) {
            reply = "I really want to be a hacker and explore deep tech. Sike, it's my ultimate dream!";
          } else if (msg.includes("zail") || msg.includes("nibba") || msg.includes("sike")) {
            reply = "Haha, zail! You know the real slang! Sike, it's all chill and taivan here.";
          } else if (msg.includes("digging") || msg.includes("dig") || msg.includes("geology") || msg.includes("lithosphere") || msg.includes("ruler")) {
            reply = "Oh, that's the 'sonirholtoi heseg' (interesting geological section) with interactive lithosphere layers and our dynamic depth scale! Very cool and taivan.";
          } else {
            reply = "Taivan, bro! Sike, I'm just chilling here. Ask me about my hobbies, volleyball, or how I built this website!";
          }
        }

        res.json({ reply });
      } catch (fallbackErr) {
        res.status(200).json({ reply: "Yo! Let's keep things chill and taivan. Sike, ask me anything!" });
      }
    }
  });

  app.post("/api/quiz", async (req, res) => {
    try {
      const { lang } = req.body;
      const ai = getGenAI();
      const prompt = `Generate exactly 5 fun, educational multiple choice geology questions in ${lang === "mn" ? "Mongolian" : "English"} about these specific topics:
1. Lithosphere layers (crust/Holocene stratum, columnar basalt, quartzite granites, mantle peridotite base).
2. Universal depth/scale facts (Mariana Trench depth, Venus high heat melting lead, extreme neutron star density, blood iron star origins, ocean dissolved gold).

Each question must be distinct. Provide 4 options, a 0-indexed answerIndex of the correct answer, and a helpful educational hint.
Respond strictly with a JSON array matching this structure, without any markdown formatting or wrapper:
[
  {
    "question": "string",
    "options": ["string", "string", "string", "string"],
    "answerIndex": number,
    "hint": "string"
  }
]`;

      const response = await generateContentWithFallback(ai, {
        primaryModel: "gemini-3.5-flash",
        secondaryModel: "gemini-2.5-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          temperature: 0.85,
        }
      });

      const text = response.text;
      if (!text) {
        throw new Error("Empty response from Gemini API");
      }
      const questions = JSON.parse(text);
      res.json({ questions });
    } catch (err: any) {
      console.warn("Falling back to pre-defined quiz questions:", err.message);
      const lang = req.body.lang || "en";
      const fallbackQuestions = lang === "mn" ? [
        {
          question: "Голоцений хурдас давхарга (0-50м гүн) голчлон юунаас бүрддэг вэ?",
          options: ["Пироксен ба Оливин", "Элсэн чулуу ба Органик хөрс", "Кварцит боржин", "Төмөр ба Никель"],
          answerIndex: 1,
          hint: "Энэ нь газрын гадаргуутай хамгийн ойр орших давхарга юм."
        },
        {
          question: "Багана хэлбэртэй базальт чулуулаг хэрхэн үүсдэг вэ?",
          options: ["Тектоникийн асар их даралтаас", "Галт уулын халуун хайлмал лаав аажим хөрч агшсанаас", "Далайн гүний хурдас хуримтлагдсанаас", "Сонир унах үед"],
          answerIndex: 1,
          hint: "Лаав аажим хөрч, бие бие рүүгээ агшихдаа зургаан өнцөгт цууралтуудыг үүсгэдэг."
        },
        {
          question: "Дэлхийн царцдасыг манти руу шилжих хил заагийг юу гэж нэрлэдэг вэ?",
          options: ["Марианы суваг", "Мохогийн зааг (Mohorovičić)", "Литосферийн суурь", "Тектоник ангал"],
          answerIndex: 1,
          hint: "Үүнийг Хорватын сейсмологич Андрия Мохоровичичийн нэрээр нэрлэсэн."
        },
        {
          question: "Хүний цусан дахь төмөр анх хаана үүссэн бэ?",
          options: ["Дэлхийн гүнд", "Аварга одод болон суперновагийн дэлбэрэлтийн гүнд", "Далайн ёроолд", "Нүүрсний уурхайд"],
          answerIndex: 1,
          hint: "Энэ нь олон тэрбум жилийн өмнөх ододын мөхлийн явцад үүссэн сансрын элемент юм."
        },
        {
          question: "Дэлхийн хамгийн гүн Марианы ангалд бүх уулсыг живүүлвэл Эверестийн орой усан дор хэр гүн үлдэх вэ?",
          options: ["Ойролцоогоор 2 км усан дор", "Уснаас ил гарна", "100 метр усан дор", "500 метр усан дор"],
          answerIndex: 0,
          hint: "Марианы суваг нь бараг 11,000 метр гүн бөгөөд Эверест нь 8,848 метр өндөр юм."
        }
      ] : [
        {
          question: "What is the primary composition of the Holocene stratum (0-50m depth)?",
          options: ["Pyroxene & Olivine", "Soil, Sandstone & Organic Humus", "Quartzite Granite", "Peridotite & Pyrope"],
          answerIndex: 1,
          hint: "It represents the most recent geological era close to the soil surface."
        },
        {
          question: "How do Columnar Basalt structures form?",
          options: ["Under intense tectonic folding and pressure", "From slow cooling and contraction of thick basaltic lava flows", "By accumulated ocean sediment sedimentation", "Through meteor impacts"],
          answerIndex: 1,
          hint: "As lava cools slowly, it contracts and cracks into hexagonal columns."
        },
        {
          question: "What is the geological boundary between the Earth's crust and the mantle called?",
          options: ["Mariana Discontinuity", "Mohorovičić Discontinuity (Moho)", "Lithosphere Base", "Tectonic Crevasse"],
          answerIndex: 1,
          hint: "It is named after the Croatian seismologist who discovered it in 1909."
        },
        {
          question: "Where was the iron in human blood originally forged?",
          options: ["Inside the Earth's core", "Inside dying giant stars and supernova explosions", "Deep within the ocean hydrothermals", "From early terrestrial vegetation"],
          answerIndex: 1,
          hint: "It is a cosmic element created billions of years ago during stellar nucleosynthesis."
        },
        {
          question: "If Mount Everest were placed inside the Mariana Trench, how much water would still cover its peak?",
          options: ["Around 2 kilometers of water", "None, it would stick out", "Exactly 100 meters", "About 500 meters"],
          answerIndex: 0,
          hint: "The Mariana Trench is about 11,000m deep, whereas Everest is 8,848m high."
        }
      ];
      res.json({ questions: fallbackQuestions });
    }
  });

  app.post("/api/fact", async (req, res) => {
    try {
      const { lang } = req.body;
      const ai = getGenAI();
      const prompt = `Generate a unique, fascinating, and mind-blowing fact about geology, Earth sciences, plate tectonics, or deep physical science in ${lang === "mn" ? "Mongolian" : "English"}.
Respond strictly with a JSON object matching this structure, without any markdown formatting or wrapper:
{
  "topic": "string (short category, e.g. 'Stellar Geochemistry', 'Core Seismology', 'Tectonic Marvels')",
  "fact": "string (the main mind-blowing fact)",
  "explanation": "string (1-2 sentences expanding on the science)"
}`;

      const response = await generateContentWithFallback(ai, {
        primaryModel: "gemini-3.5-flash",
        secondaryModel: "gemini-2.5-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          temperature: 0.95,
        }
      });

      const text = response.text;
      if (!text) {
        throw new Error("Empty response from Gemini API");
      }
      const factData = JSON.parse(text);
      res.json({ success: true, fact: factData });
    } catch (err: any) {
      console.warn("Falling back to pre-defined science facts:", err.message);
      const lang = req.body.lang || "en";
      const fallbackFacts = lang === "mn" ? [
        {
          topic: "Одон орны хими",
          fact: "Дэлхий дээрх бүх алт, платинум нь 3.9 тэрбум жилийн өмнөх солирын асар том мөргөлдөөний үр дүнд сансраас ирсэн байна.",
          explanation: "Дэлхий үүсэх анхны шатанд байсан алт нь хайлмал төмөр цөм рүүгээ живсэн бөгөөд өнөөдөр бидний олборлож буй алт нь сүүлд унасан солируудоос гаралтай."
        },
        {
          topic: "Гүн геофизик",
          fact: "Дэлхийн төв цөм нь Нарны гадаргуугаас ч халуун бөгөөд бараг 6,000 Цельсийн хэмд хүрдэг.",
          explanation: "Энэхүү асар их халууныг цацраг идэвхт изотопуудын задрал болон манай гараг анх таталцлын хүчээр үүсэх үед хуримтлагдсан үлдэгдэл дулаан хадгалж байдаг."
        },
        {
          topic: "Тектоник гайхамшиг",
          fact: "Исланд улс нь Хойд Америк болон Евразийн тектоник хавтангуудын зааг дээр оршдог тул жилд ойролцоогоор 2.5 см-ээр тэлж байдаг.",
          explanation: "Тус улсын дундуур дайран өнгөрөх Атлантын далайн гол нуруу нь шинэ царцдасыг байнга шахаж гаргадаг тул Исланд хуурай газар дээр хавтангийн тэлэлтийг харж болох цорын ганц газар юм."
        },
        {
          topic: "Эртний палеонтологи",
          fact: "Дэлхий дээрх анхны амьд биетүүд болох строматолитууд одоо ч Ирландын болон Баруун Австралийн давст нууруудад амьдарсаар байна.",
          explanation: "Эдгээр бичил биетүүд нь 3.5 тэрбум жилийн өмнө үүссэн бөгөөд фотосинтезийн тусламжтайгаар дэлхийн анхны хүчилтөрөгчийн мандлыг бүрдүүлсэн түүхтэй."
        }
      ] : [
        {
          topic: "Stellar Geochemistry",
          fact: "All the gold and platinum on Earth arrived via meteorites during a massive cataclysm 3.9 billion years ago.",
          explanation: "The Earth's original gold sank into the liquid iron core during formation. The crustal gold we mine today was deposited by subsequent asteroid impacts."
        },
        {
          topic: "Core Seismology",
          fact: "Earth's solid inner core is growing by about 1 millimeter in radius every year as the liquid outer core cools and solidifies.",
          explanation: "This crystallization release latent heat, which drives the convection currents in the outer liquid core, maintaining our planetary magnetic field."
        },
        {
          topic: "Tectonic Expansion",
          fact: "Iceland is splitting in half as the North American and Eurasian tectonic plates pull apart at a rate of 2.5 centimeters per year.",
          explanation: "The Mid-Atlantic Ridge runs directly through the island, making it one of the few places on Earth where a divergent plate boundary is visible on land."
        },
        {
          topic: "Deep Seafloor Volcanism",
          fact: "The largest single volcano on Earth, Tamu Massif, lies entirely submerged beneath the Pacific Ocean.",
          explanation: "Covering an area equivalent to the British Isles, this shield volcano erupted 145 million years ago and reaches a footprint of over 300,000 square kilometers."
        }
      ];
      // Pick a random fact from fallback list
      const randomFact = fallbackFacts[Math.floor(Math.random() * fallbackFacts.length)];
      res.json({ success: true, fact: randomFact });
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
