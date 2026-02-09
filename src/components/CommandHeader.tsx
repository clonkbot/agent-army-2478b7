import { useState, useEffect } from 'react';

interface CommandHeaderProps {
  activeAgents: number;
  totalAgents: number;
}

export default function CommandHeader({ activeAgents, totalAgents }: CommandHeaderProps) {
  const [time, setTime] = useState(new Date());
  const [glitch, setGlitch] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    // Random glitch effect
    const glitchInterval = setInterval(() => {
      if (Math.random() > 0.95) {
        setGlitch(true);
        setTimeout(() => setGlitch(false), 100);
      }
    }, 500);
    return () => clearInterval(glitchInterval);
  }, []);

  const statusReady = activeAgents === totalAgents;

  return (
    <header className="border-b border-[#00ff41]/30 bg-[#0a0a0a]/90 backdrop-blur-sm sticky top-0 z-30">
      <div className="px-4 md:px-8 lg:px-12 py-4 md:py-6">
        {/* Top status bar */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 md:gap-4 mb-4 md:mb-6 text-[10px] md:text-xs tracking-widest uppercase text-[#00ff41]/60">
          <div className="flex items-center gap-2 md:gap-4 flex-wrap">
            <span className="animate-pulse">[LIVE]</span>
            <span>SYS.UPTIME: {Math.floor(time.getTime() / 1000) % 100000}s</span>
            <span className="hidden sm:inline">NET.STATUS: CONNECTED</span>
          </div>
          <div className="flex items-center gap-2 md:gap-4 flex-wrap">
            <span>{time.toLocaleTimeString('en-US', { hour12: false })}</span>
            <span>{time.toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' })}</span>
          </div>
        </div>

        {/* Main title */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
          <div>
            <div className="text-[8px] md:text-[10px] tracking-[0.3em] text-[#00ff41]/40 mb-1 md:mb-2">
              AUTONOMOUS INTELLIGENCE COMMAND CENTER
            </div>
            <h1
              className={`font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-tight leading-none ${glitch ? 'translate-x-1 text-[#ff0040]' : ''} transition-all duration-75`}
              style={{ fontFamily: 'Orbitron, monospace' }}
            >
              AGENT<span className="text-[#00ff41]/40">_</span>ARMY
            </h1>
            <div className="mt-2 text-[10px] md:text-xs tracking-wider text-[#00ff41]/50">
              <span className="inline-block w-2 h-2 rounded-full bg-[#00ff41] mr-2 animate-pulse" />
              DEPLOYMENT STATUS: <span className={statusReady ? 'text-[#00ff41]' : 'text-amber-400'}>{statusReady ? 'ALL UNITS ONLINE' : 'INITIALIZING...'}</span>
            </div>
          </div>

          {/* Progress indicator */}
          <div className="lg:text-right">
            <div className="text-[10px] md:text-xs tracking-wider text-[#00ff41]/40 mb-1">BOOT SEQUENCE</div>
            <div className="flex items-center gap-3">
              <div className="w-32 sm:w-48 h-2 bg-[#00ff41]/10 border border-[#00ff41]/30 overflow-hidden">
                <div
                  className="h-full bg-[#00ff41] transition-all duration-100"
                  style={{ width: `${(activeAgents / totalAgents) * 100}%` }}
                />
              </div>
              <span className="text-sm md:text-lg font-bold" style={{ fontFamily: 'Orbitron, monospace' }}>
                {Math.round((activeAgents / totalAgents) * 100)}%
              </span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
