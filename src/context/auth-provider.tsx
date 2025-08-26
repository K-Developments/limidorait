"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { onAuthStateChanged, User, signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useRouter, usePathname } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signOutUser: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  // Listen for auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // Redirect logic
  useEffect(() => {
    if (!loading) {
      if (!user && pathname !== "/admin/login") {
        router.push("/admin/login");
      } else if (user && pathname === "/admin/login") {
        router.push("/admin");
      }
    }
  }, [user, loading, pathname, router]);

  const signOutUser = async () => {
    try {
      await signOut(auth);
      router.push("/admin/login");
    } catch (error) {
      console.error("Sign out error", error);
    }
  };

  // While loading, show spinner or skeleton
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Skeleton className="w-24 h-24 rounded-full" />
      </div>
    );
  }

  // Render login page without layout if user is not authenticated and on login page
  if (!user && pathname === "/admin/login") {
    return <>{children}</>;
  }

  // Block rendering if user is not authenticated (redirect handled in useEffect)
  if (!user) {
    return null;
  }

  // Render children for authenticated users
  return (
    <AuthContext.Provider value={{ user, loading, signOutUser }}>
      {children}
    </AuthContext.Provider>
  );
}
