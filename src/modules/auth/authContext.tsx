'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export type UserRole = 'SUPER_ADMIN' | 'BRANCH_MANAGER' | 'SALES_MANAGER' | 'FINANCE_MANAGER' | 'CUSTOMER';

export interface AuthUser {
  uid: string;
  email: string;
  phoneNumber: string;
  role: UserRole;
  displayName: string;
  emailVerified: boolean;
  status: 'ACTIVE' | 'INACTIVE' | 'SUSPENDED' | 'BLOCKED';
  verificationLevel: number; // Level 0 to 3
}

interface AuthContextType {
  user: AuthUser | null;
  loading: boolean;
  loginWithEmail: (email: string, password: string) => Promise<AuthUser>;
  loginWithOTP: (phone: string, code: string) => Promise<AuthUser>;
  logout: () => Promise<void>;
  forgotPassword: (email: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Helper to set cookie
const setCookie = (name: string, value: string, days = 7) => {
  const expires = new Date(Date.now() + days * 864e5).toUTCString();
  document.cookie = `${name}=${value}; expires=${expires}; path=/; SameSite=Lax`;
};

// Helper to get cookie
const getCookie = (name: string) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(';').shift();
  return null;
};

// Helper to delete cookie
const deleteCookie = (name: string) => {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; SameSite=Lax`;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if session cookie exists
    const session = getCookie('session');
    if (session) {
      // Restore mock user based on role in cookie
      const role = session as UserRole;
      setUser({
        uid: `mock-uid-${role.toLowerCase()}`,
        email: `${role.toLowerCase()}@laxmitoyota.com`,
        phoneNumber: '9437012345',
        role,
        displayName: role.replace('_', ' '),
        emailVerified: true,
        status: 'ACTIVE',
        verificationLevel: role === 'CUSTOMER' ? 2 : 3
      });
    }
    setLoading(false);
  }, []);

  const loginWithEmail = async (email: string, password: string): Promise<AuthUser> => {
    setLoading(true);
    try {
      // Simulate network request
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const cleanEmail = email.toLowerCase().trim();
      let role: UserRole | null = null;
      let name = '';

      if (cleanEmail === 'admin@laxmitoyota.com' && password === 'Admin12345') {
        role = 'SUPER_ADMIN';
        name = 'Super Admin';
      } else if (cleanEmail === 'branch@laxmitoyota.com' && password === 'Branch12345') {
        role = 'BRANCH_MANAGER';
        name = 'Branch Manager';
      } else if (cleanEmail === 'sales@laxmitoyota.com' && password === 'Sales12345') {
        role = 'SALES_MANAGER';
        name = 'Sales Manager';
      } else if (cleanEmail === 'finance@laxmitoyota.com' && password === 'Finance12345') {
        role = 'FINANCE_MANAGER';
        name = 'Finance Manager';
      } else if (cleanEmail === 'customer@laxmitoyota.com' && password === 'Customer12345') {
        role = 'CUSTOMER';
        name = 'Laxmi Customer';
      }

      if (!role) {
        throw new Error('Invalid email or password credentials');
      }

      const loggedInUser: AuthUser = {
        uid: `mock-uid-${role.toLowerCase()}`,
        email: cleanEmail,
        phoneNumber: '9437012345',
        role,
        displayName: name,
        emailVerified: true,
        status: 'ACTIVE',
        verificationLevel: role === 'CUSTOMER' ? 1 : 3
      };

      setUser(loggedInUser);
      setCookie('session', role);
      return loggedInUser;
    } catch (error) {
      setLoading(false);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const loginWithOTP = async (phone: string, code: string): Promise<AuthUser> => {
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const cleanPhone = phone.trim().replace(/\D/g, '');
      if (cleanPhone.length !== 10) {
        throw new Error('Please enter a valid 10-digit mobile number');
      }

      if (code !== '123456') {
        throw new Error('Invalid OTP code. Use 123456 for test confirmation.');
      }

      const loggedInUser: AuthUser = {
        uid: `mock-uid-customer-otp`,
        email: 'customer-otp@laxmitoyota.com',
        phoneNumber: cleanPhone,
        role: 'CUSTOMER',
        displayName: 'OTP Customer',
        emailVerified: false,
        status: 'ACTIVE',
        verificationLevel: 2 // Level 2: OTP verified
      };

      setUser(loggedInUser);
      setCookie('session', 'CUSTOMER');
      return loggedInUser;
    } catch (error) {
      setLoading(false);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setUser(null);
    deleteCookie('session');
    window.location.href = '/login';
  };

  const forgotPassword = async (email: string) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    console.log(`Sending password reset link to ${email}`);
  };

  return (
    <AuthContext.Provider value={{ user, loading, loginWithEmail, loginWithOTP, logout, forgotPassword }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
