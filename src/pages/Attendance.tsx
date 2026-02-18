import React, { useState } from 'react';
import { PageLayout } from '@/components/layout/PageLayout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { UserCheck, Clock, CheckCircle, AlertCircle } from 'lucide-react';
import { StatCard } from '@/components/dashboard/StatCard';

interface AttendanceRecord {
  date: string;
  checkIn: string;
  checkOut?: string;
  status: 'present' | 'absent' | 'late';
  hoursWorked?: string;
}

export const Attendance: React.FC = () => {
  const [checkedIn, setCheckedIn] = useState(false);
  const [todayRecords] = useState<AttendanceRecord[]>([
    { date: 'Today', checkIn: '08:00 AM', checkOut: '05:30 PM', status: 'present', hoursWorked: '9h 30m' },
  ]);

  const records: AttendanceRecord[] = [
    { date: '2024-01-13', checkIn: '07:45 AM', checkOut: '05:15 PM', status: 'present', hoursWorked: '9h 30m' },
    { date: '2024-01-12', checkIn: '09:10 AM', checkOut: '06:00 PM', status: 'late', hoursWorked: '8h 50m' },
    { date: '2024-01-11', checkIn: '08:00 AM', checkOut: '05:30 PM', status: 'present', hoursWorked: '9h 30m' },
  ];

  return (
    <PageLayout title="Attendance" subtitle="Check in/out and track hours">
      <div className="space-y-6">
        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-4">
          <StatCard
            title="This Week"
            value={5}
            icon={<CheckCircle className="w-6 h-6" />}
            color="green"
            description="days worked"
          />
          <StatCard
            title="This Month"
            value={18}
            icon={<Clock className="w-6 h-6" />}
            color="cyan"
            description="days"
          />
        </div>

        {/* Check In/Out Card */}
        <Card className="liquid-glass p-6 md:p-8 border-white/15">
          <h3 className="font-display text-xl md:text-2xl font-bold text-white mb-6">Today's Status</h3>
          
          <div className="space-y-4">
            {todayRecords.map((record, i) => (
              <div key={i} className="p-4 md:p-6 rounded-lg liquid-glass-sm border border-white/10">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <p className="text-gray-400 text-xs md:text-sm font-mono uppercase tracking-wide mb-1">Today</p>
                    <p className="text-white font-mono font-semibold text-lg md:text-xl">
                      {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}
                    </p>
                  </div>
                  <div className={`px-3 py-1 rounded-lg text-xs font-mono font-bold ${
                    record.status === 'present'
                      ? 'bg-wms-green/10 text-wms-green'
                      : record.status === 'late'
                      ? 'bg-wms-amber/10 text-wms-amber'
                      : 'bg-red-500/10 text-red-400'
                  }`}>
                    {record.status.charAt(0).toUpperCase() + record.status.slice(1)}
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3 mb-6">
                  <div className="bg-white/5 rounded-lg p-3 text-center">
                    <p className="text-xs text-gray-500 font-mono mb-2">Check In</p>
                    <p className="font-mono font-bold text-white text-sm md:text-base">{record.checkIn}</p>
                  </div>
                  <div className="bg-white/5 rounded-lg p-3 text-center">
                    <p className="text-xs text-gray-500 font-mono mb-2">Check Out</p>
                    <p className="font-mono font-bold text-white text-sm md:text-base">{record.checkOut || '—'}</p>
                  </div>
                  <div className="bg-wms-cyan/10 rounded-lg p-3 text-center">
                    <p className="text-xs text-gray-500 font-mono mb-2">Hours</p>
                    <p className="font-mono font-bold text-wms-cyan text-sm md:text-base">{record.hoursWorked || 'In Progress'}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <Button className="py-5 md:py-6 bg-wms-green/20 hover:bg-wms-green/30 text-wms-green border border-wms-green/30 font-mono font-semibold">
                    <CheckCircle className="w-5 h-5 mr-2" />
                    Check In
                  </Button>
                  <Button variant="outline" className="py-5 md:py-6 border-white/20 font-mono font-semibold">
                    <Clock className="w-5 h-5 mr-2" />
                    Check Out
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Attendance History */}
        <Card className="liquid-glass p-6 md:p-8 border-white/15">
          <h3 className="font-display text-xl md:text-2xl font-bold text-white mb-6">Recent Records</h3>
          
          <div className="space-y-3">
            {records.map((record, i) => {
              const icon = record.status === 'present' ? CheckCircle : AlertCircle;
              const Icon = icon;
              return (
                <div key={i} className="p-4 rounded-lg liquid-glass-sm border border-white/10 hover:border-white/20 transition-all">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg flex-shrink-0 ${
                        record.status === 'present'
                          ? 'bg-wms-green/10'
                          : 'bg-wms-amber/10'
                      }`}>
                        <Icon className={`w-4 h-4 md:w-5 md:h-5 ${
                          record.status === 'present' ? 'text-wms-green' : 'text-wms-amber'
                        }`} />
                      </div>
                      <div>
                        <p className="text-sm md:text-base font-mono text-white font-semibold">{record.date}</p>
                        <p className="text-xs text-gray-500 font-mono">{record.checkIn} - {record.checkOut}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm md:text-base font-mono font-bold text-wms-cyan">{record.hoursWorked}</p>
                      <p className={`text-xs font-mono font-semibold ${
                        record.status === 'present' ? 'text-wms-green' : 'text-wms-amber'
                      }`}>
                        {record.status.charAt(0).toUpperCase() + record.status.slice(1)}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      </div>
    </PageLayout>
  );
};
