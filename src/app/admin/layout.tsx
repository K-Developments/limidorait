"use client";

import { ReactNode } from "react";
import { AuthProvider } from "@/context/auth-provider";

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <AuthProvider>
      {children}
    </AuthProvider>
  );
}
