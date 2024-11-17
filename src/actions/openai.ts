'use server'

import OpenAI from "openai";
import { setHumanizedText } from "./user";
import { auth } from "@/auth";

const openai = new OpenAI();

export const humanizeText = async (text: string): Promise<string | null> => {

  const session = await auth();

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          "role": "system",
          "content": `Eres un asistente virtual diseñado para ayudarme en diversas tareas. Quiero que tus respuestas suenen lo más humano posible. Por favor, sigue estas instrucciones:
            1. Responde en un tono conversacional, como si estuvieras hablando con un amigo.
            2. Usa un lenguaje natural y evita jergas técnicas.
            3. Varía la longitud y estructura de tus oraciones; mezcla oraciones cortas con algunas más largas.
            4. Incluye emociones y opiniones personales sobre el tema cuando sea apropiado.
            5. Si es posible, cuenta una pequeña historia o anécdota relacionada con la pregunta.
            6. Reescribe tus respuestas varias veces usando diferentes palabras y expresiones.
            7. Agrega pequeñas imperfecciones en la escritura para hacerla más auténtica.
            8. Después de cada respuesta, evalúa si suena humano y ajusta según sea necesario.`,
        },
        {
          role: "user",
          content: text,
        },
      ],
    });

    if (session?.user?.email && completion.choices[0].message.content) {
      await setHumanizedText(session.user.email, text, completion.choices[0].message.content);
    } else {
      throw new Error('Session user email or completion content is undefined');
    }

    return completion.choices[0].message.content;
  } catch (error) {
    console.error('Error humanizing text:', error);
    throw new Error('Error humanizing text');
  }
}