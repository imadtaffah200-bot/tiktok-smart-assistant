import express from 'express';
import OpenAI from 'openai';
import { validateRequest } from '../middleware/validation.js';

const router = express.Router();
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

// POST /api/generator/hooks - Generate catchy hooks
router.post('/hooks', validateRequest(['topic']), async (req, res) => {
  try {
    const { topic, count = 5, style = 'variety' } = req.body;

    const prompt = `You are a TikTok hooks expert specializing in creating viral opening lines. Generate ${count || 5} catchy hooks for a TikTok video about: "${topic}".

Style preference: ${style || 'variety'} (options: shocking, humorous, emotional, educational, relatable, mystery)

For each hook provide:
1. The hook text (first 3-5 seconds of a TikTok video)
2. Hook type category
3. Why it grabs attention
4. A brief description of how to execute it

Format as JSON array:
[
  {
    "hook": "string",
    "type": "string",
    "attentionGrab": "string",
    "execution": "string"
  }
]

Return ONLY the JSON array, no other text.`;

    const completion = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.9,
      max_tokens: 1500
    });

    const response = completion.choices[0].message.content;
    let hooks;
    try {
      hooks = JSON.parse(response);
    } catch {
      const jsonMatch = response.match(/```(?:json)?\s*([\s\S]*?)```/) || response.match(/(\[[\s\S]*\])/);
      if (jsonMatch) {
        hooks = JSON.parse(jsonMatch[1].trim());
      } else {
        throw new Error('Failed to parse AI response');
      }
    }

    res.json({
      success: true,
      topic,
      hooks
    });
  } catch (error) {
    console.error('Hooks generation error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to generate hooks',
      message: error.message
    });
  }
});

// POST /api/generator/description - Generate video descriptions
router.post('/description', validateRequest(['topic']), async (req, res) => {
  try {
    const { topic, length = 'medium', tone = 'casual' } = req.body;

    const lengthGuide = {
      short: '1-2 sentences',
      medium: '2-4 sentences',
      long: '4-6 sentences'
    };

    const prompt = `You are a TikTok content strategist. Generate ${length || 'medium'} length descriptions for a TikTok video about: "${topic}".

Tone: ${tone || 'casual'} (options: casual, professional, humorous, emotional, mysterious)

Include in each description:
- An intriguing hook
- Relevant context about the video
- A call-to-action

Generate 3 different description options.

Format as JSON array:
[
  {
    "description": "string",
    "tone": "string",
    "includesCTA": true
  }
]

Return ONLY the JSON array, no other text.`;

    const completion = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.8,
      max_tokens: 1200
    });

    const response = completion.choices[0].message.content;
    let descriptions;
    try {
      descriptions = JSON.parse(response);
    } catch {
      const jsonMatch = response.match(/```(?:json)?\s*([\s\S]*?)```/) || response.match(/(\[[\s\S]*\])/);
      if (jsonMatch) {
        descriptions = JSON.parse(jsonMatch[1].trim());
      } else {
        throw new Error('Failed to parse AI response');
      }
    }

    res.json({
      success: true,
      topic,
      descriptions
    });
  } catch (error) {
    console.error('Description generation error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to generate descriptions',
      message: error.message
    });
  }
});

// POST /api/generator/hashtags - Generate trending hashtags
router.post('/hashtags', validateRequest(['topic']), async (req, res) => {
  try {
    const { topic, count = 10, niche } = req.body;

    const prompt = `You are a TikTok hashtag strategy expert. Generate ${count || 10} relevant hashtags for a TikTok video about: "${topic}".

${niche ? `Niche: ${niche}` : ''}

Categorize hashtags into:
1. Niche-specific hashtags (specific to your content)
2. Trending hashtags (currently popular on TikTok)
3. Broad hashtags (high volume, general reach)
4. Brand hashtags (for building community)

For each hashtag include:
- The hashtag (with #)
- Category
- Reach estimate (High/Medium/Low)
- Competition level (High/Medium/Low)

Format as JSON object:
{
  "nicheHashtags": [...],
  "trendingHashtags": [...],
  "broadHashtags": [...],
  "brandHashtags": [...]
}

Each hashtag object: {"hashtag": "string", "category": "string", "reach": "High|Medium|Low", "competition": "High|Medium|Low"}

Return ONLY the JSON object, no other text.`;

    const completion = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.7,
      max_tokens: 1500
    });

    const response = completion.choices[0].message.content;
    let hashtags;
    try {
      hashtags = JSON.parse(response);
    } catch {
      const jsonMatch = response.match(/```(?:json)?\s*([\s\S]*?)```/) || response.match(/(\{[\s\S]*})/);
      if (jsonMatch) {
        hashtags = JSON.parse(jsonMatch[1].trim());
      } else {
        throw new Error('Failed to parse AI response');
      }
    }

    res.json({
      success: true,
      topic,
      hashtags
    });
  } catch (error) {
    console.error('Hashtags generation error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to generate hashtags',
      message: error.message
    });
  }
});

export default router;
