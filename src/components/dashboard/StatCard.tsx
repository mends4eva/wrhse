import React, { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  change?: string;
  trend?: 'up' | 'down';
  icon: React.ReactNode;
  color: 'cyan' | 'green' | 'amber';
  description?: string;
}

const colorConfig = {
  cyan: {
    text: 'text-wms-cyan',
    bg: 'from-wms-cyan/5 to-transparent',
    border: 'border-wms-cyan/30',
    icon: 'text-wms-cyan',
  },
  green: {
    text: 'text-wms-green',
    bg: 'from-wms-green/5 to-transparent',
    border: 'border-wms-green/30',
    icon: 'text-wms-green',
  },
  amber: {
    text: 'text-wms-amber',
    bg: 'from-wms-amber/5 to-transparent',
    border: 'border-wms-amber/30',
    icon: 'text-wms-amber',
  },
};

export const StatCard: React.FC<StatCardProps> = ({ 
  title, 
  value, 
  change, 
  trend, 
  icon, 
  color, 
  description 
}) => {
  const [displayValue, setDisplayValue] = useState(0);
  const config = colorConfig[color];
  
  // Parse numeric value for count-up effect
  useEffect(() => {
    if (typeof value === 'string') {
      setDisplayValue(0);
      return;
    }
    
    let interval: NodeJS.Timeout;
    let current = 0;
    const target = parseInt(value.toString());
    const increment = Math.ceil(target / 20);
    
    interval = setInterval(() => {
      current += increment;
      if (current >= target) {
        setDisplayValue(target);
        clearInterval(interval);
      } else {
        setDisplayValue(current);
      }
    }, 30);
    
    return () => clearInterval(interval);
  }, [value]);

  const displayedValue = typeof value === 'string' ? value : displayValue;

  return (
    <Card className={`liquid-glass p-6 md:p-8 border ${config.border} group overflow-hidden relative transition-all duration-300`}>
      {/* Background gradient accent */}
      <div className={`absolute inset-0 bg-gradient-to-br ${config.bg} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
      
      <div className="relative z-10">
        {/* Header with icon and trend */}
        <div className="flex items-start justify-between mb-6">
          <div className={`p-3 md:p-4 rounded-xl bg-${color === 'cyan' ? 'wms-cyan' : color === 'green' ? 'wms-green' : 'wms-amber'}/10 backdrop-blur-sm border border-${color === 'cyan' ? 'wms-cyan' : color === 'green' ? 'wms-green' : 'wms-amber'}/20 group-hover:glow-sm transition-all duration-200`}>
            <div className={config.icon}>
              {icon}
            </div>
          </div>
          {change && (
            <div className={`flex items-center gap-1 text-xs md:text-sm font-mono font-semibold px-3 py-1 rounded-lg ${
              trend === 'up' 
                ? 'bg-wms-green/10 text-wms-green border border-wms-green/30' 
                : 'bg-red-500/10 text-red-400 border border-red-500/30'
            }`}>
              {trend === 'up' ? <TrendingUp className="w-3 h-3 md:w-4 md:h-4" /> : <TrendingDown className="w-3 h-3 md:w-4 md:h-4" />}
              {change}
            </div>
          )}
        </div>

        {/* Value and title */}
        <div className="space-y-2">
          <p className="text-gray-400 text-xs md:text-sm font-mono font-medium uppercase tracking-wide">{title}</p>
          <p className={`text-3xl md:text-4xl font-display font-bold ${config.text}`}>
            {displayedValue}
          </p>
          {description && (
            <p className="text-gray-500 text-xs font-mono mt-2">{description}</p>
          )}
        </div>
      </div>
    </Card>
  );
};
