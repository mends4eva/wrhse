import React from 'react';
import { PageLayout } from '@/components/layout/PageLayout';
import { Card } from '@/components/ui/card';
import { TrendingUp, Clock, Users, Package, AlertTriangle } from 'lucide-react';

export const KPIAnalytics: React.FC = () => {
  return (
    <PageLayout title="KPI Analytics" subtitle="Comprehensive operational metrics and performance indicators">
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { label: 'Avg Turnaround', value: '2.4h', change: '+12%', icon: Clock, color: 'cyan' },
            { label: 'Worker Efficiency', value: '94%', change: '+5%', icon: Users, color: 'green' },
            { label: 'Inventory Accuracy', value: '98.2%', change: '-1%', icon: Package, color: 'amber' },
            { label: 'Bay Utilization', value: '87%', change: '+8%', icon: TrendingUp, color: 'cyan' },
          ].map((kpi, i) => (
            <Card key={i} className={`glass-panel p-6 border-wms-${kpi.color}/30`}>
              <div className="flex items-center justify-between mb-4">
                <kpi.icon className={`w-8 h-8 text-wms-${kpi.color}`} />
                <span className={`text-sm font-mono ${kpi.change.startsWith('+') ? 'text-wms-green' : 'text-red-400'}`}>
                  {kpi.change}
                </span>
              </div>
              <p className="text-gray-400 text-xs font-mono mb-1">{kpi.label}</p>
              <p className={`text-3xl font-display font-bold text-wms-${kpi.color}`}>{kpi.value}</p>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="glass-panel p-6">
            <h3 className="font-display text-xl font-bold text-white mb-4">Turnaround Trends</h3>
            <div className="h-64 flex items-center justify-center text-gray-500 font-mono text-sm">
              Chart visualization would appear here
            </div>
          </Card>

          <Card className="glass-panel p-6">
            <h3 className="font-display text-xl font-bold text-white mb-4">Performance Alerts</h3>
            <div className="space-y-3">
              {[
                { message: 'Bay 3 efficiency below target', severity: 'warning' },
                { message: 'Inventory variance detected', severity: 'alert' },
                { message: 'Worker WRK003 overtime threshold', severity: 'info' },
              ].map((alert, i) => (
                <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-wms-bg/30">
                  <AlertTriangle className={`w-5 h-5 ${alert.severity === 'warning' ? 'text-wms-amber' : 'text-wms-cyan'}`} />
                  <span className="text-gray-300 font-mono text-sm">{alert.message}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </PageLayout>
  );
};
