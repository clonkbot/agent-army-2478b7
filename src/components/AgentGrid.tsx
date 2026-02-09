import { useMemo } from 'react';
import AgentUnit from './AgentUnit';

interface AgentGridProps {
  activeCount: number;
  totalAgents: number;
}

const AGENT_TYPES = [
  'SCOUT', 'ANALYST', 'GUARD', 'OPERATOR', 'CIPHER', 'PROBE', 'SENTINEL', 'WRAITH'
] as const;

const AGENT_STATUSES = ['READY', 'ACTIVE', 'STANDBY', 'PROCESSING'] as const;

export default function AgentGrid({ activeCount, totalAgents }: AgentGridProps) {
  const agents = useMemo(() => {
    return Array.from({ length: totalAgents }, (_, i) => ({
      id: `AG-${String(i + 1).padStart(4, '0')}`,
      type: AGENT_TYPES[Math.floor(Math.random() * AGENT_TYPES.length)],
      status: AGENT_STATUSES[Math.floor(Math.random() * AGENT_STATUSES.length)],
      power: Math.floor(Math.random() * 30) + 70,
    }));
  }, [totalAgents]);

  return (
    <div className="relative">
      {/* Section header */}
      <div className="flex items-center gap-4 mb-4 md:mb-6">
        <div className="text-[10px] md:text-xs tracking-[0.3em] text-[#00ff41]/40 uppercase">Agent Registry</div>
        <div className="flex-1 h-px bg-gradient-to-r from-[#00ff41]/30 to-transparent" />
        <div className="text-[10px] md:text-xs text-[#00ff41]/40">
          <span className="text-[#00ff41]">{activeCount}</span> / {totalAgents} UNITS
        </div>
      </div>

      {/* Agent grid */}
      <div className="grid grid-cols-4 sm:grid-cols-8 md:grid-cols-12 lg:grid-cols-16 gap-1 md:gap-2">
        {agents.map((agent, index) => (
          <AgentUnit
            key={agent.id}
            agent={agent}
            isActive={index < activeCount}
            index={index}
          />
        ))}
      </div>

      {/* Legend */}
      <div className="mt-6 md:mt-8 flex flex-wrap items-center justify-center gap-4 md:gap-6 text-[9px] md:text-[10px] tracking-wider text-[#00ff41]/50">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 md:w-3 md:h-3 bg-[#00ff41] animate-pulse" />
          <span>READY</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 md:w-3 md:h-3 bg-cyan-400" />
          <span>ACTIVE</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 md:w-3 md:h-3 bg-amber-400" />
          <span>STANDBY</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 md:w-3 md:h-3 bg-[#00ff41]/30" />
          <span>OFFLINE</span>
        </div>
      </div>
    </div>
  );
}
