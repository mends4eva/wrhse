import React from 'react';
import { PageLayout } from '@/components/layout/PageLayout';
import { Card } from '@/components/ui/card';
import { AnalyticsCard } from '@/components/dashboard/AnalyticsCard';
import { TrendingUp, Clock, Users, Package, AlertTriangle, CheckCircle, TrendingDown } from 'lucide-react';

export const KPIAnalytics: React.FC = () => {
  const kpiMetrics = [
    { label: 'Avg Turnaround', value: '2.4h', change: '+12%', icon: Clock, color: 'cyan' },
    { label: 'Efficiency', value: '94%', change: '+5%', icon: Users, color: 'green' },
    { label: 'Accuracy', value: '98.2%', change: '-1%', icon: Package, color: 'amber' },
    { label: 'Utilization', value: '87%', change: '+8%', icon: TrendingUp, color: 'cyan' },
  ];

  return (
    <PageLayout title="Analytics" subtitle="Real-time warehouse performance metrics">
      <div className="space-y-6">
        {/* Key Metrics Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          {kpiMetrics.map((kpi, i) => {
            const Icon = kpi.icon;
            const isPositive = kpi.change.startsWith('+');
            return (
              <Card key={i} className="liquid-glass p-4 md:p-6 border-white/15 group">
                <div className="flex items-start justify-between mb-4">
                  <div className={`p-2 md:p-3 rounded-lg bg-${
                    kpi.color === 'cyan' ? 'wms-cyan' : 
                    kpi.color === 'green' ? 'wms-green' : 'wms-amber'
                  }/10 group-hover:glow-sm transition-all`}>
                    <Icon className={`w-5 h-5 md:w-6 md:h-6 text-wms-${kpi.color}`} />
                  </div>
                  <span className={`text-xs md:text-sm font-mono font-semibold px-2 py-1 rounded ${
                    isPositive 
                      ? 'bg-wms-green/10 text-wms-green' 
                      : 'bg-red-500/10 text-red-400'
                  }`}>
                    {kpi.change}
                  </span>
                </div>
                <p className="text-gray-400 text-xs md:text-sm font-mono mb-2 uppercase tracking-wide">{kpi.label}</p>
                <p className={`text-2xl md:text-3xl font-display font-bold text-wms-${kpi.color}`}>{kpi.value}</p>
              </Card>
            );
          })}
        </div>

        {/* Analytics Dashboard */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Trends Card */}
          <Card className="liquid-glass p-6 md:p-8 border-white/15">
            <h3 className="font-display text-lg md:text-2xl font-bold text-white mb-6">Performance Trends</h3>
            <div className="space-y-4">
              <div className="p-4 rounded-lg liquid-glass-sm border border-white/10">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-mono text-gray-300">Last 24h Turnaround</span>
                  <span className="text-xs font-mono text-wms-green">↑ 8%</span>
                </div>
                <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-wms-cyan to-wms-green w-[72%]"></div>
                </div>
              </div>
              
              <div className="p-4 rounded-lg liquid-glass-sm border border-white/10">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-mono text-gray-300">Worker Efficiency</span>
                  <span className="text-xs font-mono text-wms-amber">↓ 3%</span>
                </div>
                <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-wms-amber to-wms-green w-[94%]"></div>
                </div>
              </div>

              <div className="p-4 rounded-lg liquid-glass-sm border border-white/10">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-mono text-gray-300">Inventory Accuracy</span>
                  <span className="text-xs font-mono text-wms-green">↑ 0.1%</span>
                </div>
                <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-wms-green opacity-90 w-[98%]"></div>
                </div>
              </div>
            </div>
          </Card>

          {/* Alerts Card */}
          <Card className="liquid-glass p-6 md:p-8 border-white/15">
            <h3 className="font-display text-lg md:text-2xl font-bold text-white mb-6">System Alerts</h3>
            <div className="space-y-3">
              {[
                { icon: AlertTriangle, message: 'Bay 3 efficiency below target', severity: 'warning', time: '5 min ago' },
                { icon: Package, message: 'Inventory variance in Zone B', severity: 'alert', time: '12 min ago' },
                { icon: CheckCircle, message: 'All tasks completed on time', severity: 'success', time: '25 min ago' },
              ].map((alert, i) => {
                const AlertIcon = alert.icon;
                return (
                  <div key={i} className="flex items-start gap-3 p-4 rounded-lg liquid-glass-sm border border-white/10 hover:border-white/20 transition-all">
                    <div className={`p-2 rounded-lg flex-shrink-0 mt-0.5 ${
                      alert.severity === 'warning' 
                        ? 'bg-wms-amber/10' 
                        : alert.severity === 'alert'
                        ? 'bg-red-500/10'
                        : 'bg-wms-green/10'
                    }`}>
                      <AlertIcon className={`w-4 h-4 md:w-5 md:h-5 ${
                        alert.severity === 'warning' 
                          ? 'text-wms-amber' 
                          : alert.severity === 'alert'
                          ? 'text-red-400'
                          : 'text-wms-green'
                      }`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm md:text-base font-mono text-gray-300">{alert.message}</p>
                      <p className="text-xs text-gray-500 font-mono mt-1">{alert.time}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>
        </div>

        {/* Summary Metrics */}
        <AnalyticsCard
          title="Daily Summary"
          description="End-of-day operational snapshot"
          metrics={[
            { label: 'Orders Processed', value: '284', color: 'cyan', change: '+12' },
            { label: 'Avg Time/Order', value: '8.4m', color: 'amber' },
            { label: 'Error Rate', value: '0.3%', color: 'green' },
          ]}
        />
      </div>
    </PageLayout>
  );
};
