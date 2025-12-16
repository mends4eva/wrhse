import React from 'react';
import { PageLayout } from '@/components/layout/PageLayout';
import { Card } from '@/components/ui/card';
import { UserCheck } from 'lucide-react';

export const Attendance: React.FC = () => {
  return (
    <PageLayout title="Attendance" subtitle="Submit and track attendance records">
      <Card className="glass-panel p-8 text-center">
        <UserCheck className="w-16 h-16 text-wms-cyan mx-auto mb-4" />
        <h3 className="font-display text-xl font-bold text-white mb-2">Attendance Module</h3>
        <p className="text-gray-400 font-mono text-sm">
          Attendance submission interface coming soon
        </p>
      </Card>
    </PageLayout>
  );
};
