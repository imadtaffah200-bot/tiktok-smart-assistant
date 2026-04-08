import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, Send, Trash2, Loader2 } from 'lucide-react';
import { api } from '../utils/api';
import { useApp } from '../context/AppContext';
import LoadingSpinner from '../components/LoadingSpinner';

export default function ChatPage() {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: "Hi! I'm your TikTok Growth Assistant. Ask me anything about TikTok content creation, growth strategies, viral hooks, hashtag optimization, or analytics. How can I help you today?"
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const messagesEndRef = useRef(null);

  const { sessionId } = useApp();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMessage = { role: 'user', content: input.trim() };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);
    setError(null);

    try {
      const response = await api.sendMessage(input.trim(), sessionId);
      setMessages(prev => [...prev, { role: 'assistant', content: response.response }]);
    } catch (err) {
      setError(err.message);
      setMessages(prev => prev.slice(0, -1)); // Remove user message on error
    } finally {
      setLoading(false);
    }
  };

  const handleClear = async () => {
    try {
      await api.clearChat(sessionId);
      setMessages([
        {
          role: 'assistant',
          content: "Chat cleared! How can I help you with your TikTok content today?"
        }
      ]);
    } catch (err) {
      setError('Failed to clear chat');
    }
  };

  const suggestedQuestions = [
    "How can I increase my engagement rate?",
    "What's the best time to post on TikTok?",
    "How do I go viral with my content?",
    "Tips for better TikTok hooks"
  ];

  return (
    <div className="p-8 h-[calc(100vh-64px)] flex flex-col animate-fade-in">
      <div className="mb-4">
        <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
          <MessageCircle className="w-8 h-8 text-primary-400" />
          AI Chat Assistant
        </h1>
        <p className="text-gray-400">Get personalized TikTok growth tips and advice</p>
      </div>

      {/* Chat Container */}
      <div className="flex-1 card flex flex-col overflow-hidden">
        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in`}
            >
              <div
                className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                  message.role === 'user'
                    ? 'bg-primary-500 text-white rounded-br-md'
                    : 'bg-dark-200 text-gray-200 rounded-bl-md'
                }`}
              >
                {message.role === 'assistant' && (
                  <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-primary-600 rounded-full flex items-center justify-center mb-2">
                    <MessageCircle className="w-4 h-4 text-white" />
                  </div>
                )}
                <p className="whitespace-pre-wrap text-sm leading-relaxed">{message.content}</p>
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex justify-start animate-fade-in">
              <div className="bg-dark-200 rounded-2xl rounded-bl-md px-4 py-3">
                <div className="flex items-center gap-2 text-gray-400">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span className="text-sm">Thinking...</span>
                </div>
              </div>
            </div>
          )}

          {error && (
            <div className="p-3 bg-red-500/20 border border-red-500/30 rounded-xl text-red-400 text-sm">
              {error}
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Suggested Questions */}
        {messages.length === 1 && (
          <div className="px-6 pb-4">
            <p className="text-sm text-gray-400 mb-3">Suggested questions:</p>
            <div className="flex flex-wrap gap-2">
              {suggestedQuestions.map((q, i) => (
                <button
                  key={i}
                  onClick={() => setInput(q)}
                  className="px-3 py-2 bg-dark-200 hover:bg-dark-100 rounded-lg text-sm text-gray-300 hover:text-white transition-colors border border-white/5"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Input */}
        <div className="p-4 border-t border-white/5 bg-dark-100/50">
          <form onSubmit={handleSend} className="flex items-center gap-3">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about TikTok growth..."
              className="flex-1 input-field"
              disabled={loading}
            />
            <button
              type="button"
              onClick={handleClear}
              className="p-3 bg-dark-200 hover:bg-dark-100 rounded-xl transition-colors"
              title="Clear chat"
            >
              <Trash2 className="w-5 h-5 text-gray-400" />
            </button>
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="btn-primary p-3"
            >
              <Send className="w-5 h-5" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
