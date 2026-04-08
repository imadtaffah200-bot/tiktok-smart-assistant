import React, { useState } from 'react';
import { BarChart3, Sparkles, TrendingUp, Users, Eye, Heart, Target, Clock, Hash, Zap } from 'lucide-react';
import { api } from '../utils/api';
import { MetricCard } from '../components/Cards';
import LoadingSpinner from '../components/LoadingSpinner';

export default function AnalyzerPage() {
  const [formData, setFormData] = useState({
    channelName: '',
    description: '',
    channelUrl: '',
    followerCount: '',
    totalLikes: '',
    avgViews: '',
  });
  const [recentVideos, setRecentVideos] = useState([
    { title: '', views: '', likes: '', description: '' }
  ]);
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleFormChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleVideoChange = (index, field, value) => {
    const updated = [...recentVideos];
    updated[index] = { ...updated[index], [field]: value };
    setRecentVideos(updated);
  };

  const addVideo = () => {
    setRecentVideos(prev => [...prev, { title: '', views: '', likes: '', description: '' }]);
  };

  const removeVideo = (index) => {
    setRecentVideos(prev => prev.filter((_, i) => i !== index));
  };

  const handleAnalyze = async (e) => {
    e.preventDefault();

    // Filter out empty videos
    const validVideos = recentVideos.filter(v => v.title || v.views || v.likes || v.description);

    setLoading(true);
    setError(null);

    try {
      const response = await api.analyzeChannel({
        ...formData,
        recentVideos: validVideos,
        followerCount: formData.followerCount ? Number(formData.followerCount) : null,
        totalLikes: formData.totalLikes ? Number(formData.totalLikes) : null,
        avgViews: formData.avgViews ? Number(formData.avgViews) : null,
      });
      setAnalysis(response);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 animate-fade-in">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
          <BarChart3 className="w-8 h-8 text-purple-400" />
          Channel Analyzer
        </h1>
        <p className="text-gray-400">Get AI-powered insights and recommendations for your TikTok channel</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Form */}
        <div className="lg:col-span-2">
          <div className="card p-6">
            <form onSubmit={handleAnalyze} className="space-y-6">
              {/* Basic Info */}
              <div>
                <h3 className="text-lg font-semibold text-white mb-4">Channel Information</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Channel Name</label>
                    <input
                      type="text"
                      value={formData.channelName}
                      onChange={(e) => handleFormChange('channelName', e.target.value)}
                      placeholder="Enter your channel name..."
                      className="input-field"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Channel URL</label>
                    <input
                      type="text"
                      value={formData.channelUrl}
                      onChange={(e) => handleFormChange('channelUrl', e.target.value)}
                      placeholder="https://tiktok.com/@yourchannel"
                      className="input-field"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Channel Description</label>
                    <textarea
                      value={formData.description}
                      onChange={(e) => handleFormChange('description', e.target.value)}
                      placeholder="Describe your channel content..."
                      className="input-field min-h-[80px] resize-y"
                    />
                  </div>
                </div>
              </div>

              {/* Metrics */}
              <div>
                <h3 className="text-lg font-semibold text-white mb-4">Channel Metrics</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Followers</label>
                    <input
                      type="number"
                      value={formData.followerCount}
                      onChange={(e) => handleFormChange('followerCount', e.target.value)}
                      placeholder="e.g., 10000"
                      className="input-field"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Total Likes</label>
                    <input
                      type="number"
                      value={formData.totalLikes}
                      onChange={(e) => handleFormChange('totalLikes', e.target.value)}
                      placeholder="e.g., 500000"
                      className="input-field"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Avg Views</label>
                    <input
                      type="number"
                      value={formData.avgViews}
                      onChange={(e) => handleFormChange('avgViews', e.target.value)}
                      placeholder="e.g., 50000"
                      className="input-field"
                    />
                  </div>
                </div>
              </div>

              {/* Recent Videos */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-white">Recent Videos (Optional)</h3>
                  <button
                    type="button"
                    onClick={addVideo}
                    className="text-sm text-primary-400 hover:text-primary-300 transition-colors"
                  >
                    + Add Video
                  </button>
                </div>
                <div className="space-y-4">
                  {recentVideos.map((video, index) => (
                    <div key={index} className="p-4 bg-dark-200 rounded-xl border border-white/5">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-sm text-gray-400">Video {index + 1}</span>
                        {index > 0 && (
                          <button
                            type="button"
                            onClick={() => removeVideo(index)}
                            className="text-red-400 hover:text-red-300 text-sm"
                          >
                            Remove
                          </button>
                        )}
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <input
                          type="text"
                          value={video.title}
                          onChange={(e) => handleVideoChange(index, 'title', e.target.value)}
                          placeholder="Video title"
                          className="input-field"
                        />
                        <input
                          type="text"
                          value={video.views}
                          onChange={(e) => handleVideoChange(index, 'views', e.target.value)}
                          placeholder="Views"
                          className="input-field"
                        />
                        <input
                          type="text"
                          value={video.likes}
                          onChange={(e) => handleVideoChange(index, 'likes', e.target.value)}
                          placeholder="Likes"
                          className="input-field"
                        />
                        <input
                          type="text"
                          value={video.description}
                          onChange={(e) => handleVideoChange(index, 'description', e.target.value)}
                          placeholder="Brief description"
                          className="input-field"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {error && (
                <div className="p-3 bg-red-500/20 border border-red-500/30 rounded-xl text-red-400 text-sm">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="btn-primary w-full flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <LoadingSpinner size="sm" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5" />
                    Analyze Channel
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Metrics Preview */}
        <div>
          <div className="card p-6 mb-6">
            <h3 className="text-lg font-semibold text-white mb-4">Quick Metrics</h3>
            <div className="space-y-4">
              <MetricCard title="Followers" value={formData.followerCount || '-'} icon={Users} color="primary" />
              <MetricCard title="Total Likes" value={formData.totalLikes || '-'} icon={Heart} color="pink" />
              <MetricCard title="Avg Views" value={formData.avgViews || '-'} icon={Eye} color="green" />
            </div>
          </div>
        </div>
      </div>

      {/* Analysis Results */}
      {analysis && (
        <div className="mt-8 space-y-6">
          <h2 className="text-2xl font-bold text-white">Analysis Results</h2>

          {/* Performance Metrics */}
          {analysis.analysis.performanceMetrics && (
            <div className="card p-6">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-primary-400" />
                Performance Metrics
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="p-4 bg-dark-200 rounded-xl">
                  <p className="text-gray-400 text-sm mb-1">Engagement Rate</p>
                  <p className="text-xl font-bold text-white">{analysis.analysis.performanceMetrics.engagementRate}</p>
                </div>
                <div className="p-4 bg-dark-200 rounded-xl">
                  <p className="text-gray-400 text-sm mb-1">Content Quality</p>
                  <p className="text-xl font-bold text-white">{analysis.analysis.performanceMetrics.contentQuality}</p>
                </div>
                <div className="p-4 bg-dark-200 rounded-xl">
                  <p className="text-gray-400 text-sm mb-1">Growth Trajectory</p>
                  <p className="text-xl font-bold text-white">{analysis.analysis.performanceMetrics.growthTrajectory}</p>
                </div>
                <div className="p-4 bg-dark-200 rounded-xl">
                  <p className="text-gray-400 text-sm mb-1">Audience Retention</p>
                  <p className="text-xl font-bold text-white">{analysis.analysis.performanceMetrics.audienceRetention}</p>
                </div>
              </div>
            </div>
          )}

          {/* Content Recommendations */}
          {analysis.analysis.contentRecommendations && (
            <div className="card p-6">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <Zap className="w-5 h-5 text-yellow-400" />
                Content Recommendations
              </h3>
              <div className="space-y-4">
                {analysis.analysis.contentRecommendations.map((rec, index) => (
                  <div key={index} className="p-4 bg-dark-200 rounded-xl border border-white/5">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-semibold text-white">{rec.idea}</h4>
                      <span className="px-2 py-1 bg-primary-500/20 text-primary-400 rounded text-xs">
                        {rec.potential} Potential
                      </span>
                    </div>
                    <p className="text-sm text-gray-400 mb-2">{rec.execution}</p>
                    <span className="text-xs text-gray-500">{rec.category}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Posting Strategy */}
          {analysis.analysis.postingStrategy && (
            <div className="card p-6">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <Clock className="w-5 h-5 text-blue-400" />
                Optimal Posting Strategy
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-dark-200 rounded-xl">
                  <p className="text-gray-400 text-sm mb-2">Best Times</p>
                  <ul className="space-y-1">
                    {analysis.analysis.postingStrategy.bestTimes?.map((time, i) => (
                      <li key={i} className="text-sm text-white">{time}</li>
                    ))}
                  </ul>
                </div>
                <div className="p-4 bg-dark-200 rounded-xl">
                  <p className="text-gray-400 text-sm mb-2">Optimal Frequency</p>
                  <p className="text-white font-medium">{analysis.analysis.postingStrategy.optimalFrequency}</p>
                </div>
                <div className="p-4 bg-dark-200 rounded-xl">
                  <p className="text-gray-400 text-sm mb-2">Content Mix</p>
                  <p className="text-white font-medium text-sm">{analysis.analysis.postingStrategy.contentMix}</p>
                </div>
              </div>
            </div>
          )}

          {/* Hashtag Recommendations */}
          {analysis.analysis.hashtagRecommendations && (
            <div className="card p-6">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <Hash className="w-5 h-5 text-green-400" />
                Hashtag Recommendations
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <p className="text-sm text-gray-400 mb-2">Primary</p>
                  <div className="flex flex-wrap gap-2">
                    {analysis.analysis.hashtagRecommendations.primary?.map((tag, i) => (
                      <span key={i} className="px-2 py-1 bg-purple-500/20 text-purple-400 rounded text-sm">{tag}</span>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-sm text-gray-400 mb-2">Secondary</p>
                  <div className="flex flex-wrap gap-2">
                    {analysis.analysis.hashtagRecommendations.secondary?.map((tag, i) => (
                      <span key={i} className="px-2 py-1 bg-blue-500/20 text-blue-400 rounded text-sm">{tag}</span>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-sm text-gray-400 mb-2">Trending</p>
                  <div className="flex flex-wrap gap-2">
                    {analysis.analysis.hashtagRecommendations.trending?.map((tag, i) => (
                      <span key={i} className="px-2 py-1 bg-pink-500/20 text-pink-400 rounded text-sm">{tag}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Growth Opportunities */}
          {analysis.analysis.growthOpportunities && (
            <div className="card p-6">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <Target className="w-5 h-5 text-orange-400" />
                Growth Opportunities
              </h3>
              <ul className="space-y-2">
                {analysis.analysis.growthOpportunities.map((opp, index) => (
                  <li key={index} className="flex items-center gap-2 text-gray-300">
                    <span className="w-2 h-2 bg-primary-500 rounded-full" />
                    {opp}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
