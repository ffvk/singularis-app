// import { createContext, useContext, useState } from "react";

// type AuthContextType = {
//   token: string | null;
//   role: string | null;
//   login: (token: string, role: string) => void;
//   logout: () => void;
// };

// const AuthContext = createContext<AuthContextType>(null as any);

// export function AuthProvider({ children }: { children: React.ReactNode }) {
//   const [token, setToken] = useState<string | null>(null);
//   const [role, setRole] = useState<string | null>(null);

//   const login = (token: string, role: string) => {
//     setToken(token);
//     setRole(role);
//   };

//   const logout = () => {
//     setToken(null);
//     setRole(null);
//   };

//   return (
//     <AuthContext.Provider value={{ token, role, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// }

// export const useAuthContext = () => useContext(AuthContext);




// src/providers/AuthProvider.tsx
import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

type AuthContextType = {
  token: string | null;
  role: string | null;
  realm: string | null;
  login: (token: string, role: string, realm: string) => Promise<void>;
  logout: () => Promise<void>;
  setRealm: (realm: string) => Promise<void>;
  loading: boolean;
};

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(null);
  const [role, setRole] = useState<string | null>(null);
  const [realm, setRealmState] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // Load data from AsyncStorage on app start
  useEffect(() => {
    const loadAuthData = async () => {
      try {
        const storedToken = await AsyncStorage.getItem("accessToken");
        const storedRole = await AsyncStorage.getItem("role");
        const storedRealm = await AsyncStorage.getItem("realm");

        if (storedToken) setToken(storedToken);
        if (storedRole) setRole(storedRole);
        if (storedRealm) setRealmState(storedRealm);
      } catch (err) {
        console.error("Failed to load auth data", err);
      } finally {
        setLoading(false);
      }
    };

    loadAuthData();
  }, []);

  const login = async (newToken: string, newRole: string, newRealm: string) => {
    setToken(newToken);
    setRole(newRole);
    setRealmState(newRealm);
    await AsyncStorage.setItem("accessToken", newToken);
    await AsyncStorage.setItem("role", newRole);
    await AsyncStorage.setItem("realm", newRealm);
  };

  const logout = async () => {
    setToken(null);
    setRole(null);
    setRealmState(null);
    await AsyncStorage.removeItem("accessToken");
    await AsyncStorage.removeItem("role");
    await AsyncStorage.removeItem("realm");
  };

  const setRealm = async (newRealm: string) => {
    setRealmState(newRealm);
    await AsyncStorage.setItem("realm", newRealm);
  };

  return (
    <AuthContext.Provider value={{ token, role, realm, login, logout, setRealm, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuthContext = () => useContext(AuthContext);
