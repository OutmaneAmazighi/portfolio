// api/test.js

export default function handler(req, res) {
    res.status(200).json({ 
      message: 'API is working',
      env: process.env.OPENAI_API_KEY ? 'API key is set' : 'API key is missing'
    });
  }