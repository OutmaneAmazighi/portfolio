// src/services/assistantService.js
class AssistantService {
  constructor() {
    // Use the Vercel proxy URL
    this.proxyUrl = 'https://portfolio-outmanes-projects-901794ba.vercel.app/api/openai-proxy';
    this.assistantId = null;
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
              console.log('Parse error:', err);
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
    this.assistantId = "asst_KuUnwCYEPBsYMEm6I2OSuEIT";
    console.log('Using existing assistant from the dashboard');
  }

  // For completeness, let's keep a simplified version of thread management
  async createThread() {
    try {
      const response = await fetch(`${this.proxyUrl}/threads`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      if (!response.ok) {
        throw new Error('Failed to create thread');
      }
      
      const thread = await response.json();
      this.threadId = thread.id;
      return thread;
    } catch (error) {
      console.error('Error creating thread:', error);
      throw error;
    }
  }

  async addMessage(content) {
    try {
      const response = await fetch(this.proxyUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          model: 'gpt-4',
          messages: [
            { 
              role: 'system', 
              content: 'Du bist ein AI-Assistent für das Portfolio von Outmane.' 
            },
            { role: 'user', content }
          ]
        })
      });

      if (!response.ok) {
        throw new Error('Failed to add message');
      }

      return await response.json();
    } catch (error) {
      console.error('Error adding message:', error);
      throw error;
    }
  }
}

export const assistantService = new AssistantService();