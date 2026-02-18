import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { 
  LayoutDashboard, 
  Package,
  Clock, 
  Users, 
  MessageSquare, 
  User
} from 'lucide-react';
import { UserRole } from '@/types/auth';

interface BottomNavItem {
  label: string;
  path: string;
  icon: React.ReactNode;
  roles: UserRole[];
}

const BOTTOM_NAV_ITEMS: BottomNavItem[] = [
  {
    label: 'Home',
    path: '/dashboard',
    icon: <LayoutDashboard className="w-6 h-6" />,
    roles: ['MAIN_MANAGER', 'ASSISTANT_MANAGER', 'SUPERVISOR', 'PERMANENT_STAFF', 'INTERN', 'SERVICE_PERSONNEL'],
  },
  {
    label: 'Stock',
    path: '/stock-taking',
    icon: <Package className="w-6 h-6" />,
    roles: ['PERMANENT_STAFF', 'INTERN', 'SERVICE_PERSONNEL', 'SUPERVISOR'],
  },
  {
    label: 'Tasks',
    path: '/turnaround',
    icon: <Clock className="w-6 h-6" />,
    roles: ['PERMANENT_STAFF', 'INTERN', 'SERVICE_PERSONNEL'],
  },
  {
    label: 'Team',
    path: '/scheduling',
    icon: <Users className="w-6 h-6" />,
    roles: ['SUPERVISOR', 'MAIN_MANAGER'],
  },
  {
    label: 'Messages',
    path: '/messages',
    icon: <MessageSquare className="w-6 h-6" />,
    roles: ['MAIN_MANAGER', 'ASSISTANT_MANAGER', 'SUPERVISOR', 'PERMANENT_STAFF', 'INTERN', 'SERVICE_PERSONNEL'],
  },
  {
    label: 'Profile',
    path: '/profile',
    icon: <User className="w-6 h-6" />,
    roles: ['MAIN_MANAGER', 'ASSISTANT_MANAGER', 'SUPERVISOR', 'PERMANENT_STAFF', 'INTERN', 'SERVICE_PERSONNEL'],
  },
];

export const BottomNav: React.FC = () => {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) return null;

  const visibleItems = BOTTOM_NAV_ITEMS.filter(item => item.roles.includes(user.role)).slice(0, 5);

  return (
    <nav className="fixed bottom-0 left-0 right-0 liquid-glass border-t border-white/15 z-50 safe-area-bottom">
      <div className="max-w-2xl mx-auto px-4 py-3">
        <div className="flex items-center justify-around gap-2">
          {visibleItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`
                  flex flex-col items-center justify-center gap-1 px-3 py-2 rounded-xl transition-all duration-200 relative
                  ${isActive 
                    ? 'text-wms-cyan' 
                    : 'text-gray-400 hover:text-gray-200'
                  }
                `}
              >
                <div className={`
                  p-2 rounded-lg transition-all duration-200
                  ${isActive 
                    ? 'bg-wms-cyan/20 glow-sm' 
                    : 'hover:bg-white/5'
                  }
                `}>
                  {item.icon}
                </div>
                <span className="text-xs font-mono font-semibold text-center">{item.label}</span>
                {isActive && (
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 rounded-full bg-wms-cyan"></div>
                )}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
};
