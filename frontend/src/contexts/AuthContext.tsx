import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  name: string;
  email: string;
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  signup: (name: string, email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  isLoading: boolean;
  token: string | null;
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
  const [token, setToken] = useState<string | null>(() => {
    return localStorage.getItem('authToken');
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate checking authentication status
    // In a real app, you would verify the token here
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    setIsLoading(true);
    
    try {
      const response = await fetch('http://192.168.1.2:8080/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      const data = await response.json();

      if (response.ok && data.message && !data.message.includes('Invalid email or password')) {
        // Extract bearer token from message
        // The token should be in the message field
        const bearerToken = data.message.trim();
        
        // Store token and authentication state
        setToken(bearerToken);
        localStorage.setItem('authToken', bearerToken);
        setIsAuthenticated(true);
        
        // Try to get user info - if not available in response, use email
        const userData = {
          name: data.name || email.split('@')[0] || 'User',
          email: email,
        };
        setUser(userData);
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('userEmail', email);
        localStorage.setItem('userName', userData.name);
        
        setIsLoading(false);
        return { success: true };
      } else {
        // Handle error message from API
        const errorMessage = data.message || 'Login failed. Please try again.';
        setIsLoading(false);
        return { success: false, error: errorMessage };
      }
    } catch (error) {
      setIsLoading(false);
      return { success: false, error: 'Network error. Please try again.' };
    }
  };

  const signup = async (name: string, email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    setIsLoading(true);
    
    try {
      const response = await fetch('http://192.168.1.2:8080/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fullName: name,
          email: email,
          password: password,
        }),
      });

      const data = await response.json();

      if (response.ok && data.message && data.message.includes('User registered successfully!')) {
        // Don't auto-login after signup - user should login separately
        setIsLoading(false);
        return { success: true };
      } else {
        // Handle error message from API
        const errorMessage = data.message || 'Signup failed. Please try again.';
        setIsLoading(false);
        return { success: false, error: errorMessage };
      }
    } catch (error) {
      setIsLoading(false);
      return { success: false, error: 'Network error. Please try again.' };
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    setToken(null);
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userName');
    localStorage.removeItem('authToken');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, signup, logout, isLoading, token }}>
      {children}
    </AuthContext.Provider>
  );
};

