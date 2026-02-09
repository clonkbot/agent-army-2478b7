import { useState, useEffect, useRef } from 'react';
import AgentGrid from './components/AgentGrid';
import CommandHeader from './components/CommandHeader';
import StatsPanel from './components/StatsPanel';

function App() {
  const [activeAgents, setActiveAgents] = useState(0);
  const [totalAgents] = useState(256);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Staggered activation of agents on load
    const interval = setInterval(() => {
      setActiveAgents(prev => {
        if (prev >= totalAgents) {
          clearInterval(interval);
          return totalAgents;
        }
        return prev + Math.floor(Math.random() * 8) + 4;
      });
    }, 50);

    return () => clearInterval(interval);
  }, [totalAgents]);

  return (
    <div
      ref={containerRef}
      className="min-h-screen bg-[#0a0a0a] text-[#00ff41] font-mono overflow-x-hidden relative"
    >
      {/* Scanline overlay */}
      <div className="pointer-events-none fixed inset-0 z-50 opacity-[0.03]"
           style={{
             backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,255,65,0.1) 2px, rgba(0,255,65,0.1) 4px)'
           }}
      />

      {/* Grid background */}
      <div className="pointer-events-none fixed inset-0 opacity-[0.08]"
           style={{
             backgroundImage: `
               linear-gradient(rgba(0,255,65,0.3) 1px, transparent 1px),
               linear-gradient(90deg, rgba(0,255,65,0.3) 1px, transparent 1px)
             `,
             backgroundSize: '50px 50px'
           }}
      />

      {/* Vignette */}
      <div className="pointer-events-none fixed inset-0 z-40"
           style={{
             background: 'radial-gradient(ellipse at center, transparent 0%, rgba(0,0,0,0.7) 100%)'
           }}
      />

      <div className="relative z-10 min-h-screen flex flex-col">
        <CommandHeader activeAgents={Math.min(activeAgents, totalAgents)} totalAgents={totalAgents} />

        <main className="flex-1 px-4 md:px-8 lg:px-12 py-6 md:py-8">
          <StatsPanel activeAgents={Math.min(activeAgents, totalAgents)} totalAgents={totalAgents} />
          <AgentGrid activeCount={Math.min(activeAgents, totalAgents)} totalAgents={totalAgents} />
        </main>

        <footer className="relative z-10 py-4 text-center">
          <p className="text-[10px] md:text-xs text-[#00ff41]/30 tracking-wider">
            Requested by <span className="text-[#00ff41]/50">@skyneet_</span> · Built by <span className="text-[#00ff41]/50">@clonkbot</span>
          </p>
        </footer>
      </div>
    </div>
  );
}

export default App;
