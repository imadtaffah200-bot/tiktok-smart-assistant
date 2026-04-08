import React, { useState } from 'react';
import { Lightbulb, Sparkles } from 'lucide-react';
import { api } from '../utils/api';
import { useApp } from '../context/AppContext';
import { IdeaCard } from '../components/Cards';
import LoadingSpinner from '../components/LoadingSpinner';

export default function IdeasPage() {
  const [niche, setNiche] = useState('');
  const [count, setCount] = useState(5);
  const [targetAudience, setTargetAudience] = useState('');
  const [ideas, setIdeas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { addRecentSearch } = useApp();

  const handleGenerate = async (e) => {
    e.preventDefault();
    if (!niche.trim()) {
      setError('Please enter a niche');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await api.generateIdeas({ niche, count, targetAudience });
      setIdeas(response.ideas);
      addRecentSearch('ideas', niche);
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
          <Lightbulb className="w-8 h-8 text-yellow-400" />
          Video Ideas Generator
        </h1>
        <p className="text-gray-400">Generate viral TikTok video ideas for your niche</p>
      </div>

      {/* Form */}
      <div className="card p-6 mb-8">
        <form onSubmit={handleGenerate} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Your Niche * (e.g., cooking, fitness, tech reviews)
            </label>
            <input
              type="text"
              value={niche}
              onChange={(e) => setNiche(e.target.value)}
              placeholder="Enter your TikTok niche..."
              className="input-field"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Number of Ideas
              </label>
              <select
                value={count}
                onChange={(e) => setCount(Number(e.target.value))}
                className="input-field"
              >
                <option value={3}>3 Ideas</option>
                <option value={5}>5 Ideas</option>
                <option value={7}>7 Ideas</option>
                <option value={10}>10 Ideas</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Target Audience (optional)
              </label>
              <input
                type="text"
                value={targetAudience}
                onChange={(e) => setTargetAudience(e.target.value)}
                placeholder="e.g., Gen Z, millennials, small business owners"
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
            disabled={loading || !niche.trim()}
            className="btn-primary w-full flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <LoadingSpinner size="sm" />
                Generating Ideas...
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5" />
                Generate Viral Ideas
              </>
            )}
          </button>
        </form>
      </div>

      {/* Results */}
      {ideas.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold text-white mb-4">Generated Ideas</h2>
          <div className="space-y-4">
            {ideas.map((idea, index) => (
              <IdeaCard key={index} idea={idea} index={index} />
            ))}
          </div>
        </div>
      )}

      {/* Empty State */}
      {!loading && ideas.length === 0 && (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-primary-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <Lightbulb className="w-8 h-8 text-primary-400" />
          </div>
          <h3 className="text-lg font-semibold text-white mb-2">Ready to generate ideas?</h3>
          <p className="text-gray-400">Enter your niche above and let AI create viral content ideas for you</p>
        </div>
      )}
    </div>
  );
}
