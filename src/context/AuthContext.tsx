// context/AuthContext.tsx (example wrapper)
import { createContext, useContext } from "react";
import { useAuthStore } from "../store/authStore";

interface AuthContextProps {
  isLoggedIn: boolean;
  user: any;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, phone: string, password: string) => Promise<void>;
  logout: () => void;
  loading: boolean;
  error: string | null;
}

const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const user = useAuthStore((state) => state.user);
  const token = useAuthStore((state) => state.token);
  const login = useAuthStore((state) => state.login);
  const signup = useAuthStore((state) => state.signup);
  const logout = useAuthStore((state) => state.logout);
  const loading = useAuthStore((state) => state.loading);
  const error = useAuthStore((state) => state.error);

  const isLoggedIn = !!user && !!token;

  return (
    <AuthContext.Provider value={{ user, isLoggedIn, login, signup, logout, loading, error }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
