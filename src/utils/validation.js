/**
 * Funções de validação de formulários.
 * Cada validador retorna um objeto contendo apenas os campos com erro;
 * um objeto vazio significa que o formulário é válido.
 */

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Verifica se o texto tem formato de e-mail. */
export const isValidEmail = (email) => EMAIL_REGEX.test(email.trim());

/** Retorna `true` quando o objeto de erros não possui nenhuma chave. */
export const isFormValid = (errors) => Object.keys(errors).length === 0;

/**
 * Valida o formulário de login.
 * @param {{ email: string, password: string }} form
 */
export const validateLogin = ({ email, password }) => {
  const errors = {};

  if (!email.trim()) {
    errors.email = 'E-mail é obrigatório';
  } else if (!isValidEmail(email)) {
    errors.email = 'E-mail inválido';
  }

  if (!password) {
    errors.password = 'Senha é obrigatória';
  }

  return errors;
};

/**
 * Valida o formulário de cadastro.
 * @param {{ name: string, email: string, password: string, confirmPassword: string }} form
 */
export const validateRegister = ({ name, email, password, confirmPassword }) => {
  const errors = {};

  if (name.trim().length < 3) {
    errors.name = 'Nome deve ter pelo menos 3 letras';
  }

  if (!email.trim()) {
    errors.email = 'E-mail é obrigatório';
  } else if (!isValidEmail(email)) {
    errors.email = 'E-mail inválido';
  }

  if (password.length < 6) {
    errors.password = 'A senha deve ter pelo menos 6 caracteres';
  }

  if (confirmPassword !== password) {
    errors.confirmPassword = 'As senhas não coincidem';
  }

  return errors;
};
