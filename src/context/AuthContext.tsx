import React, { createContext, useContext, useState, ReactNode } from 'react';

interface AuthContextType {
  isLoggedIn: boolean;
  login: (username: string, password: string) => boolean;
  logout: () => void;
  user: { id: string; email: string; isBrppMember: boolean } | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<{ id: string; email: string; isBrppMember: boolean } | null>(null);

  // Static login logic for demonstration
  const login = (username: string, password: string) => {
    if (username === '1234' && password === '1234') {
      setIsLoggedIn(true);
      setUser({ id: 'user-1234', email: 'user@example.com', isBrppMember: true }); // Simulate BRPP member
      return true;
    }
    setIsLoggedIn(false);
    setUser(null);
    return false;
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUser(null);
  };

  const value: AuthContextType = {
    isLoggedIn,
    login,
    logout,
    user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};