"use client";

import { createContext, useContext, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useUser } from "@/src/hooks/use-auth";

interface AuthContextType {
  user:
    | {
        id: string;
        email: string;
      }
    | undefined;
  isLoading: boolean;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const PUBLIC_ROUTES = ["/login", "/signup"];

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { data: user, isLoading } = useUser();
  const router = useRouter();
  const pathname = usePathname();

  const isPublicRoute = PUBLIC_ROUTES.includes(pathname);
  const isAuthenticated = !!user;

  useEffect(() => {
    if (!isLoading && !isAuthenticated && !isPublicRoute) {
      router.push("/login");
    }

    if (!isLoading && isAuthenticated && isPublicRoute) {
      router.push("/dashboard");
    }
  }, [isLoading, isAuthenticated, isPublicRoute, router]);

  return (
    <AuthContext.Provider value={{ user, isLoading, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
}

// Hook to use auth context
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}
