import React from 'react';
import { Card } from '@/components/ui/card';
import { AlertTriangle, CheckCircle } from 'lucide-react';

interface StockItemProps {
  name: string;
  current: number;
  capacity: number;
  status: 'critical' | 'low' | 'normal' | 'optimal';
  unit?: string;
}

interface StockCardProps {
  items: StockItemProps[];
  title?: string;
}

const getStatusConfig = (status: string) => {
  switch (status) {
    case 'critical':
      return { color: 'from-red-500', percent: 'bg-red-500', text: 'text-red-400', label: 'Critical' };
    case 'low':
      return { color: 'from-wms-amber', percent: 'bg-wms-amber', text: 'text-wms-amber', label: 'Low' };
    case 'normal':
      return { color: 'from-wms-cyan', percent: 'bg-wms-cyan', text: 'text-wms-cyan', label: 'Normal' };
    case 'optimal':
      return { color: 'from-wms-green', percent: 'bg-wms-green', text: 'text-wms-green', label: 'Optimal' };
    default:
      return { color: 'from-gray-400', percent: 'bg-gray-400', text: 'text-gray-400', label: 'Unknown' };
  }
};

export const StockCard: React.FC<StockCardProps> = ({ items, title = 'Stock Levels' }) => {
  return (
    <Card className="liquid-glass p-6 md:p-8 border-white/15">
      <h3 className="font-display text-xl md:text-2xl font-bold text-white mb-6">{title}</h3>
      
      <div className="space-y-5">
        {items.map((item, idx) => {
          const config = getStatusConfig(item.status);
          const percentage = (item.current / item.capacity) * 100;
          const Icon = item.status === 'critical' || item.status === 'low' ? AlertTriangle : CheckCircle;
          
          return (
            <div key={idx} className="group">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <Icon className={`w-4 h-4 md:w-5 md:h-5 ${config.text}`} />
                  <div>
                    <p className="text-gray-300 text-sm md:text-base font-mono font-semibold">{item.name}</p>
                    <p className="text-xs text-gray-500 font-mono">{item.current} / {item.capacity} {item.unit || 'units'}</p>
                  </div>
                </div>
                <span className={`text-xs font-mono font-bold px-3 py-1 rounded-lg bg-${config.text === 'text-red-400' ? 'red' : config.text === 'text-wms-amber' ? 'wms-amber' : config.text === 'text-wms-cyan' ? 'wms-cyan' : 'wms-green'}/10 ${config.text}`}>
                  {percentage.toFixed(0)}%
                </span>
              </div>
              
              {/* Progress bar */}
              <div className="h-2 rounded-full bg-white/5 overflow-hidden">
                <div 
                  className={`h-full bg-gradient-to-r ${config.color} opacity-80 transition-all duration-500 group-hover:opacity-100 rounded-full`}
                  style={{ width: `${percentage}%` }}
                ></div>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
};
