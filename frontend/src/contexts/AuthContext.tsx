import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  name: string;
  email: string;
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    // Check if user was previously authenticated
    const stored = localStorage.getItem('isAuthenticated');
    return stored === 'true';
  });
  const [user, setUser] = useState<User | null>(() => {
    // Get user info from localStorage if authenticated
    if (localStorage.getItem('isAuthenticated') === 'true') {
      return {
        name: localStorage.getItem('userName') || '',
        email: localStorage.getItem('userEmail') || '',
      };
    }
    return null;
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate checking authentication status
    // In a real app, you would verify the token here
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    try {
      // Simulate API call - in a real app, replace this with actual API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Hardcoded admin credentials
      const ADMIN_EMAIL = 'admin';
      const ADMIN_PASSWORD = 'admin';
      
      // Check for hardcoded admin credentials
      if (email.toLowerCase() === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
        const userData = {
          name: 'Admin',
          email: email,
        };
        setIsAuthenticated(true);
        setUser(userData);
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('userEmail', email);
        localStorage.setItem('userName', 'Admin');
        setIsLoading(false);
        return true;
      }
      
      // Invalid credentials
      setIsLoading(false);
      return false;
    } catch (error) {
      setIsLoading(false);
      return false;
    }
  };

  const signup = async (name: string, email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    try {
      // Simulate API call - in a real app, replace this with actual API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Simple validation - in a real app, this would be handled by the backend
      // For demo purposes, accept any name/email/password combination
      if (name && email && password) {
        const userData = {
          name: name,
          email: email,
        };
        setIsAuthenticated(true);
        setUser(userData);
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('userEmail', email);
        localStorage.setItem('userName', name);
        setIsLoading(false);
        return true;
      }
      
      setIsLoading(false);
      return false;
    } catch (error) {
      setIsLoading(false);
      return false;
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userName');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, signup, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

