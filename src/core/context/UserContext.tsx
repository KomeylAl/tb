"use client";

import {useRouter} from "next/navigation";
import React, {createContext, useContext, useEffect, useState} from "react";
import toast from "react-hot-toast";
import {UserEntity} from "@/features/feature_auth/domain/entities/user_entity";

type UserContextType = {
  user: UserEntity | null;
  setUser: (user: UserEntity | null) => Promise<void>;
  logout: () => Promise<void>;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({children}: { children: React.ReactNode }) => {
  const [user, setUserState] = useState<UserEntity | null>(null);
  const router = useRouter();

  // Load user from localStorage on first load
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUserState(JSON.parse(storedUser));
    }
  }, []);

  const setUser = async (user: UserEntity | null) => {
    setUserState(user);
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  };

  const logout = async () => {
    await fetch("/api/auth/logout")
        .then(() => {
          router.replace("/auth/login");
        })
        .catch(() => {
          toast.error("مشکلی پیش آمد");
        });
    await setUser(null);
  };

  return (
      <UserContext.Provider value={{user, setUser, logout}}>
        {children}
      </UserContext.Provider>
  );
};

// Hook برای استفاده راحت‌تر
export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error("useUser must be used within a UserProvider");
  return context;
};
