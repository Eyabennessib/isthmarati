import { onCall, HttpsError } from 'firebase-functions/v2/https';
import { defineSecret } from 'firebase-functions/params';
import { GoogleGenAI } from '@google/genai';

const GEMINI_API_KEY = defineSecret('GEMINI_API_KEY');

const ALLOWED_MODELS = new Set([
  'gemini-2.5-flash',
  'gemini-2.5-pro',
]);

const MAX_MESSAGES = 30;
const MAX_TEXT_LEN = 4000;
const MAX_SYSTEM_LEN = 8000;

interface InboundMessage {
  role: 'user' | 'model';
  content: string;
}

interface CallGeminiPayload {
  messages: InboundMessage[];
  systemInstruction?: string;
  model?: string;
}

export const callGemini = onCall(
  { secrets: [GEMINI_API_KEY], region: 'us-central1', cors: true },
  async (request) => {
    if (!request.auth) {
      throw new HttpsError('unauthenticated', 'Sign in to use the AI advisor.');
    }

    const data = request.data as CallGeminiPayload;
    if (!data || !Array.isArray(data.messages)) {
      throw new HttpsError('invalid-argument', 'messages must be an array.');
    }
    if (data.messages.length === 0 || data.messages.length > MAX_MESSAGES) {
      throw new HttpsError('invalid-argument', `messages length must be 1..${MAX_MESSAGES}.`);
    }
    for (const m of data.messages) {
      if (m.role !== 'user' && m.role !== 'model') {
        throw new HttpsError('invalid-argument', 'invalid message role.');
      }
      if (typeof m.content !== 'string' || m.content.length === 0 || m.content.length > MAX_TEXT_LEN) {
        throw new HttpsError('invalid-argument', `message content must be 1..${MAX_TEXT_LEN} chars.`);
      }
    }
    if (data.systemInstruction !== undefined) {
      if (typeof data.systemInstruction !== 'string' || data.systemInstruction.length > MAX_SYSTEM_LEN) {
        throw new HttpsError('invalid-argument', `systemInstruction must be a string up to ${MAX_SYSTEM_LEN} chars.`);
      }
    }

    const model = data.model ?? 'gemini-2.5-flash';
    if (!ALLOWED_MODELS.has(model)) {
      throw new HttpsError('invalid-argument', 'unsupported model.');
    }

    const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY.value() });

    try {
      const response = await ai.models.generateContent({
        model,
        contents: data.messages.map(m => ({
          role: m.role,
          parts: [{ text: m.content }],
        })),
        config: data.systemInstruction
          ? { systemInstruction: data.systemInstruction }
          : undefined,
      });
      return { text: response.text ?? '' };
    } catch (err) {
      console.error('Gemini call failed', err);
      throw new HttpsError('internal', 'AI advisor is temporarily unavailable.');
    }
  }
);
