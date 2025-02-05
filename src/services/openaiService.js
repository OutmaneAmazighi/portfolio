// src/services/openaiService.js
import { configService } from './configService';

class OpenAIService {
  constructor() {
    this.baseUrl = 'https://api.openai.com/v1';
  }

  async createEmbedding(text) {
    const headers = await configService.getAuthHeaders();
    return fetch(`${this.baseUrl}/embeddings`, {
      method: "POST",
      headers,
      body: JSON.stringify({
        model: "text-embedding-3-small",
        input: text
      })
    }).then(res => res.json());
  }

  async createChatCompletion(messages, options) {
    const headers = await configService.getAuthHeaders();
    return fetch(`${this.baseUrl}/chat/completions`, {
      method: "POST",
      headers,
      body: JSON.stringify({
        model: options?.model || "gpt-3.5-turbo",
        messages: messages,
        ...options
      })
    }).then(res => res.json());
  }
}

export const openaiService = new OpenAIService();