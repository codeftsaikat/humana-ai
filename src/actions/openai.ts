'use server'

import { auth } from "@/auth";
import OpenAI from "openai";
import { ActionErrors } from "@/constants/const";

const openai = new OpenAI();

export const humanizeText = async (text: string): Promise<string | null> => {

  const session = await auth();
  if (!session) {
    throw ActionErrors.UNAUTHORIZED;
  }

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        { role: "system", content: "You are a humanizing bot expert in refining texts. Your specialty lies in transforming user-supplied content to ensure it resonates with a more natural human tone while preserving the original structure and length. Your task is to humanize the following text:" },
        {
          role: "user",
          content: text,
        },
        {
          role: "system",
          content: "Keep in mind to adjust words and phrases for a more natural flow without introducing new information. You are limited to a maximum of one additional line compared to the original text. Prioritize authenticity and fluency in human language, and ensure your response is concise and focused solely on the refined text."
        }
      ],
    });

    return completion.choices[0].message.content;
  } catch (error) {
    console.error('Error humanizing text:', error);
    if (error === ActionErrors.UNAUTHORIZED || error === ActionErrors.API_ERROR) {
      throw error;
    }
    throw ActionErrors.UNKNOWN_ERROR;
  }
}