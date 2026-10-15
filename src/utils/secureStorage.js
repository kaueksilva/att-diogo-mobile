import { Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * Armazenamento de dados sensíveis (sessão do usuário).
 * No Android/iOS usa o expo-secure-store, que criptografa os dados com o
 * Keystore/Keychain do sistema. Na Web, onde ele não existe, usa AsyncStorage.
 */

const SecureStore = Platform.OS === 'web' ? null : require('expo-secure-store');

/** @param {string} key */
export const secureGet = (key) =>
  SecureStore ? SecureStore.getItemAsync(key) : AsyncStorage.getItem(key);

/** @param {string} key @param {string} value */
export const secureSet = (key, value) =>
  SecureStore ? SecureStore.setItemAsync(key, value) : AsyncStorage.setItem(key, value);

/** @param {string} key */
export const secureRemove = (key) =>
  SecureStore ? SecureStore.deleteItemAsync(key) : AsyncStorage.removeItem(key);
