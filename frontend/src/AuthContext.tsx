
import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  type ReactNode,
} from "react";

import API from "./api/axios";

export interface User {
  id: string;
  name: string;
  email: string;
  role?: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<User | null>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Verify the user's session using the backend
  const checkAuth = useCallback(async (): Promise<User | null> => {
    try {
      const response = await API.get("/auth/me");
      const currentUser: User = response.data.user;

      setUser(currentUser);
      return currentUser;
    } catch {
      setUser(null);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  // Check existing session when the application starts
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  // Login
  const login = async (email: string, password: string) => {
    await API.post("/auth/login", { email, password });

    const currentUser = await checkAuth();

    if (!currentUser) {
      throw new Error(
        "Login succeeded, but the session could not be verified. Please try again."
      );
    }
  };

  // Logout
  const logout = async () => {
    try {
      await API.post("/auth/logout");
    } finally {
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        logout,
        checkAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook
export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
};
