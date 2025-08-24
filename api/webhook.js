import { GoogleGenerativeAI } from '@google/generative-ai';

// Configuration
const GEMINI_API_KEY = process.env.GEMINI_API_KEY || 'AIzaSyDzDM3mYqRq3XkivtylzxtvxT4vYYOD0CE';
const BOT_NAME = process.env.BOT_NAME || 'Gemini Bot';

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

// Generate AI response using Gemini
async function generateAIResponse(userMessage, senderName = 'User') {
    try {
        const prompt = `You are a helpful WhatsApp chatbot assistant. The user ${senderName} sent you this message: "${userMessage}"\n\nPlease provide a helpful, friendly, and concise response. Keep it conversational and appropriate for WhatsApp messaging.`;
        
        const result = await model.generateContent(prompt);
        const response = await result.response;
        return response.text();
    } catch (error) {
        console.error('Error generating AI response:', error);
        return "Sorry, I'm having trouble processing your message right now. Please try again in a moment! 🤖";
    }
}

// Main webhook handler
export default async function handler(req, res) {
    // Set CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    // Handle preflight requests
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    // Only accept POST requests
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const { message, sender, phone } = req.body;

        // Validate required fields
        if (!message || !sender) {
            return res.status(400).json({ error: 'Missing required fields: message, sender' });
        }

        console.log(`📨 Webhook message from ${sender}: ${message}`);

        // Generate AI response
        const aiResponse = await generateAIResponse(message, sender);

        console.log(`✅ Generated response for ${sender}`);

        // Return the response
        return res.status(200).json({
            success: true,
            response: aiResponse,
            sender: sender,
            timestamp: new Date().toISOString()
        });

    } catch (error) {
        console.error('Webhook error:', error);
        return res.status(500).json({
            error: 'Internal server error',
            message: error.message
        });
    }
}

// Health check endpoint
export async function GET(req, res) {
    return res.status(200).json({
        status: 'healthy',
        bot: BOT_NAME,
        timestamp: new Date().toISOString(),
        message: 'WhatsApp Gemini Bot webhook is running'
    });
}

