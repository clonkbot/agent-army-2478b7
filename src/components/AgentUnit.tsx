import { useState, useEffect, memo } from 'react';

interface Agent {
  id: string;
  type: string;
  status: string;
  power: number;
}

interface AgentUnitProps {
  agent: Agent;
  isActive: boolean;
  index: number;
}

const statusColors: Record<string, string> = {
  READY: '#00ff41',
  ACTIVE: '#00d4ff',
  STANDBY: '#ffaa00',
  PROCESSING: '#ff6b35',
};

function AgentUnit({ agent, isActive, index }: AgentUnitProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [pulse, setPulse] = useState(false);

  useEffect(() => {
    if (!isActive) return;

    const interval = setInterval(() => {
      if (Math.random() > 0.7) {
        setPulse(true);
        setTimeout(() => setPulse(false), 200);
      }
    }, 2000 + Math.random() * 3000);

    return () => clearInterval(interval);
  }, [isActive]);

  const color = statusColors[agent.status] || '#00ff41';
  const delay = (index % 32) * 20;

  return (
    <div
      className="relative group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={() => setIsHovered(true)}
      onTouchEnd={() => setTimeout(() => setIsHovered(false), 1500)}
    >
      <div
        className={`
          aspect-square border transition-all duration-300 cursor-pointer relative overflow-hidden
          ${isActive
            ? 'border-[#00ff41]/40 bg-[#00ff41]/10'
            : 'border-[#00ff41]/10 bg-transparent'
          }
          ${isHovered && isActive ? 'scale-110 z-20 border-[#00ff41]' : ''}
          ${pulse ? 'bg-[#00ff41]/30' : ''}
        `}
        style={{
          animationDelay: `${delay}ms`,
          boxShadow: isActive && isHovered
            ? `0 0 20px ${color}40, inset 0 0 15px ${color}20`
            : isActive
              ? `0 0 5px ${color}20`
              : 'none'
        }}
      >
        {/* Agent icon - simple geometric representation */}
        {isActive && (
          <>
            {/* Core indicator */}
            <div
              className="absolute inset-0 flex items-center justify-center"
            >
              <div
                className={`w-1.5 h-1.5 md:w-2 md:h-2 rounded-full ${pulse ? 'scale-150' : ''} transition-transform`}
                style={{
                  backgroundColor: color,
                  boxShadow: `0 0 8px ${color}`,
                }}
              />
            </div>

            {/* Corner brackets */}
            <div className="absolute top-0 left-0 w-1 h-1 border-t border-l" style={{ borderColor: color }} />
            <div className="absolute top-0 right-0 w-1 h-1 border-t border-r" style={{ borderColor: color }} />
            <div className="absolute bottom-0 left-0 w-1 h-1 border-b border-l" style={{ borderColor: color }} />
            <div className="absolute bottom-0 right-0 w-1 h-1 border-b border-r" style={{ borderColor: color }} />
          </>
        )}
      </div>

      {/* Hover tooltip */}
      {isHovered && isActive && (
        <div
          className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 z-30 pointer-events-none"
          style={{ minWidth: '140px' }}
        >
          <div
            className="bg-[#0a0a0a] border border-[#00ff41]/50 p-2 md:p-3 text-[8px] md:text-[10px]"
            style={{ boxShadow: '0 0 20px rgba(0,255,65,0.3)' }}
          >
            {/* Tooltip header */}
            <div className="flex items-center justify-between mb-2 pb-1 border-b border-[#00ff41]/30">
              <span className="font-bold tracking-wider">{agent.id}</span>
              <span
                className="px-1.5 py-0.5 text-[7px] md:text-[8px] tracking-wider"
                style={{ backgroundColor: color + '30', color }}
              >
                {agent.status}
              </span>
            </div>

            {/* Stats */}
            <div className="space-y-1 text-[#00ff41]/70">
              <div className="flex justify-between">
                <span>TYPE:</span>
                <span className="text-[#00ff41]">{agent.type}</span>
              </div>
              <div className="flex justify-between">
                <span>POWER:</span>
                <span className="text-[#00ff41]">{agent.power}%</span>
              </div>
              <div className="flex justify-between">
                <span>UPTIME:</span>
                <span className="text-[#00ff41]">{Math.floor(Math.random() * 99) + 1}h</span>
              </div>
            </div>

            {/* Power bar */}
            <div className="mt-2 h-1 bg-[#00ff41]/20">
              <div
                className="h-full transition-all"
                style={{ width: `${agent.power}%`, backgroundColor: color }}
              />
            </div>
          </div>

          {/* Arrow */}
          <div
            className="absolute left-1/2 -translate-x-1/2 w-2 h-2 rotate-45 bg-[#0a0a0a] border-b border-r border-[#00ff41]/50"
            style={{ bottom: '-5px' }}
          />
        </div>
      )}
    </div>
  );
}

export default memo(AgentUnit);
