import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const token = process.env["GITHUB_TOKEN"];
const endpoint = "https://models.inference.ai.azure.com";
const modelName = "gpt-4o";

export async function POST(req: NextRequest) {
  if (!token) {
    return NextResponse.json({ error: "API Key is missing" }, { status: 500 });
  }

  const { text } = await req.json();

  if (!text) {
    return NextResponse.json({ error: "Text is required" }, { status: 400 });
  }

  try {
    const client = new OpenAI({
      baseURL: endpoint,
      apiKey: token,
      dangerouslyAllowBrowser: false,
    });

    const response = await client.chat.completions.create({
      messages: [
        { role: "system", content: "You are a helpful assistant." },
        { role: "user", content: `Humanize this text: ${text}` },
      ],
      temperature: 1.0,
      top_p: 1.0,
      max_tokens: 1000,
      model: modelName,
    });

    return NextResponse.json({ result: response.choices[0]?.message?.content });
  } catch (error: any) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: "Failed to humanize text" },
      { status: 500 }
    );
  }
}
