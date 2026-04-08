import React, { useState } from 'react';
import { Anchor, Sparkles, Copy, Check } from 'lucide-react';
import { api } from '../utils/api';
import { useApp } from '../context/AppContext';
import { HookCard } from '../components/Cards';
import LoadingSpinner from '../components/LoadingSpinner';

export default function HooksPage() {
  const [topic, setTopic] = useState('');
  const [count, setCount] = useState(5);
  const [style, setStyle] = useState('variety');
  const [hooks, setHooks] = useState([]);
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
      const response = await api.generateHooks({ topic, count, style });
      setHooks(response.hooks);
      addRecentSearch('hooks', topic);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = (hook, index) => {
    navigator.clipboard.writeText(hook.hook);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="p-8 animate-fade-in">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
          <Anchor className="w-8 h-8 text-pink-400" />
          Catchy Hooks Generator
        </h1>
        <p className="text-gray-400">Create attention-grabbing hooks for your TikTok videos</p>
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
                Number of Hooks
              </label>
              <select
                value={count}
                onChange={(e) => setCount(Number(e.target.value))}
                className="input-field"
              >
                <option value={3}>3 Hooks</option>
                <option value={5}>5 Hooks</option>
                <option value={7}>7 Hooks</option>
                <option value={10}>10 Hooks</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Hook Style
              </label>
              <select
                value={style}
                onChange={(e) => setStyle(e.target.value)}
                className="input-field"
              >
                <option value="variety">Variety (All Styles)</option>
                <option value="shocking">Shocking</option>
                <option value="humorous">Humorous</option>
                <option value="emotional">Emotional</option>
                <option value="educational">Educational</option>
                <option value="relatable">Relatable</option>
                <option value="mystery">Mystery</option>
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
                Creating Hooks...
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5" />
                Generate Hooks
              </>
            )}
          </button>
        </form>
      </div>

      {/* Results */}
      {hooks.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-white">Generated Hooks</h2>
            <p className="text-sm text-gray-400">Click to copy hook text</p>
          </div>
          <div className="space-y-4">
            {hooks.map((hook, index) => (
              <div key={index} className="relative">
                <HookCard hook={hook} index={index} />
                <button
                  onClick={() => handleCopy(hook, index)}
                  className="absolute top-6 right-6 p-2 bg-dark-200 hover:bg-dark-100 rounded-lg transition-colors"
                  title="Copy hook"
                >
                  {copiedIndex === index ? (
                    <Check className="w-4 h-4 text-green-400" />
                  ) : (
                    <Copy className="w-4 h-4 text-gray-400" />
                  )}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Empty State */}
      {!loading && hooks.length === 0 && (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-pink-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <Anchor className="w-8 h-8 text-pink-400" />
          </div>
          <h3 className="text-lg font-semibold text-white mb-2">Ready to create hooks?</h3>
          <p className="text-gray-400">Enter your video topic above and get attention-grabbing hooks</p>
        </div>
      )}
    </div>
  );
}
