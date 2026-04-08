// Request validation middleware

export const validateRequest = (requiredFields) => {
  return (req, res, next) => {
    const missingFields = requiredFields.filter(field => !req.body[field]);

    if (missingFields.length > 0) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields',
        missingFields
      });
    }

    next();
  };
};

export const validateChannelAnalysis = (req, res, next) => {
  // At least one piece of channel information should be provided
  const { channelUrl, channelName, description, recentVideos, followerCount, totalLikes, avgViews } = req.body;

  const hasData = channelUrl || channelName || description ||
                  (recentVideos && recentVideos.length > 0) ||
                  followerCount || totalLikes || avgViews;

  if (!hasData) {
    return res.status(400).json({
      success: false,
      error: 'At least one channel data field is required',
      hint: 'Provide channel name, URL, description, recent videos, or metrics'
    });
  }

  // Validate recentVideos structure if provided
  if (recentVideos && Array.isArray(recentVideos)) {
    for (const video of recentVideos) {
      if (typeof video !== 'object' || video === null) {
        return res.status(400).json({
          success: false,
          error: 'Invalid video format in recentVideos',
          hint: 'Each video should be an object with properties'
        });
      }
    }
  }

  next();
};

export const validateVideoData = (req, res, next) => {
  const { title, views, likes, shares, comments } = req.body;

  // Convert strings to numbers if possible
  const numericFields = { views, likes, shares, comments };

  for (const [field, value] of Object.entries(numericFields)) {
    if (value !== undefined && value !== null) {
      const num = Number(value);
      if (isNaN(num) || num < 0) {
        return res.status(400).json({
          success: false,
          error: `Invalid ${field} value`,
          hint: 'Numeric values expected'
        });
      }
    }
  }

  next();
};
