// src/config.js
export const getConfig = () => {
    // For development (using .env)
    if (import.meta.env.DEV) {
      return {
        openAIKey: import.meta.env.VITE_OPENAI_API_KEY,
        assistantId: import.meta.env.VITE_ASSISTANT_ID
      };
    }
    
    // For production (using window.ENV_CONFIG)
    return {
      openAIKey: window?.ENV_CONFIG?.VITE_OPENAI_API_KEY || '',
      assistantId: window?.ENV_CONFIG?.VITE_ASSISTANT_ID || ''
    };
  };