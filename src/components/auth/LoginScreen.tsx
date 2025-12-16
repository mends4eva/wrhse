import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { AlertCircle } from 'lucide-react';

export const LoginScreen: React.FC = () => {
  const { login } = useAuth();
  const [userId, setUserId] = useState('');
  const [pin, setPin] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (!userId || !pin) {
      setError('Please enter both User ID and PIN');
      setLoading(false);
      return;
    }

    if (pin.length !== 4 || !/^\d{4}$/.test(pin)) {
      setError('PIN must be exactly 4 digits');
      setLoading(false);
      return;
    }

    const success = await login(userId.toUpperCase(), pin);

    if (!success) {
      setError('Invalid credentials. Please check your User ID and PIN.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center noise-texture relative overflow-hidden">
      {/* Background gradient mesh */}
      <div className="absolute inset-0 bg-gradient-to-br from-wms-cyan/5 via-transparent to-wms-green/5" />
      
      <div className="relative z-10 w-full max-w-md px-6">
        {/* Logo/Title */}
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="font-display text-5xl font-bold text-white mb-3 glow-text" style={{ color: '#00d9ff' }}>
            WMS
          </h1>
          <p className="text-gray-400 text-sm font-mono tracking-wider">
            WAREHOUSE MANAGEMENT SYSTEM
          </p>
        </div>

        {/* Login Form */}
        <div className="glass-panel rounded-2xl p-8 shadow-2xl animate-slide-in">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="userId" className="text-gray-300 font-mono text-sm">
                User ID
              </Label>
              <Input
                id="userId"
                type="text"
                placeholder="MGR001, SUP001, WRK001..."
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                className="bg-wms-bg/50 border-white/20 text-white placeholder:text-gray-500 focus:border-wms-cyan focus:ring-wms-cyan/50 font-mono"
                disabled={loading}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="pin" className="text-gray-300 font-mono text-sm">
                4-Digit PIN
              </Label>
              <Input
                id="pin"
                type="password"
                placeholder="••••"
                maxLength={4}
                value={pin}
                onChange={(e) => setPin(e.target.value.replace(/\D/g, ''))}
                className="bg-wms-bg/50 border-white/20 text-white placeholder:text-gray-500 focus:border-wms-cyan focus:ring-wms-cyan/50 font-mono text-2xl tracking-widest"
                disabled={loading}
              />
            </div>

            {error && (
              <div className="flex items-center gap-2 p-3 rounded-lg bg-red-500/10 border border-red-500/30 animate-fade-in">
                <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0" />
                <p className="text-red-400 text-sm font-mono">{error}</p>
              </div>
            )}

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-wms-cyan hover:bg-wms-cyan/90 text-wms-bg font-accent text-lg py-6 rounded-xl transition-all duration-200 active:scale-98 glow-border"
            >
              {loading ? 'AUTHENTICATING...' : 'ACCESS SYSTEM'}
            </Button>
          </form>

          {/* Demo credentials hint */}
          <div className="mt-6 pt-6 border-t border-white/10">
            <p className="text-gray-500 text-xs font-mono text-center mb-2">Demo Credentials:</p>
            <div className="grid grid-cols-2 gap-2 text-xs font-mono">
              <div className="text-gray-400">MGR001 / 1234</div>
              <div className="text-gray-400">SUP001 / 3456</div>
              <div className="text-gray-400">WRK001 / 5678</div>
              <div className="text-gray-400">INT001 / 7890</div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-gray-600 text-xs font-mono">
          Enterprise-Grade Operations Platform v1.0
        </div>
      </div>
    </div>
  );
};
