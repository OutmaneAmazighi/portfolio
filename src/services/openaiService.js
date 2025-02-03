class OpenAIService {
    constructor() {
      this.apiKey = import.meta.env.VITE_OPENAI_API_KEY;
      this.baseUrl = 'https://api.openai.com/v1';
      this.retryConfig = {
        retries: 3,
        retryDelay: 1000
      };
    }
  
    async fetchWithRetry(url, options) {
      let attempt = 0;
      
      while (attempt <= this.retryConfig.retries) {
        try {
          const response = await fetch(url, options);
          
          if (response.status === 429) {
            const delay = Math.pow(2, attempt) * 1000;
            await new Promise(resolve => setTimeout(resolve, delay));
            attempt++;
            continue;
          }
  
          if (!response.ok) throw new Error(`API Error: ${response.statusText}`);
          return response.json();
        } catch (error) {
          if (attempt === this.retryConfig.retries) throw error;
          attempt++;
          await new Promise(resolve => 
            setTimeout(resolve, this.retryConfig.retryDelay)
          );
        }
      }
    }
  
    async createEmbedding(text) {
      const response = await this.fetchWithRetry(`${this.baseUrl}/embeddings`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'text-embedding-3-small',
          input: text,
        })
      });
  
      return response.data[0].embedding;
    }
  
    async createChatCompletion(query, context) {
      const systemMessage = `Sie sind ein spezialisierter Assistent für Outmane Hassanis Portfolio.
      Richtlinien:
      1. Antworten Sie ausschließlich auf Deutsch
      2. Halten Sie Antworten kurz (1-3 Sätze)
      3. Beziehen Sie sich nur auf diesen Kontext:
      ${context}
      4. Bei Unsicherheit: "Dazu liegen mir keine Informationen vor" antworten
      5. Keine eigenen Vermutungen anstellen`;
  
      const response = await this.fetchWithRetry(`${this.baseUrl}/chat/completions`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'gpt-4-turbo-preview',
          messages: [
            { role: 'system', content: systemMessage },
            { role: 'user', content: query }
          ],
          temperature: 0.2,
          max_tokens: 150,
          top_p: 0.9
        })
      });
  
      return response.choices[0].message.content;
    }
  }
  
  export const openaiService = new OpenAIService();