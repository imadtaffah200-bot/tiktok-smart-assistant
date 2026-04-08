import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Lightbulb, Anchor, FileText, Hash, BarChart3, MessageCircle, TrendingUp, Users, Eye, Heart } from 'lucide-react';
import { api } from '../utils/api';
import { useApp } from '../context/AppContext';

export default function Dashboard() {
  const [stats, setStats] = useState({
    ideasGenerated: 0,
    hooksCreated: 0,
    hashtagsGenerated: 0,
    channelsAnalyzed: 0,
  });

  const features = [
    {
      title: 'Video Ideas',
      description: 'Generate viral TikTok video ideas based on your niche',
      icon: Lightbulb,
      path: '/ideas',
      color: 'from-yellow-500 to-orange-500',
    },
    {
      title: 'Catchy Hooks',
      description: 'Create attention-grabbing hooks for your videos',
      icon: Anchor,
      path: '/hooks',
      color: 'from-pink-500 to-rose-500',
    },
    {
      title: 'Descriptions',
      description: 'Write professional video descriptions with CTAs',
      icon: FileText,
      path: '/description',
      color: 'from-blue-500 to-cyan-500',
    },
    {
      title: 'Hashtags',
      description: 'Get trending hashtags to maximize your reach',
      icon: Hash,
      path: '/hashtags',
      color: 'from-green-500 to-emerald-500',
    },
    {
      title: 'Channel Analyzer',
      description: 'Analyze your TikTok channel for growth insights',
      icon: BarChart3,
      path: '/analyzer',
      color: 'from-purple-500 to-violet-500',
    },
    {
      title: 'AI Chat',
      description: 'Get personalized TikTok growth tips and advice',
      icon: MessageCircle,
      path: '/chat',
      color: 'from-primary-500 to-primary-600',
    },
  ];

  const quickStats = [
    { label: 'Views', value: '2.4M', icon: Eye, change: '+12%' },
    { label: 'Engagement', value: '8.5%', icon: Heart, change: '+5%' },
    { label: 'Followers', value: '125K', icon: Users, change: '+18%' },
    { label: 'Growth', value: 'High', icon: TrendingUp, change: '+23%' },
  ];

  return (
    <div className="p-8 animate-fade-in">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Welcome to TikTok Smart Assistant</h1>
        <p className="text-gray-400">Your AI-powered toolkit for viral TikTok content</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {quickStats.map((stat, index) => (
          <div key={index} className="card p-5 animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
            <div className="flex items-center justify-between mb-3">
              <span className="text-gray-400 text-sm">{stat.label}</span>
              <stat.icon className="w-5 h-5 text-primary-400" />
            </div>
            <p className="text-2xl font-bold text-white">{stat.value}</p>
            <p className="text-xs text-green-400 mt-2">{stat.change}</p>
          </div>
        ))}
      </div>

      {/* Features Grid */}
      <h2 className="text-xl font-semibold text-white mb-4">Quick Access</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {features.map((feature, index) => (
          <Link
            key={index}
            to={feature.path}
            className="card p-6 hover:border-primary-500/30 transition-all duration-300 group animate-fade-in"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className={`w-12 h-12 bg-gradient-to-br ${feature.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
              <feature.icon className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
            <p className="text-sm text-gray-400">{feature.description}</p>
          </Link>
        ))}
      </div>

      {/* Tips Section */}
      <div className="mt-8 card p-6 bg-gradient-to-r from-primary-500/10 to-purple-500/10 border-primary-500/20">
        <h3 className="text-lg font-semibold text-white mb-3">Pro Tips</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-dark-200/50 rounded-xl">
            <p className="text-sm text-gray-300">Post during peak hours (6-9 PM) for maximum engagement</p>
          </div>
          <div className="p-4 bg-dark-200/50 rounded-xl">
            <p className="text-sm text-gray-300">Use 3-5 relevant hashtags per video for optimal reach</p>
          </div>
          <div className="p-4 bg-dark-200/50 rounded-xl">
            <p className="text-sm text-gray-300">Hook viewers in the first 3 seconds to improve retention</p>
          </div>
        </div>
      </div>
    </div>
  );
}
