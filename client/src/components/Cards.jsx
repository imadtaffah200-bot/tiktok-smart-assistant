import React from 'react';
import { TrendingUp, Clock, Target, Zap } from 'lucide-react';

export function IdeaCard({ idea, index }) {
  return (
    <div className="card p-5 animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
      <div className="flex items-start gap-4">
        <div className="w-10 h-10 bg-gradient-to-br from-primary-500/20 to-primary-600/20 rounded-xl flex items-center justify-center shrink-0">
          <Zap className="w-5 h-5 text-primary-400" />
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-white mb-2">{idea.title}</h3>
          <p className="text-gray-400 text-sm mb-3">{idea.concept}</p>

          <div className="flex flex-wrap gap-2 mb-3">
            <span className="inline-flex items-center gap-1 px-2 py-1 bg-primary-500/10 text-primary-400 rounded-lg text-xs">
              <TrendingUp className="w-3 h-3" />
              {idea.engagementPotential} Potential
            </span>
          </div>

          <div className="space-y-2">
            <div className="flex items-start gap-2">
              <span className="text-xs text-gray-500 w-20 shrink-0">Viral Factor:</span>
              <span className="text-xs text-gray-300">{idea.viralFactor}</span>
            </div>
            <div className="flex items-start gap-2">
              <Clock className="w-3 h-3 text-gray-500 mt-0.5" />
              <span className="text-xs text-gray-300">{idea.bestTimes?.join(', ')}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function HookCard({ hook, index }) {
  return (
    <div className="card p-5 animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
      <div className="flex items-start gap-4">
        <div className="w-10 h-10 bg-gradient-to-br from-pink-500/20 to-pink-600/20 rounded-xl flex items-center justify-center shrink-0">
          <Target className="w-5 h-5 text-pink-400" />
        </div>
        <div className="flex-1">
          <div className="bg-dark-200 rounded-lg p-3 mb-3 border-l-4 border-pink-500">
            <p className="text-white font-medium">"{hook.hook}"</p>
          </div>
          <span className="inline-block px-2 py-1 bg-pink-500/10 text-pink-400 rounded-lg text-xs mb-3">
            {hook.type}
          </span>
          <div className="space-y-2">
            <p className="text-sm text-gray-400"><strong className="text-gray-300">Why it works:</strong> {hook.attentionGrab}</p>
            <p className="text-sm text-gray-400"><strong className="text-gray-300">Execution:</strong> {hook.execution}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export function HashtagCard({ hashtag, category, index }) {
  return (
    <div className="card p-4 animate-fade-in" style={{ animationDelay: `${index * 50}ms` }}>
      <div className="flex items-center justify-between">
        <span className="text-primary-400 font-semibold text-lg">{hashtag}</span>
        <div className="flex items-center gap-2">
          <span className={`px-2 py-1 rounded text-xs ${
            hashtag.reach === 'High' ? 'bg-green-500/20 text-green-400' :
            hashtag.reach === 'Medium' ? 'bg-yellow-500/20 text-yellow-400' :
            'bg-gray-500/20 text-gray-400'
          }`}>
            {hashtag.reach}
          </span>
        </div>
      </div>
      <p className="text-xs text-gray-500 mt-2">{category} • {hashtag.competition} competition</p>
    </div>
  );
}

export function MetricCard({ title, value, icon: Icon, trend, color = 'primary' }) {
  const colorClasses = {
    primary: 'from-primary-500/20 to-primary-600/20 text-primary-400',
    green: 'from-green-500/20 to-green-600/20 text-green-400',
    pink: 'from-pink-500/20 to-pink-600/20 text-pink-400',
    yellow: 'from-yellow-500/20 to-yellow-600/20 text-yellow-400',
  };

  return (
    <div className="card p-5">
      <div className="flex items-center justify-between mb-3">
        <span className="text-gray-400 text-sm">{title}</span>
        <div className={`w-10 h-10 bg-gradient-to-br ${colorClasses[color]} rounded-xl flex items-center justify-center`}>
          <Icon className="w-5 h-5" />
        </div>
      </div>
      <p className="text-2xl font-bold text-white">{value}</p>
      {trend && (
        <p className={`text-xs mt-2 ${trend > 0 ? 'text-green-400' : 'text-red-400'}`}>
          {trend > 0 ? '+' : ''}{trend}% from last week
        </p>
      )}
    </div>
  );
}
