import { Platform } from 'react-native';

/**
 * Design tokens centralizados do app.
 * Todas as telas e componentes consomem estas constantes para manter
 * consistência visual e facilitar ajustes de tema em um único lugar.
 * Identidade visual colorida e vibrante: gradiente azul → roxo,
 * cartões brancos bem arredondados e cores fortes por prioridade.
 */
export const colors = {
  primary: '#6366F1',
  primaryDark: '#4F46E5',
  primaryLight: '#EEF0FF',
  primaryBorder: '#C7CBFF',
  accent: '#8B5CF6',
  accentLight: '#F3EEFF',
  success: '#10B981',
  successDark: '#059669',
  successLight: '#E7F8F1',
  warning: '#F59E0B',
  warningLight: '#FEF5E1',
  danger: '#EF4444',
  dangerDark: '#DC2626',
  dangerLight: '#FDECEC',
  dangerBorder: '#FBCACA',
  background: '#F5F6FB',
  surface: '#FFFFFF',
  subtle: '#F1F2F8',
  border: '#E6E8F0',
  text: '#1E1B4B',
  textBody: '#3F3D63',
  textSecondary: '#6B6B8D',
  textMuted: '#A3A3BD',
  white: '#FFFFFF',
};

/** Gradiente principal usado em cabeçalhos, botões e destaques. */
export const gradients = {
  primary: ['#3B82F6', '#8B5CF6'],
  soft: ['#EEF3FF', '#F3EEFF'],
};

/** Raios de borda generosos para um visual amigável. */
export const radius = {
  sm: 8,
  md: 14,
  lg: 20,
  xl: 28,
  pill: 999,
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
 * Gera uma sombra suave compatível com Android (elevation) e iOS/Web (shadow*).
 * @param {number} level Intensidade da elevação.
 * @param {string} color Cor da sombra.
 * @param {number} opacity Opacidade da sombra no iOS/Web.
 */
export const shadow = (level = 3, color = '#4338CA', opacity = 0.1) => ({
  elevation: level,
  shadowColor: color,
  shadowOffset: { width: 0, height: level + 1 },
  shadowOpacity: opacity,
  shadowRadius: level * 3,
});

/** Remove o contorno azul padrão dos inputs no navegador. */
export const webInputReset = Platform.OS === 'web' ? { outlineStyle: 'none' } : {};
