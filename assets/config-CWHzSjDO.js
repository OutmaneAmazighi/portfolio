let n=null;class e{async getConfig(){return n||(typeof window<"u"&&window.ENV_CONFIG?(n={apiKey:window.ENV_CONFIG.VITE_OPENAI_API_KEY,assistantId:window.ENV_CONFIG.VITE_ASSISTANT_ID},n):{apiKey:"",assistantId:""})}async getAuthHeaders(){return{Authorization:`Bearer ${(await this.getConfig()).apiKey}`,"Content-Type":"application/json"}}}const o=new e;export{o as c};
