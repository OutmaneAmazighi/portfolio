// src/services/assistantService.js
import { firebaseService } from '../config/firebase';

class AssistantService {
  constructor() {
    this.baseUrl = 'https://api.openai.com/v1';
    this.threadId = null;
  }

  /**
   * Sends the query to the API, waits for the run to complete,
   * then returns the final assistant answer.
   */
  async getAssistantResponse(query) {
    try {
      const config = await firebaseService.getConfig();

      // Create thread if it doesn't exist
      if (!this.threadId) {
        const threadResponse = await fetch(`${this.baseUrl}/threads`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${config.openAIKey}`,
            'OpenAI-Beta': 'assistants=v2'
          }
        });
        if (!threadResponse.ok) {
          throw new Error(`Thread creation failed: ${await threadResponse.text()}`);
        }
        const threadData = await threadResponse.json();
        this.threadId = threadData.id;
      }

      // Add the user's message to the thread
      const messageResponse = await fetch(`${this.baseUrl}/threads/${this.threadId}/messages`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${config.openAIKey}`,
          'OpenAI-Beta': 'assistants=v2'
        },
        body: JSON.stringify({
          role: 'user',
          content: query
        })
      });
      if (!messageResponse.ok) {
        throw new Error(`Message creation failed: ${await messageResponse.text()}`);
      }

      // Start a new run for the assistant
      const runResponse = await fetch(`${this.baseUrl}/threads/${this.threadId}/runs`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${config.openAIKey}`,
          'OpenAI-Beta': 'assistants=v2'
        },
        body: JSON.stringify({
          assistant_id: config.assistantId
        })
      });
      if (!runResponse.ok) {
        throw new Error(`Run creation failed: ${await runResponse.text()}`);
      }
      const runData = await runResponse.json();

      // Poll until the run status is "completed".
      // We use a minimal yield (setTimeout with 0ms) to avoid busy-waiting.
      let finalAnswer = '';
      while (true) {
        const statusResponse = await fetch(
          `${this.baseUrl}/threads/${this.threadId}/runs/${runData.id}`,
          {
            headers: {
              'Authorization': `Bearer ${config.openAIKey}`,
              'OpenAI-Beta': 'assistants=v2'
            }
          }
        );
        if (!statusResponse.ok) {
          throw new Error(`Status check failed: ${await statusResponse.text()}`);
        }
        const statusData = await statusResponse.json();
        if (statusData.status === 'completed') {
          const messagesResponse = await fetch(
            `${this.baseUrl}/threads/${this.threadId}/messages`,
            {
              headers: {
                'Authorization': `Bearer ${config.openAIKey}`,
                'OpenAI-Beta': 'assistants=v2'
              }
            }
          );
          if (!messagesResponse.ok) {
            throw new Error(`Messages retrieval failed: ${await messagesResponse.text()}`);
          }
          const messages = await messagesResponse.json();
          // Find the assistant's message in the thread
          const assistantMessage = messages.data.find(msg => msg.role === 'assistant');
          if (assistantMessage?.content?.[0]?.text?.value) {
            finalAnswer = assistantMessage.content[0].text.value;
          }
          break;
        } else if (statusData.status === 'failed') {
          throw new Error(`Run failed: ${statusData.last_error || 'Unknown error'}`);
        } else {
          // Yield control without adding any artificial delay
          await new Promise(resolve => setTimeout(resolve, 0));
        }
      }
      return finalAnswer;
    } catch (error) {
      console.error('Error in getAssistantResponse:', error);
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
    this.threadId = null;
    return { id: "thread_" + Date.now() };
  }

  async addMessage(content) {
    return this.getAssistantResponse(content);
  }
}

export const assistantService = new AssistantService();
