import React, { useEffect } from 'react';
import { X, CheckCircle, AlertCircle, Info } from 'lucide-react';

export default function Toast({ message, type = 'info', onClose }) {
  useEffect(() => {
    const timer = setTimeout(onClose, 5000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const icons = {
    success: <CheckCircle className="w-5 h-5 text-green-400" />,
    error: <AlertCircle className="w-5 h-5 text-red-400" />,
    info: <Info className="w-5 h-5 text-primary-400" />,
  };

  const bgColors = {
    success: 'bg-green-500/20 border-green-500/30',
    error: 'bg-red-500/20 border-red-500/30',
    info: 'bg-primary-500/20 border-primary-500/30',
  };

  return (
    <div className={`fixed bottom-6 right-6 flex items-center gap-3 px-4 py-3 rounded-xl border ${bgColors[type]} backdrop-blur-xl shadow-xl animate-fade-in z-50`}>
      {icons[type]}
      <p className="text-white text-sm">{message}</p>
      <button
        onClick={onClose}
        className="ml-2 text-gray-400 hover:text-white transition-colors"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}
