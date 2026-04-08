import React, { useState } from 'react';
import { Hash, Sparkles, Copy, Check } from 'lucide-react';
import { api } from '../utils/api';
import { useApp } from '../context/AppContext';
import LoadingSpinner from '../components/LoadingSpinner';

export default function HashtagsPage() {
  const [topic, setTopic] = useState('');
  const [count, setCount] = useState(10);
  const [niche, setNiche] = useState('');
  const [hashtags, setHashtags] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [copied, setCopied] = useState(false);

  const { addRecentSearch } = useApp();

  const handleGenerate = async (e) => {
    e.preventDefault();
    if (!topic.trim()) {
      setError('Please enter a topic');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await api.generateHashtags({ topic, count, niche });
      setHashtags(response.hashtags);
      addRecentSearch('hashtags', topic);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCopyAll = () => {
    if (!hashtags) return;
    const allHashtags = [
      ...hashtags.nicheHashtags.map(h => h.hashtag),
      ...hashtags.trendingHashtags.map(h => h.hashtag),
      ...hashtags.broadHashtags.map(h => h.hashtag),
      ...hashtags.brandHashtags.map(h => h.hashtag),
    ].join(' ');
    navigator.clipboard.writeText(allHashtags);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const copyHashtag = (hashtag) => {
    navigator.clipboard.writeText(hashtag);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const renderHashtagSection = (title, items, bgColor) => (
    items && items.length > 0 && (
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
          <span className={`w-3 h-3 rounded-full ${bgColor}`} />
          {title}
        </h3>
        <div className="flex flex-wrap gap-2">
          {items.map((item, index) => (
            <div
              key={index}
              className="group relative px-3 py-2 bg-dark-200 hover:bg-dark-100 rounded-xl border border-white/5 hover:border-primary-500/30 transition-all cursor-pointer"
              onClick={() => copyHashtag(item.hashtag)}
            >
              <span className="text-primary-400 font-medium">{item.hashtag}</span>
              <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-dark-300 px-2 py-1 rounded text-xs text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                {item.reach} reach • {item.competition} competition
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  );

  return (
    <div className="p-8 animate-fade-in">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
          <Hash className="w-8 h-8 text-green-400" />
          Hashtag Generator
        </h1>
        <p className="text-gray-400">Get trending hashtags to maximize your video reach</p>
      </div>

      {/* Form */}
      <div className="card p-6 mb-8">
        <form onSubmit={handleGenerate} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Video Topic * (What is your video about?)
            </label>
            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="Enter your video topic..."
              className="input-field"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Number of Hashtags
              </label>
              <select
                value={count}
                onChange={(e) => setCount(Number(e.target.value))}
                className="input-field"
              >
                <option value={5}>5 Hashtags</option>
                <option value={10}>10 Hashtags</option>
                <option value={15}>15 Hashtags</option>
                <option value={20}>20 Hashtags</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Specific Niche (optional)
              </label>
              <input
                type="text"
                value={niche}
                onChange={(e) => setNiche(e.target.value)}
                placeholder="e.g., cooking, tech, lifestyle"
                className="input-field"
              />
            </div>
          </div>

          {error && (
            <div className="p-3 bg-red-500/20 border border-red-500/30 rounded-xl text-red-400 text-sm">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading || !topic.trim()}
            className="btn-primary w-full flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <LoadingSpinner size="sm" />
                Generating Hashtags...
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5" />
                Generate Hashtags
              </>
            )}
          </button>
        </form>
      </div>

      {/* Results */}
      {hashtags && (
        <div className="card p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-white">Generated Hashtags</h2>
            <button
              onClick={handleCopyAll}
              className="btn-secondary flex items-center gap-2 text-sm"
            >
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              {copied ? 'Copied!' : 'Copy All'}
            </button>
          </div>

          {renderHashtagSection('Niche Hashtags', hashtags.nicheHashtags, 'bg-purple-500')}
          {renderHashtagSection('Trending Hashtags', hashtags.trendingHashtags, 'bg-pink-500')}
          {renderHashtagSection('Broad Hashtags', hashtags.broadHashtags, 'bg-blue-500')}
          {renderHashtagSection('Brand Hashtags', hashtags.brandHashtags, 'bg-green-500')}

          <div className="mt-6 p-4 bg-primary-500/10 rounded-xl border border-primary-500/20">
            <p className="text-sm text-gray-300">
              <strong className="text-primary-400">Pro Tip:</strong> Use a mix of niche, trending, and broad hashtags for optimal reach.
              Avoid using only high-competition hashtags as it may limit your visibility.
            </p>
          </div>
        </div>
      )}

      {/* Empty State */}
      {!loading && !hashtags && (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <Hash className="w-8 h-8 text-green-400" />
          </div>
          <h3 className="text-lg font-semibold text-white mb-2">Ready to generate hashtags?</h3>
          <p className="text-gray-400">Enter your video topic above and get optimized hashtags</p>
        </div>
      )}
    </div>
  );
}
