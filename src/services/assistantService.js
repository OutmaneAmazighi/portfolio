// src/services/assistantService.js
import OpenAI from 'openai';
import { openaiService } from './openaiService'; // Or just use fetch below


class AssistantService {
  constructor() {
    this.client = new OpenAI({
      apiKey: import.meta.env.VITE_OPENAI_API_KEY,
      dangerouslyAllowBrowser: true // Note: Only for development
    });
    this.assistantId = null;
    this.threadId = null;
  }

    /**
   * Example streaming function that calls the standard /v1/chat/completions 
   * endpoint with "stream: true". We read chunks as they come in and pass 
   * each token to the provided onToken callback.
   */
    async streamAssistant(query, onToken) {
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`
          },
          body: JSON.stringify({
            model: 'gpt-4',        // or whichever model you prefer
            stream: true,          // IMPORTANT: enables partial response streaming
            messages: [
              // Optionally add a system prompt if desired
              { role: 'system', content: 'Du bist ein AI-Assistent ... (deine Anweisungen)' },
              { role: 'user', content: query }
            ]
          })
        });
    
        const reader = response.body.getReader();
        const decoder = new TextDecoder('utf-8');
        let done = false;
    
        while (!done) {
          const { value, done: doneReading } = await reader.read();
          done = doneReading;
          if (value) {
            const chunk = decoder.decode(value);
            // The stream is sent as server-sent events (SSE),
            // each line generally starts with "data: "
            const lines = chunk.split('\n');
            
            for (const line of lines) {
              if (line.startsWith('data: ')) {
                const json = line.replace(/^data:\s*/, '');
                if (json === '[DONE]') {
                  // Stream finished
                  return;
                }
                try {
                  const parsed = JSON.parse(json);
                  const token = parsed?.choices?.[0]?.delta?.content;
                  if (token) {
                    // Send this partial token back to whatever called streamAssistant()
                    onToken(token);
                  }
                } catch (err) {
                  // Ignore JSON parse errors for incomplete chunks
                }
              }
            }
          }
        }
      }

  async createAssistant() {
    // Skip creating a new assistant since you already have it on the Dashboard
    this.assistantId = "asst_KuUnwCYEPBsYMEm6I2OSuEIT";
    console.log('Using existing assistant from the dashboard');
  }
  

  async createThread() {
    try {
      const thread = await this.client.beta.threads.create();
      this.threadId = thread.id;
      return thread;
    } catch (error) {
      console.error('Error creating thread:', error);
      throw error;
    }
  }

  async addMessage(content) {
    try {
      return await this.client.beta.threads.messages.create(
        this.threadId,
        {
          role: "user",
          content: content
        }
      );
    } catch (error) {
      console.error('Error adding message:', error);
      throw error;
    }
  }

  async runAssistant() {
    try {
      const run = await this.client.beta.threads.runs.create(
        this.threadId,
        { assistant_id: this.assistantId }
      );

      // Wait for completion
      let runStatus = await this.client.beta.threads.runs.retrieve(
        this.threadId,
        run.id
      );

      while (runStatus.status !== 'completed') {
        await new Promise(resolve => setTimeout(resolve, 1000));
        runStatus = await this.client.beta.threads.runs.retrieve(
          this.threadId,
          run.id
        );
      }

      // Get messages
      const messages = await this.client.beta.threads.messages.list(
        this.threadId
      );

      return messages.data[0].content[0].text.value;
    } catch (error) {
      console.error('Error running assistant:', error);
      throw error;
    }
  }
}

export const assistantService = new AssistantService();