import * as Crypto from 'expo-crypto';

/**
 * Utilitários de segurança.
 * As senhas nunca são gravadas em texto puro: armazenamos apenas o hash
 * SHA-256 da senha combinada com um "salt" aleatório e único por usuário.
 * O hash é aplicado várias vezes seguidas (key stretching), o que torna
 * ataques de força bruta muito mais lentos.
 */

/** Quantidade de rodadas de hash para senhas novas. */
export const PASSWORD_ITERATIONS = 500;

/** Gera um salt aleatório para o usuário. */
export const generateSalt = () => Crypto.randomUUID();

/**
 * Calcula o hash de uma senha.
 * Com `iterations = 1` o resultado é igual ao das contas criadas antes do
 * reforço, o que permite validá-las e migrá-las.
 * @param {string} password Senha digitada pelo usuário.
 * @param {string} salt Salt do usuário.
 * @param {number} iterations Rodadas de SHA-256.
 * @returns {Promise<string>} Hash em hexadecimal.
 */
export const hashPassword = async (password, salt, iterations = PASSWORD_ITERATIONS) => {
  let hash = await Crypto.digestStringAsync(Crypto.CryptoDigestAlgorithm.SHA256, `${salt}:${password}`);
  for (let i = 1; i < iterations; i += 1) {
    hash = await Crypto.digestStringAsync(Crypto.CryptoDigestAlgorithm.SHA256, `${salt}:${hash}`);
  }
  return hash;
};
