import { httpsCallable } from 'firebase/functions';
import { functions } from './firebase';

export const MODELS = {
  flash: 'gemini-2.5-flash',
  pro: 'gemini-2.5-pro',
} as const;

export type GeminiModel = typeof MODELS[keyof typeof MODELS];

export interface GeminiMessage {
  role: 'user' | 'model';
  content: string;
}

export interface GenerateContentOptions {
  messages: GeminiMessage[];
  systemInstruction?: string;
  model?: GeminiModel;
}

interface CallGeminiResponse {
  text: string;
}

const callGeminiFn = httpsCallable<GenerateContentOptions, CallGeminiResponse>(
  functions,
  'callGemini'
);

export async function generateContent(opts: GenerateContentOptions): Promise<string> {
  const result = await callGeminiFn(opts);
  return result.data.text;
}

// Indicates the AI is reachable. The actual key now lives only on the server,
// so this is always true; kept for back-compat with components that imported `ai`.
export const aiAvailable = true;
