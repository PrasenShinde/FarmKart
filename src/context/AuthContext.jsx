import React, { createContext, useContext, useState, useEffect } from 'react';
import { useToast } from '../components/ui/Toast';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { addToast } = useToast();

  useEffect(() => {
    // Check local storage for user on mount
    const storedUser = localStorage.getItem('farmkart_user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        localStorage.removeItem('farmkart_user');
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email, password, role) => {
    // Mock API call
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Simple mock validation
        if (!email || !password) {
          reject(new Error('Please provide email and password'));
          return;
        }

        // Dummy users for testing
        let finalRole = role;
        if (email.toLowerCase() === 'admin@farmkart.com') {
          finalRole = 'admin';
        } else if (!finalRole) {
          finalRole = 'buyer'; // default fallback
        }

        const newUser = {
          id: Math.random().toString(36).substring(2, 9),
          email,
          name: email.split('@')[0],
          role: finalRole,
        };

        setUser(newUser);
        localStorage.setItem('farmkart_user', JSON.stringify(newUser));
        addToast({
          title: 'Login Successful',
          description: `Welcome back, ${newUser.name}!`,
          variant: 'success'
        });
        resolve(newUser);
      }, 800); // simulate network delay
    });
  };

  const signup = async (name, email, password, role) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (!name || !email || !password) {
          reject(new Error('Please fill in all fields'));
          return;
        }

        const newUser = {
          id: Math.random().toString(36).substring(2, 9),
          email,
          name,
          role: role || 'buyer',
        };

        setUser(newUser);
        localStorage.setItem('farmkart_user', JSON.stringify(newUser));
        addToast({
          title: 'Account Created',
          description: `Welcome to FarmKart, ${newUser.name}!`,
          variant: 'success'
        });
        resolve(newUser);
      }, 800);
    });
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('farmkart_user');
    addToast({
      title: 'Logged Out',
      description: 'You have been successfully logged out.',
      variant: 'default'
    });
  };

  const value = {
    user,
    isLoading,
    login,
    signup,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {!isLoading && children}
    </AuthContext.Provider>
  );
}
