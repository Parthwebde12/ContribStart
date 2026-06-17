import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const API = import.meta.env.VITE_API_URL || "http://localhost:5000";

export const api = axios.create({ baseURL: API });

const AuthContext = createContext({
  user: null,
  token: null,
  loading: true,
  login: async () => {},
  register: async () => {},
  logout: () => {},
});

export function AuthProvider({ children }) {
  const [user,  setUser]  = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const id = api.interceptors.request.use((config) => {
      if (token) config.headers.Authorization = `Bearer ${token}`;
      return config;
    });
    return () => api.interceptors.request.eject(id);
  }, [token]);

  useEffect(() => {
    if (!token) { setLoading(false); return; }
    api.get("/api/auth/me")
      .then((res) => setUser(res.data.user))
      .catch(() => { setToken(null); localStorage.removeItem("token"); })
      .finally(() => setLoading(false));
  }, [token]);

  const login = async (email, password) => {
    const res = await api.post("/api/auth/login", { email, password });
    localStorage.setItem("token", res.data.token);
    setToken(res.data.token);
    setUser(res.data.user);
  };

  // now takes username as second argument
  const register = async (name, username, email, password) => {
    const res = await api.post("/api/auth/register", { name, username, email, password });
    localStorage.setItem("token", res.data.token);
    setToken(res.data.token);
    setUser(res.data.user);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);