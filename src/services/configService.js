// src/services/configService.js

let configCache = null;

class ConfigService {
  async getConfig() {
    // Clear cache when running in development
    if (import.meta.env.DEV) {
      configCache = null;
    }

    if (configCache) {
      return configCache;
    }

    // For development, use .env values
    if (import.meta.env.DEV) {
      configCache = {
        apiKey: import.meta.env.VITE_OPENAI_API_KEY,
        assistantId: import.meta.env.VITE_ASSISTANT_ID
      };
      return configCache;
    }

    // For production build
    if (typeof window !== 'undefined' && window.ENV_CONFIG) {
      configCache = {
        apiKey: window.ENV_CONFIG.VITE_OPENAI_API_KEY,
        assistantId: window.ENV_CONFIG.VITE_ASSISTANT_ID
      };
      return configCache;
    }

    // Fallback empty config
    return {
      apiKey: '',
      assistantId: ''
    };
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