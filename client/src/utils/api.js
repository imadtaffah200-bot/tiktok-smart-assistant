const API_BASE = '/api';

async function handleResponse(response) {
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || data.error || 'An error occurred');
  }
  return data;
}

export const api = {
  // Health check
  async healthCheck() {
    const response = await fetch(`${API_BASE}/health`);
    return handleResponse(response);
  },

  // Ideas generation
  async generateIdeas({ niche, count, targetAudience }) {
    const response = await fetch(`${API_BASE}/ideas/generate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ niche, count, targetAudience }),
    });
    return handleResponse(response);
  },

  // Hooks generation
  async generateHooks({ topic, count, style }) {
    const response = await fetch(`${API_BASE}/generator/hooks`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ topic, count, style }),
    });
    return handleResponse(response);
  },

  // Description generation
  async generateDescription({ topic, length, tone }) {
    const response = await fetch(`${API_BASE}/generator/description`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ topic, length, tone }),
    });
    return handleResponse(response);
  },

  // Hashtags generation
  async generateHashtags({ topic, count, niche }) {
    const response = await fetch(`${API_BASE}/generator/hashtags`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ topic, count, niche }),
    });
    return handleResponse(response);
  },

  // Channel analysis
  async analyzeChannel(data) {
    const response = await fetch(`${API_BASE}/analyzer/analyze`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return handleResponse(response);
  },

  // Get sample analysis
  async getSampleAnalysis() {
    const response = await fetch(`${API_BASE}/analyzer/sample`);
    return handleResponse(response);
  },

  // Chat
  async sendMessage(message, sessionId) {
    const response = await fetch(`${API_BASE}/chat/message`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message, sessionId }),
    });
    return handleResponse(response);
  },

  // Clear chat
  async clearChat(sessionId) {
    const response = await fetch(`${API_BASE}/chat/clear`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ sessionId }),
    });
    return handleResponse(response);
  },
};
