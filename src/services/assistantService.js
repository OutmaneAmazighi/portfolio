// src/services/assistantService.js
import OpenAI from 'openai';
import { configService } from './configService';

class AssistantService {
  constructor() {
    this.proxyUrl = 'https://portfolio-outmanes-projects-901794ba.vercel.app/api/openai-proxy';
    this.assistantId = null;
    this.threadId = null;
  }

  async initializeClient() {
    if (!this.client) {
      const config = await configService.getConfig();
      this.client = new OpenAI({
        apiKey: config.apiKey,
        dangerouslyAllowBrowser: true
      });
    }
    return this.client;
  }

  async streamAssistant(query, onToken) {
    const response = await fetch(this.proxyUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'gpt-4',
        stream: true,
        messages: [
          { role: 'system', content: 'Du bist ein AI-Assistent für das Portfolio von Outmane.' },
          { role: 'user', content: query }
        ]
      })
    });

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
  }

  async createAssistant() {
    const config = await configService.getConfig();
    this.assistantId = config.assistantId;
    console.log('Using existing assistant from the dashboard');
  }

  async createThread() {
    try {
      const client = await this.initializeClient();
      const thread = await client.beta.threads.create();
      this.threadId = thread.id;
      return thread;
    } catch (error) {
      console.error('Error creating thread:', error);
      throw error;
    }
  }

  async addMessage(content) {
    try {
      const client = await this.initializeClient();
      return await client.beta.threads.messages.create(
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
      const client = await this.initializeClient();
      const run = await client.beta.threads.runs.create(
        this.threadId,
        { assistant_id: this.assistantId }
      );

      let runStatus = await client.beta.threads.runs.retrieve(
        this.threadId,
        run.id
      );

      while (runStatus.status !== 'completed') {
        await new Promise(resolve => setTimeout(resolve, 1000));
        runStatus = await client.beta.threads.runs.retrieve(
          this.threadId,
          run.id
        );
      }

      const messages = await client.beta.threads.messages.list(
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