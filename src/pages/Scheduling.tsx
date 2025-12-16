import React from 'react';
import { PageLayout } from '@/components/layout/PageLayout';
import { Card } from '@/components/ui/card';
import { Calendar } from 'lucide-react';

export const Scheduling: React.FC = () => {
  return (
    <PageLayout title="Scheduling" subtitle="Create and manage worker schedules">
      <Card className="glass-panel p-8 text-center">
        <Calendar className="w-16 h-16 text-wms-cyan mx-auto mb-4" />
        <h3 className="font-display text-xl font-bold text-white mb-2">Scheduling Module</h3>
        <p className="text-gray-400 font-mono text-sm">
          Landscape-mode schedule creation interface coming soon
        </p>
      </Card>
    </PageLayout>
  );
};
