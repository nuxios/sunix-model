import Groq from "groq-sdk";
import { apiKey } from "../config/conf";
import fs from 'fs/promises';
import path from 'path';

const client = new Groq({
  apiKey: apiKey,
});

async function main() {
  try {
    const chatCompletion = await client.chat.completions.create({
      messages: [
        { role: "user", content: "Explain the importance of low latency LLMs" },
      ],
      model: "llama3-8b-8192",
    });

    const output = chatCompletion.choices[0].message.content;

    // Membuat objek JSON dengan informasi yang relevan
    const jsonOutput = {
      prompt: "Explain the importance of low latency LLMs",
      model: "llama3-8b-8192",
      response: output,
      timestamp: new Date().toISOString()
    };

    // Membuat nama file unik berdasarkan timestamp
    const fileName = `llm_output_${Date.now()}.json`;
    const filePath = path.join('datac', fileName);

    // Membuat folder 'datac' jika belum ada
    await fs.mkdir('datac', { recursive: true });

    // Menulis output ke file JSON
    await fs.writeFile(filePath, JSON.stringify(jsonOutput, null, 2));

    console.log(`Output telah disimpan di: ${filePath}`);
  } catch (error) {
    console.error("Terjadi kesalahan:", error);
  }
}

main();