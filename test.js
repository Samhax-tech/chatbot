import { GoogleGenerativeAI } from '@google/generative-ai';

// Configuration
const GEMINI_API_KEY = 'AIzaSyDzDM3mYqRq3XkivtylzxtvxT4vYYOD0CE';

console.log('🧪 Testing Gemini API integration...\n');

async function testGeminiAPI() {
    try {
        // Initialize Gemini AI
        const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

        console.log('✅ Gemini AI initialized successfully');
        
        // Test message
        const testMessage = "Hello! Can you tell me a short joke?";
        console.log(`📤 Sending test message: "${testMessage}"`);
        
        // Generate response
        const result = await model.generateContent(testMessage);
        const response = await result.response;
        const text = response.text();
        
        console.log('📥 Received response:');
        console.log('─'.repeat(50));
        console.log(text);
        console.log('─'.repeat(50));
        
        console.log('\n✅ Gemini API test completed successfully!');
        console.log('🚀 Your bot is ready to deploy and use.');
        
    } catch (error) {
        console.error('❌ Gemini API test failed:');
        console.error('Error:', error.message);
        
        if (error.message.includes('API_KEY_INVALID')) {
            console.log('\n💡 Solution: Please check your Gemini API key');
        } else if (error.message.includes('quota')) {
            console.log('\n💡 Solution: Check your API quota and billing settings');
        } else {
            console.log('\n💡 Solution: Verify your internet connection and API key');
        }
        
        process.exit(1);
    }
}

// Run the test
testGeminiAPI();

