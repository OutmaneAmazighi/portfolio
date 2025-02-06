import React, { useEffect, useState } from 'react';
import { firebaseService } from '../config/firebase';

const FirebaseTest = () => {
  const [status, setStatus] = useState('Testing...');
  const [error, setError] = useState(null);

  useEffect(() => {
    const testFirebase = async () => {
      try {
        // Test config retrieval
        const config = await firebaseService.getConfig();
        console.log('Firebase connection successful');
        
        // Check if we got the keys (don't log the actual keys)
        if (config.openAIKey && config.assistantId) {
          setStatus('Success! API keys retrieved successfully');
          // Mask the keys for display
          console.log('OpenAI Key:', config.openAIKey.substring(0, 3) + '...');
          console.log('Assistant ID:', config.assistantId.substring(0, 3) + '...');
        } else {
          setStatus('Connected but keys not found');
        }
      } catch (error) {
        console.error('Firebase test failed:', error);
        setError(error.message);
        setStatus('Failed to connect');
      }
    };

    testFirebase();
  }, []);

  return (
    <div className="p-4 max-w-md mx-auto">
      <div className={`rounded-lg p-4 ${
        error ? 'bg-red-100 text-red-700' : 
        status.includes('Success') ? 'bg-green-100 text-green-700' : 
        'bg-blue-100 text-blue-700'
      }`}>
        <h2 className="text-lg font-semibold mb-2">Firebase Connection Test</h2>
        <p className="mb-2">{status}</p>
        {error && (
          <p className="text-sm text-red-600">Error: {error}</p>
        )}
      </div>
    </div>
  );
};

export default FirebaseTest;