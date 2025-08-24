# WhatsApp Gemini Bot

A powerful WhatsApp chatbot powered by Google's Gemini 2.5 Flash API using the Baileys library. This bot can engage in intelligent conversations, answer questions, help with creative writing, and provide assistance across various topics.

## 🚀 Features

- **AI-Powered Conversations**: Uses Gemini 2.5 Flash for intelligent responses
- **WhatsApp Integration**: Built with Baileys for reliable WhatsApp Web API connection
- **QR Code Authentication**: Easy setup with QR code scanning
- **Persistent Sessions**: Maintains authentication state across restarts
- **Group & Private Chat Support**: Works in both individual and group conversations
- **Vercel Deployment Ready**: Configured for easy deployment to Vercel
- **Webhook Support**: Includes serverless webhook endpoint for integrations

## 📋 Prerequisites

- Node.js 18.0.0 or higher
- WhatsApp account
- Google Gemini API key
- Vercel account (for deployment)

## 🛠️ Installation

1. **Clone or download this project**
   ```bash
   git clone <repository-url>
   cd whatsapp-gemini-bot
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   ```bash
   cp .env.example .env
   ```
   Edit `.env` and add your Gemini API key:
   ```
   GEMINI_API_KEY=your_gemini_api_key_here
   BOT_NAME=Your Bot Name
   ```

## 🚀 Running the Bot

### Local Development

1. **Start the bot**
   ```bash
   npm start
   ```

2. **Scan QR Code**
   - A QR code will appear in your terminal
   - Open WhatsApp on your phone
   - Go to **Settings > Linked Devices > Link a Device**
   - Scan the QR code displayed in the terminal

3. **Start Chatting**
   - Send a message to your WhatsApp number
   - The bot will respond using Gemini AI

### Commands

- **Any message**: Get an AI-powered response
- **/start**: Show welcome message
- **/help**: Show help information

## 🌐 Vercel Deployment

### Option 1: Using the Deploy Script

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Run deployment script**
   ```bash
   ./deploy.sh
   ```

3. **Follow the prompts** to set up environment variables and deploy

### Option 2: Manual Deployment

1. **Install Vercel CLI and login**
   ```bash
   npm install -g vercel
   vercel login
   ```

2. **Set environment variables**
   ```bash
   vercel env add GEMINI_API_KEY
   vercel env add BOT_NAME
   ```

3. **Deploy to production**
   ```bash
   vercel --prod
   ```

### Webhook Endpoint

After deployment, your webhook will be available at:
```
https://your-domain.vercel.app/webhook
```

**Webhook Usage:**
```bash
curl -X POST https://your-domain.vercel.app/webhook \
  -H "Content-Type: application/json" \
  -d '{
    "message": "Hello bot!",
    "sender": "John Doe",
    "phone": "+1234567890"
  }'
```

## 📁 Project Structure

```
whatsapp-gemini-bot/
├── index.js              # Main bot application
├── api/
│   └── webhook.js         # Vercel serverless webhook function
├── package.json           # Node.js dependencies and scripts
├── vercel.json           # Vercel deployment configuration
├── deploy.sh             # Automated deployment script
├── .env.example          # Environment variables template
├── .gitignore            # Git ignore rules
└── README.md             # This documentation
```

## 🔧 Configuration

### Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `GEMINI_API_KEY` | Your Google Gemini API key | Yes |
| `BOT_NAME` | Name of your bot | No (default: "Gemini Bot") |
| `LOG_LEVEL` | Logging level | No (default: "info") |

### Gemini API Key Setup

1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Create a new API key
3. Copy the API key and add it to your environment variables

## 🤖 Bot Capabilities

The bot can help with:

- **General Questions**: Ask anything and get intelligent responses
- **Creative Writing**: Story writing, poetry, content creation
- **Analysis**: Text analysis, explanations, summaries
- **Conversations**: Natural, engaging conversations
- **Problem Solving**: Help with various problems and challenges

## 🔍 Troubleshooting

### Common Issues

1. **QR Code not appearing**
   - Make sure you're running Node.js 18+
   - Check that all dependencies are installed
   - Restart the application

2. **Authentication failed**
   - Delete the `auth_info` folder and restart
   - Make sure WhatsApp Web is not open in other browsers
   - Try scanning the QR code again

3. **Gemini API errors**
   - Verify your API key is correct
   - Check your API quota and billing
   - Ensure you have access to Gemini 2.5 Flash model

4. **Vercel deployment issues**
   - Make sure all environment variables are set
   - Check the Vercel function logs
   - Verify your Node.js version compatibility

### Logs and Debugging

- Check console output for error messages
- Enable debug logging by setting `LOG_LEVEL=debug`
- Monitor Vercel function logs in the Vercel dashboard

## 📝 API Reference

### Webhook Endpoint

**POST** `/webhook`

Request body:
```json
{
  "message": "User message text",
  "sender": "Sender name",
  "phone": "Phone number (optional)"
}
```

Response:
```json
{
  "success": true,
  "response": "AI generated response",
  "sender": "Sender name",
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

**GET** `/api/webhook`

Health check endpoint that returns bot status.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the ISC License - see the LICENSE file for details.

## ⚠️ Important Notes

- **WhatsApp Terms**: Make sure to comply with WhatsApp's Terms of Service
- **API Limits**: Be aware of Gemini API rate limits and quotas
- **Security**: Keep your API keys secure and never commit them to version control
- **Persistent Connection**: The bot requires a persistent connection for real-time messaging
- **Vercel Limitations**: Serverless functions have execution time limits

## 🆘 Support

If you encounter any issues or need help:

1. Check the troubleshooting section above
2. Review the console logs for error messages
3. Ensure all prerequisites are met
4. Verify your API keys and environment variables

## 🔄 Updates

To update the bot:

1. Pull the latest changes
2. Run `npm install` to update dependencies
3. Restart the bot
4. Redeploy to Vercel if needed

---

**Happy Chatting! 🤖💬**

