import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser, logoutUser } from "../api/auth";

interface AuthContextType {
  user: { name: string; email: string } | null;
  login: (name: string, email: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<{ name: string; email: string } | null>(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const navigate = useNavigate();

  const login = async (name: string, email: string) => {
    try {
      await loginUser(name, email);
      const userData = { name, email };
      setUser(userData);
      localStorage.setItem("user", JSON.stringify(userData));
      navigate("/search");
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  const logout = async () => {
    await logoutUser();
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
