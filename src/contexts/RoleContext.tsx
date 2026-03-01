import { createContext, useContext, useState, ReactNode } from 'react';

export type Role = 'Inspector' | 'Commissioner' | 'Public';

interface RoleContextType {
  role: Role;
  setRole: (role: Role) => void;
  isAuthenticated: boolean;
  userName: string;
  login: (name: string, role: Role) => void;
  logout: () => void;
}

const RoleContext = createContext<RoleContextType | undefined>(undefined);

export function RoleProvider({ children }: { children: ReactNode }) {
  const [role, setRole] = useState<Role>('Commissioner');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userName, setUserName] = useState('');

  const login = (name: string, selectedRole: Role) => {
    setUserName(name);
    setRole(selectedRole);
    setIsAuthenticated(true);
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUserName('');
    setRole('Commissioner');
  };

  return (
    <RoleContext.Provider value={{ role, setRole, isAuthenticated, userName, login, logout }}>
      {children}
    </RoleContext.Provider>
  );
}

export function useRole() {
  const ctx = useContext(RoleContext);
  if (!ctx) throw new Error('useRole must be used within RoleProvider');
  return ctx;
}

