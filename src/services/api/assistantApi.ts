import type { DateOnly } from '../../lib/date';
import { API_MODE } from './config';
import { demoAssistantApi } from '../demo/demoAssistantApi';
import { httpAssistantApi } from './http/httpAssistantApi';

export interface AssistantMessageInput {
  message: string;
  /** The patient's local today (YYYY-MM-DD). */
  date: DateOnly;
}

export interface AssistantReply {
  reply: string;
  /** ISO 8601 with offset. */
  createdAt: string;
}

/**
 * Cycle assistant. The server reads the patient's own data; the client sends
 * only the question. See docs/API_CONTRACT.md: POST /assistant/messages.
 */
export interface AssistantApi {
  sendMessage(input: AssistantMessageInput, signal?: AbortSignal): Promise<AssistantReply>;
}

export const assistantApi: AssistantApi = API_MODE === 'http' ? httpAssistantApi : demoAssistantApi;
