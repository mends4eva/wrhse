import React from 'react';
import { PageLayout } from '@/components/layout/PageLayout';
import { Card } from '@/components/ui/card';
import { Settings } from 'lucide-react';

export const Configuration: React.FC = () => {
  return (
    <PageLayout title="System Configuration" subtitle="Product, SKU, and pallet configuration">
      <Card className="glass-panel p-8 text-center">
        <Settings className="w-16 h-16 text-wms-cyan mx-auto mb-4" />
        <h3 className="font-display text-xl font-bold text-white mb-2">Configuration Module</h3>
        <p className="text-gray-400 font-mono text-sm">
          System configuration interface coming soon
        </p>
      </Card>
    </PageLayout>
  );
};
