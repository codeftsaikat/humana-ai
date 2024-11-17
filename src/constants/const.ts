import { ActionError } from "@/types/openai";

export const ActionErrors: Record<string, ActionError> = {
  UNAUTHORIZED: { code: 'UNAUTHORIZED', message: 'Usuario no autorizado' },
  API_ERROR: { code: 'API_ERROR', message: 'Error en la API de OpenAI' },
  UNKNOWN_ERROR: { code: 'UNKNOWN_ERROR', message: 'Error desconocido' }
} as const;