// src/services/assistantService.js
import { firebaseService } from '../config/firebase';

class AssistantService {
  constructor() {
    this.baseUrl = 'https://api.openai.com/v1/chat/completions';
    this.threadId = null;
  }

  async streamAssistant(query, onToken) {
    try {
      const config = await firebaseService.getConfig();
      
      const response = await fetch(this.baseUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${config.openAIKey}`
        },
        body: JSON.stringify({
          model: 'gpt-4',
          messages: [
            { 
              role: 'system', 
              content: 'Du bist ein AI-Assistent für das Portfolio von Outmane. Du kennst dich gut mit seinen Projekten, Erfahrungen und Fähigkeiten aus.' 
            },
            { role: 'user', content: query }
          ],
          stream: true
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder('utf-8');

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value);
        const lines = chunk.split('\n');

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const json = line.replace(/^data:\s*/, '');
            if (json === '[DONE]') return;

            try {
              const parsed = JSON.parse(json);
              const token = parsed?.choices?.[0]?.delta?.content;
              if (token) onToken(token);
            } catch (err) {
              // Ignore JSON parse errors for incomplete chunks
            }
          }
        }
      }
    } catch (error) {
      console.error('Error in streamAssistant:', error);
      throw error;
    }
  }

  async initialize() {
    try {
      const config = await firebaseService.getConfig();
      return config.assistantId;
    } catch (error) {
      console.error('Error initializing assistant:', error);
      throw error;
    }
  }

  async createThread() {
    this.threadId = "thread_" + Date.now();
    return { id: this.threadId };
  }

  async addMessage(content) {
    return this.streamAssistant(content, () => {});
  }
}

export const assistantService = new AssistantService();