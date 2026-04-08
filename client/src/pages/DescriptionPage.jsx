import React, { useState } from 'react';
import { FileText, Sparkles, Copy, Check } from 'lucide-react';
import { api } from '../utils/api';
import { useApp } from '../context/AppContext';
import LoadingSpinner from '../components/LoadingSpinner';

export default function DescriptionPage() {
  const [topic, setTopic] = useState('');
  const [length, setLength] = useState('medium');
  const [tone, setTone] = useState('casual');
  const [descriptions, setDescriptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [copiedIndex, setCopiedIndex] = useState(null);

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
      const response = await api.generateDescription({ topic, length, tone });
      setDescriptions(response.descriptions);
      addRecentSearch('description', topic);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = (description, index) => {
    navigator.clipboard.writeText(description.description);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="p-8 animate-fade-in">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
          <FileText className="w-8 h-8 text-blue-400" />
          Description Generator
        </h1>
        <p className="text-gray-400">Create professional video descriptions with engaging CTAs</p>
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
                Description Length
              </label>
              <select
                value={length}
                onChange={(e) => setLength(e.target.value)}
                className="input-field"
              >
                <option value="short">Short (1-2 sentences)</option>
                <option value="medium">Medium (2-4 sentences)</option>
                <option value="long">Long (4-6 sentences)</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Tone
              </label>
              <select
                value={tone}
                onChange={(e) => setTone(e.target.value)}
                className="input-field"
              >
                <option value="casual">Casual</option>
                <option value="professional">Professional</option>
                <option value="humorous">Humorous</option>
                <option value="emotional">Emotional</option>
                <option value="mysterious">Mysterious</option>
              </select>
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
                Creating Descriptions...
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5" />
                Generate Descriptions
              </>
            )}
          </button>
        </form>
      </div>

      {/* Results */}
      {descriptions.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold text-white mb-4">Generated Descriptions</h2>
          <div className="space-y-4">
            {descriptions.map((desc, index) => (
              <div key={index} className="card p-5 relative animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500/20 to-blue-600/20 rounded-xl flex items-center justify-center shrink-0">
                    <span className="text-blue-400 font-bold">{index + 1}</span>
                  </div>
                  <div className="flex-1">
                    <p className="text-white mb-3">{desc.description}</p>
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-1 bg-blue-500/10 text-blue-400 rounded-lg text-xs">
                        {desc.tone}
                      </span>
                      {desc.includesCTA && (
                        <span className="px-2 py-1 bg-green-500/10 text-green-400 rounded-lg text-xs">
                          Includes CTA
                        </span>
                      )}
                    </div>
                  </div>
                  <button
                    onClick={() => handleCopy(desc, index)}
                    className="p-2 bg-dark-200 hover:bg-dark-100 rounded-lg transition-colors"
                    title="Copy description"
                  >
                    {copiedIndex === index ? (
                      <Check className="w-4 h-4 text-green-400" />
                    ) : (
                      <Copy className="w-4 h-4 text-gray-400" />
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Empty State */}
      {!loading && descriptions.length === 0 && (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <FileText className="w-8 h-8 text-blue-400" />
          </div>
          <h3 className="text-lg font-semibold text-white mb-2">Ready to generate descriptions?</h3>
          <p className="text-gray-400">Enter your video topic above and get professional descriptions</p>
        </div>
      )}
    </div>
  );
}
