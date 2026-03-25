'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, UserRole, AuthContextType } from '../types';
import { mockVolunteers, mockNGOs, mockNormalUsers } from '../mock-data';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [userRole, setUserRole] = useState<UserRole | null>(null);

  // Initialize from localStorage
  useEffect(() => {
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      try {
        const parsedUser = JSON.parse(savedUser);
        setUser(parsedUser);
        setUserRole(parsedUser.role);
      } catch (e) {
        console.error('Failed to parse saved user', e);
      }
    }
  }, []);

  const login = async (email: string, password: string, role: UserRole) => {
    // Mock login - find user by email or create demo user
    let foundUser: User | null = null;

    if (role === 'volunteer') {
      foundUser = mockVolunteers.find((v) => v.email === email) || null;
    } else if (role === 'ngo') {
      foundUser = mockNGOs.find((n) => n.email === email) || null;
    } else {
      foundUser = mockNormalUsers.find((u) => u.email === email) || null;
    }

    // If user not found in mock data, create a demo user (for demo purposes)
    if (!foundUser) {
      foundUser = {
        id: `${role}-${Date.now()}`,
        name: email.split('@')[0],
        email,
        phone: '',
        role,
        city: 'Demo City',
        state: 'Demo State',
        createdAt: new Date(),
      };
    }

    setUser(foundUser);
    setUserRole(role);
    localStorage.setItem('currentUser', JSON.stringify(foundUser));
  };

  const signup = async (userData: Partial<User>, role: UserRole) => {
    // Mock signup - create new user
    const newUser: User = {
      id: `${role}-${Date.now()}`,
      name: userData.name || '',
      email: userData.email || '',
      phone: userData.phone || '',
      role,
      city: userData.city || '',
      state: userData.state || '',
      createdAt: new Date(),
    };

    setUser(newUser);
    setUserRole(role);
    localStorage.setItem('currentUser', JSON.stringify(newUser));
  };

  const logout = () => {
    setUser(null);
    setUserRole(null);
    localStorage.removeItem('currentUser');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        userRole,
        isAuthenticated: user !== null,
        login,
        signup,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  // Add isLoggedIn property for compatibility
  return {
    ...context,
    isLoggedIn: context.isAuthenticated,
  };
}
