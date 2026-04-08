import React, { createContext, useContext, useState, useCallback } from 'react';

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [recentSearches, setRecentSearches] = useState([]);
  const [sessionId] = useState(() => `session_${Date.now()}`);

  const startLoading = useCallback(() => setLoading(true), []);
  const stopLoading = useCallback(() => setLoading(false), []);

  const setAppError = useCallback((errorMsg) => {
    setError(errorMsg);
    setTimeout(() => setError(null), 5000);
  }, []);

  const clearError = useCallback(() => setError(null), []);

  const addRecentSearch = useCallback((type, query) => {
    setRecentSearches(prev => {
      const newSearch = { type, query, timestamp: Date.now() };
      const filtered = prev.filter(s => !(s.type === type && s.query === query));
      return [newSearch, ...filtered].slice(0, 10);
    });
  }, []);

  const value = {
    loading,
    error,
    recentSearches,
    sessionId,
    startLoading,
    stopLoading,
    setAppError,
    clearError,
    addRecentSearch,
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
}
