// api/openai-proxy.js
export default async function handler(req, res) {
    // Handle CORS
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Origin', 'https://outmaneamazighi.github.io');
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, POST');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
    // Preflight request
    if (req.method === 'OPTIONS') {
      res.status(200).end();
      return;
    }
  
    if (req.method !== 'POST') {
      res.status(405).json({ error: 'Method not allowed' });
      return;
    }
  
    // Verify environment variables
    if (!process.env.VITE_OPENAI_API_KEY || !process.env.VITE_ASSISTANT_ID) {
      console.error('Missing required environment variables');
      res.status(500).json({ error: 'Server configuration error' });
      return;
    }
  
    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.VITE_OPENAI_API_KEY}`
        },
        body: JSON.stringify({
          ...req.body,
          messages: [
            { 
              role: 'system', 
              content: `You are an AI assistant (ID: ${process.env.VITE_ASSISTANT_ID}) for Outmane's portfolio. You are knowledgeable about his projects and experience.` 
            },
            ...(req.body.messages || []).filter(msg => msg.role !== 'system')
          ]
        })
      });
  
      if (!response.ok) {
        const error = await response.json();
        console.error('OpenAI Error:', error);
        res.status(response.status).json(error);
        return;
      }
  
      if (req.body.stream) {
        res.setHeader('Content-Type', 'text/event-stream');
        res.setHeader('Cache-Control', 'no-cache');
        res.setHeader('Connection', 'keep-alive');
        response.body.pipe(res);
      } else {
        const data = await response.json();
        res.status(200).json(data);
      }
    } catch (error) {
      console.error('Proxy Error:', error);
      res.status(500).json({ 
        error: 'Internal Server Error', 
        message: error.message,
        stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
      });
    }
  }