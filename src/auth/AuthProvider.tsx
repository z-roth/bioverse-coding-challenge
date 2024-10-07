"use client";

import { PropsWithChildren, useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import { authUsers } from "./AuthenticatedUsers";
import { useRouter } from "next/navigation";

export const AuthProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [user, setUser] = useState<string | undefined>(undefined);
  const router = useRouter();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  const login = (username: string, password: string): boolean => {
    if (
      authUsers.find(
        (authUser) =>
          authUser.username === username && authUser.password === password
      )
    ) {
      setUser(username);
      localStorage.setItem("user", username);
      return true;
    } else {
      return false;
    }
  };

  const logout = () => {
    setUser(undefined);
    localStorage.removeItem("user");
    router.push("/login");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
