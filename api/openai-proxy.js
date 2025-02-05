// api/openai-proxy.js

// This function handles incoming POST requests,
// adds your secret API key, and forwards the request to OpenAI.
export default async function handler(req, res) {
    // Only allow POST requests for safety
    if (req.method !== 'POST') {
      res.status(405).json({ error: 'Method not allowed' });
      return;
    }
  
    try {
      // Send the request to OpenAI. Adjust the URL if you need a different endpoint.
      const openaiResponse = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // The API key is read from an environment variable on Vercel.
          'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
        },
        // Forward the incoming request body to OpenAI.
        body: JSON.stringify(req.body)
      });
  
      const data = await openaiResponse.json();
      res.status(openaiResponse.status).json(data);
    } catch (error) {
      console.error('Error in proxy:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
  