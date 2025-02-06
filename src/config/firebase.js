// src/config/firebase.js
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, get } from 'firebase/database';
import { getAuth, signInAnonymously } from 'firebase/auth';
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyDmbK41je33hxuK_lg1HpSvMYthaqshthk",
  authDomain: "ai-chat-bot-1f86b.firebaseapp.com",
  databaseURL: "https://ai-chat-bot-1f86b-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "ai-chat-bot-1f86b",
  storageBucket: "ai-chat-bot-1f86b.firebasestorage.app",
  messagingSenderId: "684106401562",
  appId: "1:684106401562:web:141fbd9c4381ccffadcea3",
  measurementId: "G-TMBW071PEE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth(app);
const analytics = getAnalytics(app);

class FirebaseService {
  constructor() {
    this.database = database;
    this.auth = auth;
    this.configCache = null;
    this.cacheExpiry = null;
    this.CACHE_DURATION = 1000 * 60 * 60; // 1 hour
  }

  async ensureAuth() {
    if (!this.auth.currentUser) {
      await signInAnonymously(this.auth);
    }
  }

  async getConfig() {
    // Check cache first
    if (this.configCache && this.cacheExpiry && Date.now() < this.cacheExpiry) {
      return this.configCache;
    }

    try {
      await this.ensureAuth();
      const configRef = ref(this.database, 'config/api-keys');
      const snapshot = await get(configRef);
      
      if (snapshot.exists()) {
        const config = snapshot.val();
        
        // Update cache
        this.configCache = config;
        this.cacheExpiry = Date.now() + this.CACHE_DURATION;
        
        return config;
      } else {
        throw new Error('No configuration found in Firebase');
      }
    } catch (error) {
      console.error('Error fetching config from Firebase:', error);
      throw error;
    }
  }

  async getOpenAIKey() {
    const config = await this.getConfig();
    return config.openAIKey;
  }

  async getAssistantId() {
    const config = await this.getConfig();
    return config.assistantId;
  }
}

export const firebaseService = new FirebaseService();