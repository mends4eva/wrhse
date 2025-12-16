import React, { useState } from 'react';
import { PageLayout } from '@/components/layout/PageLayout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Handshake as HandshakeIcon, CheckCircle, PenTool } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

export const Handshake: React.FC = () => {
  const { user } = useAuth();
  const [palletId, setPalletId] = useState('');
  const [skuCode, setSkuCode] = useState('');
  const [quantity, setQuantity] = useState('');
  const [signed, setSigned] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    console.log('[HANDSHAKE RECORD]', {
      user: user?.userId,
      palletId,
      skuCode,
      quantity,
      timestamp: new Date().toISOString(),
      signature: 'captured'
    });
    setSubmitted(true);
  };

  return (
    <PageLayout title="Handshake Recording" subtitle="Record inventory receipt from production">
      <div className="max-w-3xl">
        <Card className="glass-panel p-8">
          {submitted ? (
            <div className="text-center py-12 animate-fade-in">
              <CheckCircle className="w-20 h-20 text-wms-green mx-auto mb-4 glow-text" />
              <h3 className="font-display text-2xl font-bold text-white mb-2">Handshake Recorded</h3>
              <p className="text-gray-400 font-mono text-sm mb-6">
                Record locked and visible to supervisors and managers
              </p>
              <Button
                onClick={() => {
                  setSubmitted(false);
                  setPalletId('');
                  setSkuCode('');
                  setQuantity('');
                  setSigned(false);
                }}
                className="bg-wms-cyan hover:bg-wms-cyan/90 text-wms-bg font-mono"
              >
                Record Another
              </Button>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="flex items-center gap-3 p-4 rounded-lg bg-wms-cyan/10 border border-wms-cyan/30">
                <HandshakeIcon className="w-6 h-6 text-wms-cyan" />
                <p className="text-wms-cyan font-mono text-sm">
                  All handshake records are immutable and watermarked
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <Label className="text-gray-300 font-mono text-sm">Pallet ID</Label>
                  <Input
                    value={palletId}
                    onChange={(e) => setPalletId(e.target.value)}
                    placeholder="PLT-2024-XXXX"
                    className="bg-wms-bg/50 border-white/20 text-white font-mono mt-2"
                  />
                </div>

                <div>
                  <Label className="text-gray-300 font-mono text-sm">SKU Code</Label>
                  <Input
                    value={skuCode}
                    onChange={(e) => setSkuCode(e.target.value)}
                    placeholder="SKU-XXXX"
                    className="bg-wms-bg/50 border-white/20 text-white font-mono mt-2"
                  />
                </div>

                <div>
                  <Label className="text-gray-300 font-mono text-sm">Quantity</Label>
                  <Input
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    placeholder="0"
                    className="bg-wms-bg/50 border-white/20 text-white font-mono mt-2"
                  />
                </div>

                <Card className="glass-panel p-6 border-wms-amber/30">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <PenTool className="w-5 h-5 text-wms-amber" />
                      <span className="font-mono text-sm text-white">Digital Signature</span>
                    </div>
                    {signed && <CheckCircle className="w-5 h-5 text-wms-green" />}
                  </div>
                  <div className="h-32 rounded-lg bg-wms-bg/50 border-2 border-dashed border-white/20 flex items-center justify-center">
                    {signed ? (
                      <span className="text-wms-green font-mono text-sm">Signature Captured</span>
                    ) : (
                      <Button
                        onClick={() => setSigned(true)}
                        variant="ghost"
                        className="text-gray-400 hover:text-white font-mono"
                      >
                        Click to Sign
                      </Button>
                    )}
                  </div>
                </Card>
              </div>

              <Button
                onClick={handleSubmit}
                disabled={!palletId || !skuCode || !quantity || !signed}
                className="w-full bg-wms-cyan hover:bg-wms-cyan/90 text-wms-bg font-accent text-lg py-6 rounded-xl disabled:opacity-50"
              >
                SUBMIT HANDSHAKE RECORD
              </Button>

              <div className="text-center text-gray-500 text-xs font-mono pt-4 border-t border-white/10">
                Watermark: {user?.userId} • {user?.name} • {new Date().toLocaleString()}
              </div>
            </div>
          )}
        </Card>
      </div>
    </PageLayout>
  );
};
