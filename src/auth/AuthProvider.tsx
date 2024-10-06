"use client";

import { PropsWithChildren, useState } from "react";
import { AuthContext } from "./AuthContext";
import { authUsers } from "./AuthenticatedUsers";

export const AuthProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [user, setUser] = useState<string | undefined>(undefined);

  // returns true if successfully found the user in the list of hardcoded users
  const login = (username: string, password: string): boolean => {
    if (
      authUsers.find(
        (user) => user.username === username && user.password === password
      )
    ) {
      setUser(username);
      return true;
    } else {
      return false;
    }
  };

  const logout = () => setUser(undefined);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
