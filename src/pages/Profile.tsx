import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { PageLayout } from '@/components/layout/PageLayout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  User as UserIcon,
  LogOut,
  Settings,
  Bell,
  Lock,
  HelpCircle,
  LogIn
} from 'lucide-react';

export const Profile: React.FC = () => {
  const { user, logout } = useAuth();

  if (!user) {
    return (
      <PageLayout title="Profile" subtitle="User account settings">
        <Card className="liquid-glass p-6 md:p-8 border-white/15 text-center">
          <p className="text-gray-400 font-mono">Please log in to view your profile</p>
        </Card>
      </PageLayout>
    );
  }

  const getRoleLabel = (role: string) => {
    const roleMap: { [key: string]: string } = {
      'MAIN_MANAGER': 'Main Manager',
      'ASSISTANT_MANAGER': 'Assistant Manager',
      'SUPERVISOR': 'Supervisor',
      'PERMANENT_STAFF': 'Staff Member',
      'INTERN': 'Intern',
      'SERVICE_PERSONNEL': 'Service Personnel',
    };
    return roleMap[role] || role;
  };

  return (
    <PageLayout title="Profile" subtitle="Your account and settings">
      {/* User Card */}
      <Card className="liquid-glass p-8 border-white/15 mb-6 text-center">
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-wms-cyan/40 to-wms-green/40 border-2 border-wms-cyan/30 flex items-center justify-center">
            <UserIcon className="w-10 h-10 text-wms-cyan" />
          </div>
        </div>
        <h2 className="text-2xl md:text-3xl font-display font-bold text-white mb-2">{user.name}</h2>
        <p className="text-wms-cyan font-mono font-semibold mb-4">{user.userId}</p>
        <div className="inline-block px-4 py-2 rounded-lg bg-wms-cyan/10 border border-wms-cyan/30">
          <p className="text-sm font-mono text-wms-cyan font-semibold">{getRoleLabel(user.role)}</p>
        </div>
      </Card>

      {/* Settings Sections */}
      <div className="space-y-4 mb-6">
        {/* Notifications */}
        <Card className="liquid-glass-sm p-4 md:p-6 border border-white/10 hover:border-white/20 transition-all cursor-pointer group">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-lg bg-wms-cyan/10 group-hover:bg-wms-cyan/20 transition-all">
              <Bell className="w-5 h-5 md:w-6 md:h-6 text-wms-cyan" />
            </div>
            <div className="flex-1">
              <h3 className="font-mono font-semibold text-white text-sm md:text-base">Notifications</h3>
              <p className="text-xs text-gray-500 font-mono">Manage alerts and reminders</p>
            </div>
            <div className="text-gray-400">→</div>
          </div>
        </Card>

        {/* Security */}
        <Card className="liquid-glass-sm p-4 md:p-6 border border-white/10 hover:border-white/20 transition-all cursor-pointer group">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-lg bg-wms-green/10 group-hover:bg-wms-green/20 transition-all">
              <Lock className="w-5 h-5 md:w-6 md:h-6 text-wms-green" />
            </div>
            <div className="flex-1">
              <h3 className="font-mono font-semibold text-white text-sm md:text-base">Security</h3>
              <p className="text-xs text-gray-500 font-mono">Change password and security settings</p>
            </div>
            <div className="text-gray-400">→</div>
          </div>
        </Card>

        {/* Settings */}
        <Card className="liquid-glass-sm p-4 md:p-6 border border-white/10 hover:border-white/20 transition-all cursor-pointer group">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-lg bg-wms-amber/10 group-hover:bg-wms-amber/20 transition-all">
              <Settings className="w-5 h-5 md:w-6 md:h-6 text-wms-amber" />
            </div>
            <div className="flex-1">
              <h3 className="font-mono font-semibold text-white text-sm md:text-base">Preferences</h3>
              <p className="text-xs text-gray-500 font-mono">Display and language settings</p>
            </div>
            <div className="text-gray-400">→</div>
          </div>
        </Card>

        {/* Help */}
        <Card className="liquid-glass-sm p-4 md:p-6 border border-white/10 hover:border-white/20 transition-all cursor-pointer group">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-lg bg-wms-cyan/10 group-hover:bg-wms-cyan/20 transition-all">
              <HelpCircle className="w-5 h-5 md:w-6 md:h-6 text-wms-cyan" />
            </div>
            <div className="flex-1">
              <h3 className="font-mono font-semibold text-white text-sm md:text-base">Help & Support</h3>
              <p className="text-xs text-gray-500 font-mono">FAQs and contact support</p>
            </div>
            <div className="text-gray-400">→</div>
          </div>
        </Card>
      </div>

      {/* Logout Button */}
      <Button
        onClick={logout}
        variant="default"
        className="w-full py-6 md:py-8 text-base md:text-lg font-mono font-semibold bg-gradient-to-r from-red-600/80 to-red-700/80 hover:from-red-600 hover:to-red-700 text-white border border-red-500/30 transition-all"
      >
        <LogOut className="w-5 h-5 mr-3" />
        Logout
      </Button>

      {/* Session Info */}
      <Card className="liquid-glass-sm p-4 border border-white/10 mt-6">
        <div className="space-y-2">
          <p className="text-xs text-gray-500 font-mono">Session Information</p>
          <div className="grid grid-cols-2 gap-4 text-xs">
            <div>
              <p className="text-gray-600 font-mono">Last Login</p>
              <p className="text-gray-300 font-mono">Today at 09:30 AM</p>
            </div>
            <div>
              <p className="text-gray-600 font-mono">Device</p>
              <p className="text-gray-300 font-mono">Mobile App</p>
            </div>
          </div>
        </div>
      </Card>
    </PageLayout>
  );
};
