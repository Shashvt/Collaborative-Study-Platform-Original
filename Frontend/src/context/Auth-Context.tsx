import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  PropsWithChildren,
} from "react";
import axios from "axios";
import { API_BASE_URL } from "../config/api";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

interface AuthContextProps {
  user: any;
  token: string | null;
  loading: boolean;
  signup: (
    name: string,
    email: string,
    password: string,
    role: string
  ) => Promise<any>;
  login: (email: string, password: string) => Promise<any>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextProps>({
  user: null,
  token: null,
  loading: false,
  signup: () => Promise.resolve(),
  login: () => Promise.resolve(),
  logout: () => {},
});

export const useAuthContext = () => useContext(AuthContext);

export const AuthContextProvider: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const [user, setUser] = useState<any>(localStorage.getItem("user"));
  const [token, setToken] = useState(localStorage.getItem("authToken"));
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Fetch user details if token exists
  useEffect(() => {
    if (token) {
      localStorage.setItem("authToken", token);
      localStorage.setItem("user", user);
    }
  }, [token, user]);


  const signup = async (
    name: string,
    email: string,
    password: string,
    role: string
  ) => {
    setLoading(true);
    await axios
      .post(
        `${API_BASE_URL}/signup`,
        {
          name: name,
          email,
          password,
          role: "user",
        },
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        setToken(res.data.ID);
        setUser(res.data.Name);
        toast.success(res.data.message || "Account created successfully!");
        navigate("/");
      })
      .catch((err) => {
        throw err.response
      });
  };

  const login = async (email: string, password: string) => {
    setLoading(true);
    await axios
      .post(
        `${API_BASE_URL}/signin`,
        {
          email,
          password,
        },
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        setToken(res.data.ID);
        setUser(res.data.Name);
        // toast.done("Sign in successful")
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
        throw err
      });
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        signup,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
