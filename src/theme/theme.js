import { Platform } from 'react-native';

/**
 * Design tokens centralizados do app.
 * Todas as telas e componentes consomem estas constantes para manter
 * consistência visual e facilitar ajustes de tema em um único lugar.
 * Identidade visual clean/minimalista: branco, preto e tons de cinza,
 * com um único destaque de cor (azul) e sem sombras.
 */
export const colors = {
  primary: '#111111',
  primaryDark: '#000000',
  primaryLight: '#F4F4F6',
  primaryBorder: '#E5E5EA',
  accent: '#2563EB',
  accentLight: '#EEF3FE',
  success: '#2563EB',
  successDark: '#1D4ED8',
  successLight: '#EEF3FE',
  warning: '#D97706',
  warningLight: '#FEF6E7',
  danger: '#DC2626',
  dangerDark: '#B91C1C',
  dangerLight: '#FEF2F2',
  dangerBorder: '#FECACA',
  background: '#FFFFFF',
  surface: '#FFFFFF',
  subtle: '#F4F4F6',
  border: '#EBEBEF',
  text: '#111111',
  textBody: '#3A3A3C',
  textSecondary: '#6E6E73',
  textMuted: '#A1A1A6',
  white: '#FFFFFF',
};

/** Raios de borda suaves e consistentes. */
export const radius = {
  sm: 6,
  md: 10,
  lg: 14,
  pill: 999,
};

/**
 * Níveis de prioridade de uma tarefa.
 * `weight` define a ordem de exibição (menor = mais importante).
 */
export const PRIORITIES = {
  alta: { label: 'Alta', color: colors.danger, background: colors.dangerLight, weight: 0 },
  media: { label: 'Média', color: colors.warning, background: colors.warningLight, weight: 1 },
  baixa: { label: 'Baixa', color: colors.textMuted, background: colors.subtle, weight: 2 },
};

/** Largura máxima do conteúdo para manter boa leitura em tablets e na web. */
export const MAX_CONTENT_WIDTH = 600;

/** Remove o contorno azul padrão dos inputs no navegador. */
export const webInputReset = Platform.OS === 'web' ? { outlineStyle: 'none' } : {};
