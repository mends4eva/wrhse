import React from 'react';
import { PageLayout } from '@/components/layout/PageLayout';
import { Card } from '@/components/ui/card';
import { Shield } from 'lucide-react';

export const Permissions: React.FC = () => {
  return (
    <PageLayout title="Permissions Management" subtitle="Grant and manage temporary access rights">
      <Card className="glass-panel p-8 text-center">
        <Shield className="w-16 h-16 text-wms-cyan mx-auto mb-4" />
        <h3 className="font-display text-xl font-bold text-white mb-2">Permissions Module</h3>
        <p className="text-gray-400 font-mono text-sm">
          Access management interface coming soon
        </p>
      </Card>
    </PageLayout>
  );
};
