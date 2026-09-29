import { apiRequest } from '../client';
import type { AssistantApi } from '../assistantApi';
import type { AssistantMessageRequestDto, AssistantMessageResponseDto } from '../dto';

/** HTTP implementation of AssistantApi (not active while API_MODE is 'demo'). */
export const httpAssistantApi: AssistantApi = {
  async sendMessage(input, signal) {
    const body: AssistantMessageRequestDto = { message: input.message, date: input.date };
    const res = await apiRequest<AssistantMessageResponseDto>('/assistant/messages', { method: 'POST', body, signal, timeoutMs: 30_000 });
    return { reply: res.reply, createdAt: res.createdAt };
  },
};
