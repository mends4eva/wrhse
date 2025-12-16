import React, { createContext, useContext, useState, useEffect } from 'react';
import { AuthState, User, getRoleFromPrefix } from '@/types/auth';

const AuthContext = createContext<AuthState | undefined>(undefined);

// Mock user database - in production, this would be backend-driven
const MOCK_USERS: User[] = [
  { id: '1', userId: 'MGR001', name: 'James Mitchell', role: 'MAIN_MANAGER', pin: '1234' },
  { id: '2', userId: 'MGR002', name: 'Sarah Chen', role: 'ASSISTANT_MANAGER', pin: '2345' },
  { id: '3', userId: 'SUP001', name: 'Marcus Rodriguez', role: 'SUPERVISOR', pin: '3456' },
  { id: '4', userId: 'SUP002', name: 'Emily Watson', role: 'SUPERVISOR', pin: '4567' },
  { id: '5', userId: 'WRK001', name: 'David Thompson', role: 'PERMANENT_STAFF', pin: '5678' },
  { id: '6', userId: 'WRK002', name: 'Lisa Anderson', role: 'PERMANENT_STAFF', pin: '6789' },
  { id: '7', userId: 'INT001', name: 'Alex Kumar', role: 'INTERN', pin: '7890' },
  { id: '8', userId: 'INT002', name: 'Maya Patel', role: 'INTERN', pin: '8901' },
  { id: '9', userId: 'NSP001', name: 'Robert Johnson', role: 'SERVICE_PERSONNEL', pin: '9012' },
  { id: '10', userId: 'NSP002', name: 'Jennifer Lee', role: 'SERVICE_PERSONNEL', pin: '0123' },
];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Check for stored session
    const storedUser = localStorage.getItem('wms_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = async (userId: string, pin: string): Promise<boolean> => {
    // Simulate backend validation
    await new Promise(resolve => setTimeout(resolve, 500));

    const role = getRoleFromPrefix(userId);
    if (!role) return false;

    const foundUser = MOCK_USERS.find(
      u => u.userId === userId && u.pin === pin
    );

    if (foundUser) {
      setUser(foundUser);
      localStorage.setItem('wms_user', JSON.stringify(foundUser));
      
      // Log authentication activity (in production, this would be backend)
      console.log(`[AUTH LOG] ${new Date().toISOString()} - User ${foundUser.userId} (${foundUser.name}) authenticated as ${foundUser.role}`);
      
      return true;
    }

    return false;
  };

  const logout = () => {
    if (user) {
      console.log(`[AUTH LOG] ${new Date().toISOString()} - User ${user.userId} (${user.name}) logged out`);
    }
    setUser(null);
    localStorage.removeItem('wms_user');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
