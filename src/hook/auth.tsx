import { createContext, ReactNode, useContext, useMemo, useState } from "react";

import { destroyCookie, setCookie } from "nookies";
import { useRouter } from "next/router";
import { UserType } from "../types/users/auth";

interface AuthContextData {
  signIn: (data: UserType) => void;
  signOut: () => void;
  user: UserType;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({
  children,
}: Readonly<AuthProviderProps>): JSX.Element {
  const route = useRouter();
  const usersInitial = {
    token: "",
    user: {
      email: "",
      avatar: "",
      name: "",
    },
  } as UserType;

  const [user, setUser] = useState<UserType>(usersInitial);

  const signIn = (data: UserType) => {
    setCookie(null, "togdesign:token", data.token, {
      maxAge: 30 * 24 * 60 * 60,
      path: "/",
    });
    route.push("/dashboard");
    setUser(data);
  };

  const signOut = () => {
    setUser(usersInitial);
    destroyCookie(null, "togdesign:token");
    route.push("/login");
  };

  return (
    <AuthContext.Provider value={{ user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  return context;
}
