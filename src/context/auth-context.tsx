import React, { createContext, useContext, useState, useEffect } from "react";
import { useLogOut } from "../hooks/use-auth";

interface AuthContextProps {
  isAuthenticated: boolean;
  user: string | null;
  loginToApp: (user: string, expiresIn: number) => void;
  logoutFromApp: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const authUserKey = "shome-user";
export const authExpiryKey = "shome-expiry";

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [authUser, setAuthUser] = useState<string | null>(() => {
    const storedUser = localStorage.getItem(authUserKey);
    const expiry = localStorage.getItem(authExpiryKey);

    if (storedUser && expiry && Date.now() < parseInt(expiry)) {
      return storedUser;
    }

    localStorage.removeItem(authUserKey);
    localStorage.removeItem(authExpiryKey);
    return null;
  });

  const { mutateAsync: logOut } = useLogOut();

  const isAuthenticated = !!authUser;

  const loginToApp = (user: string, expiresIn: number) => {
    const expiryTime = expiresIn;
    setAuthUser(user);
    localStorage.setItem(authUserKey, user);
    localStorage.setItem(authExpiryKey, expiryTime.toString());
  };

  const logoutFromApp = async () => {
    await logOut(undefined);
    setAuthUser(null);
    localStorage.removeItem(authUserKey);
    localStorage.removeItem(authExpiryKey);
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
