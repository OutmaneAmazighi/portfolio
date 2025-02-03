import { portfolioData, prepareDataForEmbedding } from '../lib/vectorStore';
import { openaiService } from './openaiService';

class VectorStoreService {
  constructor() {
    this.vectors = [];
    this.initialized = false;
    this.cacheKey = 'cachedVectors';
    this.minSimilarity = 0.78; // Minimum similarity threshold
  }

  async initialize() {
    if (this.initialized) return;

    try {
      // Try to load cached vectors
      const cached = localStorage.getItem(this.cacheKey);
      
      if (cached) {
        const parsed = JSON.parse(cached);
        if (parsed.length === portfolioData.length) {
          this.vectors = parsed;
          this.initialized = true;
          return;
        }
      }

      // Generate new embeddings if cache is invalid
      this.vectors = await Promise.all(
        prepareDataForEmbedding().map(async (point) => ({
          id: point.id,
          vector: await openaiService.createEmbedding(point.text),
          metadata: point.metadata
        }))
      );

      // Cache with expiration (1 week)
      localStorage.setItem(this.cacheKey, JSON.stringify(this.vectors));
      localStorage.setItem(`${this.cacheKey}_timestamp`, Date.now());

      this.initialized = true;
    } catch (error) {
      console.error('Initialization failed:', error);
      throw new Error('Failed to initialize vector service');
    }
  }

  async semanticSearch(query, topK = 3) {
    await this.initialize();
    
    try {
      const queryVector = await openaiService.createEmbedding(query);
      
      const results = this.vectors.map(item => ({
        ...item,
        similarity: this.cosineSimilarity(queryVector, item.vector)
      }))
      .filter(item => item.similarity > this.minSimilarity)
      .sort((a, b) => b.similarity - a.similarity)
      .slice(0, topK);

      return results.length > 0 ? results : null;
    } catch (error) {
      console.error('Semantic search failed:', error);
      return null;
    }
  }

  cosineSimilarity(vecA, vecB) {
    if (!vecA || !vecB || vecA.length !== vecB.length) return 0;
    
    const dotProduct = vecA.reduce((sum, a, i) => sum + a * (vecB[i] || 0), 0);
    const magnitudeA = Math.sqrt(vecA.reduce((sum, a) => sum + a * a, 0));
    const magnitudeB = Math.sqrt(vecB.reduce((sum, b) => sum + (b || 0) * (b || 0), 0));
    
    return magnitudeA * magnitudeB > 0 
      ? dotProduct / (magnitudeA * magnitudeB)
      : 0;
  }

  async generateResponse(query) {
    try {
      const contextItems = await this.semanticSearch(query) || [];
      
      if (!contextItems.length) {
        return {
          response: "Entschuldigung, dazu habe ich keine Informationen. Outmane entwickelt hauptsächlich mobile WebView-Spiele mit Fokus auf Android-Entwicklung. Können Sie die Frage anders formulieren?",
          context: []
        };
      }

      const contextString = contextItems
        .map((item, index) => `[Quelle ${index + 1}]\n${item.metadata.category}: ${item.metadata.title}\n${item.text}`)
        .join('\n\n');

      const response = await openaiService.createChatCompletion(
        query,
        contextString
      );

      return {
        response: response.replace(/\[Quelle \d+\]/g, '').trim(), // Clean source markers
        context: contextItems
      };
    } catch (error) {
      console.error('Response generation failed:', error);
      return {
        response: "Es ist ein technischer Fehler aufgetreten. Bitte versuchen Sie es später erneut.",
        context: []
      };
    }
  }
}

export const vectorService = new VectorStoreService();