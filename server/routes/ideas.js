import express from 'express';
import OpenAI from 'openai';
import { validateRequest } from '../middleware/validation.js';

const router = express.Router();
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

// POST /api/ideas/generate - Generate viral TikTok video ideas
router.post('/generate', validateRequest(['niche']), async (req, res) => {
  try {
    const { niche, count = 5, targetAudience } = req.body;

    const prompt = `You are a TikTok content strategy expert. Generate ${count || 5} viral TikTok video ideas for the niche: "${niche}".

${targetAudience ? `Target audience: ${targetAudience}` : ''}

For each idea, provide:
1. A catchy, attention-grabbing title
2. The video concept/pitch (what happens in the video)
3. Why this would go viral
4. Best posting times
5. Estimated engagement potential (High/Medium/Low)

Format your response as a JSON array with this structure:
[
  {
    "title": "string",
    "concept": "string",
    "viralFactor": "string",
    "bestTimes": ["string"],
    "engagementPotential": "High|Medium|Low"
  }
]

Make the ideas creative, unique, and optimized for TikTok's algorithm. Return ONLY the JSON array, no other text.`;

    const completion = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.9,
      max_tokens: 2000
    });

    const response = completion.choices[0].message.content;

    // Extract JSON from response
    let ideas;
    try {
      // Try to parse directly first
      ideas = JSON.parse(response);
    } catch {
      // Try to extract JSON from markdown code blocks
      const jsonMatch = response.match(/```(?:json)?\s*([\s\S]*?)```/) || response.match(/(\[[\s\S]*\])/);
      if (jsonMatch) {
        ideas = JSON.parse(jsonMatch[1].trim());
      } else {
        throw new Error('Failed to parse AI response');
      }
    }

    res.json({
      success: true,
      niche,
      ideas
    });
  } catch (error) {
    console.error('Ideas generation error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to generate ideas',
      message: error.message
    });
  }
});

export default router;
