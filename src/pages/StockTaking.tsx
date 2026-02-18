import React, { useState } from 'react';
import { PageLayout } from '@/components/layout/PageLayout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Package, Barcode, Plus, Check, Clock } from 'lucide-react';
import { StockCard } from '@/components/dashboard/StockCard';
import { StatCard } from '@/components/dashboard/StatCard';

interface StockItem {
  id: string;
  name: string;
  sku: string;
  quantity: number;
  counted: number;
  variance: number;
  status: 'pending' | 'counted' | 'verified';
}

export const StockTaking: React.FC = () => {
  const [items, setItems] = useState<StockItem[]>([
    { id: '1', name: 'Electronics Module A', sku: 'EL-001', quantity: 150, counted: 145, variance: -5, status: 'counted' },
    { id: '2', name: 'Hardware Kit B', sku: 'HW-002', quantity: 200, counted: 0, variance: 0, status: 'pending' },
    { id: '3', name: 'Apparel Section C', sku: 'AP-003', quantity: 320, counted: 325, variance: 5, status: 'verified' },
  ]);

  const completedCount = items.filter(i => i.status !== 'pending').length;
  const totalCount = items.length;

  return (
    <PageLayout title="Stock Count" subtitle="Inventory verification in progress">
      {/* Progress Stats */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        <StatCard
          title="Completed"
          value={completedCount}
          icon={<Check className="w-6 h-6" />}
          color="green"
          description={`of ${totalCount}`}
        />
        <StatCard
          title="In Progress"
          value={totalCount - completedCount}
          icon={<Clock className="w-6 h-6" />}
          color="amber"
          description="pending"
        />
      </div>

      {/* Stock Items */}
      <div className="space-y-4 mb-6">
        {items.map((item) => (
          <Card key={item.id} className="liquid-glass-sm p-4 md:p-6 border border-white/10 hover:border-white/20 transition-all">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <Barcode className="w-4 h-4 text-gray-500" />
                  <p className="text-xs font-mono text-gray-500">{item.sku}</p>
                </div>
                <h3 className="font-mono font-semibold text-white text-sm md:text-base">{item.name}</h3>
              </div>
              <span className={`text-xs font-mono font-bold px-3 py-1 rounded-lg whitespace-nowrap ml-2 ${
                item.status === 'pending' 
                  ? 'bg-wms-amber/10 text-wms-amber'
                  : item.status === 'counted'
                  ? 'bg-wms-cyan/10 text-wms-cyan'
                  : 'bg-wms-green/10 text-wms-green'
              }`}>
                {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
              </span>
            </div>

            <div className="grid grid-cols-3 gap-3 mb-4">
              <div className="bg-white/5 rounded-lg p-3">
                <p className="text-xs text-gray-500 font-mono mb-1">Expected</p>
                <p className="text-lg font-display font-bold text-white">{item.quantity}</p>
              </div>
              <div className="bg-white/5 rounded-lg p-3">
                <p className="text-xs text-gray-500 font-mono mb-1">Counted</p>
                <p className="text-lg font-display font-bold text-wms-cyan">{item.counted}</p>
              </div>
              <div className={`rounded-lg p-3 ${
                item.variance === 0 
                  ? 'bg-wms-green/10' 
                  : 'bg-wms-amber/10'
              }`}>
                <p className="text-xs text-gray-500 font-mono mb-1">Variance</p>
                <p className={`text-lg font-display font-bold ${
                  item.variance === 0 
                    ? 'text-wms-green' 
                    : item.variance > 0
                    ? 'text-wms-amber'
                    : 'text-red-400'
                }`}>
                  {item.variance > 0 ? '+' : ''}{item.variance}
                </p>
              </div>
            </div>

            {item.status === 'pending' && (
              <div className="flex gap-2">
                <Input 
                  type="number" 
                  placeholder="Enter count" 
                  className="bg-white/5 border-white/10 text-white placeholder:text-gray-500 text-sm"
                />
                <Button 
                  size="sm"
                  className="bg-wms-cyan/20 hover:bg-wms-cyan/30 text-wms-cyan border border-wms-cyan/30 whitespace-nowrap"
                >
                  <Check className="w-4 h-4" />
                </Button>
              </div>
            )}
          </Card>
        ))}
      </div>

      {/* Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Button className="py-6 font-mono font-semibold bg-wms-green/20 hover:bg-wms-green/30 text-wms-green border border-wms-green/30">
          <Check className="w-5 h-5 mr-2" />
          Submit Count
        </Button>
        <Button variant="outline" className="py-6 font-mono font-semibold border-white/20">
          <Plus className="w-5 h-5 mr-2" />
          Add Item
        </Button>
      </div>
    </PageLayout>
  );
};
