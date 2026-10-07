import React, { createContext, useState, useEffect, useCallback, useMemo } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { generateSalt, hashPassword } from '../utils/security';

/**
 * Contexto de autenticação.
 * Responsável por cadastro, login, logout, edição de perfil e por manter a
 * sessão do usuário entre aberturas do app (persistida no AsyncStorage).
 *
 * As funções `login` e `register` retornam `{ success, message }` para que as
 * telas exibam a mensagem de erro adequada.
 */
export const AuthContext = createContext();

const SESSION_KEY = 'user';
const ACCOUNT_PREFIX = 'registered_user_';

/** Conta de teste criada automaticamente para facilitar a avaliação. */
export const DEMO_ACCOUNT = {
  name: 'Usuário Professor',
  email: 'teste@teste.com',
  password: '123456',
};

const normalizeEmail = (email) => email.trim().toLowerCase();

const accountKey = (email) => ACCOUNT_PREFIX + email;

/** Dados mínimos guardados na sessão (nunca inclui senha/hash). */
const toSession = (account) => ({ name: account.name, email: account.email });

/** Grava uma conta com a senha protegida por hash + salt. */
const saveAccount = async ({ name, email, password, createdAt }) => {
  const salt = generateSalt();
  const account = {
    name: name.trim(),
    email,
    salt,
    passwordHash: await hashPassword(password, salt),
    createdAt: createdAt || new Date().toISOString(),
  };
  await AsyncStorage.setItem(accountKey(email), JSON.stringify(account));
  return account;
};

/** Busca a conta pelo e-mail normalizado (ou como foi digitado, para contas antigas). */
const findAccount = async (email) => {
  const raw =
    (await AsyncStorage.getItem(accountKey(normalizeEmail(email)))) ||
    (await AsyncStorage.getItem(accountKey(email.trim())));
  return raw ? JSON.parse(raw) : null;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const bootstrap = async () => {
      try {
        if (!(await findAccount(DEMO_ACCOUNT.email))) {
          await saveAccount(DEMO_ACCOUNT);
        }
        const session = await AsyncStorage.getItem(SESSION_KEY);
        if (session) setUser(JSON.parse(session));
      } catch (e) {
        console.warn('Erro ao restaurar sessão', e);
      } finally {
        setIsLoading(false);
      }
    };
    bootstrap();
  }, []);

  const startSession = async (account) => {
    const session = toSession(account);
    await AsyncStorage.setItem(SESSION_KEY, JSON.stringify(session));
    setUser(session);
  };

  const login = useCallback(async (email, password) => {
    const invalid = { success: false, message: 'E-mail ou senha incorretos.' };
    try {
      let account = await findAccount(email);
      if (!account) return invalid;

      if (account.passwordHash) {
        const hash = await hashPassword(password, account.salt);
        if (hash !== account.passwordHash) return invalid;
      } else {
        // Conta criada por versão antiga (senha em texto puro): valida e migra para hash.
        if (account.password !== password) return invalid;
        account = await saveAccount({ ...account, email: normalizeEmail(account.email), password });
      }

      await startSession(account);
      return { success: true };
    } catch (e) {
      console.warn('Erro no login', e);
      return { success: false, message: 'Não foi possível entrar. Tente novamente.' };
    }
  }, []);

  const register = useCallback(async (name, email, password) => {
    try {
      if (await findAccount(email)) {
        return { success: false, message: 'Já existe uma conta com este e-mail.' };
      }
      const account = await saveAccount({ name, email: normalizeEmail(email), password });
      await startSession(account);
      return { success: true };
    } catch (e) {
      console.warn('Erro no cadastro', e);
      return { success: false, message: 'Ocorreu um erro ao criar a conta.' };
    }
  }, []);

  const updateProfile = useCallback(async (name) => {
    try {
      const account = await findAccount(user.email);
      const updated = { ...account, name: name.trim() };
      await AsyncStorage.setItem(accountKey(user.email), JSON.stringify(updated));
      await startSession(updated);
      return true;
    } catch (e) {
      console.warn('Erro ao atualizar perfil', e);
      return false;
    }
  }, [user]);

  const logout = useCallback(async () => {
    try {
      await AsyncStorage.removeItem(SESSION_KEY);
    } catch (e) {
      console.warn('Erro ao sair', e);
    } finally {
      setUser(null);
    }
  }, []);

  const value = useMemo(
    () => ({ user, isLoading, login, register, updateProfile, logout }),
    [user, isLoading, login, register, updateProfile, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
