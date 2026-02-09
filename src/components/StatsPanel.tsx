import { useEffect, useState } from 'react';

interface StatsPanelProps {
  activeAgents: number;
  totalAgents: number;
}

interface Stat {
  label: string;
  value: string | number;
  suffix?: string;
  color?: string;
}

export default function StatsPanel({ activeAgents, totalAgents }: StatsPanelProps) {
  const [cpuLoad, setCpuLoad] = useState(0);
  const [memUsage, setMemUsage] = useState(0);
  const [networkIO, setNetworkIO] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCpuLoad(Math.floor(Math.random() * 20) + 75);
      setMemUsage(Math.floor(Math.random() * 15) + 60);
      setNetworkIO(Math.floor(Math.random() * 500) + 1200);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const stats: Stat[] = [
    { label: 'UNITS ONLINE', value: activeAgents, suffix: `/ ${totalAgents}` },
    { label: 'CPU LOAD', value: cpuLoad, suffix: '%', color: cpuLoad > 90 ? '#ff6b35' : undefined },
    { label: 'MEMORY', value: memUsage, suffix: '%' },
    { label: 'NET I/O', value: networkIO, suffix: ' MB/s' },
    { label: 'THREAT LVL', value: 'LOW', color: '#00ff41' },
    { label: 'SYNC RATE', value: '99.7', suffix: '%' },
  ];

  return (
    <div className="mb-6 md:mb-8">
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 md:gap-4">
        {stats.map((stat, i) => (
          <div
            key={stat.label}
            className="border border-[#00ff41]/20 bg-[#00ff41]/5 p-3 md:p-4 relative overflow-hidden group hover:border-[#00ff41]/50 transition-colors"
            style={{ animationDelay: `${i * 100}ms` }}
          >
            {/* Corner accents */}
            <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-[#00ff41]/50" />
            <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-[#00ff41]/50" />
            <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-[#00ff41]/50" />
            <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-[#00ff41]/50" />

            <div className="text-[8px] md:text-[10px] tracking-wider text-[#00ff41]/50 mb-1">{stat.label}</div>
            <div
              className="text-lg md:text-2xl font-bold"
              style={{ fontFamily: 'Orbitron, monospace', color: stat.color || '#00ff41' }}
            >
              {stat.value}
              <span className="text-[10px] md:text-xs text-[#00ff41]/40">{stat.suffix}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
