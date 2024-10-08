import { createContext } from "react";

export interface AuthContextType {
  user: string | undefined;
  login: (username: string, password: string) => boolean;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType>({
  user: undefined,
  login: () => false,
  logout: () => console.error("Auth provider not provided!"),
});
