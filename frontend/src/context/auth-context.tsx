'use client';

import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';

export type UserRole = 'normal_user' | 'volunteer' | 'ngo' | null;

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  phone?: string;
  city?: string;
  state?: string;
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  isLoggedIn: boolean;
  userRole: UserRole;
  login: (email: string, password: string, role: UserRole) => void;
  logout: () => void;
  signup: (email: string, password: string, role: UserRole, data: any) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const login = useCallback((email: string, password: string, role: UserRole) => {
    // Mock login - in production, this would call an API
    const mockUser: User = {
      id: `user-${Date.now()}`,
      name: email.split('@')[0],
      email,
      role,
      phone: '9876543210',
      city: 'Mumbai',
      state: 'Maharashtra',
    };
    setUser(mockUser);
    // Store in localStorage for persistence
    if (typeof window !== 'undefined') {
      localStorage.setItem('user', JSON.stringify(mockUser));
    }
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    if (typeof window !== 'undefined') {
      localStorage.removeItem('user');
    }
  }, []);

  const signup = useCallback((email: string, password: string, role: UserRole, data: any) => {
    // Mock signup - in production, this would call an API
    const mockUser: User = {
      id: `user-${Date.now()}`,
      name: data.name || email.split('@')[0],
      email,
      role,
      phone: data.phone,
      city: data.city,
      state: data.state,
    };
    setUser(mockUser);
    if (typeof window !== 'undefined') {
      localStorage.setItem('user', JSON.stringify(mockUser));
    }
  }, []);

  const value = {
    user,
    isLoggedIn: user !== null,
    userRole: user?.role || null,
    login,
    logout,
    signup,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}
