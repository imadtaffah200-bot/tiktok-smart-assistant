import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Toast from './components/Toast';
import { useApp } from './context/AppContext';
import Dashboard from './pages/Dashboard';
import IdeasPage from './pages/IdeasPage';
import HooksPage from './pages/HooksPage';
import DescriptionPage from './pages/DescriptionPage';
import HashtagsPage from './pages/HashtagsPage';
import AnalyzerPage from './pages/AnalyzerPage';
import ChatPage from './pages/ChatPage';

function App() {
  const { error, clearError } = useApp();

  return (
    <BrowserRouter>
      <div className="flex min-h-screen bg-dark-300">
        <Sidebar />
        <main className="flex-1 ml-64">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/ideas" element={<IdeasPage />} />
            <Route path="/hooks" element={<HooksPage />} />
            <Route path="/description" element={<DescriptionPage />} />
            <Route path="/hashtags" element={<HashtagsPage />} />
            <Route path="/analyzer" element={<AnalyzerPage />} />
            <Route path="/chat" element={<ChatPage />} />
          </Routes>
        </main>
        {error && (
          <Toast message={error} type="error" onClose={clearError} />
        )}
      </div>
    </BrowserRouter>
  );
}

export default App;
