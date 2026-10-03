import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkLogin();
  }, []);

  const checkLogin = async () => {
    try {
      const userData = await AsyncStorage.getItem('user');
      if (userData) {
        setUser(JSON.parse(userData));
      }
    } catch (e) {
      console.log('Error checking login', e);
    }
    setIsLoading(false);
  };

  const login = async (email, password) => {
    try {
      // Conta de teste padrão para facilitar o acesso sem cadastro
      if (email === 'teste@teste.com' && password === '123456') {
        const defaultUser = { email: 'teste@teste.com', name: 'Usuário Professor' };
        await AsyncStorage.setItem('user', JSON.stringify(defaultUser));
        setUser(defaultUser);
        return true;
      }

      const registeredUserStr = await AsyncStorage.getItem('registered_user_' + email);
      if (registeredUserStr) {
        const registeredUser = JSON.parse(registeredUserStr);
        if (registeredUser.password === password) {
          await AsyncStorage.setItem('user', JSON.stringify({ email: registeredUser.email, name: registeredUser.name }));
          setUser({ email: registeredUser.email, name: registeredUser.name });
          return true;
        }
      }
      return false;
    } catch (e) {
      return false;
    }
  };

  const register = async (name, email, password) => {
    try {
      const newUser = { name, email, password };
      await AsyncStorage.setItem('registered_user_' + email, JSON.stringify(newUser));
      return true;
    } catch (e) {
      return false;
    }
  };

  const logout = async () => {
    try {
      await AsyncStorage.removeItem('user');
      setUser(null);
    } catch (e) {
      console.log('Error logging out', e);
    }
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
