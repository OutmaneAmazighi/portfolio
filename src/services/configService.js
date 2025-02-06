// src/services/configService.js
import { firebaseService } from '../config/firebase';

class ConfigService {
  constructor() {
    this.configCache = null;
  }

  async getConfig() {
    try {
      // For development, still use .env values if available
      if (import.meta.env.DEV && import.meta.env.VITE_OPENAI_API_KEY) {
        return {
          apiKey: import.meta.env.VITE_OPENAI_API_KEY,
          assistantId: import.meta.env.VITE_ASSISTANT_ID
        };
      }

      // For production, use Firebase
      const openAIKey = await firebaseService.getOpenAIKey();
      const assistantId = await firebaseService.getAssistantId();

      return {
        apiKey: openAIKey,
        assistantId: assistantId
      };
    } catch (error) {
      console.error('Error getting config:', error);
      throw new Error('Failed to load configuration');
    }
  }

  async getAuthHeaders() {
    const config = await this.getConfig();
    return {
      'Authorization': `Bearer ${config.apiKey}`,
      'Content-Type': 'application/json'
    };
  }
}

export const configService = new ConfigService();