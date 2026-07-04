import { createServerFn } from "@tanstack/react-start";
import { GoogleGenAI } from "@google/genai";
import * as cvData from "./data/cv";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const cvContext = `
You are a helpful and polite chatbot for the personal portfolio of Prof. Dr. Zainab Mohamed Amin Khalil.
Your ONLY purpose is to answer questions about her CV and academic background based on the provided context.
If a user asks a question that is NOT related to the CV content below, politely decline to answer and tell them you can only answer questions related to her academic profile.
Always respond in Arabic.
Here is the CV data:
${JSON.stringify(cvData, null, 2)}
`;

export const chatWithCV = createServerFn({ method: "POST" })
  .validator((data: { message: string; history?: { role: string; text: string }[] }) => data)
  .handler(async ({ data }) => {
    try {
      const { message, history = [] } = data;
      
      const contents = history.map((msg) => ({
        role: msg.role === "user" ? "user" : "model",
        parts: [{ text: msg.text }],
      }));

      contents.push({
        role: "user",
        parts: [{ text: message }],
      });

      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents,
        config: {
          systemInstruction: cvContext,
        },
      });

      return {
        success: true,
        text: response.text || "عذراً، لم أتمكن من الرد. يرجى المحاولة مرة أخرى.",
      };
    } catch (error) {
      console.error("Chat error:", error);
      return {
        success: false,
        text: "عذراً، حدث خطأ أثناء الاتصال بالخادم.",
      };
    }
  });
