import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { jwtDecode } from "jwt-decode";

interface DecodedToken {
  sub?: string;
  id?: number;
  userId?: number;
  isAdmin?: boolean;
  isMaster?: boolean;
}

interface AuthContextType {
  token: string | null;
  login: (token: string) => void;
  logout: () => void;
  isAuthenticated: boolean;
  userId: number | null;
  isAdmin?: boolean;
  isMaster?: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("authToken")
  );
  const [userId, setUserId] = useState<number | null>(null);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [isMaster, setIsMaster] = useState<boolean>(false);

  useEffect(() => {
    if (token) {
      try {
        const decoded: DecodedToken = jwtDecode(token);

        const id =
          decoded.userId ?? decoded.id ?? parseInt(decoded.sub || "", 10);
        const isAdmin = decoded.isAdmin ?? false;
        setIsAdmin(isAdmin);
        const isMaster = decoded.isMaster ?? false;
        setIsMaster(isMaster);

        if (!isNaN(id)) {
          setUserId(id);
        } else {
          setUserId(null);
        }
      } catch (error) {
        console.error("Erro ao decodificar token", error);
        logout();
      }
    } else {
      setUserId(null);
    }
  }, [token]);

  const login = (newToken: string) => {
    localStorage.setItem("authToken", newToken);
    setToken(newToken);
  };



  const logout = () => {
    localStorage.removeItem("authToken");
    setToken(null);
    setUserId(null);
  };

  return (
    <AuthContext.Provider
      value={{ token, login, logout, isAuthenticated: !!token, userId , isAdmin, isMaster}}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth precisa estar dentro do AuthProvider");
  return context;
};
