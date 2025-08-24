{
  "version": 2,
  "builds": [
    {
      "src": "index.js",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/webhook",
      "dest": "/api/webhook.js"
    },
    {
      "src": "/(.*)",
      "dest": "/index.js"
    }
  ],
  "env": {
    "GEMINI_API_KEY": "@gemini_api_key",
    "BOT_NAME": "Gemini Bot"
  },
  "functions": {
    "index.js": {
      "maxDuration": 300
    },
    "api/webhook.js": {
      "maxDuration": 30
    }
  }
}

