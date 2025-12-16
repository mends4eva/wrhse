import React from 'react';
import { PageLayout } from '@/components/layout/PageLayout';
import { Card } from '@/components/ui/card';
import { Package } from 'lucide-react';

export const StockTaking: React.FC = () => {
  return (
    <PageLayout title="Stock Taking" subtitle="Inventory counting and verification">
      <Card className="glass-panel p-8 text-center">
        <Package className="w-16 h-16 text-wms-cyan mx-auto mb-4" />
        <h3 className="font-display text-xl font-bold text-white mb-2">Stock Taking Module</h3>
        <p className="text-gray-400 font-mono text-sm">
          Inventory counting interface coming soon
        </p>
      </Card>
    </PageLayout>
  );
};
