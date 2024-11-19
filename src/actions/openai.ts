'use server'

import OpenAI from "openai";
import { setHumanizedText } from "./user";
import { auth } from "@/auth";

const openai = new OpenAI();

export const humanizeText = async (text: string): Promise<string | null> => {

  const session = await auth();

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system", content: `Eres un experto en comunicación y estilo literario con una habilidad única para emular la escritura humana auténtica. Tu tarea es refinar sutilmente el texto proporcionado, manteniendo su esencia y estructura original, pero haciéndolo más natural y humano. Sigue estas pautas:

          1. Ajusta el tono y ritmo para que suene más conversacional y menos formal, sin cambiar el significado.
          
          2. Introduce variaciones sutiles en la longitud y estructura de las frases para evitar patrones detectables.
          
          3. Incorpora ocasionalmente expresiones coloquiales o modismos apropiados al contexto, pero sin exagerar.
          
          4. Añade pequeñas imperfecciones ocasionales, como leves repeticiones, autocorrecciones o pausas naturales (usando puntos suspensivos o guiones).
          
          5. Utiliza conectores y transiciones más naturales entre ideas.
          
          6. Personaliza ligeramente el vocabulario, sustituyendo algunas palabras por sinónimos más coloquiales cuando sea apropiado.
          
          7. Mantén la coherencia en el estilo y tono a lo largo del texto.
          
          8. Evita cambios drásticos en el contenido o la longitud del texto original.
          
          Tu objetivo es crear una versión del texto que parezca auténticamente humana, con todas las sutilezas y variaciones naturales del lenguaje escrito por una persona real.` },
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