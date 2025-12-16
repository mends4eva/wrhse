import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { 
  LayoutDashboard, 
  Clock, 
  ClipboardList, 
  Handshake, 
  Calendar, 
  UserCheck, 
  MessageSquare, 
  Truck,
  Settings,
  LogOut,
  BarChart3,
  Shield
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { UserRole } from '@/types/auth';

interface NavItem {
  label: string;
  path: string;
  icon: React.ReactNode;
  roles: UserRole[];
}

const NAV_ITEMS: NavItem[] = [
  {
    label: 'Dashboard',
    path: '/dashboard',
    icon: <LayoutDashboard className="w-5 h-5" />,
    roles: ['MAIN_MANAGER', 'ASSISTANT_MANAGER', 'SUPERVISOR', 'PERMANENT_STAFF', 'INTERN', 'SERVICE_PERSONNEL'],
  },
  {
    label: 'KPI Analytics',
    path: '/kpi',
    icon: <BarChart3 className="w-5 h-5" />,
    roles: ['MAIN_MANAGER'],
  },
  {
    label: 'Turnaround Entry',
    path: '/turnaround',
    icon: <Clock className="w-5 h-5" />,
    roles: ['PERMANENT_STAFF'],
  },
  {
    label: 'Picklist Management',
    path: '/picklist',
    icon: <ClipboardList className="w-5 h-5" />,
    roles: ['MAIN_MANAGER', 'ASSISTANT_MANAGER', 'SUPERVISOR', 'PERMANENT_STAFF'],
  },
  {
    label: 'Handshake Recording',
    path: '/handshake',
    icon: <Handshake className="w-5 h-5" />,
    roles: ['PERMANENT_STAFF'],
  },
  {
    label: 'Stock Taking',
    path: '/stock-taking',
    icon: <ClipboardList className="w-5 h-5" />,
    roles: ['PERMANENT_STAFF', 'INTERN', 'SERVICE_PERSONNEL'],
  },
  {
    label: 'Scheduling',
    path: '/scheduling',
    icon: <Calendar className="w-5 h-5" />,
    roles: ['SUPERVISOR'],
  },
  {
    label: 'Attendance',
    path: '/attendance',
    icon: <UserCheck className="w-5 h-5" />,
    roles: ['PERMANENT_STAFF', 'INTERN', 'SERVICE_PERSONNEL'],
  },
  {
    label: 'Vehicle Tracking',
    path: '/vehicles',
    icon: <Truck className="w-5 h-5" />,
    roles: ['MAIN_MANAGER', 'ASSISTANT_MANAGER', 'SUPERVISOR'],
  },
  {
    label: 'Messages',
    path: '/messages',
    icon: <MessageSquare className="w-5 h-5" />,
    roles: ['MAIN_MANAGER', 'ASSISTANT_MANAGER', 'SUPERVISOR', 'PERMANENT_STAFF', 'INTERN', 'SERVICE_PERSONNEL'],
  },
  {
    label: 'Permissions',
    path: '/permissions',
    icon: <Shield className="w-5 h-5" />,
    roles: ['MAIN_MANAGER'],
  },
  {
    label: 'Configuration',
    path: '/configuration',
    icon: <Settings className="w-5 h-5" />,
    roles: ['MAIN_MANAGER'],
  },
];

export const Navigation: React.FC = () => {
  const { user, logout } = useAuth();
  const location = useLocation();

  if (!user) return null;

  const visibleItems = NAV_ITEMS.filter(item => item.roles.includes(user.role));

  return (
    <nav className="fixed left-0 top-0 h-screen w-64 glass-panel border-r border-white/10 flex flex-col z-50 animate-slide-in">
      {/* Header */}
      <div className="p-6 border-b border-white/10">
        <h1 className="font-display text-2xl font-bold text-wms-cyan glow-text mb-1">
          WMS
        </h1>
        <div className="text-xs font-mono text-gray-400">
          <div className="truncate">{user.name}</div>
          <div className="text-wms-cyan">{user.userId}</div>
        </div>
      </div>

      {/* Navigation Items */}
      <div className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
        {visibleItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`
                flex items-center gap-3 px-4 py-3 rounded-lg font-mono text-sm transition-all duration-200
                ${isActive 
                  ? 'bg-wms-cyan/20 text-wms-cyan border border-wms-cyan/50 glow-border' 
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
                }
              `}
            >
              {item.icon}
              <span>{item.label}</span>
            </Link>
          );
        })}
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-white/10">
        <Button
          onClick={logout}
          variant="ghost"
          className="w-full justify-start text-gray-400 hover:text-red-400 hover:bg-red-500/10 font-mono"
        >
          <LogOut className="w-5 h-5 mr-3" />
          Logout
        </Button>
      </div>
    </nav>
  );
};
