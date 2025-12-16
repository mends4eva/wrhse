import React, { useState } from 'react';
import { PageLayout } from '@/components/layout/PageLayout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Clock, CheckCircle, AlertCircle } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

interface TimePickerProps {
  value: string;
  onChange: (value: string) => void;
  label: string;
}

const TimePicker: React.FC<TimePickerProps> = ({ value, onChange, label }) => {
  const [hour, setHour] = useState('12');
  const [minute, setMinute] = useState('00');
  const [period, setPeriod] = useState<'AM' | 'PM'>('AM');

  const updateTime = (h: string, m: string, p: 'AM' | 'PM') => {
    onChange(`${h}:${m} ${p}`);
  };

  return (
    <div className="space-y-2">
      <Label className="text-gray-300 font-mono text-sm">{label}</Label>
      <div className="flex gap-2">
        <Select value={hour} onValueChange={(v) => { setHour(v); updateTime(v, minute, period); }}>
          <SelectTrigger className="bg-wms-bg/50 border-white/20 text-white font-mono">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {Array.from({ length: 12 }, (_, i) => (i + 1).toString().padStart(2, '0')).map(h => (
              <SelectItem key={h} value={h}>{h}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        
        <Select value={minute} onValueChange={(v) => { setMinute(v); updateTime(hour, v, period); }}>
          <SelectTrigger className="bg-wms-bg/50 border-white/20 text-white font-mono">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {['00', '15', '30', '45'].map(m => (
              <SelectItem key={m} value={m}>{m}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={period} onValueChange={(v: 'AM' | 'PM') => { setPeriod(v); updateTime(hour, minute, v); }}>
          <SelectTrigger className="bg-wms-bg/50 border-white/20 text-white font-mono w-24">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="AM">AM</SelectItem>
            <SelectItem value="PM">PM</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export const TurnaroundEntry: React.FC = () => {
  const { user } = useAuth();
  const [entryTime, setEntryTime] = useState('');
  const [exitTime, setExitTime] = useState('');
  const [vehicleType, setVehicleType] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const calculateDuration = () => {
    if (!entryTime || !exitTime) return null;

    // Simple duration calculation (in production, use proper date parsing)
    const mockDuration = 2.5; // hours
    return {
      formatted: '2h 30m',
      decimal: '2.50'
    };
  };

  const duration = calculateDuration();

  const handleSubmit = () => {
    // In production, this would send to backend
    console.log('[TURNAROUND ENTRY]', {
      user: user?.userId,
      entryTime,
      exitTime,
      vehicleType,
      duration,
      timestamp: new Date().toISOString()
    });
    setSubmitted(true);
    setTimeout(() => {
      setEntryTime('');
      setExitTime('');
      setVehicleType('');
      setSubmitted(false);
    }, 3000);
  };

  const isEnabled = user?.role === 'PERMANENT_STAFF';

  if (!isEnabled) {
    return (
      <PageLayout title="Turnaround Time Entry" subtitle="Record vehicle turnaround times">
        <Card className="glass-panel p-8 text-center">
          <AlertCircle className="w-16 h-16 text-wms-amber mx-auto mb-4" />
          <h3 className="font-display text-xl font-bold text-white mb-2">Access Restricted</h3>
          <p className="text-gray-400 font-mono text-sm">
            This feature is only available to Permanent Staff members.
          </p>
        </Card>
      </PageLayout>
    );
  }

  return (
    <PageLayout title="Turnaround Time Entry" subtitle="Record vehicle turnaround times for previous calendar day">
      <div className="max-w-3xl">
        <Card className="glass-panel p-8">
          {submitted ? (
            <div className="text-center py-12 animate-fade-in">
              <CheckCircle className="w-20 h-20 text-wms-green mx-auto mb-4 glow-text" />
              <h3 className="font-display text-2xl font-bold text-white mb-2">Entry Submitted</h3>
              <p className="text-gray-400 font-mono text-sm">
                Turnaround time recorded successfully
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Date Info */}
              <div className="p-4 rounded-lg bg-wms-cyan/10 border border-wms-cyan/30">
                <div className="flex items-center gap-2 text-wms-cyan">
                  <Clock className="w-5 h-5" />
                  <span className="font-mono text-sm">
                    Recording for: {new Date(Date.now() - 86400000).toLocaleDateString()}
                  </span>
                </div>
              </div>

              {/* Time Pickers */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <TimePicker
                  label="Entry Time"
                  value={entryTime}
                  onChange={setEntryTime}
                />
                <TimePicker
                  label="Exit Time"
                  value={exitTime}
                  onChange={setExitTime}
                />
              </div>

              {/* Vehicle Type */}
              <div className="space-y-2">
                <Label className="text-gray-300 font-mono text-sm">Vehicle Type</Label>
                <Select value={vehicleType} onValueChange={setVehicleType}>
                  <SelectTrigger className="bg-wms-bg/50 border-white/20 text-white font-mono">
                    <SelectValue placeholder="Select vehicle type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="truck-small">Small Truck (&lt; 5 tons)</SelectItem>
                    <SelectItem value="truck-medium">Medium Truck (5-10 tons)</SelectItem>
                    <SelectItem value="truck-large">Large Truck (&gt; 10 tons)</SelectItem>
                    <SelectItem value="van">Van</SelectItem>
                    <SelectItem value="container">Container Truck</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Duration Preview */}
              {duration && (
                <Card className="glass-panel p-6 border-wms-green/30 animate-fade-in">
                  <h4 className="font-display text-lg font-bold text-white mb-3">Duration Preview</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-gray-400 text-xs font-mono mb-1">Formatted</p>
                      <p className="text-wms-green text-2xl font-display font-bold">{duration.formatted}</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-xs font-mono mb-1">Decimal Hours</p>
                      <p className="text-wms-green text-2xl font-display font-bold">{duration.decimal}</p>
                    </div>
                  </div>
                </Card>
              )}

              {/* Submit Button */}
              <Button
                onClick={handleSubmit}
                disabled={!entryTime || !exitTime || !vehicleType}
                className="w-full bg-wms-cyan hover:bg-wms-cyan/90 text-wms-bg font-accent text-lg py-6 rounded-xl transition-all duration-200 active:scale-98 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                SUBMIT TURNAROUND ENTRY
              </Button>

              {/* Watermark Info */}
              <div className="text-center text-gray-500 text-xs font-mono pt-4 border-t border-white/10">
                Entry will be watermarked with: {user?.userId} • {user?.name} • {new Date().toLocaleString()}
              </div>
            </div>
          )}
        </Card>
      </div>
    </PageLayout>
  );
};
