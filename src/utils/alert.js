import { Alert, Platform } from 'react-native';

/**
 * Exibe uma mensagem simples. No navegador (preview web do Snack) o
 * `Alert.alert` do React Native não faz nada, então usamos `window.alert`.
 * @param {string} title Título da mensagem.
 * @param {string} message Corpo da mensagem.
 */
export const showAlert = (title, message) => {
  if (Platform.OS === 'web') {
    window.alert(`${title}\n\n${message}`);
    return;
  }
  Alert.alert(title, message);
};

/**
 * Pede confirmação ao usuário antes de uma ação (ex: excluir).
 * Funciona em Android, iOS e Web.
 * @param {string} title Título do diálogo.
 * @param {string} message Pergunta exibida ao usuário.
 * @param {string} confirmText Texto do botão de confirmação.
 * @returns {Promise<boolean>} `true` se o usuário confirmou.
 */
export const confirmAction = (title, message, confirmText = 'Confirmar') => {
  if (Platform.OS === 'web') {
    return Promise.resolve(window.confirm(`${title}\n\n${message}`));
  }

  return new Promise((resolve) => {
    Alert.alert(
      title,
      message,
      [
        { text: 'Cancelar', style: 'cancel', onPress: () => resolve(false) },
        { text: confirmText, style: 'destructive', onPress: () => resolve(true) },
      ],
      { cancelable: true, onDismiss: () => resolve(false) }
    );
  });
};
