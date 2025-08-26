
"use client";

import { createContext, useContext, useState, ReactNode } from 'react';
import { Sidebar } from './sidebar';

interface NavItem {
  name: string;
  href?: string;
}

interface SidebarContextType {
  isOpen: boolean;
  setOpen: (isOpen: boolean) => void;
  navItems: NavItem[];
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

export function useSidebar() {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider");
  }
  return context;
}

interface SidebarProviderProps {
  children: ReactNode;
  navItems: NavItem[];
}

export function SidebarProvider({ children, navItems }: SidebarProviderProps) {
  const [isOpen, setOpen] = useState(false);

  return (
    <SidebarContext.Provider value={{ isOpen, setOpen, navItems }}>
      {children}
      <Sidebar />
    </SidebarContext.Provider>
  );
}
