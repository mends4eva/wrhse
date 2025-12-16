import React, { useState } from 'react';
import { PageLayout } from '@/components/layout/PageLayout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ClipboardList, CheckCircle, Clock, User } from 'lucide-react';

interface Picklist {
  id: string;
  number: string;
  status: 'pending' | 'accepted' | 'adjusted' | 'completed';
  items: number;
  assignedTo?: string;
  createdAt: string;
}

const MOCK_PICKLISTS: Picklist[] = [
  { id: '1', number: 'PL-2024-0156', status: 'completed', items: 24, assignedTo: 'WRK001', createdAt: '2024-01-14 08:30' },
  { id: '2', number: 'PL-2024-0157', status: 'adjusted', items: 18, assignedTo: 'WRK002', createdAt: '2024-01-14 09:15' },
  { id: '3', number: 'PL-2024-0158', status: 'accepted', items: 32, assignedTo: 'WRK001', createdAt: '2024-01-14 10:00' },
  { id: '4', number: 'PL-2024-0159', status: 'pending', items: 15, createdAt: '2024-01-14 10:45' },
];

export const PicklistManagement: React.FC = () => {
  const [picklists] = useState<Picklist[]>(MOCK_PICKLISTS);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-wms-green/20 text-wms-green border-wms-green/30';
      case 'adjusted': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'accepted': return 'bg-wms-cyan/20 text-wms-cyan border-wms-cyan/30';
      default: return 'bg-wms-amber/20 text-wms-amber border-wms-amber/30';
    }
  };

  return (
    <PageLayout title="Picklist Management" subtitle="Track and manage warehouse picklists">
      <div className="space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[
            { label: 'Total Today', value: '12', color: 'cyan' },
            { label: 'Pending', value: '3', color: 'amber' },
            { label: 'In Progress', value: '5', color: 'blue' },
            { label: 'Completed', value: '4', color: 'green' },
          ].map((stat, i) => (
            <Card key={i} className="glass-panel p-4">
              <p className="text-gray-400 text-xs font-mono mb-1">{stat.label}</p>
              <p className={`text-2xl font-display font-bold text-wms-${stat.color}`}>{stat.value}</p>
            </Card>
          ))}
        </div>

        {/* Picklist List */}
        <Card className="glass-panel p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-display text-xl font-bold text-white">Active Picklists</h3>
            <Button className="bg-wms-cyan hover:bg-wms-cyan/90 text-wms-bg font-mono">
              Create New Picklist
            </Button>
          </div>

          <div className="space-y-3">
            {picklists.map((picklist) => (
              <div
                key={picklist.id}
                className="flex items-center justify-between p-4 rounded-lg bg-wms-bg/30 hover:bg-wms-bg/50 transition-all duration-200 border border-white/5"
              >
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-lg bg-wms-cyan/10">
                    <ClipboardList className="w-6 h-6 text-wms-cyan" />
                  </div>
                  <div>
                    <p className="font-mono font-semibold text-white">{picklist.number}</p>
                    <div className="flex items-center gap-3 mt-1">
                      <span className="text-gray-400 text-xs font-mono">{picklist.items} items</span>
                      {picklist.assignedTo && (
                        <span className="text-gray-400 text-xs font-mono flex items-center gap-1">
                          <User className="w-3 h-3" />
                          {picklist.assignedTo}
                        </span>
                      )}
                      <span className="text-gray-500 text-xs font-mono flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {picklist.createdAt}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Badge className={`${getStatusColor(picklist.status)} font-mono text-xs px-3 py-1`}>
                    {picklist.status.toUpperCase()}
                  </Badge>
                  <Button variant="ghost" size="sm" className="text-wms-cyan hover:text-wms-cyan/80 font-mono">
                    View Details
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </PageLayout>
  );
};
