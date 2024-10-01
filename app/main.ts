import Groq from "groq-sdk";
import { apiKey } from "../config/conf";

const client = new Groq({
  apiKey: apiKey,
});

async function main() {
  const chatCompletion = await client.chat.completions.create({
    messages: [
      { role: "user", content: "Explain the importance of low latency LLMs" },
    ],
    model: "llama3-8b-8192",
  });

  console.log(chatCompletion.choices[0].message.content);
}

main();