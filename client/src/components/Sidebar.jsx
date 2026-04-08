import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  Lightbulb,
  Anchor,
  FileText,
  Hash,
  BarChart3,
  MessageCircle,
  Home
} from 'lucide-react';

const navItems = [
  { path: '/', icon: Home, label: 'Dashboard' },
  { path: '/ideas', icon: Lightbulb, label: 'Video Ideas' },
  { path: '/hooks', icon: Anchor, label: 'Hooks' },
  { path: '/description', icon: FileText, label: 'Description' },
  { path: '/hashtags', icon: Hash, label: 'Hashtags' },
  { path: '/analyzer', icon: BarChart3, label: 'Analyzer' },
  { path: '/chat', icon: MessageCircle, label: 'Chat' },
];

export default function Sidebar() {
  return (
    <aside className="fixed left-0 top-0 h-full w-64 bg-dark-200/80 backdrop-blur-xl border-r border-white/5 z-40">
      <div className="p-6">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center">
            <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
            </svg>
          </div>
          <div>
            <h1 className="text-lg font-bold text-white">TikTok</h1>
            <p className="text-xs text-gray-400">Smart Assistant</p>
          </div>
        </div>

        <nav className="space-y-2">
          {navItems.map(({ path, icon: Icon, label }) => (
            <NavLink
              key={path}
              to={path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                  isActive
                    ? 'bg-primary-500/20 text-primary-400 border border-primary-500/30'
                    : 'text-gray-400 hover:bg-white/5 hover:text-white'
                }`
              }
            >
              <Icon className="w-5 h-5" />
              <span className="font-medium">{label}</span>
            </NavLink>
          ))}
        </nav>
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-white/5">
        <div className="bg-gradient-to-r from-primary-500/10 to-primary-600/10 rounded-xl p-4 border border-primary-500/20">
          <p className="text-xs text-gray-400 mb-1">Need Help?</p>
          <p className="text-sm text-white font-medium">Ask our AI Assistant</p>
          <NavLink
            to="/chat"
            className="mt-3 inline-block text-xs text-primary-400 hover:text-primary-300 transition-colors"
          >
            Start Chat →
          </NavLink>
        </div>
      </div>
    </aside>
  );
}
