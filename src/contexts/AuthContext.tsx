"use client";

import React, { createContext, useState, useContext } from "react";
import LoginModal from "@/app/components/LoginModal";

interface User {
  _id: string;
  email: string;
  name: string;
  credits: number;
  subscriptionStatus: string;
  createdAt: Date;
  updatedAt: Date;
  subscriptionEndDate?: Date;
  stripeCustomerId?: string;
  stripeSubscriptionId?: string;
  cancelAtPeriodEnd?: boolean;
}

type AuthContextType = {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  auth: string;
  setAuth: (auth: string, user?: User | null) => void;
  openLoginModal: () => void;
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
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const openLoginModal = () => setIsLoginModalOpen(true);

  const setAuthAndUser = (newAuth: string, newUser?: User | null) => {
    setAuth(newAuth);
    setUser(newUser || null);
  };

  return (
    <AuthContext.Provider
      value={{ auth, user, setAuth: setAuthAndUser, setUser, openLoginModal }}
    >
      {children}
      {isLoginModalOpen && (
        <LoginModal onClose={() => setIsLoginModalOpen(false)} />
      )}
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
