import express from 'express';
import OpenAI from 'openai';
import { validateChannelAnalysis } from '../middleware/validation.js';

const router = express.Router();
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

// POST /api/analyzer/analyze - Analyze TikTok channel
router.post('/analyze', validateChannelAnalysis, async (req, res) => {
  try {
    const { channelUrl, channelName, description, recentVideos, followerCount, totalLikes, avgViews } = req.body;

    // Build analysis prompt based on provided data
    let dataContext = '';

    if (channelName) dataContext += `Channel Name: ${channelName}\n`;
    if (description) dataContext += `Channel Description: ${description}\n`;
    if (followerCount) dataContext += `Follower Count: ${followerCount}\n`;
    if (totalLikes) dataContext += `Total Likes: ${totalLikes}\n`;
    if (avgViews) dataContext += `Average Views: ${avgViews}\n`;
    if (recentVideos && recentVideos.length > 0) {
      dataContext += '\nRecent Videos:\n';
      recentVideos.forEach((video, index) => {
        dataContext += `${index + 1}. Title: ${video.title || 'Untitled'}\n`;
        if (video.views) dataContext += `   Views: ${video.views}\n`;
        if (video.likes) dataContext += `   Likes: ${video.likes}\n`;
        if (video.description) dataContext += `   Description: ${video.description}\n`;
      });
    }

    const prompt = `You are a TikTok analytics expert. Analyze the following TikTok channel and provide comprehensive insights.

${dataContext || 'No specific channel data provided - provide general growth recommendations.'}

Provide a detailed analysis including:

1. **Channel Overview**: Summary of the channel's current state and positioning

2. **Performance Metrics Analysis**:
   - Engagement rate assessment (calculate if data available)
   - Content quality score
   - Audience growth potential

3. **Top Performing Content Themes**: What types of content are working well

4. **Growth Opportunities**: Areas where the channel can improve

5. **Content Recommendations**: Specific video ideas and content strategy suggestions

6. **Optimal Posting Strategy**: Best times and frequency recommendations

7. **Hashtag Strategy**: Recommended hashtag categories and specific tags

8. **Competitor Analysis Insights**: What similar successful channels are doing

Format your response as a JSON object:
{
  "channelOverview": {
    "strengths": ["string"],
    "weaknesses": ["string"],
    "opportunities": ["string"]
  },
  "performanceMetrics": {
    "engagementRate": "string (High/Medium/Low with percentage)",
    "contentQuality": "string",
    "growthTrajectory": "string",
    "audienceRetention": "string"
  },
  "topContentThemes": [
    {
      "theme": "string",
      "performance": "string",
      "recommendation": "string"
    }
  ],
  "growthOpportunities": ["string"],
  "contentRecommendations": [
    {
      "idea": "string",
      "category": "string",
      "potential": "string",
      "execution": "string"
    }
  ],
  "postingStrategy": {
    "bestTimes": ["string"],
    "optimalFrequency": "string",
    "contentMix": "string"
  },
  "hashtagRecommendations": {
    "primary": ["string"],
    "secondary": ["string"],
    "trending": ["string"]
  },
  "competitiveInsights": ["string"]
}

Return ONLY the JSON object, no other text.`;

    const completion = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.7,
      max_tokens: 2500
    });

    const response = completion.choices[0].message.content;
    let analysis;
    try {
      analysis = JSON.parse(response);
    } catch {
      const jsonMatch = response.match(/```(?:json)?\s*([\s\S]*?)```/) || response.match(/(\{[\s\S]*\})/);
      if (jsonMatch) {
        analysis = JSON.parse(jsonMatch[1].trim());
      } else {
        throw new Error('Failed to parse AI response');
      }
    }

    // Calculate engagement rate if data available
    let calculatedEngagementRate = null;
    if (followerCount && totalLikes) {
      calculatedEngagementRate = ((totalLikes / followerCount) * 100).toFixed(2) + '%';
    } else if (avgViews && followerCount) {
      calculatedEngagementRate = ((avgViews / followerCount) * 100).toFixed(2) + '%';
    }

    res.json({
      success: true,
      channelName: channelName || 'Unknown Channel',
      analysis,
      calculatedMetrics: {
        engagementRate: calculatedEngagementRate,
        followerCount,
        totalLikes,
        avgViews
      },
      analyzedAt: new Date().toISOString()
    });
  } catch (error) {
    console.error('Channel analysis error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to analyze channel',
      message: error.message
    });
  }
});

// GET /api/analyzer/sample - Get sample analysis data structure
router.get('/sample', (req, res) => {
  res.json({
    success: true,
    sampleData: {
      channelOverview: {
        strengths: ["Consistent posting schedule", "Authentic personality", "Niche content focus"],
        weaknesses: ["Limited hashtag strategy", "Weak hook in first 3 seconds", "Inconsistent audio quality"],
        opportunities: ["Cross-platform promotion", "Collaborations with similar creators", "Trend participation"]
      },
      performanceMetrics: {
        engagementRate: "Medium (4.5%)",
        contentQuality: "Good",
        growthTrajectory: "Steady growth",
        audienceRetention: "Above average"
      },
      topContentThemes: [
        {
          theme: "Behind-the-scenes",
          performance: "High engagement",
          recommendation: "Increase frequency of this content type"
        },
        {
          theme: "Educational content",
          performance: "Consistent views",
          recommendation: "Optimize titles and thumbnails for this category"
        }
      ],
      growthOpportunities: [
        "Improve video hooks",
        "Expand trending hashtag usage",
        "Create series-based content",
        "Increase collaboration frequency"
      ],
      contentRecommendations: [
        {
          idea: "Create a 'Day in my life' vlog series",
          category: "Vlog",
          potential: "High",
          execution: "Film in vertical format, 30-60 seconds, post during peak hours"
        },
        {
          idea: "React to industry news/tips",
          category: "React",
          potential: "Medium-High",
          execution: "Record reaction with green screen background, add text overlays"
        }
      ],
      postingStrategy: {
        bestTimes: ["6:00 PM - 9:00 PM EST", "12:00 PM - 2:00 PM EST", "9:00 PM - 11:00 PM EST"],
        optimalFrequency: "1-2 videos per day",
        contentMix: "60% main content, 20% trends, 20% community engagement"
      },
      hashtagRecommendations: {
        primary: ["#yourniche", "#contentcreator", "#tips"],
        secondary: ["#viral", "#fyp", "#trending"],
        trending: ["#2024", "#learnontiktok"]
      },
      competitiveInsights: [
        "Top creators in your niche post consistently at peak hours",
        "Collaboration videos show 40% higher engagement",
        "Tutorial-style content has longer average watch time"
      ]
    }
  });
});

export default router;
