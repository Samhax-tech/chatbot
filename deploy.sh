#!/bin/bash

echo "🚀 Deploying WhatsApp Gemini Bot to Vercel..."

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo "❌ Vercel CLI not found. Installing..."
    npm install -g vercel
fi

# Set environment variables in Vercel
echo "🔧 Setting up environment variables..."
vercel env add GEMINI_API_KEY
vercel env add BOT_NAME

# Deploy to Vercel
echo "📦 Deploying to Vercel..."
vercel --prod

echo "✅ Deployment complete!"
echo ""
echo "📋 Next steps:"
echo "1. Note down your Vercel deployment URL"
echo "2. Configure your WhatsApp webhook to point to: https://your-domain.vercel.app/webhook"
echo "3. Test the webhook endpoint"
echo ""
echo "🔗 Webhook endpoint: https://your-domain.vercel.app/webhook"
echo "📊 Health check: https://your-domain.vercel.app/api/webhook"

