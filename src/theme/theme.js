import { Platform } from 'react-native';

/**
 * Design tokens centralizados do app.
 * Todas as telas e componentes consomem estas constantes para manter
 * consistência visual e facilitar ajustes de tema em um único lugar.
 * Identidade visual institucional: azul-marinho, tons neutros e cantos retos.
 */
export const colors = {
  primary: '#1E3A5F',
  primaryDark: '#132841',
  primaryLight: '#EEF2F7',
  primaryBorder: '#C5D1E0',
  accent: '#2F6FB3',
  success: '#2E7D4F',
  successDark: '#23633E',
  successLight: '#EAF4EE',
  warning: '#B26A00',
  warningLight: '#FBF3E4',
  danger: '#B42318',
  dangerDark: '#912018',
  dangerLight: '#FDECEA',
  dangerBorder: '#F4C7C2',
  background: '#F4F6F8',
  surface: '#FFFFFF',
  border: '#D8DEE6',
  text: '#101828',
  textBody: '#344054',
  textSecondary: '#5B6575',
  textMuted: '#8A94A6',
  white: '#FFFFFF',
};

/** Raios de borda: discretos, para um visual sério e moderno. */
export const radius = {
  sm: 4,
  md: 6,
  lg: 8,
};

/**
 * Níveis de prioridade de uma tarefa.
 * `weight` define a ordem de exibição (menor = mais importante).
 */
export const PRIORITIES = {
  alta: { label: 'Alta', color: colors.danger, background: colors.dangerLight, weight: 0 },
  media: { label: 'Média', color: colors.warning, background: colors.warningLight, weight: 1 },
  baixa: { label: 'Baixa', color: colors.success, background: colors.successLight, weight: 2 },
};

/** Largura máxima do conteúdo para manter boa leitura em tablets e na web. */
export const MAX_CONTENT_WIDTH = 600;

/**
 * Gera uma sombra sutil compatível com Android (elevation) e iOS/Web (shadow*).
 * @param {number} level Intensidade da elevação.
 * @param {string} color Cor da sombra.
 * @param {number} opacity Opacidade da sombra no iOS/Web.
 */
export const shadow = (level = 1, color = '#101828', opacity = 0.06) => ({
  elevation: level,
  shadowColor: color,
  shadowOffset: { width: 0, height: level },
  shadowOpacity: opacity,
  shadowRadius: level * 1.5,
});

/** Remove o contorno azul padrão dos inputs no navegador. */
export const webInputReset = Platform.OS === 'web' ? { outlineStyle: 'none' } : {};
