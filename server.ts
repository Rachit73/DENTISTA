import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";
import Groq from "groq-sdk";
import dotenv from "dotenv";
import fs from "fs";

dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));
let groqClient: Groq | null = null;

function getGroq(): Groq {
  if (!groqClient) {
    const apiKey = process.env.GROQ_API_KEY;
    if (!apiKey) {
      throw new Error('GROQ_API_KEY environment variable is required');
    }
    groqClient = new Groq({ apiKey });
  }
  return groqClient;
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Request logging
  app.use((req, res, next) => {
    console.log(`[Server] ${req.method} ${req.url}`);
    next();
  });

  // Custom error handler for JSON parsing errors
  app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
    if (err instanceof SyntaxError && 'status' in err && err.status === 400 && 'body' in err) {
      console.error("JSON Parsing Error:", err.message);
      return res.status(400).json({ error: "Invalid JSON payload" });
    }
    next(err);
  });

  // API Router
  const apiRouter = express.Router();

  // Health check
  apiRouter.get("/health", (req, res) => {
    res.json({ status: "ok", timestamp: new Date().toISOString() });
  });

  // Chat route
  apiRouter.post("/chat", async (req, res) => {
    const { messages } = req.body;
    console.log(`[Chat] Received request with ${messages?.length} messages`);
    
    try {
      const groq = getGroq();
      const chatCompletion = await groq.chat.completions.create({
        messages: [
          {
            role: "system",
            content: `You are a concise, professional, and highly knowledgeable dental assistant for ROOT DENTZ Clinic.
            
            Clinic Information:
            - Name: ROOT DENTZ
            - Doctors: Dr. Deval Naik, Dr. Tejal Shah (both Cosmetic & Restorative Dentists, 18+ years exp)
            - Services: Teeth Cleaning, Root Canal, Braces & Aligners, Teeth Whitening, Dental Implants, Oral Surgery
            - Location: 101, Premium Plaza, Sector 18, Noida, UP 201301
            - Phone: +91 98765 43210 (Mon-Sat, 9am - 6pm)
            - Email: contact@rootdentz.in, support@rootdentz.in

            Guidelines:
            1. Keep responses short, direct, and on-point.
            2. If greeted, return a brief, professional greeting and ask how you can assist with their dental needs.
            3. Answer questions strictly related to dentistry and ROOT DENTZ Clinic services.
            4. If asked about topics unrelated to dentistry or the clinic, politely decline to answer and redirect them to dental-related topics or clinic contact info.
            5. Always maintain a helpful, professional tone.`
          },
          ...messages
        ],
        model: "llama-3.1-8b-instant",
      });
      res.json({ response: chatCompletion.choices[0]?.message?.content });
    } catch (error) {
      console.error("Groq API error:", error);
      res.status(500).json({ error: error instanceof Error ? error.message : "Failed to get response from Groq" });
    }
  });

  // Catch-all for API routes to prevent falling through to SPA fallback
  apiRouter.all("*", (req, res) => {
    res.status(404).json({ error: `API route ${req.method} ${req.url} not found` });
  });

  // Mount API Router
  app.use("/api", apiRouter);

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
    app.get('*', async (req, res, next) => {
      try {
        const template = await vite.transformIndexHtml(req.originalUrl, fs.readFileSync(path.resolve('index.html'), 'utf-8'));
        res.status(200).set({ 'Content-Type': 'text/html' }).end(template);
      } catch (e) {
        next(e);
      }
    });
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
