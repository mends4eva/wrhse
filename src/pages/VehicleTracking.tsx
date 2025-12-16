import React from 'react';
import { PageLayout } from '@/components/layout/PageLayout';
import { Card } from '@/components/ui/card';
import { Truck } from 'lucide-react';

export const VehicleTracking: React.FC = () => {
  return (
    <PageLayout title="Vehicle Tracking" subtitle="Monitor loaded vehicles and waybills">
      <Card className="glass-panel p-8 text-center">
        <Truck className="w-16 h-16 text-wms-cyan mx-auto mb-4" />
        <h3 className="font-display text-xl font-bold text-white mb-2">Vehicle Tracking Module</h3>
        <p className="text-gray-400 font-mono text-sm">
          Vehicle tracking interface coming soon
        </p>
      </Card>
    </PageLayout>
  );
};
