import React, { createContext, useContext, useState } from "react";
import { useLogOut } from "../hooks/use-auth";

interface AuthContextProps {
  isAuthenticated: boolean;
  user: string | null;
  loginToApp: (user: string) => void;
  logoutFromApp: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const authUserKey = "shome-user";
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [authUser, setAuthUser] = useState(() =>
    localStorage.getItem(authUserKey)
  );
  const { mutateAsync: logOut } = useLogOut();

  const isAuthenticated = !!authUser;

  const loginToApp = (user: string) => {
    setAuthUser(user);
    localStorage.setItem(authUserKey, user);
  };

  const logoutFromApp = async () => {
    await logOut(undefined);
    setAuthUser(null);
    localStorage.removeItem(authUserKey);
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, loginToApp, logoutFromApp, user: authUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextProps => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
