import { makeWASocket, DisconnectReason, useMultiFileAuthState } from 'baileys';
import { GoogleGenerativeAI } from '@google/generative-ai';
import qrcode from 'qrcode-terminal';
import pino from 'pino';

// Configuration
const GEMINI_API_KEY = 'AIzaSyDzDM3mYqRq3XkivtylzxtvxT4vYYOD0CE';
const BOT_NAME = 'Gemini Bot';

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

// Logger configuration
const logger = pino({ level: 'silent' });

// Bot responses and commands
const WELCOME_MESSAGE = `🤖 *${BOT_NAME}* is now active!\n\nI'm powered by Gemini 2.5 Flash AI. Send me any message and I'll respond intelligently!\n\n*Commands:*\n• Just type anything to chat with me\n• I can help with questions, creative writing, analysis, and more!`;

const HELP_MESSAGE = `🤖 *${BOT_NAME} Help*\n\n*How to use:*\n• Send me any text message\n• I'll respond using Gemini 2.5 Flash AI\n• I can help with various tasks like:\n  - Answering questions\n  - Creative writing\n  - Analysis and explanations\n  - General conversation\n\n*Tips:*\n• Be specific in your questions for better responses\n• I work best with text messages\n• Type anything to start chatting!`;

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

// Main bot function
async function startBot() {
    try {
        // Use multi-file auth state for persistent sessions
        const { state, saveCreds } = await useMultiFileAuthState('auth_info');
        
        // Create WhatsApp socket
        const sock = makeWASocket({
            auth: state,
            printQRInTerminal: false,
            logger,
            browser: ['Gemini Bot', 'Chrome', '1.0.0']
        });

        // Handle QR code for authentication
        sock.ev.on('connection.update', (update) => {
            const { connection, lastDisconnect, qr } = update;
            
            if (qr) {
                console.log('\n🔗 Scan this QR code with your WhatsApp to connect:');
                qrcode.generate(qr, { small: true });
                console.log('\nOpen WhatsApp > Linked Devices > Link a Device > Scan the QR code above');
            }
            
            if (connection === 'close') {
                const shouldReconnect = (lastDisconnect?.error)?.output?.statusCode !== DisconnectReason.loggedOut;
                console.log('Connection closed due to:', lastDisconnect?.error, ', reconnecting:', shouldReconnect);
                
                if (shouldReconnect) {
                    startBot();
                }
            } else if (connection === 'open') {
                console.log('✅ WhatsApp Bot connected successfully!');
                console.log(`🤖 ${BOT_NAME} is now ready to receive messages.`);
            }
        });

        // Save credentials when updated
        sock.ev.on('creds.update', saveCreds);

        // Handle incoming messages
        sock.ev.on('messages.upsert', async (m) => {
            const message = m.messages[0];
            
            // Skip if no message or if it's from status broadcast
            if (!message || message.key.remoteJid === 'status@broadcast') return;
            
            // Skip if message is from bot itself
            if (message.key.fromMe) return;
            
            const messageText = message.message?.conversation || 
                              message.message?.extendedTextMessage?.text || '';
            
            // Skip empty messages
            if (!messageText.trim()) return;
            
            const senderJid = message.key.remoteJid;
            const senderName = message.pushName || 'User';
            const isGroup = senderJid.endsWith('@g.us');
            
            console.log(`📨 Message from ${senderName} (${senderJid}): ${messageText}`);
            
            try {
                // Send typing indicator
                await sock.sendPresenceUpdate('composing', senderJid);
                
                let responseText = '';
                
                // Handle special commands
                if (messageText.toLowerCase() === '/start' || messageText.toLowerCase() === '/help') {
                    responseText = messageText.toLowerCase() === '/start' ? WELCOME_MESSAGE : HELP_MESSAGE;
                } else {
                    // Generate AI response
                    responseText = await generateAIResponse(messageText, senderName);
                }
                
                // Send response
                await sock.sendMessage(senderJid, { text: responseText });
                
                // Update presence to available
                await sock.sendPresenceUpdate('available', senderJid);
                
                console.log(`✅ Response sent to ${senderName}`);
                
            } catch (error) {
                console.error('Error handling message:', error);
                
                try {
                    await sock.sendMessage(senderJid, { 
                        text: "Sorry, I encountered an error processing your message. Please try again! 🤖" 
                    });
                } catch (sendError) {
                    console.error('Error sending error message:', sendError);
                }
            }
        });

    } catch (error) {
        console.error('Error starting bot:', error);
        console.log('Retrying in 5 seconds...');
        setTimeout(startBot, 5000);
    }
}

// Handle process termination
process.on('SIGINT', () => {
    console.log('\n👋 Bot shutting down gracefully...');
    process.exit(0);
});

process.on('SIGTERM', () => {
    console.log('\n👋 Bot shutting down gracefully...');
    process.exit(0);
});

// Start the bot
console.log(`🚀 Starting ${BOT_NAME}...`);
console.log('📱 Make sure to scan the QR code with your WhatsApp');
startBot().catch(console.error);

