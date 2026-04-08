import express from 'express';
import OpenAI from 'openai';

const router = express.Router();
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

// Store conversation history per session
const conversations = new Map();

// POST /api/chat/message - AI-powered chat assistance
router.post('/message', async (req, res) => {
  try {
    const { message, sessionId = 'default' } = req.body;

    if (!message || message.trim().length === 0) {
      return res.status(400).json({
        success: false,
        error: 'Message is required'
      });
    }

    // Get or create conversation history
    let conversationHistory = conversations.get(sessionId) || [];

    // System prompt for TikTok expert
    const systemPrompt = `You are TikTok Growth Assistant, an AI expert specializing in TikTok content creation, growth strategies, and analytics.

Your expertise includes:
- TikTok algorithm optimization
- Content strategy and ideation
- Viral hooks and thumbnails
- Hashtag research and trends
- Engagement optimization
- Community building
- Monetization strategies
- Cross-platform promotion
- Analytics interpretation

Provide helpful, actionable advice. Be specific with examples when possible. Keep responses concise but informative.`;

    // Build messages array
    const messages = [
      { role: 'system', content: systemPrompt },
      ...conversationHistory,
      { role: 'user', content: message }
    ];

    const completion = await openai.chat.completions.create({
      model: 'gpt-4',
      messages,
      temperature: 0.8,
      max_tokens: 1000
    });

    const aiResponse = completion.choices[0].message.content;

    // Update conversation history
    conversationHistory.push(
      { role: 'user', content: message },
      { role: 'assistant', content: aiResponse }
    );

    // Keep only last 10 messages to manage token usage
    if (conversationHistory.length > 20) {
      conversationHistory = conversationHistory.slice(-20);
    }

    conversations.set(sessionId, conversationHistory);

    res.json({
      success: true,
      response: aiResponse,
      sessionId
    });
  } catch (error) {
    console.error('Chat error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to process message',
      message: error.message
    });
  }
});

// DELETE /api/chat/clear - Clear conversation history
router.delete('/clear', (req, res) => {
  const { sessionId = 'default' } = req.body;

  if (conversations.has(sessionId)) {
    conversations.delete(sessionId);
  }

  res.json({
    success: true,
    message: 'Conversation cleared'
  });
});

// GET /api/chat/history - Get conversation history
router.get('/history/:sessionId', (req, res) => {
  const { sessionId } = req.params;
  const history = conversations.get(sessionId) || [];

  res.json({
    success: true,
    history
  });
});

export default router;
