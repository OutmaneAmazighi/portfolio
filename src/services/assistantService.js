// src/services/assistantService.js
class AssistantService {
  constructor() {
    this.proxyUrl = 'https://portfolio-outmanes-projects-901794ba.vercel.app/api/openai-proxy';
    this.assistantId = "asst_KuUnwCYEPBsYMEm6I2OSuEIT";
    this.threadId = null;
  }

  async streamAssistant(query, onToken) {
    try {
      const response = await fetch(this.proxyUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          model: 'gpt-4',
          stream: true,
          messages: [
            { 
              role: 'system', 
              content: 'Du bist ein AI-Assistent für das Portfolio von Outmane. Du kennst dich gut mit seinen Projekten, Erfahrungen und Fähigkeiten aus.' 
            },
            { role: 'user', content: query }
          ]
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

  async createAssistant() {
    console.log('Using existing assistant from the dashboard');
    return this.assistantId;
  }

  // Simplified to avoid creating actual threads
  async createThread() {
    this.threadId = "thread_" + Date.now();
    return { id: this.threadId };
  }

  async addMessage(content) {
    return this.streamAssistant(content, () => {});
  }
}

export const assistantService = new AssistantService();