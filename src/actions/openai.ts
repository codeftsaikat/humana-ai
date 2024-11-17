'use server'

import OpenAI from "openai";

const openai = new OpenAI();

export const humanizeText = async (text: string) => {
  const completion = await openai.chat.completions.create({
    model: "gpt-4o",
    messages: [
      { role: "system", content: "You are a humanizing bot expert in refining texts. Your task is to humanize user-supplied content while maintaining the original structure and length. Adjust words and phrases for a more natural tone, without adding new information. Limit your response to a maximum of one additional line from the original text. Prioritize the authenticity and fluency of human language." },
      {
        role: "user",
        content: text,
      },
    ],
  });

  return completion.choices[0].message.content;
}