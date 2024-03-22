import { useState, useEffect, createContext } from "react";
import { Token } from "../api/token";
import { User } from "../api/user";
import { User as UserFb } from "../api/fb.user";

const tokenCtrl = new Token();
const userCtrl = new User();
const UserCtrl = new UserFb();

export const AuthContext = createContext();

export function AuthProvider(props) {
  const { children } = props;
  const [User, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const token = tokenCtrl.getToken();

      if (!token) {
        logout();
        setLoading(false);
        return;
      }

      if (tokenCtrl.hasExpired(token)) {
        logout();
      } else {
        await login(token);
      }
    })();
  }, []);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("ui"));
    if (storedUser) {
      setUser(storedUser);
      setLoading(false);
    }
  }, []);

  useEffect(() => {
  }, [User]);

  const login = async (token, uid) => {
    try {
      //setLoading(true);
      tokenCtrl.setToken(token);
      const response = await UserCtrl.getMe(uid);
      localStorage.setItem("ui", JSON.stringify(response));
      const data = JSON.parse(localStorage.getItem('ui'));
      localStorage.removeItem("chatbotDismissed");
      setUser(data);
      //setLoading(false);
    } catch (error) {
      // console.error(error);
      //etLoading(false);
    }
  };

  const logout = () => {
    tokenCtrl.removeToken();
    localStorage.removeItem("ui")
    setToken(null);
    setUser(null);
  };

  const updateUser = async (data) => {
    const newUserData = await UserCtrl.getMe(data.uid)
    setUser(newUserData);
  };

  const data = {
    accessToken: token,
    User,
    login,
    logout,
    updateUser,
  };

  if (loading) return null;

  return <AuthContext.Provider value={data}>{children}</AuthContext.Provider>;
}
