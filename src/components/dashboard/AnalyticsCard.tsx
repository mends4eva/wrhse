import React from 'react';
import { Card } from '@/components/ui/card';

interface AnalyticsMetric {
  label: string;
  value: string | number;
  color: 'cyan' | 'green' | 'amber';
  change?: string;
}

interface AnalyticsCardProps {
  title: string;
  metrics: AnalyticsMetric[];
  description?: string;
}

const colorConfig = {
  cyan: 'border-wms-cyan/30 text-wms-cyan',
  green: 'border-wms-green/30 text-wms-green',
  amber: 'border-wms-amber/30 text-wms-amber',
};

export const AnalyticsCard: React.FC<AnalyticsCardProps> = ({ title, metrics, description }) => {
  return (
    <Card className="liquid-glass p-6 md:p-8 border-white/15">
      <div className="flex items-start justify-between mb-6">
        <div>
          <h3 className="font-display text-xl md:text-2xl font-bold text-white">{title}</h3>
          {description && (
            <p className="text-xs text-gray-400 font-mono mt-2">{description}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {metrics.map((metric, idx) => (
          <div 
            key={idx} 
            className={`p-4 rounded-lg liquid-glass-sm border ${colorConfig[metric.color]} group hover:shadow-lg transition-all duration-200`}
          >
            <p className="text-xs text-gray-400 font-mono mb-2 uppercase tracking-wide">{metric.label}</p>
            <p className={`text-2xl font-display font-bold group-hover:glow-sm transition-all`}>
              {metric.value}
            </p>
            {metric.change && (
              <p className="text-xs text-wms-green font-mono mt-2">↑ {metric.change}</p>
            )}
          </div>
        ))}
      </div>
    </Card>
  );
};
