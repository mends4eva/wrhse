import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { PageLayout } from '@/components/layout/PageLayout';
import { Card } from '@/components/ui/card';
import { 
  TrendingUp, 
  TrendingDown, 
  Clock, 
  Users, 
  Package, 
  Truck,
  AlertTriangle,
  CheckCircle
} from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  change?: string;
  trend?: 'up' | 'down';
  icon: React.ReactNode;
  color: 'cyan' | 'green' | 'amber';
}

const StatCard: React.FC<StatCardProps> = ({ title, value, change, trend, icon, color }) => {
  const colorClasses = {
    cyan: 'text-wms-cyan border-wms-cyan/30',
    green: 'text-wms-green border-wms-green/30',
    amber: 'text-wms-amber border-wms-amber/30',
  };

  return (
    <Card className={`glass-panel p-6 border ${colorClasses[color]}`}>
      <div className="flex items-start justify-between mb-4">
        <div className={`p-3 rounded-lg bg-${color === 'cyan' ? 'wms-cyan' : color === 'green' ? 'wms-green' : 'wms-amber'}/10`}>
          {icon}
        </div>
        {change && (
          <div className={`flex items-center gap-1 text-sm font-mono ${trend === 'up' ? 'text-wms-green' : 'text-red-400'}`}>
            {trend === 'up' ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
            {change}
          </div>
        )}
      </div>
      <div className="space-y-1">
        <p className="text-gray-400 text-sm font-mono">{title}</p>
        <p className={`text-3xl font-display font-bold ${colorClasses[color].split(' ')[0]}`}>
          {value}
        </p>
      </div>
    </Card>
  );
};

export const Dashboard: React.FC = () => {
  const { user } = useAuth();

  const getSubtitle = () => {
    switch (user?.role) {
      case 'MAIN_MANAGER':
        return 'Complete operational overview and system control';
      case 'ASSISTANT_MANAGER':
        return 'Operational metrics and workflow management';
      case 'SUPERVISOR':
        return 'Team coordination and task oversight';
      case 'PERMANENT_STAFF':
        return 'Daily operations and task management';
      case 'INTERN':
        return 'Guided workflows and learning tasks';
      case 'SERVICE_PERSONNEL':
        return 'Assigned tasks and service operations';
      default:
        return '';
    }
  };

  // Main Manager Dashboard
  if (user?.role === 'MAIN_MANAGER') {
    return (
      <PageLayout title="Command Center" subtitle={getSubtitle()}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Avg Turnaround Time"
            value="2.4h"
            change="+12%"
            trend="up"
            icon={<Clock className="w-6 h-6 text-wms-cyan" />}
            color="cyan"
          />
          <StatCard
            title="Active Workers"
            value="24"
            change="+3"
            trend="up"
            icon={<Users className="w-6 h-6 text-wms-green" />}
            color="green"
          />
          <StatCard
            title="Pending Picklists"
            value="8"
            change="-2"
            trend="down"
            icon={<Package className="w-6 h-6 text-wms-amber" />}
            color="amber"
          />
          <StatCard
            title="Vehicles in Transit"
            value="12"
            icon={<Truck className="w-6 h-6 text-wms-cyan" />}
            color="cyan"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Activity */}
          <Card className="glass-panel p-6">
            <h3 className="font-display text-xl font-bold text-white mb-4">Recent Activity</h3>
            <div className="space-y-3">
              {[
                { type: 'success', message: 'Picklist #PL-2024-0156 completed', time: '5 min ago' },
                { type: 'warning', message: 'Inventory variance detected in Bay 3', time: '12 min ago' },
                { type: 'success', message: 'Turnaround entry submitted by WRK001', time: '18 min ago' },
                { type: 'info', message: 'Schedule created for 2024-01-15', time: '25 min ago' },
              ].map((activity, i) => (
                <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-wms-bg/30">
                  {activity.type === 'success' && <CheckCircle className="w-5 h-5 text-wms-green flex-shrink-0 mt-0.5" />}
                  {activity.type === 'warning' && <AlertTriangle className="w-5 h-5 text-wms-amber flex-shrink-0 mt-0.5" />}
                  {activity.type === 'info' && <Clock className="w-5 h-5 text-wms-cyan flex-shrink-0 mt-0.5" />}
                  <div className="flex-1 min-w-0">
                    <p className="text-gray-300 text-sm font-mono">{activity.message}</p>
                    <p className="text-gray-500 text-xs font-mono mt-1">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Quick Actions */}
          <Card className="glass-panel p-6">
            <h3 className="font-display text-xl font-bold text-white mb-4">Quick Actions</h3>
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: 'View KPIs', path: '/kpi', color: 'cyan' },
                { label: 'Grant Access', path: '/permissions', color: 'amber' },
                { label: 'Track Vehicles', path: '/vehicles', color: 'green' },
                { label: 'Configuration', path: '/configuration', color: 'cyan' },
              ].map((action, i) => (
                <button
                  key={i}
                  className={`p-4 rounded-lg bg-wms-${action.color}/10 border border-wms-${action.color}/30 hover:bg-wms-${action.color}/20 transition-all duration-200 text-wms-${action.color} font-mono text-sm font-semibold`}
                >
                  {action.label}
                </button>
              ))}
            </div>
          </Card>
        </div>
      </PageLayout>
    );
  }

  // Supervisor Dashboard
  if (user?.role === 'SUPERVISOR') {
    return (
      <PageLayout title="Supervisor Dashboard" subtitle={getSubtitle()}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <StatCard
            title="Team Members"
            value="8"
            icon={<Users className="w-6 h-6 text-wms-cyan" />}
            color="cyan"
          />
          <StatCard
            title="Pending Tasks"
            value="5"
            icon={<Package className="w-6 h-6 text-wms-amber" />}
            color="amber"
          />
          <StatCard
            title="Completed Today"
            value="12"
            change="+4"
            trend="up"
            icon={<CheckCircle className="w-6 h-6 text-wms-green" />}
            color="green"
          />
        </div>

        <Card className="glass-panel p-6">
          <h3 className="font-display text-xl font-bold text-white mb-4">Team Status</h3>
          <div className="space-y-3">
            {['David Thompson', 'Lisa Anderson', 'Alex Kumar', 'Maya Patel'].map((name, i) => (
              <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-wms-bg/30">
                <span className="text-gray-300 font-mono text-sm">{name}</span>
                <span className="text-wms-green text-xs font-mono">Active</span>
              </div>
            ))}
          </div>
        </Card>
      </PageLayout>
    );
  }

  // Worker Dashboard
  return (
    <PageLayout title="My Dashboard" subtitle={getSubtitle()}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <StatCard
          title="Tasks Completed Today"
          value="6"
          icon={<CheckCircle className="w-6 h-6 text-wms-green" />}
          color="green"
        />
        <StatCard
          title="Pending Tasks"
          value="2"
          icon={<Clock className="w-6 h-6 text-wms-amber" />}
          color="amber"
        />
      </div>

      <Card className="glass-panel p-6">
        <h3 className="font-display text-xl font-bold text-white mb-4">Today's Tasks</h3>
        <div className="space-y-3">
          {[
            { task: 'Complete turnaround entry', status: 'pending' },
            { task: 'Accept picklist #PL-2024-0157', status: 'pending' },
            { task: 'Submit attendance record', status: 'completed' },
          ].map((item, i) => (
            <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-wms-bg/30">
              <span className="text-gray-300 font-mono text-sm">{item.task}</span>
              <span className={`text-xs font-mono ${item.status === 'completed' ? 'text-wms-green' : 'text-wms-amber'}`}>
                {item.status}
              </span>
            </div>
          ))}
        </div>
      </Card>
    </PageLayout>
  );
};
