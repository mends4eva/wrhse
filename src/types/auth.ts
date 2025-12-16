export type UserRole = 
  | 'MAIN_MANAGER'
  | 'ASSISTANT_MANAGER'
  | 'SUPERVISOR'
  | 'PERMANENT_STAFF'
  | 'INTERN'
  | 'SERVICE_PERSONNEL';

export interface User {
  id: string;
  userId: string; // MGR001, SUP001, etc.
  name: string;
  role: UserRole;
  pin: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (userId: string, pin: string) => Promise<boolean>;
  logout: () => void;
}

export const ROLE_PREFIXES: Record<UserRole, string> = {
  MAIN_MANAGER: 'MGR001',
  ASSISTANT_MANAGER: 'MGR',
  SUPERVISOR: 'SUP',
  PERMANENT_STAFF: 'WRK',
  INTERN: 'INT',
  SERVICE_PERSONNEL: 'NSP',
};

export const getRoleFromPrefix = (userId: string): UserRole | null => {
  if (userId === 'MGR001') return 'MAIN_MANAGER';
  if (userId.startsWith('MGR')) return 'ASSISTANT_MANAGER';
  if (userId.startsWith('SUP')) return 'SUPERVISOR';
  if (userId.startsWith('WRK')) return 'PERMANENT_STAFF';
  if (userId.startsWith('INT')) return 'INTERN';
  if (userId.startsWith('NSP')) return 'SERVICE_PERSONNEL';
  return null;
};
