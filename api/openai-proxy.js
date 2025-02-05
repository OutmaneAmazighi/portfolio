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
  
    // Debug logging
    console.log('Environment variables check:');
    console.log('API Key exists:', !!process.env.VITE_OPENAI_API_KEY);
    console.log('Assistant ID exists:', !!process.env.VITE_ASSISTANT_ID);
  
    // Check environment variables
    if (!process.env.VITE_OPENAI_API_KEY) {
      console.error('Missing OpenAI API Key');
      res.status(500).json({ error: 'Server configuration error - Missing API Key' });
      return;
    }
  
    try {
      console.log('Request body:', JSON.stringify(req.body, null, 2));
      
      const openaiResponse = await fetch('https://api.openai.com/v1/chat/completions', {
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
              content: 'You are an AI assistant for Outmane\'s portfolio. You are knowledgeable about his projects and experience.'
            },
            ...(req.body.messages || []).filter(msg => msg.role !== 'system')
          ]
        })
      });
    
      // Use the correct variable name here
      if (!openaiResponse.ok) {
        const errorData = await openaiResponse.json();
        console.error('OpenAI API Error:', errorData);
        res.status(openaiResponse.status).json(errorData);
        return;
      }
    
      if (req.body.stream) {
        res.setHeader('Content-Type', 'text/event-stream');
        res.setHeader('Cache-Control', 'no-cache');
        res.setHeader('Connection', 'keep-alive');
        openaiResponse.body.pipe(res); // corrected variable name
      } else {
        const data = await openaiResponse.json(); // corrected variable name
        res.status(200).json(data);
      }
    } catch (error) {
      console.error('Detailed error:', {
        message: error.message,
        stack: error.stack,
        body: req.body
      });
      
      res.status(500).json({ 
        error: 'Internal Server Error', 
        message: error.message,
        details: process.env.NODE_ENV === 'development' ? error.stack : undefined
      });
    }
  }
  