// api/openai-proxy.js

export default async function handler(req, res) {
    // Allow only POST requests
    if (req.method !== 'POST') {
      res.status(405).json({ error: 'Method not allowed' });
      return;
    }
  
    // Log environment status (remove in production)
    if (!process.env.OPENAI_API_KEY) {
      console.error("OPENAI_API_KEY is not set!");
    } else {
      console.log("OPENAI_API_KEY is set.");
    }
  
    try {
      // Forward request to OpenAI
      const openaiResponse = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
        },
        body: JSON.stringify(req.body)
      });
      const data = await openaiResponse.json();
      res.status(openaiResponse.status).json(data);
    } catch (error) {
      console.error('Error in proxy:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }