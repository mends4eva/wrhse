import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { PageLayout } from '@/components/layout/PageLayout';
import { Card } from '@/components/ui/card';
import { StatCard } from '@/components/dashboard/StatCard';
import { StockCard } from '@/components/dashboard/StockCard';
import { TaskCard } from '@/components/dashboard/TaskCard';
import { AnalyticsCard } from '@/components/dashboard/AnalyticsCard';
import { 
  Clock, 
  Users, 
  Package, 
  Truck,
  AlertTriangle,
  CheckCircle,
  TrendingUp
} from 'lucide-react';

export const Dashboard: React.FC = () => {
  const { user } = useAuth();

  const getSubtitle = () => {
    switch (user?.role) {
      case 'MAIN_MANAGER':
        return 'Real-time warehouse operations and analytics';
      case 'ASSISTANT_MANAGER':
        return 'Operational metrics and workflow management';
      case 'SUPERVISOR':
        return 'Team coordination and task oversight';
      case 'PERMANENT_STAFF':
        return 'Daily operations and assigned tasks';
      case 'INTERN':
        return 'Learning tasks and guided workflows';
      case 'SERVICE_PERSONNEL':
        return 'Service operations and assignments';
      default:
        return '';
    }
  };

  // Main Manager Dashboard
  if (user?.role === 'MAIN_MANAGER') {
    return (
      <PageLayout title="Warehouse Hub" subtitle={getSubtitle()}>
        {/* Key Metrics Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <StatCard
            title="Avg Turnaround"
            value={2.4}
            change="+12%"
            trend="up"
            icon={<Clock className="w-6 h-6" />}
            color="cyan"
            description="hours"
          />
          <StatCard
            title="Active Workers"
            value={24}
            change="+3"
            trend="up"
            icon={<Users className="w-6 h-6" />}
            color="green"
            description="on shift"
          />
          <StatCard
            title="Pending Orders"
            value={8}
            change="-2"
            trend="down"
            icon={<Package className="w-6 h-6" />}
            color="amber"
            description="picklists"
          />
          <StatCard
            title="In Transit"
            value={12}
            icon={<Truck className="w-6 h-6" />}
            color="cyan"
            description="vehicles"
          />
        </div>

        {/* Analytics Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <AnalyticsCard
            title="Warehouse Health"
            description="Real-time operational metrics"
            metrics={[
              { label: 'Efficiency', value: '94%', color: 'green', change: '+5%' },
              { label: 'Utilization', value: '87%', color: 'cyan' },
              { label: 'SLA Met', value: '98%', color: 'green' },
            ]}
          />
          <AnalyticsCard
            title="Stock Status"
            description="Inventory levels by zone"
            metrics={[
              { label: 'Bay A', value: '2,450', color: 'green' },
              { label: 'Bay B', value: '1,820', color: 'amber' },
              { label: 'Bay C', value: '890', color: 'cyan' },
            ]}
          />
        </div>

        {/* Stock & Tasks Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <StockCard
            title="Inventory Levels"
            items={[
              { name: 'Electronics', current: 450, capacity: 500, status: 'optimal', unit: 'units' },
              { name: 'Apparel', current: 320, capacity: 400, status: 'normal', unit: 'units' },
              { name: 'Hardware', current: 85, capacity: 200, status: 'low', unit: 'units' },
            ]}
          />
          <TaskCard
            title="Active Tasks"
            tasks={[
              { id: '1', title: 'Picklist #PL-2024-0156', status: 'completed', time: '5 min ago' },
              { id: '2', title: 'Stock count - Bay 3', status: 'pending', time: 'Now', priority: 'high' },
              { id: '3', title: 'Vehicle departure inspection', status: 'pending', priority: 'high' },
            ]}
          />
        </div>
      </PageLayout>
    );
  }

  // Supervisor Dashboard
  if (user?.role === 'SUPERVISOR') {
    return (
      <PageLayout title="Team Dashboard" subtitle={getSubtitle()}>
        {/* Team Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
          <StatCard
            title="Team Size"
            value={8}
            icon={<Users className="w-6 h-6" />}
            color="cyan"
            description="members"
          />
          <StatCard
            title="Tasks Pending"
            value={5}
            icon={<Package className="w-6 h-6" />}
            color="amber"
            description="awaiting"
          />
          <StatCard
            title="Completed"
            value={12}
            change="+4"
            trend="up"
            icon={<CheckCircle className="w-6 h-6" />}
            color="green"
            description="today"
          />
        </div>

        {/* Team Status */}
        <Card className="liquid-glass p-6 md:p-8 border-white/15 mb-6">
          <h3 className="font-display text-xl md:text-2xl font-bold text-white mb-6">Team Status</h3>
          <div className="space-y-4">
            {[
              { name: 'David Thompson', status: 'active', tasks: 3 },
              { name: 'Lisa Anderson', status: 'active', tasks: 2 },
              { name: 'Alex Kumar', status: 'break', tasks: 0 },
              { name: 'Maya Patel', status: 'active', tasks: 4 },
            ].map((member, i) => (
              <div key={i} className="flex items-center justify-between p-4 rounded-lg liquid-glass-sm border border-white/10 hover:border-white/20 transition-all">
                <div>
                  <p className="text-gray-300 font-mono font-semibold">{member.name}</p>
                  <p className="text-xs text-gray-500 font-mono">{member.tasks} tasks assigned</p>
                </div>
                <span className={`text-xs font-mono font-bold px-3 py-1 rounded-lg ${
                  member.status === 'active' 
                    ? 'bg-wms-green/10 text-wms-green' 
                    : 'bg-wms-amber/10 text-wms-amber'
                }`}>
                  {member.status.charAt(0).toUpperCase() + member.status.slice(1)}
                </span>
              </div>
            ))}
          </div>
        </Card>

        {/* Performance Metrics */}
        <AnalyticsCard
          title="Team Performance"
          metrics={[
            { label: 'Avg Productivity', value: '92%', color: 'green', change: '+3%' },
            { label: 'On-time Rate', value: '96%', color: 'cyan' },
            { label: 'Quality Score', value: '94%', color: 'green' },
          ]}
        />
      </PageLayout>
    );
  }

  // Worker Dashboard
  return (
    <PageLayout title="My Shift" subtitle={getSubtitle()}>
      {/* Shift Stats */}
      <div className="grid grid-cols-2 md:grid-cols-2 gap-4 mb-8">
        <StatCard
          title="Completed"
          value={6}
          icon={<CheckCircle className="w-6 h-6" />}
          color="green"
          description="tasks today"
        />
        <StatCard
          title="Pending"
          value={2}
          icon={<Clock className="w-6 h-6" />}
          color="amber"
          description="in queue"
        />
      </div>

      {/* Today's Tasks */}
      <TaskCard
        title="Today's Tasks"
        tasks={[
          { 
            id: '1', 
            title: 'Complete turnaround entry', 
            status: 'pending',
            time: 'Next',
            priority: 'high'
          },
          { 
            id: '2', 
            title: 'Accept picklist #PL-2024-0157', 
            status: 'pending',
            priority: 'high'
          },
          { 
            id: '3', 
            title: 'Submit attendance record', 
            status: 'completed',
            time: '30 min ago'
          },
        ]}
      />

      {/* Performance Summary */}
      <div className="mt-6">
        <AnalyticsCard
          title="Today's Performance"
          metrics={[
            { label: 'Tasks Done', value: '6', color: 'green' },
            { label: 'Accuracy', value: '100%', color: 'cyan' },
            { label: 'Efficiency', value: '88%', color: 'amber' },
          ]}
        />
      </div>
    </PageLayout>
  );
};
