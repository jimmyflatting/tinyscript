"use client";

import React, { createContext, useState, useContext } from "react";
import { User } from "@prisma/client";

type AuthContextType = {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  auth: string;
  setAuth: (auth: string, user?: User | null) => void;
  // ... other properties
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: React.ReactNode;
  initialAuth: string;
  initialUser: User | null;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({
  children,
  initialAuth,
  initialUser,
}) => {
  const [auth, setAuth] = useState<string>(initialAuth);
  const [user, setUser] = useState<User | null>(initialUser);

  const setAuthAndUser = (newAuth: string, newUser?: User | null) => {
    setAuth(newAuth);
    setUser(newUser || null);
  };

  return (
    <AuthContext.Provider
      value={{ auth, user, setAuth: setAuthAndUser, setUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
