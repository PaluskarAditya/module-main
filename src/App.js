import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function App() {
  const [progress, setProgress] = useState(0);
  const [cyberText, setCyberText] = useState('INITIALIZING SECURE CONNECTION');
  const navigate = useNavigate();

  useEffect(() => {
    const statusMessages = [
      'BOOTING CORE SYSTEMS',
      'LOADING SECURITY PROTOCOLS',
      'ESTABLISHING ENCRYPTION',
      'VERIFYING IDENTITY MATRIX',
      'SYNCHRONIZING DATABASES'
    ];

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => navigate('/home'), 800);
          return 100;
        }
        
        // Change status message at certain progress points
        if (prev === 20) setCyberText(statusMessages[1]);
        if (prev === 45) setCyberText(statusMessages[2]);
        if (prev === 70) setCyberText(statusMessages[3]);
        if (prev === 90) setCyberText(statusMessages[4]);
        
        return prev + 2;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [navigate]);

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-gray-900 to-black flex flex-col">
      {/* Header Bar */}
      <div className="w-full flex items-center justify-between p-4 border-b border-indigo-500/30 bg-black/50 backdrop-blur-sm">
        <div className="text-sm font-mono text-indigo-400 tracking-widest">CYBER_GUARD // v4.2.0</div>
        <div className="text-xs font-mono text-indigo-400/80 tracking-widest">SYSTEM_LOADING:{progress}%</div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center p-8">
        {/* Animated Logo */}
        <div className="relative mb-12">
          <h1 className="text-6xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-500 tracking-tighter">
            CYBERGUARD
          </h1>
          <div className="absolute inset-0 bg-indigo-500/10 rounded-full blur-xl -z-10"></div>
        </div>

        {/* Cyber Terminal */}
        <div className="w-full max-w-lg border border-indigo-500/30 rounded-xl bg-black/50 backdrop-blur-sm p-6 shadow-[0_0_30px_rgba(79,70,229,0.15)]">
          {/* Progress Bar */}
          <div className="mb-6">
            <div className="h-1.5 w-full bg-gray-800/80 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-indigo-500 to-purple-600 transition-all duration-100 ease-linear"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
          
          {/* Status Text */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-indigo-400 animate-pulse"></div>
              <p className="font-mono text-sm text-indigo-400 tracking-wider">
                {cyberText}
                <span className="ml-1 animate-pulse">_</span>
              </p>
            </div>
            
            <div className="font-mono text-xs text-gray-400 tracking-wide">
              <div className="flex gap-8">
                <span>SECURITY: <span className="text-emerald-400">ENABLED</span></span>
                <span>ENCRYPTION: <span className="text-emerald-400">AES-256</span></span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-12 font-mono text-xs text-indigo-400/50 tracking-widest">
          [ ESTABLISHING SECURE ENVIRONMENT ]
        </div>
      </div>

      {/* Grid Overlay */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgdmlld0JveD0iMCAwIDQwIDQwIj48cGF0aCBkPSJNMCAwaDQwdjQwSDB6IiBmaWxsPSJub25lIi8+PHBhdGggZD0iTTAgMEg0ME00MCAwVjQwTTAgNDBINDBNMCAwVjQwIiBzdHJva2U9IiMxZTE5MjMiIHN0cm9rZS13aWR0aD0iMC41Ii8+PC9zdmc+')] opacity-10"></div>
      </div>
    </div>
  );
}