/* eslint-disable react-refresh/only-export-components */
import { logout } from "@/api/auth";
import { fetchGuestInfo } from "@/api/user"; //fetchUserInfo
import { login } from "@/features/login";
import { register } from "@/features/register";
import { TLoginRequest, TRegisterRequest, TUser } from "@/types";
import { validateToken } from "@/utils/auth-utils";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { useLocation, useNavigate } from "react-router-dom";

type TAuthContext = {
  user: TUser | null;
  isAuthenticated: boolean;
  login: (creds: TLoginRequest) => Promise<void>;
  register: (creds: TRegisterRequest) => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<TAuthContext | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

type TAuthProviderProps = {
  children: React.ReactNode;
};

export const AuthProvider: React.FC<TAuthProviderProps> = ({ children }) => {
  // state
  const [user, setUser] = useState<TUser | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  // hooks
  const navigate = useNavigate();
  const location = useLocation();

  /**
   *
   * Method that logs in the user and tries to redirect to the page the user was trying to access before logging in.
   * **/
  const _login = useCallback(
    async (creds: TLoginRequest): Promise<void> => {
      const { jwtToken, user } = await login(creds);
      const { roles, email, firstName, id, lastName, username } = user;

      setIsAuthenticated(true);
      setUser({
        id,
        roles,
        email,
        username,
        lastName,
        firstName,
      });
      localStorage.setItem("jwtToken", jwtToken);

      navigate(location.state?.from || "/");
    },
    [location.state?.from, navigate]
  );

  /**
   *
   * Method that registers the user.
   * **/
  const _register = useCallback(
    async (creds: TRegisterRequest): Promise<void> => {
      const { jwtToken, user } = await register(creds);
      const { roles, email, firstName, id, lastName, username } = user;

      setIsAuthenticated(true);
      setUser({
        id,
        roles,
        email,
        username,
        lastName,
        firstName,
      });
      localStorage.setItem("jwtToken", jwtToken);
    },
    []
  );

  /**
   *
   * Method that logs out the user and redirects to the home page page
   * **/
  const _logout = useCallback(async () => {
    await logout();

    setIsAuthenticated(false);
    setUser(null);
    localStorage.removeItem("jwtToken");

    navigate("/");
  }, [navigate]);

  /**
   *
   * Method that fetches the user info.
   * **/
  /*const _getUserInfo = useCallback(async () => {
    const data = await fetchUserInfo();
    setUser({
      id: data.id,
      email: data.email,
      username: data.username,
      roles: data.roles,
      firstName: data.firstName,
      lastName: data.lastName,
    });
    setIsAuthenticated(true);
  }, []);
  */

  const _getGuestInfo = useCallback(async () => {
    const data = await fetchGuestInfo();
    localStorage.setItem("jwtToken", data.jwtToken);
    setUser({
      id: data.user.id,
      email: data.user.email,
      username: data.user.username,
      roles: data.user.roles,
      firstName: data.user.firstName,
      lastName: data.user.lastName,
    });

    setIsAuthenticated(true);
  }, []);

  useEffect(() => {
    const checkAuth = async () => {
      console.log("Checking authentication status");
      try {
        if (isAuthenticated) {
          console.log("User is already authenticated");
          return;
        } else {
          await _getGuestInfo();
          const token = localStorage.getItem("jwtToken");
          const { isValid } = validateToken(token);
          if (!isValid) throw new Error("Invalid token");
        }
      } catch (error) {
        if (error instanceof Error) {
          console.error(error.message);
        }
        await _logout();
      }
    };

    checkAuth();
  }, [_logout, _getGuestInfo, isAuthenticated]);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        login: _login,
        register: _register,
        logout: _logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
