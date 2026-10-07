import { Platform } from 'react-native';

/**
 * Design tokens centralizados do app.
 * Todas as telas e componentes consomem estas constantes para manter
 * consistência visual e facilitar ajustes de tema em um único lugar.
 */
export const colors = {
  primary: '#4F46E5',
  primaryDark: '#4338CA',
  primaryLight: '#EEF2FF',
  primaryBorder: '#C7D2FE',
  success: '#10B981',
  successDark: '#059669',
  successLight: '#ECFDF5',
  warning: '#D97706',
  warningLight: '#FEF3C7',
  danger: '#EF4444',
  dangerDark: '#DC2626',
  dangerLight: '#FEE2E2',
  dangerBorder: '#FECACA',
  background: '#F3F4F6',
  surface: '#FFFFFF',
  border: '#E5E7EB',
  text: '#1F2937',
  textBody: '#374151',
  textSecondary: '#6B7280',
  textMuted: '#9CA3AF',
  white: '#FFFFFF',
};

/**
 * Níveis de prioridade de uma tarefa.
 * `weight` define a ordem de exibição (menor = mais importante).
 */
export const PRIORITIES = {
  alta: { label: 'Alta', color: colors.dangerDark, background: colors.dangerLight, weight: 0 },
  media: { label: 'Média', color: colors.warning, background: colors.warningLight, weight: 1 },
  baixa: { label: 'Baixa', color: colors.successDark, background: colors.successLight, weight: 2 },
};

/** Largura máxima do conteúdo para manter boa leitura em tablets e na web. */
export const MAX_CONTENT_WIDTH = 600;

/**
 * Gera uma sombra compatível com Android (elevation) e iOS/Web (shadow*).
 * @param {number} level Intensidade da elevação.
 * @param {string} color Cor da sombra.
 * @param {number} opacity Opacidade da sombra no iOS/Web.
 */
export const shadow = (level = 2, color = '#000', opacity = 0.08) => ({
  elevation: level,
  shadowColor: color,
  shadowOffset: { width: 0, height: level },
  shadowOpacity: opacity,
  shadowRadius: level * 2,
});

/** Remove o contorno azul padrão dos inputs no navegador. */
export const webInputReset = Platform.OS === 'web' ? { outlineStyle: 'none' } : {};
