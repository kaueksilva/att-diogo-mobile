import * as Crypto from 'expo-crypto';

/**
 * Utilitários de segurança.
 * As senhas nunca são gravadas em texto puro: armazenamos apenas o hash
 * SHA-256 da senha combinada com um "salt" aleatório e único por usuário.
 */

/** Gera um salt aleatório para o usuário. */
export const generateSalt = () => Crypto.randomUUID();

/**
 * Calcula o hash SHA-256 de uma senha.
 * @param {string} password Senha digitada pelo usuário.
 * @param {string} salt Salt do usuário.
 * @returns {Promise<string>} Hash em hexadecimal.
 */
export const hashPassword = (password, salt) =>
  Crypto.digestStringAsync(Crypto.CryptoDigestAlgorithm.SHA256, `${salt}:${password}`);
